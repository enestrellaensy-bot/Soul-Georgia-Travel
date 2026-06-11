"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePreferences } from "../preferences";
import { SiteHeader } from "../shared";

const originalReview = (src: string, source: string, time: string, author: string, text: string) => ({
  src,
  source,
  time,
  author: { en: author, ru: author, ua: author },
  quote: { en: text, ru: text, ua: text },
});

const correctedReviewItems = [
  originalReview("/rewiev/rew_1.jpg", "WhatsApp", "09:31", "Надежда", "Мы будем ещё долго вас вспоминать и рассказывать о вас, таком замечательном, своим родным и знакомым, будем всем Вас рекомендовать!!! Было бы очень здорово, если следующую группу Вы взяли под своё крыло. Храни Вас Бог! Здоровья, сил и терпения в вашей нелёгкой, но очень интересной и благодатной профессии!"),
  originalReview("/rewiev/rew_2.jpg", "WhatsApp", "19:55", "Гость тура", "Лучший гид Тбилиси Григорий. Благодаря грамотно составленной программе мы за семь дней увидели самые значимые, красивые места Грузии. Огромное вам спасибо."),
  originalReview("/rewiev/rew_3.jpg", "WhatsApp", "20:50", "Гость тура", "Хочу выразить огромную благодарность нашим гидам, Григорию и Ирине, за организацию паломничества к святыням Грузии. Видно, что это настоящие профессионалы своего дела, которые любят свою работу! Нас так тепло приняли в этой Богом избранной стране, что не хочется уезжать отсюда. Грузия, ты теперь навсегда в наших сердцах!"),
  originalReview("/rewiev/rew_4.jpg", "WhatsApp", "19:03", "Андрианова Алена", "Григорий, огромнейшее спасибо Вам за организацию нашего тура! Мы побывали в сказке! Я предполагала, что эмоции будут зашкаливать, но чтобы настолько... Это просто какое-то чудо, что Господь свёл всех нас в этой поездке! Воспоминания останутся надолго! Вы занимаетесь очень благим и нужным делом. Спасибо за всё! Я обязательно ещё вернусь!"),
  originalReview("/rewiev/rew_5.jpg", "WhatsApp", "17:41", "Гость тура", "Дорогой наш Григорий! Я очень благодарна вам за такую насыщенную программу. Каждый день был продуман до мелочей и подарил столько ярких впечатлений. Я лично полюбила Грузию и с удовольствием приеду ещё раз. Отдельное спасибо за то, что показали нам страну не как туристам, а изнутри — мы познакомились с местной кухней, традициями и людьми. Это было очень тепло и по-настоящему душевно. Это не просто поездка — это история. Низкий вам поклон!"),
  originalReview("/rewiev/rew_6.jpg", "WhatsApp", "09:45", "Надежда Касъяненко", "От всей души благодарю Вас за организацию такого идеально продуманного тура по Грузии — мы побывали везде: и в заснеженных горах, и в пещерах, и у водопада, и на море! Вы нам показали столько главных святых мест Грузии, рассказали историю их существования, дали возможность к ним приклониться и помолиться! Всегда терпеливо всех дожидали и собирали! Отдельная благодарность Вам за заботу о нас, за ответственность и сердобольность!"),
  originalReview("/rewiev/rew_7.jpg", "Telegram", "", "Алексей Артемьев", "Доброго времени! Прошу прощения, что сразу не отписал по поездке, у нас группа осталась очень довольна!"),
  originalReview("/rewiev/rew_8.jpg", "Telegram", "", "Гия Хуцишвили", "Гриша, как круто мы съездили в Тушетию! Спасибо за отличную организацию и атмосферу! Очень понравились твои истории про регион и особенности менталитета горцев! Буду тебя рекомендовать всем своим и чужим."),
  originalReview("/rewiev/rew_9.jpg", "Telegram", "", "Мария", "Гриша, привет! Пересматриваю фотки из Тушетии и хочу ещё раз сказать спасибо за то, что помог совершить мечту! Было очень красиво, спокойно и по-настоящему душевно."),
  originalReview("/rewiev/rew_10.jpg", "WhatsApp", "00:01", "Гость тура", "Григорий, от всей души благодарю Вас за потрясающую двухнедельную поездку по Грузии! Это было не просто экскурсионное сопровождение, а настоящее погружение в культуру, историю и святость этой удивительной страны! Программа по знакомству с Грузией была продумана безупречно, где каждое посещение святых мест прекрасно дополнялось красотой природы и вкусом национальных блюд! Всё было организовано чётко, вовремя и с душой! Грузия влюбила в себя раз и навсегда, а Вы сделали это путешествие незабываемым. Спасибо за тёплые воспоминания!"),
];

