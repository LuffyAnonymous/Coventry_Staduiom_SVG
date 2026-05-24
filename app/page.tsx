"use client";

import StadiumSection from "../components/StadiumSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-6">
      <StadiumSection
        venue="Coventry City Stadium"
        selectedArea=""
        onAreaClick={(area) => console.log(area)}
        hoverTicketSection=""
        availableListing={[]}
      />
    </main>
  );
}
