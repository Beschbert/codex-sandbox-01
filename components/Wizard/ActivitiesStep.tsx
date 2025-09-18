"use client";

import { Button } from "@/components/ui/button";
import type { WizardStepProps } from "./types";

const activities = [
  "Swimming",
  "Hiking",
  "Gym",
  "Formal Events",
  "Business Meetings",
  "Snowsports",
  "Watersports",
  "Photography",
  "Camping",
  "Cooking",
  "Partying",
  "Running",
  "Cycling",
  "SCUBA/snorkel",
  "Board games",
  "Music instruments"
];

type ActivitiesStepProps = WizardStepProps;

export function ActivitiesStep({ profile, onProfileChange }: ActivitiesStepProps) {
  const toggleActivity = (activity: string) => {
    const current = new Set(profile.activities);
    if (current.has(activity)) {
      current.delete(activity);
    } else {
      current.add(activity);
    }
    onProfileChange({ ...profile, activities: Array.from(current) });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select everything you plan to do so we can suggest the right gear. You can always edit later.
      </p>
      <div className="flex flex-wrap gap-2">
        {activities.map((activity) => {
          const active = profile.activities.includes(activity);
          return (
            <Button
              key={activity}
              type="button"
              variant={active ? "default" : "outline"}
              onClick={() => toggleActivity(activity)}
            >
              {activity}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
