# Arsenal.tsx Comprehensive Structure Analysis

## 1. OVERALL STRUCTURE & DIMENSIONS

### Total Objects: **~132 objects**
- **File Size:** 1,895 lines (1,893 lines of content + import/export)
- **Average object complexity:** 8-14 lines per object

### Main Categories:
1. **Stand Labels** (4 objects) - Non-interactive text labels for NORTH, SOUTH, EAST, WEST
2. **Pitch/Ground Elements** (~12 objects) - Field boundaries, grass, center line, center circle
3. **Seat Sections** (~116 objects) - Individual seat blocks organized by section
4. **Stadium Boundary** (2 objects) - Outer stadium perimeter (S_1198, S_1199)

---

## 2. SECTION ID NAMING PATTERNS

### Structure: `S_<NUMBER>`
- **Unique Section IDs:** 121 unique sections (S_1 through S_121)
- **Special Sections:** 
  - S_1198, S_1199: Stadium outer boundaries (appear twice each for complex polygons)
  - "extras": Stand label markers (3 instances)

### Section Numbering Distribution:
| Stand | Section Range | Count | Block Names |
|-------|-----------|-------|------------|
| **NORTH STAND** | S_1 to S_32 | 32 | C46-C67, 108-116 |
| **SOUTH STAND** | S_33 to S_61 | 29 | 1-5, 30-32, C58-C84 |
| **EAST STAND** | S_62 to S_121 | 60 | 17-29, 91-130, C69-C80 |
| **WEST STAND** | Various | ~15 | 6-16, 23-28, C41-C51, C60-C67 |

---

## 3. COORDINATE RANGES

### Canvas/SVG Dimensions:
- **X Axis:** 43 to 891 (range: ~848 pixels)
- **Y Axis:** 0 to 810 (range: ~810 pixels)
- **Canvas Center:** Approximately (467, 405) - roughly center for pitch rotation

### Coordinate Patterns:
- **Pitch Center:** ~(516, 430)
- **Stadium Width:** ~820 pixels
- **Stadium Height:** ~810 pixels
- **Text positioning:** Varies widely based on section location

---

## 4. PROPERTY ORDERING ANALYSIS

### First 5 Objects (Stand Labels & Pitch Elements):

```javascript
// Object 1: EAST STAND Label
{
  "type": "path",
  "textX": 518.165,
  "textY": 0,
  "textColor": "black",
  "fontSize": 26.0,
  "id": "ground7",
  "name": "EAST STAND",
  "shape_class": "extra",
  "g_parent_class": "extras"
}

// Object 2: SOUTH STAND Label (with textRotation)
{
  "type": "path",
  "textX": 1050,
  "textY": 450,
  "textColor": "black",
  "fontSize": 26.0,
  "name": "SOUTH STAND",
  "id": "ground5",
  "shape_class": "extra",
  "g_parent_class": "extras",
  "textRotation": 90  // Optional property
}

// Object 5: Pitch Border (gray)
{
  "type": "path",
  "fill": "#999997",
  "d": "M689 321H343V539.13H689V321Z",
  "id": "ground1",
  "name": "",
  "shape_class": "extra",
  "g_parent_class": "extra"
}
```

### Last 5 Objects (Seat Sections):

```javascript
// All follow this pattern:
{
  "type": "path",
  "fill": "#123458",
  "d": "M462 719.5H516V810.173C497.588 810.16 479.58 809.435 462 808.033V719.5Z",
  "textX": 485.094,
  "textY": 767.547,
  "textColor": "white",
  "fontSize": 16.0,
  "id": "1e09adcb-bc3e-4faf-a8af-a442f32ae1a8",  // UUID format
  "name": "91",  // Seat block name/number
  "shape_class": "block",
  "g_parent_class": "section",
  "g_parent_data_id": "S_62"
}
```

### Property Ordering Pattern:

**CONSISTENT ORDER ACROSS ALL SEAT OBJECTS:**
1. `type` - Always "path" for seat sections
2. `fill` - Hex color code
3. `d` - SVG path data (M command)
4. `textX` - Text X coordinate
5. `textY` - Text Y coordinate
6. `textColor` - Text color value
7. `fontSize` - Font size (14.0, 16.0 most common)
8. `id` - UUID or identifier
9. `name` - Display name/block number
10. `shape_class` - Always "block" or "extra"
11. `g_parent_class` - "section", "section tickets", or "extras"
12. `g_parent_data_id` - Section ID (S_*)

**OPTIONAL PROPERTIES:**
- `textRotation` - Used for rotated text (appears only in stand labels: 90, -90)

---

## 5. COLOR USAGE

### Fill Colors (Hex):
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Dark Blue** | `#123458` | Seat blocks, section blocks |
| **Gray** | `#999997` | Pitch border, structural elements |
| **Grass Green** | `#2B7D3B` | Pitch/field surface, grass areas |

### Text Colors:
| Color | Usage |
|-------|-------|
| **black** | Stand labels (NORTH, SOUTH, EAST, WEST) |
| **white** | Seat section numbers/identifiers |

