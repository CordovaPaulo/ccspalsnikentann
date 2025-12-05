/**
 * Helper functions for file validation
 */

/**
 * Validate file size
 * @param file - File to validate
 * @param maxSizeMB - Maximum size in megabytes
 * @returns true if valid, false otherwise
 */
export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Validate file type
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns true if valid, false otherwise
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * Get file extension from filename
 * @param filename - File name
 * @returns file extension (lowercase)
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}

/**
 * Check if file is an image
 * @param file - File to check
 * @returns true if image, false otherwise
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Validate image file
 * @param file - File to validate
 * @param maxSizeMB - Maximum size in MB (default 5MB)
 * @returns Validation result with error message if invalid
 */
export function validateImageFile(
  file: File,
  maxSizeMB: number = 5
): { valid: boolean; error?: string } {
  if (!isImageFile(file)) {
    return { valid: false, error: 'File must be an image' };
  }

  if (!validateFileSize(file, maxSizeMB)) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }

  return { valid: true };
}

/**
 * Read file as data URL
 * @param file - File to read
 * @returns Promise with data URL
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}
