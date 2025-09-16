import "./index.css";
import { useGameState, startGame } from "./hooks/game-state";
import CompletedCard from "./components/completed-card";
import ClueCard from "./components/clue-card";
import StartCard from "./components/start-card";
import { useGameQueryParams } from "./hooks/game-query-params";
import ValidSolutionCard from "./components/valid-solution-card";
import InvalidSolutionCard from "./components/invalid-solution-card";
import Logo from "./logo.svg";
import NotFoundCard from "./components/not-found-card";

export function App() {
	const { gameState } = useGameState();
	const {
		allowStart,
		showIsInvalidSolution,
		showIsValidSolution,
		setShowIsInvalidSolution,
		setShowIsValidSolution,
	} = useGameQueryParams();

	return (
		<div className="container mx-auto px-4 py-8 text-center relative max-w-xl flex flex-col">
			<img src={Logo} alt="Hive Hunt Logo" className="w-full h-16 p-4" />
			{!gameState.hasStarted && !allowStart && <NotFoundCard />}
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
