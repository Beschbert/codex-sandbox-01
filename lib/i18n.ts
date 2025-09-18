export type Locale = "en";

const strings = {
  en: {
    wizardTitle: "Trip setup wizard",
    reviewTitle: "Your tailored packing list"
  }
} as const;

export type MessageKey = keyof typeof strings.en;

export function t(key: MessageKey, locale: Locale = "en") {
  return strings[locale][key];
}
