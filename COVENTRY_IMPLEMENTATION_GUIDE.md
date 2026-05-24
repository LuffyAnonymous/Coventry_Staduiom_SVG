# Coventry City CBS Arena Implementation Guide

This guide provides step-by-step instructions and code templates to create the Coventry.tsx file based on the Arsenal.tsx patterns.

## QUICK START

### File Structure Template

```typescript
import { SeatSection } from "../StadiumMap2D";

export const COVENTRY_GROUND: SeatSection[] = [
    // 1. Stand Labels (4 objects)
    // 2. Ground/Pitch Elements (5-8 objects)
    // 3. Seat Sections (60 objects)
    // 4. Stadium Boundary (2 objects)
];
```

---

## STEP 1: STAND LABELS

Create 4 stand label objects in this order: NORTH, SOUTH, EAST, WEST

### Template:
```typescript
// NORTH STAND Label
{
    "type": "path",
    "textX": 450,              // Adjust based on canvas width
    "textY": 20,               // Top of canvas
    "textColor": "black",
    "fontSize": 26.0,
    "id": "ground1_north",
    "name": "NORTH STAND",
    "shape_class": "extra",
    "g_parent_class": "extras"
},
// SOUTH STAND Label
{
    "type": "path",
    "textX": 950,
    "textY": 450,
    "textColor": "black",
    "fontSize": 26.0,
    "name": "SOUTH STAND",
    "id": "ground2_south",
    "shape_class": "extra",
    "g_parent_class": "extras",
    "textRotation": 90
},
// EAST STAND Label
{
    "type": "path",
    "textX": 880,
    "textY": 150,
    "textColor": "black",
    "fontSize": 26.0,
    "id": "ground3_east",
    "name": "EAST STAND",
    "shape_class": "extra",
    "g_parent_class": "extras"
},
// WEST STAND Label
{
    "type": "path",
    "textX": 50,
    "textY": 450,
    "textColor": "black",
    "fontSize": 26.0,
    "name": "WEST STAND",
    "id": "ground4_west",
    "shape_class": "extra",
    "g_parent_class": "extras",
    "textRotation": -90
}
```

### Instructions:
- Adjust textX, textY based on your canvas dimensions
- Keep fontSize at 26.0 for consistency
- Use textRotation: 90/-90 for side stand labels
- Keep IDs descriptive with directional names

---

## STEP 2: GROUND/PITCH ELEMENTS

Add structural elements (5-8 objects minimum)

### Template:
```typescript
// Pitch Border (outer rectangle)
{
    "type": "path",
    "fill": "#999997",
    "d": "M<X1> <Y1>H<X2>V<Y2>H<X1>V<Y1>Z",
    "id": "ground_border",
    "name": "",
    "shape_class": "extra",
    "g_parent_class": "extra"
},
// Pitch Grass (inner playing area)
{
    "type": "ground",
    "d": "M<X1> <Y1>H<X2>V<Y2>H<X1>V<Y1>Z",
    "id": "ground_grass",
    "name": "",
    "fill": "#2B7D3B",
    "shape_class": "extra",
    "g_parent_class": "extra"
},
// Center Line (vertical)
{
    "type": "ground",
    "d": "M<CENTER_X> <Y1>V<Y2>",
    "id": "ground_center_line",
    "fill": "#2B7D3B",
    "name": "",
    "shape_class": "extra",
    "g_parent_class": "extra"
},
// Center Circle
{
    "type": "ground",
    "d": "M<CX> <CY-R>C<CX+R> <CY-R>, <CX+R> <CY+R>, <CX> <CY+R>C<CX-R> <CY+R>, <CX-R> <CY-R>, <CX> <CY-R>Z",
    "id": "ground_center_circle",
    "name": "",
    "fill": "#2B7D3B",
    "shape_class": "extra",
    "g_parent_class": "extra"
}
```

### SVG Path Guide:
```
M = Move to (start point)
H = Horizontal line to X coordinate
V = Vertical line to Y coordinate
L = Line to point (X, Y)
C = Cubic curve
Z = Close path
```

