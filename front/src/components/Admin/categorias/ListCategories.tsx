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
import { ICategoriaVeiculo } from "@/interfaces/IVeiculos";
import { useCategoriaQuery } from "@/hooks/useCategoria";

export function ListCategories() {
    const { data: categorias } = useCategoriaQuery();

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="border rounded-lg px-2 w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo de categoria</TableHead>
                            <TableHead className="text-center">Tipo de veículo</TableHead>
                            <TableHead className="text-center">Valor/dia</TableHead>
                            <TableHead className="text-center">Multa/hora</TableHead>
                            <TableHead className="text-center">Quant. de Passageiros</TableHead>
                            <TableHead className="text-center">Quant. de Bagagens</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categorias?.map((categoria: ICategoriaVeiculo) => (
                            <TableRow key={`${categoria.tipo_categoria}-${categoria.data}`}>
                                <TableCell>{categoria.tipo_categoria}</TableCell>
                                <TableCell className="text-center">{categoria.tipo_veiculo}</TableCell>
                                <TableCell className="text-center">{categoria.preco_dia}</TableCell>
                                <TableCell className="text-center">{categoria.multa_hora}</TableCell>
                                <TableCell className="text-center">{categoria.quant_passageiros}</TableCell>
                                <TableCell className="text-center">{categoria.quant_bagagens}</TableCell>
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
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}