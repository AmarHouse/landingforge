/**
 * Design Intelligence Module
 * Based on ui-ux-pro-max-skill research data (161 industries, 67 styles, 161 palettes, 57 typography pairings).
 * Provides industry-specific design recommendations for AI-generated landing pages.
 */

export interface IndustryDesignProfile {
  name: string;
  style: string;
  colorMood: string;
  typographyMood: string;
  keyEffects: string[];
  antiPatterns: string[];
  landingPattern: string;
}

/** Core industry → design mapping (top 30 most common use cases) */
export const INDUSTRY_PROFILES: Record<string, IndustryDesignProfile> = {
  hotel: {
    name: 'Hotel & Hospitality',
    style: 'Soft UI Evolution + Hero-Centric',
    colorMood: 'Trust blue, warm gold accents, calming earth tones',
    typographyMood: 'Elegant serif + clean sans-serif',
    keyEffects: ['Soft shadows', 'Smooth hover transitions (200-300ms)', 'Parallax hero'],
    antiPatterns: ['Neon colors', 'Harsh animations', 'Dark mode for luxury', 'AI purple gradients'],
    landingPattern: 'Hero-Centric + Social Proof',
  },
  restaurant: {
    name: 'Restaurant & Food',
    style: 'Warm Editorial + Conversion-Optimized',
    colorMood: 'Warm reds, earthy browns, appetizing golds',
    typographyMood: 'Artisanal serif + friendly sans-serif',
    keyEffects: ['Food image zoom on hover', 'Smooth scroll to menu', 'Warm gradient overlays'],
    antiPatterns: ['Cold blue tones', 'Minimal whitespace (food needs space)', 'Sans-serif only'],
    landingPattern: 'Social Proof-Focused + Hero-Centric',
  },
  saas: {
    name: 'SaaS / Software',
    style: 'Glassmorphism + Feature-Rich Showcase',
    colorMood: 'Trust blue (#2563EB), energetic orange accent (#EA580C)',
    typographyMood: 'Modern geometric sans-serif',
    keyEffects: ['Glassmorphic cards', 'Scroll-triggered animations', 'Animated counters', 'Gradient mesh backgrounds'],
    antiPatterns: ['AI purple/pink gradients for B2B', 'Overly playful for enterprise', 'Dark mode default for B2B'],
    landingPattern: 'Feature-Rich Showcase + Conversion-Optimized',
  },
  ecommerce: {
    name: 'E-commerce',
    style: 'Clean Conversion + Product Showcase',
    colorMood: 'Success green (#059669), urgency orange (#EA580C)',
    typographyMood: 'Clean, readable sans-serif',
    keyEffects: ['Product image hover zoom', 'Quick-view modals', 'Smooth cart animations', 'Trust badges'],
    antiPatterns: ['Distracting backgrounds', 'Complex animations near CTAs', 'Low-contrast product info'],
    landingPattern: 'Conversion-Optimized + Social Proof-Focused',
  },
  healthcare: {
    name: 'Healthcare & Medical',
    style: 'Accessible & Ethical + Trust-First',
    colorMood: 'Calm teal (#0891B2), healing green (#059669)',
    typographyMood: 'Professional, highly readable sans-serif',
    keyEffects: ['Subtle trust indicators', 'Clear CTAs', 'Appointment booking flow'],
    antiPatterns: ['Playful animations', 'Dark themes', 'Low contrast', 'Complex interactions'],
    landingPattern: 'Trust & Authority + Conversion-Optimized',
  },
  fitness: {
    name: 'Fitness & Wellness',
    style: 'Bold + Motivational',
    colorMood: 'Energetic red/orange, motivational dark + accent',
    typographyMood: 'Bold condensed headers + clean body',
    keyEffects: ['Full-bleed hero images', 'Scroll-triggered reveals', 'Progress animations'],
    antiPatterns: ['Soft/pastel colors (too calm)', 'Small text', 'Weak CTAs'],
    landingPattern: 'Hero-Centric + Social Proof-Focused',
  },
  creative: {
    name: 'Creative Agency / Portfolio',
    style: 'Brutalism or Minimal & Direct',
    colorMood: 'Monochrome or bold accent',
    typographyMood: 'Expressive display + clean body',
    keyEffects: ['Micro-interactions', 'Cursor effects', 'Scroll-driven storytelling', 'Kinetic typography'],
    antiPatterns: ['Generic corporate look', 'Stock photo overuse', 'Cookie-cutter templates'],
    landingPattern: 'Storytelling-Driven + Interactive Product Demo',
  },
  finance: {
    name: 'Fintech / Banking',
    style: 'Minimal & Professional',
    colorMood: 'Deep navy (#0F172A), trust blue, positive green for data',
    typographyMood: 'Corporate trust sans-serif',
    keyEffects: ['Data visualization', 'Number animations', 'Secure feel indicators'],
    antiPatterns: ['AI purple/pink gradients', 'Playful animations', 'Dark mode default', 'Neon accents'],
    landingPattern: 'Trust & Authority + Feature-Rich Showcase',
  },
  education: {
    name: 'Education / E-learning',
    style: 'Accessible & Friendly',
    colorMood: 'Focus indigo (#4F46E5), energetic orange accent',
    typographyMood: 'Friendly, readable sans-serif',
    keyEffects: ['Progress indicators', 'Interactive previews', 'Smooth transitions'],
    antiPatterns: ['Overly corporate', 'Small text', 'Complex navigation', 'Dark themes'],
    landingPattern: 'Feature-Rich Showcase + Social Proof-Focused',
  },
  real_estate: {
    name: 'Real Estate',
    style: 'Premium Minimal + Property Showcase',
    colorMood: 'Luxury dark + gold accents, trust navy',
    typographyMood: 'Elegant serif headers + clean body',
    keyEffects: ['Image galleries with smooth transitions', 'Map integration', 'Virtual tour previews'],
    antiPatterns: ['Cluttered layouts', 'Low-quality images', 'Weak CTAs', 'Generic stock photos'],
    landingPattern: 'Hero-Centric + Feature-Rich Showcase',
  },
  legal: {
    name: 'Legal / Law Firm',
    style: 'Trust & Authority',
    colorMood: 'Deep navy, gold accents, conservative palette',
    typographyMood: 'Authoritative serif headers + professional body',
    keyEffects: ['Subtle trust indicators', 'Clear credentials display', 'Professional photography'],
    antiPatterns: ['Playful elements', 'Bright colors', 'Casual language', 'Complex animations'],
    landingPattern: 'Trust & Authority + Conversion-Optimized',
  },
  travel: {
    name: 'Travel & Tourism',
    style: 'Hero-Centric + Storytelling',
    colorMood: 'Sky blue, sunset warm tones, nature greens',
    typographyMood: 'Adventurous display + readable body',
    keyEffects: ['Full-bleed hero images', 'Parallax scrolling', 'Smooth destination reveals'],
    antiPatterns: ['Small hero images', 'Text-heavy without visuals', 'Generic layouts'],
    landingPattern: 'Hero-Centric + Storytelling-Driven',
  },
  beauty: {
    name: 'Beauty / Spa / Wellness',
    style: 'Soft UI Evolution + Luxury',
    colorMood: 'Soft pink (#E8B4B8), sage green (#A8D5BA), gold accents (#D4AF37)',
    typographyMood: 'Elegant serif + clean sans-serif',
    keyEffects: ['Soft shadows', 'Gentle hover states', 'Calming gradients', 'Subtle parallax'],
    antiPatterns: ['Bright neon colors', 'Harsh animations', 'Dark mode', 'AI purple/pink gradients'],
    landingPattern: 'Hero-Centric + Social Proof',
  },
  gaming: {
    name: 'Gaming',
    style: 'Cyberpunk UI / Neon',
    colorMood: 'Neon green (#39FF14), electric purple, hot pink, deep black',
    typographyMood: 'Bold condensed + monospace accents',
    keyEffects: ['Neon glow effects', 'CRT scanlines', 'Glitch animations', 'Particle effects'],
    antiPatterns: ['Soft/pastel colors', 'Minimal design', 'Corporate look', 'Small text'],
    landingPattern: 'Interactive Product Demo + Hero-Centric',
  },
};

