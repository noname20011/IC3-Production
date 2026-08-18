import { AnimatePresence, motion } from "motion/react";

interface NotifyPopUpProps {
  showRoyalCelebration: boolean;
  setShowRoyalCelebration: (isShow: boolean) => void;
  message: string;
}
const NotifyPopUp = (props: NotifyPopUpProps) => {
  const { showRoyalCelebration, setShowRoyalCelebration, message } = props;
  const notifyMessage = message && message?.split("-");
  
  return (
    // Royal Celebration Popup
    <AnimatePresence>
      {showRoyalCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2"
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full max-w-lg bg-gradient-to-b from-[#1C1942] to-[#0A0724] border-2 border-devotion-gold/50 rounded-[2.5rem] shadow-[0_0_50px_rgba(234,179,8,0.25)] relative p-4 pt-16 md:p-6 md:pt-20 text-center flex flex-col items-center gap-4"
          >
            {/* Absolute "Hỏng rồi" sign banner */}
            <div className="absolute -top-[14%] md:-top-[18%] left-1/2 -translate-x-1/2 w-48 sm:w-64 z-[10005]">
              <div className="relative group filter transition-all duration-300 hover:scale-105">
                <img
                  src="https://res.cloudinary.com/user-itinerary-media/image/upload/v1782119036/title-notifi_a91whi.png"
                  alt="Biển hiệu Hỏng rồi"
                  className="w-full h-auto object-contain mix-blend-screen"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Gold Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-devotion-gold to-transparent" />
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-devotion-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* King on Throne Image */}
            <div className="w-64 h-64 md:w-80 h-auto relative group mb-2">
              <img
                src="https://res.cloudinary.com/user-itinerary-media/image/upload/v1782120989/final_new_efl8dg.gif"
                alt="Vua IC3"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Celebratory Announcement Message */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-medium text-slate-100 leading-snug tracking-tight">
                <span className="text-devotion-gold drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                  {notifyMessage?.[0]}
                </span>{" "}
                - <span className="text-amber-300">{notifyMessage?.[1]}</span> <br /> 🎉 Đã
                cướp ngôi VUA{" "}
                <span className="gold-gradient-text block mt-1">
                  {notifyMessage?.[3]}
                </span>
              </h3>
            </div>

            {/* Action Close buttons */}
            <div className="grid grid-cols-3 gap-3 w-full mt-4">
              <button
                onClick={() => setShowRoyalCelebration(false)}
                className="w-full col-span-1 py-4 px-2 md:px-6 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 font-bold text-[11px] md:text-xs tracking-widest transition-all active:scale-95"
              >
                Ai hỏi???
              </button>
              <button
                onClick={() => setShowRoyalCelebration(false)}
                className="w-full col-span-2 py-4 px-2 md:px-6 rounded-2xl bg-devotion-gold hover:bg-amber-400 text-white text-[14px] md:text-lg font-bold tracking-[0.2em] shadow-[0_10px_25px_rgba(234,179,8,0.25)] hover:shadow-[0_15px_30px_rgba(234,179,8,0.4)] transition-all active:scale-105 active:translate-y-px"
              >
                Vạn tuế! Vạn tuế!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotifyPopUp;
