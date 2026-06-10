"use client";

import { FormEvent, useState } from "react";
import { usePreferences } from "../preferences";
import { Arrow, SiteFooter, SiteHeader } from "../shared";

const bookingCopy = {
  ru: {
    eyebrow: "Начать разговор",
    title: <>Расскажите,<br /><em>как вы хотите ехать</em></>,
    intro: "Это не мгновенное бронирование. Сначала ответим на вопросы и убедимся, что формат поездки вам подходит.",
    contacts: [["Позвонить", "+995 555 01 74 07"], ["Написать", "hello@sakartvelo.travel"], ["Ответим", "в течение рабочего дня"]],
    formTitle: "Заявка на путешествие",
    date: "12–18 сентября 2026",
    name: "Как вас зовут",
    namePlaceholder: "Имя и фамилия",
    guests: "Сколько вас",
    guestOptions: [["1", "Еду один / одна"], ["2", "Нас двое"], ["3", "Нас трое"], ["4+", "Четыре и больше"]],
    phone: "Телефон или Telegram",
    email: "Email",
    interestsTitle: "Что вам особенно важно",
    interests: ["Вино и кухня", "Горы и природа", "История и культура", "Новые знакомства"],
    message: "О чём нам стоит знать",
    messagePlaceholder: "Питание, темп, особый повод или просто ваши вопросы",
    consent: "Согласен на обработку данных для связи по этой заявке.",
    submit: "Отправить заявку",
    successTitle: "Спасибо. Заявка уже у нас.",
    successText: "Свяжемся с вами в течение одного рабочего дня.",
    notes: ["Без оплаты на этом этапе", "Личный разговор перед подтверждением", "25% для бронирования места"],
  },
  ua: {
    eyebrow: "Почати розмову",
    title: <>Розкажіть,<br /><em>як ви хочете подорожувати</em></>,
    intro: "Це не миттєве бронювання. Спочатку відповімо на запитання і переконаємося, що формат подорожі вам підходить.",
    contacts: [["Зателефонувати", "+995 555 01 74 07"], ["Написати", "hello@sakartvelo.travel"], ["Відповімо", "протягом робочого дня"]],
    formTitle: "Заявка на подорож",
    date: "12–18 вересня 2026",
    name: "Як вас звати",
    namePlaceholder: "Ім’я та прізвище",
    guests: "Скільки вас",
    guestOptions: [["1", "Подорожую сам / сама"], ["2", "Нас двоє"], ["3", "Нас троє"], ["4+", "Четверо і більше"]],
    phone: "Телефон або Telegram",
    email: "Email",
    interestsTitle: "Що для вас особливо важливо",
    interests: ["Вино та кухня", "Гори та природа", "Історія та культура", "Нові знайомства"],
    message: "Про що нам варто знати",
    messagePlaceholder: "Харчування, темп, особлива подія або ваші запитання",
    consent: "Погоджуюся на обробку даних для зв’язку за цією заявкою.",
    submit: "Надіслати заявку",
    successTitle: "Дякуємо. Заявка вже у нас.",
    successText: "Зв’яжемося з вами протягом одного робочого дня.",
    notes: ["Без оплати на цьому етапі", "Особиста розмова перед підтвердженням", "25% для бронювання місця"],
  },
  en: {
    eyebrow: "Start a conversation",
    title: <>Tell us<br /><em>how you like to travel</em></>,
    intro: "This is not instant booking. We will answer your questions first and make sure the journey is right for you.",
    contacts: [["Call", "+995 555 01 74 07"], ["Write", "hello@sakartvelo.travel"], ["Reply", "within one working day"]],
    formTitle: "Journey enquiry",
    date: "12–18 September 2026",
    name: "Your name",
    namePlaceholder: "First and last name",
    guests: "Number of guests",
    guestOptions: [["1", "Travelling solo"], ["2", "Two guests"], ["3", "Three guests"], ["4+", "Four or more"]],
    phone: "Phone or Telegram",
    email: "Email",
    interestsTitle: "What matters most",
    interests: ["Wine and food", "Mountains and nature", "History and culture", "Meeting new people"],
    message: "Anything we should know",
    messagePlaceholder: "Diet, preferred pace, a special occasion or your questions",
    consent: "I agree to the use of my details to reply to this enquiry.",
    submit: "Send enquiry",
    successTitle: "Thank you. We have your enquiry.",
    successText: "We will be in touch within one working day.",
    notes: ["No payment at this stage", "A personal call before confirmation", "25% deposit to reserve a place"],
  },
} as const;

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const { language } = usePreferences();
  const copy = bookingCopy[language];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <SiteHeader />
      <section className="booking-layout">
        <div className="booking-intro">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>

          <div className="booking-contact">
            <div><span>{copy.contacts[0][0]}</span><a href="tel:+995555017407">{copy.contacts[0][1]}</a></div>
            <div><span>{copy.contacts[1][0]}</span><a href="mailto:hello@sakartvelo.travel">{copy.contacts[1][1]}</a></div>
            <div><span>{copy.contacts[2][0]}</span><strong>{copy.contacts[2][1]}</strong></div>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span>{copy.formTitle}</span>
            <strong>{copy.date}</strong>
          </div>

          <div className="form-row">
            <label>
              <span>{copy.name}</span>
              <input name="name" type="text" placeholder={copy.namePlaceholder} required />
            </label>
            <label>
              <span>{copy.guests}</span>
              <select name="guests" defaultValue="2">
                {copy.guestOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>{copy.phone}</span>
              <input name="phone" type="text" placeholder="+48 000 000 000" required />
            </label>
            <label>
              <span>{copy.email}</span>
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>
          </div>

          <fieldset>
            <legend>{copy.interestsTitle}</legend>
            <div className="interest-grid">
              {copy.interests.map((item) => (
                <label key={item}>
                  <input type="checkbox" name="interests" value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label>
            <span>{copy.message}</span>
            <textarea name="message" rows={4} placeholder={copy.messagePlaceholder} />
          </label>

          <label className="consent">
            <input type="checkbox" required />
            <span>{copy.consent}</span>
          </label>

          <button type="submit" className="button button-wine">
            {copy.submit} <Arrow />
          </button>

          {submitted && (
            <div className="form-success" role="status">
              <strong>{copy.successTitle}</strong>
              <span>{copy.successText}</span>
            </div>
          )}
        </form>
      </section>

      <section className="booking-note">
        {copy.notes.map((note) => <span key={note}>{note}</span>)}
      </section>

      <SiteFooter />
    </main>
  );
}
