"use client";

import { downloadJson, openFilePicker } from "@/lib/print";
import type { StoredTrip } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface FileButtonsProps {
  trip?: StoredTrip;
  onImport: (trip: StoredTrip) => void;
  onExport?: () => void;
  onError?: (message: string) => void;
}

export function FileButtons({ trip, onImport, onExport, onError }: FileButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => {
          if (!trip) return;
          downloadJson(`${trip.profile.title || "trip"}.json`, trip);
          onExport?.();
        }}
        disabled={!trip}
      >
        Export JSON
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          const data = await openFilePicker();
          if (!data) return;
          try {
            const parsed = JSON.parse(data) as StoredTrip;
            if (!parsed?.profile || !Array.isArray(parsed.items)) {
              throw new Error("Invalid trip file");
            }
            onImport(parsed);
          } catch (error) {
            onError?.((error as Error).message);
          }
        }}
      >
        Import JSON
      </Button>
    </div>
  );
}
