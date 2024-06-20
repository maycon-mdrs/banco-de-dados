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
import { useState } from "react"
import { Form, Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';


export function LoginForms() {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    async function onFinish(values: { email: string, password: string }) {
        setLoading(true)
        console.log('Success:', values);
        setLoading(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Para realizar as reservas dos veículos, é necessário que faça o login!
                </CardDescription>
            </CardHeader>
            <Form
                name="login-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <CardContent className="space-y-2">

                    {/* EMAIL */}
                    <Form.Item
                        name="email-login"
                        rules={[
                            {
                                type: 'email',
                                message: 'Por favor, inserir um e-mail válido!'
                            },
                            {
                                required: true,
                                message: 'Por favor, inserir seu e-mail!'
                            }
                        ]}
                        validateTrigger="onBlur"
                        className="text-primary m-0"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="email-login">E-mail</Label>
                            <Input id="email-login" />
                        </div>
                    </Form.Item>

                    {/* SENHA */}
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, inserir sua senha!'
                            }
                        ]}
                        className="text-primary"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="password">Senha</Label>
                            <PasswordInput
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </Form.Item>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full" >
                        {loading ? loadingIcon : 'Entrar'}
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    );
}