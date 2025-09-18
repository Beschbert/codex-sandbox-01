"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { WizardStepProps } from "./types";

const companionKinds = ["Solo", "Couple", "Family with kids", "Group"] as const;

type CompanionsStepProps = WizardStepProps;

export function CompanionsStep({ profile, onProfileChange }: CompanionsStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-sm font-medium">Who&apos;s travelling?</span>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {companionKinds.map((kind) => {
            const active = profile.companions.kind === kind;
            return (
              <Button
                key={kind}
                variant={active ? "default" : "outline"}
                onClick={() => onProfileChange({ ...profile, companions: { ...profile.companions, kind } })}
              >
                {kind}
              </Button>
            );
          })}
        </div>
      </div>
      {profile.companions.kind === "Family with kids" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="font-medium">Infants?</div>
              <div className="text-sm text-muted-foreground">Adds diapering essentials.</div>
            </div>
            <Switch
              checked={profile.companions.infants ?? false}
              onCheckedChange={(value) =>
                onProfileChange({
                  ...profile,
                  companions: { ...profile.companions, infants: Boolean(value) }
                })
              }
            />
          </label>
          <label className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="font-medium">Toddlers?</div>
              <div className="text-sm text-muted-foreground">We&apos;ll add travel toys and seats.</div>
            </div>
            <Switch
              checked={profile.companions.toddlers ?? false}
              onCheckedChange={(value) =>
                onProfileChange({
                  ...profile,
                  companions: { ...profile.companions, toddlers: Boolean(value) }
                })
              }
            />
          </label>
        </div>
      ) : null}
      {profile.companions.kind === "Group" ? (
        <p className="rounded-md border p-3 text-sm text-muted-foreground">
          Consider coordinating shared gear like games or cooking kits—Packr will suggest group-friendly extras.
        </p>
      ) : null}
    </div>
  );
}
