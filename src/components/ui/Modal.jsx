import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Button from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showFooter = false,
  footerContent = null,
  className = '',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !isAnimating) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, isAnimating]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'w-full mx-4',
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.15, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.1, ease: 'easeIn' },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={() => closeOnOverlayClick && onClose()}
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className={clsx(
                  "relative bg-white/70 dark:bg-gray-900/70 rounded-xl shadow-xl w-full transition-all",
                  sizeClasses[size],
                  className
                )}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
                onClick={(e) => e.stopPropagation()}
              >
                
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3
                    id="modal-title"
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {title}
                  </h3>
                </div>

                
                <div className="px-6 py-5 text-sm text-gray-700 dark:text-gray-300">
                  {children}
                </div>

                
                {showFooter && (
                  <div className="flex justify-around gap-3 px-6 py-4  rounded-b-lg">
                    {footerContent || (
                      <>
                        <Button variant="outline" onClick={onClose}>
                          Cancel
                        </Button>
                        <Button type="button">Confirm</Button>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;