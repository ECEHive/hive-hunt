import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useClue } from "@/hooks/clue";
import { useGameState, useHint, getLastClueSolvedAt } from "@/hooks/game-state";
import { Hint } from "./hint";

export function ClueCard() {
	const { gameState, setGameState } = useGameState();
	const clue = useClue(gameState.currentClue);

	// Handler to mark hint as used
	const handleUseHint = (clueId: string | number) => {
		useHint(Number(clueId));
		setGameState((prev: any) => ({ ...prev })); // force update if needed
	};

	if (!clue) {
		return (
			<Card className="bg-card/50 backdrop-blur-sm border-muted">
				<CardContent className="pt-6 text-center text-lg">
					Loading...
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="bg-card/50 backdrop-blur-sm border-muted">
			<CardHeader className="items-center pb-2">
				<CardTitle className="text-3xl font-bold mb-2">
					Clue {gameState.completedClues.length + 1}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col items-center gap-4">
				<div
					className="text-lg italic leading-relaxed mb-2"
					dangerouslySetInnerHTML={{ __html: clue.text }}
				/>
				<div className="w-full mt-2">
					<Hint
						hint={clue.hint}
						clueId={clue.id}
						usedHints={gameState.usedHints}
						lastClueSolvedAt={getLastClueSolvedAt()}
						onUseHint={handleUseHint}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export default ClueCard;
