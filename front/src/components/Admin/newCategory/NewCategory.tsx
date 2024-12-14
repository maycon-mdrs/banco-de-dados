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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICategoriaVeiculo } from "@/interfaces/IVeiculos";
import { useCategoriaMutate } from "@/hooks/useCategoria";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const formSchema = z.object({
    tipo_categoria: z.string({
        required_error: "Por favor, insira um tipo de categoria."
    }).min(2, {
        message: "O tipo de categoria deve ter pelo menos 2 caracteres.",
    }).max(100, {
        message: "O tipo de categoria deve ter no máximo 100 caracteres.",
    }),
    tipo_veiculo: z.string({
        required_error: "Por favor, insira um tipo de veículo."
    }).min(2, {
        message: "O tipo de veículo deve ter pelo menos 2 caracteres.",
    }).max(100, {
        message: "O tipo de veículo deve ter no máximo 100 caracteres.",
    }),
    preco_dia: z.string({
        required_error: "Por favor, insira um preço por dia."
    }).min(0, {
        message: "O preço por dia deve ser no mínimo 0.",
    }),
    multa_hora: z.string({
        required_error: "Por favor, insira uma multa por hora."
    }).min(0, {
        message: "A multa por hora deve ser no mínimo 0.",
    }),
    quant_passageiros: z.string({
        required_error: "Por favor, insira a quantidade de passageiros."
    }).min(0, {
        message: "A quantidade de passageiros deve ser no mínimo 0.",
    }),
    quant_bagagens: z.string({
        required_error: "Por favor, insira a quantidade de bagagens."
    }).min(0, {
        message: "A quantidade de bagagens deve ser no mínimo 0.",
    }),
});


export function NewCategory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate, isSuccess, isPending } = useCategoriaMutate();
    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: any) => {
        const data = {
            ...values,
            quant_passageiros: values.quant_passageiros,
            quant_bagagens: values.quant_bagagens,
            data: new Date(),
            multa_hora: values.multa_hora,
            preco_dia: values.preco_dia
        };
        console.log('parsedValues: ', data);
        mutate(data);
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
                <Button>Nova categoria</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Nova categoria
                    </DialogTitle>
                    <DialogDescription>
                        Adicione uma nova categoria para os veículos.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="tipo_categoria"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de categoria</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tipo_veiculo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de veículo</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between gap-2">
                            <FormField
                                control={form.control}
                                name="preco_dia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preço/dia</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="multa_hora"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Multa/hora</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-between gap-2">
                            <FormField
                                control={form.control}
                                name="quant_passageiros"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quant. de passageiros</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quant_bagagens"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quant. de bagagens</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">{isPending ? <LoadingSpinner /> : "Adicionar"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}