import type { Item } from "../types";

export interface ActivityPreset {
  activity: string;
  items: Item[];
}

export const activityPresets: ActivityPreset[] = [
  {
    activity: "Swimming",
    items: [
      { id: "swimsuit", label: "Swimsuit", category: "Beach" },
      { id: "goggles", label: "Goggles", category: "Beach" },
      { id: "flipflops", label: "Flip flops", category: "Beach" }
    ]
  },
  {
    activity: "Hiking",
    items: [
      { id: "hiking-boots", label: "Hiking boots", category: "Outdoor" },
      { id: "trekking-poles", label: "Trekking poles", category: "Outdoor" },
      { id: "trail-map", label: "Trail map / GPS", category: "Outdoor" }
    ]
  },
  {
    activity: "Gym",
    items: [
      { id: "gym-clothes", label: "Gym outfits", category: "Clothing" },
      { id: "gym-shoes", label: "Training shoes", category: "Clothing" },
      { id: "gym-lock", label: "Locker lock", category: "Misc" }
    ]
  },
  {
    activity: "Formal Events",
    items: [
      { id: "formal-outfit", label: "Formal outfit", category: "Business" },
      { id: "dress-shoes", label: "Formal shoes", category: "Business" }
    ]
  },
  {
    activity: "Business Meetings",
    items: [
      { id: "business-cards", label: "Business cards", category: "Business" },
      { id: "notebook-business", label: "Meeting notebook", category: "Business" }
    ]
  },
  {
    activity: "Snowsports",
    items: [
      { id: "lift-pass", label: "Lift pass holder", category: "Snowsports" },
      { id: "snow-gloves", label: "Waterproof gloves", category: "Snowsports" }
    ]
  },
  {
    activity: "Watersports",
    items: [
      { id: "rash-guard", label: "Rash guard", category: "Beach" },
      { id: "dry-bag", label: "Dry bag", category: "Outdoor" }
    ]
  },
  {
    activity: "Photography",
    items: [
      { id: "camera", label: "Camera", category: "Electronics" },
      { id: "camera-battery", label: "Camera batteries", category: "Electronics" },
      { id: "sd-cards", label: "SD cards", category: "Electronics" }
    ]
  },
  {
    activity: "Camping",
    items: [
      { id: "tent", label: "Tent", category: "Camping", must: true },
      { id: "sleeping-bag", label: "Sleeping bag", category: "Camping", must: true },
      { id: "camp-stove", label: "Camp stove", category: "Camping" },
      { id: "cookware", label: "Cookware", category: "Camping" }
    ]
  },
  {
    activity: "Cooking",
    items: [
      { id: "spices", label: "Favorite spices", category: "Misc" },
      { id: "chef-knife", label: "Chef knife", category: "Misc" }
    ]
  },
  {
    activity: "Partying",
    items: [
      { id: "party-outfit", label: "Party outfits", category: "Misc" },
      { id: "hangover", label: "Recovery kit", category: "Health" }
    ]
  },
  {
    activity: "Running",
    items: [
      { id: "running-shoes", label: "Running shoes", category: "Clothing" },
      { id: "hydration-belt", label: "Hydration belt", category: "Outdoor" }
    ]
  },
  {
    activity: "Cycling",
    items: [
      { id: "helmet-bike", label: "Cycling helmet", category: "Outdoor", must: true },
      { id: "bike-shorts", label: "Cycling shorts", category: "Clothing" }
    ]
  },
  {
    activity: "SCUBA/snorkel",
    items: [
      { id: "mask", label: "Mask & snorkel", category: "Beach" },
      { id: "reef-safe", label: "Reef-safe sunscreen", category: "Toiletries" }
    ]
  },
  {
    activity: "Board games",
    items: [{ id: "travel-games", label: "Compact board games", category: "Misc" }]
  },
  {
    activity: "Music instruments",
    items: [
      { id: "instrument", label: "Instrument", category: "Misc" },
      { id: "sheet-music", label: "Sheet music", category: "Misc" }
    ]
  }
];

export function itemsForActivities(activities: string[]): Item[] {
  return activities.flatMap((activity) =>
    activityPresets.find((preset) => preset.activity === activity)?.items ?? []
  );
}
