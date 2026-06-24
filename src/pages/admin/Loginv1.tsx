import { motion } from "motion/react";
import { LayoutDashboard, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-180px)] flex items-center justify-center p-6"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 glass-card overflow-hidden shadow-2xl shadow-devotion-gold/10">
        {/* Left Side: Visual */}
        <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-devotion-bg to-slate-900 p-12">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-devotion-gold blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-devotion-purple blur-[120px]" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 glass-card flex items-center justify-center text-devotion-gold">
                <LayoutDashboard size={28} />
              </div>
              <h1 className="font-display font-bold text-2xl tracking-tight">DEVOTION</h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-display font-bold leading-tight">
                Unlock Your <br />
                <span className="gold-gradient-text">Potential.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-md">
                Join thousands of students and educators in the most immersive assessment experience ever crafted.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/face${i}/100/100`}
                    className="w-10 h-10 rounded-full border-2 border-slate-900"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">Trusted by 50k+ users worldwide</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-16 space-y-8 bg-white/5 backdrop-blur-md">
          <div className="space-y-2">
            <h3 className="text-3xl font-display font-bold">Welcome Back</h3>
            <p className="text-slate-400">Enter your credentials to access your account</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-devotion-gold/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Password</label>
                <button className="text-[10px] uppercase tracking-widest font-bold text-devotion-gold hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-devotion-gold/50 transition-colors"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-devotion-gold text-devotion-bg rounded-2xl font-bold hover:bg-amber-400 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-transparent px-4 text-slate-500 font-bold">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 glass-button rounded-2xl text-sm font-medium">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 glass-button rounded-2xl text-sm font-medium">
              <Github size={18} /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account? <button className="text-devotion-gold font-bold hover:underline">Sign up for free</button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