/** Curated color palettes by mood (hex values) */
export const COLOR_MOODS: Record<string, { primary: string; secondary: string; accent: string; bg: string; text: string; notes: string }> = {
  'trust-blue': {
    primary: '#2563EB',
    secondary: '#1E40AF',
    accent: '#EA580C',
    bg: '#F8FAFC',
    text: '#0F172A',
    notes: 'Professional, trustworthy. Perfect for SaaS, B2B, finance.',
  },
  'warm-luxury': {
    primary: '#D4AF37',
    secondary: '#1C1917',
    accent: '#E8B4B8',
    bg: '#FFF5F5',
    text: '#2D3436',
    notes: 'Elegant, premium feel. Perfect for hotels, spas, luxury brands.',
  },
  'nature-calm': {
    primary: '#059669',
    secondary: '#0891B2',
    accent: '#F59E0B',
    bg: '#F0FDF4',
    text: '#14532D',
    notes: 'Calming, natural. Perfect for wellness, eco, travel.',
  },
  'bold-creative': {
    primary: '#EC4899',
    secondary: '#8B5CF6',
    accent: '#06B6D4',
    bg: '#FDF2F8',
    text: '#1E1B4B',
    notes: 'Energetic, creative. Perfect for agencies, creative portfolios.',
  },
  'dark-professional': {
    primary: '#0F172A',
    secondary: '#1E293B',
    accent: '#22C55E',
    bg: '#0F172A',
    text: '#F8FAFC',
    notes: 'Serious, data-focused. Perfect for dashboards, fintech.',
  },
  'warm-restaurant': {
    primary: '#DC2626',
    secondary: '#92400E',
    accent: '#F59E0B',
    bg: '#FFFBEB',
    text: '#451A03',
    notes: 'Appetizing, warm. Perfect for restaurants, food, culinary.',
  },
  'healthcare-calm': {
    primary: '#0891B2',
    secondary: '#059669',
    accent: '#0EA5E9',
    bg: '#F0FDFA',
    text: '#134E4A',
    notes: 'Calm, healing. Perfect for healthcare, medical, dental.',
  },
  'edu-focus': {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    accent: '#EA580C',
    bg: '#EEF2FF',
    text: '#1E1B4B',
    notes: 'Focused, energetic. Perfect for education, e-learning.',
  },
  'gaming-neon': {
    primary: '#7C3AED',
    secondary: '#F43F5E',
    accent: '#39FF14',
    bg: '#0A0A0A',
    text: '#FAFAFA',
    notes: 'Electric, action. Perfect for gaming, entertainment.',
  },
  'minimal-mono': {
    primary: '#18181B',
    secondary: '#2563EB',
    accent: '#F59E0B',
    bg: '#FFFFFF',
    text: '#18181B',
    notes: 'Clean, focused. Perfect for portfolios, developer tools.',
  },
};

