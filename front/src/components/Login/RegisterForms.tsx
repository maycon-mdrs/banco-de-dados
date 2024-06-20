import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react"
import { Form } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

export function RegisterForms() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    async function onFinish(values: { name: string, email: string, password: string }) {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cadastro</CardTitle>
                <CardDescription>
                    Caso não tenha login, faça o já seu cadastro para realizar as reservas!
                </CardDescription>
            </CardHeader>
            <Form
                name="register-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <CardContent className="space-y-2">
                    {/* NOME */}
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, inserir seu nome!'
                            }
                        ]}
                        className="text-primary m-0"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" />
                        </div>
                    </Form.Item>

                    {/* CPF */}
                    <Form.Item
                        name="cpf"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, inserir seu cpf!'
                            }
                        ]}
                        className="text-primary m-0"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input id="cpf" type="number"/>
                        </div>
                    </Form.Item>

                    {/* CELULAR */}
                    <Form.Item
                        name="telefone"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, inserir seu N° de Telefone!'
                            }
                        ]}
                        className="text-primary m-0"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="telefone">N° de Telefone</Label>
                            <Input id="telefone" type="number" />
                        </div>
                    </Form.Item>

                    {/* EMAIL */}
                    <Form.Item
                        name="email"
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
                        className="text-primary"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" />
                        </div>
                    </Form.Item>

                    {/* SENHA */}
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, inserir uma senha!',
                            },
                            {
                                min: 3,
                                message: 'A senha deve conter no mínimo 3 caracteres!',
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

                    {/* CONFIRMAR SENHA */}
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Confirme sua senha!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Por favor, verifique novamente. As senhas digitadas não coincidem!'));
                                },
                            }),
                        ]}
                        className="text-primary"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="confirm">Confrimar senha</Label>
                            <PasswordInput
                                id="confirm"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </Form.Item>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full">
                        {loading ? loadingIcon : 'Cadastrar'}
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    );
}