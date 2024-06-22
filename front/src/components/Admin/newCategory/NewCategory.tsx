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

const formSchema = z.object({
    title: z.string({
        required_error: "Please enter a name."
    }).min(1, {
        message: "Name must be at least 2 characters.",
    }).max(100, {
        message: "Name must be at most 100 characters.",
    }),
})

export function NewCategory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: any) => {
        console.log(values);
        handleModal()
    }

    const handleModal = () => {
        setIsModalOpen(prev => !prev);
        if (!isModalOpen) {
            form.reset();
        }
    }

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
                            name="tipoCategoria"
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
                            name="tipoVeiculo"
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
                                name="quantPassageiros"
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
                                name="quantBagagens"
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
                        <Button type="submit" className="w-full">Adicionar</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}