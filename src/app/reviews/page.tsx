"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePreferences } from "../preferences";
import { SiteHeader } from "../shared";

// Убрали случайную сортировку из глобальной области видимости, чтобы избежать ошибки гидратации (Hydration Mismatch)
const initialReviewItems = [
  {
    src: "/rew_1.jpg",
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
    src: "/rew_2.jpg",
    source: "Telegram",
    time: "15:42",
    author: { en: "Wine tour participant", ru: "Участник винного тура", ua: "Учасник винного туру" },
    quote: {
      en: "We took a wine tour of Kakheti. Breathtaking views of the Alazani Valley, wine tastings at local wineries. Everything was top notch!",
      ru: "Брали винный тур по Кахетии. Потрясающие виды на Алазанскую долину, дегустации в местных винодельнях. Все было на высшем уровне!",
      ua: "Брали винний тур по Кахетії. Приголомшливі краєвиди на Алазанську долину, дегустації у місцевих виноробнях. Усе було на найвищому рівні!",
    },
  },
  {
    src: "/rew_3.jpg",
    source: "Telegram",
    time: "11:15",
    author: { en: "Family from Europe", ru: "Семья из Европы", ua: "Сім'я з Європи" },
    quote: {
      en: "Traveled with children, which is always challenging, but the guide organized everything so everyone was interested. Kids loved the masterclass on making churchkhela.",
      ru: "Путешествовали с детьми, что всегда непросто, но гид организовал всё так, что всем было интересно. Детям очень понравился мастер-класс по чурчхеле.",
      ua: "Подорожували з дітьми, що завжди непросто, але гід організував усе так, що всім було цікаво. Дітям дуже сподобався майстер-клас із чурчхели.",
    },
  },
  {
    src: "/rew_4.jpg",
    source: "WhatsApp",
    time: "20:05",
    author: { en: "Corporate group", ru: "Корпоративная группа", ua: "Корпоративна група" },
    quote: {
      en: "Organized a corporate retreat for 20 people. Logistics, transfers, accommodation, restaurants - everything was flawless. Thank you for your professionalism!",
      ru: "Организовывали корпоратив на 20 человек. Логистика, трансферы, проживание, рестораны — всё сработано чётко. Спасибо за профессионализм!",
      ua: "Організовували корпоратив на 20 осіб. Логістика, трансфери, проживання, ресторани — все спрацьовано чітко. Дякуємо за професіоналізм!",
    },
  },
  {
    src: "/rew_5.jpg",
    source: "Telegram",
    time: "18:20",
    author: { en: "Solo traveler", ru: "Соло-путешественница", ua: "Соло-мандрівниця" },
    quote: {
      en: "I was worried about traveling alone, but the team made my trip incredibly comfortable and safe. Svaneti conquered my heart!",
      ru: "Переживала ехать одна, но команда сделала мою поездку невероятно комфортной и безопасной. Сванетия покорила моё сердце!",
      ua: "Хвилювалася їхати сама, але команда зробила мою поїздку неймовірно комфортною та безпечною. Сванетія підкорила моє серце!",
    },
  },
  {
    src: "/rew_6.jpg",
    source: "WhatsApp",
    time: "14:10",
    author: { en: "Couple from the USA", ru: "Пара из США", ua: "Пара зі США" },
    quote: {
      en: "The culinary tour is just something else! We learned how to cook khinkali and khachapuri, and learned a lot about Georgian feast traditions.",
      ru: "Кулинарный тур — это просто нечто! Мы научились готовить хинкали и хачапури, узнали много нового о традициях грузинского застолья.",
      ua: "Кулінарний тур — це просто щось! Ми навчилися готувати хінкалі та хачапурі, дізналися багато нового про традиції грузинського застілля.",
    },
  },
  {
    src: "/rew_7.jpg",
    source: "Telegram",
    time: "08:45",
    author: { en: "Photographer", ru: "Фотограф", ua: "Фотограф" },
    quote: {
      en: "As a photographer, finding the right locations is crucial. The guide showed non-touristy, incredibly picturesque spots. Brought back gigabytes of stunning shots.",
      ru: "Как фотографу, мне было важно найти правильные локации. Гид показал нетуристические, невероятно живописные места. Привез гигабайты шикарных кадров.",
      ua: "Як фотографу, мені було важливо знайти правильні локації. Гід показав нетуристичні, неймовірно мальовничі місця. Привіз гігабайти шикарних кадров.",
    },
  },
  {
    src: "/rew_8.jpg",
    source: "Telegram",
    time: "21:30",
    author: { en: "Group of friends", ru: "Компания друзей", ua: "Компанія друзів" },
    quote: {
      en: "We had a blast in Batumi! Sea, sun, great food and excellent excursions to waterfalls and historical fortresses. Highly recommend!",
      ru: "Отлично отдохнули в Батуми! Море, солнце, вкусная еда и отличные экскурсии к водопадам и историческим крепостям. Всем рекомендую!",
      ua: "Чудово відпочили в Батумі! Море, сонце, смачна їжа і чудові екскурсії до водоспадів та історичних фортець. Всім рекомендую!",
    },
  },
  {
    src: "/rew_9.jpg",
    source: "WhatsApp",
    time: "12:00",
    author: { en: "Alexey Artemyev", ru: "Алексей Артемьев", ua: "Олексій Артем'єв" },
    quote: {
      en: "Please forgive me for not writing immediately after the trip. Our whole group was very happy with the journey!",
      ru: "Прошу прощения, что не написал сразу после поездки. Вся наша группа осталась очень довольна!",
      ua: "Перепрошую, що не написав одразу після поїздки. Уся наша група залишилася дуже задоволеною!",
    },
  },
];

