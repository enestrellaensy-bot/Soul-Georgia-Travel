"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePreferences } from "../../preferences";
import { SiteHeader } from "../../shared";
import { ItineraryExplorer } from "../itinerary-explorer";

const itineraryRu = [
  { day: 1, place: "Тбилиси", title: "Приезд и знакомство", text: "Встреча в аэропорту, трансфер и заселение в отель. Свободное время для первой прогулки по Тбилиси.", note: "Трансфер · заселение · свободный вечер", image: "/tour1/tour_1.png" },
  { day: 2, place: "Тбилиси", title: "Старый город и его символы", text: "Большая прогулка от площади Мейдан и серных бань до Метехи, канатной дороги, Моста Мира и парка Рике.", note: "Старый город · водопад Легвтахеви · ужин", image: "/tour1/tour_2.jpg" },
  { day: 3, place: "Мцхета", title: "Древняя столица и грузинское вино", text: "Монумент «Летопись Грузии», монастырь Джвари, Светицховели и знакомство с традиционным виноделием на семейной винодельне.", note: "Мцхета · Джвари · дегустационный сет", image: "/tour1/tour_3.jpg", position: "80% center" },
  { day: 4, place: "Кахетия", title: "Алазанская долина", text: "Монастырь Бодбе, прогулка по Сигнахи, усадьба Цинандали и тёплый вечер на семейной винодельне.", note: "Бодбе · Сигнахи · Цинандали · мастер-класс", image: "/tour1/tour_4.png" },
  { day: 5, place: "Казбеги", title: "Военно-Грузинская дорога", text: "Путешествие через Жинвальское водохранилище, крепость Ананури и Арку дружбы к храму Гергети у подножия Казбека.", note: "Ананури · горные панорамы · Гергети", image: "/tour1/tour_5.png" },
  { day: 6, place: "Боржоми", title: "Минеральные источники и леса", text: "Прогулка по Боржоми: мост Сативе, центральный парк, минеральные источники, водопад и старый город.", note: "Парк Боржоми · источники · включённый ужин", image: "/tour1/tour_6.png", position: "20% center" },
  { day: 7, place: "Тбилиси", title: "Свободный день", text: "День без спешки для отдыха, прогулок по любимым кварталам, кафе, сувениров и самостоятельного знакомства с городом.", note: "Отдых · прогулки · личное время", image: "/tour1/tour_7.png" },
  { day: 8, place: "Тбилиси", title: "Возвращение домой", text: "Завтрак, выселение из отеля и организованный трансфер в аэропорт.", note: "Выселение · трансфер в аэропорт", image: "/tour1/tour_8.jpg" },
] as const;

const itineraryByLanguage = {
  ru: itineraryRu,
  ua: itineraryRu.map((item) => ({
    ...item,
    place: ["Тбілісі", "Тбілісі", "Мцхета", "Кахетія", "Казбегі", "Боржомі", "Тбілісі", "Тбілісі"][item.day - 1],
    title: [
      "Прибуття та знайомство",
      "Старе місто та його символи",
      "Давня столиця та грузинське вино",
      "Алазанська долина",
      "Військово-Грузинська дорога",
      "Мінеральні джерела та ліси",
      "Вільний день",
      "Повернення додому",
    ][item.day - 1],
    text: [
      "Зустріч в аеропорту, трансфер і заселення в готель. Вільний час для першої прогулянки Тбілісі.",
      "Прогулянка від площі Мейдан і сірчаних лазень до Метехі, канатної дороги, Мосту Миру та парку Ріке.",
      "Монумент «Літопис Грузії», Джварі, Светіцховелі та знайомство з виноробством на сімейній виноробні.",
      "Монастир Бодбе, Сігнахі, садиба Цинандалі та вечір на сімейній виноробні.",
      "Жинвальське водосховище, фортеця Ананурі, Арка дружби та храм Гергеті біля Казбеку.",
      "Прогулянка Боржомі: центральний парк, мінеральні джерела, водоспад і старе місто.",
      "Час для відпочинку, прогулянок, кафе, сувенірів і самостійного знайомства з містом.",
      "Сніданок, виселення з готелю та організований трансфер до аеропорту.",
    ][item.day - 1],
  })),
  en: itineraryRu.map((item) => ({
    ...item,
    place: ["Tbilisi", "Tbilisi", "Mtskheta", "Kakheti", "Kazbegi", "Borjomi", "Tbilisi", "Tbilisi"][item.day - 1],
    title: [
      "Arrival and first impressions",
      "The Old Town and its landmarks",
      "Ancient capital and Georgian wine",
      "The Alazani Valley",
      "The Georgian Military Highway",
      "Mineral springs and forests",
      "A free day",
      "Journey home",
    ][item.day - 1],
    text: [
      "Airport welcome, transfer and hotel check-in, followed by free time for a first walk around Tbilisi.",
      "A walk from Meidan Square and the sulphur baths to Metekhi, the cable car, Bridge of Peace and Rike Park.",
      "The Chronicle of Georgia, Jvari, Svetitskhoveli and traditional winemaking at a family winery.",
      "Bodbe Monastery, Sighnaghi, the Tsinandali estate and an evening at a family winery.",
      "Zhinvali Reservoir, Ananuri Fortress, the Friendship Monument and Gergeti Church beneath Kazbek.",
      "A walk through Borjomi’s central park, mineral springs, waterfall and historic streets.",
      "Time to rest, visit cafés, shop for souvenirs and explore Tbilisi independently.",
      "Breakfast, hotel check-out and an organised transfer to the airport.",
    ][item.day - 1],
  })),
} as const;

