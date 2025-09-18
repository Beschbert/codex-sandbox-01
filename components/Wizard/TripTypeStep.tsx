"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TripType } from "@/lib/types";
import type { WizardStepProps } from "./types";

const tripTypes: TripType[] = [
  "Holiday",
  "Business",
  "City Break",
  "Backpacking",
  "Camping",
  "Beach",
  "Ski/Snowboard",
  "Festival",
  "Road Trip",
  "Family Visit",
  "Cruise",
  "Other"
];

type TripTypeStepProps = WizardStepProps;

export function TripTypeStep({ profile, onProfileChange }: TripTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="trip-title">
          Trip title
        </label>
        <Input
          id="trip-title"
          value={profile.title}
          onChange={(event) => onProfileChange({ ...profile, title: event.target.value })}
          placeholder="Summer adventure"
        />
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">What kind of trip is it?</span>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {tripTypes.map((type) => {
            const active = profile.tripType === type;
            return (
              <Button
                key={type}
                type="button"
                variant={active ? "default" : "outline"}
                onClick={() => onProfileChange({ ...profile, tripType: type })}
              >
                {type}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
