import React from "react";
import { User } from "lucide-react";
import Image from "next/image";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode | string;
  iconClassName?: string;
}

const IconInput: React.FC<IconInputProps> = ({ label, icon, iconClassName, ...props }) => {
  return (
    <div className="flex items-center lg:w-[412px] lg:h-[53px] px-3 py-2 border-2 rounded-xl bg-gray-800 border-blue-600">
      {typeof icon === "string" ? (
        <Image src={icon} alt="icon" width={20} height={20} className={iconClassName}/>
      ) : (
        icon || <User className={`w-5 h-5 text-slate-50 ${iconClassName}`} />
      )}

      <input
        {...props}
        placeholder={label}
        className="w-full font-bold text-[15.37px] ml-1.5 bg-transparent text-slate-50 placeholder-white focus:outline-none"
      />
    </div>
  );
};

export default IconInput;
