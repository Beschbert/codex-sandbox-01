"use client";

import { useMemo, useState } from "react";
import type { Category, Item, StoredTrip } from "@/lib/types";
import { CategoryCard } from "./CategoryCard";
import { ItemEditDialog } from "./ItemEditDialog";
import { createId } from "@/lib/util";
import { useToast } from "@/components/Common/Toast";

interface ChecklistViewProps {
  trip: StoredTrip;
  onUpdate: (updater: (trip: StoredTrip) => StoredTrip) => void;
  visibleItemIds?: Set<string>;
}

interface EditingState {
  item: Item;
  category: Category;
  isNew: boolean;
}

export function ChecklistView({ trip, onUpdate, visibleItemIds }: ChecklistViewProps) {
  const groups = useMemo(() => {
    const map = new Map<Category, Item[]>();
    trip.items.forEach((item) => {
      if (visibleItemIds && !visibleItemIds.has(item.id)) return;
      const existing = map.get(item.category) ?? [];
      existing.push(item);
      map.set(item.category, existing);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [trip.items, visibleItemIds]);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const { push } = useToast();

  const updateItems = (transformer: (items: Item[]) => Item[]) => {
    onUpdate((current) => ({ ...current, items: transformer(current.items) }));
  };

  const handleSave = (updated: Item) => {
    updateItems((items) =>
      items.map((item) => (item.id === updated.id ? { ...item, ...updated } : item))
    );
    setEditing(null);
    push({ title: "Item updated", variant: "success" });
  };

  const handleAdd = (category: Category, base?: Item) => {
    const blank: Item =
      base ??
      ({
        id: createId("item"),
        label: "New item",
        category,
        qty: 1,
        packed: false
      } as Item);
    setEditing({ item: blank, category, isNew: true });
  };

  const handleCreate = (item: Item) => {
    updateItems((items) => [{ ...item, id: item.id || createId("item"), category: editing?.category ?? item.category }, ...items]);
    setEditing(null);
    push({ title: "Item added", variant: "success" });
  };

  return (
    <div className="space-y-4">
      {groups.map(([category, items]) => (
        <CategoryCard
          key={category}
          category={category}
          items={items}
          onTogglePacked={(id, packed) =>
            updateItems((list) => list.map((item) => (item.id === id ? { ...item, packed } : item)))
          }
          onQuantityChange={(id, qty) =>
            updateItems((list) => list.map((item) => (item.id === id ? { ...item, qty } : item)))
          }
          onEdit={(item) => setEditing({ item, category, isNew: false })}
          onRemove={(id) => {
            updateItems((list) => list.filter((item) => item.id !== id));
            push({ title: "Item removed", variant: "info" });
          }}
          onAdd={() => handleAdd(category)}
          onMarkAllPacked={() =>
            updateItems((list) =>
              list.map((item) => (item.category === category ? { ...item, packed: true } : item))
            )
          }
          onSmartUncheck={() =>
            updateItems((list) =>
              list.map((item) =>
                item.category === category && !item.must ? { ...item, packed: false } : item
              )
            )
          }
        />
      ))}
      <ItemEditDialog
        open={Boolean(editing)}
        item={editing?.item ?? ({ id: "", label: "", category: "Misc" } as Item)}
        onClose={() => setEditing(null)}
        onSave={(item) => {
          if (editing?.isNew) {
            handleCreate({ ...item, category: editing.category, packed: false });
          } else {
            handleSave(item);
          }
        }}
      />
    </div>
  );
}
