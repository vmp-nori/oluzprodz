"use client";

import { animate } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";

type CarouselReelRowProps = {
  children: ReactNode;
  direction: "left" | "right";
};

const HOVER_PLAYBACK_RATE = 0.18;

export function CarouselReelRow({ children, direction }: CarouselReelRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rateAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  const changePlaybackRate = (
    event: PointerEvent<HTMLDivElement>,
    targetRate: number,
  ) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const reelAnimation = trackRef.current?.getAnimations()[0];
    if (!reelAnimation) return;

    rateAnimationRef.current?.stop();
    rateAnimationRef.current = animate(
      reelAnimation.playbackRate || 1,
      targetRate,
      {
        duration: 0.3,
        ease: [0.77, 0, 0.175, 1],
        onUpdate: (rate) => reelAnimation.updatePlaybackRate(rate),
      },
    );
  };

  return (
    <div
      className="reel-row"
      onPointerEnter={(event) => changePlaybackRate(event, HOVER_PLAYBACK_RATE)}
      onPointerLeave={(event) => changePlaybackRate(event, 1)}
    >
      <div ref={trackRef} className={`reel-track reel-track-${direction}`}>
        {children}
      </div>
    </div>
  );
}
