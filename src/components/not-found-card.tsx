import { Card } from "@/components/ui/card";

export function NotFoundCard() {
	return (
		<Card className="bg-card/50 backdrop-blur-sm border-muted p-6">
			<h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
			<p className="mb-4">The page you are looking for does not exist.</p>
			<p className="text-sm text-muted-foreground">
				If you belive this is an error, please contact an event coordinator.
			</p>
		</Card>
	);
}

export default NotFoundCard;
