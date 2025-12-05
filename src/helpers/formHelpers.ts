/**
 * Helper functions for form inputs
 */

/**
 * Toggle password visibility state
 */
export function togglePasswordVisibility(
  currentState: boolean,
  setter: (value: boolean) => void
): void {
  setter(!currentState);
}

/**
 * Set button active state (for visual feedback)
 * Only allows activation if not in loading state
 */
export function setButtonActiveState(
  active: boolean,
  isLoading: boolean,
  setter: (value: boolean) => void
): void {
  if (!isLoading) {
    setter(active);
  }
}

/**
 * Handle password visibility toggle on keyboard event
 */
export function handlePasswordToggleKeyDown(
  e: React.KeyboardEvent,
  toggleFn: () => void
): void {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleFn();
  }
}
