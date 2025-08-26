"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  NotebookPen,
  MessageSquareHeart,
  Moon,
  Sun,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={24} />,
    href: "/dashboard",
  },
  {
    title: "Seu diário emocional",
    icon: <NotebookPen size={24} />,
    href: "/diario",
  },
  {
    title: "Athena",
    icon: <MessageSquareHeart size={24} />,
    href: "/athena",
  },
];

const bottomItems = [
  {
    title: "Perguntas Frequentes",
    icon: <HelpCircle size={24} />,
    href: "/faq",
  },
  {
    title: "Sair da conta",
    icon: <LogOut size={24} />,
    href: "/logout",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`fixed left-0 top-0 h-screen shadow-lg border-r transition-all duration-500 z-40 
      ${isOpen ? "w-100 pl-9 py-6" : "w-37.5 py-6"} 
      hidden md:flex flex-col justify-between
      ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}
    >
      {/* Top */}
      <div>
        <div
          className={`flex items-center gap-2 p-4 pb-1 ${isOpen ? "justify-start pl-5" : "justify-center"}`}
        >
          <Image
            src={theme === 'dark' ? "/images/Logo-blue-600-w2.svg" : "/images/Logo.svg"}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
                     {isOpen && (
             <span className={`font-semibold text-[22px] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
               MindTracking
             </span>
           )}
        </div>

        <nav className="flex flex-col gap-1 mt-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 p-3 mx-2 rounded-lg transition-colors ${isOpen ? "justify-start" : "justify-center"}
              ${theme === 'dark' 
                ? 'text-gray-100 hover:bg-gray-700' 
                : 'text-[#0F172A] hover:bg-gray-100'}`}
            >
              {item.icon}
              {isOpen && <span className={`font-semibold text-[22px] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="mb-4 flex flex-col justify-center">
        {/* Toggle Theme Button */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-3 p-3 mx-2 rounded-lg transition-colors ${isOpen ? "justify-start" : "justify-center"}
          ${theme === 'dark' 
            ? 'text-gray-100 hover:bg-gray-700' 
            : 'text-[#0F172A] hover:bg-gray-100'}`}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          {isOpen && <span className={`font-semibold text-[22px] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          </span>}
        </button>

        {bottomItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center gap-3 p-3 mx-2 rounded-lg transition-colors ${isOpen ? "justify-start" : "justify-center"}
            ${theme === 'dark' 
              ? 'text-gray-100 hover:bg-gray-700' 
              : 'text-[#0F172A] hover:bg-gray-100'}`}
          >
            {item.icon}
            {isOpen && <span className={`font-semibold text-[22px] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</span>}
          </Link>
        ))}

        <Link
          href="/perfil"
          className={`flex px-3 mt-4 transition-colors hover:opacity-80 ${isOpen ? "justify-start pl-5" : "justify-center"}`}
        >
          <Image
            src="/images/Perfil.png"
            alt="User"
            width={50}
            height={50}
            className="rounded-full border cursor-pointer"
          />
        </Link>
      </div>
    </aside>
  );
}
