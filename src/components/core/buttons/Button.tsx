import React from "react";

interface MainButtonProps {
  className?: string
  text?: string;
  icon?: React.ReactNode;
  onClick?: (e: any) => void;
  children?: React.ReactNode
}

export const Button = (props: MainButtonProps) => {
  const {  onClick, text, children, icon, className } = props;
  return (
    <button className={className ? className : 'w-full lg:py-4 py-3 bg-devotion-gold text-devotion-bg rounded-2xl font-bold lg:mt-8 mt-4  hover:bg-amber-400 transition-colors'} onClick={(e) => onClick ? onClick(e) : undefined}>
      {text}
      {children}
    </button>
  );
};

