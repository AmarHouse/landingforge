/**
 * Anti-Slop Design Rules
 * Unified from: Impeccable (deterministic detectors), Taste-Skill (pre-flight bans),
 * Anthropic Frontend Design (creative constraints), Snyk article insights.
 *
 * These rules prevent the AI from generating generic, templated, "AI-looking" output.
 */

/** Taste-Skill design dials (1-10 scale) */
export interface DesignDials {
  /** 1 = Symmetric/grid-perfect → 10 = Artsy chaos/organic */
  designVariance: number;
  /** 1 = Static/frozen → 10 = Cinematic physics/parallax */
  motionIntensity: number;
  /** 1 = Airy/gallery → 10 = Packed data/dense */
  visualDensity: number;
}

/** Impeccable-style register types */
export type DesignRegister = 'brand' | 'product';

/** Anti-pattern bans — things the AI must NEVER do */
export const ANTI_SLOP_BANS = [
  // Colors
  'NEVER use AI-purple or blue-glow gradients (#7C3AED → #3B82F6 or similar)',
  'NEVER use more than ONE accent color per page — consistency is key',
  'NEVER use pure black (#000) for body text — use dark grey (#1a1a1a to #333)',
  'NEVER use pure white (#FFF) on colored backgrounds without sufficient contrast',
  'NEVER saturate accent colors above 80% — keep them refined',
  // Typography
  'NEVER use Inter as the default font unless the user specifically requests it',
  'NEVER use more than 2 font families (one heading, one body)',
  'NEVER use Instrument Serif or Fraunces (overused AI fonts)',
  'NEVER use italic or bold for emphasis by switching font families — stay within the same family',
  // Layout
  'NEVER create centered hero sections on every page — break the symmetry with asymmetric layouts, split-screen, or diagonal flow',
  'NEVER create "card inside a card" nested structures — use flat card layouts',
  'NEVER use generic warm beige/cream palettes for every premium project',
  'NEVER wrap CTA button labels — keep them 1-2 words, single line',
  'NEVER use duplicate CTA intents on one page (e.g., "Contact us" + "Reach out" + "Get in touch")',
  // Visual
  'NEVER use simple linear gradients — use mesh gradients, noise textures, grain overlays, or decorative borders instead',
  'NEVER use box-shadow as the only depth cue — combine with border, opacity, and scale',
  'NEVER make all sections the same height — vary visual rhythm',
  // Motion
  'NEVER animate more than 3 elements per viewport — high-impact intentional motion only',
  'NEVER use generic fade-in-up on every element — use staggered reveals, scroll-linked animations, or kinetic typography',
  // Mobile
  'NEVER use h-screen on mobile — use min-h-[100dvh] to account for browser chrome',
  'NEVER use placeholder text as input labels — always use real labels or floating labels',
];

/** Shape Consistency Lock — enforces consistent border-radius */
export const SHAPE_RULES = {
  // If you use 16px radius for cards, everything must use multiples or fractions of 16
  small: '8px',    // badges, tags, small elements
  medium: '16px',  // cards, inputs, buttons
  large: '24px',   // modals, large containers
  pill: '9999px',  // only for pill-shaped buttons, never mixed with sharp corners
  rule: 'If using pill buttons (border-radius: 9999px), cards MUST use a complementary radius (12-16px), NOT sharp corners (0px)',
};

