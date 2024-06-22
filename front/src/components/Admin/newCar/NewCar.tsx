import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategoriaMutate, useCategoriaQuery } from "@/hooks/useCategoria";
import { ICategoriaVeiculo, IVeiculo } from "@/interfaces/IVeiculos";
import { useVeiculoMutate } from "@/hooks/useVeiculo";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const formSchema = z.object({
    codigo: z.string({
        required_error: "Please enter a code."
    }).max(7, {
        message: "Code must be at most 7 characters.",
    }),
    pais: z.string({
        required_error: "Please enter a country."
    }),
    estado: z.string({
        required_error: "Please enter a state."
    }),
    cidade: z.string({
        required_error: "Please enter a city."
    }),
    categoria_veiculo_tipo_categoria: z.string({
        required_error: "Please select a category."
    }),
});


export function NewCar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: categorias } = useCategoriaQuery();
    const { mutate, isSuccess, isPending } = useVeiculoMutate();

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: any) => {
        const parsedValues = {
            codigo: values.codigo,
            pais: values.pais,
            estado: values.estado,
            cidade: values.cidade,
            disponibilidade: 1,
            categoria_veiculo_tipo_categoria: values.categoria_veiculo_tipo_categoria,
        };
        console.log('parsedValues: ', parsedValues);
        mutate(parsedValues);
    }    

    const handleModal = () => {
        setIsModalOpen(prev => !prev);
        if (!isModalOpen) {
            form.reset();
        }
    }

    useEffect(() => {
        handleModal();
    }, [isSuccess])

    return (
        <Dialog open={isModalOpen} onOpenChange={handleModal}>
            <DialogTrigger asChild>
                <Button>Novo veículo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Novo veículo
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="codigo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Código da placa</FormLabel>
                                    <FormControl>
                                        <Input {...field} maxLength={7}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pais"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>País</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="estado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cidade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoria_veiculo_tipo_categoria"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a categoria" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categorias?.map((categoria: ICategoriaVeiculo, index: any) => (
                                                <SelectItem key={index} value={categoria.tipo_categoria}>{categoria.tipo_categoria}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">{isPending ? <LoadingSpinner /> : "Adicionar"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}