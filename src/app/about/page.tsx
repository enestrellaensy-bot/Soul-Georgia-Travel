"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePreferences } from "../preferences";
import { SiteHeader } from "../shared";
import styles from "./about.module.css";

function JourneyIcon({ index }: { index: number }) {
  const icons = [
    <><path d="M4 18c3-5 5-7 8-7s4 2 8-5" /><circle cx="4" cy="18" r="2" /><circle cx="20" cy="6" r="2" /></>,
    <><path d="M8 3h8l-1 7a4 4 0 0 1-3 3.8V20" /><path d="M8 10a4 4 0 0 0 4 4M8 21h8" /></>,
    <><path d="M12 3c-4 0-7 3-7 7 0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7Z" /><circle cx="12" cy="10" r="2.5" /></>,
    <><path d="m2 19 7-11 3 5 3-8 7 14H2Z" /><path d="m7 11 2 2 2-2m2 0 2 2 2-2" /></>,
    <><path d="M4 13c2-2 4-2 6 0l2 2 2-2c2-2 4-2 6 0" /><path d="m5 14 6 6a2 2 0 0 0 3 0l5-6" /><path d="M8 9a3 3 0 1 1 6 0" /></>,
    <><path d="M12 21a8 8 0 1 0-8-8" /><path d="M4 17v4h4M12 8v5l3 2" /></>,
  ];

  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[index]}</svg>;
}

