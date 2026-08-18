import { Crown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface CongratsPopupProps {
  showConfirmAnnounce: boolean;
  setShowConfirmAnnounce: (isShow: boolean) => void;
}

const CongratsPopup = (props: CongratsPopupProps) => {
    const {setShowConfirmAnnounce, showConfirmAnnounce} = props;
  return (
      <AnimatePresence>
        {showConfirmAnnounce && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10010] flex items-center justify-center bg-black/85 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="w-full max-w-md bg-gradient-to-b from-[#1C1942] to-[#0A0724] border border-devotion-gold/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center flex flex-col items-center gap-4"
            >
              {/* Glowing decorative background elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-devotion-gold/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-12 h-12 rounded-full bg-devotion-gold/10 border border-devotion-gold/40 flex items-center justify-center text-devotion-gold mb-1 relative z-10">
                <Crown size={24} className="animate-pulse" />
              </div>
              
              <h3 className="text-lg font-bold text-white tracking-tight relative z-10">
                📢 Tuyên Bố Vương Quyền
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                Bạn muốn thông báo bạn là <span className="text-devotion-gold font-bold">VUA IC3 mới</span> với thành tích tốt nhất toàn trường?
              </p>

              <div className="flex gap-3 w-full mt-2 relative z-10">
                <button
                  onClick={() => setShowConfirmAnnounce(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={() => setShowConfirmAnnounce(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-devotion-gold hover:bg-amber-400 text-devotion-bg font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-devotion-gold/10 cursor-pointer"
                >
                  Thông báo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  )
}

export default CongratsPopup