"use client";

import { useEffect, useRef } from "react";
import type { PortfolioVideo } from "../data/portfolio-media";

type CarouselVideoProps = {
  video: PortfolioVideo;
};

export function CarouselVideo({ video }: CarouselVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const updatePlayback = () => {
      if (
        reducedMotion.matches ||
        document.visibilityState !== "visible" ||
        !isVisible
      ) {
        element.pause();
        return;
      }

      void element.play().catch(() => {
        // The poster remains visible when a browser blocks autoplay.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    reducedMotion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      element.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-label={`${video.title}: ${video.description}`}
      className="reel-video"
      loop
      muted
      playsInline
      preload="metadata"
      poster={`/media/gallery/posters/${video.id}.webp`}
      width={video.width}
      height={video.height}
    >
      <source src={`/media/gallery/videos/${video.id}.mp4`} type="video/mp4" />
    </video>
  );
}
