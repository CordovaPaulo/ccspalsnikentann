import { useState, useEffect, RefObject } from 'react';

interface FocusableElement {
  ref: RefObject<any>;
  type: string;
}

interface UseKeyboardNavigationOptions {
  elements: FocusableElement[];
  onEnter?: (index: number) => void;
  onSpace?: (index: number) => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  elements,
  onEnter,
  onSpace,
  onEscape,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const focusNextElement = () => {
    const nextIndex = (focusedIndex + 1) % elements.length;
    setFocusedIndex(nextIndex);
    elements[nextIndex].ref.current?.focus();
  };

  const focusPreviousElement = () => {
    const prevIndex = focusedIndex === 0 ? elements.length - 1 : focusedIndex - 1;
    setFocusedIndex(prevIndex);
    elements[prevIndex].ref.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!enabled) return;

    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          focusPreviousElement();
        } else {
          focusNextElement();
        }
        break;

      case 'Enter':
        e.preventDefault();
        onEnter?.(index);
        break;

      case ' ':
        e.preventDefault();
        onSpace?.(index);
        break;

      case 'ArrowDown':
        e.preventDefault();
        focusNextElement();
        break;

      case 'ArrowUp':
        e.preventDefault();
        focusPreviousElement();
        break;

      case 'ArrowRight':
        e.preventDefault();
        if (focusedIndex < elements.length - 1) {
          const newIndex = focusedIndex + 1;
          setFocusedIndex(newIndex);
          elements[newIndex].ref.current?.focus();
        }
        break;

      case 'ArrowLeft':
        e.preventDefault();
        if (focusedIndex > 0) {
          const newIndex = focusedIndex - 1;
          setFocusedIndex(newIndex);
          elements[newIndex].ref.current?.focus();
        }
        break;

      case 'Escape':
        e.preventDefault();
        if (onEscape) {
          onEscape();
        } else {
          setFocusedIndex(0);
          elements[0]?.ref.current?.focus();
        }
        break;
    }
  };

  const handleElementFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return {
    focusedIndex,
    handleKeyDown,
    handleElementFocus,
    focusNextElement,
    focusPreviousElement,
  };
}
