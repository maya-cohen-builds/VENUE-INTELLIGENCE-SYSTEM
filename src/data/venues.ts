export interface Venue {
  name: string;
  city: string;
  venueType: string;
  capacity: number;
  currentVendor: string;
  exclusivityScore: number;
  activityLevel: "High" | "Medium" | "Low";
  premiumFitScore: number;
  sportsCircuitOverlap: boolean;
  confidenceLevel: "High" | "Medium" | "Low";
  lastEnrichedDate: string;
}

export const venues: Venue[] = [
  { name: "Singapore Sports Hub (National Stadium)", city: "Singapore", venueType: "Multi-Purpose Stadium", capacity: 55000, currentVendor: "Ticketmaster", exclusivityScore: 6, activityLevel: "High", premiumFitScore: 4, sportsCircuitOverlap: true, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
  { name: "Sepang International Circuit", city: "Kuala Lumpur", venueType: "Motorsports Circuit", capacity: 130000, currentVendor: "None", exclusivityScore: 9, activityLevel: "High", premiumFitScore: 5, sportsCircuitOverlap: true, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
  { name: "Singapore Indoor Stadium", city: "Singapore", venueType: "Indoor Arena", capacity: 12000, currentVendor: "None", exclusivityScore: 8, activityLevel: "Medium", premiumFitScore: 4, sportsCircuitOverlap: false, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
  { name: "Axiata Arena", city: "Kuala Lumpur", venueType: "Indoor Arena", capacity: 16000, currentVendor: "Multiple", exclusivityScore: 5, activityLevel: "High", premiumFitScore: 3, sportsCircuitOverlap: false, confidenceLevel: "Medium", lastEnrichedDate: "2026-03-01" },
  { name: "OCBC Aquatic Centre", city: "Singapore", venueType: "Aquatic Center", capacity: 6000, currentVendor: "Eventbrite", exclusivityScore: 9, activityLevel: "Medium", premiumFitScore: 3, sportsCircuitOverlap: true, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
  { name: "Stadium Merdeka", city: "Kuala Lumpur", venueType: "Multi-Purpose Stadium", capacity: 30000, currentVendor: "Local Platform", exclusivityScore: 7, activityLevel: "Low", premiumFitScore: 3, sportsCircuitOverlap: false, confidenceLevel: "Medium", lastEnrichedDate: "2026-03-01" },
  { name: "Jurong East Sports Centre", city: "Singapore", venueType: "Multi-Purpose Stadium", capacity: 3000, currentVendor: "None", exclusivityScore: 8, activityLevel: "Low", premiumFitScore: 2, sportsCircuitOverlap: false, confidenceLevel: "Medium", lastEnrichedDate: "2026-03-01" },
  { name: "Stadium Bukit Jalil", city: "Kuala Lumpur", venueType: "Multi-Purpose Stadium", capacity: 87000, currentVendor: "Ticketmaster", exclusivityScore: 4, activityLevel: "Medium", premiumFitScore: 3, sportsCircuitOverlap: false, confidenceLevel: "Medium", lastEnrichedDate: "2026-03-01" },
  { name: "Marina Bay Street Circuit (F1 Pit Zone)", city: "Singapore", venueType: "Motorsports Circuit", capacity: 25000, currentVendor: "None", exclusivityScore: 9, activityLevel: "High", premiumFitScore: 5, sportsCircuitOverlap: true, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
  { name: "KL Convention Centre Arena", city: "Kuala Lumpur", venueType: "Indoor Arena", capacity: 4500, currentVendor: "Eventbrite", exclusivityScore: 8, activityLevel: "Medium", premiumFitScore: 3, sportsCircuitOverlap: false, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
  { name: "Suntec City Convention (Event Hall)", city: "Singapore", venueType: "Entertainment Complex", capacity: 5500, currentVendor: "Local Platform", exclusivityScore: 6, activityLevel: "Medium", premiumFitScore: 2, sportsCircuitOverlap: false, confidenceLevel: "Low", lastEnrichedDate: "2026-03-01" },
  { name: "Putra Indoor Stadium", city: "Kuala Lumpur", venueType: "Indoor Arena", capacity: 14000, currentVendor: "None", exclusivityScore: 7, activityLevel: "Low", premiumFitScore: 3, sportsCircuitOverlap: false, confidenceLevel: "Medium", lastEnrichedDate: "2026-03-01" },
  { name: "Hartamas Sports Centre", city: "Kuala Lumpur", venueType: "Action Sports Venue", capacity: 2000, currentVendor: "Eventbrite", exclusivityScore: 9, activityLevel: "Medium", premiumFitScore: 4, sportsCircuitOverlap: false, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
  { name: "Palawan Beach (Sentosa Events Zone)", city: "Singapore", venueType: "Entertainment Complex", capacity: 8000, currentVendor: "Local Platform", exclusivityScore: 7, activityLevel: "High", premiumFitScore: 4, sportsCircuitOverlap: true, confidenceLevel: "Medium", lastEnrichedDate: "2026-03-01" },
  { name: "Pavilion Bukit Jalil (Event Space)", city: "Kuala Lumpur", venueType: "Entertainment Complex", capacity: 6000, currentVendor: "Eventbrite", exclusivityScore: 8, activityLevel: "Medium", premiumFitScore: 3, sportsCircuitOverlap: false, confidenceLevel: "Medium", lastEnrichedDate: "2026-03-01" },
  { name: "Fort Canning Park (Events Lawn)", city: "Singapore", venueType: "Entertainment Complex", capacity: 5000, currentVendor: "AXS", exclusivityScore: 3, activityLevel: "High", premiumFitScore: 2, sportsCircuitOverlap: false, confidenceLevel: "Low", lastEnrichedDate: "2026-03-01" },
  { name: "National Aquatics Centre (SPEX House)", city: "Singapore", venueType: "Aquatic Center", capacity: 3000, currentVendor: "None", exclusivityScore: 8, activityLevel: "Low", premiumFitScore: 3, sportsCircuitOverlap: true, confidenceLevel: "Medium", lastEnrichedDate: "2026-03-01" },
  { name: "Surf Park Malaysia (Sunway Lagoon)", city: "Kuala Lumpur", venueType: "Action Sports Venue", capacity: 4000, currentVendor: "Eventbrite", exclusivityScore: 9, activityLevel: "High", premiumFitScore: 5, sportsCircuitOverlap: false, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
  { name: "Resorts World Sentosa (Festive Arena)", city: "Singapore", venueType: "Entertainment Complex", capacity: 7500, currentVendor: "Ticketmaster", exclusivityScore: 3, activityLevel: "High", premiumFitScore: 3, sportsCircuitOverlap: false, confidenceLevel: "Low", lastEnrichedDate: "2026-03-01" },
  { name: "Malaysian Motorcycle Grand Prix Venue (Sepang Circuit - MotoGP Zone)", city: "Kuala Lumpur", venueType: "Motorsports Circuit", capacity: 80000, currentVendor: "None", exclusivityScore: 9, activityLevel: "Medium", premiumFitScore: 5, sportsCircuitOverlap: true, confidenceLevel: "High", lastEnrichedDate: "2026-03-01" },
];
