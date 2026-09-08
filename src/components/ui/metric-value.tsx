"use client";

import { CountUp } from "@/components/ui/count-up";

interface MetricValueProps {
  value: string;
  delay?: number;
}

export function MetricValue({ value, delay = 0 }: MetricValueProps) {
  const match = value.match(/^([\d,.]+)(.*)$/);
  const numericValue = Number(match?.[1].replaceAll(",", "") ?? 0);
  const suffix = match?.[2] ?? "";

  return (
    <>
      <span className="metric-number" aria-hidden="true">
        <CountUp
          to={numericValue}
          delay={delay}
          duration={1.35}
          digitEffect="none"
          separator={value.includes(",") ? "," : ""}
        />
        {suffix}
      </span>
      <span className="metric-reduced" aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