### Example Coordinates for 900x850px Canvas:
```
Pitch Outer Border: M50 50 H850 V800 H50 V50 Z
Pitch Grass (inner): M60 60 H840 V790 H60 V60 Z
Center X: 450
Center Y: 425
```

---

## STEP 3: SEAT SECTIONS (60 blocks)

### 3A. NORTH STAND (N1-N10)

**Positioning Strategy:**
- Y range: 50-200px (top third)
- X range: distributed across width
- 10 blocks equally spaced

```typescript
// NORTH STAND - Block N1 (leftmost)
{
    "type": "path",
    "fill": "#123458",
    "d": "M50 50L200 50L200 200L50 200Z",
    "textX": 125,
    "textY": 125,
    "textColor": "white",
    "fontSize": 16.0,
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "N1",
    "shape_class": "block",
    "g_parent_class": "section",
    "g_parent_data_id": "S_1"
},
// NORTH STAND - Block N2
{
    "type": "path",
    "fill": "#123458",
    "d": "M205 50L355 50L355 200L205 200Z",
    "textX": 280,
    "textY": 125,
    "textColor": "white",
    "fontSize": 16.0,
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "N2",
    "shape_class": "block",
    "g_parent_class": "section",
    "g_parent_data_id": "S_2"
},
// ... N3 through N10 following same pattern
// Each block: width = 150px, spacing = 5px
```

**N1-N10 Block Coordinates:**
```
N1:  X: 50-200
N2:  X: 205-355
N3:  X: 360-510
N4:  X: 515-665
N5:  X: 670-820
N6:  X: 825-900  (may be smaller)
N7:  X: (SOUTH opposite side)
N8:  X: (SOUTH opposite side)
N9:  X: (SOUTH opposite side)
N10: X: (SOUTH opposite side)

All Y: 50-200
```

### 3B. SOUTH STAND (S1-S10)

**Positioning Strategy:**
- Y range: 650-800px (bottom third)
- X range: distributed across width
- 10 blocks equally spaced
- Mirror of North Stand

```typescript
// SOUTH STAND - Block S1 (leftmost)
{
    "type": "path",
    "fill": "#123458",
    "d": "M50 650L200 650L200 800L50 800Z",
    "textX": 125,
    "textY": 725,
    "textColor": "white",
    "fontSize": 16.0,
    "id": "550e8400-e29b-41d4-a716-446655440011",
    "name": "S1",
    "shape_class": "block",
    "g_parent_class": "section tickets",
    "g_parent_data_id": "S_11"
},
// S2-S10 following same pattern
// All Y: 650-800
```

### 3C. EAST STAND (E1-E20)

**Positioning Strategy:**
- X range: 825-900px (right side)
- Y range: distributed vertically
- 20 blocks (largest stand)
- Block size: ~40px height each

```typescript
// EAST STAND - Block E1 (top)
{
    "type": "path",
    "fill": "#123458",
    "d": "M825 50L900 50L900 90L825 90Z",
    "textX": 862,
    "textY": 70,
    "textColor": "white",
    "fontSize": 14.0,  // Smaller font
    "id": "550e8400-e29b-41d4-a716-446655440031",
    "name": "E1",
    "shape_class": "block",
    "g_parent_class": "section",
    "g_parent_data_id": "S_21"
},
// E2 (next block down)
{
    "type": "path",
    "fill": "#123458",
    "d": "M825 95L900 95L900 135L825 135Z",
    "textX": 862,
    "textY": 115,
    "textColor": "white",
    "fontSize": 14.0,
    "id": "550e8400-e29b-41d4-a716-446655440032",
    "name": "E2",
    "shape_class": "block",
    "g_parent_class": "section",
    "g_parent_data_id": "S_22"
},
// ... E3 through E20
// Each block height: ~40px
// Total: 20 blocks x 40px = 800px (fits canvas height)
```

