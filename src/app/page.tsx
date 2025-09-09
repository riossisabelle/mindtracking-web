"use client";

// import { useState } from "react";
// import { useTheme } from "../contexts/ThemeContext";
import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Button from "@/components/common/Buttons";
import { Inter } from "next/font/google";
import Text from "@/components/common/Text";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <div>
        <Header />

        <main className="flex height-[544px] max-w-[1150px] mt-10 self-stretch m-auto items-center justify-between">
          <div className="flex flex-col w-[47em] items-start gap-[2.56em] pl-20">
            <Text 
              size="5xl"
              weight="bold"
              color="text-slate-900"
              align="left"
              lineHeight="normal"
              text="Cuide da sua mente com MindTracking"  
            />
            <Text
              size="lg"
              weight="semibold"
              align="left"
              lineHeight="snug"
              text="Bem-vindo ao MindTracking! Aqui, você pode monitorar seu bem-estar emocional e mental de forma simples e eficaz"
            /
            >
            <div className="flex gap-3.5">
              <Button 
                text="Fazer login"
                secondary={false}
              />
              <Button 
                text="Cadastra-se"
                secondary={true}
              />
            </div>
          </div>
          
          <Image src="/images/Athena-com-prancheta.png" alt="Athena segurando uma prancheta" width={220} height={427} />
        </main>

        {/* <Footer /> */}
    </div>
  );
}
