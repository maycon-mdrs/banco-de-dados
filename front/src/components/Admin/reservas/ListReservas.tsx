import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge } from "antd";
import { useAllReservaQuery } from "@/hooks/useReserva";
import { IReserva } from "@/interfaces/IReserva";
import { format } from "date-fns";

export function ListReservas() {
    const { data: reservas } = useAllReservaQuery();

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="border rounded-lg px-2 w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Placa veículo</TableHead>
                            <TableHead className="text-center">Locatário (CPF)</TableHead>
                            <TableHead className="text-center">Data de início</TableHead>
                            <TableHead className="text-center">Data de fim</TableHead>
                            <TableHead className="text-center">Data de devolução</TableHead>
                            <TableHead className="text-center">Valor Total</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Motorista (CPF)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservas?.map((reserva: IReserva) => (
                            <TableRow key={reserva.id_reserva}>
                                <TableCell>{reserva.veiculo_codigo}</TableCell>
                                <TableCell className="text-center">{formatCPF(reserva?.locatario_pessoa_cpf!)}</TableCell>
                                <TableCell className="text-center">{format(reserva?.data_hora_retirada!, "dd/MM/yyyy HH:mm")}</TableCell>
                                <TableCell className="text-center">{format(reserva?.data_hora_devolucao!, "dd/MM/yyyy HH:mm")}</TableCell>
                                <TableCell className="text-center">{reserva.data_hora_devolucao_efetiva ? format(reserva?.data_hora_devolucao_efetiva!, "dd/MM/yyyy HH:mm") : 'N/A'}</TableCell>
                                <TableCell className="text-center">{(reserva?.valor_categoria! + reserva?.valor_multa! + reserva?.valor_seguro!).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        count={reserva.status}
                                        color={reserva.status?.toLowerCase() !== "concluido" ? "#be123c" : "#52c41a"}
                                    />
                                </TableCell>
                                <TableCell className="text-center">{reserva.motorista_funcionario_pessoa_cpf ? formatCPF(reserva?.motorista_funcionario_pessoa_cpf!) : 'N/A'}</TableCell>
                                {/* <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <DotsHorizontalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem>Excluir</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

    function formatCPF(cpf?: string) {
        const formattedCPF = cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        return formattedCPF;
    }
}