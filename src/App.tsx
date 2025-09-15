import "./index.css";

import { useGameState, startGame } from "./hooks/game-state";
import { useEffect, useState } from "react";
import CompletedCard from "./components/completed-card";
import ClueCard from "./components/clue-card";
import StartCard from "./components/start-card";
import { useSolutions } from "./hooks/solutions";
import ValidSolutionCard from "./components/valid-solution-card";
import InvalidSolutionCard from "./components/invalid-solution-card";

export function App() {
	const { gameState } = useGameState();
	const [allowStart, setAllowStart] = useState<boolean>(false);

	// Determine if ?start is present on initial load only
	useEffect(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		if (params.has("start")) {
			setAllowStart(true);
			// Clean URL (optional) to remove the start hint so refreshes don't always show
			params.delete("start");
			const newSearch = params.toString();
			const newUrl =
				window.location.pathname +
				(newSearch ? `?${newSearch}` : "") +
				window.location.hash;
			window.history.replaceState({}, "", newUrl);
		}
	}, []);
	const {
		showIsInvalidSolution,
		showIsValidSolution,
		setShowIsInvalidSolution,
		setShowIsValidSolution,
	} = useSolutions();
	// All clue logic handled within dedicated components; this root orchestrates high-level card display.

	return (
		<div className="container mx-auto px-4 py-8 text-center relative max-w-xl">
			{showIsValidSolution && (
				<ValidSolutionCard onClose={() => setShowIsValidSolution(false)} />
			)}
			{showIsInvalidSolution && (
				<InvalidSolutionCard onClose={() => setShowIsInvalidSolution(false)} />
			)}
			{!gameState.hasStarted && allowStart && <StartCard onStart={startGame} />}
			{!gameState.hasCompleted && gameState.currentClue !== null && (
				<ClueCard />
			)}
			{gameState.hasCompleted && <CompletedCard gameState={gameState} />}
		</div>
	);
}

export default App;
