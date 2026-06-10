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
    channel: "Удобный способ связи",
    message: "Что уже знаете о поездке?",
    messagePlaceholder: "Даты, количество гостей, пожелания",
    submit: "Отправить заявку",
    sent: "Спасибо. Форма заполнена.",
    sentText: "После подключения Telegram или почты заявка будет уходить туда автоматически.",
    close: "Закрыть",
    channels: ["Telegram", "WhatsApp", "Viber", "Email", "Instagram"],
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
    channel: "Зручний спосіб зв'язку",
    message: "Що вже знаєте про поїздку?",
    messagePlaceholder: "Дати, кількість гостей, побажання",
    submit: "Надіслати заявку",
    sent: "Дякуємо. Форму заповнено.",
    sentText: "Після підключення Telegram або пошти заявка надсилатиметься туди автоматично.",
    close: "Закрити",
    channels: ["Telegram", "WhatsApp", "Viber", "Email", "Instagram"],
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
    channel: "Preferred contact method",
    message: "What do you already know about the trip?",
    messagePlaceholder: "Dates, number of guests, preferences",
    submit: "Send request",
    sent: "Thank you. The form is complete.",
    sentText: "Once Telegram or email is connected, requests will be delivered there automatically.",
    close: "Close",
    channels: ["Telegram", "WhatsApp", "Viber", "Email", "Instagram"],
  },
} as const;

const contactMethods = [
  { name: "Telegram", icon: "telegram" },
  { name: "Instagram", icon: "instagram" },
  { name: "Почта", icon: "email" },
  { name: "Viber", icon: "viber" },
  { name: "WhatsApp", icon: "whatsapp" },
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

  if (name === "viber") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.7 4.7C17.8 2.9 14.9 2 12 2 6.6 2 3 5.2 3 10c0 2 .6 3.8 1.8 5.3L4 20l4.8-1.3c1 .4 2.1.6 3.2.6 5.4 0 9-3.2 9-8 0-2.6-.4-4.8-1.3-6.6Z" />
        <path d="M8.3 7.2c.4-.4 1-.3 1.3.1l1 1.5c.2.4.2.8-.1 1.1l-.7.7c.7 1.5 1.8 2.6 3.3 3.3l.7-.7c.3-.3.8-.3 1.1-.1l1.5 1c.5.3.5.9.2 1.3-.6.7-1.5 1.1-2.4.9-4.1-.8-7-3.7-7.8-7.8-.2-.5.3-1.4.9-2.3Z" />
        <path d="M13 5.7c2.8.3 4.4 1.9 4.7 4.7M13.1 8.1c1.4.2 2.1.9 2.3 2.3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.2 7.5c.4-.4 1-.3 1.3.1l1 1.5c.2.4.2.8-.1 1.1l-.7.7c.7 1.5 1.8 2.6 3.3 3.3l.7-.7c.3-.3.8-.3 1.1-.1l1.5 1c.5.3.5.9.2 1.3-.6.7-1.5 1.1-2.4.9-4.1-.8-7-3.7-7.8-7.8-.2-.5.3-1.4.9-2.3Z" />
    </svg>
  );
}

export default function ContactsPage() {
  const { language } = usePreferences();
  const copy = contactsCopy[language];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

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

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  const openForm = () => {
    setIsSent(false);
    setIsFormOpen(true);
  };

  return (
    <main className="contacts-page">
      <div className="contacts-background" aria-hidden="true">
        <Image
          src="/contact_fon_20260609.jpg"
          alt=""
          fill
          priority
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
            <button className="contact-method" type="button" key={method.name}>
              <span className={`contact-method-icon contact-method-icon-${method.icon}`}>
                <ContactIcon name={method.icon} />
              </span>
              <span className="contact-method-copy">
                <strong>{method.name}</strong>
                <small>{copy.action}</small>
              </span>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </button>
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
                  <label>
                    <span>{copy.name}</span>
                    <input name="name" type="text" autoComplete="name" required />
                  </label>
                  <label>
                    <span>{copy.contact}</span>
                    <input name="contact" type="text" autoComplete="email" required />
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
                    <textarea name="message" rows={3} placeholder={copy.messagePlaceholder} />
                  </label>
                  <button className="contact-form-submit" type="submit">
                    {copy.submit}
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
