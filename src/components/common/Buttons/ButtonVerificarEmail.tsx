// components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`
        md:w-[412px] md:h-[50px] sm:w-[290px] sm:h-[50px] w-[290px] h-[50px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-[16px] 
        py-2 rounded-3xl border-4 border-transparent transition-all duration-200 cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
        active:scale-[0.98] active:brightness-95 active:border-blue-700
        active:drop-shadow-[0_0_15px_#0C4A6E]
      `}
    >
      {loading ? "Enviando..." : children}
    </button>
  );
};

export default Button;
