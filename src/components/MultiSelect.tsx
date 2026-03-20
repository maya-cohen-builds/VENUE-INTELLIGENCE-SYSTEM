import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };

  return (
    <div ref={ref} className="relative">
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-xs border border-border rounded bg-background text-foreground hover:bg-secondary transition-colors"
      >
        <span className="truncate">
          {selected.length === 0 ? "All" : `${selected.length} selected`}
        </span>
        <ChevronDown className="w-3 h-3 ml-1 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-background border border-border rounded shadow-lg py-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={cn(
                "w-full text-left px-3 py-1.5 text-xs hover:bg-secondary transition-colors",
                selected.includes(opt) ? "bg-secondary font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {opt}
            </button>
          ))}
          {selected.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="w-full text-left px-3 py-1.5 text-xs text-primary hover:bg-secondary transition-colors border-t border-border mt-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