const reviewTranslations = [
  {
    en: "We will remember you for a long time and tell our family and friends about you. We will recommend you to everyone! May God protect you and grant you health, strength and patience in your rewarding profession.",
    ua: "Ми ще довго згадуватимемо вас і розповідатимемо про вас рідним та знайомим. Будемо рекомендувати вас усім! Нехай Бог береже вас і дарує здоров’я, сил і терпіння у вашій благородній професії.",
  },
  {
    en: "Grigory is the best guide in Tbilisi. Thanks to the well-planned programme, in seven days we saw the most important and beautiful places in Georgia. Thank you so much.",
    ua: "Григорій — найкращий гід у Тбілісі. Завдяки грамотно складеній програмі за сім днів ми побачили найважливіші та найкрасивіші місця Грузії. Щиро дякуємо.",
  },
  {
    en: "I want to express my immense gratitude to our guides, Grigory and Irina, for organising our pilgrimage to Georgia’s holy places. They are true professionals who love their work. Georgia is now forever in our hearts!",
    ua: "Хочу висловити величезну вдячність нашим гідам, Григорію та Ірині, за організацію паломництва до святинь Грузії. Це справжні професіонали, які люблять свою справу. Грузія назавжди в наших серцях!",
  },
  {
    en: "Grigory, thank you so much for organising our tour! We found ourselves in a fairy tale. The memories will stay with us for a long time. You are doing wonderful and important work. I will definitely return!",
    ua: "Григорію, величезне спасибі за організацію нашого туру! Ми побували у казці. Ці спогади залишаться надовго. Ви займаєтеся дуже доброю та важливою справою. Я обов’язково ще повернуся!",
  },
  {
    en: "Dear Grigory! Thank you for such a rich programme. Every day was planned down to the smallest detail and brought so many vivid impressions. You showed us the country from within, through its cuisine, traditions and people.",
    ua: "Дорогий Григорію! Дякую за таку насичену програму. Кожен день був продуманий до дрібниць і подарував безліч яскравих вражень. Ви показали нам країну зсередини, через її кухню, традиції та людей.",
  },
  {
    en: "Thank you from the bottom of my heart for organising such a perfectly planned tour of Georgia. We visited snowy mountains, caves, a waterfall and the sea. Special thanks for your care, responsibility and kindness!",
    ua: "Від щирого серця дякую за організацію такого чудово продуманого туру Грузією. Ми побували в засніжених горах, печерах, біля водоспаду та на морі. Окрема подяка за турботу, відповідальність і доброту!",
  },
  {
    en: "Good afternoon! Please forgive me for not writing immediately after the trip. Our entire group was very pleased!",
    ua: "Добрий день! Перепрошую, що не написав одразу після поїздки. Уся наша група залишилася дуже задоволеною!",
  },
  {
    en: "Grisha, our trip to Tusheti was amazing! Thank you for the excellent organisation and atmosphere. I loved your stories about the region and the mentality of the mountain people. I will recommend you to everyone.",
    ua: "Гриша, як чудово ми з’їздили до Тушетії! Дякую за прекрасну організацію та атмосферу. Дуже сподобалися твої історії про регіон і менталітет горян. Рекомендуватиму тебе всім.",
  },
  {
    en: "Grisha, hello! I am looking through my Tusheti photos and want to thank you once again for helping me fulfil a dream. It was beautiful, peaceful and truly heartfelt.",
    ua: "Гриша, привіт! Переглядаю фотографії з Тушетії й хочу ще раз подякувати за те, що допоміг здійснити мрію. Було дуже красиво, спокійно й по-справжньому душевно.",
  },
  {
    en: "Grigory, thank you from the bottom of my heart for an amazing two-week journey through Georgia! It was a genuine immersion in the country’s culture and history. Everything was organised clearly, on time and with soul.",
    ua: "Григорію, від щирого серця дякую за неймовірну двотижневу подорож Грузією! Це було справжнє занурення в культуру та історію країни. Усе було організовано чітко, вчасно й з душею.",
  },
] as const;

