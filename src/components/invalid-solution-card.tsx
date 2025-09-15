import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function InvalidSolutionCard({ onClose }: { onClose: () => void }) {
	return (
		<Card className="bg-red-100 border-red-300 mb-4">
			<CardHeader className="flex flex-row items-start justify-between">
				<CardTitle className="text-red-800 text-xl">Invalid Solution</CardTitle>
				<CardAction>
					<Button
						variant="ghost"
						size="sm"
						onClick={onClose}
						aria-label="Close"
						className="text-red-800"
					>
						✕
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-red-700">
					Oops! Thats not the right solution to your clue. Locations must be
					visited in the correct order.
				</p>
			</CardContent>
		</Card>
	);
}

export default InvalidSolutionCard;
