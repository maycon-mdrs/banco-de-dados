import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { LoginForms } from "./LoginForms"
import { RegisterForms } from "./RegisterForms"

export function CardLogin() {
    return (
        <Tabs defaultValue="login" className="max-w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForms />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForms />
            </TabsContent>
        </Tabs>
    )
}
