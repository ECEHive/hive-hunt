import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ValidSolutionCard({ onClose }: { onClose: () => void }) {
	return (
		<Card className="bg-green-100 border-green-300 mb-4">
			<CardHeader className="flex flex-row items-start justify-between">
				<CardTitle className="text-green-800 text-xl">Clue Solved</CardTitle>
				<CardAction>
					<Button
						variant="ghost"
						size="sm"
						onClick={onClose}
						aria-label="Close"
						className="text-green-800"
					>
						✕
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	);
}

export default ValidSolutionCard;
