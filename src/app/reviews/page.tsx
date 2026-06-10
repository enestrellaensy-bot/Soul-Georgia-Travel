"use client";

import Image from "next/image";
import { PointerEvent, useEffect, useRef, useState } from "react";
import { usePreferences } from "../preferences";
import { SiteHeader } from "../shared";

const reviewItems = [
  {
    src: "/rewiev_4.jpg",
    source: "WhatsApp",
    time: "17:41",
    author: { en: "Soul Georgia Travel guest", ru: "Гость Soul Georgia Travel", ua: "Гість Soul Georgia Travel" },
    quote: {
      en: "Every day was thoughtfully planned and brought us so many vivid impressions. You showed us Georgia from within — through its cuisine, traditions and people. It was warm, sincere and much more than just a trip.",
      ru: "Каждый день был продуман до мелочей и подарил столько ярких впечатлений. Вы показали нам Грузию изнутри — через кухню, традиции и людей. Это было тепло, душевно и гораздо больше, чем просто поездка.",
      ua: "Кожен день був продуманий до дрібниць і подарував стільки яскравих вражень. Ви показали нам Грузію зсередини — через кухню, традиції та людей. Це було тепло, щиро й значно більше, ніж просто подорож.",
    },
  },
  {
    src: "/rewiev_8.jpg",
    source: "Instagram",
    time: "",
    author: { en: "Gia Khutsishvili", ru: "Гия Хуцишвили", ua: "Гія Хуцишвілі" },
    quote: {
      en: "What an incredible journey through Tusheti! Thank you for the organisation, the atmosphere and your stories about the region and its people. I will gladly recommend you to everyone.",
      ru: "Как круто мы съездили в Тушетию! Спасибо за отличную организацию, атмосферу и твои истории о регионе и менталитете горцев. Буду рекомендовать тебя всем.",
      ua: "Як чудово ми з'їздили до Тушетії! Дякую за прекрасну організацію, атмосферу й твої історії про регіон та менталітет горян. Радо рекомендуватиму тебе всім.",
    },
  },
  {
    src: "/rewiev_2.jpg",
    source: "WhatsApp",
    time: "20:50",
    author: { en: "Pilgrimage group guest", ru: "Гость паломнической группы", ua: "Гість паломницької групи" },
    quote: {
      en: "Thank you to Grigory and Irina for organising our pilgrimage to Georgia's sacred places. We felt the country's hospitality, visited places where prayer has lived for centuries and left certain that we will return.",
      ru: "Спасибо Григорию и Ирине за организацию паломничества к святыням Грузии. Мы почувствовали гостеприимство страны, побывали в местах, где молитва не прекращается веками, и уезжаем с уверенностью, что вернёмся.",
      ua: "Дякуємо Григорію та Ірині за організацію паломництва до святинь Грузії. Ми відчули гостинність країни, побували в місцях, де молитва живе століттями, і їдемо з упевненістю, що повернемося.",
    },
  },
  {
    src: "/rewiev_7.jpg",
    source: "Messenger",
    time: "",
    author: { en: "Alexey Artemyev", ru: "Алексей Артемьев", ua: "Олексій Артем'єв" },
    quote: {
      en: "Please forgive me for not writing immediately after the trip. Our whole group was very happy with the journey!",
      ru: "Прошу прощения, что не написал сразу после поездки. Вся наша группа осталась очень довольна!",
      ua: "Перепрошую, що не написав одразу після поїздки. Уся наша група залишилася дуже задоволеною!",
    },
  },
  {
    src: "/rewiev_5.jpg",
    source: "WhatsApp",
    time: "09:31",
    author: { en: "Pilgrimage tour guest", ru: "Гость паломнического тура", ua: "Гість паломницького туру" },
    quote: {
      en: "The tour was thought through beautifully: snowy mountains, caves, a waterfall, the sea and Georgia's most important sacred places. Thank you for your patience, care and responsibility.",
      ru: "Тур был продуман идеально: заснеженные горы, пещеры, водопад, море и главные святые места Грузии. Спасибо за терпение, заботу и ответственность.",
      ua: "Тур був продуманий чудово: засніжені гори, печери, водоспад, море й головні святі місця Грузії. Дякуємо за терпіння, турботу та відповідальність.",
    },
  },
  {
    src: "/rewiev_1.jpg",
    source: "WhatsApp",
    time: "19:55",
    author: { en: "Soul Georgia Travel guest", ru: "Гость Soul Georgia Travel", ua: "Гість Soul Georgia Travel" },
    quote: {
      en: "Grigory is the best guide in Tbilisi. Thanks to the well-planned programme, in seven days we saw Georgia's most beautiful and meaningful places. Thank you so much.",
      ru: "Григорий — лучший гид Тбилиси. Благодаря грамотно составленной программе за семь дней мы увидели самые значимые и красивые места Грузии. Огромное спасибо.",
      ua: "Григорій — найкращий гід Тбілісі. Завдяки продуманій програмі за сім днів ми побачили найважливіші та найкрасивіші місця Грузії. Щиро дякуємо.",
    },
  },
  {
    src: "/rewiev_9.jpg",
    source: "Instagram",
    time: "",
    author: { en: "Maria", ru: "Мария", ua: "Марія" },
    quote: {
      en: "I keep looking through my photos from Tusheti and want to thank you once again for helping make a dream come true. It was beautiful, peaceful and genuinely heartfelt.",
      ru: "Пересматриваю фотографии из Тушетии и хочу ещё раз сказать спасибо за то, что помог совершить мечту. Было очень красиво, спокойно и по-настоящему душевно.",
      ua: "Переглядаю фотографії з Тушетії й хочу ще раз подякувати за те, що допоміг здійснити мрію. Було дуже красиво, спокійно й по-справжньому душевно.",
    },
  },
  {
    src: "/rewiev_3.jpg",
    source: "WhatsApp",
    time: "19:03",
    author: { en: "Soul Georgia Travel guest", ru: "Гость Soul Georgia Travel", ua: "Гість Soul Georgia Travel" },
    quote: {
      en: "Thank you so much for organising our tour. We felt as if we had stepped into a fairytale. The emotions exceeded every expectation, and these memories will stay with us for a long time.",
      ru: "Огромное спасибо за организацию нашего тура. Мы словно побывали в сказке. Эмоции превзошли все ожидания, а воспоминания останутся с нами надолго.",
      ua: "Щиро дякуємо за організацію нашого туру. Ми наче побували в казці. Емоції перевершили всі очікування, а спогади залишаться з нами надовго.",
    },
  },
  {
    src: "/rewiev_6.jpg",
    source: "WhatsApp",
    time: "09:31",
    author: { en: "Nadezhda", ru: "Надежда", ua: "Надія" },
    quote: {
      en: "We will remember you for a long time and recommend you to family and friends. Everything was planned down to the smallest detail. May you have health, strength and patience in this meaningful work.",
      ru: "Мы ещё долго будем вас вспоминать и рекомендовать родным и знакомым. Всё было продумано до мелочей. Здоровья, сил и терпения в вашей важной работе.",
      ua: "Ми ще довго згадуватимемо вас і рекомендуватимемо рідним та знайомим. Усе було продумано до дрібниць. Здоров'я, сил і терпіння у вашій важливій праці.",
    },
  },
  {
    src: "/rewiev_10.jpg",
    source: "Instagram",
    time: "",
    author: { en: "Maria", ru: "Мария", ua: "Марія" },
    quote: {
      en: "Tusheti was a dream come true. Thank you for making the journey so beautiful, calm and sincere — I still return to those photographs.",
      ru: "Тушетия стала исполнением мечты. Спасибо, что сделал это путешествие таким красивым, спокойным и душевным — я до сих пор возвращаюсь к этим фотографиям.",
      ua: "Тушетія стала здійсненням мрії. Дякую, що зробив цю подорож такою красивою, спокійною й щирою — я досі повертаюся до цих фотографій.",
    },
  },
] as const;

