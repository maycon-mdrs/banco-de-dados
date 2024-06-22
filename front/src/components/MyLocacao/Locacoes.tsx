import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthProvider/useAuth";
import { useReservaByCpfQuery } from "@/hooks/useReserva";
import { IReserva } from "@/interfaces/IReserva";
import { Badge } from 'antd';
import { differenceInDays, differenceInHours, format } from 'date-fns';

export function Locacoes() {
    const auth = useAuth();
    const { data: reservas } = useReservaByCpfQuery(auth.cpf!);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (dateString: string | Date) => {
        return format(new Date(dateString.toString()), 'dd/MM/yyyy HH:mm');
    };

    const calculateMulta = (reserva: IReserva) => {
        const dataDevolucao = new Date(reserva.data_hora_devolucao!);
        const dataDevolucaoEfetiva = reserva.data_hora_devolucao_efetiva
            ? new Date(reserva.data_hora_devolucao_efetiva)
            : new Date();

        const hoursLate = differenceInHours(dataDevolucaoEfetiva, dataDevolucao);
        const multa = reserva.valor_multa || 0;

        return multa * Math.max(0, hoursLate);
    };

    const calculateTotal = (reserva: IReserva) => {
        const categoria = reserva.valor_categoria || 0;
        const multa = calculateMulta(reserva);
        const seguro = reserva.valor_seguro || 0;
        const desconto = reserva.valor_desconto || 0;

        const dataRetirada = new Date(reserva.data_hora_retirada!);
        const dataDevolucao = new Date(reserva.data_hora_devolucao!);

        const days = differenceInDays(dataDevolucao, dataRetirada);

        const valorTotal = (categoria * days) + seguro - desconto + multa;

        return valorTotal;
    };

    let reservaStatus = {
        status: ['confirmado', 'andamento', 'pendente', 'concluido'] // Exemplo de array de status
      };

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="border rounded-lg px-2 w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data retirada</TableHead>
                            <TableHead>Data de entrega</TableHead>
                            <TableHead>Data de entrega efetiva</TableHead>
                            <TableHead className="text-center">Veículo</TableHead>
                            <TableHead className="text-center">Valor multa</TableHead>
                            <TableHead className="text-center">Valor total</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservas?.map((reserva: IReserva) => (
                            <TableRow key={reserva.id_reserva}>
                                <TableCell>{formatDate(reserva?.data_hora_retirada!)}</TableCell>
                                <TableCell>{formatDate(reserva?.data_hora_devolucao!)}</TableCell>
                                <TableCell>{reserva.data_hora_devolucao_efetiva ? formatDate(reserva?.data_hora_devolucao_efetiva!) : "N/A"}</TableCell>
                                <TableCell className="text-center">{reserva.veiculo_codigo}</TableCell>
                                <TableCell className="text-center">
                                    {formatCurrency(calculateMulta(reserva))}
                                </TableCell>
                                <TableCell className="text-center">
                                    {formatCurrency(calculateTotal(reserva))}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        count={reserva?.status!.charAt(0).toUpperCase() + reserva?.status!.slice(1)}
                                        color={reservaStatus.status.includes(reserva?.status!.toLowerCase()) ? "#52c41a" : "#be123c"}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}