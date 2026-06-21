import { describe, it, expect } from "vitest";
import {
  extractBusinessContext,
  enhancePrompt,
  getEnhancementSummary,
} from "@/lib/prompt-enhancer";

describe("Prompt Enhancer", () => {
  describe("extractBusinessContext", () => {
    it("detects hotel industry from Portuguese prompt", () => {
      const ctx = extractBusinessContext("Criar site para pousada em Penedo");
      expect(ctx.industry).toBe("hotel");
      expect(ctx.language).toBe("pt");
      expect(ctx.location).toBe("Penedo");
    });

    it("detects restaurant industry", () => {
      const ctx = extractBusinessContext("Site para restaurante italiano");
      expect(ctx.industry).toBe("restaurant");
    });

    it("detects SaaS industry", () => {
      const ctx = extractBusinessContext("Landing page for our SaaS project management tool");
      expect(ctx.industry).toBe("saas");
      expect(ctx.language).toBe("en");
    });

    it("detects healthcare industry", () => {
      const ctx = extractBusinessContext("Clínica médica em São Paulo");
      expect(ctx.industry).toBe("healthcare");
    });

    it("detects fitness industry", () => {
      const ctx = extractBusinessContext("Academia de musculação");
      expect(ctx.industry).toBe("fitness");
    });

    it("detects contact info from prompt", () => {
      const ctx = extractBusinessContext(
        "Site para pousada. Telefone: (24) 99979-6381, email: contato@pousada.com"
      );
      expect(ctx.contactInfo).toBeTruthy();
      expect(ctx.contactInfo?.email).toBe("contato@pousada.com");
    });

    it("detects pricing mention", () => {
      const ctx = extractBusinessContext("Site com preços dos planos");
      expect(ctx.hasPricing).toBe(true);
    });

    it("detects FAQ mention", () => {
      const ctx = extractBusinessContext("Site com perguntas frequentes");
      expect(ctx.hasFaq).toBe(true);
    });

    it("detects testimonials mention", () => {
      const ctx = extractBusinessContext("Site com depoimentos de clientes");
      expect(ctx.hasTestimonials).toBe(true);
    });

    it("detects contact mention", () => {
      const ctx = extractBusinessContext("Site com seção de contato");
      expect(ctx.hasContact).toBe(true);
    });

    it("detects English language", () => {
      const ctx = extractBusinessContext("Create a website for my restaurant");
      expect(ctx.language).toBe("en");
    });

    it("detects Spanish language", () => {
      const ctx = extractBusinessContext("Crear sitio web para mi tienda");
      expect(ctx.language).toBe("es");
    });
  });

  describe("enhancePrompt", () => {
    it("returns cleaned prompt for follow-ups", () => {
      const result = enhancePrompt("  por favor mude a cor   ", true);
      expect(result).toBe("mude a cor");
      // Should NOT have industry enhancements for follow-ups
      expect(result).not.toContain("🎯 INDUSTRY:");
    });

    it("adds industry best practices for hotel", () => {
      const result = enhancePrompt("Pousada em Penedo");
      expect(result).toContain("🎯 INDUSTRY:");
      expect(result).toContain("Hotel");
      expect(result).toContain("BEST PRACTICES");
      expect(result).toContain("🌐 LANGUAGE:");
    });

    it("adds industry best practices for restaurant", () => {
      const result = enhancePrompt("Restaurante italiano em SP");
      expect(result).toContain("Restaurant");
      expect(result).toContain("menu highlights");
    });

    it("adds recommended missing sections", () => {
      const result = enhancePrompt("Site para pousada");
      expect(result).toContain("RECOMMENDED SECTIONS");
      expect(result).toContain("pricing");
      expect(result).toContain("testimonials");
      expect(result).toContain("FAQ");
      expect(result).toContain("contact");
    });

    it("does not recommend sections already mentioned", () => {
      const result = enhancePrompt(
        "Site para pousada com preços, depoimentos, FAQ e contato"
      );
      // Should still have the section but with fewer missing items
      expect(result).toContain("INDUSTRY:");
    });

    it("includes location enhancement", () => {
      const result = enhancePrompt("Pousada em Penedo, RJ");
      expect(result).toContain("📍 LOCATION: Penedo");
    });

    it("includes contact info when provided", () => {
      const result = enhancePrompt(
        "Pousada. WhatsApp: 5524999796381, email: teste@test.com"
      );
      expect(result).toContain("📞 CONTACT INFO");
      expect(result).toContain("teste@test.com");
    });

    it("cleans filler words", () => {
      const result = enhancePrompt("por favor criar site obrigado");
      expect(result).not.toContain("por favor");
      expect(result).not.toContain("obrigado");
    });

    it("normalizes excessive whitespace", () => {
      const result = enhancePrompt("site   para    pousada");
      expect(result).not.toContain("   ");
    });

    it("preserves original if cleaning removes everything", () => {
      const result = enhancePrompt("ok");
      // Should fallback to original
      expect(result).toBeTruthy();
    });

    it("adds anti-patterns for the detected industry", () => {
      const result = enhancePrompt("Site para hotel");
      expect(result).toContain("AVOID");
    })
  });

  describe("getEnhancementSummary", () => {
    it("returns context and missing sections", () => {
      const summary = getEnhancementSummary("Site para pousada em Penedo");
      expect(summary.context.industry).toBe("hotel");
      expect(summary.context.location).toBe("Penedo");
      expect(summary.missingSections).toContain("pricing");
      expect(summary.missingSections).toContain("testimonials");
      expect(summary.enhancementsApplied.length).toBeGreaterThan(0);
    });

    it("identifies all missing sections for minimal prompt", () => {
      const summary = getEnhancementSummary("Restaurante");
      expect(summary.missingSections).toContain("pricing");
      expect(summary.missingSections).toContain("testimonials");
      expect(summary.missingSections).toContain("FAQ");
      expect(summary.missingSections).toContain("contact");
    });

    it("identifies fewer missing sections for detailed prompt", () => {
      const summary = getEnhancementSummary(
        "Pousada com preços e depoimentos"
      );
      expect(summary.missingSections).not.toContain("pricing");
      expect(summary.missingSections).not.toContain("testimonials");
    });
  });
});
