import { FormsLocacao } from "@/components/formsLocacao/FormsLocacao";
import { useLocation } from "react-router-dom";

export function LocacaoPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const car = {
        title: params.get("title"),
        image: params.get("image"),
        description: params.get("description"),
    };

    return (
        <main className="flex justify-center items-center flex-col max-w-5xl mx-auto">
            <div>
                <h1>Locação</h1>
                <div className="car-details">
                    <img src={car.image!} alt={car.title!} />
                    <h2>{car.title}</h2>
                    <p>{car.description}</p>
                </div>
                <FormsLocacao />
            </div>
        </main>
    );
}