**E1-E20 Block Y Coordinates:**
```
All X: 825-900
E1:  Y: 50-90
E2:  Y: 95-135
E3:  Y: 140-180
E4:  Y: 185-225
E5:  Y: 230-270
E6:  Y: 275-315
E7:  Y: 320-360
E8:  Y: 365-405
E9:  Y: 410-450
E10: Y: 455-495
E11: Y: 500-540
E12: Y: 545-585
E13: Y: 590-630
E14: Y: 635-675
E15: Y: 680-720
E16: Y: 725-765
E17: Y: 770-800
E18: Y: (overlap area)
E19: Y: (overlap area)
E20: Y: (bottom)
```

### 3D. WEST STAND (W1-W20)

**Positioning Strategy:**
- X range: 0-75px (left side)
- Y range: distributed vertically (mirror of EAST)
- 20 blocks

```typescript
// WEST STAND - Block W1 (top)
{
    "type": "path",
    "fill": "#123458",
    "d": "M0 50L75 50L75 90L0 90Z",
    "textX": 37,
    "textY": 70,
    "textColor": "white",
    "fontSize": 14.0,
    "id": "550e8400-e29b-41d4-a716-446655440051",
    "name": "W1",
    "shape_class": "block",
    "g_parent_class": "section",
    "g_parent_data_id": "S_41"
},
// W2-W20 following same pattern as EAST
```

---

## STEP 4: STADIUM BOUNDARY (2 objects)

**Purpose:** Creates the curved outer perimeter of the stadium

```typescript
// Stadium Perimeter - Outer Curve (top/left)
{
    "type": "path",
    "fill": "#123458",
    "d": "M0 50C100 0, 800 0, 900 50L900 800C800 850, 100 850, 0 800V50Z",
    "id": "S_1198",
    "name": "",
    "shape_class": "block",
    "g_parent_class": "section",
    "g_parent_data_id": "S_1198"
},
// Stadium Perimeter - Inner Curve (if needed for 3D effect)
{
    "type": "path",
    "fill": "#123458",
    "d": "M20 70C110 30, 790 30, 880 70L880 780C790 820, 110 820, 20 780V70Z",
    "id": "S_1199",
    "name": "",
    "shape_class": "block",
    "g_parent_class": "section",
    "g_parent_data_id": "S_1199"
}
```

---

## COMPLETE COVENTRY TEMPLATE

```typescript
import { SeatSection } from "../StadiumMap2D";

export const COVENTRY_GROUND: SeatSection[] = [
    // ===== STAND LABELS (4 objects) =====
    {
        "type": "path",
        "textX": 450,
        "textY": 20,
        "textColor": "black",
        "fontSize": 26.0,
        "id": "ground1_north",
        "name": "NORTH STAND",
        "shape_class": "extra",
        "g_parent_class": "extras"
    },
    {
        "type": "path",
        "textX": 950,
        "textY": 450,
        "textColor": "black",
        "fontSize": 26.0,
        "name": "SOUTH STAND",
        "id": "ground2_south",
        "shape_class": "extra",
        "g_parent_class": "extras",
        "textRotation": 90
    },
    {
        "type": "path",
        "textX": 880,
        "textY": 150,
        "textColor": "black",
        "fontSize": 26.0,
        "id": "ground3_east",
        "name": "EAST STAND",
        "shape_class": "extra",
        "g_parent_class": "extras"
    },
    {
        "type": "path",
        "textX": 50,
        "textY": 450,
        "textColor": "black",
        "fontSize": 26.0,
        "name": "WEST STAND",
        "id": "ground4_west",
        "shape_class": "extra",
        "g_parent_class": "extras",
        "textRotation": -90
    },

    // ===== PITCH/GROUND ELEMENTS (5 objects) =====
    {
        "type": "path",
        "fill": "#999997",
        "d": "M50 50H850V800H50V50Z",
        "id": "ground_border",
        "name": "",
        "shape_class": "extra",
        "g_parent_class": "extra"
    },
    {
        "type": "ground",
        "d": "M60 60H840V790H60V60Z",
        "id": "ground_grass",
        "name": "",
        "fill": "#2B7D3B",
        "shape_class": "extra",
        "g_parent_class": "extra"
    },
    {
        "type": "ground",
        "d": "M450 60V790",
        "id": "ground_center_line",
        "fill": "#2B7D3B",
        "name": "",
        "shape_class": "extra",
        "g_parent_class": "extra"
    },

    // ===== NORTH STAND (N1-N10) =====
    // [N1-N10 objects here - use template above]

    // ===== SOUTH STAND (S1-S10) =====
    // [S1-S10 objects here - use template above]

    // ===== EAST STAND (E1-E20) =====
    // [E1-E20 objects here - use template above]

    // ===== WEST STAND (W1-W20) =====
    // [W1-W20 objects here - use template above]

    // ===== STADIUM BOUNDARY (2 objects) =====
    {
        "type": "path",
        "fill": "#123458",
        "d": "M0 50C100 0, 800 0, 900 50L900 800C800 850, 100 850, 0 800V50Z",
        "id": "S_1198",
        "name": "",
        "shape_class": "block",
        "g_parent_class": "section",
        "g_parent_data_id": "S_1198"
    },
    {
        "type": "path",
        "fill": "#123458",
        "d": "M20 70C110 30, 790 30, 880 70L880 780C790 820, 110 820, 20 780V70Z",
        "id": "S_1199",
        "name": "",
        "shape_class": "block",
        "g_parent_class": "section",
        "g_parent_data_id": "S_1199"
    }
];
```

