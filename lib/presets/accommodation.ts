import type { Item } from "../types";

export const accommodationPresets: Record<string, Item[]> = {
  Hotel: [{ id: "room-key", label: "Room key card holder", category: "Misc" }],
  Hostel: [
    { id: "earplugs-hostel", label: "Earplugs", category: "Festival" },
    { id: "sleep-mask", label: "Sleep mask", category: "Misc" },
    { id: "towel", label: "Travel towel", category: "Toiletries" }
  ],
  Airbnb: [{ id: "grocery-list", label: "Grocery basics", category: "Misc" }],
  Camping: [
    { id: "camp-chair", label: "Camp chair", category: "Camping" },
    { id: "lantern-site", label: "Site lantern", category: "Camping" }
  ],
  Cruise: [{ id: "lanyard", label: "Cruise card lanyard", category: "Misc" }],
  "Friends/Family": [{ id: "host-gift", label: "Host gift", category: "Misc" }]
};

export const amenityRemovals: Record<string, string[]> = {
  "Towels provided": ["towel", "beach-towel"],
  "Toiletries provided": ["toothbrush", "toothpaste", "shampoo"],
  "Hair dryer": ["hair-dryer"],
  Iron: ["travel-iron"]
};
