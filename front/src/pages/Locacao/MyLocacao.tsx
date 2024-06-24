import { useEffect, useState } from "react";
import { Locacoes } from "@/components/MyLocacao/Locacoes";
import { Nav } from "@/components/nav/Nav";

interface Reservation {
    date: string;
    card: string;
}

export function MyLocacao() {
    return (
        <main className="flex flex-col max-w-5xl mx-auto">
            <Nav />
            <h2 className="text-indigo-700 mt-10 scroll-m-20 border-b border-indigo-500 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-10">
                Minhas Reservas
            </h2>
            <Locacoes />
        </main>

    );
}