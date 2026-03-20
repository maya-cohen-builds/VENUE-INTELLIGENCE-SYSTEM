const decisions = [
  {
    decision: "Market: Singapore + Kuala Lumpur",
    rationale: "Brian Lowe is on the ground in KL with existing stadium board relationships. Singapore is the SEA anchor for international sports events (F1, MotoGP, WSL). Stripe operates strongly here. English-language operations reduce localization friction. Most competing teams will default to Europe. This is differentiated and evidence-based."
  },
  {
    decision: "Primary Data Source: Ticketmaster Discovery API",
    rationale: "Songkick was the originally planned source given its existing Tixr integration. Songkick closed new API key applications during platform changes. Ticketmaster Discovery API replaced it: instant key, 5000 free calls/day, live Singapore venue data available immediately. A venue in Ticketmaster's database that is NOT actively selling through them is either a competitor client or independent. That reverse-exclusivity signal is uniquely valuable."
  },
  {
    decision: "Sports-first venue taxonomy",
    rationale: "Live Nation exclusivity concentrates in music venues above 5000 capacity. Motorsports circuits, aquatic centers, and action sports venues sit outside that exclusivity architecture. Tixr's product differentiators (multi-day formats, hospitality bundles, demand forecasting) are most relevant to sports properties. Confirmed by Alex Meyer's product hire (2012 Olympian, Python data scientist) and the Snow League exclusive partnership."
  },
  {
    decision: "Manual curation for Tier 1 venues",
    rationale: "Public APIs have thin coverage for motorsports circuits and national sports stadiums. Manual verification via venue website takes 5–10 minutes per venue and produces highest-confidence data. Applied to all Tier 1 venues. Documented for reproducibility."
  },
  {
    decision: "Weighted rubric over ML model",
    rationale: "Exclusivity contracts are private. No model can be trained on ground truth data at this stage. A transparent weighted rubric is more defensible in live review: every point can be explained. The rubric is designed to be upgraded with Tixr internal churn data over time."
  },
  {
    decision: "Eventbrite as the strongest exclusivity signal",
    rationale: "A venue using Eventbrite for a 3000-capacity sports event is definitionally underserved. Eventbrite is a self-serve platform not designed for that scale, complex multi-day formats, or non-admission commerce. Observable, refreshable, and directly actionable without authentication."
  },
  {
    decision: "Excluded: Social media API scraping",
    rationale: "Twitter/X API is now paid. Facebook/Instagram graph API requires app approval with strict rate limits. Calling this \"social media monitoring\" without acknowledging API restrictions would fail the credibility test in live review. Included as a 30/60/90 build item instead."
  },
  {
    decision: "Excluded: Contract expiry prediction",
    rationale: "Exclusivity contracts are private. No public data enables contract expiry prediction. The model instead predicts behavioral signals of dissatisfaction: platform switching, multi-platform usage, event cadence drops. This is a more defensible and observable proxy. Predictive modeling becomes viable once Tixr has proprietary data on competitor churn events."
  },
];

export function DecisionLog() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Decision Log</h2>
        <p className="text-sm text-muted-foreground">Analytical decisions and their rationale for this intelligence build.</p>
      </div>

      <div className="border border-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-table-header border-b border-table-border">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-[280px]">Decision</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Rationale</th>
            </tr>
          </thead>
          <tbody>
            {decisions.map((d, i) => (
              <tr key={i} className="border-b border-table-border last:border-b-0 hover:bg-table-row-hover transition-colors">
                <td className="px-4 py-3 font-medium text-foreground align-top">{d.decision}</td>
                <td className="px-4 py-3 text-muted-foreground leading-relaxed">{d.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
