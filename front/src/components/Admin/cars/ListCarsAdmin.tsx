import { useVeiculoQuery } from "@/hooks/useVeiculo";
import { IVeiculo } from "@/interfaces/IVeiculos";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

// Função para agrupar veículos por categoria
function groupByCategory(veiculos: IVeiculo[]) {
    return veiculos.reduce((acc: any, veiculo: IVeiculo) => {
        const categoria = veiculo.categoria_veiculo_tipo_categoria;
        if (!acc[categoria]) {
            acc[categoria] = [];
        }
        acc[categoria].push(veiculo);
        return acc;
    }, {});
}

export function ListCarsAdmin() {
    const { data: veiculos } = useVeiculoQuery();

    if (!veiculos) {
        return <div>Loading...</div>;
    }

    const groupedVeiculos = groupByCategory(veiculos);

    // Funções de manipulação para editar e excluir
    const handleEdit = (veiculo: IVeiculo) => {
        console.log('Edit:', veiculo);
        // Implementar lógica de edição
    };

    const handleDelete = (veiculo: IVeiculo) => {
        console.log('Delete:', veiculo);
        // Implementar lógica de exclusão
    };

    return (
        <Accordion type="multiple">
            {Object.keys(groupedVeiculos).map((categoria) => (
                <AccordionItem key={categoria} value={`item-${categoria}`}>
                    <AccordionTrigger>{categoria}</AccordionTrigger>
                    <AccordionContent className="flex flex-wrap sm:justify-center md:justify-normal lg:justify-normal items-center gap-4">
                        {groupedVeiculos[categoria].map((veiculo: IVeiculo, index: number) => (
                            <Card key={index} className="w-full sm:w-1/2 lg:w-1/3">
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle>Placa: {veiculo.codigo}</CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <DotsHorizontalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleEdit(veiculo)}>
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(veiculo)}>
                                                Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-2">
                                        <span>País: {veiculo.pais}</span>
                                        <span>Estado: {veiculo.estado}</span>
                                        <span>Cidade: {veiculo.cidade}</span>
                                        <span>Disponibilidade: {veiculo.disponibilidade ? 'Disponível' : 'Indisponível'}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
