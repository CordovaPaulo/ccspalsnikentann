/**
 * Central export for all helper functions
 * Import helpers like: import { getCookie, validateFileSize } from '@/helpers';
 */

// Cookie helpers
export {
  getCookie,
  setCookie,
  deleteCookie,
} from './cookieHelpers';

// Form helpers
export {
  togglePasswordVisibility,
  setButtonActiveState,
  handlePasswordToggleKeyDown,
} from './formHelpers';

// File helpers
export {
  validateFileSize,
  validateFileType,
  getFileExtension,
  isImageFile,
  validateImageFile,
  readFileAsDataURL,
} from './fileHelpers';

// Validation helpers
export {
  isValidEmail,
  isValidPhoneNumber,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isWithinLengthRange,
  isValidStudentId,
  validatePasswordStrength,
} from './validationHelpers';

// String helpers
export {
  capitalizeFirst,
  capitalizeWords,
  toKebabCase,
  toCamelCase,
  truncate,
  normalizeWhitespace,
  formatPhoneNumber,
  safeJsonParse,
} from './stringHelpers';
