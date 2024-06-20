import { ListCars } from '@/components/listCars/ListCars';
import { Nav } from '@/components/nav/Nav';

export function HomePage() {
    
    return (
        <main className="flex flex-col max-w-5xl mx-auto">
            <Nav />
            <h2 className="text-indigo-700 mt-10 scroll-m-20 border-b border-indigo-500 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-10">
                Grupo de Carros
            </h2>
            <ListCars />
        </main>
    )
}