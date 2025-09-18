import type { GeneratedList, TripProfile } from "@/lib/types";

export interface WizardStepProps {
  profile: TripProfile;
  onProfileChange: (profile: TripProfile) => void;
  preview: GeneratedList;
  onComplete: (list: GeneratedList) => void;
  notes: string;
  onNotesChange: (value: string) => void;
  onGoToStep: (index: number) => void;
}
