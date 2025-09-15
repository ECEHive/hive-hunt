import { Card, CardContent } from "@/components/ui/card";
import type { GameState } from "@/hooks/game-state";
import { getScoreBreakdown } from "@/lib/utils";

export function CompletedCard({ gameState }: { gameState: GameState }) {
	// Calculate score and detailed breakdown
	const scoreData =
		gameState.startTime && gameState.endTime
			? getScoreBreakdown(
					gameState.startTime,
					gameState.endTime,
					gameState.usedHints,
					gameState.completedClues,
				)
			: {
					totalScore: 0,
					velocityScore: 0,
					hintPenalty: 0,
					totalDistance: 0,
					timeInSeconds: 0,
					efficiency: 0,
				};

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);

		if (hours > 0) {
			return `${hours}h ${minutes}m ${secs}s`;
		}
		return `${minutes}m ${secs}s`;
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<h1 className="text-5xl font-bold my-4 leading-tight">
					Hunt Completed!
				</h1>
				<p>
					Congratulations! Show the information below to an event coordinator.
				</p>

				{/* Verification Sentence - Most Prominent */}
				<div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
					<h2 className="text-xl font-bold text-center mb-3 text-green-800">
						Verification Sentence
					</h2>
					<div className="text-center">
						<div className="text-2xl font-mono font-bold text-green-900 bg-white p-4 rounded-lg border border-green-300 leading-relaxed">
							&quot;
							{gameState.completedClues
								.sort((a, b) => a.id - b.id)
								.map((clue) => clue.word)
								.join(" ")}
							&quot;
						</div>
						<p className="text-sm text-green-700 mt-2">
							Show this sentence to verify all clues were found
						</p>
					</div>
				</div>

				{/* Score Section */}
				<div className="mt-4 p-4 bg-primary/10 rounded-lg border-2 border-primary">
					<h2 className="text-xl font-bold text-center mb-2">Final Score</h2>
					<div className="text-3xl font-bold text-center text-primary">
						{scoreData.totalScore.toLocaleString()}
					</div>
					<p className="text-center text-sm text-muted-foreground mt-1">
						(lower is better)
					</p>
				</div>

				{/* Game Statistics */}
				<div className="mt-4 p-4 bg-muted/50 rounded-lg">
					<h3 className="font-semibold mb-3 text-lg">Game Statistics</h3>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between items-center">
							<span className="font-medium">Start Time:</span>
							<span className="text-right">
								{gameState.startTime
									? new Date(gameState.startTime).toLocaleString()
									: "N/A"}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">End Time:</span>
							<span className="text-right">
								{gameState.endTime
									? new Date(gameState.endTime).toLocaleString()
									: "N/A"}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">Total Time:</span>
							<span className="text-right font-mono">
								{formatTime(scoreData.timeInSeconds)}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">Hints Used:</span>
							<span className="text-right font-mono">
								{gameState.usedHints.length}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">Distance Traveled:</span>
							<span className="text-right font-mono">
								{scoreData.totalDistance}m
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="font-medium">Efficiency:</span>
							<span className="text-right font-mono">
								{scoreData.efficiency}s per 100m
							</span>
						</div>
					</div>

					<div className="mt-4 pt-4 border-t border-muted">
						<h4 className="font-semibold mb-2">Score Breakdown</h4>
						<div className="text-sm text-muted-foreground space-y-1">
							<div>
								Efficiency score: {scoreData.velocityScore.toLocaleString()}{" "}
								points
							</div>
							<div>
								Hint penalty: +{scoreData.hintPenalty.toLocaleString()} points (
								{gameState.usedHints.length} × 300)
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default CompletedCard;
