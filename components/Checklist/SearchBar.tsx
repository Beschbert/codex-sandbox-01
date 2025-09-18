"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onlyUnpacked: boolean;
  onOnlyUnpackedChange: (value: boolean) => void;
}

export function SearchBar({ search, onSearchChange, onlyUnpacked, onOnlyUnpackedChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-md border bg-card p-4 md:flex-row md:items-center md:justify-between">
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search items..."
        className="md:max-w-sm"
      />
      <label className="flex items-center gap-2 text-sm">
        <Switch checked={onlyUnpacked} onCheckedChange={(value) => onOnlyUnpackedChange(Boolean(value))} />
        <Label className="text-sm font-medium">Only show unpacked</Label>
      </label>
    </div>
  );
}
