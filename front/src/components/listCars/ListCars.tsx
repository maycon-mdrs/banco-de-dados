import { CardCar } from '@/components/cardCar/CardCar';

export function ListCars() {
    const cars = [
        {
            image: "https://www.localiza.com/brasil-site/geral/Frota/MOBI.png",
            title: "Carro 1",
            description: "Descrição do carro 1",
        },
        {
            image: "https://www.localiza.com/brasil-site/geral/Frota/MOBI.png",
            title: "Carro 2",
            description: "Descrição do carro 2",
        },
        {
            image: "https://www.localiza.com/brasil-site/geral/Frota/MOBI.png",
            title: "Carro 3",
            description: "Descrição do carro 3",
        },
    ];
    return (
        <div className='flex flex-wrap justify-between'>
            {cars.map((car) => (
                <div key={car.title} className='flex w-full justify-center sm:w-full md:w-1/3 lg:w-1/3 p-2'>
                    <CardCar
                        key={car.title+car.description}
                        image={car.image}
                        title={car.title}
                        description={car.description}
                    />
                </div>
            ))}
        </div>
    );
}