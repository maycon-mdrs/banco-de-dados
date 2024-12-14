import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { useEffect } from "react"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Alert, message } from 'antd';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useLoginMutate } from "@/hooks/useLogin"
import { useNavigate } from "react-router-dom"
import { ILogin } from "@/interfaces/IUser"


const formSchema = z.object({
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
})

export function LoginForms() {
    const { mutate, isSuccess, isPending, isError } = useLoginMutate();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: ILogin) => {
        const loginData: ILogin = {
            email: values.email,
            password: values.password,
        }
        mutate(loginData);
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/home');
            message.success('Successful login!');
        }
    }, [isSuccess]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Para realizar as reservas dos veículos, é necessário que faça o login!
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                {
                    isError &&
                    <Alert
                        message="Email ou password incorreto!"
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
                                        <PasswordInput {...field} placeholder="***********" type="password" autoComplete="true" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" >
                            {isPending ? <LoadingSpinner /> : "Entrar"}
                        </Button>
                    </form>
                </CardContent>
            </Form>
        </Card>
    );
}