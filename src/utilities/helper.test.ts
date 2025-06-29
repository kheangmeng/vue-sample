import { describe, it, expect } from 'vitest'
import { formatCurrency } from './helper'
import { formatDate } from './helper'

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
    expect(formatCurrency(1000)).toBe('$1,000.00')
    expect(formatCurrency(0.99)).toBe('$0.99')
  })

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
    expect(formatCurrency(-0.99)).toBe('-$0.99')
  })

  it('formats large numbers with commas', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })

  describe('formatDate', () => {
    it('formats a Date object correctly', () => {
      const date = new Date('2024-06-01T15:30:45')
      // The output depends on the local timezone, so we check the structure
      const formatted = formatDate(date)
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/)
    })

    it('formats an ISO string correctly', () => {
      const formatted = formatDate('2024-06-01T08:15:30Z')
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/)
    })

    it('formats a date-only string correctly', () => {
      const formatted = formatDate('2024-06-01')
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/)
    })

    it('handles invalid date input gracefully', () => {
      const formatted = formatDate('invalid-date')
      expect(formatted).toBe('Invalid Date')
    })
  })
})
