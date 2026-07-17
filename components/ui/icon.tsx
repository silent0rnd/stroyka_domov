"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  CheckCircle,
  Path,
  Plus,
  Scales,
  ShieldCheck,
  UserFocus
} from "@phosphor-icons/react";

const icons = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "calendar-check": CalendarCheck,
  check: Check,
  "check-circle": CheckCircle,
  path: Path,
  plus: Plus,
  scales: Scales,
  "shield-check": ShieldCheck,
  "user-focus": UserFocus
};

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  label?: string;
};

export function Icon({ name, size = 20, className, weight = "regular", label }: IconProps) {
  const Component = icons[name];

  if (label) {
    return <Component size={size} className={className} weight={weight} aria-label={label} />;
  }

  return <Component size={size} className={className} weight={weight} aria-hidden="true" />;
}
