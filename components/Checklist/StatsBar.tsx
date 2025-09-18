"use client";

import { formatDateRange } from "@/lib/util";
import type { StoredTrip } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface StatsBarProps {
  trip: StoredTrip;
  explanations: string[];
}

export function StatsBar({ trip, explanations }: StatsBarProps) {
  return (
    <div className="flex flex-col gap-2 rounded-md border bg-card p-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{trip.profile.title}</h2>
        <p className="text-sm text-muted-foreground">
          {trip.profile.destination || "Destination TBA"} · {formatDateRange(trip.profile.startDate, trip.profile.nights)}
        </p>
      </div>
      <div className="flex flex-col items-start gap-2 text-sm md:items-end">
        <div>
          Packed {trip.stats.packedCount} / {trip.stats.totalCount}
        </div>
        {trip.stats.estWeightGrams ? (
          <div>Est. weight: {(trip.stats.estWeightGrams / 1000).toFixed(1)} kg</div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {explanations.map((message) => (
            <Badge key={message} variant="outline">
              {message}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
