"use client";

import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";

export default function RouteTransition({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const timerRef = useRef<number | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const navigate = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target as HTMLElement;
    const anchor = target.closest("a");

    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
      return;
    }

    const url = new URL(anchor.href, window.location.href);
    const isSamePageHash =
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash;

    if (
      url.origin !== window.location.origin ||
      url.href === window.location.href ||
      isSamePageHash ||
      url.pathname === "#"
    ) {
      return;
    }

    event.preventDefault();
    setIsLeaving(true);

    timerRef.current = window.setTimeout(() => {
      router.push(`${url.pathname}${url.search}${url.hash}`);
    }, 180);
  };

  return (
    <div
      className={`route-transition${isLeaving ? " is-leaving" : ""}`}
      onClickCapture={navigate}
    >
      {children}
    </div>
  );
}
