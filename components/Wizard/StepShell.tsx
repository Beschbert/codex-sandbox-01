"use client";

import { Button } from "@/components/ui/button";

interface StepShellProps {
  step: number;
  steps: number;
  title: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext?: () => void;
  disableNext?: boolean;
  isReview?: boolean;
}

export function StepShell({
  step,
  steps,
  title,
  children,
  onBack,
  onNext,
  disableNext,
  isReview
}: StepShellProps) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Step {step} of {steps}</span>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </header>
      {children}
      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        {isReview ? null : (
          <Button onClick={onNext} disabled={disableNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
