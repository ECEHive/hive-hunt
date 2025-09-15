import { useEffect, useState } from "react";
import { completeClue, getGameState } from "./game-state";

export type InvalidSolution = { clueId: number; word: string } | null;

export const useSolutions = () => {
	const [showIsInvalidSolution, setShowIsInvalidSolution] =
		useState<boolean>(false);
	const [showIsValidSolution, setShowIsValidSolution] =
		useState<boolean>(false);

	useEffect(() => {
		try {
			console.log("Processing solution from URL params");

			if (
				typeof window === "undefined" ||
				typeof URLSearchParams === "undefined"
			)
				return;
			const params = new URLSearchParams(window.location.search);
			const clueIdParam = params.get("clueId");
			const wordParam = params.get("word");
			if (!clueIdParam) return;

			const parsedId = Number(clueIdParam);
			if (Number.isNaN(parsedId)) return;

			console.log(`Found solution for clueId=${parsedId} word=${wordParam}`);

			const state = getGameState();
			if (state.currentClue !== null && parsedId === state.currentClue) {
				// Correct solution for current clue
				completeClue(parsedId, wordParam ?? "");
				setShowIsValidSolution(true);
				console.log("Completed clue from URL params");
			} else {
				setShowIsInvalidSolution(true);
				console.log("Invalid solution from URL params");
			}

			// Remove processed params from URL
			params.delete("clueId");
			params.delete("word");
			const newSearch = params.toString();
			const newUrl =
				window.location.pathname +
				(newSearch ? `?${newSearch}` : "") +
				window.location.hash;
			window.history.replaceState({}, "", newUrl);
		} catch {
			// ignore
		}
	}, []);

	return {
		showIsInvalidSolution,
		showIsValidSolution,
		setShowIsInvalidSolution,
		setShowIsValidSolution,
	} as const;
};
