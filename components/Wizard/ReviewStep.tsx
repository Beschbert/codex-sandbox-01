"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryCard } from "@/components/Checklist/CategoryCard";
import { ItemEditDialog } from "@/components/Checklist/ItemEditDialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories as categoryOrder } from "@/components/Checklist/categories";
import { useToast } from "@/components/Common/Toast";
import { computeStats, explain } from "@/lib/generate";
import type { Category, GeneratedList, Item } from "@/lib/types";
import { createId, formatDateRange } from "@/lib/util";
import type { WizardStepProps } from "./types";

interface EditingState {
  item: Item;
  category: Category;
  isNew: boolean;
}

export function ReviewStep({
  profile,
  preview,
  onComplete,
  notes,
  onNotesChange,
  onGoToStep
}: WizardStepProps) {
  const [items, setItems] = useState<Item[]>(() => preview.items.map((item) => ({ ...item })));
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const { push } = useToast();

  useEffect(() => {
    setItems((current) => {
      const currentMap = new Map(current.map((item) => [item.id, item]));
      const customItems = current.filter((item) => !preview.items.some((base) => base.id === item.id));
      const next = preview.items
        .filter((item) => !removedIds.includes(item.id))
        .map((item) => {
          const existing = currentMap.get(item.id);
          return {
            ...item,
            qty: existing?.qty ?? item.qty ?? item.qtyDefault ?? 1,
            notes: existing?.notes ?? item.notes,
            must: existing?.must ?? item.must,
            weightGrams: existing?.weightGrams ?? item.weightGrams,
            packed: existing?.packed ?? false
          };
        });
      return [...next, ...customItems];
    });
  }, [preview.items, removedIds]);

  const groups = useMemo(() => {
    const ordering = new Map(categoryOrder.map((category, index) => [category, index]));
    const map = new Map<Category, Item[]>();
    items.forEach((item) => {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    });
    return Array.from(map.entries())
      .map(([category, list]) => [category, [...list].sort((a, b) => a.label.localeCompare(b.label))] as const)
      .sort((a, b) => (ordering.get(a[0]) ?? 999) - (ordering.get(b[0]) ?? 999));
  }, [items]);

  const stats = useMemo(() => computeStats(items), [items]);
  const explanations = useMemo(() => explain(profile), [profile]);

  const summaryRows = useMemo(
    () => [
      {
        label: "Trip",
        value: `${profile.title || "My trip"} · ${profile.tripType}`,
        step: 0
      },
      {
        label: "Destination",
        value: [profile.destination || "TBA", profile.climate, profile.season]
          .filter(Boolean)
          .join(" · ") || "Not specified",
        step: 1
      },
      {
        label: "Dates & luggage",
        value: [formatDateRange(profile.startDate, profile.nights), profile.luggage]
          .filter(Boolean)
          .join(" · "),
        step: 2
      },
      {
        label: "Companions",
        value: [
          profile.companions.kind,
          profile.companions.kind === "Family with kids"
            ? [
                profile.companions.infants ? "infant" : null,
                profile.companions.toddlers ? "toddler" : null
              ]
                .filter(Boolean)
                .join(" & ") || undefined
            : undefined
        ]
          .filter(Boolean)
          .join(" · "),
        step: 3
      },
      {
        label: "Activities",
        value: profile.activities.length ? profile.activities.join(", ") : "No extras selected",
        step: 4
      },
      {
        label: "Accommodation",
        value: [
          profile.accommodation.kind,
          profile.accommodation.amenities?.length
            ? `${profile.accommodation.amenities.length} amenities`
            : undefined
        ]
          .filter(Boolean)
          .join(" · "),
        step: 5
      },
      {
        label: "Health & docs",
        value: [
          profile.healthDocs.meds?.length ? `${profile.healthDocs.meds.length} meds` : undefined,
          [
            profile.healthDocs.passport ? "Passport" : null,
            profile.healthDocs.idCard ? "ID" : null,
            profile.healthDocs.visa ? "Visa" : null,
            profile.healthDocs.insurance ? "Insurance" : null,
            profile.healthDocs.vaxCard ? "Vax card" : null
          ]
            .filter(Boolean)
            .join(", ") || undefined,
          profile.healthDocs.plugType ? `Plug ${profile.healthDocs.plugType}` : undefined
        ]
          .filter(Boolean)
          .join(" · "),
        step: 6
      }
    ],
    [profile]
  );

  const updateItems = (transformer: (items: Item[]) => Item[]) => {
    setItems((current) => transformer(current));
  };

  const handleQuantityChange = (id: string, qty: number) => {
    updateItems((current) => current.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const handleTogglePacked = (id: string, packed: boolean) => {
    updateItems((current) => current.map((item) => (item.id === id ? { ...item, packed } : item)));
  };

  const handleEdit = (item: Item, category: Category) => {
    setEditing({ item, category, isNew: false });
  };

  const handleRemove = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
    if (preview.items.some((item) => item.id === id)) {
      setRemovedIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    }
  };

  const handleAdd = (category: Category) => {
    const base: Item = {
      id: createId("item"),
      label: "New item",
      category,
      qty: 1,
      packed: false
    };
    setEditing({ item: base, category, isNew: true });
  };

  const handleDialogSave = (item: Item) => {
    if (!editing) return;
    if (editing.isNew) {
      setItems((current) => [{ ...item, category: editing.category, packed: false }, ...current]);
    } else {
      setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, ...item } : entry)));
    }
    setRemovedIds((ids) => ids.filter((removed) => removed !== item.id));
    setEditing(null);
  };

  const handleFinalize = () => {
    const normalized = items.map((item) => ({
      ...item,
      qty: item.qty ?? item.qtyDefault ?? 1,
      packed: item.packed ?? false
    }));
    const finalized: GeneratedList = {
      ...preview,
      profile,
      items: normalized,
      createdAt: preview.createdAt,
      updatedAt: new Date().toISOString(),
      stats: computeStats(normalized)
    };
    push({ title: "Checklist ready", description: "Saved to your trips", variant: "success" });
    onComplete(finalized);
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Review your plan</h2>
        <div className="grid gap-3 rounded-md border p-4 md:grid-cols-2">
          {summaryRows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">{row.label}</div>
                <div className="text-sm">{row.value || "Not specified"}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => onGoToStep(row.step)}>
                Edit
              </Button>
            </div>
          ))}
        </div>
        {explanations.length ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {explanations.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="grid gap-4 rounded-md border p-4 md:grid-cols-3">
        <div>
          <div className="text-sm text-muted-foreground">Total items</div>
          <div className="text-xl font-semibold">{stats.totalCount}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Must-bring</div>
          <div className="text-xl font-semibold">
            {items.filter((item) => item.must).length}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Estimated weight</div>
          <div className="text-xl font-semibold">
            {stats.estWeightGrams ? `${(stats.estWeightGrams / 1000).toFixed(1)} kg` : "—"}
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <Label htmlFor="wizard-notes">Trip notes</Label>
        <Textarea
          id="wizard-notes"
          rows={4}
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Packing quirks, meet-up details, or anything else you want to remember."
        />
      </section>

      {removedIds.length ? (
        <div className="flex items-center justify-between rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          <span>
            {removedIds.length} suggested item{removedIds.length === 1 ? "" : "s"} hidden. You can always restore them.
          </span>
          <Button variant="ghost" size="sm" onClick={() => setRemovedIds([])}>
            Restore suggestions
          </Button>
        </div>
      ) : null}

      <section className="space-y-4">
        {groups.map(([category, list]) => (
          <CategoryCard
            key={category}
            category={category}
            items={list}
            onTogglePacked={(id, packed) => handleTogglePacked(id, packed)}
            onQuantityChange={(id, qty) => handleQuantityChange(id, qty)}
            onEdit={(item) => handleEdit(item, category)}
            onRemove={(id) => handleRemove(id)}
            onAdd={() => handleAdd(category)}
            onMarkAllPacked={() =>
              updateItems((current) =>
                current.map((item) => (item.category === category ? { ...item, packed: true } : item))
              )
            }
            onSmartUncheck={() =>
              updateItems((current) =>
                current.map((item) =>
                  item.category === category && !item.must ? { ...item, packed: false } : item
                )
              )
            }
          />
        ))}
      </section>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleFinalize}>
          Save checklist
        </Button>
      </div>

      <ItemEditDialog
        open={Boolean(editing)}
        item={editing?.item ?? ({ id: "", label: "", category: "Misc" } as Item)}
        onClose={() => setEditing(null)}
        onSave={handleDialogSave}
      />
    </div>
  );
}
