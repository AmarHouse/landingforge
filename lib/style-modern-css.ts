/**
 * Modern CSS Fallback Injection System
 * Automatically injects 2025 CSS techniques into generated HTML
 * when the AI model doesn't include them.
 */

/**
 * Style-category-specific CSS enhancements.
 * These are added based on the selected design style category.
 */
export const STYLE_CATEGORY_CSS: Record<string, string> = {
  artistic: `
/* Artistic style enhancements — @property animated gradients */
@property --ds-gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@property --ds-hue {
  syntax: '<number>';
  initial-value: 0;
  inherits: false;
}
.ds-animated-gradient {
  background: conic-gradient(from var(--ds-gradient-angle), #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b);
  transition: --ds-gradient-angle 1.5s ease;
}
.ds-animated-gradient:hover {
  --ds-gradient-angle: 360deg;
}
.ds-glow {
  filter: drop-shadow(0 0 8px currentColor);
  transition: filter 0.3s ease;
}
.ds-glow:hover {
  filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 40px currentColor);
}
`,

  gaming: `
/* Gaming style enhancements — glitch and neon effects */
@property --ds-glitch-offset {
  syntax: '<length>';
  initial-value: 0px;
  inherits: false;
}
@keyframes ds-glitch {
  0%, 100% { --ds-glitch-offset: 0px; }
  20% { --ds-glitch-offset: -3px; }
  40% { --ds-glitch-offset: 3px; }
  60% { --ds-glitch-offset: -1px; }
  80% { --ds-glitch-offset: 1px; }
}
.ds-glitch-text {
  position: relative;
  animation: ds-glitch 0.3s infinite;
}
.ds-neon {
  text-shadow: 0 0 7px currentColor, 0 0 10px currentColor, 0 0 21px currentColor, 0 0 42px currentColor;
  transition: text-shadow 0.3s ease;
}
.ds-neon:hover {
  text-shadow: 0 0 7px currentColor, 0 0 10px currentColor, 0 0 21px currentColor, 0 0 42px currentColor, 0 0 82px currentColor, 0 0 92px currentColor;
}
.ds-scanline::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
`,

  retro: `
/* Retro style enhancements — CRT and vintage effects */
.ds-crt {
  position: relative;
}
.ds-crt::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
  z-index: 1;
}
.ds-crt::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
  z-index: 1;
}
.ds-vintage-noise {
  position: relative;
}
.ds-vintage-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
}
`,

  playful: `
/* Playful style enhancements — bounce and wiggle */
@keyframes ds-bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes ds-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}
.ds-bounce { animation: ds-bounce-in 0.6s ease both; animation-timeline: view(); animation-range: entry 20% cover 40%; }
.ds-wiggle:hover { animation: ds-wiggle 0.4s ease; }
`,

  sketch: `
/* Sketch style — rough edges and hand-drawn feel */
.ds-rough-border {
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}
.ds-paper-texture {
  background-color: #fefefe;
  background-image:
    linear-gradient(90deg, transparent 79px, rgba(72,128,172,0.1) 79px, rgba(72,128,172,0.1) 81px, transparent 81px),
    linear-gradient(#e8e8e8 0.5px, transparent 0.5px);
  background-size: 100% 1.8em;
}
`,

  flat: `
/* Flat/modern enhancements — card depth and layered shadows */
.ds-card-stack {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.ds-card-stack::before {
  content: '';
  position: absolute;
  inset: 4px;
  background: inherit;
  border-radius: inherit;
  z-index: -1;
  opacity: 0.3;
  transform: rotate(1deg);
  transition: transform 0.3s ease;
}
.ds-card-stack:hover {
  transform: translateY(-4px);
}
.ds-card-stack:hover::before {
  transform: rotate(2deg) translate(2px, 2px);
}
`,
};

/**
 * Inject modern CSS fallback into an HTML string.
 * Only injects what's missing — won't duplicate existing techniques.
 */
export function injectModernCSSFallback(html: string): string {
  // Check what's already present
  const hasScrollDriven = html.includes('animation-timeline:');
  const hasReducedMotion = html.includes('prefers-reduced-motion');
  const hasContentVisibility = html.includes('content-visibility');
  const hasClamp = html.includes('clamp(');

  // Build only the missing parts of the core CSS
  let injectedCSS = '\n/* === LANDINGFORGE MODERN CSS 2025 — Auto-injected fallback === */\n';

  if (!hasScrollDriven) {
    injectedCSS += `
@keyframes ds-reveal {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in, .fade-in-up {
  animation: ds-reveal linear both;
  animation-timeline: view();
  animation-range: entry 15% cover 45%;
}
`;
  }

  if (!hasContentVisibility) {
    injectedCSS += '\nsection, article { content-visibility: auto; contain-intrinsic-size: 0 600px; }\n';
  }

  if (!hasReducedMotion) {
    injectedCSS += `
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;
  }

  if (!hasClamp) {
    injectedCSS += `
h1 { font-size: clamp(1.75rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.4rem, 3.5vw, 2.5rem); }
h3 { font-size: clamp(1.15rem, 2.5vw, 1.75rem); }
`;
  }

  injectedCSS += '\nimg:not([width]) { max-width: 100%; height: auto; }\n';
  injectedCSS += '/* === END LANDINGFORGE MODERN CSS === */\n';

  // Only inject if there's something missing
  const hasAnythingMissing = !hasScrollDriven || !hasReducedMotion || !hasContentVisibility || !hasClamp;
  if (!hasAnythingMissing) {
    return html;
  }

  // Inject before closing </style> tag, or before </head> if no style tag
  if (html.includes('</style>')) {
    // Insert before the LAST </style> tag
    const lastStyleClose = html.lastIndexOf('</style>');
    return html.substring(0, lastStyleClose) + injectedCSS + '\n' + html.substring(lastStyleClose);
  } else if (html.includes('</head>')) {
    const headClose = html.indexOf('</head>');
    return html.substring(0, headClose) + '<style>' + injectedCSS + '</style>\n' + html.substring(headClose);
  }

  return html;
}
