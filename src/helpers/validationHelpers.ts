/**
 * Helper functions for data validation
 */

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (11 digits starting with 09)
 * @param phone - Phone number to validate
 * @returns true if valid phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate required field
 * @param value - Value to validate
 * @returns true if not empty
 */
export function isRequired(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim() !== '';
}

/**
 * Validate minimum length
 * @param value - Value to validate
 * @param minLength - Minimum length
 * @returns true if meets minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Validate maximum length
 * @param value - Value to validate
 * @param maxLength - Maximum length
 * @returns true if within maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

/**
 * Validate length range
 * @param value - Value to validate
 * @param minLength - Minimum length
 * @param maxLength - Maximum length
 * @returns true if within range
 */
export function isWithinLengthRange(
  value: string,
  minLength: number,
  maxLength: number
): boolean {
  return value.length >= minLength && value.length <= maxLength;
}

/**
 * Validate student ID (9 digits)
 * @param id - Student ID to validate
 * @returns true if valid student ID
 */
export function isValidStudentId(id: string): boolean {
  const idRegex = /^\d{9}$/;
  return idRegex.test(id);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Validation result with strength level and errors
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
} {
  const errors: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const criteriaCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

  if (criteriaCount < 2) {
    strength = 'weak';
    errors.push('Password should include uppercase, lowercase, numbers, and special characters');
  } else if (criteriaCount === 2 || criteriaCount === 3) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  return {
    valid: errors.length === 0 && strength !== 'weak',
    strength,
    errors,
  };
}
