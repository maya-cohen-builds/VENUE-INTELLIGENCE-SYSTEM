import { useState, useMemo, useCallback } from "react";
import { venues as initialVenues, type Venue } from "@/data/venues";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MultiSelect } from "@/components/MultiSelect";
import { Loader2 } from "lucide-react";

function fuzzyMatch(a: string, b: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const na = normalize(a);
  const nb = normalize(b);
  return na.includes(nb) || nb.includes(na);
}

const VENUE_TYPES = ["Motorsports Circuit", "Multi-Purpose Stadium", "Aquatic Center", "Indoor Arena", "Action Sports Venue", "Entertainment Complex"];
const ACTIVITY_LEVELS = ["High", "Medium", "Low"];
const VENDORS = ["Ticketmaster", "AXS", "Eventbrite", "Local Platform", "None", "Multiple"];

export function VenueTable() {
  const [venueData, setVenueData] = useState<Venue[]>(() => [...initialVenues]);
  const [exclusivityRange, setExclusivityRange] = useState<[number, number]>([0, 10]);
  const [capacityRange, setCapacityRange] = useState<[number, number]>([0, 150000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [sportsOverlap, setSportsOverlap] = useState<"all" | "yes" | "no">("all");
  const [priorityOnly, setPriorityOnly] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch(
        "https://app.ticketmaster.com/discovery/v2/venues.json?countryCode=SG&apikey=2JoSRJ0vdMKPHEaG9UdANtLQpQpj5jd0"
      );
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const apiVenues: { name: string; upcomingTotal: number }[] = (
        data?._embedded?.venues ?? []
      ).map((v: any) => ({
        name: v.name ?? "",
        upcomingTotal: v.upcomingEvents?._total ?? 0,
      }));

      const today = new Date().toISOString().slice(0, 10);
      let updated = 0;

      setVenueData((prev) =>
        prev.map((venue) => {
          const match = apiVenues.find((av) => fuzzyMatch(venue.name, av.name));
          if (!match) return venue;
          updated++;
          const activity: Venue["activityLevel"] =
            match.upcomingTotal >= 10 ? "High" : match.upcomingTotal >= 3 ? "Medium" : "Low";
          return { ...venue, lastEnrichedDate: today, activityLevel: activity };
        })
      );

      toast.success(
        `Live enrichment complete. ${updated} venues updated via Ticketmaster Discovery API.`
      );
    } catch {
      toast.error("Enrichment fetch failed. Displaying last cached data.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handlePriorityToggle = useCallback(() => {
    setPriorityOnly((p) => !p);
  }, []);

  const filtered = useMemo(() => {
    return venueData.filter((v) => {
      if (priorityOnly) {
        if (v.exclusivityScore < 7 || v.premiumFitScore < 4) return false;
      }
      if (v.exclusivityScore < exclusivityRange[0] || v.exclusivityScore > exclusivityRange[1]) return false;
      if (v.capacity < capacityRange[0] || v.capacity > capacityRange[1]) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(v.venueType)) return false;
      if (selectedActivities.length > 0 && !selectedActivities.includes(v.activityLevel)) return false;
      if (selectedVendors.length > 0 && !selectedVendors.includes(v.currentVendor)) return false;
      if (sportsOverlap === "yes" && !v.sportsCircuitOverlap) return false;
      if (sportsOverlap === "no" && v.sportsCircuitOverlap) return false;
      return true;
    });
  }, [venueData, exclusivityRange, capacityRange, selectedTypes, selectedActivities, selectedVendors, sportsOverlap, priorityOnly]);

  return (
    <div className="space-y-4">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">Venue Database</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} of {venueData.length} venues</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={priorityOnly ? "default" : "outline"}
            size="sm"
            onClick={handlePriorityToggle}
          >
            Priority Targets Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Refreshing…</>
            ) : "Refresh Enrichment"}
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-secondary/50 border border-border rounded p-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-end">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Exclusivity Score ({exclusivityRange[0]}–{exclusivityRange[1]})</label>
          <Slider
            min={0} max={10} step={1}
            value={exclusivityRange}
            onValueChange={(v) => setExclusivityRange(v as [number, number])}
            className="mt-2"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Capacity ({capacityRange[0].toLocaleString()}–{capacityRange[1].toLocaleString()})</label>
          <Slider
            min={0} max={150000} step={1000}
            value={capacityRange}
            onValueChange={(v) => setCapacityRange(v as [number, number])}
            className="mt-2"
          />
        </div>
        <MultiSelect label="Venue Type" options={VENUE_TYPES} selected={selectedTypes} onChange={setSelectedTypes} />
        <MultiSelect label="Activity Level" options={ACTIVITY_LEVELS} selected={selectedActivities} onChange={setSelectedActivities} />
        <MultiSelect label="Ticketing Vendor" options={VENDORS} selected={selectedVendors} onChange={setSelectedVendors} />
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Sports Circuit Overlap</label>
          <div className="flex items-center gap-2 mt-1">
            {(["all", "yes", "no"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setSportsOverlap(val)}
                className={cn(
                  "px-3 py-1 text-xs rounded border transition-colors",
                  sportsOverlap === val
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-border hover:bg-secondary"
                )}
              >
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-table-header border-b border-table-border">
              <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Venue Name</th>
              <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">City</th>
              <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Type</th>
              <th className="text-right px-3 py-2.5 font-medium text-muted-foreground">Capacity</th>
              <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Ticketing Vendor</th>
              <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Exclusivity</th>
              <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Activity</th>
              <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Premium-Fit</th>
              <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Sports Circuit</th>
              <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Confidence</th>
              <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Last Enriched</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <VenueRow key={i} venue={v} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center py-8 text-muted-foreground">No venues match current filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VenueRow({ venue: v }: { venue: Venue }) {
  const isTarget = v.exclusivityScore >= 7;
  return (
    <tr className={cn(
      "border-b border-table-border hover:bg-table-row-hover transition-colors",
      isTarget && "border-l-[3px] border-l-primary"
    )}>
      <td className="px-3 py-2.5 font-medium text-foreground max-w-[260px]">{v.name}</td>
      <td className="px-3 py-2.5 text-muted-foreground">{v.city}</td>
      <td className="px-3 py-2.5 text-muted-foreground">{v.venueType}</td>
      <td className="px-3 py-2.5 text-right text-foreground tabular-nums">{v.capacity.toLocaleString()}</td>
      <td className="px-3 py-2.5">
        <span className="text-muted-foreground">{v.currentVendor}</span>
        {v.currentVendor === "Eventbrite" && (
          <Badge variant="outline" className="ml-2 border-tixr-gold text-tixr-gold text-[10px] px-1.5 py-0">Underserved</Badge>
        )}
      </td>
      <td className="px-3 py-2.5 text-center">
        <span className={cn(
          "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
          v.exclusivityScore >= 8 ? "bg-primary text-primary-foreground" :
          v.exclusivityScore >= 6 ? "bg-primary/20 text-primary" :
          "bg-secondary text-muted-foreground"
        )}>{v.exclusivityScore}</span>
      </td>
      <td className="px-3 py-2.5 text-center">
        <span className={cn(
          "text-xs font-medium",
          v.activityLevel === "High" ? "text-foreground" :
          v.activityLevel === "Medium" ? "text-muted-foreground" : "text-muted-foreground/60"
        )}>{v.activityLevel}</span>
      </td>
      <td className="px-3 py-2.5 text-center font-medium tabular-nums">{v.premiumFitScore}</td>
      <td className="px-3 py-2.5 text-center">{v.sportsCircuitOverlap ? "Yes" : "—"}</td>
      <td className="px-3 py-2.5 text-center">
        <span className={cn(
          "text-xs",
          v.confidenceLevel === "High" ? "text-foreground font-medium" :
          v.confidenceLevel === "Medium" ? "text-muted-foreground" : "text-muted-foreground/60"
        )}>{v.confidenceLevel}</span>
      </td>
      <td className="px-3 py-2.5 text-muted-foreground tabular-nums">{v.lastEnrichedDate}</td>
    </tr>
  );
}
