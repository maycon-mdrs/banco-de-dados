import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Alert, message } from 'antd';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useLoginMutate, useRegisterMutate } from "@/hooks/useLogin"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { IRegister } from "@/interfaces/IUser"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { useEffect, useState } from "react"
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    cpf: z.string({
        required_error: "Please enter a CPF.",
    }).min(11, {
        message: "CPF must be at least 11 characters.",
    }).max(11, {
        message: "CPF must be at most 11 characters.",
    }),
    nome: z.string({
        required_error: "Please enter a name.",
    }).min(1, {
        message: "Name must be at least 1 character.",
    }).max(100, {
        message: "Name must be at most 100 characters.",
    }),
    telefone: z.string({
        required_error: "Please enter a telefone.",
    }).min(1, {
        message: "Telefone must be at least 1 character.",
    }).max(100, {
        message: "Telefone must be at most 100 characters.",
    }),
    email: z.string({
        required_error: "Please enter an email.",
    }).email({
        message: "Please enter a valid email address.",
    }),
    password: z.string({
        required_error: "Please enter a password.",
    }).min(1, {
        message: "Password must be at least 1 character.",
    }).max(100, {
        message: "Password must be at most 100 characters.",
    }),
    confirmPassword: z.string({
        required_error: "Please confirm your password.",
    }).min(1, {
        message: "Password confirmation must be at least 1 character.",
    }).max(100, {
        message: "Password confirmation must be at most 100 characters.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Specify which field should receive the validation error message
});

export function RegisterForms() {
    const { mutate, isSuccess, isPending, isError } = useRegisterMutate();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: "",
            nome: "",
            telefone: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (values: IRegister) => {
        const RegisterData: IRegister = {
            cpf: values.cpf,
            nome: values.nome,
            telefone: values.telefone,
            email: values.email,
            password: values.password,
        }
        mutate(RegisterData);
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
            message.success('Cadastro realizado com sucesso!');
        }
    }, [isSuccess]);

    // Function to allow only numeric input
    const handleCpfChange = (e: any) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
        form.setValue('cpf', value);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cadastro</CardTitle>
                <CardDescription>
                    Caso não tenha login, faça o já seu cadastro para realizar as reservas!
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                {
                    isError &&
                    <Alert
                        message="Erro ao cadastrar!"
                        showIcon
                        className="mb-5 mx-5"
                        type="error"
                        closable
                    />
                }
                <CardContent className="space-y-2">

                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="12345678901" autoComplete="true" maxLength={11} onChange={handleCpfChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="João Silva" autoComplete="true" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="telefone"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="(11) 91234-5678" autoComplete="true" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="@gmail.com" autoComplete="true" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} type="password" autoComplete="true" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel>Confirmar password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} type="password" autoComplete="true" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" >
                            {isPending ? <LoadingSpinner /> : "Cadastrar"}
                        </Button>
                    </form>
                </CardContent>
            </Form>
        </Card>
    );
}