const detailedProgrammeRu = [
  {
    day: 1,
    title: "Приезд и заселение",
    intro: "Встреча, трансфер и заселение в отель. Свободное время в Тбилиси.",
    stops: [],
  },
  {
    day: 2,
    title: "Экскурсия по Тбилиси",
    intro: "Завтрак в отеле. Маршрут по главным историческим и современным символам столицы. Ужин включён.",
    stops: [
      ["Площадь Мейдан", "Сердце старого Тбилиси и удобная точка для знакомства с историей и атмосферой города."],
      ["Водопад Легвтахеви", "Природный уголок в живописном ущелье в самом центре Тбилиси."],
      ["Мать Грузии", "Один из главных символов страны и панорамная площадка над историческими районами."],
      ["Мост Мира и парк Рике", "Современная архитектура, прогулочная зона на берегу Куры и виды на старый город."],
      ["Канатная дорога", "Короткий подъём над Курой с видами на старый город, Нарикалу и окружающие холмы."],
      ["Метехи", "Исторический район, храм Метехи и памятник царю Вахтангу Горгасали."],
      ["Район серных бань", "Знаменитые кирпичные купола и место, с которого началась история Тбилиси."],
      ["Театр марионеток Резо Габриадзе", "Узнаваемая башня с часами и один из самых атмосферных уголков города."],
      ["Дополнительно", "По желанию (за дополнительную плату) можно прокатиться на катере по реке или посетить один из старейших винных погребов Тбилиси с дегустацией вина (20 лари с человека)."],
    ],
  },
  {
    day: 3,
    title: "«Летопись Грузии», Мцхета и семейная винодельня",
    intro: "Завтрак в отеле. Исторический маршрут и дегустационный сет на семейной винодельне. Возвращение в Тбилиси.",
    stops: [
      ["Монумент «Летопись Грузии»", "Монумент об истории страны с панорамными видами на город и Тбилисское море."],
      ["Мцхета", "Древняя столица Грузии и один из важнейших исторических и духовных центров страны."],
      ["Монастырь Джвари", "Старинный монастырь на вершине горы с видом на Мцхету и слияние Куры и Арагви."],
      ["Светицховели", "Главный храм Мцхеты, одна из важнейших святынь Грузии с богатой историей."],
      ["Семейная винодельня", "Знакомство с традиционным виноделием и винами, созданными по старинной технологии. Дегустация включена. Конкретная винодельня определяется перед поездкой; по запросу предоставляется список возможных объектов."],
    ],
  },
  {
    day: 4,
    title: "Кахетия",
    intro: "Завтрак в отеле. Бодбе, Сигнахи, панорамы Алазанской долины, Цинандали и вечер на винодельне.",
    stops: [
      ["Монастырь Бодбе", "Один из самых почитаемых монастырей Грузии, связанный с именем святой Нино."],
      ["Сигнахи", "Город любви с мощёными улицами, яркими балконами и атмосферой старой Кахетии."],
      ["Сигнахская крепостная стена", "Одна из крупнейших крепостных стен страны с видами на Алазанскую долину и Кавказ."],
      ["Усадьба Цинандали", "Историческая резиденция князей Чавчавадзе, окружённая парком и культурой XIX века."],
      ["Семейная винодельня", "Дегустация местных вин, кулинарный мастер-класс и ужин в кахетинской атмосфере. Ужин и дегустация проходят на одной из выбранных семейных виноделен. Включено."],
    ],
  },
  {
    day: 5,
    title: "Казбеги и Военно-Грузинская дорога",
    intro: "Завтрак в отеле. Горный маршрут к Казбеку. Ужин включён. Возвращение в Тбилиси.",
    stops: [
      ["Военно-Грузинская дорога", "Одна из самых красивых дорог Кавказа с постоянно меняющимися горными видами."],
      ["Жинвальское водохранилище", "Голубая горная вода и панорамные смотровые точки."],
      ["Крепость Ананури", "Средневековая крепость с башнями и храмами на берегу водохранилища."],
      ["Арка дружбы народов", "Яркий монумент на горном перевале с панорамным видом на Кавказ."],
      ["Церковь Гергети", "Знаменитый храм высоко в горах у подножия Казбека."],
    ],
  },
  {
    day: 6,
    title: "Боржоми",
    intro: "Завтрак в отеле. Курортный город, парк, источники и исторические места. Ужин включён.",
    stops: [
      ["Боржоми", "Знаменитый курортный город с природной минеральной водой и горной атмосферой."],
      ["Мост Сативе", "Короткая остановка с видами на реку и ущелье."],
      ["Центральный парк", "Минеральные источники, прогулочные тропы и водопад."],
      ["Канатная дорога", "Подъём с панорамными видами на Боржоми и окружающие леса. Оплачивается отдельно."],
      ["Храм Серафима Саровского", "Спокойное место среди леса для короткой прогулки и отдыха."],
      ["Старый город Боржоми", "Прогулка по исторической части города с уютной атмосферой."],
    ],
  },
  {
    day: 7,
    title: "Свободный день",
    intro: "Завтрак. День для отдыха, прогулок, кафе, сувениров и самостоятельного знакомства с Тбилиси без спешки.",
    stops: [],
  },
  {
    day: 8,
    title: "Вылет",
    intro: "Выселение из отеля и организованный трансфер в аэропорт.",
    stops: [],
  },
] as const;

