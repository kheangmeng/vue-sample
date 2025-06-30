import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate, isEmail, isWebsite } from './helper'

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

describe('isEmail', () => {
  it('returns true for valid emails', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('username@com')).toBe(true)
    expect(isEmail('user.name+tag+sorting@example.com')).toBe(true)
    expect(isEmail('user_name@example.co.uk')).toBe(true)
    expect(isEmail('user-name@sub.domain.com')).toBe(true)
    expect(isEmail('a@b.co')).toBe(true)
    expect(isEmail('1234567890@example.com')).toBe(true)
    expect(isEmail('email@123.123.123.123')).toBe(true)
    // expect(isEmail('email@[123.123.123.123]')).toBe(true)
  })

  it('returns false for invalid emails', () => {
    expect(isEmail('plainaddress')).toBe(false)
    expect(isEmail('@missingusername.com')).toBe(false)
    expect(isEmail('username@.com')).toBe(false)
    expect(isEmail('username@.com.')).toBe(false)
    expect(isEmail('username@-example.com')).toBe(false)
    expect(isEmail('username@example..com')).toBe(false)
    expect(isEmail('username@example.com.')).toBe(false)
    expect(isEmail('username@.example.com')).toBe(false)
    expect(isEmail('username@exam_ple.com')).toBe(false)
    expect(isEmail('')).toBe(false)
    expect(isEmail('a'.repeat(65) + '@example.com')).toBe(false) // local part too long
    expect(isEmail('user@' + 'a'.repeat(250) + '.com')).toBe(false) // domain too long
  })
})

describe('isWebsite', () => {
  it('returns true for valid websites with http/https', () => {
    expect(isWebsite('http://example.com')).toBe(true)
    expect(isWebsite('https://example.com')).toBe(true)
    expect(isWebsite('https://www.example.com')).toBe(true)
    expect(isWebsite('http://sub.domain.co.uk')).toBe(true)
    expect(isWebsite('https://example.com/path')).toBe(true)
    expect(isWebsite('https://example.com/path/to/page?query=1')).toBe(true)
    expect(isWebsite('https://example.com:8080')).toBe(true)
    expect(isWebsite('https://example.com/#anchor')).toBe(true)
  })

  it('returns true for valid websites without protocol', () => {
    expect(isWebsite('example.com')).toBe(true)
    expect(isWebsite('www.example.com')).toBe(true)
    expect(isWebsite('sub.domain.com')).toBe(true)
    expect(isWebsite('example.co.uk')).toBe(true)
  })

  it('returns false for invalid websites', () => {
    expect(isWebsite('http://')).toBe(false)
    expect(isWebsite('https://')).toBe(false)
    expect(isWebsite('example')).toBe(false)
    expect(isWebsite('http:/example.com')).toBe(false)
    expect(isWebsite('://example.com')).toBe(false)
    expect(isWebsite('http//example.com')).toBe(false)
    expect(isWebsite('')).toBe(false)
    expect(isWebsite('http://.com')).toBe(false)
    expect(isWebsite('http://example..com')).toBe(false)
    expect(isWebsite('http://example.com-')).toBe(false)
    expect(isWebsite('http://example_.com')).toBe(false)
  })
})
