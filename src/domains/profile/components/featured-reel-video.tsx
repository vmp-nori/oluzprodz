"use client";

import { useEffect, useRef } from "react";

type FeaturedReelVideoProps = {
  title: string;
  src: string;
  poster: string;
  width: number;
  height: number;
};

export function FeaturedReelVideo({
  title,
  src,
  poster,
  width,
  height,
}: FeaturedReelVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const updatePlayback = () => {
      if (
        reducedMotion.matches ||
        document.visibilityState !== "visible" ||
        !isVisible
      ) {
        video.pause();
        return;
      }

      void video.play().catch(() => {
        // The poster remains visible if a browser blocks autoplay.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    reducedMotion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="featured-reel-video"
      aria-label={`${title} video`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      width={width}
      height={height}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