/** Typography pairings by mood */
export const TYPOGRAPHY_MOODS: Record<string, { heading: string; body: string; googleFonts: string; notes: string }> = {
  'elegant-serif': {
    heading: 'Playfair Display',
    body: 'Inter',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap',
    notes: 'Luxury, fashion, spa, editorial. Classic elegance.',
  },
  'modern-geometric': {
    heading: 'Space Grotesk',
    body: 'DM Sans',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap',
    notes: 'Tech, SaaS, startups. Clean and modern.',
  },
  'professional-corporate': {
    heading: 'Lexend',
    body: 'Source Sans 3',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap',
    notes: 'Finance, healthcare, B2B. Trust and readability.',
  },
  'friendly-warm': {
    heading: 'Poppins',
    body: 'Open Sans',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap',
    notes: 'Education, lifestyle, food. Approachable and warm.',
  },
  'bold-impact': {
    heading: 'Bebas Neue',
    body: 'Inter',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap',
    notes: 'Fitness, gaming, sports. High impact headlines.',
  },
  'editorial-sophisticated': {
    heading: 'Cormorant Garamond',
    body: 'Montserrat',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap',
    notes: 'Spa, wellness, beauty, luxury. Sophisticated calm.',
  },
  'tech-mono': {
    heading: 'JetBrains Mono',
    body: 'IBM Plex Sans',
    googleFonts: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap',
    notes: 'Developer tools, documentation, code-focused.',
  },
  'clean-minimal': {
    heading: 'Inter',
    body: 'Inter',
    googleFonts: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    notes: 'Universal clean. Works for almost anything.',
  },
};