### Font Sizes:
- **26.0** - Stand labels (NORTH, SOUTH, EAST, WEST)
- **16.0** - Most seat sections (primary size)
- **14.0** - Corner sections and tier boundary sections
- **12.0** - Special/smaller sections (C corners)
- **13.0** - Minor variations

---

## 6. g_parent_data_id PATTERN

### Structure & Hierarchy:
```
g_parent_data_id: "S_<NUMBER>"
```

### Breakdown:
- **Prefix:** `S_` (stands for Section)
- **Numbering:** 1-121 (sequential but not all numbers may be visible)
- **Special IDs:** 
  - S_1198, S_1199 = Stadium perimeter/outer boundary
  - "extras" = Non-seat elements (labels, structural)

### Section Organization:
- **S_1 to S_32:** North/West corner sections (~NORTHWEST quadrant)
- **S_33 to S_61:** South corner sections (~SOUTHWEST quadrant)
- **S_62 to S_121:** East sections (~NORTHEAST/SOUTHEAST quadrants)
- **S_1198, S_1199:** Full stadium boundary curves

### Associated Properties:
- **g_parent_class:** 
  - `"section"` - Regular seat section
  - `"section tickets"` - Premium/ticket sections
  - `"extras"` - Non-seat elements
  - `"extra"` - Pitch/ground elements

---

## 7. STAND SECTIONS & BLOCK BREAKDOWN

### NORTH STAND (Upper Left)
- **Section IDs:** S_1 to S_32
- **Block Naming:** 
  - C58-C67: Corner blocks (12 blocks, font size 12-16)
  - 108-116: Upper tier (9 blocks, font size 16)
- **Total Blocks:** ~21 blocks
- **Pattern:** Corner sections (C prefix) + numbered upper sections

### SOUTH STAND (Lower Center)
- **Section IDs:** S_47 to S_61
- **Block Naming:**
  - 1-5: Lower front blocks
  - 30-32: Lower side blocks
  - C41-C51, C60-C84: Corner/end blocks
- **Total Blocks:** ~15 blocks
- **Pattern:** Numbered lower sections + corner blocks

### EAST STAND (Right Side)
- **Section IDs:** S_62 to S_121
- **Block Naming:**
  - 17-29: Primary tier
  - 91-130: Extended upper sections
  - C69-C80: Corner sections
- **Total Blocks:** ~60 blocks (LARGEST STAND)
- **Pattern:** Sequential numbering with extensive upper tier

### WEST STAND (Left Side)
- **Section IDs:** S_1 to S_46 (mixed with others)
- **Block Naming:**
  - 6-16: Primary tier
  - 23-28: Secondary tier
  - C41-C67: Mixed corner blocks
- **Total Blocks:** ~36 blocks
- **Pattern:** Distributed numbering with corner focus

### CORNER SECTIONS:
- **Naming Convention:** `C<NUMBER>` (C41 through C84 and higher)
- **Font Size:** Usually 12.0-14.0 (smaller than regular sections)
- **Count:** 30+ corner blocks distributed around stadium
- **Characteristics:** Smaller irregular polygons, serve as transitions

---

## 8. UUID PATTERN FOR BLOCK IDs

### Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Length:** 36 characters
- **Structure:** 8-4-4-4-12 character groups separated by hyphens
- **Type:** Standard UUID v4 format
- **Examples:**
  - `5cdaff2e-152b-485c-8fb7-21b10627fb0c`
  - `1e09adcb-bc3e-4faf-a8af-a442f32ae1a8`

### Purpose:
- Unique identifier for each SVG path element
- Used for individual block selection and interaction
- Different from section ID (g_parent_data_id)

---

## 9. SCALING RECOMMENDATIONS FOR COVENTRY CITY CBS ARENA

### Proposed Structure for Coventry CBS Arena:

```
NORTH STAND: N1-N10 (10 blocks)
SOUTH STAND: S1-S10 (10 blocks)
EAST STAND: E1-E20 (20 blocks)
WEST STAND: W1-W20 (20 blocks)
TOTAL CAPACITY BLOCKS: 60 blocks
```

### Scaling Strategy:

#### A. Section ID Mapping (Arsenal → Coventry)
```javascript
// Arsenal → Coventry Conversion
NORTH: S_1-S_10      // Reduce from 32 → 10 sections
SOUTH: S_11-S_20     // Reduce from 29 → 10 sections
EAST:  S_21-S_40     // Reduce from 60 → 20 sections
WEST:  S_41-S_60     // Reduce from 36 → 20 sections
BOUNDARY: S_1198-S_1199  // Keep same for perimeter
```

#### B. Block Naming Convention
```javascript
// NEW NAMING PATTERN:
NORTH: N1, N2, N3... N10        // Cardinal prefix + number
SOUTH: S1, S2, S3... S10
EAST:  E1, E2, E3... E20
WEST:  W1, W2, W3... W20

// Optional Corner Extensions:
NORTH_CORNER_LEFT: NC1, NC2
NORTH_CORNER_RIGHT: NC3, NC4
... etc
```

