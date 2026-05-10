import { Eye, EyeOff, Lock } from "lucide-react";

interface InputFormProps {
    label: string,
    placeholder?: string,
    showPassword: boolean,
    setShowPassword: (isShow: boolean) => void;
    value: string;
    onChange: (item: string) => void;
}

const InputForm = (props: InputFormProps) => {
    const { label, placeholder, showPassword, setShowPassword, value, onChange } = props
  return (
    <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                {label}
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  required
                  value={value}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl xl:py-3 py-2 pl-12 pr-4 focus:outline-none focus:border-devotion-gold/50 transition-colors"
                  onChange={(e) => onChange(e.target.value)}
                />
                {/* Icon toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
  );
};

export default InputForm;
