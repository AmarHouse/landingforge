import { describe, it, expect } from 'vitest'
import { detectIndustry, getIndustryProfile, getDesignSystemReference } from '@/lib/design-intelligence'

describe('design-intelligence', () => {
  describe('detectIndustry', () => {
    it('should detect hotel industry', () => {
      expect(detectIndustry('Create a website for my hotel')).toBe('hotel')
      expect(detectIndustry('pousada website')).toBe('hotel')
      expect(detectIndustry('resort landing page')).toBe('hotel')
    })

    it('should detect restaurant industry', () => {
      expect(detectIndustry('restaurante website')).toBe('restaurant')
      expect(detectIndustry('comida delivery')).toBe('restaurant')
    })

    it('should detect SaaS industry', () => {
      expect(detectIndustry('SaaS platform')).toBe('saas')
      expect(detectIndustry('software tool')).toBe('saas')
    })

    it('should detect e-commerce', () => {
      expect(detectIndustry('loja de roupas')).toBe('ecommerce')
      expect(detectIndustry('online store')).toBe('ecommerce')
    })

    it('should detect healthcare', () => {
      expect(detectIndustry('clínica médica')).toBe('healthcare')
      expect(detectIndustry('dental clinic')).toBe('healthcare')
    })

    it('should default to saas for unknown', () => {
      expect(detectIndustry('something random')).toBe('saas')
    })
  })

  describe('getIndustryProfile', () => {
    it('should return profile for known industry', () => {
      const profile = getIndustryProfile('hotel')
      expect(profile.name).toContain('Hotel')
      expect(profile.style).toBeDefined()
      expect(profile.colorMood).toBeDefined()
    })

    it('should return default saas profile for unknown', () => {
      const profile = getIndustryProfile('unknown-industry')
      expect(profile.name).toBe('SaaS / Software')
    })
  })

  describe('getDesignSystemReference', () => {
    it('should generate design reference string', () => {
      const ref = getDesignSystemReference('hotel website')
      expect(ref).toContain('DESIGN INTELLIGENCE')
      expect(ref).toContain('Hotel & Hospitality')
      expect(ref).toContain('Primary:')
      expect(ref).toContain('AVOID')
      expect(ref).toContain('PRE-DELIVERY CHECKLIST')
    })

    it('should include valid color values', () => {
      const ref = getDesignSystemReference('restaurant')
      expect(ref).toMatch(/#[0-9A-Fa-f]{6}/)
      expect(ref).toContain('Google Fonts:')
    })
  })
})
