"use client";

import Image from "next/image";
import Link from "next/link";
import { usePreferences } from "../preferences";
import { SiteHeader } from "../shared";

const toursCopy = {
  ru: {
    overviewEyebrow: "Авторские маршруты по Грузии",
    overviewTitle: "Путешествия с характером",
    overviewText: "Камерные группы, продуманный маршрут и знакомство со страной через людей, кухню, вино и историю. Выберите свое направление.",
  },
  ua: {
    overviewEyebrow: "Авторські маршрути Грузією",
    overviewTitle: "Подорожі з характером",
    overviewText: "Камерні групи, продуманий маршрут і знайомство з країною через людей, кухню, вино та історію. Оберіть свій напрямок.",
  },
  en: {
    overviewEyebrow: "Signature routes through Georgia",
    overviewTitle: "Journeys with character",
    overviewText: "Small groups, thoughtful routes and a way into the country through its people, food, wine and history. Choose your route.",
  },
} as const;

const toursData = {
  ru: [
    { id: 1, title: "Вино и гастрономия", image: "/wine-tour-hero.webp", href: "/tours/wine", subtitle: "Тбилиси · Мцхета · Кахетия" },
    { id: 2, title: "Горы и приключения", image: "/tours_2.webp", href: "#", subtitle: "Сванетия · Казбек · Каньоны" },
    { id: 3, title: "Древнее наследие", image: "/tours_3.jpg", href: "#", subtitle: "Кутаиси · Вардзия · Уплисцихе" },
    { id: 4, title: "Рача и дикая природа", image: "/tours_4.jpg", href: "#", subtitle: "Лечхуми · Онский район · Шаори" },
  ],
  ua: [
    { id: 1, title: "Вино та гастрономія", image: "/wine-tour-hero.webp", href: "/tours/wine", subtitle: "Тбілісі · Мцхета · Кахетія" },
    { id: 2, title: "Гори та пригоди", image: "/tours_2.webp", href: "#", subtitle: "Сванетія · Казбек · Каньйони" },
    { id: 3, title: "Стародавня спадщина", image: "/tours_3.jpg", href: "#", subtitle: "Кутаїсі · Вардзія · Уплісцихе" },
    { id: 4, title: "Рача та дика природа", image: "/tours_4.jpg", href: "#", subtitle: "Лечхумі · Онський район · Шаорі" },
  ],
  en: [
    { id: 1, title: "Wine & Gastronomy", image: "/wine-tour-hero.webp", href: "/tours/wine", subtitle: "Tbilisi · Mtskheta · Kakheti" },
    { id: 2, title: "Mountains & Adventure", image: "/tours_2.webp", href: "#", subtitle: "Svaneti · Kazbek · Canyons" },
    { id: 3, title: "Ancient Heritage", image: "/tours_3.jpg", href: "#", subtitle: "Kutaisi · Vardzia · Uplistsikhe" },
    { id: 4, title: "Racha & Wild Nature", image: "/tours_4.jpg", href: "#", subtitle: "Lechkhumi · Oni District · Shaori" },
  ],
} as const;

export default function ToursPage() {
  const { language } = usePreferences();
  const copy = toursCopy[language];
  const tours = toursData[language];

  return (
    <main className="tours-layout-page">
      <div className="tours-background" aria-hidden="true">
        <Image
          src="/tours-bg.webp"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
        />
      </div>
      <SiteHeader />

      <section className="tours-full-container">
        {/* Left Side: Description */}
        <div className="tours-left-desc">
          <span className="eyebrow">{copy.overviewEyebrow}</span>
          <h1>{copy.overviewTitle}</h1>
          <p>{copy.overviewText}</p>
        </div>

        {/* Right Side: 2x2 Grid */}
        <div className="tours-right-grid">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={tour.href}
              className={`tour-grid-card ${tour.href === "#" ? "is-coming-soon" : ""}`}
            >
              <div className="tour-grid-image-wrapper">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  priority={tour.id <= 2}
                  unoptimized={tour.id === 1}
                  sizes="(max-width: 1100px) 100vw, 30vw"
                  className="cover-image tour-grid-img"
                />
                <div className="tour-grid-overlay" />
              </div>

              <div className="tour-grid-content">
                <span className="tour-grid-subtitle">{tour.subtitle}</span>
                <h3 className="tour-grid-title">{tour.title}</h3>
              </div>

              <div className="tour-grid-action-btn" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
