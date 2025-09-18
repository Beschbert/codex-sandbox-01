"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/lib/storage";
import type { StoredTrip } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/Common/ConfirmDialog";

export default function TripsPage() {
  const router = useRouter();
  const {
    trips,
    activeTrip,
    setActiveTrip,
    renameTrip,
    duplicateTrip,
    removeTrip,
    refresh
  } = useTripStore();
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [pendingDelete, setPendingDelete] = useState<StoredTrip | null>(null);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 md:p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Saved trips</h1>
        <p className="text-muted-foreground">
          Manage all of your packing plans. Set one active to edit it on the checklist screen.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {trips.map((trip) => {
          const title = editing[trip.id] ?? trip.profile.title;
          return (
            <Card key={trip.id} className={trip.id === activeTrip?.id ? "border-primary" : undefined}>
              <CardHeader>
                <Input
                  value={title}
                  onChange={(event) =>
                    setEditing((prev) => ({ ...prev, [trip.id]: event.target.value }))
                  }
                  onBlur={() => {
                    renameTrip(trip.id, title);
                    setEditing((prev) => ({ ...prev, [trip.id]: undefined as never }));
                  }}
                />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span>
                  {trip.profile.destination ? `${trip.profile.destination} · ` : ""}
                  {trip.profile.startDate ? new Date(trip.profile.startDate).toLocaleDateString() : "No date"}
                </span>
                <span>{trip.items.length} items</span>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => setActiveTrip(trip.id)}>
                    {trip.id === activeTrip?.id ? "Active" : "Set active"}
                  </Button>
                  <Button variant="outline" onClick={() => duplicateTrip(trip.id)}>
                    Duplicate
                  </Button>
                </div>
                <Button variant="destructive" onClick={() => setPendingDelete(trip)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Button onClick={() => router.push("/wizard")}>Start new trip</Button>
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete trip?"
        description="This cannot be undone."
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            removeTrip(pendingDelete.id);
            setPendingDelete(null);
          }
        }}
      />
    </main>
  );
}
