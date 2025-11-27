import type { Transition, Variants } from 'framer-motion';

export const EASING = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
} as const;

export const modalOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: DURATION.fast,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: DURATION.fast,
      ease: EASING,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING,
    },
  },
};

export const cardExpandAnimation = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        duration: DURATION.normal,
        ease: EASING,
      },
      opacity: {
        duration: 0.25,
        delay: 0.05,
      },
    } as Transition,
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.25,
        ease: EASING,
      },
      opacity: {
        duration: DURATION.fast,
      },
    } as Transition,
  },
  style: {
    overflow: 'hidden' as const,
  },
};

export const patientCardAnimation = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING,
    } as Transition,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: DURATION.normal,
      ease: EASING,
    } as Transition,
  },
};

export const layoutTransition: Transition = {
  duration: DURATION.normal,
  ease: EASING,
};
