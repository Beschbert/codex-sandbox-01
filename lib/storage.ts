"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { GeneratedList, StorageState, StoredTrip } from "./types";
import { createId } from "./util";
import { computeStats } from "./generate";

const STORAGE_KEY = "packr:v1";
const VERSION = 1;

const emptyState: StorageState = {
  version: VERSION,
  trips: [],
  activeTripId: undefined
};

function migrate(raw: Partial<StorageState> | null | undefined): StorageState {
  if (!raw) return { ...emptyState };
  const trips = Array.isArray(raw.trips)
    ? raw.trips.map((trip) => ({
        ...trip,
        stats: computeStats(trip?.items ?? []),
        createdAt: trip?.createdAt ?? new Date().toISOString(),
        updatedAt: trip?.updatedAt ?? new Date().toISOString()
      }))
    : [];
  return {
    version: VERSION,
    trips,
    activeTripId: trips.length ? raw.activeTripId ?? trips[0].id : undefined
  };
}

export function loadState(): StorageState {
  if (typeof window === "undefined") {
    return { ...emptyState };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...emptyState };
    const parsed = JSON.parse(raw) as Partial<StorageState>;
    return migrate(parsed);
  } catch (error) {
    console.warn("Failed to load storage", error);
    return { ...emptyState };
  }
}

export function saveState(state: StorageState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to persist storage", error);
  }
}

function upsertTripInternal(state: StorageState, trip: StoredTrip): StorageState {
  const existingIndex = state.trips.findIndex((t) => t.id === trip.id);
  const nextTrips = [...state.trips];
  if (existingIndex >= 0) {
    nextTrips[existingIndex] = trip;
  } else {
    nextTrips.unshift(trip);
  }
  return {
    ...state,
    trips: nextTrips.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
    activeTripId: trip.id
  };
}

function normalizeTrip(trip: StoredTrip): StoredTrip {
  const items = (trip.items ?? []).map((item) => ({
    ...item,
    qty: item.qty ?? item.qtyDefault ?? 1,
    packed: item.packed ?? false
  }));
  return {
    ...trip,
    id: trip.id || createId("trip"),
    items,
    createdAt: trip.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stats: computeStats(items)
  };
}

function updateTripInternal(
  state: StorageState,
  updater: (trip: StoredTrip) => StoredTrip
): StorageState {
  const active = state.trips.find((t) => t.id === state.activeTripId);
  if (!active) return state;
  const updated = updater(active);
  updated.updatedAt = new Date().toISOString();
  updated.stats = computeStats(updated.items);
  return upsertTripInternal(state, updated);
}

export function useTripStore() {
  const [state, setState] = useState<StorageState>(emptyState);

  const refresh = useCallback(() => {
    const loaded = loadState();
    setState(loaded);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const commit = useCallback(
    (next: StorageState) => {
      setState(next);
      saveState(next);
    },
    [setState]
  );

  const upsertTrip = useCallback(
    (list: GeneratedList, notes?: string) => {
      const id = createId("trip");
      const trip: StoredTrip = {
        ...list,
        id,
        notes
      };
      trip.stats = computeStats(trip.items);
      trip.updatedAt = new Date().toISOString();
      const next = upsertTripInternal(state, trip);
      commit(next);
    },
    [commit, state]
  );

  const importTrip = useCallback(
    (trip: StoredTrip) => {
      const normalized = normalizeTrip(trip);
      const next = upsertTripInternal(state, normalized);
      commit(next);
    },
    [commit, state]
  );

  const updateActiveTrip = useCallback(
    (updater: (trip: StoredTrip) => StoredTrip) => {
      const next = updateTripInternal(state, updater);
      commit(next);
    },
    [commit, state]
  );

  const setActiveTrip = useCallback(
    (id: string) => {
      if (state.activeTripId === id) return;
      const next = { ...state, activeTripId: id };
      commit(next);
    },
    [commit, state]
  );

  const renameTrip = useCallback(
    (id: string, title: string) => {
      const next = {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === id
            ? {
                ...trip,
                profile: { ...trip.profile, title },
                updatedAt: new Date().toISOString()
              }
            : trip
        )
      };
      commit(next);
    },
    [commit, state]
  );

  const duplicateTrip = useCallback(
    (id: string) => {
      const existing = state.trips.find((trip) => trip.id === id);
      if (!existing) return;
      const copy: StoredTrip = {
        ...existing,
        id: createId("trip"),
        profile: { ...existing.profile, title: `${existing.profile.title} copy` },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      copy.items = existing.items.map((item) => ({ ...item, packed: false }));
      const next = upsertTripInternal(state, copy);
      commit(next);
    },
    [commit, state]
  );

  const removeTrip = useCallback(
    (id: string) => {
      const nextTrips = state.trips.filter((trip) => trip.id !== id);
      const next: StorageState = {
        ...state,
        trips: nextTrips,
        activeTripId: state.activeTripId === id ? nextTrips[0]?.id : state.activeTripId
      };
      commit(next);
    },
    [commit, state]
  );

  const trips = useMemo(() => state.trips, [state.trips]);
  const activeTrip = useMemo(
    () => state.trips.find((trip) => trip.id === state.activeTripId),
    [state.activeTripId, state.trips]
  );

  return {
    trips,
    activeTrip,
    upsertTrip,
    importTrip,
    updateActiveTrip,
    setActiveTrip,
    renameTrip,
    duplicateTrip,
    removeTrip,
    refresh
  } as const;
}
