/**
 * Prompt Enhancer
 * Processes raw user prompts before sending to the AI for HTML generation.
 * Detects business type, enriches with best practices, cleans noise, and
 * ensures critical information is present.
 */

import { detectIndustry, getIndustryProfile } from "./design-intelligence";

/* ──────────────────────────────────────────────────────────────────────
 * Business Context Extraction
 * ────────────────────────────────────────────────────────────────────── */

export interface BusinessContext {
  /** Detected industry (hotel, restaurant, saas, etc.) */
  industry: string;
  /** Business name extracted from prompt */
  businessName: string | null;
  /** Location extracted from prompt */
  location: string | null;
  /** Contact info extracted from prompt */
  contactInfo: { phone?: string; email?: string; website?: string; whatsapp?: string } | null;
  /** Whether the prompt mentions pricing */
  hasPricing: boolean;
  /** Whether the prompt mentions testimonials/reviews */
  hasTestimonials: boolean;
  /** Whether the prompt mentions FAQ */
  hasFaq: boolean;
  /** Whether the prompt mentions contact section */
  hasContact: boolean;
  /** Detected language (pt, en, es, etc.) */
  language: string;
  /** Whether the prompt is a follow-up edit (not initial generation) */
  isFollowUp: boolean;
  /** Original prompt text */
  originalPrompt: string;
}

/** Detect the primary language of the prompt */
function detectLanguage(prompt: string): string {
  const lower = prompt.toLowerCase();
  // Portuguese indicators
  if (/\b(pousada|restaurante|clínic|loja|escola|advogac|escritório|telefone|whatsapp|orçamento|gostaria|preciso|fazer|criar| site| landing)\b/i.test(lower)) return "pt";
  // Spanish indicators
  if (/\b(hotel|tienda|clínica|escuela|abogado|teléfono|quiero|necesito|hacer|crear)\b/i.test(lower)) return "es";
  // Default to English
  return "en";
}

/** Extract business name from common patterns */
function extractBusinessName(prompt: string): string | null {
  // Common patterns: "a pousada X", "o restaurante X", "a loja X", "my restaurant X", "the hotel X"
  const patterns = [
    /(?:a|o|um|uma|the|my|our)\s+(?:pousada|restaurante|hotel|loja|escola|clínic|shop|restaurant|cafe|academia|gym|spa|agency|escritório|studio)\s+(?:\w+\s+){0,3}(?:\w+)/i,
    /(?:pousada|restaurante|hotel|loja|escola|clínic|shop|restaurant|cafe|academia|gym|spa|agency|escritório|studio)\s+(?:\w+\s+){0,3}(?:\w+)/i,
  ];

  for (const pattern of patterns) {
    const match = prompt.match(pattern);
    if (match) {
      // Clean up: remove articles and common words
      const name = match[0]
        .replace(/^(?:a|o|um|uma|the|my|our|um|una)\s+/i, "")
        .trim();
      // Capitalize first letter of each word
      return name.replace(/\b\w/g, (c) => c.toUpperCase());
    }
  }

  return null;
}

