import { isEmail, isWebsite } from './helper'

export function required(v: string): string | boolean {
  return !!v || 'Field is required'
}

export function validEmail(v: string): string | boolean {
  return isEmail(v) || 'Email is invalid'
}

export function validWebsite(v: string): string | boolean {
  return isWebsite(v) || 'Website is invalid'
}

export function minLength(v: string, min: number): string | boolean {
  return v.length >= min || `Minimum length is ${min}`
}

export function maxLength(v: string, max: number): string | boolean {
  return v.length <= max || `Maximum length is ${max}`
}
