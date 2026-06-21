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

  // Check if HTML uses JS-based fade-in (IntersectionObserver + .show/.visible class)
  const hasJsFadeIn = html.includes('IntersectionObserver') || html.includes("classList.add('show')") || html.includes('classList.add("show")') || html.includes('.fade-in.show') || html.includes('.fade-in.visible');

  if (!hasScrollDriven && !hasJsFadeIn) {
    // No animation system present — inject CSS scroll-driven as default
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
/* Fallback: if JS is unavailable, show content immediately */
@media (scripting: none) {
  .fade-in, .fade-in-up { opacity: 1 !important; transform: none !important; animation: none !important; }
}
`;
  } else if (!hasScrollDriven && hasJsFadeIn) {
    // JS-based fade-in exists — only inject the fallback, NOT the animation-timeline
    injectedCSS += `
/* Fallback: if JS is unavailable, show content immediately */
@media (scripting: none) {
  .fade-in, .fade-in-up { opacity: 1 !important; transform: none !important; }
}
/* Fallback: ensure .show/.visible class always shows content */
.fade-in.show, .fade-in-up.show, .fade-in.visible, .fade-in-up.visible { opacity: 1 !important; transform: none !important; }
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

  // Critical Tailwind-like utilities as native CSS fallback
  // These ensure layout works BEFORE Tailwind CDN loads
  const hasTailwind = html.includes('cdn.tailwindcss.com');
  if (hasTailwind) {
    injectedCSS += `
/* === CRITICAL TAILWIND FALLBACK (applies until CDN loads) === */
.flex{display:flex;}
.inline-flex{display:inline-flex;}
.grid{display:grid;}
.block{display:block;}
.inline-block{display:inline-block;}
.hidden{display:none;}
.items-center{align-items:center;}
.items-start{align-items:flex-start;}
.items-end{align-items:flex-end;}
.justify-center{justify-content:center;}
.justify-between{justify-content:space-between;}
.justify-end{justify-content:flex-end;}
.flex-col{flex-direction:column;}
.flex-row{flex-direction:row;}
.flex-wrap{flex-wrap:wrap;}
.flex-1{flex:1 1 0%;}
.flex-shrink-0{flex-shrink:0;}
.gap-1{gap:0.25rem;}
.gap-2{gap:0.5rem;}
.gap-3{gap:0.75rem;}
.gap-4{gap:1rem;}
.gap-6{gap:1.5rem;}
.gap-8{gap:2rem;}
.gap-12{gap:3rem;}
.relative{position:relative;}
.absolute{position:absolute;}
.fixed{position:fixed;}
.sticky{position:sticky;}
.inset-0{inset:0;}
.top-0{top:0;}
.left-0{left:0;}
.right-0{right:0;}
.z-10{z-index:10;}
.z-50{z-index:50;}
.w-full{width:100%;}
.h-full{height:100%;}
.min-h-screen{min-height:100vh;}
.max-w-xs{max-width:20rem;}
.max-w-sm{max-width:24rem;}
.max-w-md{max-width:28rem;}
.max-w-lg{max-width:32rem;}
.max-w-xl{max-width:36rem;}
.max-w-2xl{max-width:42rem;}
.max-w-3xl{max-width:48rem;}
.max-w-4xl{max-width:56rem;}
.max-w-5xl{max-width:64rem;}
.max-w-6xl{max-width:72rem;}
.max-w-7xl{max-width:80rem;}
.mx-auto{margin-left:auto;margin-right:auto;}
.mt-0{margin-top:0;}
.mt-1{margin-top:0.25rem;}
.mt-2{margin-top:0.5rem;}
.mt-3{margin-top:0.75rem;}
.mt-4{margin-top:1rem;}
.mt-6{margin-top:1.5rem;}
.mt-8{margin-top:2rem;}
.mt-12{margin-top:3rem;}
.mb-0{margin-bottom:0;}
.mb-2{margin-bottom:0.5rem;}
.mb-4{margin-bottom:1rem;}
.mb-6{margin-bottom:1.5rem;}
.mb-8{margin-bottom:2rem;}
.ml-0{margin-left:0;}
.mr-2{margin-right:0.5rem;}
.p-0{padding:0;}
.p-2{padding:0.5rem;}
.p-3{padding:0.75rem;}
.p-4{padding:1rem;}
.p-6{padding:1.5rem;}
.p-8{padding:2rem;}
.p-10{padding:2.5rem;}
.px-4{padding-left:1rem;padding-right:1rem;}
.px-6{padding-left:1.5rem;padding-right:1.5rem;}
.px-8{padding-left:2rem;padding-right:2rem;}
.py-2{padding-top:0.5rem;padding-bottom:0.5rem;}
.py-4{padding-top:1rem;padding-bottom:1rem;}
.py-8{padding-top:2rem;padding-bottom:2rem;}
.py-12{padding-top:3rem;padding-bottom:3rem;}
.py-16{padding-top:4rem;padding-bottom:4rem;}
.py-20{padding-top:5rem;padding-bottom:5rem;}
.py-24{padding-top:6rem;padding-bottom:6rem;}
.pt-4{padding-top:1rem;}
.pt-24{padding-top:6rem;}
.pb-4{padding-bottom:1rem;}
.text-center{text-align:center;}
.text-left{text-align:left;}
.text-right{text-align:right;}
.text-sm{font-size:0.875rem;line-height:1.25rem;}
.text-base{font-size:1rem;line-height:1.5rem;}
.text-lg{font-size:1.125rem;line-height:1.75rem;}
.text-xl{font-size:1.25rem;line-height:1.75rem;}
.text-2xl{font-size:1.5rem;line-height:2rem;}
.text-3xl{font-size:1.875rem;line-height:2.25rem;}
.text-4xl{font-size:2.25rem;line-height:2.5rem;}
.font-medium{font-weight:500;}
.font-semibold{font-weight:600;}
.font-bold{font-weight:700;}
.italic{font-style:italic;}
.underline{text-decoration:underline;}
.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.rounded{border-radius:0.25rem;}
.rounded-lg{border-radius:0.5rem;}
.rounded-xl{border-radius:0.75rem;}
.rounded-full{border-radius:9999px;}
.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px -1px rgba(0,0,0,0.1);}
.shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1);}
.overflow-hidden{overflow:hidden;}
.object-cover{object-fit:cover;}
.cursor-pointer{cursor:pointer;}
.opacity-0{opacity:0;}
.opacity-100{opacity:1;}
.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms;}
.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms;}
.duration-200{transition-duration:200ms;}
.duration-300{transition-duration:300ms;}
.ease-in-out{transition-timing-function:cubic-bezier(0.4,0,0.2,1);}
.translate-y-0{transform:translateY(0);}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0;}
.divider{border-bottom:1px solid #e5e7eb;}
.container{max-width:1280px;margin-left:auto;margin-right:auto;padding-left:1.5rem;padding-right:1.5rem;}
/* Responsive: hide desktop nav, show hamburger */
@media(max-width:768px){.nav-links{display:none!important;}.hamburger{display:flex!important;}}
/* md:hidden fallback — hide on medium+ screens (hamburger only visible on mobile) */
@media(min-width:769px){.md\:hidden{display:none!important;}}
/* md:flex-row fallback — keep hero CTA buttons horizontal on desktop */
@media(min-width:768px){.md\:flex-row{flex-direction:row!important;}.md\:grid-cols-3{grid-template-columns:repeat(3,1fr)!important;}.md\:grid-cols-4{grid-template-columns:repeat(4,1fr)!important;}}
/* lg:flex-row fallback — two-column layouts */
@media(min-width:1024px){.lg\:flex-row{flex-direction:row!important;}.lg\:w-1\/2{width:50%!important;}}
/* === END CRITICAL TAILWIND FALLBACK === */
`;
  }

  // Open Props design tokens — curated subset for consistent design system
  if (!html.includes('open-props') && !html.includes('--open-props')) {
    injectedCSS += `
/* === OPEN PROPS DESIGN TOKENS (curated subset) === */
:root {
  /* Spacing scale (4px base) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);

  /* Font sizes (modular scale 1.25) */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  /* Line heights */
  --line-height-tight: 1.1;
  --line-height-snug: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Letter spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;

  /* Transitions */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* Z-index scale */
  --z-10: 10;
  --z-20: 20;
  --z-30: 30;
  --z-40: 40;
  --z-50: 50;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-toast: 400;
}
/* === END OPEN PROPS DESIGN TOKENS === */
`;
  }

  // Scroll-margin-top for fixed header offset — prevents sections from hiding behind navbar
  // Scroll offset for fixed header — only inject if not already present
  if (!html.includes('scroll-padding-top') && !html.includes('scroll-margin-top')) {
    injectedCSS += '\n/* Fixed header offset — sections scroll below navbar */\nhtml { scroll-behavior: smooth; scroll-padding-top: 5rem; }\nsection[id] { scroll-margin-top: 5rem; }\nimg:not([width]) { max-width: 100%; height: auto; }\n';
  } else {
    injectedCSS += '\nimg:not([width]) { max-width: 100%; height: auto; }\n';
  }
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
