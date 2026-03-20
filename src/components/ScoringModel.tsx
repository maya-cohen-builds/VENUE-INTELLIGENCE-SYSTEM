export function ScoringModel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Exclusivity Scoring Methodology</h2>
        <p className="text-sm text-muted-foreground">Weighted rubric for identifying winnable venue targets. Total: 100 points normalized to 0–10 scale.</p>
      </div>

      <div className="border border-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-table-header border-b border-table-border">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-[200px]">Signal</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground w-[100px]">Weight</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Decision Tree</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-table-border">
              <td className="px-4 py-3 font-medium text-foreground align-top">Ticketing Vendor Signal</td>
              <td className="px-4 py-3 text-center text-foreground align-top">40 pts</td>
              <td className="px-4 py-3 text-muted-foreground">
                <ul className="space-y-1">
                  <li><span className="text-foreground font-medium">No vendor</span> = 8–10 pts</li>
                  <li><span className="text-foreground font-medium">Eventbrite</span> = 8–10 pts (definitionally underserved)</li>
                  <li><span className="text-foreground font-medium">Local SEA platform</span> = 7–8 pts</li>
                  <li><span className="text-foreground font-medium">AXS</span> = 5–6 pts (monitor)</li>
                  <li><span className="text-foreground font-medium">Ticketmaster</span> = 1–3 pts (likely locked)</li>
                  <li><span className="text-foreground font-medium">Multiple platforms</span> = 4–6 pts</li>
                </ul>
              </td>
            </tr>
            <tr className="border-b border-table-border">
              <td className="px-4 py-3 font-medium text-foreground align-top">Operator Type</td>
              <td className="px-4 py-3 text-center text-foreground align-top">25 pts</td>
              <td className="px-4 py-3 text-muted-foreground">
                <ul className="space-y-1">
                  <li><span className="text-foreground font-medium">Government / quasi-government</span> = 8–10 pts</li>
                  <li><span className="text-foreground font-medium">Independent private operator</span> = 5–7 pts</li>
                  <li><span className="text-foreground font-medium">Live Nation-managed</span> = 0–2 pts</li>
                </ul>
              </td>
            </tr>
            <tr className="border-b border-table-border">
              <td className="px-4 py-3 font-medium text-foreground align-top">Venue Category</td>
              <td className="px-4 py-3 text-center text-foreground align-top">20 pts</td>
              <td className="px-4 py-3 text-muted-foreground">
                <ul className="space-y-1">
                  <li><span className="text-foreground font-medium">Motorsports Circuit</span> = 9–10 pts</li>
                  <li><span className="text-foreground font-medium">Aquatic or Action Sports</span> = 8–9 pts</li>
                  <li><span className="text-foreground font-medium">Multi-Purpose Sports Stadium</span> = 6–8 pts</li>
                  <li><span className="text-foreground font-medium">Mixed-Use Indoor Arena</span> = 4–6 pts</li>
                  <li><span className="text-foreground font-medium">Music / Entertainment primary</span> = 1–3 pts</li>
                </ul>
              </td>
            </tr>
            <tr className="border-b border-table-border">
              <td className="px-4 py-3 font-medium text-foreground align-top">Activity Level</td>
              <td className="px-4 py-3 text-center text-foreground align-top">15 pts</td>
              <td className="px-4 py-3 text-muted-foreground">
                <ul className="space-y-1">
                  <li><span className="text-foreground font-medium">High cadence + non-Ticketmaster</span> = 7–10 pts</li>
                  <li><span className="text-foreground font-medium">Medium cadence</span> = 4–6 pts</li>
                  <li><span className="text-foreground font-medium">Low cadence</span> = 1–3 pts</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Calibration note */}
      <div className="border border-border rounded p-4 bg-secondary/30">
        <h3 className="text-sm font-semibold text-foreground mb-2">Calibration Anchors</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Scores are validated against five anchor venues. Singapore Indoor Stadium (government operator, no LN deal) should score 7–9. Sepang Circuit (independent motorsports) should score 8–10. Axiata Arena (mixed-use, multi-platform) should score 5–6. Marina Bay Sands Theatre (entertainment primary) should score 2–4. A confirmed Tixr client should score 8–10.
        </p>
      </div>

      {/* Confidence key */}
      <div className="border border-border rounded p-4 bg-secondary/30">
        <h3 className="text-sm font-semibold text-foreground mb-2">Confidence Level Key</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><span className="text-foreground font-medium">High</span> — All four signals manually verified.</li>
          <li><span className="text-foreground font-medium">Medium</span> — Two or more signals from API with one manual check.</li>
          <li><span className="text-foreground font-medium">Low</span> — API-only, no manual verification.</li>
        </ul>
      </div>
    </div>
  );
}
