import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TripProfile } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function createId(prefix = "trip") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDateRange(start?: string, nights?: number) {
  if (!start) return "Dates TBA";
  const startDate = new Date(start);
  if (Number.isFinite(nights) && nights && nights > 0) {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + nights);
    return `${startDate.toLocaleDateString()} – ${endDate.toLocaleDateString()}`;
  }
  return startDate.toLocaleDateString();
}

export function defaultProfile(): TripProfile {
  return {
    title: "My Trip",
    tripType: "Holiday",
    destination: "",
    climate: undefined,
    season: undefined,
    expectsRain: false,
    expectsSnow: false,
    startDate: undefined,
    nights: 7,
    luggage: "Carry-on only",
    weightLimitKg: undefined,
    liquidsRestricted: true,
    laundryAccess: false,
    companions: { kind: "Solo", infants: false, toddlers: false },
    activities: [],
    accommodation: { kind: "Hotel", amenities: [] },
    healthDocs: { meds: [], passport: true, idCard: true, insurance: true }
  };
}
