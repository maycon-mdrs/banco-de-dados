import { useNavigate } from "react-router-dom";

export function FormsLocacao() {
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Collect form data
        const formData = new FormData(event.target);
        const reservation = {
            date: formData.get("date"),
            card: formData.get("card"),
        };

        // Save the reservation data (for simplicity, we'll use local storage)
        const reservations = JSON.parse(localStorage.getItem("reservations")!) || [];
        reservations.push(reservation);
        localStorage.setItem("reservations", JSON.stringify(reservations));

        // Redirect to the success page
        navigate("/minhas_locacoes");
    };

    return (
        <form className="locacao-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">Data:</label>
                <input type="date" id="date" name="date" required />
            </div>
            <div>
                <label htmlFor="card">Cartão:</label>
                <input type="text" id="card" name="card" placeholder="Número do Cartão" required />
            </div>
            <button type="submit">Confirmar Reserva</button>
        </form>
    );
}