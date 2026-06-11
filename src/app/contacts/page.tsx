"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { usePreferences } from "../preferences";
import { SiteHeader } from "../shared";

const contactsCopy = {
  ru: {
    eyebrow: "Связаться с нами",
    title: "Выберите удобный способ связи или оставьте заявку.",
    action: "Написать",
    request: "Оставить заявку",
    requestText: "Заполните короткую форму, и мы свяжемся с вами",
    modalEyebrow: "Заявка на путешествие",
    modalTitle: "Расскажите, как с вами связаться",
    name: "Ваше имя",
    contact: "Телефон, email или ник",
    departureCity: "Из какого города вылет?",
    channel: "Удобный способ связи",
    message: "Что уже знаете о поездке?",
    messagePlaceholder: "Даты, количество гостей, пожелания",
    submit: "Отправить заявку",
    submitting: "Отправляем...",
    sendError: "Не удалось отправить. Попробуйте ещё раз.",
    sent: "Спасибо. Форма заполнена.",
    sentText: "После подключения Telegram или почты заявка будет уходить туда автоматически.",
    close: "Закрыть",
    channels: ["Telegram", "Email", "Instagram"],
  },
  ua: {
    eyebrow: "Зв'язатися з нами",
    title: "Оберіть зручний спосіб зв’язку або залиште заявку.",
    action: "Написати",
    request: "Залишити заявку",
    requestText: "Заповніть коротку форму, і ми зв'яжемося з вами",
    modalEyebrow: "Заявка на подорож",
    modalTitle: "Розкажіть, як з вами зв'язатися",
    name: "Ваше ім'я",
    contact: "Телефон, email або нік",
    departureCity: "З якого міста виліт?",
    channel: "Зручний спосіб зв'язку",
    message: "Що вже знаєте про поїздку?",
    messagePlaceholder: "Дати, кількість гостей, побажання",
    submit: "Надіслати заявку",
    submitting: "Надсилаємо...",
    sendError: "Не вдалося надіслати. Спробуйте ще раз.",
    sent: "Дякуємо. Форму заповнено.",
    sentText: "Після підключення Telegram або пошти заявка надсилатиметься туди автоматично.",
    close: "Закрити",
    channels: ["Telegram", "Email", "Instagram"],
  },
  en: {
    eyebrow: "Get in touch",
    title: "Choose the easiest way to reach us or leave a request.",
    action: "Message us",
    request: "Leave a request",
    requestText: "Complete a short form and we will get back to you",
    modalEyebrow: "Travel request",
    modalTitle: "Tell us how to reach you",
    name: "Your name",
    contact: "Phone, email or username",
    departureCity: "Which city are you flying from?",
    channel: "Preferred contact method",
    message: "What do you already know about the trip?",
    messagePlaceholder: "Dates, number of guests, preferences",
    submit: "Send request",
    submitting: "Sending...",
    sendError: "Could not send the request. Please try again.",
    sent: "Thank you. The form is complete.",
    sentText: "Once Telegram or email is connected, requests will be delivered there automatically.",
    close: "Close",
    channels: ["Telegram", "Email", "Instagram"],
  },
} as const;

const contactMethods = [
  { name: "Telegram", icon: "telegram", href: "https://t.me/SoulGeorgiaTravel" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/gri_tour_geo" },
  { name: "Почта", icon: "email", href: "mailto:vpavlovich856@gmail.com" },
] as const;

function ContactIcon({
  name,
}: {
  name: (typeof contactMethods)[number]["icon"];
}) {
  if (name === "telegram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3.5 11.2 16.3-6.3c.8-.3 1.5.2 1.2 1.5l-2.8 13.1c-.2.9-.8 1.1-1.6.7l-4.2-3.1-2.1 2c-.2.2-.4.4-.8.4l.3-4.3 7.8-7c.3-.3-.1-.5-.5-.2l-9.7 6.1-4.1-1.3c-.9-.3-.9-.9.2-1.6Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle className="icon-fill" cx="17.6" cy="6.7" r="1.1" />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.8" y="5" width="18.4" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  return null;
}

export default function ContactsPage() {
  const { language } = usePreferences();
  const copy = contactsCopy[language];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    if (!isFormOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFormOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isFormOpen]);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSendError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!response.ok) {
        setSendError(copy.sendError);
        return;
      }

      setIsSent(true);
      form.reset();
    } catch {
      setSendError(copy.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openForm = () => {
    setIsSent(false);
    setSendError("");
    setIsFormOpen(true);
  };

  return (
    <main className="contacts-page">
      <div className="contacts-background" aria-hidden="true">
        <Image
          src="/contacts-bg.webp"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
        />
      </div>
      <SiteHeader />

      <section className="contacts-hero">
        <div className="contacts-heading">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
        </div>

        <div className="contacts-grid">
          {contactMethods.map((method) => (
            <a
              className="contact-method"
              href={method.href}
              target={method.icon === "email" ? undefined : "_blank"}
              rel={method.icon === "email" ? undefined : "noreferrer"}
              key={method.name}
            >
              <span className={`contact-method-icon contact-method-icon-${method.icon}`}>
                <ContactIcon name={method.icon} />
              </span>
              <span className="contact-method-copy">
                <strong>{method.name}</strong>
                <small>{copy.action}</small>
              </span>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </a>
          ))}

          <button className="contact-method contact-method-request" type="button" onClick={openForm}>
            <span className="contact-method-icon">+</span>
            <span className="contact-method-copy">
              <strong>{copy.request}</strong>
              <small>{copy.requestText}</small>
            </span>
            <span className="contact-method-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {isFormOpen && (
        <div className="contact-modal" role="presentation" onMouseDown={() => setIsFormOpen(false)}>
          <section
            className="contact-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="contact-modal-close"
              type="button"
              aria-label={copy.close}
              onClick={() => setIsFormOpen(false)}
            >
              ×
            </button>

            {isSent ? (
              <div className="contact-form-success">
                <span className="contact-form-success-mark">✓</span>
                <h2>{copy.sent}</h2>
                <p>{copy.sentText}</p>
                <button type="button" onClick={() => setIsFormOpen(false)}>{copy.close}</button>
              </div>
            ) : (
              <>
                <span className="eyebrow">{copy.modalEyebrow}</span>
                <h2 id="contact-form-title">{copy.modalTitle}</h2>
                <form className="contact-form" onSubmit={submitForm}>
                  <div className="contact-form-honeypot" aria-hidden="true">
                    <label>
                      Website
                      <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <label>
                    <span>{copy.name}</span>
                    <input name="name" type="text" autoComplete="name" maxLength={80} required />
                  </label>
                  <label>
                    <span>{copy.contact}</span>
                    <input name="contact" type="text" autoComplete="email" maxLength={120} required />
                  </label>
                  <label>
                    <span>{copy.departureCity}</span>
                    <input name="departureCity" type="text" autoComplete="address-level2" maxLength={100} required />
                  </label>
                  <label>
                    <span>{copy.channel}</span>
                    <select name="channel" defaultValue={copy.channels[0]}>
                      {copy.channels.map((channel) => (
                        <option value={channel} key={channel}>{channel}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>{copy.message}</span>
                    <textarea name="message" rows={3} maxLength={1500} placeholder={copy.messagePlaceholder} />
                  </label>
                  {sendError && <p className="contact-form-error">{sendError}</p>}
                  <button className="contact-form-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? copy.submitting : copy.submit}
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
