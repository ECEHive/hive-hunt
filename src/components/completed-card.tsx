import { Card, CardContent } from "@/components/ui/card";
import type { GameState } from "@/hooks/game-state";
import { getBreakdown } from "@/lib/scoring";

export function CompletedCard({ gameState }: { gameState: GameState }) {
	// Calculate score and detailed breakdown
	const scoreData =
		gameState.startTime && gameState.endTime
			? getBreakdown(
					gameState.startTime,
					gameState.endTime,
					gameState.usedHints,
					gameState.completedClues,
				)
			: {
					pace: 0,
					distance: 0,
					score: 0,
					duration: "N/A",
					start: "N/A",
					end: "N/A",
				};

	return (
		<Card className="bg-card/50 backdrop-blur-sm border-muted">
			<CardContent className="pt-6">
				<h1 className="text-5xl font-bold my-4 leading-tight">
					Hunt Completed!
				</h1>
				<p>
					Congratulations! Show the information below to an event coordinator.
				</p>

				{/* Score Section */}
				<div className="mt-4 p-4 bg-primary/10 rounded-lg border-2 border-primary">
					<h2 className="text-xl font-bold text-center mb-2">Final Score</h2>
					<div className="text-3xl font-bold text-center text-primary">
						{scoreData.score.toLocaleString()}
					</div>
				</div>

				{/* Verification Phrase */}
				<div className="mt-4 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
					<h2 className="text-lg font-bold text-center mb-3 text-green-800">
						Verification Phrase
					</h2>
					<div className="text-center">
						<div className="text-2xl font-mono font-bold text-green-900 bg-white p-4 rounded-lg border border-green-300 leading-relaxed">
							{gameState.completedClues
								.sort((a, b) => a.id - b.id)
								.map((clue) => clue.word)
								.join(" ")}
						</div>
						<p className="text-sm text-green-700 mt-2">
							Show this phrase to verify all locations were found.
						</p>
					</div>
				</div>

				{/* Game Statistics */}
				<div className="mt-4 p-4 bg-muted/50 rounded-lg">
					<h3 className="font-semibold mb-3 text-lg">Game Statistics</h3>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between items-center">
							<span className="font-medium">Start Time:</span>
							<span className="text-right">{scoreData.start}</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">End Time:</span>
							<span className="text-right">{scoreData.end}</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">Total Time:</span>
							<span className="text-right font-mono">{scoreData.duration}</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">Hints Used:</span>
							<span className="text-right font-mono">
								{gameState.usedHints.length}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">Distance:</span>
							<span className="text-right font-mono">
								{scoreData.distance.toFixed(0)} m
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">Speed:</span>
							<span className="text-right font-mono">
								{scoreData.pace.toFixed(2)} m/s
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default CompletedCard;