/** Impeccable-style deterministic detector checks */
export const DETECTOR_CHECKS = [
  { id: 'touch-target', check: 'All interactive elements must be at least 44x44px', severity: 'error' },
  { id: 'contrast', check: 'Text must have 4.5:1 contrast ratio minimum (WCAG AA)', severity: 'error' },
  { id: 'heading-hierarchy', check: 'Headings must follow h1→h2→h3, never skip levels', severity: 'error' },
  { id: 'focus-visible', check: 'All interactive elements must have visible focus state', severity: 'error' },
  { id: 'reduced-motion', check: 'prefers-reduced-motion must wrap all animations', severity: 'error' },
  { id: 'no-emoji-icons', check: 'Never use emojis as icons — use images or SVGs', severity: 'warning' },
  { id: 'semantic-html', check: 'Use header, nav, main, section, footer — not div soup', severity: 'warning' },
  { id: 'single-accent', check: 'Only ONE accent color used consistently across the page', severity: 'warning' },
  { id: 'shape-consistency', check: 'Border-radius values follow a consistent scale', severity: 'warning' },
  { id: 'no-nested-cards', check: 'No card-inside-card patterns', severity: 'warning' },
  { id: 'no-duplicate-cta', check: 'No duplicate CTA text/intents on same page', severity: 'warning' },
  { id: 'visual-rhythm', check: 'Sections have varied heights, not all same padding', severity: 'info' },
];

/** Generate anti-slop reference string for injection into prompts */
export function getAntiSlopReference(
  register: DesignRegister = 'brand',
  dials: DesignDials = { designVariance: 6, motionIntensity: 5, visualDensity: 4 }
): string {
  const varianceLabel = dials.designVariance <= 3 ? 'Clean & Grid-Perfect'
    : dials.designVariance <= 6 ? 'Balanced & Intentional'
    : dials.designVariance <= 8 ? 'Expressive & Asymmetric'
    : 'Organic & Experimental';

  const motionLabel = dials.motionIntensity <= 3 ? 'Minimal & Calm'
    : dials.motionIntensity <= 6 ? 'Purposeful & Smooth'
    : dials.motionIntensity <= 8 ? 'Rich & Cinematic'
    : 'Maximal & Physics-based';

  const densityLabel = dials.visualDensity <= 3 ? 'Airy & Gallery-like'
    : dials.visualDensity <= 6 ? 'Balanced & Readable'
    : dials.visualDensity <= 8 ? 'Dense & Informational'
    : 'Maximal & Data-rich';

  const registerGuidance = register === 'brand'
    ? `BRAND SURFACE (Landing Page): Prioritize visual impact, emotional narrative, whitespace, and trust. Use large hero imagery, generous padding (py-20 to py-32), asymmetric layouts, and scroll-driven storytelling. Every section should evoke emotion.`
    : `PRODUCT SURFACE (Dashboard/App): Prioritize density, utility, and information hierarchy. Use compact spacing, data visualization, and functional patterns.`;

  return `
🚫 ANTI-SLOP DESIGN RULES (from Impeccable + Taste-Skill + Anthropic):

REGISTER: ${registerGuidance}

DESIGN DIALS:
- Design Variance: ${dials.designVariance}/10 → ${varianceLabel}
- Motion Intensity: ${dials.motionIntensity}/10 → ${motionLabel}
- Visual Density: ${dials.visualDensity}/10 → ${densityLabel}

BANNED PATTERNS (never do these):
${ANTI_SLOP_BANS.map(r => `- ${r}`).join('\n')}

SHAPE CONSISTENCY:
- Cards: border-radius ${SHAPE_RULES.medium}
- Buttons: pill (${SHAPE_RULES.pill}) OR rounded-lg (${SHAPE_RULES.medium}), NOT both sharp and pill on same page
- ${SHAPE_RULES.rule}

MANDATORY QUALITY (Impeccable-style detector):
${DETECTOR_CHECKS.map(c => `- [${c.severity}] ${c.check}`).join('\n')}

DESIGN PRINCIPLES (from Anthropic Frontend Design):
- Use distinctive typography pairings — NOT the generic "Inter for everything"
- Break the grid: asymmetric layouts, overlapping elements, diagonal flow, generous negative space
- Add visual texture: noise/grain overlays, decorative borders, layered transparencies
- High-impact motion: staggered reveals on scroll, kinetic typography, scroll-linked animations
- One accent color, saturation < 80%, used consistently across all components
`;
}
