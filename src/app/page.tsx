"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePreferences } from "./preferences";
import { SiteHeader } from "./shared";

const homeCopy = {
  en: {
    country: "Georgia",
    features: [
      {
        title: "HERITAGE",
        text: "Step into Georgia’s living history, from ancient stone towers and sacred monasteries to the vibrant rhythm of Tbilisi.",
      },
      {
        title: "FLAVORS",
        text: "Taste warm khachapuri, share qvevri wine, and discover the generous spirit of a traditional Georgian supra.",
      },
      {
        title: "SCENERY",
        text: "Follow mountain roads past snowy peaks, green valleys, and quiet villages shaped by Georgia’s wild natural beauty.",
      },
    ],
  },
  ru: {
    country: "Грузия",
    features: [
      {
        title: "НАСЛЕДИЕ",
        text: "Откройте живую историю Грузии: древние каменные башни, священные монастыри и яркий ритм Тбилиси.",
      },
      {
        title: "ВКУСЫ",
        text: "Попробуйте горячий хачапури, вино из квеври и почувствуйте щедрый дух традиционного грузинского застолья.",
      },
      {
        title: "ПЕЙЗАЖИ",
        text: "Следуйте по горным дорогам мимо снежных вершин, зелёных долин и тихих деревень среди дикой природы Грузии.",
      },
    ],
  },
  ua: {
    country: "Грузія",
    features: [
      {
        title: "СПАДЩИНА",
        text: "Відкрийте живу історію Грузії: давні кам’яні вежі, священні монастирі та яскравий ритм Тбілісі.",
      },
      {
        title: "СМАКИ",
        text: "Скуштуйте гарячий хачапурі, вино з квеврі та відчуйте щедрий дух традиційного грузинського застілля.",
      },
      {
        title: "КРАЄВИДИ",
        text: "Мандруйте гірськими дорогами повз сніжні вершини, зелені долини й тихі села серед дикої природи Грузії.",
      },
    ],
  },
} as const;

export default function Home() {
  const { language } = usePreferences();
  const copy = homeCopy[language];
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const moveBackground = (event: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(max-width: 800px)").matches) return;
    targetRef.current.x = event.clientX / window.innerWidth - 0.5;
    targetRef.current.y = event.clientY / window.innerHeight - 0.5;
  };

  useEffect(() => {
    if (window.matchMedia("(max-width: 800px)").matches) {
      if (imageRef.current) imageRef.current.style.transform = "none";
      return;
    }

    let frame = 0;
    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(${current.x * -56}px, ${current.y * -38}px, 0) rotateX(${current.y * -3}deg) rotateY(${current.x * 3}deg) scale(1.06)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="home-minimal" onMouseMove={moveBackground}>
      <SiteHeader />
      <section
        ref={heroRef}
        className="home-hero home-hero-minimal home-hero-parallax"
      >
        <Image
          ref={imageRef}
          src="/home-hero.webp"
          alt={copy.country}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="cover-image"
        />
        <div className="hero-shade" />
        <h1 className="home-georgia-title">{copy.country}</h1>
        <div className="home-feature-grid">
          {copy.features.map((feature) => (
            <article key={feature.title}>
              <h2>{feature.title}</h2>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
