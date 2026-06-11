import { NextResponse } from "next/server";

const MAX_REQUEST_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

const limits = {
  name: 80,
  contact: 120,
  departureCity: 100,
  channel: 30,
  message: 1_500,
} as const;

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentRequests = (requestLog.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return false;
}

function readField(value: unknown, maxLength: number, required = true) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if ((required && !normalized) || normalized.length > maxLength) return null;
  return normalized;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;

  if (!apiKey || !recipient) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = readField(data.name, limits.name);
  const contact = readField(data.contact, limits.contact);
  const departureCity = readField(data.departureCity, limits.departureCity);
  const channel = readField(data.channel, limits.channel);
  const message = readField(data.message ?? "", limits.message, false);

  if (!name || !contact || !departureCity || !channel || message === null) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Soul Georgia Travel <onboarding@resend.dev>",
        to: [recipient],
        subject: `Новая заявка на тур от ${name}`,
        text: [
          `Имя: ${name}`,
          `Контакт: ${contact}`,
          `Город вылета: ${departureCity}`,
          `Способ связи: ${channel}`,
          `Комментарий: ${message || "Не указан"}`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Could not send the request." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact request error:", error);
    return NextResponse.json({ error: "Could not send the request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
