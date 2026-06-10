"use client";

import Image from "next/image";
import { usePreferences } from "../../preferences";
import { SiteFooter, SiteHeader } from "../../shared";
import { ItineraryExplorer } from "../itinerary-explorer";

const wineTourCopy = {
  ru: {
    eyebrow: "7 дней · 6 ночей · 6–8 человек",
    title: "Вино-гастрономический тур по Грузии",
    intro: "Современные винодельни, старинные погреба, грузинская кухня и древняя история — от Тбилиси и Мцхеты до Кахетии, Болниси и Уплисцихе.",
    facts: [
      ["Маршрут", "Тбилиси · Кахетия · Болниси"],
      ["Формат", "Мини-группа 6–8 человек"],
      ["Транспорт", "Комфортный минивэн"],
    ],
    itineraryEyebrow: "Программа тура",
    itineraryTitle: "Семь дней в Грузии",
    detailsEyebrow: "Формат и детали",
    detailsTitle: "Что включено",
    includedTitle: "В стоимость входит",
    excludedTitle: "Оплачивается отдельно",
    included: [
      "Отели 4★",
      "Комфортный минивэн",
      "Русскоязычный гид",
      "Трансферы из/в аэропорт",
      "Завтраки, обеды и ужины по программе",
      "Все дегустации вина",
    ],
    excluded: [
      "Авиаперелёт",
      "Питание вне программы",
      "Личные расходы",
      "Медицинская страховка",
    ],
  },
  ua: {
    eyebrow: "7 днів · 6 ночей · 6–8 гостей",
    title: "Винно-гастрономічний тур Грузією",
    intro: "Сучасні виноробні, старовинні погреби, грузинська кухня та давня історія — від Тбілісі й Мцхети до Кахетії, Болнісі та Уплісцихе.",
    facts: [
      ["Маршрут", "Тбілісі · Кахетія · Болнісі"],
      ["Формат", "Мала група 6–8 гостей"],
      ["Транспорт", "Комфортний мінівен"],
    ],
    itineraryEyebrow: "Програма туру",
    itineraryTitle: "Сім днів у Грузії",
    detailsEyebrow: "Формат і деталі",
    detailsTitle: "Що включено",
    includedTitle: "У вартість входить",
    excludedTitle: "Сплачується окремо",
    included: [
      "Готелі 4★",
      "Комфортний мінівен",
      "Україно- та російськомовний гід",
      "Трансфери з/до аеропорту",
      "Сніданки, обіди та вечері за програмою",
      "Усі дегустації вина",
    ],
    excluded: [
      "Авіапереліт",
      "Харчування поза програмою",
      "Особисті витрати",
      "Медичне страхування",
    ],
  },
  en: {
    eyebrow: "7 days · 6 nights · 6–8 guests",
    title: "Wine and gastronomy tour of Georgia",
    intro: "Modern wineries, ancient cellars, Georgian cuisine and living history, from Tbilisi and Mtskheta to Kakheti, Bolnisi and Uplistsikhe.",
    facts: [
      ["Route", "Tbilisi · Kakheti · Bolnisi"],
      ["Format", "Small group of 6–8 guests"],
      ["Transport", "Comfortable minivan"],
    ],
    itineraryEyebrow: "Tour programme",
    itineraryTitle: "Seven days in Georgia",
    detailsEyebrow: "Format and details",
    detailsTitle: "What is included",
    includedTitle: "Included",
    excludedTitle: "Not included",
    included: [
      "4-star hotels",
      "Comfortable minivan",
      "Russian-speaking guide",
      "Airport transfers",
      "Meals according to the programme",
      "All wine tastings",
    ],
    excluded: [
      "Flights",
      "Meals outside the programme",
      "Personal expenses",
      "Medical insurance",
    ],
  },
} as const;

export default function WineTourPage() {
  const { language } = usePreferences();
  const copy = wineTourCopy[language];

  return (
    <main>
      <SiteHeader />

      <section className="tour-hero tour-hero-pdf" id="wine-tour">
        <Image
          src="/wine-tour-hero.webp"
          alt={language === "ru" ? "Грузинское застолье и дегустация вина" : "A Georgian table and wine tasting"}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="cover-image"
        />
        <div className="tour-hero-overlay" />
        <div className="tour-hero-copy">
          <span className="eyebrow eyebrow-light">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
        <div className="tour-book-card tour-facts-card">
          {copy.facts.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="itinerary-section itinerary-section-focused">
        <div className="itinerary-heading">
          <span className="eyebrow">{copy.itineraryEyebrow}</span>
          <h2>{copy.itineraryTitle}</h2>
        </div>
        <ItineraryExplorer />
      </section>

      <section className="details-section details-section-pdf">
        <div className="details-heading">
          <span className="eyebrow eyebrow-light">{copy.detailsEyebrow}</span>
          <h2>{copy.detailsTitle}</h2>
        </div>
        <div className="details-columns details-columns-two">
          <div>
            <h3>{copy.includedTitle}</h3>
            <ul>
              {copy.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{copy.excludedTitle}</h3>
            <ul>
              {copy.excluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
