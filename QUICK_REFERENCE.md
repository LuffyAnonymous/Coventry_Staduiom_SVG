# Arsenal.tsx Quick Reference Card

## FILE STATS
- **Total Lines:** 1,895
- **Total Objects:** ~132
- **Unique Section IDs:** 121 (S_1 to S_121) + 2 boundary + extras
- **Object Types:** path, ground
- **Canvas Size:** 848px × 810px

---

## COLOR PALETTE

```
Fill Colors:
  #123458  → Dark blue (seat blocks)
  #2B7D3B  → Grass green (pitch)
  #999997  → Gray (borders, structure)

Text Colors:
  black    → Stand labels
  white    → Seat numbers
```

---

## SECTION ID BREAKDOWN

| Stand | Range | Count | Blocks |
|-------|-------|-------|--------|
| NORTH | S_1–S_32 | 32 | C58-C67, 108-116 |
| SOUTH | S_33–S_61 | 29 | 1-5, 30-32, C41-C84 |
| EAST | S_62–S_121 | 60 | 17-29, 91-130, C69-C80 |
| WEST | Mixed | 15+ | 6-16, 23-28, C41-C67 |
| BOUNDARY | S_1198, S_1199 | 2 | Stadium perimeter |

---

## PROPERTY ORDER (Standard)

```json
{
  "type": "path",
  "fill": "#123458",
  "d": "M... Z",           // SVG path
  "textX": 123.45,
  "textY": 456.78,
  "textColor": "white",
  "fontSize": 16.0,
  "id": "uuid-or-name",
  "name": "block-name",
  "shape_class": "block",
  "g_parent_class": "section",
  "g_parent_data_id": "S_N"
}
```

**Optional:** `"textRotation": 90/-90` (labels only)

---

## NAMING PATTERNS

### Block Names:
- **Numbered:** 1-130 (mixed pattern)
- **Corner:** C41-C84 (prefix C)
- **No consistent pattern** (opportunity for Coventry improvement)

### Section IDs:
- **Format:** `S_<NUMBER>`
- **Example:** S_1, S_15, S_99, S_121
- **Special:** S_1198, S_1199 (boundaries)
- **Extras:** "extras" (for labels/structure)

### UUIDs (Block IDs):
- **Format:** `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Type:** UUID v4
- **Length:** 36 characters
- **Pattern:** 8-4-4-4-12

---

## COORDINATE RANGES

```
X: 43 → 891 (range: 848px)
Y: 0 → 810 (range: 810px)

Pitch Center: (516, 430)
Canvas Center: (467, 405)

Stand Regions:
  NORTH: Y = 0-200
  SOUTH: Y = 620-810
  EAST:  X = 800-891
  WEST:  X = 43-150
```

---

## FONT SIZES

```
26.0  → Stand labels (NORTH, SOUTH, EAST, WEST)
16.0  → Regular seat sections (majority)
14.0  → Corner sections & tier boundaries
12.0  → Special/smaller sections
```

---

## g_parent_class VALUES

```
"extras"           → Stand labels, non-seat elements
"extra"            → Pitch/ground elements
"section"          → Regular seat sections
"section tickets"  → Premium/reserved seating
"block"            → Individual seat block
```

---

## BLOCK COUNT BY STAND

- **NORTH:** ~21 blocks (C58-C67, 108-116)
- **SOUTH:** ~15 blocks (1-5, 30-32, C41-C84)
- **EAST:** ~60 blocks (largest - 17-29, 91-130)
- **WEST:** ~36 blocks

---

## COVENTRY TEMPLATE MAPPING

```
NORTH STAND: N1-N10    (10 blocks vs 21)
SOUTH STAND: S1-S10    (10 blocks vs 15)
EAST STAND:  E1-E20    (20 blocks vs 60)
WEST STAND:  W1-W20    (20 blocks vs 36)
TOTAL: 60 blocks (vs 132 Arsenal objects)
```

---

## OBJECT CREATION ORDER

1. **Stand Labels** (4) → g_parent_class: "extras"
2. **Pitch Elements** (5-10) → fill: #2B7D3B, #999997
3. **Seat Sections** (60) → fill: #123458
4. **Stadium Boundary** (2) → S_1198, S_1199

---

## SVG PATH QUICK GUIDE

```
M <X> <Y>     → Move to point
L <X> <Y>     → Line to point
H <X>         → Horizontal line to X
V <Y>         → Vertical line to Y
C <...>       → Cubic curve (for rounded edges)
Z             → Close path

Examples:
  "M50 50L200 50L200 200L50 200Z"           (rectangle)
  "M689 321H343V539H689V321Z"               (same rectangle, different notation)
  "M516 463.9C534.7... 496.2 516 463.9Z"    (circle)
