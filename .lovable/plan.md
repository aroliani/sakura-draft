

# Plan: Adjust Sakura Palette to Unisex School Theme

## Problem
Current hue 345 is too pink/girly. Need a more neutral, professional tone suitable for an SMP (middle school) — unisex, mature, but still referencing "sakura."

## Approach
Shift the hue from **345 (pink)** to **350-355 (deep rose/burgundy)** and **reduce saturation** significantly. This creates a warm, dignified maroon/burgundy that evokes sakura without being overtly pink. Think of dried cherry blossom wood rather than fresh petals.

## Changes (only `src/index.css`)

### Light Mode
| Variable | Current | New |
|---|---|---|
| `--primary` | `345 42% 38%` | `350 35% 33%` |
| `--secondary` | `345 25% 95%` | `350 15% 95%` |
| `--secondary-foreground` | `345 42% 32%` | `350 35% 30%` |
| `--muted` | `345 18% 94%` | `350 10% 94%` |
| `--accent` | `345 45% 52%` | `350 30% 45%` |
| `--border` | `345 18% 90%` | `350 10% 89%` |
| `--input` | `345 18% 88%` | `350 10% 87%` |
| `--ring` | `345 42% 38%` | `350 35% 33%` |
| `--sakura-soft` | `345 35% 96%` | `350 18% 96%` |
| `--sidebar-background` | `345 40% 32%` | `350 30% 25%` |
| `--sidebar-primary-foreground` | `345 40% 32%` | `350 30% 25%` |
| `--sidebar-accent` | `345 35% 40%` | `350 25% 33%` |
| `--sidebar-border` | `345 30% 42%` | `350 20% 35%` |
| `--sidebar-ring` | `345 42% 45%` | `350 30% 38%` |

### Dark Mode
Same hue shift (350) with reduced saturation, keeping appropriate lightness for dark backgrounds.

## Result
- Deep burgundy/maroon tone — professional, unisex, school-appropriate
- Still warm enough to reference sakura heritage
- Not pink, not girly — more like a distinguished institutional color

