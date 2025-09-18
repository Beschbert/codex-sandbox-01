export type TripType =
  | "Holiday"
  | "Business"
  | "City Break"
  | "Backpacking"
  | "Camping"
  | "Beach"
  | "Ski/Snowboard"
  | "Festival"
  | "Road Trip"
  | "Family Visit"
  | "Cruise"
  | "Other";

export type Climate = "Tropical" | "Temperate" | "Cold" | "Desert" | "High Altitude";
export type Season = "Winter" | "Spring" | "Summer" | "Fall";

export type Category =
  | "Documents"
  | "Clothing"
  | "Toiletries"
  | "Health"
  | "Electronics"
  | "Outdoor"
  | "Camping"
  | "Beach"
  | "Snowsports"
  | "Business"
  | "Baby/Kids"
  | "Festival"
  | "Misc";

export interface Item {
  id: string;
  label: string;
  category: Category;
  qtyDefault?: number;
  qty?: number;
  unit?: "pc" | "set" | "ml" | "g";
  weightGrams?: number;
  must?: boolean;
  notes?: string;
  tags?: string[];
  packed?: boolean;
}

export interface TripProfile {
  title: string;
  tripType: TripType;
  destination?: string;
  climate?: Climate;
  season?: Season;
  expectsRain?: boolean;
  expectsSnow?: boolean;
  startDate?: string;
  nights?: number;
  luggage: "Carry-on only" | "Checked" | "Backpack";
  weightLimitKg?: number;
  liquidsRestricted?: boolean;
  laundryAccess?: boolean;
  companions: {
    kind: "Solo" | "Couple" | "Family with kids" | "Group";
    infants?: boolean;
    toddlers?: boolean;
  };
  activities: string[];
  accommodation: {
    kind: "Hotel" | "Hostel" | "Airbnb" | "Camping" | "Cruise" | "Friends/Family";
    amenities?: string[];
  };
  healthDocs: {
    meds?: string[];
    passport?: boolean;
    idCard?: boolean;
    visa?: boolean;
    insurance?: boolean;
    vaxCard?: boolean;
    plugType?: string;
  };
}

export interface GeneratedList {
  profile: TripProfile;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  stats: {
    packedCount: number;
    totalCount: number;
    estWeightGrams?: number;
  };
}

export interface StoredTrip extends GeneratedList {
  id: string;
  notes?: string;
}

export interface StorageState {
  version: number;
  trips: StoredTrip[];
  activeTripId?: string;
}

export interface Preset {
  id: string;
  label: string;
  items: Item[];
  applies?: (profile: TripProfile) => boolean;
}
