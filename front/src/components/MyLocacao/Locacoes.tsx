import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from 'antd';

/* 
    <Badge
        count={`- ${formatCurrency(item.outflow)}`}
        color="#be123c"
    /> :
    <Badge
        count={`+ ${formatCurrency(item.inflow)}`}
        color="#52c41a"
    />
*/
export function Locacoes() {
    return (
        <div className="flex flex-col w-full gap-4">
            <div className="border rounded-lg px-2 w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-center">Veiculo</TableHead>
                            <TableHead className="text-center">Valor</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow >
                            <TableCell>13/02/24</TableCell>
                            <TableCell className="text-center">carro</TableCell>
                            <TableCell className="text-center">R$120,00</TableCell>
                            <TableCell className="text-center">
                                <Badge
                                    count={`Andamento`}
                                    color="#52c41a"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}