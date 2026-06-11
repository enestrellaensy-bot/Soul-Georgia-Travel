"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePreferences } from "../preferences";
import { SiteHeader } from "../shared";

const locations = [
  { id: "kakheti", ru: "Кахетия", ua: "Кахетія", en: "Kakheti" },
  { id: "mtskheta", ru: "Мцхета-Мтианети", ua: "Мцхета-Мтіанеті", en: "Mtskheta-Mtianeti" },
  { id: "shida-kartli", ru: "Шида-Картли", ua: "Шида-Картлі", en: "Shida Kartli" },
  { id: "kvemo-kartli", ru: "Квемо-Картли", ua: "Квемо-Картлі", en: "Kvemo Kartli" },
  { id: "samtskhe-javakheti", ru: "Самцхе-Джавахети", ua: "Самцхе-Джавахеті", en: "Samtskhe-Javakheti" },
  { id: "imereti", ru: "Имеретия", ua: "Імеретія", en: "Imereti" },
  { id: "guria", ru: "Гурия", ua: "Гурія", en: "Guria" },
  { id: "racha", ru: "Рача-Лечхуми", ua: "Рача-Лечхумі", en: "Racha-Lechkhumi" },
  { id: "samegrelo", ru: "Самегрело", ua: "Самегрело", en: "Samegrelo" },
  { id: "adjara", ru: "Аджария", ua: "Аджарія", en: "Adjara" },
  { id: "tbilisi", ru: "Тбилиси", ua: "Тбілісі", en: "Tbilisi" },
] as const;

