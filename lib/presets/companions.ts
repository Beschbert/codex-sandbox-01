import type { Item } from "../types";

export const companionPresets: Record<string, Item[]> = {
  Solo: [],
  Couple: [{ id: "date-night", label: "Date night outfit", category: "Misc" }],
  "Family with kids": [
    { id: "games-kids", label: "Kids entertainment", category: "Baby/Kids" },
    { id: "snacks-kids", label: "Kids snacks", category: "Baby/Kids" }
  ],
  Group: [{ id: "group-games", label: "Group games", category: "Misc" }]
};

export const infantItems: Item[] = [
  { id: "diapers", label: "Diapers", category: "Baby/Kids", qtyDefault: 10, must: true },
  { id: "wipes", label: "Baby wipes", category: "Baby/Kids", qtyDefault: 1 },
  { id: "bottles", label: "Baby bottles", category: "Baby/Kids" }
];

export const toddlerItems: Item[] = [
  { id: "toys", label: "Favorite toys", category: "Baby/Kids" },
  { id: "booster", label: "Booster seat", category: "Baby/Kids" }
];
