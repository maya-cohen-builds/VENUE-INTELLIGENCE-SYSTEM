import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { VenueTable } from "@/components/VenueTable";
import { ScoringModel } from "@/components/ScoringModel";
import { DecisionLog } from "@/components/DecisionLog";
import { About } from "@/components/About";

type View = "venues" | "scoring" | "decisions" | "about";

const Index = () => {
  const [activeView, setActiveView] = useState<View>("venues");

  return (
    <div className="min-h-screen bg-background">
      <TopNav activeView={activeView} onViewChange={setActiveView} />
      <main className="max-w-[1440px] mx-auto px-6 py-6">
        {activeView === "venues" && <VenueTable />}
        {activeView === "scoring" && <ScoringModel />}
        {activeView === "decisions" && <DecisionLog />}
        {activeView === "about" && <About />}
      </main>
    </div>
  );
};

export default Index;
