import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { MdOutlineLogout } from "react-icons/md";

import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { useAuth } from "@/context/AuthProvider/useAuth";

const formSchema = z.object({
    price: z.number(),
    stock: z.number(),
})

export function Nav() {
    const [date, setDate] = useState<Date>();
    const [isOpen, setIsOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const formattedDate = date ? format(date, "PPP", { locale: ptBR }) : "Data";

    const auth = useAuth();

    const navList = (
        <ul className={`flex gap-2`}>
            <div className="flex h-5 items-center space-x-4 text-sm text-white">
                {auth.email ?
                    (<>
                        <MdPerson size={24} />
                        <div style={{ marginLeft: 0 }}>{auth.email}</div>
                        <Separator orientation="vertical" className="bg-white" />
                        <Link to={"/login"} onClick={() => auth.logout()}><MdOutlineLogout size={24} /></Link>
                    </>) :
                    (<>
                        <MdPerson size={24} />
                        <Link to={"/login"}>LOGIN</Link>
                        <Separator orientation="vertical" className="bg-white" />
                        <Link to={"/cadastro"}>CADASTRAR</Link>
                    </>)
                }
            </div>
        </ul>
    )
    return (
        <div className="mt-2 mb-10 mx-auto w-full">
            <div className="sticky top-0 z-10 h-max max-w-full px-4 py-2 bg-background text-primary bg-indigo-500 rounded-t-md">
                <div className={`flex items-center justify-between`}>
                    <div className="flex items-center gap-4 text-white">
                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            <Link to={"/home"}>Locadora BD</Link>
                        </h3>
                    </div>
                    <div className="text-white">
                        <Link to={"/home"}>Veículos</Link>
                    </div>
                    {
                        auth.email &&
                        <div className="text-white">
                            <Link to={"/minhas_locacoes"}>Minhas Locações</Link>
                        </div>
                    }
                    {
                        auth.email && auth.email.includes('@admin') &&
                        <div className="text-white">
                            <Link to={"/admin/veiculos"}>Admin</Link>
                        </div>
                    }
                    <div className="mr-4">{navList}</div>
                </div>
            </div>
            <div className="bg-indigo-700 rounded-b-md">
                <div className="flex justify-between gap-6 mx-auto p-7">
                    <Input type="text" className="bg-white" />
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-auto justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formattedDate}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onDayClick={
                                    (day) => {
                                        setDate(day)
                                        setCalendarOpen(false)
                                    }
                                }
                                locale={ptBR}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div >
    );
}