const copy = {
  ru: {
    eyebrow: "8 дней · 7 ночей · пакет «Стандарт»",
    title: "Тур «Знакомство с Грузией»",
    intro: "Ваше первое большое путешествие по стране: Тбилиси и Мцхета, винная Кахетия, вершины Казбеги и зелёный Боржоми.",
    facts: [["Даты", "15–22 августа"], ["Маршрут", "Тбилиси · Мцхета · Кахетия · Казбеги · Боржоми"], ["Стоимость", "849 €"]],
    programme: "Программа тура",
    eightDays: "Восемь дней в Грузии",
    details: "Формат и детали",
    includedTitle: "Что включено",
    included: ["Проживание в отеле 3–4★", "Все трансферы по программе", "Услуги гида", "Кулинарный мастер-класс", "Ужины в дни 2, 4, 5 и 6", "Дегустационный сет в день 3", "Страховка"],
    noteTitle: "Дополнительная информация",
    detailsButton: "Подробная программа тура",
    note: "Возможна помощь в бронировании авиабилетов (уточнять у оператора).",
  },
  ua: {
    eyebrow: "8 днів · 7 ночей · пакет «Стандарт»", title: "Тур «Знайомство з Грузією»",
    intro: "Перша велика подорож країною: Тбілісі та Мцхета, винна Кахетія, вершини Казбегі й зелений Боржомі.",
    facts: [["Дати", "15–22 серпня"], ["Маршрут", "Тбілісі · Мцхета · Кахетія · Казбегі · Боржомі"], ["Вартість", "849 €"]],
    programme: "Програма туру", eightDays: "Вісім днів у Грузії", details: "Формат і деталі", includedTitle: "Що включено",
    included: ["Проживання в готелі 3–4★", "Усі трансфери за програмою", "Послуги гіда", "Кулінарний майстер-клас", "Вечері у дні 2, 4, 5 і 6", "Дегустаційний сет у день 3", "Страхування"],
    noteTitle: "Додаткова інформація", detailsButton: "Детальна програма туру", note: "Можливе попереднє бронювання авіаквитків (уточнюйте в оператора).",
  },
  en: {
    eyebrow: "8 days · 7 nights · Standard package", title: "Discover Georgia",
    intro: "A first grand journey through Georgia: Tbilisi and Mtskheta, wine country Kakheti, the peaks of Kazbegi and green Borjomi.",
    facts: [["Dates", "August 15–22"], ["Route", "Tbilisi · Mtskheta · Kakheti · Kazbegi · Borjomi"], ["Price", "€849"]],
    programme: "Tour programme", eightDays: "Eight days in Georgia", details: "Format and details", includedTitle: "Included",
    included: ["3–4-star hotel", "Transfers during the tour", "Guide services", "Cooking class", "Dinners on days 2, 4, 5 and 6", "Tasting set on day 3", "Insurance"],
    noteTitle: "Additional information", detailsButton: "Detailed tour programme", note: "Advance flight booking may be available (confirm with the operator).",
  },
} as const;

