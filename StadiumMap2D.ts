export interface SeatSection {
  type: "path" | "ground";
  fill?: string;
  d?: string;
  textX?: number;
  textY?: number;
  textColor?: string;
  fontSize?: number;
  id: string;
  name: string;
  shape_class: string;
  g_parent_class: string;
  g_parent_data_id?: string;
  textRotation?: number;
}
