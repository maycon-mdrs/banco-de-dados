import { NewCar } from "@/components/Admin/newCar/NewCar";
import { MyNav } from "@/components/nav/MyNav";

export function AdminPage() {
    return (
        <>
            <MyNav />
            <div className="flex-1 space-y-4 p-4 lg:px-8 pt-6 justify-center">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Carros</h2>
                    <div className="flex items-center space-x-2">
                        <NewCar />
                    </div>
                </div>
            </div>
        </>
    );
}