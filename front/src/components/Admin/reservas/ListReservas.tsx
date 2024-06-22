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

export function ListReservas() {
    return (
        <div className="flex flex-col w-full gap-4">
            <div className="border rounded-lg px-2 w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo de categoria</TableHead>
                            <TableHead className="text-center">Tipo de veículo</TableHead>
                            <TableHead className="text-center">Data de início</TableHead>
                            <TableHead className="text-center">Data de fim</TableHead>
                            <TableHead className="text-center">Valor Total</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow >
                            <TableCell>categoria</TableCell>
                            <TableCell className="text-center">suv</TableCell>
                            <TableCell className="text-center">10/10/24</TableCell>
                            <TableCell className="text-center">17/10/24</TableCell>
                            <TableCell className="text-center">R$450,00</TableCell>
                            <TableCell className="text-center">
                                <Badge
                                    count={`Andamento`}
                                    color="#be123c"
                                />
                            </TableCell>
                            <TableCell className="text-center">
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
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}