const aboutCopy = {
  en: {
    section: "About us",
    previous: "Previous slide",
    next: "Next slide",
    blocks: [
      {
        title: "Georgia, shown by those who call it home",
        image: "/georgia_table.png",
        paragraphs: [
          "Soul Georgia Travel creates intimate, carefully designed journeys for people who want to experience Georgia rather than simply pass through it.",
          "Our routes bring together striking landscapes, food, wine, history, mountain roads and places that rarely appear in a standard itinerary.",
          "Whether this is your first visit, a wine and food journey or an active escape into the mountains, we shape the experience around a small group.",
        ],
      },
      {
        title: "Our guide",
        image: "/grig.jpg",
        paragraphs: [
          "Grigory is a lifelong Tbilisi resident who knows Georgia through everyday life, local friendships and years spent travelling its roads.",
          "He has worked in tourism for more than five years, welcomes guests at the airport and accompanies the group throughout the journey.",
          "He is always nearby to help, explain, recommend a local place and make every guest feel at home.",
        ],
      },
      {
        title: "More than seeing — truly feeling",
        image: "/georgia_wine.png",
        paragraphs: [
          "We introduce Georgia as a living country, not a collection of landmarks: through its people, flavours, traditions, unhurried rhythm and genuine hospitality.",
          "The atmosphere matters as much as the scenery — conversations around the table, family wineries, mountain roads, local cooking and spontaneous moments no conventional tour can reproduce.",
        ],
      },
      {
        title: "Small groups, never mass tourism",
        image: "/georgia_nature.png",
        paragraphs: [
          "Our groups are intentionally small, usually eight to ten guests.",
          "This gives everyone space, comfort and personal attention while preserving the warm, easy atmosphere that makes a journey memorable.",
          "Nobody should feel like a number on a coach tour. We want every guest to feel relaxed, looked after and genuinely involved.",
        ],
      },
      {
        title: "With you from arrival to departure",
        image: "/tbilisi/tbilisi_1.jpg",
        paragraphs: [
          "You are never left to navigate the journey alone. Our care does not end after the airport welcome and hotel check-in.",
          "Grigory accompanies the group from the first day to the last. A lifelong Tbilisi resident, he has worked in tourism for more than seven years and knows Georgia from the inside.",
          "He welcomes guests at the airport, travels the full route with the group and is always there to help. That continuous presence makes the journey calm, personal and effortless.",
        ],
      },
      {
        title: "What your journey includes",
        image: "/georgia_khachapuri.png",
        list: [
          "Original routes across Georgia",
          "Family wineries and local gastronomy",
          "Hidden places beyond mass tourism",
          "Mountain routes and walking trails",
          "Genuine Georgian hospitality",
          "Support throughout the entire journey",
        ],
      },
      {
        title: "Journeys we would create for friends",
        image: "/georgia_hero.png",
        paragraphs: [
          "We design every journey as if we were planning it for our own friends.",
          "No rushing. No crowds. No impersonal service.",
          "Just real Georgia, good people, beautiful places and experiences that remain with you long after you return home.",
        ],
      },
    ],
  },
  ru: {
    section: "О нас",
    previous: "Предыдущий слайд",
    next: "Следующий слайд",
    blocks: [
      {
        title: "Грузия, которую показывают свои",
        image: "/georgia_table.png",
        paragraphs: [
          "Soul Georgia Travel создаёт камерные авторские путешествия для тех, кто хочет не просто увидеть Грузию, а почувствовать её атмосферу, людей, традиции и ритм жизни.",
          "В наших маршрутах соединяются природа, гастрономия, вино, история, горные дороги и места, которые редко встречаются в стандартных туристических программах.",
          "Первое знакомство со страной, винно-гастрономический тур или активное путешествие по горам — мы подбираем формат под небольшую группу.",
        ],
      },
      {
        title: "Наш гид",
        image: "/grig.jpg",
        paragraphs: [
          "Григорий — коренной житель Тбилиси, который знает Грузию через повседневную жизнь, местных людей и годы путешествий по стране.",
          "Он более пяти лет работает в туризме, встречает гостей в аэропорту и сопровождает группу на протяжении всего маршрута.",
          "Он всегда рядом, чтобы помочь, рассказать, посоветовать местное место и сделать путешествие по-настоящему гостеприимным.",
        ],
      },
      {
        title: "Не просто посмотреть — почувствовать",
        image: "/georgia_wine.png",
        paragraphs: [
          "Мы показываем Грузию не как набор точек на карте, а как живую страну — через её людей, вкусы, традиции, неспешный ритм и настоящее гостеприимство.",
          "Для нас атмосфера не менее важна, чем красивые места: разговоры за столом, семейные винодельни, дороги через горы, местная кухня и моменты, которые невозможно повторить на обычной экскурсии.",
        ],
      },
      {
        title: "Камерные группы без туристического конвейера",
        image: "/georgia_nature.png",
        paragraphs: [
          "Мы путешествуем небольшими группами — обычно от восьми до десяти человек.",
          "Такой формат сохраняет комфорт, внимание к каждому гостю и тёплую, естественную атмосферу внутри поездки.",
          "Никто не должен чувствовать себя просто «одним из группы». Нам важно, чтобы каждому было спокойно, удобно и по-настоящему интересно.",
        ],
      },
      {
        title: "С вами с первого до последнего дня",
        image: "/tbilisi/tbilisi_1.jpg",
        paragraphs: [
          "Вы не останетесь один на один с поездкой. Наше сопровождение не заканчивается после встречи в аэропорту и заселения в отель.",
          "С первого до последнего дня рядом с группой находится Григорий — коренной житель Тбилиси, который всю жизнь живёт в Грузии и более семи лет работает в туризме.",
          "Он встречает гостей, проходит вместе с ними весь маршрут и всегда остаётся на связи. Благодаря этому путешествие получается спокойным, личным и комфортным.",
        ],
      },
      {
        title: "Что вас ждёт в путешествии",
        image: "/georgia_khachapuri.png",
        list: [
          "Авторские маршруты по Грузии",
          "Семейные винодельни и локальная гастрономия",
          "Скрытые места вдали от массового туризма",
          "Горные маршруты и пешие прогулки",
          "Настоящее грузинское гостеприимство",
          "Полное сопровождение на протяжении поездки",
        ],
      },
      {
        title: "Путешествия, как для своих друзей",
        image: "/georgia_hero.png",
        paragraphs: [
          "Каждое путешествие мы создаём так, как сделали бы его для собственных друзей.",
          "Без спешки. Без толп. Без формального отношения.",
          "Только настоящая Грузия, хорошие люди, красивые места и впечатления, которые остаются с вами надолго.",
        ],
      },
    ],
  },
  ua: {
    section: "Про нас",
    previous: "Попередній слайд",
    next: "Наступний слайд",
    blocks: [
      {
        title: "Грузія, яку показують свої",
        image: "/georgia_table.png",
        paragraphs: [
          "Soul Georgia Travel створює камерні авторські подорожі для тих, хто хоче не просто побачити Грузію, а відчути її атмосферу, людей, традиції та ритм життя.",
          "У наших маршрутах поєднуються природа, гастрономія, вино, історія, гірські дороги й місця, які рідко потрапляють до стандартних туристичних програм.",
          "Перше знайомство з країною, винно-гастрономічний тур чи активна мандрівка горами — ми добираємо формат для невеликої групи.",
        ],
      },
      {
        title: "Наш гід",
        image: "/grig.jpg",
        paragraphs: [
          "Григорій — корінний житель Тбілісі, який знає Грузію через повсякденне життя, місцевих людей і роки подорожей країною.",
          "Він понад п’ять років працює в туризмі, зустрічає гостей в аеропорту та супроводжує групу протягом усього маршруту.",
          "Він завжди поруч, щоб допомогти, розповісти, порадити місцеве місце та зробити подорож по-справжньому гостинною.",
        ],
      },
      {
        title: "Не просто побачити — відчути",
        image: "/georgia_wine.png",
        paragraphs: [
          "Ми показуємо Грузію не як набір точок на мапі, а як живу країну — через її людей, смаки, традиції, неквапливий ритм і щиру гостинність.",
          "Для нас атмосфера не менш важлива за краєвиди: розмови за столом, сімейні виноробні, дороги крізь гори, місцева кухня й моменти, які неможливо відтворити на звичайній екскурсії.",
        ],
      },
      {
        title: "Камерні групи без туристичного конвеєра",
        image: "/georgia_nature.png",
        paragraphs: [
          "Ми подорожуємо невеликими групами — зазвичай від восьми до десяти гостей.",
          "Такий формат зберігає комфорт, увагу до кожного й теплу, невимушену атмосферу всередині подорожі.",
          "Ніхто не має почуватися просто «одним із групи». Нам важливо, щоб кожному було спокійно, зручно та справді цікаво.",
        ],
      },
      {
        title: "Поруч від першого до останнього дня",
        image: "/tbilisi/tbilisi_1.jpg",
        paragraphs: [
          "Ви не залишаєтеся сам на сам із поїздкою. Наш супровід не закінчується після зустрічі в аеропорту та заселення до готелю.",
          "Від першого до останнього дня поруч із групою перебуває Григорій — корінний житель Тбілісі, який усе життя мешкає у Грузії та понад сім років працює в туризмі.",
          "Він зустрічає гостей, проходить разом із ними весь маршрут і завжди залишається на зв’язку. Завдяки цьому подорож є спокійною, особистою та комфортною.",
        ],
      },
      {
        title: "Що чекає на вас у подорожі",
        image: "/georgia_khachapuri.png",
        list: [
          "Авторські маршрути Грузією",
          "Сімейні виноробні та локальна гастрономія",
          "Приховані місця далеко від масового туризму",
          "Гірські маршрути й піші прогулянки",
          "Справжня грузинська гостинність",
          "Повний супровід протягом усієї подорожі",
        ],
      },
      {
        title: "Подорожі, як для власних друзів",
        image: "/georgia_hero.png",
        paragraphs: [
          "Кожну подорож ми створюємо так, як зробили б її для власних друзів.",
          "Без поспіху. Без натовпів. Без формального ставлення.",
          "Лише справжня Грузія, хороші люди, красиві місця та враження, які залишаються з вами надовго.",
        ],
      },
    ],
  },
} as const;

