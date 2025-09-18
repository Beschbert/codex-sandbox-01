"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Item } from "@/lib/types";

interface ItemEditDialogProps {
  open: boolean;
  item: Item;
  onClose: () => void;
  onSave: (item: Item) => void;
}

export function ItemEditDialog({ open, item, onClose, onSave }: ItemEditDialogProps) {
  const [draft, setDraft] = useState<Item>(item);

  useEffect(() => {
    setDraft(item);
  }, [item]);

  return (
    <Dialog open={open} onOpenChange={(value) => (value ? null : onClose())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="item-label">Label</Label>
            <Input
              id="item-label"
              value={draft.label}
              onChange={(event) => setDraft({ ...draft, label: event.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="item-qty">Quantity</Label>
              <Input
                id="item-qty"
                type="number"
                min={0}
                value={draft.qty ?? 1}
                onChange={(event) => setDraft({ ...draft, qty: Number(event.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-weight">Weight (g)</Label>
              <Input
                id="item-weight"
                type="number"
                min={0}
                value={draft.weightGrams ?? ""}
                onChange={(event) =>
                  setDraft({ ...draft, weightGrams: event.target.value ? Number(event.target.value) : undefined })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-notes">Notes</Label>
            <Textarea
              id="item-notes"
              rows={3}
              value={draft.notes ?? ""}
              onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={draft.must ?? false} onCheckedChange={(value) => setDraft({ ...draft, must: Boolean(value) })} />
            Mark as must-bring
          </label>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(draft)}>Save item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
