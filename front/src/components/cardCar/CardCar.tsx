import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInDays, format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Flex, Progress } from 'antd';
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from "react-router-dom";
import { IReserva, IReservaCreate } from "@/interfaces/IReserva";
import { useReservaMutation } from "@/hooks/useReserva";
import { useAuth } from "@/context/AuthProvider/useAuth";
import { useVeiculoQuery } from "@/hooks/useVeiculo";
import { ICategoriaVeiculo, IVeiculo } from "@/interfaces/IVeiculos";
import { useCategoriaQuery } from "@/hooks/useCategoria";


interface CarProps {
    image: string;
    title: string;
    description: {
        preco_dia: number,
        tipo_veiculo: string,
        quant_passageiros: number,
        quant_bagagens: number
    };
}

interface ReservationInfo {
    image: string;
    title: string;
    description: {
        preco_dia: number,
        tipo_veiculo: string,
        quant_passageiros: number,
        quant_bagagens: number
    };
    startDate?: Date;
    endDate?: Date;
    insurance?: boolean;
    paymentMethod?: string;
}

export function CardCar(props: CarProps) {
    const { mutate } = useReservaMutation();
    const { data: categorias } = useCategoriaQuery();
    const { data: veiculos } = useVeiculoQuery();

    const auth = useAuth();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [progress, setProgress] = useState(33); // Initial progress for 3 stages
    const [currentStage, setCurrentStage] = useState(1);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [insuranceChecked, setInsuranceChecked] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    const [startCalendarOpen, setStartCalendarOpen] = useState(false);
    const [endCalendarOpen, setEndCalendarOpen] = useState(false);
    const formattedStartDate = startDate ? format(startDate, "PPP", { locale: ptBR }) : "Escolha uma data";
    const formattedEndDate = endDate ? format(endDate, "PPP", { locale: ptBR }) : "Escolha uma data";

    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStage < 3) {
            setCurrentStage(currentStage + 1);
            setProgress((currentStage + 1) * 33);
        }
    };

    const handleBack = () => {
        if (currentStage > 1) {
            setCurrentStage(currentStage - 1);
            setProgress((currentStage - 1) * 33);
        }
    };

    const isNextButtonDisabled = () => {
        if (currentStage === 1) {
            return !(startDate && endDate);
        }
        if (currentStage === 3) {
            return !paymentMethod;
        }
        return false;
    };

    const resetForm = () => {
        setProgress(33);
        setCurrentStage(1);
        setStartDate(undefined);
        setEndDate(undefined);
        setInsuranceChecked(false);
        setPaymentMethod("");
        setStartCalendarOpen(false);
        setEndCalendarOpen(false);
    };

    const handleReservation = async () => {
        // Encontra a categoria selecionada pelo usuário
        const categoriaSelecionada = categorias?.find((categoria: ICategoriaVeiculo) => categoria.tipo_categoria === props.title);

        if (!categoriaSelecionada) {
            console.error("Categoria selecionada não encontrada.");
            return;
        }

        // Encontra o primeiro veículo disponível na categoria selecionada
        const veiculoSelecionado = veiculos?.find((veiculo: IVeiculo) => veiculo.categoria_veiculo_tipo_categoria === categoriaSelecionada.tipo_categoria);

        if (!veiculoSelecionado) {
            console.error(`Nenhum veículo disponível na categoria ${categoriaSelecionada.tipo_categoria} encontrado.`);
            return;
        }

        const reservaData: IReservaCreate = {
            data_hora_retirada: format(startDate!, "yyyy-MM-dd'T'HH:mm:ss"),
            data_hora_devolucao: format(endDate!, "yyyy-MM-dd'T'HH:mm:ss"),
            status: "Pendente",
            tem_motorista: 0,
            veiculo_codigo: veiculoSelecionado.codigo,
            motorista_funcionario_pessoa_cpf: null,
            locatario_pessoa_cpf: auth.cpf,
        };

        console.log("Criando reserva com os dados:", reservaData);

        mutate(reservaData, {
            onSuccess: () => {
                navigate("/minhas_locacoes");
                setDialogOpen(false);
                resetForm();
            },
            onError: (error) => {
                console.error("Erro ao criar reserva:", error);
            }
        });
    };

    const renderStageContent = () => {
        const calcularValorTotal = () => {
            if (startDate && endDate) {
                const dias = differenceInDays(endDate, startDate); // Calcula a diferença em dias entre as datas
                const valorTotal = props.description.preco_dia * dias; // Calcula o valor total multiplicando o preço por dia pelos dias de locação
                return valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // Formata o valor como moeda brasileira
            }
            return "Escolha as datas"; // Mensagem padrão se as datas não estiverem definidas
        };
        switch (currentStage) {
            case 1:
                return (
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="start">Data de início</Label>
                            <Popover open={startCalendarOpen} onOpenChange={setStartCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-auto justify-start text-left font-normal",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formattedStartDate}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onDayClick={
                                            (day) => {
                                                setStartDate(day);
                                                setStartCalendarOpen(false);
                                            }
                                        }
                                        locale={ptBR}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="end">Data de fim</Label>
                            <Popover open={endCalendarOpen} onOpenChange={setEndCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-auto justify-start text-left font-normal",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formattedEndDate}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onDayClick={
                                            (day) => {
                                                setEndDate(day);
                                                setEndCalendarOpen(false);
                                            }
                                        }
                                        locale={ptBR}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="grid gap-4 py-4">
                        {/* Vehicle verification and insurance selection */}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Seguro (R$ 10/dia)
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Quero um motorista
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Aceitar termos e condições
                            </label>
                        </div>
                        {/* Show updated reservation value */}
                        <div className="flex flex-col gap-2">
                            <Label>Valor da Reserva</Label>
                            <div>{calcularValorTotal()}</div>
                        </div>
                    </div >
                );
            case 3:
                return (
                    <div className="grid gap-4 py-4">
                        <p className="text-sm text-gray-600 mb-4">
                            Você receberá por email os métodos de pagamento disponíveis para confirmar a reserva.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="w-[250px]">
            <CardHeader className="flex justify-center text-center">
                <CardTitle>{props.title}</CardTitle>
                <img src={props.image} alt={"carro"} className="w-auto h-32 object-scale-down" />
            </CardHeader>
            <CardContent className="flex flex-col justify-start text-center">
                <div className="flex flex-row justify-between">
                    {props.description.preco_dia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    <div>{props.description.tipo_veiculo}</div>
                </div>
                <span className="text-start">{props.description.quant_passageiros} passageiros</span>
                <span className="text-start">{props.description.quant_bagagens} bagagens</span>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button>RESERVE AGORA</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Alugar veículo</DialogTitle>
                            <Flex vertical gap="small">
                                <Progress percent={progress} size="small" status="active" />
                            </Flex>
                        </DialogHeader>
                        {renderStageContent()}
                        <DialogFooter>
                            {currentStage > 1 && (
                                <Button variant="outline" onClick={handleBack}>
                                    Voltar
                                </Button>
                            )}
                            {currentStage < 3 ? (
                                <Button onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Avançar
                                </Button>
                            ) : (
                                <Button type="submit" onClick={handleReservation}>
                                    Confirmar Reserva
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}
