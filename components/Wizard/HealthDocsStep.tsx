"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TripProfile } from "@/lib/types";
import type { WizardStepProps } from "./types";

const plugTypes = ["Unknown", "A", "B", "C", "D", "E", "F", "G", "I", "J", "K", "L", "M"];
type DocToggleKey = Exclude<keyof TripProfile["healthDocs"], "meds" | "plugType">;

type HealthDocsStepProps = WizardStepProps;

export function HealthDocsStep({ profile, onProfileChange }: HealthDocsStepProps) {
  const [medInput, setMedInput] = useState("");
  const meds = profile.healthDocs.meds ?? [];

  const updateMeds = (next: string[]) => {
    onProfileChange({ ...profile, healthDocs: { ...profile.healthDocs, meds: next } });
  };

  const toggleDoc = (key: DocToggleKey) => {
    const current = profile.healthDocs[key] ?? false;
    onProfileChange({ ...profile, healthDocs: { ...profile.healthDocs, [key]: !current } });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-sm font-medium">Medications</span>
        <div className="flex gap-2">
          <Input
            value={medInput}
            onChange={(event) => setMedInput(event.target.value)}
            placeholder="Add medication"
            onKeyDown={(event) => {
              if (event.key === "Enter" && medInput.trim()) {
                event.preventDefault();
                updateMeds([...meds, medInput.trim()]);
                setMedInput("");
              }
            }}
          />
          <Button
            type="button"
            onClick={() => {
              if (!medInput.trim()) return;
              updateMeds([...meds, medInput.trim()]);
              setMedInput("");
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {meds.map((med) => (
            <Button key={med} variant="secondary" size="sm" onClick={() => updateMeds(meds.filter((item) => item !== med))}>
              {med} ×
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={profile.healthDocs.passport ?? false} onCheckedChange={() => toggleDoc("passport")} />
          Passport
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={profile.healthDocs.idCard ?? false} onCheckedChange={() => toggleDoc("idCard")} />
          ID card
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={profile.healthDocs.visa ?? false} onCheckedChange={() => toggleDoc("visa")} />
          Visa
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={profile.healthDocs.insurance ?? false} onCheckedChange={() => toggleDoc("insurance")} />
          Travel insurance
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={profile.healthDocs.vaxCard ?? false} onCheckedChange={() => toggleDoc("vaxCard")} />
          Vaccination proof
        </label>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">Power plug type</span>
        <Select
          value={profile.healthDocs.plugType ?? "Unknown"}
          onValueChange={(value) =>
            onProfileChange({ ...profile, healthDocs: { ...profile.healthDocs, plugType: value } })
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Plug type" />
          </SelectTrigger>
          <SelectContent>
            {plugTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
