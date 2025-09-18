"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { WizardStepProps } from "./types";

const accommodations = ["Hotel", "Hostel", "Airbnb", "Camping", "Cruise", "Friends/Family"] as const;
const amenities = ["Towels provided", "Toiletries provided", "Hair dryer", "Iron"] as const;

type AccommodationStepProps = WizardStepProps;

export function AccommodationStep({ profile, onProfileChange }: AccommodationStepProps) {
  const toggleAmenity = (amenity: string) => {
    const list = new Set(profile.accommodation.amenities ?? []);
    if (list.has(amenity)) {
      list.delete(amenity);
    } else {
      list.add(amenity);
    }
    onProfileChange({
      ...profile,
      accommodation: { ...profile.accommodation, amenities: Array.from(list) }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-sm font-medium">Where are you staying?</span>
        <div className="grid gap-2 md:grid-cols-3">
          {accommodations.map((kind) => {
            const active = profile.accommodation.kind === kind;
            return (
              <Button
                key={kind}
                variant={active ? "default" : "outline"}
                onClick={() => onProfileChange({ ...profile, accommodation: { ...profile.accommodation, kind } })}
              >
                {kind}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">Amenities provided</span>
        <div className="grid gap-3 md:grid-cols-2">
          {amenities.map((amenity) => {
            const active = profile.accommodation.amenities?.includes(amenity);
            return (
              <label key={amenity} className="flex items-center justify-between rounded-md border p-3">
                <span>{amenity}</span>
                <Switch checked={active} onCheckedChange={() => toggleAmenity(amenity)} />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
