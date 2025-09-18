import { baseEssentials } from "./presets/base";
import { itemsForTripType } from "./presets/tripTypes";
import { itemsForClimate, itemsForSeason } from "./presets/climate";
import { itemsForActivities } from "./presets/activities";
import { accommodationPresets, amenityRemovals } from "./presets/accommodation";
import { companionPresets, infantItems, toddlerItems } from "./presets/companions";
import type { GeneratedList, Item, TripProfile } from "./types";
import { weightMap } from "./weights";
import { slugify } from "./util";

function cloneItem(item: Item): Item {
  return {
    ...item,
    qty: item.qtyDefault ?? item.qty ?? 1,
    packed: false
  };
}

function mergeItems(items: Item[]): Item[] {
  const map = new Map<string, Item>();
  for (const item of items) {
    const key = item.id || `${slugify(item.label)}-${item.category}`;
    const existing = map.get(key);
    if (existing) {
      const qty = (existing.qty ?? existing.qtyDefault ?? 1) + (item.qty ?? item.qtyDefault ?? 1);
      map.set(key, {
        ...existing,
        qty,
        must: existing.must || item.must,
        notes: existing.notes ?? item.notes
      });
    } else {
      map.set(key, cloneItem({ ...item, id: key }));
    }
  }
  return Array.from(map.values());
}

function removeItems(items: Item[], ids: string[]) {
  return items.filter((item) => !ids.includes(item.id));
}

function adjustForDuration(items: Item[], profile: TripProfile) {
  const nights = profile.nights ?? 3;
  const laundry = profile.laundryAccess ?? false;
  const underwear = items.find((item) => item.id === "underwear");
  if (underwear) {
    underwear.qty = laundry ? Math.ceil((nights + 1) / 2) : nights + 1;
  }
  const socks = items.find((item) => item.id === "socks");
  if (socks) {
    socks.qty = laundry ? Math.ceil((nights + 1) / 2) : nights + 1;
  }
  const tops = items.find((item) => item.id === "clothes-top");
  if (tops) {
    tops.qty = laundry ? Math.ceil((nights + 1) / 2) : Math.ceil((nights + 1) / 1.5);
  }
  const bottoms = items.find((item) => item.id === "clothes-bottom");
  if (bottoms) {
    bottoms.qty = laundry ? Math.max(1, Math.ceil((nights + 1) / 3)) : Math.max(2, Math.ceil((nights + 1) / 2));
  }
}

function adjustForLiquids(items: Item[], profile: TripProfile) {
  if (!profile.liquidsRestricted) return;
  const travelBag: Item = {
    id: "liquids-bag",
    label: "Clear 1L liquids bag",
    category: "Toiletries",
    must: true
  };
  items.push(cloneItem(travelBag));
  items.forEach((item) => {
    if (item.category === "Toiletries") {
      item.notes = [item.notes, "Travel-size (<100ml)"].filter(Boolean).join(" · ");
    }
  });
}

function adjustForAmenities(items: Item[], profile: TripProfile) {
  const amenities = profile.accommodation.amenities ?? [];
  if (!amenities.length) return;
  const removalIds = amenities.flatMap((amenity) => amenityRemovals[amenity] ?? []);
  if (removalIds.length) {
    const filtered = removeItems(items, removalIds);
    items.splice(0, items.length, ...filtered);
  }
}

function adjustForLuggage(items: Item[], profile: TripProfile) {
  if (profile.luggage === "Carry-on only") {
    const cubes: Item = {
      id: "packing-cubes",
      label: "Packing cubes",
      category: "Misc"
    };
    items.push(cloneItem(cubes));
    const withoutRestricted = removeItems(items, ["multi-tool"]);
    items.splice(0, items.length, ...withoutRestricted);
  }
}

function adjustForWeather(items: Item[], profile: TripProfile) {
  if (profile.expectsRain) {
    items.push(cloneItem({ id: "rain-jacket", label: "Rain jacket", category: "Outdoor" }));
  }
  if (profile.expectsSnow) {
    items.push(cloneItem({ id: "snow-boots", label: "Snow boots", category: "Snowsports" }));
  }
}

export function computeStats(items: Item[]) {
  const totalCount = items.length;
  const packedCount = items.filter((item) => item.packed).length;
  const estWeightGrams = items.reduce((sum, item) => {
    const weight = item.weightGrams ?? weightMap[item.id] ?? 0;
    const quantity = item.qty ?? item.qtyDefault ?? 1;
    return sum + weight * quantity;
  }, 0);
  return { totalCount, packedCount, estWeightGrams };
}

export function explain(profile: TripProfile): string[] {
  const messages: string[] = [];
  if (profile.luggage === "Carry-on only") {
    messages.push("Carry-on mode: toiletries limited to travel sizes and bulky gear trimmed.");
  }
  if (profile.laundryAccess) {
    messages.push("Laundry access detected: clothing quantities reduced.");
  }
  if (profile.activities.includes("Camping")) {
    messages.push("Camping gear added for overnight stays.");
  }
  if (profile.expectsRain) {
    messages.push("Rainy weather expected: waterproof layers included.");
  }
  if (profile.companions.infants) {
    messages.push("Infant travel: baby essentials highlighted as must-bring.");
  }
  return messages;
}

export function generateList(profile: TripProfile): GeneratedList {
  const now = new Date().toISOString();
  const collections: Item[] = [
    ...baseEssentials,
    ...itemsForTripType(profile.tripType),
    ...itemsForClimate(profile.climate),
    ...itemsForSeason(profile.climate ?? "Temperate", profile.season),
    ...itemsForActivities(profile.activities),
    ...(accommodationPresets[profile.accommodation.kind] ?? []),
    ...(companionPresets[profile.companions.kind] ?? [])
  ];
  if (profile.companions.infants) {
    collections.push(...infantItems);
  }
  if (profile.companions.toddlers) {
    collections.push(...toddlerItems);
  }
  if (profile.healthDocs.meds?.length) {
    profile.healthDocs.meds.forEach((med) => {
      collections.push({ id: `med-${slugify(med)}`, label: med, category: "Health", must: true });
    });
  }
  const merged = mergeItems(collections);
  adjustForDuration(merged, profile);
  adjustForLiquids(merged, profile);
  adjustForAmenities(merged, profile);
  adjustForLuggage(merged, profile);
  adjustForWeather(merged, profile);

  const stats = computeStats(merged);

  const list: GeneratedList = {
    profile,
    items: merged,
    createdAt: now,
    updatedAt: now,
    stats
  };

  return list;
}