---

## UUID GENERATION

Use one of these methods to generate UUIDs:

### Method 1: Online Generator
Visit: https://www.uuidgenerator.net/ and generate 60 UUIDs

### Method 2: Using Node.js
```bash
node -e "console.log(require('crypto').randomUUID())"
```

### Method 3: Pattern-based (for testing)
```
550e8400-e29b-41d4-a716-446655440001
550e8400-e29b-41d4-a716-446655440002
550e8400-e29b-41d4-a716-446655440003
... (increment last digits)
```

---

## COORDINATE CALCULATION HELPER

### For NORTH/SOUTH Stands (10 blocks each):
```
Canvas width: 900px
Usable width: 850px (50px margin on each side)
Block width: 850 / 10 = 85px
Block spacing: 5px

Block positions:
N1: 50 to 135
N2: 140 to 225
N3: 230 to 315
N4: 320 to 405
N5: 410 to 495
N6: 500 to 585
N7: 590 to 675
N8: 680 to 765
N9: 770 to 850
N10: 855 to 900
```

### For EAST/WEST Stands (20 blocks each):
```
Canvas height: 850px
Usable height: 750px (50px margin top/bottom)
Block height: 750 / 20 = 37.5px (round to 38px)
Block spacing: 2-3px

Block positions (EAST, X: 825-900):
E1:  50 to 88
E2:  92 to 130
E3:  134 to 172
... (continue incrementing Y)
E20: 758 to 800
```

---

## VALIDATION CHECKLIST

- [ ] 60 unique UUIDs generated
- [ ] 4 stand labels with correct g_parent_class: "extras"
- [ ] 5-8 pitch elements with fill colors (#999997, #2B7D3B)
- [ ] 60 seat blocks (N1-N10, S1-S10, E1-E20, W1-W20)
- [ ] All seat blocks have:
  - [ ] type: "path"
  - [ ] fill: "#123458"
  - [ ] textColor: "white"
  - [ ] fontSize: 16.0 (or 14.0 for E/W stands)
  - [ ] g_parent_class: "section" or "section tickets"
  - [ ] g_parent_data_id: S_1 through S_60
- [ ] 2 stadium boundary objects (S_1198, S_1199)
- [ ] All properties in correct order
- [ ] File ends with `];`
- [ ] No trailing commas on last object
- [ ] Valid JSON structure

---

## NEXT STEPS

1. Copy this template to `components/Coventry.tsx`
2. Fill in all 60 seat section objects using the coordinate helpers
3. Generate 60 unique UUIDs and assign to each block
4. Verify JSON syntax using a validator
5. Import and test in the StadiumMap2D component
6. Adjust coordinates as needed based on visual appearance
