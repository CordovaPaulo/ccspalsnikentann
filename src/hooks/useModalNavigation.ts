import { useState, useEffect, useRef, RefObject } from 'react';

interface FocusableElement {
  ref: RefObject<HTMLElement>;
  type: string;
}

interface UseModalNavigationOptions {
  modalElements: FocusableElement[];
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  returnFocusTo?: RefObject<HTMLElement>;
}

export function useModalNavigation({
  modalElements,
  isOpen,
  onConfirm,
  onCancel,
  returnFocusTo,
}: UseModalNavigationOptions) {
  const [focusedModalIndex, setFocusedModalIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          const nextIndex = (focusedModalIndex + 1) % modalElements.length;
          setFocusedModalIndex(nextIndex);
          modalElements[nextIndex].ref.current?.focus();
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (focusedModalIndex < modalElements.length - 1) {
            const newIndex = focusedModalIndex + 1;
            setFocusedModalIndex(newIndex);
            modalElements[newIndex].ref.current?.focus();
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (focusedModalIndex > 0) {
            const newIndex = focusedModalIndex - 1;
            setFocusedModalIndex(newIndex);
            modalElements[newIndex].ref.current?.focus();
          }
          break;

        case 'Enter':
          e.preventDefault();
          if (focusedModalIndex === modalElements.length - 1) {
            onConfirm();
          } else {
            onCancel();
          }
          break;

        case 'Escape':
          e.preventDefault();
          onCancel();
          break;
      }
    };

    // Focus first element when modal opens
    setTimeout(() => {
      modalElements[0]?.ref.current?.focus();
    }, 100);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Return focus when modal closes
      if (returnFocusTo?.current) {
        returnFocusTo.current.focus();
      }
    };
  }, [isOpen, focusedModalIndex, modalElements, onConfirm, onCancel, returnFocusTo]);

  return { focusedModalIndex };
}
