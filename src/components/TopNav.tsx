import { cn } from "@/lib/utils";

type View = "venues" | "scoring" | "decisions" | "about";

interface TopNavProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const navItems: { key: View; label: string }[] = [
  { key: "venues", label: "Venue Table" },
  { key: "scoring", label: "Scoring Model" },
  { key: "decisions", label: "Decision Log" },
  { key: "about", label: "About" },
];

export function TopNav({ activeView, onViewChange }: TopNavProps) {
  return (
    <header className="bg-nav text-nav-foreground">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center h-14 gap-8">
        <span className="text-lg font-bold tracking-tight mr-4">
          <span className="text-primary">TIXR</span>
          <span className="text-nav-foreground/60 ml-2 text-sm font-normal tracking-wide">Venue Intelligence</span>
        </span>
        <nav className="flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onViewChange(item.key)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded transition-colors",
                activeView === item.key
                  ? "bg-primary text-primary-foreground"
                  : "text-nav-foreground/70 hover:text-nav-foreground hover:bg-nav-foreground/10"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
