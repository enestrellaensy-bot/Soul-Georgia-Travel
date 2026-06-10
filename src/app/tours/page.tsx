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
    { id: 1, title: "Знакомство с Грузией", image: "/logo_tur_1.jpg", href: "/tours/discover-georgia", subtitle: "8 дней · Тбилиси · Кахетия · Казбеги", locked: false },
    { id: 2, title: "Вино и гастрономия", image: "/wine-tour-hero.webp", href: "/tours/wine", subtitle: "Тбилиси · Мцхета · Кахетия", locked: true },
    { id: 3, title: "Горы и приключения", image: "/tours_2.webp", href: "#", subtitle: "Сванетия · Казбек · Каньоны", locked: true },
    { id: 4, title: "Древнее наследие", image: "/tours_3.jpg", href: "#", subtitle: "Кутаиси · Вардзия · Уплисцихе", locked: true },
  ],
  ua: [
    { id: 1, title: "Знайомство з Грузією", image: "/logo_tur_1.jpg", href: "/tours/discover-georgia", subtitle: "8 днів · Тбілісі · Кахетія · Казбегі", locked: false },
    { id: 2, title: "Вино та гастрономія", image: "/wine-tour-hero.webp", href: "/tours/wine", subtitle: "Тбілісі · Мцхета · Кахетія", locked: true },
    { id: 3, title: "Гори та пригоди", image: "/tours_2.webp", href: "#", subtitle: "Сванетія · Казбек · Каньйони", locked: true },
    { id: 4, title: "Стародавня спадщина", image: "/tours_3.jpg", href: "#", subtitle: "Кутаїсі · Вардзія · Уплісцихе", locked: true },
  ],
  en: [
    { id: 1, title: "Discover Georgia", image: "/logo_tur_1.jpg", href: "/tours/discover-georgia", subtitle: "8 days · Tbilisi · Kakheti · Kazbegi", locked: false },
    { id: 2, title: "Wine & Gastronomy", image: "/wine-tour-hero.webp", href: "/tours/wine", subtitle: "Tbilisi · Mtskheta · Kakheti", locked: true },
    { id: 3, title: "Mountains & Adventure", image: "/tours_2.webp", href: "#", subtitle: "Svaneti · Kazbek · Canyons", locked: true },
    { id: 4, title: "Ancient Heritage", image: "/tours_3.jpg", href: "#", subtitle: "Kutaisi · Vardzia · Uplistsikhe", locked: true },
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
              className={`tour-grid-card ${tour.locked ? "is-locked" : ""}`}
              aria-disabled={tour.locked}
              tabIndex={tour.locked ? -1 : undefined}
              onClick={tour.locked ? (event) => event.preventDefault() : undefined}
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
                  {tour.locked ? (
                    <>
                      <rect x="5" y="10" width="14" height="10" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </>
                  ) : (
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  )}
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
