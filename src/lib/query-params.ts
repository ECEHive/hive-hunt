import type { GameState } from "@/hooks/game-state";

export type QueryParamEvaluation = {
	allowStart: boolean;
	solutionAttempt?: {
		clueId: number;
		word?: string;
		isValid: boolean;
	};
};

/**
 * Pure evaluation of URL query params relative to current game state.
 * No side effects; simplifies testing and reuse.
 */
export function evaluateQueryParams(
	search: string,
	state: GameState,
): QueryParamEvaluation {
	const params = new URLSearchParams(search);
	const allowStart = params.has("start");

	let solutionAttempt: QueryParamEvaluation["solutionAttempt"];
	const clueIdParam = params.get("clueId");
	if (clueIdParam) {
		const parsedId = Number(clueIdParam);
		if (!Number.isNaN(parsedId)) {
			const wordParam = params.get("word") ?? undefined;
			const isValid =
				state.currentClue !== null && parsedId === state.currentClue;
			solutionAttempt = { clueId: parsedId, word: wordParam, isValid };
		}
	}
	return { allowStart, solutionAttempt };
}

/** Remove specific query params from the current URL without pushing history. */
export function stripHandledParamsFromUrl(keys: string[]) {
	if (typeof window === "undefined") return;
	try {
		const params = new URLSearchParams(window.location.search);
		let mutated = false;
		for (const key of keys) {
			if (params.has(key)) {
				params.delete(key);
				mutated = true;
			}
		}
		if (mutated) {
			const newSearch = params.toString();
			const newUrl =
				window.location.pathname +
				(newSearch ? `?${newSearch}` : "") +
				window.location.hash;
			window.history.replaceState({}, "", newUrl);
		}
	} catch {
		// ignore errors
	}
}
