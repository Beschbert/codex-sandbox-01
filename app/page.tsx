"use client";

import { useEffect, useMemo, useState } from "react";
import { ChecklistView } from "@/components/Checklist/ChecklistView";
import { Toolbar } from "@/components/Checklist/Toolbar";
import { StatsBar } from "@/components/Checklist/StatsBar";
import { SearchBar } from "@/components/Checklist/SearchBar";
import { CategoryFilters } from "@/components/Checklist/CategoryFilters";
import { useTripStore } from "@/lib/storage";
import { explain } from "@/lib/generate";
import { Card, CardContent } from "@/components/ui/card";

export default function ChecklistPage() {
  const { activeTrip, updateActiveTrip, refresh, setActiveTrip, trips, importTrip } = useTripStore();
  const [search, setSearch] = useState("");
  const [onlyUnpacked, setOnlyUnpacked] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const visibleItemIds = useMemo(() => {
    if (!activeTrip) return undefined;
    const filtering = Boolean(search) || onlyUnpacked || categoryFilter.length > 0;
    if (!filtering) return undefined;
    return new Set(
      activeTrip.items
        .filter((item) => {
          if (onlyUnpacked && item.packed) return false;
          if (categoryFilter.length && !categoryFilter.includes(item.category)) {
            return false;
          }
          if (!search) return true;
          return `${item.label} ${item.notes ?? ""}`
            .toLowerCase()
            .includes(search.toLowerCase());
        })
        .map((item) => item.id)
    );
  }, [activeTrip, categoryFilter, onlyUnpacked, search]);

  if (!activeTrip) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-6">
        <Card>
          <CardContent className="flex flex-col gap-4 p-6 text-center">
            <h1 className="text-2xl font-semibold">No active checklist yet</h1>
            <p className="text-muted-foreground">
              Start a new packing plan in the wizard and your personalized checklist will appear here.
            </p>
            <Toolbar
              disabled
              onNewWizard={() => {
                window.location.href = "/wizard";
              }}
              trip={undefined}
              trips={trips}
              onSelectTrip={(id) => setActiveTrip(id)}
              onImportTrip={importTrip}
            />
          </CardContent>
        </Card>
      </main>
    );
  }

  const explanations = explain(activeTrip.profile);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 p-4 md:p-6">
      <Toolbar
        trip={activeTrip}
        onNewWizard={() => {
          window.location.href = "/wizard";
        }}
        trips={trips}
        onSelectTrip={(id) => setActiveTrip(id)}
        onImportTrip={importTrip}
      />
      <StatsBar trip={activeTrip} explanations={explanations} />
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        onlyUnpacked={onlyUnpacked}
        onOnlyUnpackedChange={setOnlyUnpacked}
      />
      <CategoryFilters selected={categoryFilter} onChange={setCategoryFilter} />
      <ChecklistView trip={activeTrip} visibleItemIds={visibleItemIds} onUpdate={updateActiveTrip} />
    </main>
  );
}