/** Extract location from common patterns */
function extractLocation(prompt: string): string | null {
  const patterns = [
    /(?:em|in|de|do|da|dos|das)\s+([A-ZÀ-Ú][a-zà-ú]+(?:\s+(?:de|do|da|e)\s+[A-ZÀ-Ú][a-zà-ú]+)*)/,
    /(?:pousada|restaurante|hotel|loja|escola|clínic|shop|restaurant)\s+(?:\w+\s+){0,3}(?:em|in|de)\s+([A-ZÀ-Ú][a-zà-ú]+)/i,
  ];

  for (const pattern of patterns) {
    const match = prompt.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return null;
}

/** Extract contact information from prompt */
function extractContactInfo(prompt: string): BusinessContext["contactInfo"] {
  const phone = prompt.match(/(?:\+?\d{1,3}[\s-]?)?\(?\d{2,4}\)?[\s-]?\d{4,5}[\s-]?\d{4}/)?.[0] || undefined;
  const email = prompt.match(/[\w.+-]+@[\w-]+\.[\w.]+/)?.[0] || undefined;
  const whatsapp = prompt.match(/(?:whatsapp|wa\.me)[\s:]*(?:https?:\/\/wa\.me\/)?(\d+)/i)?.[1] || undefined;
  const website = prompt.match(/https?:\/\/[\w.-]+\.[\w.]+/)?.[0] || undefined;

  if (!phone && !email && !whatsapp && !website) return null;
  return { phone, email, website, whatsapp };
}

/** Check what content types the user mentioned */
function detectContentMentions(prompt: string) {
  const lower = prompt.toLowerCase();
  return {
    hasPricing: /\b(preço|preços|price|pricing|plano|planos|plan|valor|cost|orçamento|budget|R\$|USD|\$)\b/i.test(lower),
    hasTestimonials: /\b(depoimento|depoimentos|testimonial|testimonials|review|reviews|avaliação|avaliações|opinião|opiniões|feedback|testemunho|testemunhos)\b/i.test(lower),
    hasFaq: /\b(pergunta|perguntas|question|questions|faq|dúvida|doubt|dúvidas|frequently)\b/i.test(lower),
    hasContact: /\b(contato|contatos|contact|contacts|telefone|phone|email|whatsapp|localização|localizacoes|address|endereço|endereços)\b/i.test(lower),
  };
}

/* ──────────────────────────────────────────────────────────────────────
 * Industry-Specific Best Practices
 * ────────────────────────────────────────────────────────────────────── */

/** Best practices per industry that should be injected into the prompt */
const INDUSTRY_BEST_PRACTICES: Record<string, string[]> = {
  hotel: [
    "Include hero with a stunning property photo and dark overlay for text readability",
    "Show room types with photos, pricing, and key amenities (WiFi, pool, breakfast)",
    "Include a 'How to Book' step-by-step section (date → room → confirmation)",
    "Add testimonials from real guests with star ratings and specific quotes",
    "Show nearby attractions and distance to city center",
    "Include FAQ about check-in/check-out, pets, parking, and cancellation policy",
    "Add a 'Nossos Números' (Stats) section: guests served, satisfaction rate, years operating",
    "Contact section with WhatsApp button, phone, email, and address with map reference",
  ],
  restaurant: [
    "Hero with a stunning food/interior photo and warm overlay",
    "Showcase menu highlights with food photos, descriptions, and prices",
    "Include operating hours and reservation info prominently",
    "Add food gallery with high-quality Pexels images of dishes",
    "Include testimonials from diners with star ratings",
    "Show location with address and parking info",
    "Add a 'Reserve' or 'Order Now' CTA button in hero and throughout",
    "Include FAQ about dietary options, reservations, and private events",
  ],
  saas: [
    "Hero with clear value proposition and product screenshot/mockup",
    "Show 3-4 key features with icons or product screenshots",
    "Include pricing tiers (Free, Pro, Enterprise) with feature comparison",
    "Add social proof: logos of companies using the product, user count, NPS score",
    "Show integrations and compatibility with other tools",
    "Include a 'How It Works' section (3 steps: sign up → configure → launch)",
    "Add testimonials from real users with names, roles, and companies",
    "Include FAQ about security, data privacy, and support",
  ],
  ecommerce: [
    "Hero with product showcase and strong CTA",
    "Feature 3-4 best-selling products with photos, prices, and 'Buy' buttons",
    "Include trust badges: free shipping, secure payment, money-back guarantee",
    "Show customer reviews and ratings on products",
    "Add a 'Best Sellers' or 'New Arrivals' section",
    "Include shipping info, return policy, and payment methods",
    "Add urgency elements: limited stock, countdown timers, seasonal deals",
    "Include FAQ about shipping, returns, and payment options",
  ],
  healthcare: [
    "Hero with calming imagery and clear CTA for appointment booking",
    "Show services/procedures with descriptions and pricing",
    "Include doctor/team profiles with photos, credentials, and specialties",
    "Add before/after gallery (if applicable) with patient consent",
    "Show clinic hours, location, and accepted insurance plans",
    "Include patient testimonials (compliant with regulations)",
    "Add FAQ about procedures, recovery, and insurance",
    "Prominent phone number and online booking CTA",
  ],
  fitness: [
    "Hero with high-energy gym/fitness photo and motivational headline",
    "Show class schedule or training programs with descriptions",
    "Include pricing plans (monthly, quarterly, annual) with features",
    "Add trainer profiles with photos and specialties",
    "Show facility gallery with equipment and spaces",
    "Include transformation stories/testimonials",
    "Add a 'Start Your Journey' CTA with free trial offer",
    "Include FAQ about membership, equipment, and beginner programs",
  ],
  creative: [
    "Hero with portfolio showcase or creative work display",
    "Show 4-6 project case studies with before/after or process shots",
    "Include team/agency story and creative philosophy",
    "Add client logos and testimonials",
    "Show services offered with descriptions and starting prices",
    "Include a 'View Our Work' or 'Start a Project' CTA",
    "Add contact form or Calendly link for project inquiries",
    "Include FAQ about process, timeline, and pricing",
  ],
  finance: [
    "Hero with professional imagery and trust-building headline",
    "Show key services/products with clear descriptions",
    "Include regulatory badges and security certifications",
    "Add calculator tools or ROI examples",
    "Show team credentials and industry experience",
    "Include client testimonials (compliant with regulations)",
    "Add FAQ about fees, minimums, and account types",
    "Prominent 'Schedule a Consultation' CTA",
  ],
  education: [
    "Hero with learning environment photo and compelling headline",
    "Show course offerings with curriculum highlights and duration",
    "Include instructor profiles with credentials",
    "Add student testimonials and success stories",
    "Show enrollment process (3 simple steps)",
    "Include pricing with payment plans",
    "Add FAQ about admission, schedule, and certification",
    "Prominent 'Enroll Now' or 'Start Learning' CTA",
  ],
  real_estate: [
    "Hero with stunning property photo and location tagline",
    "Show featured properties with photos, price, and key specs",
    "Include agent/team profiles with photos and contact info",
    "Add virtual tour or photo gallery for each property",
    "Show neighborhood highlights and amenities",
    "Include mortgage calculator or financing info",
    "Add client testimonials about buying/selling experience",
    "Prominent 'Schedule a Viewing' CTA with contact form",
  ],
  travel: [
    "Hero with breathtaking destination photo and adventure headline",
    "Show popular destinations/packages with photos and prices",
    "Include itinerary highlights for each package",
    "Add traveler testimonials with photos and trip details",
    "Show what's included (flights, hotels, guides, etc.)",
    "Include booking process (3 steps: choose → book → travel)",
    "Add FAQ about visa, cancellation, and travel insurance",
    "Prominent 'Book Now' or 'Plan Your Trip' CTA",
  ],
  gaming: [
    "Hero with game art or esports imagery and energetic headline",
    "Show featured games/tournaments with screenshots",
    "Include team/player profiles with stats",
    "Add upcoming events and tournament schedule",
    "Show streaming schedules and platform links",
    "Include community highlights and social proof",
    "Add FAQ about membership, tournaments, and community",
    "Prominent 'Join Now' or 'Play Today' CTA",
  ],
  beauty: [
    "Hero with luxurious spa/salon photo and calming headline",
    "Show services menu with descriptions and pricing",
    "Include before/after gallery (with consent)",
    "Add stylist/therapist profiles with specialties",
    "Show product recommendations with photos",
    "Include client testimonials with star ratings",
    "Add FAQ about treatments, booking, and aftercare",
    "Prominent 'Book Appointment' CTA with online booking",
  ],
};

/* ──────────────────────────────────────────────────────────────────────
 * Prompt Enhancement Pipeline
 * ────────────────────────────────────────────────────────────────────── */

/**
 * Extract full business context from the prompt.
 */
export function extractBusinessContext(prompt: string, isFollowUp: boolean = false): BusinessContext {
  const industry = detectIndustry(prompt);
  const contentMentions = detectContentMentions(prompt);

  return {
    industry,
    businessName: extractBusinessName(prompt),
    location: extractLocation(prompt),
    contactInfo: extractContactInfo(prompt),
    ...contentMentions,
    language: detectLanguage(prompt),
    isFollowUp,
    originalPrompt: prompt,
  };
}

/**
 * Clean and normalize the prompt text.
 * Removes noise, fixes common issues, normalizes whitespace.
 */
function cleanPrompt(prompt: string): string {
  let cleaned = prompt.trim();

  // Remove excessive whitespace
  cleaned = cleaned.replace(/\s{3,}/g, " ");

  // Remove common filler phrases that don't help the AI
  const fillerPatterns = [
    /\b(por favor|please|porfavor|pls|plz)\b/gi,
    /\b(obrigado|obrigada|thanks|thank you|valeu)\b/gi,
    /\b(ok|ok?\s*$|blz|beleza)\b/gi,
  ];

  for (const pattern of fillerPatterns) {
    cleaned = cleaned.replace(pattern, "").trim();
  }

  // Remove trailing/leading punctuation noise
  cleaned = cleaned.replace(/^[.,\s]+|[.,\s]+$/g, "").trim();

  // Normalize multiple exclamation marks
  cleaned = cleaned.replace(/!{2,}/g, "!");

  return cleaned || prompt; // fallback to original if cleaning removed everything
}

/**
 * Build industry-specific enhancement text.
 */
function buildIndustryEnhancement(context: BusinessContext): string {
  const profile = getIndustryProfile(context.industry);
  const bestPractices = INDUSTRY_BEST_PRACTICES[context.industry] || [];

  if (bestPractices.length === 0) return "";

  const lines: string[] = [];

  lines.push(`\n🎯 INDUSTRY: ${profile.name} (${context.industry})`);
  lines.push(`STYLE: ${profile.style}`);
  lines.push(`LANDING PAGE PATTERN: ${profile.landingPattern}`);

  // Add missing sections as recommendations
  const missingSections: string[] = [];
  if (!context.hasPricing) missingSections.push("pricing/plans section");
  if (!context.hasTestimonials) missingSections.push("testimonials/reviews section");
  if (!context.hasFaq) missingSections.push("FAQ section");
  if (!context.hasContact) missingSections.push("contact section with phone, email, and address");

  if (missingSections.length > 0) {
    lines.push(`\n⚠️ RECOMMENDED SECTIONS (not mentioned in prompt — add these):`);
    for (const section of missingSections) {
      lines.push(`  → Include a ${section}`);
    }
  }

  lines.push(`\n📋 BEST PRACTICES for ${profile.name}:`);
  for (const practice of bestPractices) {
    lines.push(`  ✓ ${practice}`);
  }

  // Add anti-patterns to avoid
  if (profile.antiPatterns.length > 0) {
    lines.push(`\n🚫 AVOID (common mistakes for this industry):`);
    for (const anti of profile.antiPatterns) {
      lines.push(`  ✗ ${anti}`);
    }
  }

  return lines.join("\n");
}

/**
 * Build location-aware enhancement text.
 */
function buildLocationEnhancement(context: BusinessContext): string {
  if (!context.location) return "";

  const lines: string[] = [];
  lines.push(`\n📍 LOCATION: ${context.location}`);

  if (context.industry === "hotel" || context.industry === "travel") {
    lines.push("Include: nearby attractions, distance to city center, transport options");
  } else if (context.industry === "restaurant") {
    lines.push("Include: exact address, parking info, public transport access");
  } else if (context.industry === "real_estate") {
    lines.push("Include: neighborhood info, nearby schools, transport links");
  }

  return lines.join("\n");
}

/**
 * Build contact info enhancement text.
 */
function buildContactEnhancement(context: BusinessContext): string {
  if (!context.contactInfo) return "";

  const lines: string[] = [];
  lines.push(`\n📞 CONTACT INFO (use these in the footer and contact section):`);

  if (context.contactInfo.whatsapp) {
    lines.push(`  WhatsApp: https://wa.me/${context.contactInfo.whatsapp}`);
  }
  if (context.contactInfo.phone) {
    lines.push(`  Phone: ${context.contactInfo.phone}`);
  }
  if (context.contactInfo.email) {
    lines.push(`  Email: ${context.contactInfo.email}`);
  }
  if (context.contactInfo.website) {
    lines.push(`  Website: ${context.contactInfo.website}`);
  }

  return lines.join("\n");
}

/**
 * Build language-specific instructions.
 */
function buildLanguageEnhancement(context: BusinessContext): string {
  const langMap: Record<string, string> = {
    pt: "Portuguese (Brazilian)",
    en: "English",
    es: "Spanish",
  };

  const langName = langMap[context.language] || "English";
  return `\n🌐 LANGUAGE: Generate ALL text content in ${langName}. All headings, paragraphs, buttons, and UI text must be in ${langName}.`;
}

/**
 * Main enhancement function.
 * Takes a raw user prompt and returns an enriched, cleaned prompt
 * with industry-specific best practices and context.
 *
 * This does NOT call any AI — it's pure deterministic processing.
 */
export function enhancePrompt(rawPrompt: string, isFollowUp: boolean = false): string {
  // 1. Clean the prompt
  const cleaned = cleanPrompt(rawPrompt);

  // 2. Extract business context
  const context = extractBusinessContext(cleaned, isFollowUp);

  // 3. For follow-ups, don't enhance as aggressively
  if (isFollowUp) {
    return cleaned;
  }

  // 4. Build enhancements
  const enhancements: string[] = [];

  // Industry-specific best practices
  const industryText = buildIndustryEnhancement(context);
  if (industryText) enhancements.push(industryText);

  // Location-aware enhancements
  const locationText = buildLocationEnhancement(context);
  if (locationText) enhancements.push(locationText);

  // Contact info
  const contactText = buildContactEnhancement(context);
  if (contactText) enhancements.push(contactText);

  // Language instruction
  enhancements.push(buildLanguageEnhancement(context));

  // 5. Combine: cleaned prompt + enhancements
  const enhanced = `${cleaned}\n${enhancements.join("\n")}`;

  return enhanced;
}

/**
 * Get a summary of what the enhancer detected.
 * Useful for debugging and showing the user what was detected.
 */
export function getEnhancementSummary(rawPrompt: string): {
  context: BusinessContext;
  missingSections: string[];
  enhancementsApplied: string[];
} {
  const context = extractBusinessContext(rawPrompt);
  const profile = getIndustryProfile(context.industry);

  const missingSections: string[] = [];
  if (!context.hasPricing) missingSections.push("pricing");
  if (!context.hasTestimonials) missingSections.push("testimonials");
  if (!context.hasFaq) missingSections.push("FAQ");
  if (!context.hasContact) missingSections.push("contact");

  const enhancementsApplied: string[] = [];
  enhancementsApplied.push(`Detected industry: ${profile.name}`);
  if (context.businessName) enhancementsApplied.push(`Business name: ${context.businessName}`);
  if (context.location) enhancementsApplied.push(`Location: ${context.location}`);
  if (context.contactInfo) enhancementsApplied.push("Contact info extracted");
  enhancementsApplied.push(`Language: ${context.language}`);
  if (missingSections.length > 0) enhancementsApplied.push(`Missing sections: ${missingSections.join(", ")}`);
  enhancementsApplied.push(`Added ${INDUSTRY_BEST_PRACTICES[context.industry]?.length || 0} industry best practices`);

  return { context, missingSections, enhancementsApplied };
}
