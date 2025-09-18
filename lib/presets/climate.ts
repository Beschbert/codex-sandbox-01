import type { Climate, Item, Season } from "../types";

interface ClimatePreset {
  climate: Climate;
  season?: Season;
  items: Item[];
}

export const climatePresets: ClimatePreset[] = [
  {
    climate: "Cold",
    items: [
      { id: "thermal-top", label: "Thermal tops", category: "Clothing" },
      { id: "thermal-bottom", label: "Thermal leggings", category: "Clothing" },
      { id: "heavy-coat", label: "Insulated coat", category: "Clothing" },
      { id: "beanie", label: "Beanie", category: "Clothing" },
      { id: "gloves", label: "Gloves", category: "Clothing" },
      { id: "scarf", label: "Scarf", category: "Clothing" },
      { id: "lip-balm", label: "Lip balm", category: "Health" }
    ]
  },
  {
    climate: "Tropical",
    items: [
      { id: "mosquito", label: "Mosquito repellent", category: "Health" },
      { id: "after-sun", label: "After-sun lotion", category: "Toiletries" },
      { id: "linen", label: "Light breathable outfits", category: "Clothing" },
      { id: "sun-cream", label: "High SPF sunscreen", category: "Toiletries", must: true },
      { id: "cooling-towel", label: "Cooling towel", category: "Outdoor" }
    ]
  },
  {
    climate: "Desert",
    items: [
      { id: "hydration", label: "Extra hydration", category: "Health" },
      { id: "dust-mask", label: "Dust mask", category: "Health" },
      { id: "sunscreen-high", label: "High SPF sunscreen", category: "Toiletries", must: true }
    ]
  },
  {
    climate: "High Altitude",
    items: [
      { id: "electrolytes", label: "Electrolyte packets", category: "Health" },
      { id: "layers", label: "Layering mid-layers", category: "Clothing" },
      { id: "hat", label: "Warm hat", category: "Clothing" }
    ]
  }
];

export const seasonalPresets: ClimatePreset[] = [
  {
    climate: "Temperate",
    season: "Winter",
    items: [
      { id: "coat", label: "Winter coat", category: "Clothing" },
      { id: "boots", label: "Waterproof boots", category: "Outdoor" }
    ]
  },
  {
    climate: "Temperate",
    season: "Summer",
    items: [
      { id: "hat-temp", label: "Sun hat", category: "Beach" },
      { id: "sandals", label: "Sandals", category: "Beach" }
    ]
  }
];

export function itemsForClimate(climate?: Climate): Item[] {
  return climate ? climatePresets.find((preset) => preset.climate === climate)?.items ?? [] : [];
}

export function itemsForSeason(climate: Climate | undefined, season?: Season): Item[] {
  if (!season) return [];
  return (
    seasonalPresets.find((preset) => preset.climate === climate && preset.season === season)?.items ?? []
  );
}
