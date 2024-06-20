import { CardLogin } from "@/components/Login/CardLogin";
import CarDraw from "@/components/unDraw/CarDraw";
import EletricCar from "@/components/unDraw/EletricCar";

export function LoginPage() {
    const mensagem = "Bem-vindo à nossa aplicação de locação de veículos, onde você pode reservar o carro dos seus sonhos!"

    return (
        <div className={`container relative h-screen md:max-w-none md:grid md:grid-cols-2 md:px-0`}>
            <div className="hidden md:relative md:flex md:flex-col md:p-10 dark:border-r bg-indigo-700 text-white">
                <div className="md:absolute inset-0"></div>
                <div className="md:relative z-20 flex items-center text-md font-medium">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight italic">
                        Locatario DB
                    </h3>
                </div>
                <div className="md:flex justify-center items-center z-20 h-full w-full">
                    <CarDraw />
                </div>
                <div className="md:relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <blockquote className="border-l-2 pl-6 italic">
                            {mensagem}
                        </blockquote>
                    </blockquote>
                </div>
            </div>
            <div className="flex w-full items-center justify-center md:p-8">
                <div className="md:hidden h-9 absolute left-4 top-4 md:left-8 md:top-8">
                    <div className="md:relative z-20 flex items-center text-md font-medium">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight italic">
                            Locatario DB
                        </h3>
                    </div>
                </div>
                <div className="mt-20 mx-auto flex w-full flex-col items-center justify-center">
                    <CardLogin />
                    {/* Renderização condicional para exibir a mensagem de boas-vindas abaixo do CardLogin em telas menores */}
                    <div className="md:hidden mt-16 mb-4">
                        <blockquote className="space-y-2">
                            <blockquote className="border-l-2 pl-6 italic">
                                {mensagem}
                            </blockquote>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    )
}