const reviewsCopy = {
  ru: {
    eyebrow: "Отзывы",
    title: "Что о нас говорят",
    original: "Оригинал сообщения",
  },
  en: {
    eyebrow: "Reviews",
    title: "What people say",
    original: "Original message",
  },
  ua: {
    eyebrow: "Відгуки",
    title: "Що про нас кажуть",
    original: "Оригінал повідомлення",
  },
};

function SourceIcon({ source }: { source: string }) {
  const commonClasses = "w-5 h-5 fill-current";

  if (source === "WhatsApp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={commonClasses}>
        <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.2.1-.3 0-.5s-.7-1.7-.8-2C9.4 7.1 9.2 7 9 7c-.2 0-.5 0-.7.1-.2.1-.6.6-.6 1.5s1.4 2.8 3.2 5.2c1.8 2.4 4.3 4.8 6.9 5.8 1.1.4 1.8.4 2.4.3.7-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2m2.5-9.1C16.9 2.7 14.1 1.5 11.2 1.5 5.8 1.5 1.4 5.9 1.4 11.3c0 1.7.5 3.4 1.3 4.9L1.5 22.5l6.5-1.7c1.5.8 3.1 1.2 4.8 1.2 5.4 0 9.8-4.4 9.8-9.8 0-2.8-1.1-5.4-3.1-7.3z" />
      </svg>
    );
  }

  if (source === "Telegram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={commonClasses}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.02-1.89 1.19-5.32 3.51-.5.34-.96.51-1.37.5-.45-.01-1.31-.25-1.95-.46-.79-.26-1.42-.4-1.36-.84.03-.23.35-.46.96-.71 3.76-1.64 6.27-2.72 7.52-3.24 3.58-1.48 4.32-1.74 4.81-1.75.11 0 .35.03.48.14.11.09.14.22.15.35-.01.07 0 .15-.01.2z" />
      </svg>
    );
  }

  return null;
}

