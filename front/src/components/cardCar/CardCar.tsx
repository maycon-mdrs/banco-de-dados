import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CarProps {
    image: string;
    title: string;
    description: string;
}

export function CardCar(props: CarProps) {
    return (
        <Card className="w-[250px]">
            <CardHeader className="flex justify-center text-center">
                <CardTitle>{props.title}</CardTitle>
                <img src={props.image} alt={"carro"} className="w-auto h-32 object-scale-down" />
            </CardHeader>
            <CardContent className="flex justify-center text-center">
                {props.description}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button>RESERVE AGORA</Button>
            </CardFooter>
        </Card>
    );
}