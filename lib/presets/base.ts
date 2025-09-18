import type { Item } from "../types";

export const baseEssentials: Item[] = [
  { id: "passport", label: "Passport / ID", category: "Documents", must: true },
  { id: "wallet", label: "Wallet + cards", category: "Documents", must: true },
  { id: "cash", label: "Local currency", category: "Documents" },
  { id: "phone", label: "Smartphone", category: "Electronics", must: true },
  { id: "charger", label: "Phone charger", category: "Electronics", qtyDefault: 1 },
  { id: "power-bank", label: "Power bank", category: "Electronics" },
  { id: "clothes-top", label: "Tops", category: "Clothing", qtyDefault: 3 },
  { id: "clothes-bottom", label: "Bottoms", category: "Clothing", qtyDefault: 2 },
  { id: "underwear", label: "Underwear", category: "Clothing", qtyDefault: 4 },
  { id: "socks", label: "Socks", category: "Clothing", qtyDefault: 4 },
  { id: "sleepwear", label: "Sleepwear", category: "Clothing", qtyDefault: 1 },
  { id: "toothbrush", label: "Toothbrush", category: "Toiletries", must: true },
  { id: "toothpaste", label: "Toothpaste", category: "Toiletries" },
  { id: "deodorant", label: "Deodorant", category: "Toiletries" },
  { id: "hairbrush", label: "Brush / comb", category: "Toiletries" },
  { id: "med-kit", label: "Basic meds", category: "Health" },
  { id: "painkillers", label: "Pain relief", category: "Health" },
  { id: "water-bottle", label: "Water bottle", category: "Outdoor" },
  { id: "sunglasses", label: "Sunglasses", category: "Misc" },
  { id: "earbuds", label: "Headphones", category: "Electronics" },
  { id: "notebook", label: "Notebook + pen", category: "Misc" },
  { id: "snacks", label: "Travel snacks", category: "Misc" },
  { id: "laundry-bag", label: "Laundry bag", category: "Misc" }
];
