# House of Brusi - Design System & Tokens

## Color Tokens

The palette is strictly limited to six semantic color tokens. No default Tailwind palette colors should be introduced into the application. Only these six semantic variables (plus white, black, and transparent for functional UI elements like focus rings) are permitted.

| Token | Hex Value | Intended Usage |
| :--- | :--- | :--- |
| `--color-ink` (`bg-ink`, `text-ink`) | `#17140F` | Primary text, deep dark backgrounds, high-contrast structural elements |
| `--color-bone` (`bg-bone`, `text-bone`) | `#F1EAD8` | Primary light backgrounds, warm parchment canvas, light cards |
| `--color-saddle` (`bg-saddle`, `text-saddle`) | `#6B4A31` | Primary accent color, primary interactive buttons, prominent actions |
| `--color-brass` (`bg-brass`, `text-brass`) | `#B08D57` | Antique hardware gold, reserved for subtle dividers and small CTAs only |
| `--color-dust` (`bg-dust`, `text-dust`) | `#C7BBA3` | Borders, subtle divider lines, secondary text, disabled states |
| `--color-merlot` (`bg-merlot`, `text-merlot`) | `#5B1F26` | Deep wine red, used exclusively for sale tags, limited edition badges, and alerts |

---

## Typography Roles

| Role | Font Family | Configured Weights / Options | Usage Guidelines |
| :--- | :--- | :--- | :--- |
| **Display Serif** (`font-display`) | `Fraunces` | 300, 500, 600 (optical sizes enabled) | Headlines, page titles, editorial callouts, brand story highlights |
| **Body Grotesk** (`font-body`) | `General Sans` / `Inter` | 400, 500, 600 | General body copy, navigation menus, product descriptions, form controls |
| **Monospace Utility** (`font-mono`) | `JetBrains Mono` | 400, 500 | Product prices, SKUs, inventory counts, dimension specifications, boutique metadata |

---

## 8px Spacing Scale

All layouts and component dimensions must adhere to the 8px-based spatial system:

- **`4px`** (`space-1` / `p-1` / `m-1`) - Micro gaps, inline badge padding
- **`8px`** (`space-2` / `p-2` / `m-2`) - Tight component padding, icon-text gap
- **`12px`** (`space-3` / `p-3` / `m-3`) - Compact input padding, secondary gap
- **`16px`** (`space-4` / `p-4` / `m-4`) - Standard container inner padding, card gaps
- **`24px`** (`space-6` / `p-6` / `m-6`) - Section element gaps, medium card padding
- **`32px`** (`space-8` / `p-8` / `m-8`) - Large card padding, module spacing
- **`48px`** (`space-12` / `p-12` / `m-12`) - Sub-section margins, hero padding
- **`64px`** (`space-16` / `p-16` / `m-16`) - Major section breaks, page-level padding
- **`96px`** (`space-24` / `p-24` / `m-24`) - Hero section spacing, editorial dividers
- **`128px`** (`space-32` / `p-32` / `m-32`) - Top-level page layout margins

---

## Signature Motif: Stitched Line

- **Specification**: A horizontal dashed line, 1.5px stroke width, using the `--color-brass` (`#B08D57`) color.
- **Organic Character**: Features a subtle hand-drawn irregularity with slight y-offset per dash (implemented via custom SVG or CSS clip-path mask) to evoke bespoke tailoring and denim top-stitching.
- **Strict Constraint**: Reserved strictly for hero sections and major section dividers. Never used as generic borders, card outlines, or ambient decoration.
