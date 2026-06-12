import React from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  icon: React.ReactNode;
  onChange: (item: string) => void;
}

const Input = (props: InputProps) => {
  const { label, placeholder, value, onChange, icon } = props;
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
        {label}
      </label>
      <div className="relative">
        {icon || null}
        <input
          type={"text"}
          placeholder={placeholder}
          required
          value={value}
          className="w-full bg-white/5 border border-white/10 rounded-2xl xl:py-3 py-2 pl-12 pr-4 focus:outline-none focus:border-devotion-gold/50 transition-colors"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
