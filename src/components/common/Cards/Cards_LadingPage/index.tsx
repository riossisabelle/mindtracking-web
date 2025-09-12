import React from "react";

interface CardProps {
    title: string,
    parag: string
}

export default function Card(props : CardProps) {

    return (
        <div className="flex flex-col gap-6 px-6 py-9 md:w-96 md:h-60 md:px-8 md:py-12 rounded-[10px] border-[2.5px] border-blue-600 bg-slate-900/10 text-center text-slate-900">
            <h1 className="text-lg md:text-2xl font-[700]">{props.title}</h1>

            <p className="text-sm md:text-base font-semibold">{props.parag}</p>
        </div>
    )
}