"use client";

import { categories } from "@/components/Checklist/categories";
import { Button } from "@/components/ui/button";

interface CategoryFiltersProps {
  selected: string[];
  onChange: (next: string[]) => void;
}

export function CategoryFilters({ selected, onChange }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const active = selected.includes(category);
        return (
          <Button
            key={category}
            size="sm"
            variant={active ? "default" : "outline"}
            onClick={() => {
              onChange(
                active ? selected.filter((item) => item !== category) : [...selected, category]
              );
            }}
          >
            {category}
          </Button>
        );
      })}
      {selected.length ? (
        <Button size="sm" variant="ghost" onClick={() => onChange([])}>
          Clear
        </Button>
      ) : null}
    </div>
  );
}
