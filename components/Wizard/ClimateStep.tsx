"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { Climate, Season } from "@/lib/types";
import type { WizardStepProps } from "./types";

const climates: Climate[] = ["Tropical", "Temperate", "Cold", "Desert", "High Altitude"];
const seasons: Season[] = ["Winter", "Spring", "Summer", "Fall"];

type ClimateStepProps = WizardStepProps;

export function ClimateStep({ profile, onProfileChange }: ClimateStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          value={profile.destination ?? ""}
          onChange={(event) => onProfileChange({ ...profile, destination: event.target.value })}
          placeholder="Country or region"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Climate</Label>
          <Select
            value={profile.climate}
            onValueChange={(value: Climate) => onProfileChange({ ...profile, climate: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select climate" />
            </SelectTrigger>
            <SelectContent>
              {climates.map((climate) => (
                <SelectItem key={climate} value={climate}>
                  {climate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Season</Label>
          <Select
            value={profile.season}
            onValueChange={(value: Season) => onProfileChange({ ...profile, season: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((season) => (
                <SelectItem key={season} value={season}>
                  {season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-center justify-between rounded-md border p-3">
          <div>
            <div className="font-medium">Expecting rain?</div>
            <div className="text-sm text-muted-foreground">We&apos;ll add waterproof layers.</div>
          </div>
          <Switch
            checked={profile.expectsRain ?? false}
            onCheckedChange={(value) => onProfileChange({ ...profile, expectsRain: Boolean(value) })}
          />
        </label>
        <label className="flex items-center justify-between rounded-md border p-3">
          <div>
            <div className="font-medium">Expecting snow?</div>
            <div className="text-sm text-muted-foreground">Adds thermal accessories.</div>
          </div>
          <Switch
            checked={profile.expectsSnow ?? false}
            onCheckedChange={(value) => onProfileChange({ ...profile, expectsSnow: Boolean(value) })}
          />
        </label>
      </div>
    </div>
  );
}
