import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "../logo.svg";

interface StartCardProps {
	onStart: () => void;
}

export function StartCard({ onStart }: StartCardProps) {
	return (
		<Card className="bg-card/50 backdrop-blur-sm border-muted">
			<CardHeader className="items-center">
				<img
					src={logo}
					alt="Hive Hunt Logo"
					className="w-full h-20 mb-2 drop-shadow-lg"
				/>
			</CardHeader>
			<CardContent className="flex flex-col items-center">
				<Button size="lg" className="text-lg font-semibold" onClick={onStart}>
					Start Game
				</Button>
			</CardContent>
			<CardFooter className="justify-center text-xs opacity-70 mt-2">
				&copy; {new Date().getFullYear()} The Hive Makerspace
			</CardFooter>
		</Card>
	);
}

export default StartCard;
