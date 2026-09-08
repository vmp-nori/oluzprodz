"use client";

import {
  AnimatePresence,
  animate,
  type MotionValue,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import * as React from "react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

type DigitEffect = "none" | "fade" | "blur" | "slide";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  digitEffect?: DigitEffect;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

type OdometerDigitProps = {
  springValue: MotionValue<number>;
  place: number;
};

function OdometerDigit({ springValue, place }: OdometerDigitProps) {
  const [ref, { height }] = useMeasure();
  const y = useTransform(springValue, (value) => {
    if (!height) return 0;
    return -((Math.abs(value) / place) % 10) * height;
  });

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: "1ch",
        overflowY: "clip",
        overflowX: "visible",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span ref={ref} style={{ visibility: "hidden", display: "block" }}>
        0
      </span>
      <motion.span
        style={{
          y,
          position: "absolute",
          inset: "0 0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {Array.from({ length: 11 }, (_, index) => (
          <span
            // The odometer strip has a fixed order and never reorders.
            // biome-ignore lint/suspicious/noArrayIndexKey: stable positional digit reel
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: height || "1em",
            }}
          >
            {index % 10}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

type CharSlotProps = {
  char: string;
  charKey: string;
  effect: Exclude<DigitEffect, "none" | "slide">;
  countingUp: boolean;
};

const CHAR_VARIANTS = {
  fade: {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.7 },
    transition: { duration: 0.14, ease: "easeOut" as const },
    overflow: "hidden" as const,
  },
  blur: {
    initial: (up: boolean) => ({
      opacity: 0,
      filter: "blur(8px)",
      y: up ? -8 : 8,
    }),
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: (up: boolean) => ({
      opacity: 0,
      filter: "blur(8px)",
      y: up ? 8 : -8,
    }),
    transition: { duration: 0.18, ease: "easeOut" as const },
    overflow: "visible" as const,
  },
};

function CharSlot({ char, charKey, effect, countingUp }: CharSlotProps) {
  if (!/\d/.test(char)) {
    return <span style={{ display: "inline-block" }}>{char}</span>;
  }

  const variant = CHAR_VARIANTS[effect];
  const initial =
    typeof variant.initial === "function"
      ? variant.initial(countingUp)
      : variant.initial;
  const exit =
    typeof variant.exit === "function"
      ? variant.exit(countingUp)
      : variant.exit;

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        overflow: variant.overflow,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={charKey}
          initial={initial}
          animate={variant.animate}
          exit={exit}
          transition={variant.transition}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  digitEffect = "none",
  className,
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);
  const isInView = useInView(ref, {
    once: false,
    margin: "0px 0px 12% 0px",
  });

  const getDecimalPlaces = (number: number) => {
    const decimals = number.toString().split(".")[1];
    return decimals && Number.parseInt(decimals, 10) !== 0
      ? decimals.length
      : 0;
  };
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));
  const formatValue = React.useCallback(
    (latest: number) => {
      const formatted = Intl.NumberFormat("en-US", {
        useGrouping: Boolean(separator),
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      }).format(latest);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, separator],
  );

  const target = direction === "down" ? from : to;
  const initialValue = direction === "down" ? to : from;
  const [chars, setChars] = React.useState(() =>
    formatValue(initialValue).split(""),
  );

  React.useEffect(() => {
    const initial = formatValue(initialValue);
    if (digitEffect === "none") {
      if (ref.current) ref.current.textContent = initial;
    } else if (digitEffect !== "slide") {
      setChars(initial.split(""));
    }
  }, [digitEffect, formatValue, initialValue]);

  React.useEffect(() => {
    if (!isInView || !startWhen) {
      motionValue.jump(initialValue);
      return;
    }

    onStart?.();
    let playback: ReturnType<typeof animate> | undefined;
    const startTimer = window.setTimeout(() => {
      playback = animate(motionValue, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
    }, delay * 1000);
    const endTimer = window.setTimeout(
      () => onEnd?.(),
      delay * 1000 + duration * 1000,
    );
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(endTimer);
      playback?.stop();
    };
  }, [
    delay,
    duration,
    isInView,
    initialValue,
    motionValue,
    onEnd,
    onStart,
    startWhen,
    target,
  ]);

  React.useEffect(
    () =>
      motionValue.on("change", (latest) => {
        if (digitEffect === "none") {
          if (ref.current) ref.current.textContent = formatValue(latest);
        } else if (digitEffect !== "slide") {
          setChars(formatValue(latest).split(""));
        }
      }),
    [digitEffect, formatValue, motionValue],
  );

  if (digitEffect === "slide") {
    const targetString = formatValue(target);
    const digitCount = [...targetString].filter((char) =>
      /\d/.test(char),
    ).length;
    let digitIndex = 0;

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center", className)}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {[...targetString].map((char, index) => {
          if (!/\d/.test(char)) {
            return (
              // A formatted number's character positions are stable for this render.
              // biome-ignore lint/suspicious/noArrayIndexKey: stable formatted-number position
              <span key={index}>{char}</span>
            );
          }
          const place = 10 ** (digitCount - 1 - digitIndex);
          digitIndex += 1;
          return (
            <OdometerDigit
              // A formatted number's digit positions are stable for this render.
              // biome-ignore lint/suspicious/noArrayIndexKey: stable formatted-number position
              key={index}
              springValue={motionValue}
              place={place}
            />
          );
        })}
      </span>
    );
  }

  if (digitEffect === "none") {
    return <span ref={ref} className={cn(className)} />;
  }

  return (
    <span ref={ref} className={cn("inline-flex items-center", className)}>
      {chars.map((char, index) => (
        <CharSlot
          // Character slots intentionally retain their positional identity while counting.
          // biome-ignore lint/suspicious/noArrayIndexKey: stable animated character slot
          key={index}
          char={char}
          charKey={`${index}-${char}`}
          effect={digitEffect}
          countingUp={direction === "up"}
        />
      ))}
    </span>
  );
}

export { CountUp, type CountUpProps, type DigitEffect };
export default CountUp;
