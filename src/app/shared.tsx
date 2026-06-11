"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import { Language, usePreferences } from "./preferences";

export const itineraryByLanguage = {
  ru: [
    {
      day: "01",
      place: "Тбилиси",
      title: "Встреча с городом",
      text: "Встреча в аэропорту, размещение в отеле 4*, свободная прогулка по Старому Тбилиси и приветственный ужин.",
      image: "/tbilisi/tbilisi_1.jpg",
      note: "Трансфер / Старый город / приветственный ужин",
    },
    {
      day: "02",
      place: "Мцхета",
      title: "Древняя столица и Iago's Winery",
      text: "Светицховели, монастырь Джвари и дегустация авторских вин в Iago's Winery. Вечером возвращаемся в Тбилиси.",
      image: "/georgia_wine.png",
      note: "Светицховели / Джвари / авторские вина",
    },
    {
      day: "03",
      place: "Кахетия",
      title: "Земля вина",
      text: "Поместье Цинандали, прогулка по Сигнахи и ночь на территории винодельни с дегустацией и ужином.",
      image: "/georgia_hero.png",
      note: "Цинандали / Сигнахи / ночь в винодельне",
    },
    {
      day: "04",
      place: "Телави",
      title: "Винодельни Кахетии",
      text: "Монастырь Бодбе, крепость Греми и две винодельни. Дегустация, мастер-класс по грузинской кухне и ужин.",
      image: "/georgia_table.png",
      note: "Бодбе / Греми / две винодельни",
    },
    {
      day: "05",
      place: "Болниси",
      title: "История и природа",
      text: "Болнисский Сион, немецкие поселения XIX века, пикник на природе и вечерняя дегустация в Diss Valley.",
      image: "/georgia_nature.png",
      note: "Древний храм / немецкое наследие / Diss Valley",
    },
    {
      day: "06",
      place: "Уплисцихе",
      title: "Пещерный город и игристые вина",
      text: "Древний город, высеченный в скале, дегустация игристых вин в Shepidon и прощальный грузинский ужин.",
      image: "/georgia_khachapuri.png",
      note: "Уплисцихе / Shepidon / прощальный ужин",
    },
    {
      day: "07",
      place: "Тбилиси",
      title: "Вылет",
      text: "Трансфер в аэропорт. До новых встреч в Грузии.",
      image: "/tbilisi/tbilisi_1.jpg",
      note: "Трансфер в аэропорт",
    },
  ],
  ua: [
    {
      day: "01",
      place: "Тбілісі",
      title: "Зустріч із містом",
      text: "Зустріч в аеропорту, розміщення в готелі 4*, вільна прогулянка Старим Тбілісі та вітальна вечеря.",
      image: "/tbilisi/tbilisi_1.jpg",
      note: "Трансфер / Старе місто / вітальна вечеря",
    },
    {
      day: "02",
      place: "Мцхета",
      title: "Давня столиця та Iago's Winery",
      text: "Светіцховелі, монастир Джварі та дегустація авторських вин в Iago's Winery. Увечері повертаємося до Тбілісі.",
      image: "/georgia_wine.png",
      note: "Светіцховелі / Джварі / авторські вина",
    },
    {
      day: "03",
      place: "Кахетія",
      title: "Земля вина",
      text: "Маєток Цинандалі, прогулянка Сігнагі та ніч на території виноробні з дегустацією і вечерею.",
      image: "/georgia_hero.png",
      note: "Цинандалі / Сігнагі / ніч у виноробні",
    },
    {
      day: "04",
      place: "Телаві",
      title: "Виноробні Кахетії",
      text: "Монастир Бодбе, фортеця Гремі та дві виноробні. Дегустація, майстер-клас грузинської кухні та вечеря.",
      image: "/georgia_table.png",
      note: "Бодбе / Гремі / дві виноробні",
    },
    {
      day: "05",
      place: "Болнісі",
      title: "Історія та природа",
      text: "Болніський Сіон, німецькі поселення XIX століття, пікнік на природі та вечірня дегустація в Diss Valley.",
      image: "/georgia_nature.png",
      note: "Давній храм / німецька спадщина / Diss Valley",
    },
    {
      day: "06",
      place: "Уплісцихе",
      title: "Печерне місто та ігристі вина",
      text: "Давнє місто у скелях, дегустація ігристих вин у Shepidon та прощальна грузинська вечеря.",
      image: "/georgia_khachapuri.png",
      note: "Уплісцихе / Shepidon / прощальна вечеря",
    },
    {
      day: "07",
      place: "Тбілісі",
      title: "Виліт",
      text: "Трансфер до аеропорту. До нових зустрічей у Грузії.",
      image: "/tbilisi/tbilisi_1.jpg",
      note: "Трансфер до аеропорту",
    },
  ],
  en: [
    {
      day: "01",
      place: "Tbilisi",
      title: "Meeting the city",
      text: "Airport welcome, check-in at a 4-star hotel, free time in Old Tbilisi and a Georgian welcome dinner.",
      image: "/tbilisi/tbilisi_1.jpg",
      note: "Transfer / Old Town / welcome dinner",
    },
    {
      day: "02",
      place: "Mtskheta",
      title: "The ancient capital and Iago's Winery",
      text: "Svetitskhoveli, Jvari Monastery and a tasting of signature wines at Iago's Winery.",
      image: "/georgia_wine.png",
      note: "Svetitskhoveli / Jvari / signature wines",
    },
    {
      day: "03",
      place: "Kakheti",
      title: "The land of wine",
      text: "Tsinandali Estate, Sighnaghi and a night at a winery with an evening tasting and dinner.",
      image: "/georgia_hero.png",
      note: "Tsinandali / Sighnaghi / winery stay",
    },
    {
      day: "04",
      place: "Telavi",
      title: "The wineries of Kakheti",
      text: "Bodbe Monastery, Gremi Fortress and two wineries, with a tasting, Georgian cooking class and dinner.",
      image: "/georgia_table.png",
      note: "Bodbe / Gremi / two wineries",
    },
    {
      day: "05",
      place: "Bolnisi",
      title: "History and nature",
      text: "Bolnisi Sioni, 19th-century German settlements, an outdoor picnic and an evening tasting at Diss Valley.",
      image: "/georgia_nature.png",
      note: "Ancient church / German heritage / Diss Valley",
    },
    {
      day: "06",
      place: "Uplistsikhe",
      title: "A cave city and sparkling wine",
      text: "Explore the ancient rock-cut city, taste sparkling wines at Shepidon and gather for a farewell dinner.",
      image: "/georgia_khachapuri.png",
      note: "Uplistsikhe / Shepidon / farewell dinner",
    },
    {
      day: "07",
      place: "Tbilisi",
      title: "Departure",
      text: "Airport transfer. Until we meet again in Georgia.",
      image: "/tbilisi/tbilisi_1.jpg",
      note: "Airport transfer",
    },
  ],
} as const;