const galleryCopy = {
  ru: {
    eyebrow: "Интерактивный гид",
    title: "Наш маршрут по Грузии",
    text: "Выберите город или регион на карте, чтобы посмотреть фотографии и прочувствовать атмосферу каждого места.",
    images: [
      { src: "/georgia_hero.png", alt: "Горы Кавказа", caption: "Величественные горы Кавказа", location: "all" },
      // Тбилиси
      { src: "/tbilisi/tbilisi_1.jpg", alt: "Тбилиси", caption: "Атмосфера Тбилиси", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_2.jpg", alt: "Тбилиси", caption: "Улицы старого города", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_3.jpg", alt: "Тбилиси", caption: "Архитектура столицы", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_4.jpg", alt: "Тбилиси", caption: "Панорамы Тбилиси", location: "tbilisi" },
      // Кахетия
      { src: "/kaheti/kaheti_1.jpg", alt: "Кахетия", caption: "Пейзажи Кахетии", location: "kakheti" },
      { src: "/kaheti/kaheti_2.jpg", alt: "Кахетия", caption: "Винный край Грузии", location: "kakheti" },
      { src: "/kaheti/kaheti_3.jpg", alt: "Кахетия", caption: "Дороги Кахетии", location: "kakheti" },
      { src: "/kaheti/kaheti_4.jpg", alt: "Кахетия", caption: "Атмосфера региона", location: "kakheti" },
      { src: "/kaheti/kaheti_5.jpg", alt: "Кахетия", caption: "Виноградники Кахетии", location: "kakheti" },
      // Мцхета-Мтианети
      { src: "/mcheti/mcheti_1.jpg", alt: "Мцхета-Мтианети", caption: "Древние храмы Мцхеты", location: "mtskheta" },
      { src: "/mcheti/mcheti_2.jpg", alt: "Мцхета-Мтианети", caption: "Пейзажи Мцхета-Мтианети", location: "mtskheta" },
      { src: "/mcheti/mcheti_3.jpg", alt: "Мцхета-Мтианети", caption: "История и архитектура", location: "mtskheta" },
      { src: "/mcheti/mcheti_4.jpg", alt: "Мцхета-Мтианети", caption: "Горы Мцхета-Мтианети", location: "mtskheta" },
      // Шида-Картли
      { src: "/shida/1.jpg", alt: "Шида-Картли", caption: "Пейзажи Шида-Картли", location: "shida-kartli" },
      { src: "/shida/2.jpg", alt: "Шида-Картли", caption: "Природа региона", location: "shida-kartli" },
      { src: "/shida/3.jpg", alt: "Шида-Картли", caption: "Историческое наследие", location: "shida-kartli" },
      { src: "/shida/4.jpg", alt: "Шида-Картли", caption: "Атмосфера Шида-Картли", location: "shida-kartli" },
      // Квемо-Картли
      { src: "/kvemo/1.jpg", alt: "Квемо-Картли", caption: "Пейзажи Квемо-Картли", location: "kvemo-kartli" },
      { src: "/kvemo/2.webp", alt: "Квемо-Картли", caption: "Природа региона", location: "kvemo-kartli" },
      { src: "/kvemo/3.jpg", alt: "Квемо-Картли", caption: "Историческое наследие", location: "kvemo-kartli" },
      { src: "/kvemo/4.jpg", alt: "Квемо-Картли", caption: "Атмосфера Квемо-Картли", location: "kvemo-kartli" },
      // Самцхе-Джавахети
      { src: "/samche/1.jpg", alt: "Самцхе-Джавахети", caption: "Пейзажи Самцхе-Джавахети", location: "samtskhe-javakheti" },
      { src: "/samche/2.jpg", alt: "Самцхе-Джавахети", caption: "Крепости и монастыри", location: "samtskhe-javakheti" },
      { src: "/samche/3.webp", alt: "Самцхе-Джавахети", caption: "Природа региона", location: "samtskhe-javakheti" },
      { src: "/samche/4.png", alt: "Самцхе-Джавахети", caption: "Атмосфера Самцхе-Джавахети", location: "samtskhe-javakheti" },
      // Имеретия
      { src: "/imeretia/1.jpg", alt: "Имеретия", caption: "Пейзажи Имеретии", location: "imereti" },
      { src: "/imeretia/2.jpg", alt: "Имеретия", caption: "Пещеры и каньоны", location: "imereti" },
      { src: "/imeretia/3.jpg", alt: "Имеретия", caption: "Природа Имеретии", location: "imereti" },
      { src: "/imeretia/4.jpg", alt: "Имеретия", caption: "Атмосфера региона", location: "imereti" },
      // Гурия
      { src: "/guria/1.avif", alt: "Гурия", caption: "Пейзажи Гурии", location: "guria" },
      { src: "/guria/2.jpg", alt: "Гурия", caption: "Природа Гурии", location: "guria" },
      { src: "/guria/3.jpg", alt: "Гурия", caption: "Сельская жизнь", location: "guria" },
      { src: "/guria/4.jpg", alt: "Гурия", caption: "Атмосфера Гурии", location: "guria" },
      // Рача-Лечхуми
      { src: "/racha/racha-lechkhumi.jpg", alt: "Рача-Лечхуми", caption: "Горы Рача-Лечхуми", location: "racha" },
      { src: "/racha/rachkha-waterfall2.jpg", alt: "Рача-Лечхуми", caption: "Водопады региона", location: "racha" },
      { src: "/racha/3PeDK2vYjY7uWgnU624c9r_smedium.jpg", alt: "Рача-Лечхуми", caption: "Природа Рача-Лечхуми", location: "racha" },
      // Самегрело
      { src: "/samegrelo/1.jpg", alt: "Самегрело", caption: "Пейзажи Самегрело", location: "samegrelo" },
      { src: "/samegrelo/2.jpg", alt: "Самегрело", caption: "Природа региона", location: "samegrelo" },
      { src: "/samegrelo/3.jpg", alt: "Самегрело", caption: "Колхидские леса", location: "samegrelo" },
      { src: "/samegrelo/4.jpg", alt: "Самегрело", caption: "Атмосфера Самегрело", location: "samegrelo" },
      // Аджария
      { src: "/adjaria/1.jpg", alt: "Аджария", caption: "Пейзажи Аджарии", location: "adjara" },
      { src: "/adjaria/2.jpg", alt: "Аджария", caption: "Побережье Батуми", location: "adjara" },
      { src: "/adjaria/3.jpg", alt: "Аджария", caption: "Горная Аджария", location: "adjara" },
      { src: "/adjaria/4.jpg", alt: "Аджария", caption: "Атмосфера Аджарии", location: "adjara" },
    ],
  },
  ua: {
    eyebrow: "Інтерактивний гід",
    title: "Наш маршрут Грузією",
    text: "Оберіть місто або регіон на карті, щоб подивитися фотографії та відчути атмосферу кожного місця.",
    images: [
      { src: "/georgia_hero.png", alt: "Гори Кавказу", caption: "Величні гори Кавказу", location: "all" },
      // Тбілісі
      { src: "/tbilisi/tbilisi_1.jpg", alt: "Тбілісі", caption: "Атмосфера Тбілісі", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_2.jpg", alt: "Тбілісі", caption: "Вулиці старого міста", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_3.jpg", alt: "Тбілісі", caption: "Архітектура столиці", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_4.jpg", alt: "Тбілісі", caption: "Панорами Тбілісі", location: "tbilisi" },
      // Кахетія
      { src: "/kaheti/kaheti_1.jpg", alt: "Кахетія", caption: "Краєвиди Кахетії", location: "kakheti" },
      { src: "/kaheti/kaheti_2.jpg", alt: "Кахетія", caption: "Винний край Грузії", location: "kakheti" },
      { src: "/kaheti/kaheti_3.jpg", alt: "Кахетія", caption: "Дороги Кахетії", location: "kakheti" },
      { src: "/kaheti/kaheti_4.jpg", alt: "Кахетія", caption: "Атмосфера регіону", location: "kakheti" },
      { src: "/kaheti/kaheti_5.jpg", alt: "Кахетія", caption: "Виноградники Кахетії", location: "kakheti" },
      // Мцхета-Мтіанеті
      { src: "/mcheti/mcheti_1.jpg", alt: "Мцхета-Мтіанеті", caption: "Стародавні храми Мцхети", location: "mtskheta" },
      { src: "/mcheti/mcheti_2.jpg", alt: "Мцхета-Мтіанеті", caption: "Краєвиди Мцхета-Мтіанеті", location: "mtskheta" },
      { src: "/mcheti/mcheti_3.jpg", alt: "Мцхета-Мтіанеті", caption: "Історія та архітектура", location: "mtskheta" },
      { src: "/mcheti/mcheti_4.jpg", alt: "Мцхета-Мтіанеті", caption: "Гори Мцхета-Мтіанеті", location: "mtskheta" },
      // Шида-Картлі
      { src: "/shida/1.jpg", alt: "Шида-Картлі", caption: "Краєвиди Шида-Картлі", location: "shida-kartli" },
      { src: "/shida/2.jpg", alt: "Шида-Картлі", caption: "Природа регіону", location: "shida-kartli" },
      { src: "/shida/3.jpg", alt: "Шида-Картлі", caption: "Історична спадщина", location: "shida-kartli" },
      { src: "/shida/4.jpg", alt: "Шида-Картлі", caption: "Атмосфера Шида-Картлі", location: "shida-kartli" },
      // Квемо-Картлі
      { src: "/kvemo/1.jpg", alt: "Квемо-Картлі", caption: "Краєвиди Квемо-Картлі", location: "kvemo-kartli" },
      { src: "/kvemo/2.webp", alt: "Квемо-Картлі", caption: "Природа регіону", location: "kvemo-kartli" },
      { src: "/kvemo/3.jpg", alt: "Квемо-Картлі", caption: "Історична спадщина", location: "kvemo-kartli" },
      { src: "/kvemo/4.jpg", alt: "Квемо-Картлі", caption: "Атмосфера Квемо-Картлі", location: "kvemo-kartli" },
      // Самцхе-Джавахеті
      { src: "/samche/1.jpg", alt: "Самцхе-Джавахеті", caption: "Краєвиди Самцхе-Джавахеті", location: "samtskhe-javakheti" },
      { src: "/samche/2.jpg", alt: "Самцхе-Джавахеті", caption: "Фортеці та монастирі", location: "samtskhe-javakheti" },
      { src: "/samche/3.webp", alt: "Самцхе-Джавахеті", caption: "Природа регіону", location: "samtskhe-javakheti" },
      { src: "/samche/4.png", alt: "Самцхе-Джавахеті", caption: "Атмосфера Самцхе-Джавахеті", location: "samtskhe-javakheti" },
      // Імеретія
      { src: "/imeretia/1.jpg", alt: "Імеретія", caption: "Краєвиди Імеретії", location: "imereti" },
      { src: "/imeretia/2.jpg", alt: "Імеретія", caption: "Печери та каньйони", location: "imereti" },
      { src: "/imeretia/3.jpg", alt: "Імеретія", caption: "Природа Імеретії", location: "imereti" },
      { src: "/imeretia/4.jpg", alt: "Імеретія", caption: "Атмосфера регіону", location: "imereti" },
      // Гурія
      { src: "/guria/1.avif", alt: "Гурія", caption: "Краєвиди Гурії", location: "guria" },
      { src: "/guria/2.jpg", alt: "Гурія", caption: "Природа Гурії", location: "guria" },
      { src: "/guria/3.jpg", alt: "Гурія", caption: "Сільське життя", location: "guria" },
      { src: "/guria/4.jpg", alt: "Гурія", caption: "Атмосфера Гурії", location: "guria" },
      // Рача-Лечхумі
      { src: "/racha/racha-lechkhumi.jpg", alt: "Рача-Лечхумі", caption: "Гори Рача-Лечхумі", location: "racha" },
      { src: "/racha/rachkha-waterfall2.jpg", alt: "Рача-Лечхумі", caption: "Водоспади регіону", location: "racha" },
      { src: "/racha/3PeDK2vYjY7uWgnU624c9r_smedium.jpg", alt: "Рача-Лечхумі", caption: "Природа Рача-Лечхумі", location: "racha" },
      // Самегрело
      { src: "/samegrelo/1.jpg", alt: "Самегрело", caption: "Краєвиди Самегрело", location: "samegrelo" },
      { src: "/samegrelo/2.jpg", alt: "Самегрело", caption: "Природа регіону", location: "samegrelo" },
      { src: "/samegrelo/3.jpg", alt: "Самегрело", caption: "Колхідські ліси", location: "samegrelo" },
      { src: "/samegrelo/4.jpg", alt: "Самегрело", caption: "Атмосфера Самегрело", location: "samegrelo" },
      // Аджарія
      { src: "/adjaria/1.jpg", alt: "Аджарія", caption: "Краєвиди Аджарії", location: "adjara" },
      { src: "/adjaria/2.jpg", alt: "Аджарія", caption: "Узбережжя Батумі", location: "adjara" },
      { src: "/adjaria/3.jpg", alt: "Аджарія", caption: "Гірська Аджарія", location: "adjara" },
      { src: "/adjaria/4.jpg", alt: "Аджарія", caption: "Атмосфера Аджарії", location: "adjara" },
    ],
  },
  en: {
    eyebrow: "Interactive Guide",
    title: "Our Route in Georgia",
    text: "Select a city or region on the map to view photos and feel the unique atmosphere of each location.",
    images: [
      { src: "/georgia_hero.png", alt: "Caucasus Mountains", caption: "Majestic Caucasus mountains", location: "all" },
      // Tbilisi
      { src: "/tbilisi/tbilisi_1.jpg", alt: "Tbilisi", caption: "The atmosphere of Tbilisi", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_2.jpg", alt: "Tbilisi", caption: "Old Town streets", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_3.jpg", alt: "Tbilisi", caption: "Architecture of the capital", location: "tbilisi" },
      { src: "/tbilisi/tbilisi_4.jpg", alt: "Tbilisi", caption: "Tbilisi panoramas", location: "tbilisi" },
      // Kakheti
      { src: "/kaheti/kaheti_1.jpg", alt: "Kakheti", caption: "Landscapes of Kakheti", location: "kakheti" },
      { src: "/kaheti/kaheti_2.jpg", alt: "Kakheti", caption: "Georgia's wine country", location: "kakheti" },
      { src: "/kaheti/kaheti_3.jpg", alt: "Kakheti", caption: "Roads through Kakheti", location: "kakheti" },
      { src: "/kaheti/kaheti_4.jpg", alt: "Kakheti", caption: "The atmosphere of the region", location: "kakheti" },
      { src: "/kaheti/kaheti_5.jpg", alt: "Kakheti", caption: "Vineyards of Kakheti", location: "kakheti" },
      // Mtskheta-Mtianeti
      { src: "/mcheti/mcheti_1.jpg", alt: "Mtskheta-Mtianeti", caption: "Ancient churches of Mtskheta", location: "mtskheta" },
      { src: "/mcheti/mcheti_2.jpg", alt: "Mtskheta-Mtianeti", caption: "Landscapes of Mtskheta-Mtianeti", location: "mtskheta" },
      { src: "/mcheti/mcheti_3.jpg", alt: "Mtskheta-Mtianeti", caption: "History and architecture", location: "mtskheta" },
      { src: "/mcheti/mcheti_4.jpg", alt: "Mtskheta-Mtianeti", caption: "Mountains of Mtskheta-Mtianeti", location: "mtskheta" },
      // Shida Kartli
      { src: "/shida/1.jpg", alt: "Shida Kartli", caption: "Landscapes of Shida Kartli", location: "shida-kartli" },
      { src: "/shida/2.jpg", alt: "Shida Kartli", caption: "Nature of the region", location: "shida-kartli" },
      { src: "/shida/3.jpg", alt: "Shida Kartli", caption: "Historical heritage", location: "shida-kartli" },
      { src: "/shida/4.jpg", alt: "Shida Kartli", caption: "The atmosphere of Shida Kartli", location: "shida-kartli" },
      // Kvemo Kartli
      { src: "/kvemo/1.jpg", alt: "Kvemo Kartli", caption: "Landscapes of Kvemo Kartli", location: "kvemo-kartli" },
      { src: "/kvemo/2.webp", alt: "Kvemo Kartli", caption: "Nature of the region", location: "kvemo-kartli" },
      { src: "/kvemo/3.jpg", alt: "Kvemo Kartli", caption: "Historical heritage", location: "kvemo-kartli" },
      { src: "/kvemo/4.jpg", alt: "Kvemo Kartli", caption: "The atmosphere of Kvemo Kartli", location: "kvemo-kartli" },
      // Samtskhe-Javakheti
      { src: "/samche/1.jpg", alt: "Samtskhe-Javakheti", caption: "Landscapes of Samtskhe-Javakheti", location: "samtskhe-javakheti" },
      { src: "/samche/2.jpg", alt: "Samtskhe-Javakheti", caption: "Fortresses and monasteries", location: "samtskhe-javakheti" },
      { src: "/samche/3.webp", alt: "Samtskhe-Javakheti", caption: "Nature of the region", location: "samtskhe-javakheti" },
      { src: "/samche/4.png", alt: "Samtskhe-Javakheti", caption: "The atmosphere of Samtskhe-Javakheti", location: "samtskhe-javakheti" },
      // Imereti
      { src: "/imeretia/1.jpg", alt: "Imereti", caption: "Landscapes of Imereti", location: "imereti" },
      { src: "/imeretia/2.jpg", alt: "Imereti", caption: "Caves and canyons", location: "imereti" },
      { src: "/imeretia/3.jpg", alt: "Imereti", caption: "Nature of Imereti", location: "imereti" },
      { src: "/imeretia/4.jpg", alt: "Imereti", caption: "The atmosphere of the region", location: "imereti" },
      // Guria
      { src: "/guria/1.avif", alt: "Guria", caption: "Landscapes of Guria", location: "guria" },
      { src: "/guria/2.jpg", alt: "Guria", caption: "Nature of Guria", location: "guria" },
      { src: "/guria/3.jpg", alt: "Guria", caption: "Rural life", location: "guria" },
      { src: "/guria/4.jpg", alt: "Guria", caption: "The atmosphere of Guria", location: "guria" },
      // Racha-Lechkhumi
      { src: "/racha/racha-lechkhumi.jpg", alt: "Racha-Lechkhumi", caption: "Mountains of Racha-Lechkhumi", location: "racha" },
      { src: "/racha/rachkha-waterfall2.jpg", alt: "Racha-Lechkhumi", caption: "Waterfalls of the region", location: "racha" },
      { src: "/racha/3PeDK2vYjY7uWgnU624c9r_smedium.jpg", alt: "Racha-Lechkhumi", caption: "Nature of Racha-Lechkhumi", location: "racha" },
      // Samegrelo
      { src: "/samegrelo/1.jpg", alt: "Samegrelo", caption: "Landscapes of Samegrelo", location: "samegrelo" },
      { src: "/samegrelo/2.jpg", alt: "Samegrelo", caption: "Nature of the region", location: "samegrelo" },
      { src: "/samegrelo/3.jpg", alt: "Samegrelo", caption: "Colchic forests", location: "samegrelo" },
      { src: "/samegrelo/4.jpg", alt: "Samegrelo", caption: "The atmosphere of Samegrelo", location: "samegrelo" },
      // Adjara
      { src: "/adjaria/1.jpg", alt: "Adjara", caption: "Landscapes of Adjara", location: "adjara" },
      { src: "/adjaria/2.jpg", alt: "Adjara", caption: "Batumi coastline", location: "adjara" },
      { src: "/adjaria/3.jpg", alt: "Adjara", caption: "Highland Adjara", location: "adjara" },
      { src: "/adjaria/4.jpg", alt: "Adjara", caption: "The atmosphere of Adjara", location: "adjara" },
    ],
  },
} as const;

export default function GalleryPage() {
  const { language } = usePreferences();
  const copy = galleryCopy[language];
  const [selectedLoc, setSelectedLoc] = useState<string>("kakheti");
  const [hoveredLoc, setHoveredLoc] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const marqueeHovered = useRef(false);

  const filteredImages = copy.images.filter(
    (img) => img.location === selectedLoc,
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : prev));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [selectedLoc]);

  useEffect(() => {
    let frame = 0;
    let position = 0;
    const speed = 0.385;

    const animate = () => {
      const marquee = carouselRef.current;
      if (marquee && !marqueeHovered.current) {
        position -= speed;
        const halfWidth = marquee.scrollWidth / 2;
        if (Math.abs(position) >= halfWidth) position = 0;
        marquee.style.transform = `translate3d(${position}px, 0, 0)`;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [selectedLoc, filteredImages.length]);

  // Check if a region is active or hovered
  const checkActive = (regionId: string) => regionId === selectedLoc;

  const checkHovered = (regionId: string) => {
    if (!hoveredLoc) return false;
    return regionId === hoveredLoc;
  };

  // Get inline styling for region paths mimicking the Spain map
  const getPathStyle = (regionId: string) => {
    const isInteractive = locations.some((location) => location.id === regionId);

    if (!isInteractive) {
      return {
        fill: "#f2eee4",
        stroke: "#6f6a61",
        strokeWidth: "2px",
        vectorEffect: "non-scaling-stroke" as const,
        cursor: "default",
      };
    }

    const isActive = checkActive(regionId);
    const isHovered = checkHovered(regionId);

    return {
      fill: isActive || isHovered ? "url(#flagTexture)" : "#f2eee4",
      stroke: isActive || isHovered ? "#b51f2d" : "#4e4942",
      strokeWidth: isActive || isHovered ? "4px" : "2.5px",
      strokeLinejoin: "round" as const,
      strokeLinecap: "round" as const,
      paintOrder: "stroke fill" as const,
      vectorEffect: "non-scaling-stroke" as const,
      transition: "fill 150ms ease, stroke 150ms ease, stroke-width 150ms ease",
      cursor: "pointer",
    };
  };



  return (
    <main className="gallery-page">
      <div className="gallery-background" aria-hidden="true">
        <Image
          src="/geleria_fon.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
      <SiteHeader />

      {/* Full-viewport 2-column layout */}
      <section className="gallery-layout-section">
        {/* Left: Map centered vertically */}
        <div className="gallery-map-column">
          <div style={{ width: "100%" }}>
            <svg
              viewBox="0 0 1000 500"
              style={{
                width: "100%",
                height: "auto",
                filter: "drop-shadow(0 12px 20px rgba(55, 47, 38, 0.12))",
              }}
            >
              <defs>
                <pattern
                  id="flagTexture"
                  width="1000"
                  height="500"
                  patternUnits="userSpaceOnUse"
                >
                  <image
                    href="/galeria_map2.png"
                    x="130"
                    y="50"
                    width="820"
                    height="400"
                    preserveAspectRatio="none"
                  />
                </pattern>
              </defs>

              <path
                d="M 333.9,102.3 L 330.4,108.8 L 330.4,112.2 L 331.8,115.0 L 330.9,117.4 L 327.3,123.3 L 322.6,126.3 L 319.4,130.8 L 309.3,131.9 L 305.5,133.3 L 299.4,134.1 L 295.9,135.7 L 297.3,139.1 L 300.3,139.4 L 300.2,145.3 L 302.4,147.3 L 303.8,151.1 L 302.2,153.2 L 299.1,154.2 L 297.1,156.2 L 298.7,158.2 L 300.1,164.0 L 300.3,171.0 L 301.5,173.2 L 306.0,177.3 L 306.1,180.1 L 304.5,184.5 L 300.2,186.1 L 295.4,191.3 L 289.5,196.1 L 281.8,200.1 L 273.0,203.2 L 267.2,204.5 L 260.9,210.0 L 251.1,213.6 L 249.6,207.1 L 248.4,198.5 L 247.3,193.1 L 243.9,182.7 L 239.6,173.3 L 235.4,167.8 L 233.3,168.0 L 231.2,165.8 L 227.4,164.6 L 218.0,163.1 L 215.3,161.6 L 204.1,159.3 L 199.7,160.9 L 196.1,160.3 L 194.9,158.2 L 190.5,154.5 L 189.7,152.9 L 186.8,140.3 L 182.8,134.0 L 181.2,132.8 L 174.9,132.9 L 172.4,134.8 L 166.8,131.2 L 165.9,129.5 L 162.8,127.3 L 159.9,124.1 L 157.0,121.9 L 151.1,120.9 L 141.8,120.2 L 137.0,120.5 L 132.0,120.3 L 126.4,118.4 L 120.5,119.8 L 118.0,119.8 L 115.5,118.0 L 112.4,114.5 L 108.8,112.6 L 103.8,112.6 L 98.1,111.1 L 92.8,108.4 L 89.9,108.7 L 87.6,109.9 L 85.6,112.3 L 76.7,106.6 L 76.0,104.4 L 75.0,96.0 L 73.0,90.4 L 71.6,88.7 L 66.6,86.9 L 61.8,86.1 L 56.5,83.4 L 54.1,82.8 L 49.4,80.6 L 40.0,79.5 L 40.4,74.3 L 43.7,69.7 L 44.7,66.2 L 47.6,62.5 L 51.4,59.8 L 51.6,55.0 L 53.0,54.3 L 56.8,54.6 L 63.4,53.1 L 67.4,53.4 L 69.4,52.6 L 74.4,52.4 L 78.5,54.4 L 81.3,54.5 L 84.3,56.5 L 87.1,56.1 L 89.7,57.0 L 96.5,57.5 L 99.1,56.1 L 104.5,57.6 L 107.0,59.4 L 116.8,61.5 L 118.9,60.7 L 122.3,57.7 L 127.8,55.6 L 130.1,55.7 L 132.7,58.4 L 138.2,59.5 L 144.5,62.5 L 152.4,65.7 L 158.9,65.8 L 161.4,67.1 L 161.7,70.0 L 165.3,71.6 L 166.7,73.9 L 168.5,74.4 L 175.1,73.1 L 179.7,75.3 L 181.4,78.7 L 183.9,79.9 L 189.4,80.5 L 191.9,78.1 L 194.6,78.2 L 205.5,81.1 L 210.2,83.2 L 214.4,83.8 L 218.2,86.5 L 221.0,86.5 L 226.0,82.7 L 231.4,82.7 L 233.1,83.9 L 233.5,89.8 L 234.5,90.6 L 241.1,91.6 L 243.3,93.4 L 250.2,96.5 L 251.5,98.2 L 255.3,100.0 L 260.9,101.5 L 266.2,100.9 L 270.3,102.6 L 273.6,102.3 L 276.4,100.4 L 280.1,102.7 L 287.2,104.3 L 292.3,103.4 L 294.5,101.7 L 293.5,99.8 L 295.9,98.5 L 297.6,99.8 L 304.7,101.4 L 306.3,103.1 L 315.0,102.9 L 317.9,105.3 L 320.5,105.7 L 323.7,104.2 L 328.1,103.8 L 331.4,102.0 L 333.9,102.3 Z"
                style={{
                  fill: "#cbc9c2",
                  stroke: "#6f6c65",
                  strokeWidth: 2.2,
                  cursor: "default",
                  transition: "none",
                }}
                data-iso="GE-AB"
                data-name="Abkhazia"
              />
              <path
                d="M 281.1,282.7 L 292.0,283.2 L 294.4,283.7 L 301.6,283.8 L 305.3,285.6 L 305.7,289.6 L 310.9,289.7 L 314.9,292.2 L 320.5,293.7 L 322.3,295.5 L 329.1,293.5 L 334.9,293.6 L 338.3,294.7 L 340.4,297.6 L 347.5,296.3 L 354.6,296.3 L 357.9,294.0 L 362.5,291.7 L 368.0,291.8 L 370.6,293.8 L 372.3,296.4 L 373.9,297.0 L 378.6,297.0 L 380.9,300.8 L 381.1,304.7 L 378.5,307.5 L 378.1,309.4 L 380.5,313.7 L 383.3,316.3 L 386.5,317.7 L 390.5,321.7 L 393.4,328.0 L 391.9,329.5 L 391.8,331.9 L 390.1,334.5 L 390.7,336.5 L 387.9,338.9 L 386.1,338.7 L 382.5,342.3 L 384.4,345.2 L 377.2,346.3 L 373.9,346.1 L 369.5,343.8 L 368.5,342.5 L 363.5,342.8 L 360.9,341.7 L 358.4,341.9 L 352.2,338.8 L 346.8,338.4 L 341.3,338.5 L 337.8,336.0 L 329.1,337.2 L 323.4,336.7 L 319.9,338.6 L 315.1,337.2 L 311.6,337.0 L 309.5,334.5 L 306.5,334.6 L 302.0,337.4 L 299.9,337.9 L 298.3,340.8 L 296.0,343.3 L 292.3,344.2 L 290.8,346.2 L 288.3,346.9 L 286.7,345.0 L 283.5,343.2 L 278.9,341.6 L 273.6,341.4 L 274.0,338.7 L 272.7,338.3 L 265.3,340.2 L 254.8,335.2 L 250.6,334.4 L 252.5,331.8 L 253.0,326.8 L 254.1,323.7 L 259.3,318.5 L 261.9,316.7 L 264.1,317.8 L 267.4,317.0 L 273.8,310.0 L 277.2,302.6 L 278.9,300.8 L 280.9,296.5 L 282.2,288.3 L 281.1,282.7 Z"
                id="region-adjara"
                style={getPathStyle("adjara")}
                onMouseEnter={() => setHoveredLoc("adjara")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("adjara")}
                data-iso="GE-AJ"
                data-name="Ajaria"
              />
              <path
                d="M 279.0,251.2 L 283.5,250.2 L 292.9,250.3 L 300.9,249.1 L 303.8,248.2 L 310.4,248.2 L 314.8,247.4 L 323.7,249.5 L 329.1,253.1 L 332.4,253.6 L 339.8,253.8 L 343.2,254.9 L 344.0,256.1 L 340.9,257.8 L 340.6,259.7 L 342.2,262.3 L 344.7,263.4 L 348.4,263.4 L 352.3,264.9 L 355.1,264.9 L 357.0,262.6 L 362.0,262.5 L 365.6,263.2 L 367.6,266.3 L 370.2,271.5 L 374.2,271.7 L 379.2,273.6 L 382.2,275.7 L 386.3,276.7 L 390.4,278.7 L 398.7,278.9 L 400.8,281.4 L 400.9,288.7 L 401.7,292.2 L 398.0,292.2 L 395.1,293.8 L 393.0,297.5 L 390.4,298.0 L 387.0,296.7 L 383.3,296.5 L 378.6,297.0 L 373.9,297.0 L 372.3,296.4 L 370.6,293.8 L 368.0,291.8 L 362.5,291.7 L 357.9,294.0 L 354.6,296.3 L 347.5,296.3 L 340.4,297.6 L 338.3,294.7 L 334.9,293.6 L 329.1,293.5 L 322.3,295.5 L 320.5,293.7 L 314.9,292.2 L 310.9,289.7 L 305.7,289.6 L 305.3,285.6 L 301.6,283.8 L 294.4,283.7 L 292.0,283.2 L 281.1,282.7 L 280.6,280.8 L 278.9,267.2 L 276.2,264.0 L 274.0,258.7 L 275.9,258.1 L 274.9,255.7 L 279.4,254.0 L 279.0,251.2 Z"
                id="region-guria"
                style={getPathStyle("guria")}
                onMouseEnter={() => setHoveredLoc("guria")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("guria")}
                data-iso="GE-GU"
                data-name="Guria"
              />
              <path
                d="M 396.8,197.5 L 398.3,198.8 L 398.1,204.4 L 399.4,205.9 L 399.3,209.7 L 402.1,209.7 L 408.7,207.7 L 410.0,205.9 L 412.2,205.6 L 419.6,207.7 L 422.8,206.9 L 423.9,204.1 L 427.5,204.8 L 429.5,206.5 L 435.8,208.7 L 442.0,213.2 L 443.4,215.5 L 443.6,217.9 L 445.4,219.7 L 449.5,219.9 L 452.4,221.0 L 456.8,223.6 L 459.9,222.5 L 466.4,222.2 L 473.9,219.6 L 477.8,215.7 L 482.8,213.9 L 484.8,212.3 L 489.2,212.4 L 492.8,211.8 L 499.8,211.9 L 504.0,212.9 L 510.1,213.4 L 516.5,212.0 L 518.6,212.1 L 525.1,214.5 L 530.3,215.3 L 533.2,217.3 L 542.8,218.3 L 549.6,215.3 L 554.4,216.1 L 555.8,219.0 L 553.2,223.8 L 554.0,227.0 L 549.4,227.8 L 546.6,229.0 L 540.5,229.7 L 533.3,235.2 L 532.6,237.8 L 533.8,240.2 L 533.9,243.7 L 533.1,246.6 L 530.3,247.6 L 528.9,249.2 L 526.3,255.1 L 522.8,258.2 L 517.0,260.4 L 516.3,262.7 L 516.3,270.2 L 515.7,271.5 L 510.4,274.3 L 507.6,277.1 L 508.2,280.8 L 503.7,281.5 L 499.3,283.9 L 494.1,284.7 L 490.6,286.5 L 476.6,290.0 L 466.6,293.5 L 463.4,292.3 L 459.0,293.0 L 454.4,293.0 L 444.7,294.1 L 442.1,295.6 L 439.0,295.5 L 435.5,294.1 L 428.7,293.8 L 426.3,292.9 L 422.2,293.0 L 417.8,294.5 L 415.3,296.3 L 410.7,296.5 L 405.6,295.5 L 401.7,292.2 L 400.9,288.7 L 400.8,281.4 L 398.7,278.9 L 390.4,278.7 L 386.3,276.7 L 382.2,275.7 L 379.2,273.6 L 374.2,271.7 L 370.2,271.5 L 367.6,266.3 L 365.6,263.2 L 362.0,262.5 L 357.0,262.6 L 355.1,264.9 L 352.3,264.9 L 348.4,263.4 L 344.7,263.4 L 342.2,262.3 L 340.6,259.7 L 340.9,257.8 L 344.0,256.1 L 349.0,256.2 L 351.5,254.8 L 352.4,250.9 L 352.2,238.7 L 355.5,238.1 L 355.7,235.0 L 361.8,227.9 L 365.2,223.0 L 368.5,221.0 L 374.9,215.7 L 375.1,209.1 L 375.8,207.7 L 378.9,205.8 L 378.8,203.2 L 385.2,198.4 L 390.5,198.5 L 393.2,197.4 L 396.8,197.5 Z"
                id="region-imereti"
                style={getPathStyle("imereti")}
                onMouseEnter={() => setHoveredLoc("imereti")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("imereti")}
                data-iso="GE-IM"
                data-name="Imereti"
              />
              <path
                d="M 763.6,343.4 L 762.7,340.0 L 764.9,338.5 L 760.9,335.9 L 756.2,333.8 L 753.0,334.5 L 748.7,330.5 L 746.7,329.6 L 744.4,326.8 L 744.6,324.9 L 748.7,321.7 L 749.4,319.8 L 747.4,317.6 L 746.7,314.0 L 750.0,312.3 L 747.0,308.6 L 744.1,306.8 L 745.3,304.3 L 744.2,302.7 L 742.0,302.8 L 739.5,305.6 L 737.9,304.9 L 733.1,300.0 L 733.9,296.8 L 733.3,294.3 L 730.4,292.8 L 733.0,291.7 L 732.0,288.0 L 726.9,285.7 L 733.5,280.9 L 735.9,281.3 L 741.2,284.4 L 744.9,284.9 L 747.2,284.1 L 753.2,283.3 L 751.8,281.1 L 748.4,278.7 L 736.0,276.8 L 733.9,276.1 L 733.4,271.9 L 736.6,268.5 L 734.4,264.6 L 732.0,262.1 L 733.4,260.0 L 731.1,256.1 L 733.7,253.1 L 734.6,246.5 L 736.1,242.5 L 739.1,240.2 L 739.6,235.6 L 740.5,234.3 L 744.4,231.5 L 746.7,228.8 L 754.2,227.0 L 755.6,224.8 L 755.0,221.4 L 752.9,218.0 L 753.3,213.7 L 759.0,210.6 L 759.5,204.9 L 758.1,201.2 L 762.7,195.1 L 765.5,192.4 L 766.7,194.3 L 769.4,196.4 L 772.0,196.9 L 779.7,195.1 L 783.1,194.9 L 794.3,195.1 L 798.0,194.0 L 803.1,194.6 L 806.5,197.0 L 814.5,199.9 L 821.1,202.9 L 827.0,202.8 L 829.3,204.4 L 830.2,206.8 L 829.9,209.6 L 824.2,216.5 L 823.6,218.4 L 824.2,221.0 L 823.3,224.0 L 825.9,226.0 L 826.1,227.5 L 821.8,229.6 L 815.3,230.5 L 811.8,229.7 L 807.1,239.4 L 812.0,242.7 L 815.2,243.4 L 823.8,247.6 L 826.1,250.1 L 829.4,252.1 L 836.2,254.3 L 840.5,253.9 L 845.2,255.4 L 848.3,257.3 L 848.6,260.9 L 851.1,264.8 L 853.8,265.9 L 857.2,263.8 L 860.7,264.4 L 863.1,263.6 L 864.6,266.1 L 866.9,265.9 L 869.3,263.8 L 871.1,264.6 L 872.4,268.8 L 875.3,270.6 L 876.7,267.7 L 879.3,267.4 L 883.7,270.9 L 888.9,270.7 L 892.1,269.2 L 894.8,269.6 L 896.6,272.0 L 902.8,276.3 L 903.5,278.0 L 905.7,278.1 L 907.2,275.4 L 910.9,276.6 L 913.8,275.2 L 914.7,280.4 L 918.4,282.1 L 917.9,285.9 L 915.8,289.8 L 912.7,292.4 L 907.6,294.7 L 901.7,298.7 L 894.8,299.8 L 888.7,301.4 L 885.0,305.0 L 887.0,312.5 L 888.9,316.9 L 889.2,323.3 L 891.7,325.6 L 895.6,322.7 L 901.9,324.5 L 903.7,330.3 L 907.5,334.1 L 907.4,337.3 L 909.3,339.0 L 917.5,341.4 L 917.8,343.3 L 921.2,343.6 L 924.4,346.4 L 928.1,348.5 L 938.0,351.3 L 938.4,351.9 L 944.6,353.1 L 949.2,357.5 L 953.7,360.4 L 954.3,363.1 L 956.0,365.6 L 959.2,365.8 L 960.0,367.2 L 955.8,370.3 L 955.7,373.1 L 953.3,375.0 L 950.4,378.4 L 951.9,381.5 L 950.0,384.9 L 950.3,389.0 L 948.6,391.8 L 943.1,392.3 L 941.0,390.4 L 934.5,388.9 L 931.9,390.3 L 928.0,394.6 L 926.1,397.3 L 924.2,397.6 L 921.1,394.5 L 920.5,391.5 L 917.3,390.6 L 914.4,391.8 L 911.9,391.8 L 901.2,381.5 L 897.2,378.7 L 889.2,378.4 L 883.7,378.9 L 880.6,377.7 L 875.1,378.9 L 874.2,381.6 L 872.3,382.3 L 868.4,381.5 L 861.8,381.4 L 857.8,382.0 L 853.4,381.8 L 849.9,380.3 L 847.0,378.3 L 841.4,376.2 L 836.5,376.0 L 831.9,375.0 L 829.1,373.3 L 822.3,370.2 L 816.7,364.0 L 820.7,359.8 L 824.8,359.3 L 822.0,356.2 L 818.4,357.5 L 810.8,355.1 L 805.9,355.8 L 802.1,354.1 L 801.0,350.9 L 791.9,348.7 L 787.6,345.5 L 783.9,344.9 L 779.8,348.1 L 777.7,348.1 L 771.3,344.9 L 769.2,343.3 L 766.0,342.3 L 763.6,343.4 Z"
                id="region-kakheti"
                style={getPathStyle("kakheti")}
                onMouseEnter={() => setHoveredLoc("kakheti")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("kakheti")}
                data-iso="GE-KA"
                data-name="K'akheti"
              />
              <path
                d="M 730.4,292.8 L 733.3,294.3 L 733.9,296.8 L 733.1,300.0 L 737.9,304.9 L 739.5,305.6 L 742.0,302.8 L 744.2,302.7 L 745.3,304.3 L 744.1,306.8 L 747.0,308.6 L 750.0,312.3 L 746.7,314.0 L 747.4,317.6 L 749.4,319.8 L 748.7,321.7 L 744.6,324.9 L 744.4,326.8 L 746.7,329.6 L 748.7,330.5 L 753.0,334.5 L 756.2,333.8 L 760.9,335.9 L 764.9,338.5 L 762.7,340.0 L 763.6,343.4 L 759.7,343.6 L 757.7,346.8 L 752.3,350.0 L 748.5,350.6 L 743.8,354.0 L 739.4,359.0 L 736.5,360.9 L 733.4,361.6 L 730.3,363.4 L 722.3,365.5 L 718.1,368.4 L 716.6,371.1 L 710.7,370.5 L 708.4,370.8 L 705.6,369.1 L 700.9,368.0 L 699.2,365.6 L 697.8,365.5 L 696.2,371.2 L 698.6,374.3 L 705.0,376.4 L 701.4,377.6 L 696.8,376.1 L 687.9,377.1 L 684.4,378.0 L 683.3,376.3 L 679.0,376.5 L 677.2,374.7 L 670.6,374.3 L 669.1,376.3 L 668.4,379.6 L 665.9,378.6 L 660.0,380.4 L 655.6,379.7 L 650.1,381.2 L 646.6,380.8 L 639.9,376.9 L 635.1,374.7 L 632.5,375.4 L 631.4,378.1 L 627.8,377.0 L 622.4,377.1 L 620.4,376.6 L 619.9,374.3 L 617.9,373.0 L 616.3,374.3 L 610.4,373.9 L 611.5,376.5 L 610.0,379.2 L 605.4,380.6 L 597.1,380.2 L 587.9,382.3 L 584.1,385.0 L 582.4,380.3 L 582.4,376.8 L 581.4,374.8 L 578.2,371.7 L 577.4,367.3 L 579.9,363.6 L 580.1,359.0 L 578.0,354.7 L 574.3,353.8 L 574.3,346.5 L 573.9,342.4 L 569.8,340.7 L 569.9,337.0 L 568.9,336.0 L 563.5,334.0 L 561.9,333.9 L 557.2,335.4 L 553.1,335.9 L 542.0,335.9 L 542.6,332.8 L 545.6,331.3 L 546.4,328.2 L 546.4,324.3 L 545.7,322.0 L 547.1,318.2 L 547.1,313.2 L 548.0,311.3 L 552.6,310.7 L 562.0,312.7 L 563.5,312.2 L 569.1,308.1 L 571.2,305.8 L 576.5,305.9 L 581.0,307.0 L 592.6,307.1 L 600.3,308.1 L 604.4,308.0 L 608.7,306.5 L 612.6,306.7 L 614.9,307.7 L 621.4,308.1 L 633.8,303.7 L 638.6,307.5 L 640.3,307.8 L 650.1,307.8 L 653.3,305.7 L 659.1,305.9 L 664.2,309.7 L 665.8,312.3 L 668.3,314.2 L 674.9,313.9 L 679.0,310.8 L 681.7,312.8 L 693.1,316.5 L 695.0,318.5 L 704.5,319.4 L 707.8,321.8 L 709.2,319.9 L 712.0,320.9 L 715.8,320.5 L 717.3,318.9 L 720.0,317.6 L 720.4,315.9 L 723.2,312.9 L 720.1,312.2 L 717.8,313.6 L 711.1,312.2 L 708.1,312.0 L 706.4,309.0 L 700.9,305.6 L 699.9,304.5 L 702.4,304.5 L 705.3,302.5 L 705.2,300.2 L 707.9,297.2 L 704.9,294.7 L 706.5,293.5 L 709.9,294.4 L 713.2,292.1 L 718.5,290.5 L 723.0,291.9 L 727.5,292.0 L 730.4,292.8 Z"
                id="region-kvemo-kartli"
                style={getPathStyle("kvemo-kartli")}
                onMouseEnter={() => setHoveredLoc("kvemo-kartli")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("kvemo-kartli")}
                data-iso="GE-KK"
                data-name="Kvemo Kartli"
              />
              <path
                d="M 765.5,192.4 L 762.7,195.1 L 758.1,201.2 L 759.5,204.9 L 759.0,210.6 L 753.3,213.7 L 752.9,218.0 L 755.0,221.4 L 755.6,224.8 L 754.2,227.0 L 746.7,228.8 L 744.4,231.5 L 740.5,234.3 L 739.6,235.6 L 739.1,240.2 L 736.1,242.5 L 734.6,246.5 L 733.7,253.1 L 731.1,256.1 L 733.4,260.0 L 732.0,262.1 L 734.4,264.6 L 736.6,268.5 L 733.4,271.9 L 733.9,276.1 L 736.0,276.8 L 748.4,278.7 L 751.8,281.1 L 753.2,283.3 L 747.2,284.1 L 744.9,284.9 L 741.2,284.4 L 735.9,281.3 L 733.5,280.9 L 726.9,285.7 L 732.0,288.0 L 733.0,291.7 L 730.4,292.8 L 727.5,292.0 L 723.0,291.9 L 718.5,290.5 L 713.2,292.1 L 709.9,294.4 L 706.5,293.5 L 704.9,294.7 L 707.9,297.2 L 705.2,300.2 L 705.3,302.5 L 702.4,304.5 L 699.9,304.5 L 697.4,301.8 L 699.3,299.6 L 697.8,296.8 L 692.5,296.4 L 687.3,297.7 L 684.2,297.3 L 683.4,299.1 L 688.2,300.1 L 689.8,302.0 L 684.8,306.7 L 683.1,307.0 L 679.0,310.8 L 674.9,313.9 L 668.3,314.2 L 665.8,312.3 L 664.2,309.7 L 659.1,305.9 L 653.3,305.7 L 651.5,301.7 L 651.8,300.3 L 655.1,298.7 L 654.5,291.8 L 656.2,290.1 L 663.8,290.5 L 665.4,288.2 L 665.4,285.6 L 662.5,282.6 L 658.2,279.3 L 656.1,276.1 L 655.9,270.3 L 651.3,266.3 L 646.2,266.3 L 637.8,264.7 L 632.5,265.8 L 630.7,268.3 L 627.2,269.8 L 627.3,266.1 L 626.3,265.1 L 622.6,265.6 L 622.2,262.1 L 624.1,258.8 L 623.7,252.3 L 624.8,250.7 L 624.4,248.0 L 625.9,245.8 L 629.0,244.2 L 631.8,240.0 L 635.9,238.6 L 636.7,236.4 L 636.6,232.9 L 633.1,228.5 L 633.1,225.2 L 635.1,223.1 L 635.2,221.2 L 633.7,218.9 L 629.7,217.1 L 628.6,211.5 L 626.1,210.7 L 626.8,207.5 L 629.4,205.5 L 629.5,204.1 L 632.7,201.6 L 630.7,198.5 L 627.4,197.3 L 625.1,194.4 L 625.0,192.5 L 622.4,191.4 L 617.6,190.7 L 614.9,188.6 L 612.6,183.9 L 617.2,182.5 L 618.3,179.4 L 622.0,175.0 L 625.1,173.4 L 631.1,171.6 L 636.1,171.2 L 642.4,171.8 L 646.5,170.3 L 649.4,168.6 L 654.2,166.7 L 658.6,166.4 L 669.5,167.4 L 677.6,166.5 L 683.8,168.2 L 686.6,170.6 L 689.2,181.1 L 692.1,183.6 L 696.3,182.8 L 699.0,178.0 L 700.9,173.2 L 703.5,170.0 L 707.3,167.0 L 714.0,166.2 L 720.0,167.3 L 728.8,173.3 L 735.3,174.2 L 741.9,172.9 L 745.4,173.2 L 748.2,174.7 L 759.0,184.9 L 764.5,188.9 L 765.5,192.4 Z"
                id="region-mtskheta"
                style={getPathStyle("mtskheta")}
                onMouseEnter={() => setHoveredLoc("mtskheta")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("mtskheta")}
                data-iso="GE-MM"
                data-name="Mtskheta-Mtianeti"
              />
              <path
                d="M 574.3,191.2 L 575.6,195.4 L 574.2,199.2 L 564.9,203.1 L 563.0,206.7 L 556.2,208.3 L 549.7,208.8 L 541.1,208.8 L 531.0,211.3 L 530.3,215.3 L 525.1,214.5 L 518.6,212.1 L 516.5,212.0 L 510.1,213.4 L 504.0,212.9 L 499.8,211.9 L 492.8,211.8 L 489.2,212.4 L 484.8,212.3 L 482.8,213.9 L 477.8,215.7 L 473.9,219.6 L 466.4,222.2 L 459.9,222.5 L 456.8,223.6 L 452.4,221.0 L 449.5,219.9 L 445.4,219.7 L 443.6,217.9 L 443.4,215.5 L 442.0,213.2 L 435.8,208.7 L 429.5,206.5 L 427.5,204.8 L 423.9,204.1 L 422.8,206.9 L 419.6,207.7 L 412.2,205.6 L 410.0,205.9 L 408.7,207.7 L 402.1,209.7 L 399.3,209.7 L 399.4,205.9 L 398.1,204.4 L 398.3,198.8 L 396.8,197.5 L 394.1,192.6 L 386.3,183.7 L 386.2,179.5 L 387.3,177.7 L 390.1,176.4 L 384.9,171.7 L 378.2,168.9 L 373.8,168.1 L 368.8,165.2 L 363.8,163.0 L 360.9,160.6 L 364.9,154.9 L 366.4,154.2 L 371.6,154.2 L 376.4,153.2 L 377.9,151.5 L 379.1,148.0 L 383.9,147.9 L 389.4,149.9 L 395.7,150.0 L 399.9,150.6 L 405.2,152.6 L 413.9,153.2 L 417.1,152.1 L 421.2,149.8 L 430.2,151.9 L 435.8,155.0 L 442.7,154.0 L 453.7,153.7 L 455.2,156.9 L 459.2,156.5 L 461.0,155.1 L 461.1,149.0 L 464.6,147.4 L 466.4,144.4 L 473.6,140.1 L 475.5,140.9 L 485.6,143.0 L 493.7,145.8 L 496.8,147.4 L 505.0,146.6 L 513.5,147.2 L 519.2,149.7 L 526.7,150.6 L 532.6,153.9 L 533.7,156.1 L 538.1,159.7 L 544.2,160.2 L 548.8,163.4 L 558.2,166.5 L 560.1,169.5 L 559.9,170.9 L 554.9,178.3 L 551.5,180.0 L 550.0,183.3 L 555.3,188.8 L 561.2,188.0 L 563.2,190.0 L 568.2,189.2 L 569.8,190.5 L 574.3,191.2 Z"
                id="region-racha"
                style={getPathStyle("racha")}
                onMouseEnter={() => setHoveredLoc("racha")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("racha")}
                data-iso="GE-RL"
                data-name="Rach'a-Lechkhumi-Kvemo Svaneti"
              />
              <path
                d="M 508.2,280.8 L 512.3,280.4 L 517.7,281.4 L 521.3,283.0 L 523.5,283.2 L 527.2,285.0 L 527.4,287.9 L 530.7,290.0 L 531.9,293.7 L 539.8,293.9 L 540.5,297.7 L 543.9,298.3 L 549.7,301.4 L 554.5,301.3 L 557.0,300.4 L 564.0,300.6 L 571.0,302.7 L 571.2,305.8 L 569.1,308.1 L 563.5,312.2 L 562.0,312.7 L 552.6,310.7 L 548.0,311.3 L 547.1,313.2 L 547.1,318.2 L 545.7,322.0 L 546.4,324.3 L 546.4,328.2 L 545.6,331.3 L 542.6,332.8 L 542.0,335.9 L 553.1,335.9 L 557.2,335.4 L 561.9,333.9 L 563.5,334.0 L 568.9,336.0 L 569.9,337.0 L 569.8,340.7 L 573.9,342.4 L 574.3,346.5 L 574.3,353.8 L 578.0,354.7 L 580.1,359.0 L 579.9,363.6 L 577.4,367.3 L 578.2,371.7 L 581.4,374.8 L 582.4,376.8 L 582.4,380.3 L 584.1,385.0 L 579.5,383.8 L 571.2,384.0 L 566.7,383.7 L 562.6,384.8 L 555.3,388.3 L 552.6,390.9 L 549.8,390.9 L 542.4,387.6 L 537.0,389.3 L 533.8,389.3 L 528.5,386.3 L 523.9,386.1 L 516.9,388.8 L 514.3,388.8 L 511.6,383.6 L 509.7,381.9 L 505.3,380.7 L 502.4,379.2 L 498.5,378.9 L 487.3,381.6 L 480.8,382.4 L 481.5,380.1 L 476.9,372.6 L 473.9,371.6 L 470.7,372.8 L 466.7,371.7 L 473.7,368.8 L 476.7,366.8 L 477.0,364.9 L 467.5,362.9 L 463.6,357.9 L 458.8,356.0 L 456.2,355.8 L 453.1,354.7 L 451.0,352.0 L 448.8,350.7 L 447.6,348.0 L 446.1,347.1 L 445.5,344.6 L 442.2,343.7 L 440.3,341.7 L 436.6,340.6 L 435.4,337.5 L 431.4,338.1 L 430.0,341.3 L 428.8,341.7 L 423.6,339.0 L 421.5,336.3 L 422.0,334.5 L 425.1,333.0 L 424.8,330.0 L 427.6,328.3 L 426.3,325.9 L 421.4,325.8 L 420.0,327.2 L 414.1,325.0 L 409.7,324.5 L 405.6,324.6 L 397.8,326.4 L 395.9,326.2 L 393.4,328.0 L 390.5,321.7 L 386.5,317.7 L 383.3,316.3 L 380.5,313.7 L 378.1,309.4 L 378.5,307.5 L 381.1,304.7 L 380.9,300.8 L 378.6,297.0 L 383.3,296.5 L 387.0,296.7 L 390.4,298.0 L 393.0,297.5 L 395.1,293.8 L 398.0,292.2 L 401.7,292.2 L 405.6,295.5 L 410.7,296.5 L 415.3,296.3 L 417.8,294.5 L 422.2,293.0 L 426.3,292.9 L 428.7,293.8 L 435.5,294.1 L 439.0,295.5 L 442.1,295.6 L 444.7,294.1 L 454.4,293.0 L 459.0,293.0 L 463.4,292.3 L 466.6,293.5 L 476.6,290.0 L 490.6,286.5 L 494.1,284.7 L 499.3,283.9 L 503.7,281.5 L 508.2,280.8 Z"
                id="region-samtskhe-javakheti"
                style={getPathStyle("samtskhe-javakheti")}
                onMouseEnter={() => setHoveredLoc("samtskhe-javakheti")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("samtskhe-javakheti")}
                data-iso="GE-SJ"
                data-name="Samtskhe-Javakheti"
              />
              <path
                d="M 612.6,183.9 L 614.9,188.6 L 617.6,190.7 L 622.4,191.4 L 625.0,192.5 L 625.1,194.4 L 627.4,197.3 L 630.7,198.5 L 632.7,201.6 L 629.5,204.1 L 629.4,205.5 L 626.8,207.5 L 626.1,210.7 L 628.6,211.5 L 629.7,217.1 L 633.7,218.9 L 635.2,221.2 L 635.1,223.1 L 633.1,225.2 L 633.1,228.5 L 636.6,232.9 L 636.7,236.4 L 635.9,238.6 L 631.8,240.0 L 629.0,244.2 L 625.9,245.8 L 624.4,248.0 L 624.8,250.7 L 623.7,252.3 L 624.1,258.8 L 622.2,262.1 L 622.6,265.6 L 626.3,265.1 L 627.3,266.1 L 627.2,269.8 L 630.7,268.3 L 632.5,265.8 L 637.8,264.7 L 646.2,266.3 L 651.3,266.3 L 655.9,270.3 L 656.1,276.1 L 658.2,279.3 L 662.5,282.6 L 665.4,285.6 L 665.4,288.2 L 663.8,290.5 L 656.2,290.1 L 654.5,291.8 L 655.1,298.7 L 651.8,300.3 L 651.5,301.7 L 653.3,305.7 L 650.1,307.8 L 640.3,307.8 L 638.6,307.5 L 633.8,303.7 L 621.4,308.1 L 614.9,307.7 L 612.6,306.7 L 608.7,306.5 L 604.4,308.0 L 600.3,308.1 L 592.6,307.1 L 581.0,307.0 L 576.5,305.9 L 571.2,305.8 L 571.0,302.7 L 564.0,300.6 L 557.0,300.4 L 554.5,301.3 L 549.7,301.4 L 543.9,298.3 L 540.5,297.7 L 539.8,293.9 L 531.9,293.7 L 530.7,290.0 L 527.4,287.9 L 527.2,285.0 L 523.5,283.2 L 521.3,283.0 L 517.7,281.4 L 512.3,280.4 L 508.2,280.8 L 507.6,277.1 L 510.4,274.3 L 515.7,271.5 L 516.3,270.2 L 516.3,262.7 L 517.0,260.4 L 522.8,258.2 L 526.3,255.1 L 528.9,249.2 L 530.3,247.6 L 533.1,246.6 L 533.9,243.7 L 533.8,240.2 L 532.6,237.8 L 533.3,235.2 L 540.5,229.7 L 546.6,229.0 L 549.4,227.8 L 554.0,227.0 L 553.2,223.8 L 555.8,219.0 L 554.4,216.1 L 549.6,215.3 L 542.8,218.3 L 533.2,217.3 L 530.3,215.3 L 531.0,211.3 L 541.1,208.8 L 549.7,208.8 L 556.2,208.3 L 563.0,206.7 L 564.9,203.1 L 574.2,199.2 L 575.6,195.4 L 574.3,191.2 L 579.7,192.8 L 582.9,192.4 L 589.1,187.7 L 591.6,186.4 L 595.1,186.8 L 601.1,185.2 L 605.3,185.7 L 612.6,183.9 Z"
                id="region-shida-kartli"
                style={getPathStyle("shida-kartli")}
                onMouseEnter={() => setHoveredLoc("shida-kartli")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("shida-kartli")}
                data-iso="GE-SK"
                data-name="Shida Kartli"
              />
              <path
                d="M 475.5,140.9 L 473.6,140.1 L 466.4,144.4 L 464.6,147.4 L 461.1,149.0 L 461.0,155.1 L 459.2,156.5 L 455.2,156.9 L 453.7,153.7 L 442.7,154.0 L 435.8,155.0 L 430.2,151.9 L 421.2,149.8 L 417.1,152.1 L 413.9,153.2 L 405.2,152.6 L 399.9,150.6 L 395.7,150.0 L 389.4,149.9 L 383.9,147.9 L 379.1,148.0 L 377.9,151.5 L 376.4,153.2 L 371.6,154.2 L 366.4,154.2 L 364.9,154.9 L 360.9,160.6 L 363.8,163.0 L 368.8,165.2 L 373.8,168.1 L 378.2,168.9 L 384.9,171.7 L 390.1,176.4 L 387.3,177.7 L 386.2,179.5 L 386.3,183.7 L 394.1,192.6 L 396.8,197.5 L 393.2,197.4 L 390.5,198.5 L 385.2,198.4 L 378.8,203.2 L 378.9,205.8 L 375.8,207.7 L 375.1,209.1 L 374.9,215.7 L 368.5,221.0 L 365.2,223.0 L 361.8,227.9 L 355.7,235.0 L 355.5,238.1 L 352.2,238.7 L 352.4,250.9 L 351.5,254.8 L 349.0,256.2 L 344.0,256.1 L 343.2,254.9 L 339.8,253.8 L 332.4,253.6 L 329.1,253.1 L 323.7,249.5 L 314.8,247.4 L 310.4,248.2 L 303.8,248.2 L 300.9,249.1 L 292.9,250.3 L 283.5,250.2 L 279.0,251.2 L 275.9,250.0 L 270.4,250.1 L 272.9,255.5 L 271.3,256.6 L 265.8,250.9 L 265.0,246.6 L 263.5,244.7 L 265.1,242.3 L 262.1,240.2 L 263.4,238.1 L 263.1,233.1 L 261.1,227.7 L 256.7,218.1 L 251.8,215.7 L 251.1,213.6 L 260.9,210.0 L 267.2,204.5 L 273.0,203.2 L 281.8,200.1 L 289.5,196.1 L 295.4,191.3 L 300.2,186.1 L 304.5,184.5 L 306.1,180.1 L 306.0,177.3 L 301.5,173.2 L 300.3,171.0 L 300.1,164.0 L 298.7,158.2 L 297.1,156.2 L 299.1,154.2 L 302.2,153.2 L 303.8,151.1 L 302.4,147.3 L 300.2,145.3 L 300.3,139.4 L 297.3,139.1 L 295.9,135.7 L 299.4,134.1 L 305.5,133.3 L 309.3,131.9 L 319.4,130.8 L 322.6,126.3 L 327.3,123.3 L 330.9,117.4 L 331.8,115.0 L 330.4,112.2 L 330.4,108.8 L 333.9,102.3 L 338.3,102.4 L 341.8,100.8 L 345.6,101.3 L 348.8,103.5 L 352.2,103.7 L 356.2,101.2 L 359.3,101.5 L 361.3,99.5 L 366.6,98.8 L 371.0,97.4 L 375.2,98.6 L 376.5,100.0 L 374.2,102.2 L 383.4,105.0 L 391.7,108.3 L 394.5,109.7 L 406.3,113.5 L 406.7,112.0 L 405.0,109.2 L 417.5,106.9 L 421.1,107.0 L 423.7,108.4 L 427.9,108.0 L 435.0,109.0 L 435.9,111.4 L 440.2,113.3 L 439.5,116.5 L 447.7,117.2 L 455.0,119.9 L 453.0,123.1 L 453.4,125.4 L 457.9,129.6 L 465.2,133.3 L 472.7,138.3 L 475.5,140.9 Z"
                id="region-samegrelo"
                style={getPathStyle("samegrelo")}
                onMouseEnter={() => setHoveredLoc("samegrelo")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("samegrelo")}
                data-iso="GE-SZ"
                data-name="Samegrelo-Zemo Svaneti"
              />
              <path
                d="M 699.9,304.5 L 700.9,305.6 L 706.4,309.0 L 708.1,312.0 L 711.1,312.2 L 717.8,313.6 L 720.1,312.2 L 723.2,312.9 L 720.4,315.9 L 720.0,317.6 L 717.3,318.9 L 715.8,320.5 L 712.0,320.9 L 709.2,319.9 L 707.8,321.8 L 704.5,319.4 L 695.0,318.5 L 693.1,316.5 L 681.7,312.8 L 679.0,310.8 L 683.1,307.0 L 684.8,306.7 L 689.8,302.0 L 688.2,300.1 L 683.4,299.1 L 684.2,297.3 L 687.3,297.7 L 692.5,296.4 L 697.8,296.8 L 699.3,299.6 L 697.4,301.8 L 699.9,304.5 Z"
                id="region-tbilisi"
                style={getPathStyle("tbilisi")}
                onMouseEnter={() => setHoveredLoc("tbilisi")}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc("tbilisi")}
                data-iso="GE-TB"
                data-name="Tbilisi"
              />

              <use
                href={`#region-${hoveredLoc ?? selectedLoc}`}
                xlinkHref={`#region-${hoveredLoc ?? selectedLoc}`}
                fill="none"
                stroke="#b51f2d"
                strokeWidth="6"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pointerEvents="none"
              />

            </svg>

          </div>

        </div>{/* /Left column */}

        {/* Right column: Tabs + 2 photos */}
        <div className="gallery-content-column">
          <div style={{ width: "100%" }}>
            <div className="gallery-location-tabs">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc.id)}
                  className={selectedLoc === loc.id ? "is-active" : ""}
                  aria-pressed={selectedLoc === loc.id}
                >
                  {loc[language]}
                </button>
              ))}
              <button type="button" className="is-disabled" disabled>
                {language === "ru" ? "Абхазия" : language === "ua" ? "Абхазія" : "Abkhazia"}
              </button>
            </div>

            {filteredImages.length > 0 ? (
              <div className="gallery-carousel-shell">
                <div
                  className="gallery-carousel-track gallery-photo-marquee"
                  ref={carouselRef}
                  onMouseEnter={() => { marqueeHovered.current = true; }}
                  onMouseLeave={() => { marqueeHovered.current = false; }}
                >
                  {[...filteredImages, ...filteredImages].map((img, idx) => {
                    const photoIndex = idx % filteredImages.length;
                    return (
                    <div
                      key={img.src + "-" + idx}
                      style={{
                        flex: "0 0 clamp(230px, 22vw, 310px)",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                      aria-hidden={idx >= filteredImages.length}
                    >
                      <div
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          width: "100%",
                          aspectRatio: "4 / 3",
                          backgroundColor: "#ece8df",
                        }}
                        className="carousel-image-card"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          priority={idx < 2}
                          draggable={false}
                          sizes="25vw"
                          className="cover-image"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center center",
                            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        />
                        <button
                          type="button"
                          className="gallery-image-open"
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={(event) => {
                            event.stopPropagation();
                            setLightboxIndex(photoIndex);
                          }}
                          aria-label={`Open ${img.alt}`}
                        />
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ minHeight: "340px", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {language === "ru" ? "Нет фотографий" : "No photos"}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Fullscreen Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          className="lightbox-overlay animate-fade-in"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.96)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Top Bar with Back Button */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              left: "40px",
              right: "40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#ffffff"
            }}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-sans)",
                padding: "8px 0"
              }}
            >
              ← {language === "ru" ? "Назад" : "Back"}
            </button>
            <span style={{ fontSize: "11px", opacity: 0.5, letterSpacing: "0.15em" }}>
              {lightboxIndex + 1} / {filteredImages.length}
            </span>
          </div>

          {/* Main Image View */}
          <div style={{ position: "relative", width: "90%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Prev Arrow */}
            {lightboxIndex > 0 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                style={{
                  position: "absolute",
                  left: "20px",
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "36px",
                  cursor: "pointer",
                  opacity: 0.6,
                  transition: "opacity 150ms ease",
                  zIndex: 10,
                  padding: "20px"
                }}
                className="lightbox-arrow"
              >
                ‹
              </button>
            )}

            {/* Image container */}
            <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                fill
                sizes="100vw"
                style={{
                  objectFit: "contain",
                  borderRadius: "1px",
                }}
              />
            </div>

            {/* Next Arrow */}
            {lightboxIndex < filteredImages.length - 1 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                style={{
                  position: "absolute",
                  right: "20px",
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "36px",
                  cursor: "pointer",
                  opacity: 0.6,
                  transition: "opacity 150ms ease",
                  zIndex: 10,
                  padding: "20px"
                }}
                className="lightbox-arrow"
              >
                ›
              </button>
            )}
          </div>

          {/* Image caption */}
          <div style={{ color: "#ffffff", marginTop: "32px", textAlign: "center", maxWidth: "600px", padding: "0 20px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: "400", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
              {filteredImages[lightboxIndex].caption}
            </h3>
            <p style={{ fontSize: "11px", color: "#d12a38", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "10px", fontWeight: "500" }}>
              {locations.find(l => l.id === filteredImages[lightboxIndex].location)?.[language] || ""}
            </p>
          </div>
        </div>
      )}

      <span className="gallery-mobile-copyright">© 2025–2026 Soul Georgia Travel™</span>
    </main>
  );
}
