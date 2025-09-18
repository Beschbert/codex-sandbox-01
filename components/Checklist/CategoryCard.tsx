"use client";

import { useState } from "react";
import type { Item, Category } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import { ItemRow } from "./ItemRow";

interface CategoryCardProps {
  category: Category;
  items: Item[];
  onTogglePacked: (itemId: string, packed: boolean) => void;
  onQuantityChange: (itemId: string, qty: number) => void;
  onEdit: (item: Item) => void;
  onRemove: (itemId: string) => void;
  onAdd: () => void;
  onMarkAllPacked: () => void;
  onSmartUncheck: () => void;
}

export function CategoryCard({
  category,
  items,
  onTogglePacked,
  onQuantityChange,
  onEdit,
  onRemove,
  onAdd,
  onMarkAllPacked,
  onSmartUncheck
}: CategoryCardProps) {
  const [open, setOpen] = useState(true);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <button className="flex items-center gap-2 text-left" onClick={() => setOpen((value) => !value)}>
          {open ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          <CardTitle>{category}</CardTitle>
        </button>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={onAdd}>
            Add item
          </Button>
          <Button size="sm" variant="ghost" onClick={onMarkAllPacked}>
            Mark packed
          </Button>
          <Button size="sm" variant="ghost" onClick={onSmartUncheck}>
            <Sparkles className="mr-1 h-4 w-4" /> Smart reset
          </Button>
        </div>
      </CardHeader>
      {open ? (
        <CardContent className="space-y-2">
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onTogglePacked={(packed) => onTogglePacked(item.id, packed)}
              onQuantityChange={(qty) => onQuantityChange(item.id, qty)}
              onEdit={() => onEdit(item)}
              onRemove={() => onRemove(item.id)}
            />
          ))}
        </CardContent>
      ) : null}
    </Card>
  );
}
