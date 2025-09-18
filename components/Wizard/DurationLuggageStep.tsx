"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { WizardStepProps } from "./types";

const luggageOptions = ["Carry-on only", "Checked", "Backpack"] as const;

type DurationLuggageStepProps = WizardStepProps;

export function DurationLuggageStep({ profile, onProfileChange }: DurationLuggageStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start date</Label>
          <Input
            id="start-date"
            type="date"
            value={profile.startDate ?? ""}
            onChange={(event) => onProfileChange({ ...profile, startDate: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nights">Nights</Label>
          <Input
            id="nights"
            type="number"
            min={0}
            value={profile.nights ?? 0}
            onChange={(event) => onProfileChange({ ...profile, nights: Number(event.target.value) })}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Luggage type</Label>
          <Select
            value={profile.luggage}
            onValueChange={(value: (typeof luggageOptions)[number]) => onProfileChange({ ...profile, luggage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select luggage" />
            </SelectTrigger>
            <SelectContent>
              {luggageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight-limit">Weight limit (kg)</Label>
          <Input
            id="weight-limit"
            type="number"
            min={0}
            value={profile.weightLimitKg ?? ""}
            onChange={(event) =>
              onProfileChange({
                ...profile,
                weightLimitKg: event.target.value ? Number(event.target.value) : undefined
              })
            }
            placeholder="Optional"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-center justify-between rounded-md border p-3">
          <div>
            <div className="font-medium">Carry-on liquids restrictions?</div>
            <div className="text-sm text-muted-foreground">Adds 100ml-friendly toiletries.</div>
          </div>
          <Switch
            checked={profile.liquidsRestricted ?? false}
            onCheckedChange={(value) => onProfileChange({ ...profile, liquidsRestricted: Boolean(value) })}
          />
        </label>
        <label className="flex items-center justify-between rounded-md border p-3">
          <div>
            <div className="font-medium">Laundry access?</div>
            <div className="text-sm text-muted-foreground">We&apos;ll pack fewer clothes.</div>
          </div>
          <Switch
            checked={profile.laundryAccess ?? false}
            onCheckedChange={(value) => onProfileChange({ ...profile, laundryAccess: Boolean(value) })}
          />
        </label>
      </div>
    </div>
  );
}