```

---

## PROPERTY CONSISTENCY RULES

✅ **Always consistent:**
- Property order (type → fill → d → textX → textY → ...)
- UUID format for block IDs
- Color palette (#123458, #2B7D3B, #999997)
- Text color (white for seats, black for labels)

⚠️ **Sometimes variable:**
- textRotation (only on labels)
- fontSize (14-26 range)
- g_parent_class (section vs section tickets)
- Block naming (numeric vs letter prefix)

---

## KEY DIFFERENCES: ARSENAL vs RECOMMENDED COVENTRY

| Aspect | Arsenal | Coventry |
|--------|---------|----------|
| **Blocks** | 132 mixed | 60 organized |
| **Naming** | Numeric/Letter mix | Consistent N/S/E/W pattern |
| **Section IDs** | S_1 to S_121 | S_1 to S_60 |
| **Stand Size** | Unbalanced (E=60, N=21) | Balanced (N/S=10, E/W=20) |
| **Corner Blocks** | Separate (C prefix) | Integrate into main blocks |
| **Scaling** | Already full-size | Template for 60-block stadium |

---

## WARNINGS & EDGE CASES

⚠️ **Duplicate Section IDs:** S_1198, S_1199 appear twice (complex boundary paths)

⚠️ **Missing Numbers:** Section IDs are not 100% sequential - some gaps

⚠️ **Mixed Naming:** Numbers (1-130) and corners (C41-C84) overlap naming scheme

⚠️ **Property Ordering:** Arsenal objects don't always follow same order - be consistent in Coventry

⚠️ **Double Objects:** Some sections may need 2 SVG paths for complex shapes

---

## VALIDATION CHECKLIST

```
□ All objects have "type": "path" or "type": "ground"
□ All seat blocks have fill: "#123458"
□ All textColor values are valid ("white", "black")
□ All g_parent_data_id follow pattern "S_<NUMBER>"
□ All UUIDs are 36 characters with hyphens
□ No trailing commas on last object
□ Array ends with "];
□ JSON is valid (use: jsonlint.com)
□ SVG paths are valid (basic test: contains M and Z)
□ Canvas coordinates within X:0-900, Y:0-850
```

---

## QUICK COPY-PASTE BLOCKS

### Seat Block Template
```json
{
  "type": "path",
  "fill": "#123458",
  "d": "M<X1> <Y1>L<X2> <Y1>L<X2> <Y2>L<X1> <Y2>Z",
  "textX": <CENTER_X>,
  "textY": <CENTER_Y>,
  "textColor": "white",
  "fontSize": 16.0,
  "id": "550e8400-e29b-41d4-a716-4466554400XX",
  "name": "<LETTER><NUMBER>",
  "shape_class": "block",
  "g_parent_class": "section",
  "g_parent_data_id": "S_XX"
}
```

### Stand Label Template
```json
{
  "type": "path",
  "textX": <X>,
  "textY": <Y>,
  "textColor": "black",
  "fontSize": 26.0,
  "id": "groundX_<direction>",
  "name": "<DIRECTION> STAND",
  "shape_class": "extra",
  "g_parent_class": "extras"
}
```

### Ground Element Template
```json
{
  "type": "ground",
  "d": "M<X1> <Y1>...",
  "id": "ground_<element_name>",
  "name": "",
  "fill": "#2B7D3B",
  "shape_class": "extra",
  "g_parent_class": "extra"
}
```

---

## USEFUL FORMULAS

### Equal Block Distribution (10 blocks, 900px width):
```
Usable width = 900 - 100 = 800px
Block width = 800 / 10 = 80px
Start X = 50px
Block N X = 50 + (N-1) * (80 + 5px spacing)
```

### Equal Block Distribution (20 blocks, 800px height):
```
Usable height = 800 - 100 = 700px
Block height = 700 / 20 = 35px
Start Y = 50px
Block N Y = 50 + (N-1) * (35 + 2px spacing)
```

### Text Center (for block labels):
```
textX = (X1 + X2) / 2
textY = (Y1 + Y2) / 2
```

---

## TOOLS NEEDED

1. **UUID Generator:** https://www.uuidgenerator.net/
2. **JSON Validator:** https://jsonlint.com/
3. **SVG Path Visualizer:** https://editor.method.ac/
4. **Text Editor:** VS Code (recommended)
5. **Calculator:** For coordinate calculations

---

## FREQUENTLY NEEDED VALUES

```
Pitch Green: #2B7D3B
Seat Blue: #123458
Border Gray: #999997
White Text: "white"
Black Text: "black"
Standard Font: 16.0
Large Font: 26.0
Small Font: 12.0-14.0
```

---

## REFERENCE LINKS IN PROJECT

- Analysis: `ARSENAL_ANALYSIS.md`
- Implementation: `COVENTRY_IMPLEMENTATION_GUIDE.md`
- Source: `components/Arsenal.tsx`
- Template Output: `components/Coventry.tsx` (to be created)
- Data Type: `StadiumMap2D.ts`

---

## TIPS FOR SUCCESS

1. **Start Simple:** Create 10 blocks first, verify they work
2. **Use Consistent Naming:** N/S/E/W pattern avoids confusion
3. **Generate UUIDs in Bulk:** Don't generate one-by-one
4. **Test as You Go:** Validate JSON every 10 blocks
5. **Use Grid Approach:** Calculate X/Y positions mathematically
6. **Copy-Paste Carefully:** Watch for trailing commas
7. **Document Changes:** Note why Coventry differs from Arsenal
8. **Keep Arsenal as Reference:** Don't modify it

---

**Last Updated:** 2026-05-19
**Based on:** Arsenal.tsx (1,895 lines, ~132 objects)
**For:** Coventry City CBS Arena (60 blocks target)