#### C. Coordinate Scaling
```
Current Arsenal:
- Width: 848 pixels (43-891)
- Height: 810 pixels (0-810)
- Pitch: 516, 430 (center)

For similar size venue (Coventry):
- Maintain similar pitch/field dimensions
- Scale sections proportionally:
  - Each E/W stand: ~816px / 2 = 408px width per side
  - Each N/S stand: ~810px / 2 = 405px height per side
  - Adjust block sizes to fit 10/20 blocks per stand
```

#### D. Color & Property Consistency
```javascript
// Use same Arsenal colors:
- Seat fill: #123458 (dark blue)
- Pitch: #2B7D3B (grass green)
- Border: #999997 (gray)
- Text color: white
- Font size: 16.0 for regular, 14.0 for corners, 12.0 for small blocks

// g_parent_class structure:
- "section": Regular sections
- "section tickets": Premium sections (suggested: E/W front blocks)
- "extras": Structural elements
```

#### E. Property Ordering Template
```javascript
// Template for each Coventry seat section:
{
  "type": "path",
  "fill": "#123458",
  "d": "M<X1> <Y1>L<X2> <Y2>L<X3> <Y3>Z",  // SVG path
  "textX": <CENTER_X>,
  "textY": <CENTER_Y>,
  "textColor": "white",
  "fontSize": 16.0,
  "id": "<UUID>",  // Generate new UUID
  "name": "<LETTER><NUMBER>",  // e.g., "N1", "E5", "W12"
  "shape_class": "block",
  "g_parent_class": "section",
  "g_parent_data_id": "S_<NUMBER>"
}
```

#### F. Layout Calculation Example
```
NORTH STAND (10 blocks):
- Total width: ~848px / 2 = 424px per block area
- Individual block width: ~424px / 10 = ~42px
- Y position: 0-200px range
- X positions: 43-891px distributed across 10 blocks
- Blocks: N1 (43px), N2 (129px), N3 (215px)... N10 (891px)

EAST STAND (20 blocks):
- Total height: ~810px / 20 = ~40.5px per block
- Individual block height: ~40.5px
- X position: ~820-890px (right side)
- Y positions: 0-810px distributed vertically
- Blocks: E1 (top), E10 (middle), E20 (bottom)
```

---

## 10. KEY PATTERNS OBSERVED

### Consistency Patterns:
1. ✅ **Property order is highly consistent** - All seat sections follow exact same order
2. ✅ **UUID format is standard** - All block IDs use UUID v4
3. ✅ **Color palette is limited** - Only 3 fill colors used consistently
4. ✅ **Section ID hierarchy** - Follows geographic/positional logic
5. ✅ **Text sizing correlates with block size** - Smaller blocks = smaller fonts
6. ✅ **SVG path format is consistent** - All use "M" command pattern

### Exceptions & Variations:
1. ⚠️ **Optional textRotation** - Only used for stand labels
2. ⚠️ **Double objects** - S_1198/S_1199 used twice for complex boundaries
3. ⚠️ **Mixed naming schemes** - Numeric blocks (1-130), corner blocks (C41-C84)
4. ⚠️ **Inconsistent g_parent_class** - Both "section" and "section tickets" used

### Recommendations for Coventry Implementation:
- **Strict naming:** Use consistent N/S/E/W + number pattern (avoid C prefix initially)
- **Consistent sizing:** Make all blocks same size within each stand
- **Simplified section IDs:** Linear S_1 through S_60 (no large gaps)
- **Standard properties:** Maintain exact property ordering
- **Block count:** Start with 60 blocks as baseline, scale based on seat capacity

---

## 11. CREATION CHECKLIST FOR COVENTRY FILE

```
□ Generate 60 unique UUIDs for block IDs
□ Define X/Y coordinates for all 60 blocks
□ Create SVG path "d" values for each block polygon
□ Set textX/textY to block centers
□ Assign section numbers S_1 through S_60
□ Name blocks: N1-N10, S1-S10, E1-E20, W1-W20
□ Set all fill colors to #123458
□ Set all textColor to white
□ Assign shape_class as "block"
□ Assign g_parent_class as "section" or "section tickets"
□ Add 2 boundary objects (S_1198, S_1199) for perimeter
□ Add 4 stand label objects with "extras" g_parent_class
□ Add ground/pitch elements (5-10 objects)
□ Total expected objects: ~80-90
```

---

## SUMMARY TABLE

| Metric | Arsenal | Recommended Coventry |
|--------|---------|----------------------|
| **Total Sections** | 121 | 60 |
| **Total Objects** | ~132 | ~90 |
| **NORTH Blocks** | 21 | 10 |
| **SOUTH Blocks** | 15 | 10 |
| **EAST Blocks** | 60 | 20 |
| **WEST Blocks** | 36 | 20 |
| **Corner Blocks** | 30+ | 0 (recommended: integrate) |
| **Boundary Objects** | 2 | 2 |
| **Label Objects** | 4 | 4 |
| **Pitch Elements** | 12 | 5-8 |
| **Canvas Width** | 848px | 900-1000px (scale) |
| **Canvas Height** | 810px | 900px (scale) |