/** Landing page patterns with section structures */
export const LANDING_PATTERNS: Record<string, { name: string; sections: string[]; bestFor: string }> = {
  'hero-centric': {
    name: 'Hero-Centric Design',
    sections: ['Hero', 'Social Proof Logos', 'Features', 'How It Works', 'Testimonials', 'CTA Banner', 'Footer'],
    bestFor: 'Products with strong visual identity, hotels, travel, restaurants',
  },
  'conversion-optimized': {
    name: 'Conversion-Optimized',
    sections: ['Hero + CTA', 'Problem', 'Solution', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'Final CTA', 'Footer'],
    bestFor: 'Lead generation, SaaS, sales pages',
  },
  'feature-rich': {
    name: 'Feature-Rich Showcase',
    sections: ['Hero', 'Features Grid', 'Deep Dive Sections', 'Integration/Compatibility', 'Pricing', 'Testimonials', 'FAQ', 'Footer'],
    bestFor: 'SaaS, complex products, developer tools',
  },
  'social-proof': {
    name: 'Social Proof-Focused',
    sections: ['Hero', 'Stats/Numbers', 'Testimonials Carousel', 'Case Studies', 'Trust Badges', 'CTA', 'Footer'],
    bestFor: 'Services, B2C, agencies, consulting',
  },
  'storytelling': {
    name: 'Storytelling-Driven',
    sections: ['Hero', 'Origin Story', 'Mission', 'Team', 'Impact/Results', 'Testimonials', 'CTA', 'Footer'],
    bestFor: 'Brands, agencies, nonprofits, mission-driven',
  },
};

/** Pre-delivery quality checklist */
export const PRE_DELIVERY_CHECKLIST = [
  'cursor-pointer on all clickable elements',
  'Hover states with smooth transitions (150-300ms)',
  'Text contrast 4.5:1 minimum (WCAG AA)',
  'Focus states visible for keyboard navigation',
  'prefers-reduced-motion respected',
  'Responsive: 375px, 768px, 1024px, 1440px',
  'No emojis as icons (use Pexels images or SVGs)',
  'Loading="lazy" on off-screen images',
  'Explicit width/height on images to prevent CLS',
  'No broken links or missing images',
  'Semantic HTML: header, nav, main, section, footer',
  'Heading hierarchy: h1 → h2 → h3, never skip',
  'Mobile hamburger menu works',
  'Smooth scroll for anchor links',
  'Form validation with clear error messages',
];

