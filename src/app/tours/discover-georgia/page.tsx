"use client";

import Image from "next/image";
import { usePreferences } from "../../preferences";
import { SiteHeader } from "../../shared";
import { ItineraryExplorer } from "../itinerary-explorer";

const itineraryRu = [
  { day: 1, place: "Тбилиси", title: "Приезд и знакомство", text: "Встреча в аэропорту, трансфер и заселение в отель. Свободное время для первой прогулки по Тбилиси.", note: "Трансфер · заселение · свободный вечер", image: "/georgia_tbilisi.png" },
  { day: 2, place: "Тбилиси", title: "Старый город и его символы", text: "Большая прогулка от площади Мейдан и серных бань до Метехи, канатной дороги, Моста Мира и парка Рике.", note: "Старый город · водопад Легвтахеви · ужин", image: "/georgia_hero.png" },
  { day: 3, place: "Мцхета", title: "Древняя столица и грузинское вино", text: "Монумент «Летопись Грузии», монастырь Джвари, Светицховели и знакомство с традиционным виноделием в Iago’s Winery.", note: "Мцхета · Джвари · дегустационный сет", image: "/tours_3.jpg" },
  { day: 4, place: "Кахетия", title: "Алазанская долина", text: "Монастырь Бодбе, прогулка по Сигнахи, усадьба Цинандали и тёплый вечер на семейной винодельне.", note: "Бодбе · Сигнахи · Цинандали · мастер-класс", image: "/georgia_wine.png" },
  { day: 5, place: "Казбеги", title: "Военно-Грузинская дорога", text: "Путешествие через Жинвальское водохранилище, крепость Ананури и Арку дружбы к храму Гергети у подножия Казбека.", note: "Ананури · горные панорамы · Гергети", image: "/tours_2.webp" },
  { day: 6, place: "Боржоми", title: "Минеральные источники и леса", text: "Прогулка по Боржоми: мост Сативе, центральный парк, минеральные источники, водопад и старый город.", note: "Парк Боржоми · источники · включённый ужин", image: "/georgia_nature.png" },
  { day: 7, place: "Тбилиси", title: "Свободный день", text: "День без спешки для отдыха, прогулок по любимым кварталам, кафе, сувениров и самостоятельного знакомства с городом.", note: "Отдых · прогулки · личное время", image: "/main_4_clean.png" },
  { day: 8, place: "Тбилиси", title: "Возвращение домой", text: "Завтрак, выселение из отеля и организованный трансфер в аэропорт.", note: "Выселение · трансфер в аэропорт", image: "/contacts-bg.webp" },
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
      "Монумент «Літопис Грузії», Джварі, Светіцховелі та знайомство з виноробством у Iago’s Winery.",
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
      "The Chronicle of Georgia, Jvari, Svetitskhoveli and traditional winemaking at Iago’s Winery.",
      "Bodbe Monastery, Sighnaghi, the Tsinandali estate and an evening at a family winery.",
      "Zhinvali Reservoir, Ananuri Fortress, the Friendship Monument and Gergeti Church beneath Kazbek.",
      "A walk through Borjomi’s central park, mineral springs, waterfall and historic streets.",
      "Time to rest, visit cafés, shop for souvenirs and explore Tbilisi independently.",
      "Breakfast, hotel check-out and an organised transfer to the airport.",
    ][item.day - 1],
  })),
} as const;

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
    note: "Возможно предварительное бронирование авиабилетов (уточнять у оператора).",
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

  return (
    <main className="discover-tour-page">
      <SiteHeader />
      <section className="tour-hero tour-hero-pdf">
        <Image
          src="/logo_tur_1.jpg?v=2"
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
          <div><h3>{content.includedTitle}</h3><ul>{content.included.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="tour-details-action">
            <h3>{content.noteTitle}</h3>
            <button type="button" className="button button-light">{content.detailsButton}</button>
            <ul><li>{content.note}</li></ul>
          </div>
        </div>
      </section>
    </main>
  );
}
