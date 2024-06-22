import { ListCategories } from "@/components/Admin/categorias/ListCategories";
import { NewCategory } from "@/components/Admin/newCategory/NewCategory";
import { MyNav } from "@/components/nav/MyNav";

export function GrupoCarrosPage() {
    return (
        <>
            <MyNav />
            <div className="flex-1 space-y-4 p-4 lg:px-8 pt-6 justify-center">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Grupo de carros</h2>
                    <div className="flex items-center space-x-2">
                        <NewCategory />
                    </div>
                </div>
                <ListCategories />
            </div>
        </>
    );
}