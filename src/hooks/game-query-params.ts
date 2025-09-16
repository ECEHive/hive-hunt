import { useEffect, useRef, useState } from "react";
import { completeClue, getGameState } from "./game-state";
import {
	evaluateQueryParams,
	stripHandledParamsFromUrl,
} from "@/lib/query-params";

export type InvalidSolution = { clueId: number; word: string } | null;

export const useGameQueryParams = () => {
	const [allowStart, setAllowStart] = useState(false);
	const [showIsInvalidSolution, setShowIsInvalidSolution] = useState(false);
	const [showIsValidSolution, setShowIsValidSolution] = useState(false);
	const processedRef = useRef(false);

	useEffect(() => {
		if (processedRef.current) return;
		processedRef.current = true;
		try {
			if (typeof window === "undefined") return;
			const state = getGameState();
			const { allowStart, solutionAttempt } = evaluateQueryParams(
				window.location.search,
				state,
			);
			setAllowStart(allowStart);
			const toStrip: string[] = [];
			if (allowStart) toStrip.push("start");
			if (solutionAttempt) {
				toStrip.push("clueId", "word");
				if (solutionAttempt.isValid) {
					completeClue(solutionAttempt.clueId, solutionAttempt.word ?? "");
					setShowIsValidSolution(true);
				} else {
					setShowIsInvalidSolution(true);
				}
			}
			if (toStrip.length) stripHandledParamsFromUrl([...new Set(toStrip)]);
		} catch {
			// ignore errors
		}
	}, []);

	return {
		allowStart,
		showIsInvalidSolution,
		showIsValidSolution,
		setShowIsInvalidSolution,
		setShowIsValidSolution,
	} as const;
};
