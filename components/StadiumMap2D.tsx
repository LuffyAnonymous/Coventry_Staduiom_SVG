"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { COVENTRY_CITY_GROUND } from "./grounds/Coventry";

export type SeatSection = {
  id?: string;
  name?: string;
  type?: "rect" | "path" | "polygon" | "circle" | "line" | "ground";
  fill?: string;
  stroke?: string;
  shape_class?: string;
  g_parent_class?: string;
  g_parent_data_id?: string;
  multilineName?: string;
  stroke_width?: number;
  stroke_linecap?: string;
  textColor?: string;
  fontSize?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rx?: number;
  d?: string;
  points?: string;
  textX?: number;
  textY?: number;
  textRotation?: number;
  strokeWidth?: number;
  strokeLinejoin?: string;
  cx?: number;
  cy?: number;
  r?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
};

type Listing = {
  section_id?: string;
  section_name?: string;
};

interface StadiumMap2DProps {
  venue: string;
  selectedArea?: string;
  selectedSection2?: string | null;
  onSectionClick?: (sectionId: string | null) => void;
  hoverTicketSection?: string;
  availableListing?: Listing[];
}

const StadiumMap2D: React.FC<StadiumMap2DProps> = ({
  venue,
  selectedArea,
  selectedSection2,
  onSectionClick,
  hoverTicketSection,
  availableListing = [],
}) => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedSection, setSelectedSection] = useState<string | null>(
    selectedSection2 ?? null
  );

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  const zoomIn = () => setZoom((z) => Math.min(z * 1.2, 5));
  const zoomOut = () => setZoom((z) => Math.max(z / 1.2, 0.5));
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    setSelectedSection(selectedSection2 ?? null);
  }, [selectedSection2]);

  useEffect(() => {
    setSelectedSection(hoverTicketSection || null);
  }, [hoverTicketSection]);

  const GROUND_MAP: Record<string, SeatSection[]> = {
    "Coventry City Stadium": COVENTRY_CITY_GROUND,
  };

  const allSections: SeatSection[] = useMemo(() => {
    return GROUND_MAP[venue] ?? [];
  }, [venue]);

  const handleSectionClick = (sectionId: string | null) => {
    if (sectionId === null) {
      setSelectedSection(null);
      onSectionClick?.(null);
      return;
    }

    if (sectionId.toLowerCase().includes("ground")) {
      return;
    }

    setSelectedSection(sectionId);
    onSectionClick?.(sectionId);
  };

  const handleWheelZoom = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const svgX = (mouseX - offset.x) / zoom;
    const svgY = (mouseY - offset.y) / zoom;
    const zoomStep = 0.04;
    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
    const newZoom = Math.min(3, Math.max(0.75, zoom + delta));
    const newOffsetX = mouseX - svgX * newZoom;
    const newOffsetY = mouseY - svgY * newZoom;
    setZoom(newZoom);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({ x: offsetStart.current.x + dx, y: offsetStart.current.y + dy });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <main>
      <div className="w-full">
        <div className="p-4 bg-white border border-gray-200 rounded-3xl shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-3">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-slate-900">
                {venue}
              </h1>
              <p className="text-sm text-slate-600">
                Select a section to view available tickets
              </p>
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white pb-4">
            <svg
              viewBox="0 0 1400 950"
              style={{ maxWidth: "100%", height: "auto" }}
              className="border border-slate-200 bg-white"
              onWheel={handleWheelZoom}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <rect
                x="0"
                y="0"
                width="1400"
                height="950"
                fill="#f8fafc"
              />

              <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
                {allSections.map((section) => {
                  const isSectionSelected =
                    selectedSection !== null && section.id === selectedSection;

                  const sectionFill = isSectionSelected
                    ? "#e4032f"
                    : section.fill || "#999999";

                  const clickable =
                    Boolean(section.id) &&
                    !section.id?.toLowerCase().includes("ground") &&
                    section.type !== "ground";

                  const commonGroupProps = clickable
                    ? {
                        onClick: (e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleSectionClick(section.id ?? null);
                        },
                        className:
                          "cursor-pointer transition-opacity hover:opacity-80",
                      }
                    : {
                        className: "",
                      };

                  const textX = section.textX ?? 0;
                  const textY = section.textY ?? 0;

                  if (section.type === "rect") {
                    return (
                      <g
                        key={section.id ?? `${section.x}-${section.y}`}
                        {...commonGroupProps}
                      >
                        <rect
                          x={section.x}
                          y={section.y}
                          width={section.width}
                          height={section.height}
                          rx={section.rx || 0}
                          fill={sectionFill}
                          stroke={section.stroke || "#000000"}
                          strokeWidth={1}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={section.textColor || "black"}
                          fontSize={section.fontSize || 12}
                          fontWeight="bold"
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {section.name}
                        </text>
                      </g>
                    );
                  }

                  if (section.type === "path") {
                    return (
                      <g key={section.id ?? section.d} {...commonGroupProps}>
                        <path
                          d={section.d}
                          fill={sectionFill}
                          stroke={section.stroke || "#000000"}
                          strokeWidth={1}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={section.textColor || "black"}
                          fontSize={section.fontSize || 12}
                          fontWeight="bold"
                          transform={
                            section.textRotation
                              ? `rotate(${section.textRotation} ${textX} ${textY})`
                              : undefined
                          }
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {section.name}
                        </text>
                      </g>
                    );
                  }

                  if (section.type === "polygon") {
                    return (
                      <g key={section.id ?? section.points} {...commonGroupProps}>
                        <polygon
                          points={section.points}
                          fill={sectionFill}
                          stroke={section.stroke || "#000000"}
                          strokeWidth={1}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={section.textColor || "black"}
                          fontSize={section.fontSize || 12}
                          fontWeight="bold"
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {section.name}
                        </text>
                      </g>
                    );
                  }

                  if (section.type === "ground") {
                    return (
                      <g key={section.id ?? section.d}>
                        <path
                          d={section.d}
                          fill={section.fill}
                          stroke={section.stroke || "none"}
                          strokeWidth={section.strokeWidth ?? 0}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  }

                  return null;
                })}
              </g>
            </svg>

            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
                className="bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-gray-100 active:scale-95 transition"
                title="Zoom Out"
              >
                −
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
                className="bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-gray-100 active:scale-95 transition"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
                className="bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-gray-100 active:scale-95 transition"
                title="Reset View"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-5 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#7DB9D7] block" />
              Standard
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#1B3A6B] block" />
              Premium
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#9CA3AF] block" />
              Unavailable
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#e4032f] block" />
              Selected
            </div>
          </div>

          <div className="grid gap-4 mt-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900 mb-2">
                Selected Section
              </h2>
              <p className="text-2xl font-semibold text-slate-900">
                {selectedSection ?? "No section selected"}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Click on any section to view available tickets.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900 mb-2">
                How to use
              </h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <strong>Zoom:</strong> Use + / − buttons or scroll.
                </li>
                <li>
                  <strong>Drag:</strong> Click and drag to move the stadium.
                </li>
                <li>
                  <strong>Select:</strong> Click a section to highlight it in red.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StadiumMap2D;
