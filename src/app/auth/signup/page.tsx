'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useModalNavigation } from '@/hooks/useModalNavigation';
import { navigateToHome } from '@/utils/navigationHelpers';
import styles from './Signup.module.css';

export default function SignupPage() {
  const router = useRouter();
  const {
    showConfirmationModal,
    selectedRole,
    initiateSignUp,
    confirmSelection,
    cancelSelection,
  } = useRoleSelection();

  // Refs
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const learnerCardRef = useRef<HTMLDivElement>(null);
  const mentorCardRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Focusable elements for main page
  const focusableElements = [
    { ref: backButtonRef, type: 'button' },
    { ref: learnerCardRef, type: 'card' },
    { ref: mentorCardRef, type: 'card' }
  ];

  // Focusable elements for modal
  const modalFocusableElements = [
    { ref: cancelButtonRef, type: 'button' },
    { ref: confirmButtonRef, type: 'button' }
  ];

  // Keyboard navigation for main page
  const { handleKeyDown: handleMainKeyDown, handleElementFocus } = useKeyboardNavigation({
    elements: focusableElements,
    onEnter: (index) => {
      if (index === 0) {
        navigateToHome(router, 'get-started');
      } else if (index === 1) {
        initiateSignUp('learner');
      } else if (index === 2) {
        initiateSignUp('mentor');
      }
    },
    onSpace: (index) => {
      if (index === 0) {
        navigateToHome(router, 'get-started');
      } else if (index === 1) {
        initiateSignUp('learner');
      } else if (index === 2) {
        initiateSignUp('mentor');
      }
    },
    onEscape: () => {
      backButtonRef.current?.focus();
    },
    enabled: !showConfirmationModal,
  });

  // Modal keyboard navigation
  useModalNavigation({
    modalElements: modalFocusableElements,
    isOpen: showConfirmationModal,
    onConfirm: confirmSelection,
    onCancel: cancelSelection,
    returnFocusTo: selectedRole === 'learner' ? learnerCardRef : mentorCardRef,
  });

  // Auto-focus back button on component mount
  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

  // JSX Return
  return (
    <div className={styles.signupContainer}>
      <button 
        ref={backButtonRef}
        onClick={() => navigateToHome(router, 'get-started')} 
        className={styles.backBtn}
        onFocus={() => handleElementFocus(0)}
        onKeyDown={(e) => handleMainKeyDown(e, 0)}
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmationModal}>
            <h3>Confirm Your Role</h3>
            <p>
              You've selected to proceed as
              <strong> {selectedRole.toUpperCase()}</strong>. Is this correct?
            </p>
            <div className={styles.modalActions}>
              <button 
                ref={cancelButtonRef}
                onClick={cancelSelection} 
                className={styles.cancelBtn}
                tabIndex={0}
              >
                Cancel
              </button>
              <button 
                ref={confirmButtonRef}
                onClick={confirmSelection} 
                className={styles.confirmBtn}
                tabIndex={0}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.headerText}>
        <h1>Complete Your Account</h1>
        <p>Pick a role to proceed with your profile setup</p>
      </div>

      <section className={styles.joinSection} id="get-started">
        {/* Learner Card */}
        <div 
          ref={learnerCardRef}
          className={`${styles.joinCard} ${styles.learnerCard}`}
          onFocus={() => handleElementFocus(1)}
          tabIndex={0}
        >
          <div className={styles.cardContent}>
            <div className={styles.roleTitle}>
              <span>PROCEED AS</span>
              <h3>LEARNER</h3>
              <hr className={styles.divider} />
            </div>

            <div className={styles.cardIcon}>
              <Image 
                src="/learners.png" 
                alt="Learner Icon" 
                width={230}
                height={200}
              />
            </div>

            <button
              type="button"
              className={styles.joinBtn}
              onClick={() => initiateSignUp('learner')}
              aria-label="Sign up as Learner"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mentor Card */}
        <div 
          ref={mentorCardRef}
          className={`${styles.joinCard} ${styles.mentorCard}`}
          onFocus={() => handleElementFocus(2)}
          tabIndex={0}
        >
          <div className={styles.cardContent}>
            <div className={styles.roleTitle}>
              <span>PROCEED AS</span>
              <h3>MENTOR</h3>
              <hr className={styles.divider} />
            </div>

            <div className={styles.cardIcon}>
              <Image 
                src="/mentors.png" 
                alt="Mentor Icon" 
                width={230}
                height={200}
              />
            </div>

            <button
              type="button"
              className={styles.joinBtn}
              onClick={() => initiateSignUp('mentor')}
              aria-label="Sign up as Mentor"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}