const reviewsCopy = {
  en: {
    eyebrow: "Words from our guests",
    title: "Guest reviews",
    original: "Original message",
    previous: "Previous review",
    next: "Next review",
    image: "Original guest message",
  },
  ru: {
    eyebrow: "Слова наших гостей",
    title: "Отзывы",
    original: "Оригинал сообщения",
    previous: "Предыдущий отзыв",
    next: "Следующий отзыв",
    image: "Оригинальное сообщение гостя",
  },
  ua: {
    eyebrow: "Слова наших гостей",
    title: "Відгуки",
    original: "Оригінал повідомлення",
    previous: "Попередній відгук",
    next: "Наступний відгук",
    image: "Оригінальне повідомлення гостя",
  },
} as const;

function SourceIcon({ source }: { source: string }) {
  if (source === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="review-icon-fill" cx="17.4" cy="6.8" r="1" />
      </svg>
    );
  }

  if (source === "Messenger") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 11.5a8.3 8.3 0 0 1-8.6 8.1c-1 0-2-.2-2.9-.5l-4.1 1.2 1.2-3.7a7.8 7.8 0 0 1-2.3-5.6A8.3 8.3 0 0 1 12.4 3a8.2 8.2 0 0 1 8.1 8.5Z" />
        <path d="m7.7 13.4 3.1-3.3 2.4 1.8 3.2-3.3-3.1 4.7-2.5-1.8-3.1 1.9Z" />
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