export default function ReviewsPage() {
  const { language } = usePreferences();
  const copy = reviewsCopy[language];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [reviewItems, setReviewItems] = useState(initialReviewItems);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  // Перемешиваем карточки только на клиенте, чтобы избежать Hydration Error
  useEffect(() => {
    setReviewItems([...initialReviewItems].sort(() => Math.random() - 0.5));
  }, []);

  // Javascript-based animation loop that cannot be blocked by CSS caching or OS settings
  useEffect(() => {
    let animationFrameId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (!marqueeRef.current || isHovered.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      position -= speed;
      
      // Calculate max scroll. The first container is 50% of the width of the total content.
      // Since the wrapper has two identical containers, we just reset when position reaches -50%.
      if (marqueeRef.current) {
        const totalWidth = marqueeRef.current.scrollWidth;
        const halfWidth = totalWidth / 2;
        if (Math.abs(position) >= halfWidth) {
          position = 0;
        }
        marqueeRef.current.style.transform = `translate3d(${position}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative h-screen min-h-[700px] overflow-hidden flex flex-col">
      <div className="tours-background" aria-hidden="true">
        <Image
          src="/rewiev_fon.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
        />
      </div>
      <SiteHeader />

      {/* Version Indicator to verify updates */}
      <div className="absolute bottom-2 left-2 text-white/50 text-[10px] z-50">v1.3 (JS Anim)</div>

      <section className="relative z-10 w-full flex-1 flex flex-col justify-center pt-8 md:pt-12 pb-6">
        <header className="text-center mb-8 px-6 shrink-0">
          <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#8f2f2b]">{copy.eyebrow}</span>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-neutral-900">{copy.title}</h1>
        </header>

        {/* Marquee Wrapper */}
        <div 
          className="flex w-full overflow-hidden py-4"
          onMouseEnter={() => isHovered.current = true}
          onMouseLeave={() => isHovered.current = false}
        >
          <div ref={marqueeRef} className="flex w-max shrink-0">
            {/* First set of items */}
            <div className="flex shrink-0 items-stretch">
              {reviewItems.map((review, index) => (
                <article
                  key={`r1-${index}`}
                  className="w-[360px] md:w-[420px] min-h-[420px] md:min-h-[480px] flex flex-col p-8 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shrink-0 mx-3"
                >
                  <div className="flex items-center gap-4 mb-6 shrink-0">
                    <span className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${review.source === 'WhatsApp' ? 'bg-[#25D366]' : 'bg-[#2AABEE]'}`}>
                      <SourceIcon source={review.source} />
                    </span>
                    <div>
                      <strong className="block font-serif text-lg md:text-xl font-semibold text-neutral-900 leading-tight">{review.source}</strong>
                      <small className="block mt-1 text-[11px] font-bold tracking-widest uppercase text-neutral-900/60">{review.author[language]}</small>
                    </div>
                  </div>

                  <blockquote className="font-serif text-lg md:text-xl leading-relaxed font-normal text-neutral-900 mb-8 flex-1">
                    “{review.quote[language]}”
                  </blockquote>

                  <button 
                    onClick={() => setSelectedImage(review.src)}
                    className="mt-auto group/btn flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/40 border border-white/50 text-neutral-900 font-bold tracking-wide text-sm uppercase hover:bg-white/80 transition-colors shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover/btn:opacity-100 transition-opacity">
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    {copy.original}
                  </button>
                </article>
              ))}
            </div>

            {/* Second identical set of items for seamless loop */}
            <div className="flex shrink-0 items-stretch">
              {reviewItems.map((review, index) => (
                <article
                  key={`r2-${index}`}
                  className="w-[360px] md:w-[420px] min-h-[420px] md:min-h-[480px] flex flex-col p-8 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shrink-0 mx-3"
                >
                  <div className="flex items-center gap-4 mb-6 shrink-0">
                    <span className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${review.source === 'WhatsApp' ? 'bg-[#25D366]' : 'bg-[#2AABEE]'}`}>
                      <SourceIcon source={review.source} />
                    </span>
                    <div>
                      <strong className="block font-serif text-lg md:text-xl font-semibold text-neutral-900 leading-tight">{review.source}</strong>
                      <small className="block mt-1 text-[11px] font-bold tracking-widest uppercase text-neutral-900/60">{review.author[language]}</small>
                    </div>
                  </div>

                  <blockquote className="font-serif text-lg md:text-xl leading-relaxed font-normal text-neutral-900 mb-8 flex-1">
                    “{review.quote[language]}”
                  </blockquote>

                  <button 
                    onClick={() => setSelectedImage(review.src)}
                    className="mt-auto group/btn flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/40 border border-white/50 text-neutral-900 font-bold tracking-wide text-sm uppercase hover:bg-white/80 transition-colors shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover/btn:opacity-100 transition-opacity">
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    {copy.original}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          
          <div 
            className="relative w-full max-w-[500px] h-[85vh] md:h-[90vh] bg-transparent flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
             <Image
                src={selectedImage}
                alt="Original Review"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
             />
          </div>
        </div>
      )}
    </main>
  );
}
