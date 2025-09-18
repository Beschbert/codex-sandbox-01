"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TripTypeStep } from "@/components/Wizard/TripTypeStep";
import { ClimateStep } from "@/components/Wizard/ClimateStep";
import { DurationLuggageStep } from "@/components/Wizard/DurationLuggageStep";
import { CompanionsStep } from "@/components/Wizard/CompanionsStep";
import { ActivitiesStep } from "@/components/Wizard/ActivitiesStep";
import { AccommodationStep } from "@/components/Wizard/AccommodationStep";
import { HealthDocsStep } from "@/components/Wizard/HealthDocsStep";
import { ReviewStep } from "@/components/Wizard/ReviewStep";
import { StepShell } from "@/components/Wizard/StepShell";
import type { TripProfile } from "@/lib/types";
import { defaultProfile } from "@/lib/util";
import { generateList } from "@/lib/generate";
import { useTripStore } from "@/lib/storage";
import { Card } from "@/components/ui/card";
import type { GeneratedList } from "@/lib/types";

const steps = [
  { id: "trip", title: "Trip Type", component: TripTypeStep },
  { id: "climate", title: "Destination & Climate", component: ClimateStep },
  { id: "duration", title: "Duration & Luggage", component: DurationLuggageStep },
  { id: "companions", title: "Companions", component: CompanionsStep },
  { id: "activities", title: "Activities", component: ActivitiesStep },
  { id: "accommodation", title: "Accommodation", component: AccommodationStep },
  { id: "health", title: "Health & Docs", component: HealthDocsStep },
  { id: "review", title: "Review", component: ReviewStep }
] as const;

export default function WizardPage() {
  const router = useRouter();
  const { upsertTrip } = useTripStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [profile, setProfile] = useState<TripProfile>(defaultProfile());
  const [notes, setNotes] = useState<string>("");

  const CurrentStep = steps[stepIndex].component;

  const preview = useMemo(() => {
    return generateList(profile);
  }, [profile]);

  const stepValid = useMemo(() => {
    return [
      Boolean(profile.title?.trim()) && Boolean(profile.tripType),
      Boolean(profile.destination?.trim()) && Boolean(profile.climate),
      Boolean(profile.startDate) && (profile.nights ?? 0) >= 0,
      true,
      true,
      Boolean(profile.accommodation.kind),
      true,
      true
    ];
  }, [profile]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((idx) => idx + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((idx) => idx - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4 md:p-8">
      <StepShell
        step={stepIndex + 1}
        steps={steps.length}
        title={steps[stepIndex].title}
        onBack={handleBack}
        disableNext={!stepValid[stepIndex]}
        onNext={handleNext}
        isReview={steps[stepIndex].id === "review"}
      >
        <Card className="p-4 md:p-6">
          <CurrentStep
            profile={profile}
            onProfileChange={setProfile}
            preview={preview}
            onComplete={(list: GeneratedList) => {
              upsertTrip(list, notes);
              router.push("/");
            }}
            notes={notes}
            onNotesChange={setNotes}
            onGoToStep={setStepIndex}
          />
        </Card>
      </StepShell>
    </main>
  );
}