const guideParagraphs = {
  ru: [
    "Здравствуйте! Меня зовут Григорий.",
    "Уже более семи лет я работаю в сфере туризма и гостеприимства: организую путешествия и помогаю гостям открывать для себя Грузию. За это время я приобрёл большой опыт работы с туристическими группами и хорошо знаю, как сделать поездку комфортной, интересной и насыщенной впечатлениями.",
    "Мои туры — это возможность увидеть самые красивые уголки страны, познакомиться с её историей, культурой, традициями и знаменитой грузинской кухней. Я уделяю внимание не только маршруту, но и атмосфере путешествия, чтобы каждый гость чувствовал себя комфортно и увёз с собой самые тёплые воспоминания о Грузии.",
    "Буду рад познакомить вас с моей страной и показать её такой, какой её знают и любят местные жители.",
  ],
  en: [
    "Hello! My name is Grigory.",
    "For more than seven years, I have worked in tourism and hospitality, organising journeys and helping guests discover Georgia. During this time, I have gained extensive experience working with tour groups and learned how to make every trip comfortable, engaging and full of memorable experiences.",
    "My tours offer the opportunity to see the country's most beautiful places and discover its history, culture, traditions and famous Georgian cuisine. I pay attention not only to the itinerary but also to the atmosphere of the journey, so that every guest feels comfortable and takes home the warmest memories of Georgia.",
    "I would be delighted to introduce you to my country and show you Georgia as the locals know and love it.",
  ],
  ua: [
    "Вітаю! Мене звати Григорій.",
    "Уже понад сім років я працюю у сфері туризму та гостинності: організовую подорожі й допомагаю гостям відкривати для себе Грузію. За цей час я здобув великий досвід роботи з туристичними групами та добре знаю, як зробити поїздку комфортною, цікавою й насиченою враженнями.",
    "Мої тури — це можливість побачити найкрасивіші куточки країни, познайомитися з її історією, культурою, традиціями та знаменитою грузинською кухнею. Я приділяю увагу не лише маршруту, а й атмосфері подорожі, щоб кожен гість почувався комфортно та привіз із собою найтепліші спогади про Грузію.",
    "Буду радий познайомити вас із моєю країною та показати її такою, якою її знають і люблять місцеві жителі.",
  ],
} as const;

