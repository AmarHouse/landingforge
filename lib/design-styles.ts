// Design style configurations for LandingForge
export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: 'sketch' | 'technical' | 'flat' | 'playful' | 'presentation' | 'artistic' | 'gaming' | 'retro' | 'landing';
  icon: string;
}

export const DESIGN_STYLES: DesignStyle[] = [
  // Default
  {
    id: 'default',
    name: 'Modern Web',
    description: 'Clean, modern web design with good UX practices',
    prompt: '',
    category: 'flat',
    icon: '🌐'
  },
  
  // Sketch styles
  {
    id: 'excalidraw',
    name: 'Excalidraw',
    description: 'Hand-drawn sketch style with rough edges',
    prompt: 'Design this in Excalidraw hand-drawn sketch style with rough, sketchy lines, imperfect shapes, and a whiteboard aesthetic. Use simple black lines on white background with minimal colors.',
    category: 'sketch',
    icon: '✏️'
  },
  {
    id: 'pencil-sketch',
    name: 'Pencil Sketch',
    description: 'Quick design doodle with pencil-like strokes',
    prompt: 'Create this design in pencil sketch style - less cartoonish than hand-drawn, more like a professional design doodle with clean pencil strokes, subtle shading, and architectural sketching techniques.',
    category: 'sketch',
    icon: '✎'
  },
  {
    id: 'chalkboard',
    name: 'Chalkboard',
    description: 'White chalk lines on dark background for teaching vibes',
    prompt: 'Design this in chalkboard diagram style with white or colored chalk lines on a dark background. Use a teaching-friendly aesthetic with clear diagrams, arrows, and educational visual elements.',
    category: 'sketch',
    icon: '🖤'
  },
  
  // Technical styles
  {
    id: 'blueprint',
    name: 'Blueprint',
    description: 'Technical plans with white lines on blue grid',
    prompt: 'Create this design in blueprint style with white lines on a blue grid background. Use technical drawing conventions, precise measurements, clean geometry, and architectural blueprint aesthetics.',
    category: 'technical',
    icon: '📐'
  },
  {
    id: 'monoline-wireframe',
    name: 'Monoline Wireframe',
    description: 'Single line thickness, no fills, low-fidelity UX',
    prompt: 'Design this as a monoline wireframe with consistent single line thickness, no fills or colors, just clean outlines. Focus on UX structure and layout hierarchy with minimal visual noise.',
    category: 'technical',
    icon: '📱'
  },
  {
    id: 'process-diagram',
    name: 'Process Diagram',
    description: 'Clean workflow visualization with connected steps',
    prompt: 'Design this as a process diagram with rounded rectangles, dashed border containers for grouping, flowing arrows connecting elements, and a soft pastel color palette (blues, greens, yellows, pinks). Use clean typography, hierarchical layout with logical flow, and organize content in clear sections with boundaries. Include subtle icons and maintain a professional technical documentation aesthetic.',
    category: 'technical',
    icon: '🔄'
  },
  {
    id: 'knowledge-graph',
    name: 'Knowledge Graph',
    description: 'AI agent workflow with connected nodes and reasoning',
    prompt: 'Design this as a knowledge graph/AI agent interface with interconnected nodes, circular elements, speech bubbles for AI thinking, network diagrams with coherence scores, multi-turn interaction flows, and robot/agent avatars. Use a clean technical aesthetic with connected knowledge networks, query-response patterns, and visual reasoning chains. Include graph visualizations, node relationships, and AI conversation elements.',
    category: 'technical',
    icon: '🧠'
  },
  
  // Flat design styles
  {
    id: 'material-design',
    name: 'Material Design',
    description: 'Google Material Design with solid colors and shadows',
    prompt: 'Create this design following Google Material Design principles with flat colors, subtle shadows, elevation layers, and modern UI components. Use the Material Design color palette and typography.',
    category: 'flat',
    icon: '🎨'
  },
  {
    id: 'isometric',
    name: 'Isometric',
    description: '3D-like angled views for architectural feel',
    prompt: 'Design this in isometric illustration style with angled 3D-like views. Use consistent isometric perspective, clean geometric shapes, and modern flat colors with subtle depth.',
    category: 'flat',
    icon: '📦'
  },
  {
    id: 'vector-icons',
    name: 'Vector Icon Set',
    description: 'Simplified icons with consistent stroke width',
    prompt: 'Create this design as a vector icon set style with simplified shapes, consistent stroke width throughout, minimal details, and a cohesive visual system. Focus on clarity and recognition.',
    category: 'flat',
    icon: '🔷'
  },
  
  // Playful styles
  {
    id: 'comic-panel',
    name: 'Comic Panel',
    description: 'Speech bubbles and halftone patterns',
    prompt: 'Design this in comic panel style with speech bubbles, thought clouds, halftone patterns, bold outlines, and vibrant colors. Use comic book visual language and dynamic layouts.',
    category: 'playful',
    icon: '💭'
  },
  {
    id: 'cartoon-doodle',
    name: 'Cartoon Doodle',
    description: 'Exaggerated, child-like shapes',
    prompt: 'Create this design in cartoon doodle style with exaggerated, child-like shapes, playful proportions, bright colors, and fun, approachable aesthetics. More animated than hand-drawn sketches.',
    category: 'playful',
    icon: '🎭'
  },
  {
    id: 'storybook',
    name: 'Storybook',
    description: 'Soft edges with watercolor-like whimsical feel',
    prompt: 'Design this in storybook illustration style with soft edges, watercolor-like fills, whimsical characters, gentle curves, and a dreamy, narrative-friendly aesthetic.',
    category: 'playful',
    icon: '📚'
  },
  
  // Presentation styles
  {
    id: 'infographic',
    name: 'Infographic',
    description: 'Clean data visuals with clear typography',
    prompt: 'Create this design as an infographic with clean data visualizations, clear typography hierarchy, charts and graphs, professional color scheme, and excellent readability for information presentation.',
    category: 'presentation',
    icon: '📊'
  },
  {
    id: 'corporate-slide',
    name: 'Corporate Slide',
    description: 'Professional presentation template style',
    prompt: 'Design this in corporate slide style similar to PowerPoint templates with semi-flat design, professional typography, consistent alignment, business-appropriate colors, and presentation-ready layout.',
    category: 'presentation',
    icon: '📋'
  },

  // Artistic & Creative styles
  {
    id: 'neon-synthwave',
    name: 'Neon Synthwave',
    description: 'Retro 80s with neon colors and cyber aesthetics',
    prompt: 'Create this design in neon synthwave style with vibrant neon colors (pink, cyan, purple), retro 80s aesthetics, glowing gradients, dark backgrounds, geometric patterns, and cyberpunk-inspired elements. Use futuristic fonts and grid overlays.',
    category: 'artistic',
    icon: '🌈'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft artistic watercolor effects with bleeding colors',
    prompt: 'Design this in watercolor painting style with soft, bleeding color effects, organic shapes, artistic brush strokes, gentle gradients, and a hand-painted aesthetic. Use muted, natural color palettes and fluid transitions.',
    category: 'artistic',
    icon: '🎨'
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    description: 'Bold colors and comic-style dots, Warhol-inspired',
    prompt: 'Create this design in pop art style with bold, contrasting colors, halftone dot patterns, comic book aesthetics, repetitive elements, and Andy Warhol-inspired visuals. Use bright, saturated colors and graphic elements.',
    category: 'artistic',
    icon: '🎭'
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    description: '1920s geometric patterns with gold accents',
    prompt: 'Design this in Art Deco style with geometric patterns, gold (#D4AF37) and black (#111111) color schemes, cream (#F6F1E7) backgrounds, elegant serif typography using fonts like Cinzel or Cormorant, symmetrical layouts, ornate golden lines, arches, geometric elegance, luxurious spacing, and 1920s hotel-five-star aesthetics. Use metallic gold accents and classic Art Deco proportions.',
    category: 'artistic',
    icon: '✨'
  },

  // Gaming & Interactive styles
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    description: 'Retro 8-bit video game aesthetics',
    prompt: 'Create this design in pixel art / 8-bit style with blocky, pixelated graphics, retro video game aesthetics, limited color palettes, sharp edges, and nostalgic gaming visuals. Use pixel-perfect alignment and classic game UI elements.',
    category: 'gaming',
    icon: '🎮'
  },
  {
    id: 'cyberpunk-terminal',
    name: 'Cyberpunk Terminal',
    description: 'Matrix-style green text on black, hacker aesthetic',
    prompt: 'Design this in cyberpunk terminal style with green monospace text on black backgrounds, Matrix-inspired aesthetics, glowing terminal effects, hacker interface elements, and futuristic command-line visuals.',
    category: 'gaming',
    icon: '💻'
  },
  {
    id: 'sci-fi-hud',
    name: 'Sci-Fi HUD',
    description: 'Futuristic heads-up display with glowing elements',
    prompt: 'Create this design as a sci-fi HUD (heads-up display) with futuristic interface elements, glowing blue/orange accents, holographic effects, transparent panels, and space-age technology aesthetics.',
    category: 'gaming',
    icon: '🚀'
  },

  // Retro & Vintage styles
  {
    id: 'retro-computer',
    name: 'Retro Computer',
    description: 'Early computer interface with CRT monitor aesthetics',
    prompt: 'Design this in retro computer style mimicking early personal computers with CRT monitor effects, scan lines, amber or green monochrome displays, blocky fonts, and 1980s computer interface aesthetics.',
    category: 'retro',
    icon: '🖥️'
  },
  {
    id: 'vintage-poster',
    name: 'Vintage Poster',
    description: 'Classic advertising poster with aged textures',
    prompt: 'Create this design as a vintage poster with aged paper textures, classic typography, muted color palettes, distressed effects, and retro advertising aesthetics from the 1940s-1960s era.',
    category: 'retro',
    icon: '📰'
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    description: 'Aesthetic with pink/purple gradients and marble statues',
    prompt: 'Design this in vaporwave aesthetic with pink and purple gradients, classical marble statues, geometric grids, retro computer graphics, palm trees, and dreamy nostalgic elements with a surreal, internet culture vibe.',
    category: 'retro',
    icon: '🌴'
  },

  // Additional Gaming styles
  {
    id: 'minecraft',
    name: 'Minecraft',
    description: 'Blocky, voxel-based design elements',
    prompt: 'Create this design in Minecraft style with blocky, voxel-based elements, pixelated textures, cubic shapes, earthy color palettes, and the distinctive block-building aesthetic of the popular game.',
    category: 'gaming',
    icon: '🟫'
  },

  // Additional Artistic styles
  {
    id: 'glitch-art',
    name: 'Glitch Art',
    description: 'Digital corruption effects and data moshing',
    prompt: 'Design this in glitch art style with digital corruption effects, RGB channel shifts, pixelated distortions, data moshing aesthetics, broken textures, and intentional digital artifacts for a cyberpunk, experimental feel.',
    category: 'artistic',
    icon: '📺'
  },
  {
    id: 'memphis-design',
    name: 'Memphis Design',
    description: 'Bold 80s postmodern with geometric shapes',
    prompt: 'Create this design in Memphis Design style with bold geometric shapes, bright contrasting colors, squiggly lines, abstract patterns, playful asymmetry, and 1980s postmodern aesthetics.',
    category: 'artistic',
    icon: '🔺'
  },

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE & WEB DESIGN STYLES
  // Premium, modern web design systems for high-conversion landing pages
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'neobrutalist',
    name: 'Neobrutalist',
    description: 'Aggressive contrast, solid borders, hard shadows — raw impact',
    prompt: 'Design this landing page in neobrutalist style: aggressive visual contrast with pure black (#000) and white (#FFF) as primary colors, accent colors of red (#FF3B30), yellow (#FFD60A), blue (#0057FF), and green (#00D26A). Use solid 4–8px borders on all elements, hard offset shadows (8px 8px 0px #000), large buttons with 60–72px height, bold typography using Inter Black or Space Grotesk Bold at 80–120px headlines. Grid: 12 columns with 24–40px gaps. Strong image crops, instant hover effects scaling to 102%. No rounded corners. Max container 1200–1440px. High urgency and personality. Hero section 100vh.',
    category: 'landing',
    icon: '🟥'
  },
  {
    id: 'swiss',
    name: 'Swiss / International',
    description: 'Absolute order, maximum clarity, rational hierarchy',
    prompt: 'Design this landing page in Swiss International Typographic Style: rigid 12-column grid, extreme whitespace with 60% content and 40% visual breathing room. Use Helvetica Neue, Inter, or Neue Haas Grotesk. Headlines 48–72px, body text 18px, line-height 1.5–1.8. Color palette: pure white (#FFFFFF), near-black (#111111), light gray (#E5E5E5), with one single accent color. Clean 1px divider lines, editorial photography, generous spacing throughout. Maximum clarity, rational hierarchy, museum-quality precision. Container max-width 1280px with 80–120px side padding.',
    category: 'landing',
    icon: '📐'
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Luxury serif typography with asymmetric grid — Vogue meets Financial Times',
    prompt: 'Design this landing page in editorial magazine style: use elegant serif fonts like Canela, Cormorant, or Playfair Display for headlines, and Inter or Source Sans for body text. Asymmetric grid with 2–5 columns, very wide spacing. Color palette: soft black (#1E1E1E), ivory (#FAF7F2), warm gray, and a warm accent like #B59B7A. Large high-quality hero images, generous whitespace, luxury feeling. Think Vogue magazine meets Financial Times meets Monocle. Headlines 48–64px with tight line-height 0.95–1.1. Container max-width 1280px. The aesthetic should feel curated and sophisticated.',
    category: 'landing',
    icon: '📰'
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass panels over luminous gradients — iOS premium futurism',
    prompt: 'Design this landing page in glassmorphism style: frosted glass cards with 20–40px backdrop blur, 8–20% opacity backgrounds, 1px rgba(255,255,255,0.2) borders, and very soft shadows. Background: vibrant luminous gradients using purple (#6D5DFC), cyan (#46C2FF), and lavender (#B388FF). Cards layered and overlapping, floating animations, gentle parallax on scroll. Typography: clean sans-serif (Inter or similar), headlines 48–72px. The overall feel should be premium futuristic like iOS interfaces. Container max-width 1200px. Subtle floating motion on elements.',
    category: 'landing',
    icon: '🫧'
  },
  {
    id: 'retro-futuristic',
    name: 'Retro Futuristic',
    description: 'The future imagined in 1986 — neon grids, controlled glow, cinematic',
    prompt: 'Design this landing page in retro-futuristic style inspired by 1980s visions of the future: use Eurostile, Space Grotesk, or Orbitron typography. Color palette: magenta (#FF00FF), cyan (#00FFFF), electric blue (#4D4DFF) on dark backgrounds (#0A0A0A). Neon grid overlays, controlled glow effects, cinematic hero sections with depth. Grid lines with subtle neon color. Headlines 56–80px with letter-spacing. Smooth hover transitions. The feeling should be Tron meets Blade Runner — technological optimism from 1986. Container max-width 1200px. Precise geometric elements.',
    category: 'landing',
    icon: '🤖'
  },
  {
    id: 'bauhaus',
    name: 'Bauhaus',
    description: 'Primary geometric forms, function above decoration',
    prompt: 'Design this landing page in Bauhaus style: use only primary geometric forms — circles, squares, and triangles — as compositional elements. Color palette strictly: red (#FF0000), yellow (#FFD500), blue (#0055FF), black (#000000), white (#FFFFFF). Typography: Futura or Montserrat, bold geometric letterforms. Grid-based geometric composition, strict alignment, form follows function principle. Large geometric shapes as section dividers and decorative elements. Headlines 48–64px. Clean, structured, with mathematical precision. Container max-width 1280px. Every element should feel intentionally placed within a geometric system.',
    category: 'landing',
    icon: '🔴'
  },
  {
    id: 'minimal-zen',
    name: 'Minimal',
    description: 'Remove everything that does not generate value — Apple modern aesthetic',
    prompt: 'Design this landing page in ultra-minimal style following the principle of removing everything that does not generate value: use only 2–3 colors maximum (white, near-black, one subtle accent). Gigantic whitespace between all sections — at least 120–160px section gaps. Single message hero section with 72–120px headline. Body text 16–20px with generous line-height 1.6–1.8. Typography: clean sans-serif (SF Pro, Inter). Minimal UI elements, no decoration, no gradients, no shadows. Just content and space. Container max-width 1200px with extreme side padding (80–120px). The feeling should be modern Apple — confident simplicity.',
    category: 'landing',
    icon: '◻️'
  },
  {
    id: 'flat-design-clean',
    name: 'Flat Design',
    description: 'No shadows, solid colors, vector simplicity — digital clarity',
    prompt: 'Design this landing page in flat design style: absolutely no shadows or gradients. Solid color fills only. Simple vector-style icons with consistent stroke width. Borders 1–2px only. Color palette: vibrant solid colors — choose 4–5 complementary flat colors. Clean sans-serif typography (Inter, Roboto), headlines 48–64px. Geometric shapes as decorative elements. All elements feel 2D and clean. Hover states change color only (no transforms). Container max-width 1280px. The aesthetic should feel like clear digital communication — think Duolingo or Slack brand style.',
    category: 'landing',
    icon: '🎨'
  },
  {
    id: 'neumorphic',
    name: 'Neumorphic',
    description: 'Soft extruded objects with dual shadows — physical softness',
    prompt: 'Design this landing page in neumorphic (soft UI) style: every interactive element and card should have dual shadows — a light shadow on top-left and a dark shadow on bottom-right — creating an extruded, soft, physical object feel. Background: light monochromatic color (#E0E5EC or similar). Border-radius 20–40px on all elements. Avoid insufficient contrast — ensure text remains highly readable. Typography: Inter or Roboto, headlines 48–64px. Subtle press/release effects on buttons (shadow inversion). Container max-width 1200px. The overall feeling should be a soft, tangible, physical object surface.',
    category: 'landing',
    icon: '🫥'
  },
  {
    id: 'monochromatic',
    name: 'Monochromatic',
    description: 'One single color with 10–15 tonalities — disciplined elegance',
    prompt: 'Design this landing page in monochromatic style: choose ONE base color and create 10–15 tonalities of it (from very light tints to very dark shades) for the entire design. All contrast comes from luminosity differences, not hue changes. Typography: clean sans-serif, headlines 48–64px in the darkest tone, body text in medium tone. Cards, backgrounds, borders — all variations of the single chosen color. Very generous spacing. Container max-width 1280px. The feeling should be disciplined elegance — like a luxury brand with extreme color restraint.',
    category: 'landing',
    icon: '🔘'
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    description: 'Nordic premium living — natural materials, light, and space',
    prompt: 'Design this landing page in Scandinavian design style: warm neutral palette — off-white (#F7F4EF), warm sand (#EAE3D7), stone (#D8CFC1), charcoal (#444444). Typography: Inter or Avenir, clean and friendly. Elements suggesting natural materials — wood grain textures, linen patterns, soft natural light feel. Very generous spacing (120–160px between sections). Rounded corners 12–16px. Subtle warm shadows. Hero section with natural photography feel. Container max-width 1280px. The overall feeling should be a premium Nordic home — warm, light, calm, sophisticated.',
    category: 'landing',
    icon: '🪵'
  },
  {
    id: 'japandi',
    name: 'Japandi',
    description: 'Zen calm meets Scandinavian warmth — stone, ceramic, light wood',
    prompt: 'Design this landing page in Japandi style (Japanese + Scandinavian fusion): palette of warm neutrals — cream (#EDE6D6), sand (#C8B9A6), warm brown (#6D6258), near-black (#2D2D2D). Elements suggesting stone, ceramic, and light wood textures. Zen-inspired layout with extreme balance and negative space. Typography: clean sans-serif, headlines 48–64px. Border-radius 8–16px. Minimal decorative elements — let materials and space speak. Horizontal lines as dividers. Container max-width 1200px with generous padding. The feeling should be sophisticated calm — a Japanese tea room meets Danish design studio.',
    category: 'landing',
    icon: '🍵'
  },
  {
    id: 'dark-mode-first',
    name: 'Dark Mode First',
    description: 'Premium technology aesthetic — dark backgrounds, neon accents, WCAG AAA',
    prompt: 'Design this landing page in dark mode first style: backgrounds using very dark tones (#050505, #0A0A0A, #111111) for depth. Text in light colors (#F5F5F5) with WCAG AAA contrast compliance. Accent colors: electric purple, blue, or cyan used sparingly for CTAs and highlights. Typography: Inter or Space Grotesk, headlines 48–72px in white, body in light gray. Cards with subtle border using rgba(255,255,255,0.08) and very slight elevation. Smooth transitions between dark surfaces. Container max-width 1280px. The feeling should be premium technology — like Linear, Vercel, or Raycast.',
    category: 'landing',
    icon: '🌙'
  },
  {
    id: 'modernist',
    name: 'Modernist',
    description: 'Function above decoration — rigorous grid, timeless design',
    prompt: 'Design this landing page in modernist style: function above all decoration. Rigorous grid system, Helvetica or Inter typography, every element serves a purpose. Black, white, and gray as primary palette with one functional accent color. Headlines 48–64px, strong hierarchy through size and weight only. No decorative elements, no gradients, no shadows. Generous whitespace. Clean horizontal and vertical alignment. Container max-width 1280px. The feeling should be timeless — like Bauhaus evolved into digital, a modernist building translated to web.',
    category: 'landing',
    icon: '🧊'
  },
  {
    id: 'organic-fluid',
    name: 'Organic / Fluid',
    description: 'Blobs, fluid masks, morphing animations — human meets technology',
    prompt: 'Design this landing page in organic fluid style: use blob shapes, fluid SVG masks, and large border-radius (32–64px) on all containers. Smooth morphing animations on scroll. Nature-inspired refined color palette — earthy greens, warm terracotta, soft sky blue. Typography: clean rounded sans-serif, headlines 48–64px. Wavy section dividers using SVG paths. Soft, flowing layout with no hard edges. Gentle hover transitions. Container max-width 1200px with rounded corners everywhere. The feeling should be human technology — organic forms meeting digital precision.',
    category: 'landing',
    icon: '🌊'
  },
  {
    id: 'corporate-professional',
    name: 'Corporate Professional',
    description: 'Consolidated enterprise — institutional blue, logos, KPIs, testimonials',
    prompt: 'Design this landing page in corporate professional style: institutional blue palette — primary (#0B5FFF), light background (#F5F7FA), dark text (#1A1A1A). Typography: Inter or IBM Plex Sans, headlines 48–64px. Include visual zones for: company logos (partner bar), customer testimonials with photos, KPI statistics counters, case studies, and trust signals. Clean grid layout, 12 columns, generous spacing. Cards with subtle shadows. Professional photography feel. Container max-width 1280px. The feeling should be an established, trustworthy company — think Stripe, IBM, or Salesforce.',
    category: 'landing',
    icon: '🏢'
  },
  {
    id: 'tech-forward',
    name: 'Tech Forward',
    description: 'Next generation — electric colors, dashboards, AI/analytics components',
    prompt: 'Design this landing page in tech-forward style: electric blue, purple, and cyan as accent colors on dark or very light backgrounds. Typography: Space Grotesk, Satoshi, or Inter — bold, geometric, modern. Headlines 48–72px. Include visual components suggesting dashboards, AI interfaces, analytics charts, and data visualizations. Gradient accents on key elements. Clean card layouts with subtle borders. Smooth hover animations. Terminal-like code snippets or API examples as decorative elements. Container max-width 1280px. The feeling should be next-generation technology — like a product that is building the future.',
    category: 'landing',
    icon: '⚡'
  },
  {
    id: 'luxury-minimal',
    name: 'Luxury Minimal',
    description: 'Silent luxury — gold accents, extreme whitespace, editorial premium',
    prompt: 'Design this landing page in luxury minimal style: pristine white (#FFFFFF) and near-black (#111111) as primary colors, with gold (#D4AF37) used very sparingly for accent details (borders, thin lines, small highlights). Typography: Canela or Neue Haas Grotesk — elegant, refined. Headlines 48–64px with generous letter-spacing. Extreme whitespace — sections separated by 160px+. Editorial-quality imagery. Hairline dividers (1px). No shadows, no gradients, no decoration — just purity and restraint. Container max-width 1200px with 100px+ side padding. The feeling should be silent luxury — like Hermès, Aesop, or Bottega Veneta.',
    category: 'landing',
    icon: '👑'
  },
  {
    id: 'neo-geo',
    name: 'Neo Geo',
    description: 'Repetitive geometry, mathematical patterns — algorithmic art',
    prompt: 'Design this landing page in Neo Geo style: use repetitive geometric patterns as backgrounds and decorative elements — tessellations, mathematical grids, fractal-inspired layouts. Modular grid system with strict geometric alignment. Color palette: bold primaries or a sophisticated limited palette. Typography: clean geometric sans-serif, headlines 48–64px. Pattern blocks as section backgrounds. Geometric shapes (hexagons, triangles, diamonds) used as content containers. Container max-width 1280px. The feeling should be algorithmic art — like a generative design system made into a landing page.',
    category: 'landing',
    icon: '⬡'
  },
  {
    id: 'kinetic',
    name: 'Kinetic',
    description: 'Movement as main element — scroll-driven narrative, controlled energy',
    prompt: 'Design this landing page in kinetic style: movement is the primary design element. Scroll-driven narrative with elements that animate as they enter viewport. Animations ranging 150–600ms with easing. Parallax backgrounds, text reveal animations, staggered fade-ins, horizontal scroll sections. Typography: bold modern sans-serif, headlines 48–72px that animate on scroll. Color palette: high contrast with one vibrant accent. Every section should feel alive with controlled motion. Container max-width 1280px. The feeling should be controlled energy — like Apple product pages or Stripe animations.',
    category: 'landing',
    icon: '🎬'
  },
  {
    id: 'gradient-modern',
    name: 'Gradient Modern',
    description: 'Rich 3–5 color gradients, orbs, and light effects — premium SaaS',
    prompt: 'Design this landing page in gradient modern style: rich gradients using 3–5 colors — try purple (#7F5AF0), green (#2CB67D), cyan (#00D4FF) or similar vibrant combinations. Use gradients on backgrounds, large floating orb shapes, and subtle light effects. Typography: clean sans-serif (Inter, Plus Jakarta Sans), headlines 48–72px in white or dark. Cards with glass-like borders. Smooth gradient animations on hover. Blob shapes with gradient fills as decorative elements. Container max-width 1280px. The feeling should be premium modern SaaS — like Linear, Raycast, or Arc browser.',
    category: 'landing',
    icon: '🌈'
  },
  {
    id: 'typography-first',
    name: 'Typography First',
    description: 'Headlines 80–160px, layout built around text — design through words',
    prompt: 'Design this landing page in typography-first style: headlines are the hero — 80–160px bold/black weight, filling the viewport width. The entire layout is constructed around the text itself. Images are secondary, small, or used as texture. Typography: Inter Black, Space Grotesk, or similar ultra-bold sans-serif. Headlines may break across lines creatively. Body text 16–20px for contrast. Very generous line-height on body (1.6–1.8), tight on headlines (0.9–1.0). Limited color palette — text color and one accent. Container max-width 1440px. The feeling should be design through the power of the word — like typography posters translated to web.',
    category: 'landing',
    icon: '🔤'
  },
  {
    id: 'metropolitan',
    name: 'Metropolitan',
    description: 'Global sophisticated capital — concrete, graphite, steel, urban photography',
    prompt: 'Design this landing page in metropolitan style inspired by global cities — New York, London, Tokyo, Milan. Color palette: concrete gray, graphite, steel, black — urban industrial tones. Photography: architecture, fashion, cityscapes as hero imagery. Typography: modern sans-serif with editorial sensibility, headlines 48–64px. Grid with strong vertical lines suggesting skyscrapers. Subtle metallic or concrete textures. 1px borders in gray tones. Generous spacing with editorial rhythm. Container max-width 1280px. The feeling should be a sophisticated global capital — like Monocle magazine meets a luxury real estate brand.',
    category: 'landing',
    icon: '🏙️'
  }
];

