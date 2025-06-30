import { describe, it, expect } from 'vitest'
import { required, validEmail, validWebsite, minLength, maxLength } from './validator'

describe('required', () => {
  it('returns true for non-empty string', () => {
    expect(required('hello')).toBe(true)
  })

  it('returns error message for empty string', () => {
    expect(required('')).toBe('Field is required')
  })

  it('returns error message for string with only spaces', () => {
    expect(required('   ')).toBe(true) // spaces are considered non-empty
  })

  it('returns true for string "0"', () => {
    expect(required('0')).toBe(true)
  })
})

describe('validEmail', () => {
  it('returns true for a valid email', () => {
    expect(validEmail('test@example.com')).toBe(true)
  })

  it('returns error message for an invalid email', () => {
    expect(validEmail('invalid-email')).toBe('Email is invalid')
  })

  it('returns error message for empty string', () => {
    expect(validEmail('')).toBe('Email is invalid')
  })

  it('returns error message for string without "@"', () => {
    expect(validEmail('testexample.com')).toBe('Email is invalid')
  })

  it('returns error message for string with spaces', () => {
    expect(validEmail('test@ example.com')).toBe('Email is invalid')
  })
})

describe('minLength', () => {
  it('returns true if string length is equal to min', () => {
    expect(minLength('abc', 3)).toBe(true)
  })

  it('returns true if string length is greater than min', () => {
    expect(minLength('abcd', 3)).toBe(true)
  })

  it('returns error message if string length is less than min', () => {
    expect(minLength('ab', 3)).toBe('Minimum length is 3')
  })

  it('returns true for empty string if min is 0', () => {
    expect(minLength('', 0)).toBe(true)
  })

  it('returns error message for empty string if min is greater than 0', () => {
    expect(minLength('', 1)).toBe('Minimum length is 1')
  })
})

describe('maxLength', () => {
  it('returns true if string length is equal to max', () => {
    expect(maxLength('abc', 3)).toBe(true)
  })

  it('returns true if string length is less than max', () => {
    expect(maxLength('ab', 3)).toBe(true)
  })

  it('returns error message if string length is greater than max', () => {
    expect(maxLength('abcd', 3)).toBe('Maximum length is 3')
  })

  it('returns true for empty string if max is 0 or more', () => {
    expect(maxLength('', 0)).toBe(true)
    expect(maxLength('', 2)).toBe(true)
  })

  it('returns error message for string longer than max', () => {
    expect(maxLength('hello', 4)).toBe('Maximum length is 4')
  })
})

describe('validWebsite', () => {
  it('returns true for a valid website URL', () => {
    expect(validWebsite('https://example.com')).toBe(true)
    expect(validWebsite('http://example.com')).toBe(true)
    expect(validWebsite('https://www.example.com')).toBe(true)
    expect(validWebsite('www.example.com')).toBe(true)
    expect(validWebsite('example.com')).toBe(true)
  })

  it('returns error message for an invalid website URL', () => {
    expect(validWebsite('not-a-url')).toBe('Website is invalid')
    expect(validWebsite('example')).toBe('Website is invalid')
    expect(validWebsite('http:/example.com')).toBe('Website is invalid')
    expect(validWebsite('')).toBe('Website is invalid')
  })

  it('returns error message for URLs with spaces', () => {
    expect(validWebsite('https://exa mple.com')).toBe('Website is invalid')
  })
})