export default function AboutPage() {
  const { language } = usePreferences();
  const copy = aboutCopy[language];
  const blocks = copy.blocks.map((block, index) => (
    index === 1 ? { ...block, paragraphs: guideParagraphs[language] } : block
  ));
  const [current, setCurrent] = useState(0);

  const show = (index: number) => {
    setCurrent(Math.max(0, Math.min(blocks.length - 1, index)));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setCurrent((value) => Math.max(0, value - 1));
      }
      if (event.key === "ArrowRight") {
        setCurrent((value) => Math.min(blocks.length - 1, value + 1));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [blocks.length]);

  useEffect(() => {
    const copyElements = document.querySelectorAll(`.${styles.copy}`);
    copyElements.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [current]);

  return (
    <main className={`${styles.page} about-page`}>
      <SiteHeader />
      <div className={styles.slider}>
        {blocks.map((block, index) => (
          <section
            className={`${styles.block} ${index === current ? styles.active : ""}`}
            key={block.title}
            aria-hidden={index !== current}
          >
            <div className={`${styles.image} ${block.image === "/grig.jpg" ? styles.guideImage : ""}`}>
              <Image src={block.image} alt="" fill priority={index === 0} sizes="(max-width: 800px) 100vw, 49vw" />
            </div>
            <div className={styles.copy}>
              <span>{copy.section} · 0{index + 1}</span>
              <h2>{block.title}</h2>
              {"paragraphs" in block && block.paragraphs.map((text) => <p key={text}>{text}</p>)}
              {"list" in block && (
                <ul className={index === 5 ? styles.journeyList : undefined}>
                  {block.list.map((item, itemIndex) => (
                    <li key={item}>
                      {index === 5 && <span className={styles.journeyIcon}><JourneyIcon index={itemIndex} /></span>}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
        <button className={`${styles.arrow} ${styles.prev}`} onClick={() => show(current - 1)} disabled={current === 0} aria-label={copy.previous}>←</button>
        <button className={`${styles.arrow} ${styles.next}`} onClick={() => show(current + 1)} disabled={current === blocks.length - 1} aria-label={copy.next}>→</button>
        <div className={styles.counter}>0{current + 1} / 0{blocks.length}</div>
      </div>
    </main>
  );
}
