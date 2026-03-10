
# Plan: Update Color Palette to Brighter Sakura Theme

## What Changes
Update only the CSS custom properties in `src/index.css` to shift from the current dark maroon/burgundy palette to a brighter cherry blossom (sakura) pink palette. No layout, component, or feature changes.

## New Palette Direction
- **Primary**: Shift from dark burgundy (hue 352, 28% lightness) to a warm sakura pink (hue ~340-345, ~45-50% lightness) — think cherry blossom petals
- **Sidebar**: From deep maroon to a rich but brighter rose/sakura tone
- **Accent**: Brighter, more vibrant pink
- **Secondary/Muted**: Soft petal pink tints
- **Keep**: Status colors (green/yellow/red), destructive red, text contrast ratios

## Specific Changes (single file: `src/index.css`)

### Light Mode `:root`
| Variable | Current (dark maroon) | New (sakura pink) |
|---|---|---|
| `--primary` | `352 48% 28%` | `340 55% 48%` |
| `--secondary` | `350 20% 95%` | `340 40% 95%` |
| `--secondary-foreground` | `352 48% 28%` | `340 55% 40%` |
| `--muted` | `350 15% 94%` | `340 30% 94%` |
| `--accent` | `348 40% 51%` | `340 60% 58%` |
| `--border` | `350 15% 90%` | `340 25% 90%` |
| `--input` | `350 15% 88%` | `340 25% 88%` |
| `--ring` | `352 48% 28%` | `340 55% 48%` |
| `--sakura-soft` | `345 40% 96%` | `340 50% 96%` |
| `--sidebar-background` | `352 48% 22%` | `340 50% 40%` |
| `--sidebar-primary-foreground` | `352 48% 22%` | `340 50% 40%` |
| `--sidebar-accent` | `352 40% 30%` | `340 45% 48%` |
| `--sidebar-border` | `352 35% 32%` | `340 40% 50%` |
| `--sidebar-ring` | `352 48% 40%` | `340 55% 55%` |

### Dark Mode `.dark`
Corresponding adjustments — slightly desaturated, appropriate lightness for dark backgrounds.

## Constraints
- Only `src/index.css` is modified
- No layout, component, or feature changes
- Professional tone maintained — not neon pink, but warm cherry blossom
- Dark mode contrast preserved
