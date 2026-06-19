import { describe, it, expect } from 'vitest'
import { isTheSameHtml } from '@/lib/compare-html-diff'

describe('compare-html-diff', () => {
  describe('isTheSameHtml', () => {
    it('should return true for identical strings', () => {
      expect(isTheSameHtml('<div>Hello</div>')).toBe(true)
    })

    it('should return false for different strings', () => {
      const html1 = '<div>Hello</div>'
      const html2 = '<div>World</div>'
      expect(isTheSameHtml(html1, html2)).toBe(false)
    })

    it('should return true when html2 is not provided', () => {
      expect(isTheSameHtml('<div>Hello</div>')).toBe(true)
    })

    it('should return false when second parameter differs', () => {
      expect(isTheSameHtml('<div>Hello</div>', '<p>Different</p>')).toBe(false)
    })
  })
})
