"use client";

import Image from "next/image";
import { useState } from "react";
import { usePreferences } from "../preferences";
import { itineraryByLanguage } from "../shared";

export function ItineraryExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = usePreferences();
  const itinerary = itineraryByLanguage[language];
  const active = itinerary[activeIndex];
  const copy = {
    ru: { days: "Выберите день маршрута", day: "День", focus: "Главное в этот день", previous: "Предыдущий день", next: "Следующий день", of: "из" },
    ua: { days: "Оберіть день маршруту", day: "День", focus: "Головне цього дня", previous: "Попередній день", next: "Наступний день", of: "з" },
    en: { days: "Choose an itinerary day", day: "Day", focus: "Highlights of the day", previous: "Previous day", next: "Next day", of: "of" },
  }[language];

  return (
    <div className="itinerary-explorer">
      <div className="itinerary-tabs" role="tablist" aria-label={copy.days}>
        {itinerary.map((item, index) => (
          <button
            key={item.day}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? "is-active" : ""}
          >
            <span>{copy.day} {item.day}</span>
            <small>{item.place}</small>
          </button>
        ))}
      </div>

      <article className="active-itinerary" role="tabpanel">
        <div className="active-itinerary-image">
          <Image
            key={active.image}
            src={active.image}
            alt={`${active.place}: ${active.title}`}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            className="cover-image"
          />
          <span className="day-stamp">{copy.day} {active.day}</span>
        </div>
        <div className="active-itinerary-copy">
          <span className="eyebrow">{active.place}</span>
          <h2>{active.title}</h2>
          <p>{active.text}</p>
          <div className="day-note">
            <span>{copy.focus}</span>
            <strong>{active.note}</strong>
          </div>
          <div className="day-progress">
            <span style={{ width: `${((activeIndex + 1) / itinerary.length) * 100}%` }} />
          </div>
          <div className="day-controls">
            <button
              type="button"
              onClick={() => setActiveIndex((activeIndex - 1 + itinerary.length) % itinerary.length)}
              aria-label={copy.previous}
            >
              <span aria-hidden="true">←</span>{copy.previous}
            </button>
            <span className="day-counter">{copy.day} {activeIndex + 1} {copy.of} {itinerary.length}</span>
            <button
              type="button"
              onClick={() => setActiveIndex((activeIndex + 1) % itinerary.length)}
              aria-label={copy.next}
            >
              {copy.next}<span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