export default function ReviewsPage() {
  const { language } = usePreferences();
  const copy = reviewsCopy[language];
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);

  const show = (index: number) => {
    setCurrent((index + reviewItems.length) % reviewItems.length);
  };

  useEffect(() => {
    if (isDragging) return;
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % reviewItems.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [isDragging, current]);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    setDragOffset(0);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (isDragging) setDragOffset(event.clientX - dragStart.current);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 70) show(current + (dragOffset < 0 ? 1 : -1));
    setDragOffset(0);
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <main className="reviews-carousel-page">
      <SiteHeader />
      <section className="reviews-carousel-shell">
        <header className="reviews-carousel-heading">
          <span>{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
        </header>

        <div
          className={`reviews-carousel-viewport${isDragging ? " is-dragging" : ""}`}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <div
            className="reviews-carousel-track"
            style={{ transform: `translate3d(calc(${-current * 100}% + ${dragOffset}px), 0, 0)` }}
          >
            {reviewItems.map((review, index) => (
              <article className="reviews-carousel-slide" key={`${review.src}-${index}`}>
                <div className="review-luxury-card">
                  <div className="review-source">
                    <span className={`review-source-icon review-source-icon-${review.source.toLowerCase()}`}>
                      <SourceIcon source={review.source} />
                    </span>
                    <div>
                      <strong>{review.source}</strong>
                      <small>{copy.original}</small>
                    </div>
                  </div>
                  <blockquote>“{review.quote[language]}”</blockquote>
                  <footer>
                    <strong>{review.author[language]}</strong>
                    <span>{review.source}{review.time ? ` · ${review.time}` : ""}</span>
                  </footer>
                </div>

                <figure
                  className={`review-proof review-proof-${review.source === "WhatsApp" ? "phone" : "card"}${
                    review.source === "WhatsApp" &&
                    ["/rewiev_1.jpg", "/rewiev_3.jpg", "/rewiev_4.jpg"].some((src) => src === review.src)
                      ? " review-proof-phone-wide"
                      : ""
                  }`}
                >
                  {review.source === "WhatsApp" && <div className="review-proof-speaker" />}
                  <figcaption>{copy.original} · {review.source}</figcaption>
                  <div className="review-proof-screen">
                    <Image
                      src={review.src}
                      alt={`${copy.image} ${index + 1}`}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 760px) 68vw, 330px"
                      draggable={false}
                    />
                  </div>
                </figure>
              </article>
            ))}
          </div>
        </div>

        <div className="reviews-carousel-controls">
          <button type="button" onClick={() => show(current - 1)} aria-label={copy.previous}>←</button>
          <div className="reviews-carousel-dots" aria-label={`${current + 1} / ${reviewItems.length}`}>
            {reviewItems.map((review, index) => (
              <button
                type="button"
                className={index === current ? "is-active" : ""}
                onClick={() => show(index)}
                aria-label={`${index + 1}`}
                aria-current={index === current ? "true" : undefined}
                key={`${review.src}-dot-${index}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => show(current + 1)} aria-label={copy.next}>→</button>
        </div>
      </section>
    </main>
  );
}
