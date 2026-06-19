import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getAIConfig, setAIConfig, hasAIConfig, clearAIConfig, normalizeEndpoint } from '@/lib/ai-config'

describe('ai-config', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should return null when no config is set', () => {
    expect(getAIConfig()).toBeNull()
  })

  it('should store and retrieve AI configuration', () => {
    const config = {
      endpoint: 'https://api.openai.com/v1',
      model: 'gpt-4o',
      apiKey: 'test-key-123',
    }
    setAIConfig(config)

    const result = getAIConfig()
    expect(result).toEqual(config)
  })

  it('should return true when config is set', () => {
    setAIConfig({
      endpoint: 'https://api.example.com/v1',
      model: 'test-model',
      apiKey: 'test-key',
    })

    expect(hasAIConfig()).toBe(true)
  })

  it('should return false when config is not set', () => {
    expect(hasAIConfig()).toBe(false)
  })

  it('should return false when config has missing fields', () => {
    // @ts-expect-error - testing invalid state
    localStorage.setItem('landingforge_ai_config', JSON.stringify({
      endpoint: 'https://api.example.com',
      // missing model and apiKey
    }))

    expect(hasAIConfig()).toBe(false)
  })

  it('should clear configuration', () => {
    setAIConfig({
      endpoint: 'https://api.example.com/v1',
      model: 'test-model',
      apiKey: 'test-key',
    })

    clearAIConfig()
    expect(hasAIConfig()).toBe(false)
    expect(getAIConfig()).toBeNull()
  })

  it('should normalize endpoint by removing trailing slashes', () => {
    expect(normalizeEndpoint('https://api.example.com/v1/')).toBe('https://api.example.com/v1')
    expect(normalizeEndpoint('https://api.example.com/v1')).toBe('https://api.example.com/v1')
    expect(normalizeEndpoint('https://api.example.com///')).toBe('https://api.example.com')
  })
})