/** Detect the most likely industry from a user prompt */
export function detectIndustry(prompt: string): string {
  const lower = prompt.toLowerCase();
  const checks: [RegExp, string][] = [
    [/\b(hotel|pousada|resort|hostel|airbnb|inn|motel|hospedagem)\b/i, 'hotel'],
    [/\b(restaurant|restaurante|cafe|cafeteria|pizzaria|hamburger|food|culinaria|delivery|bar|pub|lanchonete)\b/i, 'restaurant'],
    [/\b(saas|software|app|plataforma|dashboard|ferramenta|tool|startup)\b/i, 'saas'],
    [/\b(loja|store|ecommerce|shop|produto|product|comprar|buy|marketplace)\b/i, 'ecommerce'],
    [/\b(sa[uú]de|health|m[eé]dic[oa]|cl[ií]nic[aá]?|hospital|dentist|pharmacy|farm[aá]cia|medicina|wellness|spa)\b/i, 'healthcare'],
    [/\b(gym|fitness|academia|workout|personal trainer|crossfit|yoga|pilates)\b/i, 'fitness'],
    [/\b(agency|agencia|portfolio|designer|criativo|creative|studio|freelancer)\b/i, 'creative'],
    [/\b(fintech|bank|banco|finance|financeiro|invest|crypto|pagamento|payment)\b/i, 'finance'],
    [/\b(escola|school|curso|course|education|educacao|university|universidade|e-learning)\b/i, 'education'],
    [/\b(imovel|real estate|apartamento|casa|property|condominio|mobili)\b/i, 'real_estate'],
    [/\b(advocacia|law|legal|escritorio|advogado|attorney)\b/i, 'legal'],
    [/\b(viagem|travel|turismo|tourism|passagem|destino|destination)\b/i, 'travel'],
    [/\b(gaming|game|jogo|esports|streamer|gamer)\b/i, 'gaming'],
  ];

  for (const [regex, industry] of checks) {
    if (regex.test(lower)) return industry;
  }
  return 'saas'; // default
}

/** Get the design profile for an industry */
export function getIndustryProfile(industry: string): IndustryDesignProfile {
  return INDUSTRY_PROFILES[industry] || INDUSTRY_PROFILES.saas;
}

/** Generate a design system reference string for injection into prompts */
export function getDesignSystemReference(prompt: string): string {
  const industry = detectIndustry(prompt);
  const profile = getIndustryProfile(industry);
  const mood = profile.colorMood.includes('warm') || profile.colorMood.includes('gold')
    ? 'warm-luxury'
    : profile.colorMood.includes('neon') || profile.colorMood.includes('electric')
      ? 'gaming-neon'
      : profile.colorMood.includes('calm') || profile.colorMood.includes('heal')
        ? 'healthcare-calm'
        : 'trust-blue';
  const colorSet = COLOR_MOODS[mood] || COLOR_MOODS['trust-blue'];

  const typoMood = profile.typographyMood.includes('elegant') || profile.typographyMood.includes('serif')
    ? 'elegant-serif'
    : profile.typographyMood.includes('bold') || profile.typographyMood.includes('condensed')
      ? 'bold-impact'
      : profile.typographyMood.includes('modern') || profile.typographyMood.includes('geometric')
        ? 'modern-geometric'
        : 'clean-minimal';
  const typoSet = TYPOGRAPHY_MOODS[typoMood] || TYPOGRAPHY_MOODS['clean-minimal'];

  const pattern = LANDING_PATTERNS[profile.landingPattern.split('+')[0].trim().toLowerCase().replace(/ /g, '-')]
    || LANDING_PATTERNS['hero-centric'];

  return `
🎨 DESIGN INTELLIGENCE — Industry: ${profile.name}

STYLE: ${profile.style}
COLORS (use these EXACT hex values):
- Primary: ${colorSet.primary}
- Secondary: ${colorSet.secondary}
- Accent/CTA: ${colorSet.accent}
- Background: ${colorSet.bg}
- Text: ${colorSet.text}
- Notes: ${colorSet.notes}

TYPOGRAPHY:
- Headings: ${typoSet.heading}
- Body: ${typoSet.body}
- Google Fonts: ${typoSet.googleFonts}

KEY EFFECTS: ${profile.keyEffects.join(' + ')}
AVOID (anti-patterns): ${profile.antiPatterns.join(', ')}

LANDING PAGE PATTERN: ${pattern.name}
Recommended sections: ${pattern.sections.join(' → ')}

PRE-DELIVERY CHECKLIST (verify all):
${PRE_DELIVERY_CHECKLIST.map(c => `- [ ] ${c}`).join('\n')}
`;
}