const sharedCopy = {
  ru: {
    nav: ["Туры", "О нас", "Галерея", "Отзывы", "Контакты"],
    menu: "Открыть меню",
  },
  ua: {
    nav: ["Тури", "Про нас", "Галерея", "Відгуки", "Контакти"],
    menu: "Відкрити меню",
  },
  en: {
    nav: ["Tours", "About us", "Gallery", "Reviews", "Contacts"],
    menu: "Open menu",
  },
} as const;

export function SiteHeader() {
  const { language, setLanguage } = usePreferences();
  const copy = sharedCopy[language];
  const pathname = usePathname();
  const langDetailsRef = useRef<HTMLDetailsElement>(null);
  const navDetailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDetailsRef.current && langDetailsRef.current.open && !langDetailsRef.current.contains(event.target as Node)) {
        langDetailsRef.current.open = false;
      }
      if (navDetailsRef.current && navDetailsRef.current.open && !navDetailsRef.current.contains(event.target as Node)) {
        navDetailsRef.current.open = false;
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isToursActive = pathname === "/tours" || pathname.startsWith("/tours/");

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Left Side: Tours, Gallery, Reviews */}
        <nav className="desktop-nav-left" aria-label="Secondary navigation">
          <Link href="/tours" className={isToursActive ? "is-active" : ""}>{copy.nav[0]}</Link>
          <Link href="/gallery" className={pathname === "/gallery" ? "is-active" : ""}>{copy.nav[2]}</Link>
          <Link href="/reviews" className={pathname === "/reviews" ? "is-active" : ""}>{copy.nav[3]}</Link>
        </nav>

        {/* Center: Brand */}
        <Link href="/" className="brand brand-luxury" aria-label="Soul Georgia Travel, home">
          <Image
            src="/logo_main.png"
            alt="Soul Georgia Travel"
            width={1506}
            height={314}
            sizes="220px"
            priority
            className="brand-logo-img"
          />
        </Link>

        {/* Right Side: About, Contacts */}
        <div className="desktop-nav-right-container">
          <nav className="desktop-nav-right" aria-label="Primary navigation">
            <Link href="/about" className={pathname === "/about" ? "is-active" : ""}>{copy.nav[1]}</Link>
            <Link href="/contacts" className={pathname === "/contacts" ? "is-active" : ""}>{copy.nav[4]}</Link>
          </nav>
        </div>

        <div className="header-actions">
          <div className="preference-controls">
            {/* Desktop Lang Toggle */}
            <div className="language-toggle desktop-lang" aria-label="Language">
              {(["en", "ru", "ua"] as Language[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={language === item ? "is-active" : ""}
                  onClick={() => setLanguage(item)}
                  aria-pressed={language === item}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Mobile Lang Dropdown */}
            <details className="mobile-lang-nav" ref={langDetailsRef}>
              <summary aria-label="Change language">{language.toUpperCase()}</summary>
              <div className="mobile-lang-panel">
                {(["en", "ru", "ua"] as Language[]).map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={language === item ? "is-active" : ""}
                    onClick={() => {
                      setLanguage(item);
                      if (langDetailsRef.current) langDetailsRef.current.open = false;
                    }}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <details className="mobile-nav" ref={navDetailsRef}>
          <summary aria-label={copy.menu}><span /><span /></summary>
          <div className="mobile-nav-panel">
            <Link href="/tours" onClick={() => { if (navDetailsRef.current) navDetailsRef.current.open = false; }}>{copy.nav[0]}</Link>
            <Link href="/gallery" onClick={() => { if (navDetailsRef.current) navDetailsRef.current.open = false; }}>{copy.nav[2]}</Link>
            <Link href="/reviews" onClick={() => { if (navDetailsRef.current) navDetailsRef.current.open = false; }}>{copy.nav[3]}</Link>
            <Link href="/about" onClick={() => { if (navDetailsRef.current) navDetailsRef.current.open = false; }}>{copy.nav[1]}</Link>
            <Link href="/contacts" onClick={() => { if (navDetailsRef.current) navDetailsRef.current.open = false; }}>{copy.nav[4]}</Link>
          </div>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer className="site-footer site-footer-minimal">
      <span className="footer-copyright">{children}</span>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
