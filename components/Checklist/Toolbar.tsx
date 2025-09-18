"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
import type { StoredTrip } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileButtons } from "@/components/Common/FileButtons";
import { triggerPrint } from "@/lib/print";
import { useToast } from "@/components/Common/Toast";

interface ToolbarProps {
  trip?: StoredTrip;
  trips: StoredTrip[];
  onSelectTrip: (id: string) => void;
  onNewWizard: () => void;
  onImportTrip: (trip: StoredTrip) => void;
  disabled?: boolean;
}

export function Toolbar({ trip, trips, onSelectTrip, onNewWizard, onImportTrip, disabled }: ToolbarProps) {
  const { push } = useToast();
  return (
    <div className="sticky top-0 z-20 flex flex-col gap-3 border-b bg-background/80 p-4 backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={trip?.id} onValueChange={onSelectTrip}>
            <SelectTrigger className="w-60" disabled={!trips.length}>
              <SelectValue placeholder="Select a trip" />
            </SelectTrigger>
            <SelectContent>
              {trips.map((candidate) => (
                <SelectItem key={candidate.id} value={candidate.id}>
                  {candidate.profile.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={triggerPrint} disabled={!trip || disabled}>
            Print
          </Button>
          <FileButtons
            trip={trip}
            onExport={() =>
              push({ title: "Checklist exported", description: trip?.profile.title, variant: "success" })
            }
            onImport={(imported) => {
              onImportTrip(imported);
              push({ title: "Trip imported", description: imported.profile.title, variant: "success" });
            }}
            onError={(message) => push({ title: "Import failed", description: message, variant: "error" })}
          />
          <Button onClick={onNewWizard}>New wizard</Button>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
