"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { Item } from "@/lib/types";
import { Minus, Plus, Pencil, Trash } from "lucide-react";

interface ItemRowProps {
  item: Item;
  onTogglePacked: (packed: boolean) => void;
  onQuantityChange: (qty: number) => void;
  onEdit: () => void;
  onRemove: () => void;
}

export function ItemRow({ item, onTogglePacked, onQuantityChange, onEdit, onRemove }: ItemRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-transparent px-2 py-2 hover:border-border">
      <Checkbox checked={item.packed ?? false} onCheckedChange={(value) => onTogglePacked(Boolean(value))} />
      <div className="flex flex-col">
        <span className="font-medium leading-tight">{item.label}</span>
        <span className="text-xs text-muted-foreground">
          {item.notes}
          {item.weightGrams ? ` · ${item.weightGrams}g` : ""}
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {item.must ? <Badge variant="secondary">Must</Badge> : null}
        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          <Button variant="ghost" size="icon" onClick={() => onQuantityChange(Math.max(0, (item.qty ?? 0) - 1))}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-6 text-center text-sm">{item.qty ?? 1}</span>
          <Button variant="ghost" size="icon" onClick={() => onQuantityChange((item.qty ?? 0) + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
