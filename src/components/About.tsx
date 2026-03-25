import { Target, Zap, SlidersHorizontal, Brain, FileText, Database } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Venue Discovery & Curation",
    impact: "Gives reps a pre-qualified pipeline instead of cold prospecting from scratch.",
    how: "20 venues across Singapore and Kuala Lumpur, manually curated and verified. Markets chosen strategically — Tixr has existing relationships in KL, Singapore anchors global sports (F1, MotoGP, World Surf League), and Stripe operates cleanly in both.",
  },
  {
    icon: Target,
    title: "Priority Targets Filter",
    impact: "One-click answer to \"who do I call first?\" — filters to the highest-confidence, highest-value accounts.",
    how: "Filters venues where exclusivity score ≥ 7 and premium-fit score ≥ 4. These are accounts most likely independent of incumbent deals with the highest commercial upside for Tixr's beyond-ticketing features.",
  },
  {
    icon: Zap,
    title: "Live API Enrichment",
    impact: "Turns a static list into a living intelligence system. Uses Ticketmaster's own data to find venues they aren't fully serving — a reverse-exclusivity signal.",
    how: "Real-time call to the Ticketmaster Discovery API (countryCode=SG). Fuzzy-matches API results against the venue table and updates Activity Level and Last Enriched date on matched records. A venue in Ticketmaster's database but not actively selling through them signals an independent or underserved account.",
  },
  {
    icon: SlidersHorizontal,
    title: "Rep-Oriented Filters",
    impact: "Supports different outreach strategies without requiring data analysis skills. Every filter combination produces a different call list.",
    how: "Filter by exclusivity score range, capacity, venue type, activity level, ticketing vendor, and sports circuit overlap. A motorsports-focused rep filters to circuits; a rep doing outreach this week filters out Ticketmaster entirely and works unpartnered accounts.",
  },
  {
    icon: Brain,
    title: "Transparent Scoring Model",
    impact: "Defensible in any room — not a black box. Every score can be explained and challenged.",
    how: "Weighted rubric: ticketing vendor signal (40 pts), operator type (25 pts), venue category (20 pts), activity level (15 pts). Built as a rubric rather than ML because exclusivity contracts are private — there's no ground truth to train on. Validated against known calibration anchors before launch.",
  },
  {
    icon: FileText,
    title: "Decision Log",
    impact: "Pre-answers every \"why didn't you do X?\" question. Documents what was excluded and why — including social media APIs, contract expiry prediction, and alternative data sources.",
    how: "Covers market selection rationale, API choices (Ticketmaster over Songkick due to key availability), and honest exclusions. Every methodological decision is documented with reasoning.",
  },
];

export function About() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">About This System</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
          The Venue Intelligence System is a live, scored, filterable target list built for a Tixr sales rep expanding into Southeast Asia. It answers one question: which venues to call first, and how to know before a competitor does.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="border border-border rounded p-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">Impact for Tixr</span>
                <p className="text-sm text-muted-foreground mt-0.5">{f.impact}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">How it works</span>
                <p className="text-xs text-muted-foreground/80 mt-0.5 leading-relaxed">{f.how}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-border rounded p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-2">What We'd Build Next</h3>
        <ul className="text-[11px] text-muted-foreground/80 space-y-1 list-disc list-inside">
          <li>Scale to 100+ venues across Singapore, KL, and Bangkok</li>
          <li>Salesforce or HubSpot integration for the sports vertical</li>
          <li>Contract expiry prediction model trained on Tixr's internal churn data</li>
        </ul>
      </div>
    </div>
  );
}
