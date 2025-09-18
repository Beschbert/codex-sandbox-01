import type { Item, TripType } from "../types";

interface TripTypePreset {
  tripType: TripType;
  items: Item[];
}

export const tripTypePresets: TripTypePreset[] = [
  {
    tripType: "Business",
    items: [
      { id: "blazer", label: "Blazer", category: "Business", qtyDefault: 1 },
      { id: "dress-shirts", label: "Dress shirts", category: "Business", qtyDefault: 2 },
      { id: "slacks", label: "Dress pants", category: "Business", qtyDefault: 1 },
      { id: "business-shoes", label: "Dress shoes", category: "Business" },
      { id: "laptop", label: "Work laptop", category: "Electronics", must: true },
      { id: "charger-laptop", label: "Laptop charger", category: "Electronics" },
      { id: "presentation", label: "Presentation materials", category: "Business" }
    ]
  },
  {
    tripType: "Festival",
    items: [
      { id: "earplugs", label: "Earplugs", category: "Festival", must: true },
      { id: "poncho", label: "Lightweight poncho", category: "Festival" },
      { id: "glow", label: "Glow accessories", category: "Festival" },
      { id: "portable-charger", label: "Portable charger", category: "Electronics" },
      { id: "hydration-pack", label: "Hydration pack", category: "Outdoor" }
    ]
  },
  {
    tripType: "Camping",
    items: [
      { id: "multi-tool", label: "Multi-tool", category: "Outdoor" },
      { id: "lantern", label: "Lantern", category: "Camping" },
      { id: "firestarter", label: "Fire starter", category: "Camping" }
    ]
  },
  {
    tripType: "Beach",
    items: [
      { id: "swimwear", label: "Swimwear", category: "Beach", qtyDefault: 2 },
      { id: "beach-towel", label: "Beach towel", category: "Beach" },
      { id: "sunhat", label: "Sun hat", category: "Beach" }
    ]
  },
  {
    tripType: "Ski/Snowboard",
    items: [
      { id: "ski-jacket", label: "Ski jacket", category: "Snowsports" },
      { id: "ski-pants", label: "Ski pants", category: "Snowsports" },
      { id: "goggles", label: "Goggles", category: "Snowsports" },
      { id: "helmet", label: "Helmet", category: "Snowsports", must: true }
    ]
  },
  {
    tripType: "Road Trip",
    items: [
      { id: "car-docs", label: "Car documents", category: "Documents", must: true },
      { id: "snacks-road", label: "Road snacks", category: "Misc" },
      { id: "entertainment", label: "Offline entertainment", category: "Misc" }
    ]
  },
  {
    tripType: "Family Visit",
    items: [
      { id: "gifts", label: "Gifts", category: "Misc" },
      { id: "family-photos", label: "Family photos", category: "Misc" }
    ]
  },
  {
    tripType: "Cruise",
    items: [
      { id: "formal-night", label: "Formal night outfit", category: "Business" },
      { id: "motion-sickness", label: "Motion sickness remedies", category: "Health" },
      { id: "day-bag", label: "Day bag", category: "Misc" }
    ]
  },
  {
    tripType: "Backpacking",
    items: [
      { id: "packing-cubes", label: "Packing cubes", category: "Outdoor" },
      { id: "hostel-lock", label: "Padlock", category: "Outdoor" },
      { id: "microfiber-towel", label: "Microfiber towel", category: "Camping" }
    ]
  }
];

export function itemsForTripType(type: TripType): Item[] {
  return tripTypePresets.find((preset) => preset.tripType === type)?.items ?? [];
}
