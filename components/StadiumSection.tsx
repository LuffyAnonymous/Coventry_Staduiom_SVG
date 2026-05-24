"use client";

import React, { useState } from "react";
import StadiumMap2D from "./StadiumMap2D";

interface StadiumSectionProps {
  venue: string;
  selectedArea: string;
  onAreaClick: (area: string | null) => void;
  hoverTicketSection: string;
  availableListing?: { section_id?: string; section_name?: string }[];
}

const StadiumSection: React.FC<StadiumSectionProps> = ({
  venue,
  selectedArea,
  onAreaClick,
  hoverTicketSection,
  availableListing,
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSectionClick = (sectionId: string | null) => {
    setSelectedSection(sectionId);
    onAreaClick(sectionId);
  };

  return (
    <div className="bg-white rounded-lg p-0 mb-4">
      <div className="h-auto mb-0">
        <StadiumMap2D
          venue={venue}
          selectedArea={selectedArea}
          selectedSection2={selectedSection}
          hoverTicketSection={hoverTicketSection}
          onSectionClick={handleSectionClick}
          availableListing={availableListing}
        />
      </div>
    </div>
  );
};

export default StadiumSection;
