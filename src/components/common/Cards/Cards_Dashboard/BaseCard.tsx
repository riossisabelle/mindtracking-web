"use client";
import { ReactNode } from "react";

interface BaseCardProps {
  children: ReactNode;
}

export default function BaseCard({ children }: BaseCardProps) {
  return (
    <div className="bg-gray-800 rounded-[8px] pl-[21px] pr-[33px] pt-[25px] max-w-[384px] h-full flex flex-col min-h-[150px]">
      {children}
    </div>
  );
}