const localizedReviewItems = correctedReviewItems.map((review, index) => ({
  ...review,
  author: {
    ru: review.author.ru,
    en: review.author.ru === "Гость тура" ? "Tour guest" : review.author.ru,
    ua: review.author.ru === "Гость тура" ? "Гість туру" : review.author.ru,
  },
  quote: {
    ru: review.quote.ru,
    en: reviewTranslations[index].en,
    ua: reviewTranslations[index].ua,
  },
}));

const reviewExcerpt = (text: string, maxLength = 210) => {
  if (text.length <= maxLength) return text;
  const excerpt = text.slice(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(" ");
  return `${excerpt.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
};

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
  const reviewItems = localizedReviewItems;
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

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
    <main className="reviews-page relative h-screen min-h-[700px] overflow-hidden flex flex-col">
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



      <section className="relative z-10 w-full flex-1 flex flex-col justify-center pt-8 md:pt-12 pb-6">
        <header className="reviews-heading">
          <h1>{copy.title}</h1>
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
                  className="w-[280px] md:w-[420px] min-h-[340px] md:min-h-[480px] flex flex-col p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shrink-0 mx-2 md:mx-3"
                >
                  <div className="flex items-center gap-4 mb-6 shrink-0">
                    <span className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white ${review.source === 'WhatsApp' ? 'bg-[#25D366]' : 'bg-[#2AABEE]'}`}>
                      <SourceIcon source={review.source} />
                    </span>
                    <div>
                      <strong className="block font-serif text-base md:text-xl font-semibold text-neutral-900 leading-tight">{review.source}</strong>
                      <small className="block mt-1 text-[11px] font-bold tracking-widest uppercase text-neutral-900/60">{review.author[language]}</small>
                    </div>
                  </div>

                  <blockquote className="font-serif text-[15px] md:text-xl leading-relaxed font-normal text-neutral-900 mb-6 md:mb-8 flex-1">
                    “{reviewExcerpt(review.quote[language])}”
                  </blockquote>

                  <button 
                    onClick={() => setSelectedImage(review.src)}
                    className="mt-auto group/btn flex items-center justify-center gap-2 w-full py-3 md:py-4 rounded-[1rem] md:rounded-2xl bg-white/40 border border-white/50 text-neutral-900 font-bold tracking-wide text-xs md:text-sm uppercase hover:bg-white/80 transition-colors shrink-0"
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
                  className="w-[280px] md:w-[420px] min-h-[340px] md:min-h-[480px] flex flex-col p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shrink-0 mx-2 md:mx-3"
                >
                  <div className="flex items-center gap-4 mb-6 shrink-0">
                    <span className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white ${review.source === 'WhatsApp' ? 'bg-[#25D366]' : 'bg-[#2AABEE]'}`}>
                      <SourceIcon source={review.source} />
                    </span>
                    <div>
                      <strong className="block font-serif text-base md:text-xl font-semibold text-neutral-900 leading-tight">{review.source}</strong>
                      <small className="block mt-1 text-[11px] font-bold tracking-widest uppercase text-neutral-900/60">{review.author[language]}</small>
                    </div>
                  </div>

                  <blockquote className="font-serif text-[15px] md:text-xl leading-relaxed font-normal text-neutral-900 mb-6 md:mb-8 flex-1">
                    “{reviewExcerpt(review.quote[language])}”
                  </blockquote>

                  <button 
                    onClick={() => setSelectedImage(review.src)}
                    className="mt-auto group/btn flex items-center justify-center gap-2 w-full py-3 md:py-4 rounded-[1rem] md:rounded-2xl bg-white/40 border border-white/50 text-neutral-900 font-bold tracking-wide text-xs md:text-sm uppercase hover:bg-white/80 transition-colors shrink-0"
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