export const STYLE_CATEGORIES = {
  sketch: { name: 'Sketch & Hand-drawn', icon: '✏️' },
  technical: { name: 'Technical & Wireframes', icon: '📐' },
  flat: { name: 'Flat & Modern', icon: '🎨' },
  playful: { name: 'Playful & Creative', icon: '🎭' },
  presentation: { name: 'Professional & Data', icon: '📊' },
  artistic: { name: 'Artistic & Visual', icon: '🌈' },
  gaming: { name: 'Gaming & Futuristic', icon: '🎮' },
  retro: { name: 'Retro & Vintage', icon: '📼' },
  landing: { name: 'Landing Page & Web Design', icon: '🌐' }
} as const;

export const getStyleById = (id: string): DesignStyle | undefined => {
  // First check built-in styles
  const builtInStyle = DESIGN_STYLES.find(style => style.id === id);
  if (builtInStyle) return builtInStyle;
  
  // Then check custom styles if in browser environment
  if (typeof window !== 'undefined') {
    try {
      const customStyles = JSON.parse(localStorage.getItem('customDesignStyles') || '[]') as DesignStyle[];
      return customStyles.find(style => style.id === id);
    } catch {
      return undefined;
    }
  }
  
  return undefined;
};

export const getStylesByCategory = (category: keyof typeof STYLE_CATEGORIES): DesignStyle[] => {
  return DESIGN_STYLES.filter(style => style.category === category);
};
