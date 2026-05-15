import { AlertCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

interface GlassAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export const GlassAlert = ({ isOpen, onClose, message, type = 'error' }: GlassAlertProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-200 w-[calc(100%-2rem)] max-w-md"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/40 p-4 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5">
            {/* Decorative colored glow based on type */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-orange/20 blur-3xl" />
            
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-brand-orange/20">
                <AlertCircle className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange mb-1">
                  {type === 'error' ? 'Có Lỗi' : 'Thông báo'}
                </h4>
                <p className="text-sm font-light text-brand-black/80 leading-snug">{message}</p>
              </div>

              <button 
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full cursor-pointer bg-brand-black/5 text-brand-black/20 hover:text-brand-orange transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Animated Progress Bar */}
            <motion.div 
               initial={{ scaleX: 1 }}
               animate={{ scaleX: 0 }}
               transition={{ duration: 5, ease: "linear" }}
               className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