export default function DiscoverGeorgiaPage() {
  const { language } = usePreferences();
  const content = copy[language];
  const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);
  const programme = itineraryByLanguage[language];

  useEffect(() => {
    if (!isProgrammeOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProgrammeOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isProgrammeOpen]);

  return (
    <main className="discover-tour-page">
      <SiteHeader />
      <section className="tour-hero tour-hero-pdf">
        <Image
          src="/tour1_logo.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="cover-image"
        />
        <div className="tour-hero-overlay" />
        <div className="tour-hero-copy">
          <span className="eyebrow eyebrow-light">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>
        <div className="tour-book-card tour-facts-card">
          {content.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
      </section>
      <section className="itinerary-section itinerary-section-focused">
        <div className="itinerary-heading">
          <span className="eyebrow">{content.programme}</span>
        </div>
        <ItineraryExplorer items={itineraryByLanguage[language]} showNote={false} />
      </section>
      <section className="details-section details-section-pdf">
        <div className="details-heading">
          <span className="eyebrow eyebrow-light">{content.details}</span>
        </div>
        <div className="details-columns details-columns-two">
          <div className="tour-included-list"><h3>{content.includedTitle}</h3><ul>{content.included.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="tour-details-action">
            <h3>{content.noteTitle}</h3>
            <ul>
              <li className="tour-programme-link-item">
                <button type="button" onClick={() => setIsProgrammeOpen(true)}>
                  {content.detailsButton}
                </button>
              </li>
              <li className="tour-programme-link-item">
                <Link href="/contacts">{content.note}</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {isProgrammeOpen && (
        <div className="tour-programme-modal" role="presentation" onMouseDown={() => setIsProgrammeOpen(false)}>
          <section
            className="tour-programme-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-programme-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="tour-programme-close"
              onClick={() => setIsProgrammeOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <span className="eyebrow">{content.programme}</span>
            <h2 id="tour-programme-title">{content.detailsButton}</h2>
            <div className="tour-programme-days">
              {(language === "ru" ? detailedProgrammeRu : programme).map((day) => (
                <article key={day.day}>
                  <span>{language === "en" ? "Day" : language === "ua" ? "День" : "День"} {day.day}</span>
                  <h3>{day.title}</h3>
                  {"place" in day && <strong>{day.place}</strong>}
                  <p>{"intro" in day ? day.intro : day.text}</p>
                  {"stops" in day && day.stops.length > 0 && (
                    <div className="tour-programme-stops">
                      {day.stops.map(([name, description]) => (
                        <div key={name}>
                          <h4>{name}</h4>
                          <p>{description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
