/**
 * Mark a hint as used for a clue.
 */
export const useHint = (clueId: number) => {
	if (!state.usedHints.includes(clueId)) {
		setGameState({ usedHints: [...state.usedHints, clueId] });
	}
};

/**
 * Get the timestamp (ms) of the last clue solved, or game started if none.
 */
export const getLastClueSolvedAt = (): number => {
	if (state.completedClues.length > 0) {
		const last = state.completedClues[state.completedClues.length - 1];
		if (last && last.time) {
			return new Date(last.time).getTime();
		}
	}
	if (state.startTime) {
		return new Date(state.startTime).getTime();
	}
	return Date.now();
};
import { useEffect, useSyncExternalStore, useState } from "react";

export type CompletedClue = {
	id: number;
	time: string; // ISO string
	word: string; // Check word
};

export type GameState = {
	hasStarted: boolean;
	hasCompleted: boolean;
	currentClue: number | null;
	completedClues: CompletedClue[];
	usedHints: number[];
	startTime: string | null;
	endTime: string | null;
};

// Module-scoped shared store
const LOCAL_STORAGE_KEY = "gameState";

const initialState: GameState = {
	hasStarted: false,
	hasCompleted: false,
	currentClue: null,
	completedClues: [],
	usedHints: [],
	startTime: null,
	endTime: null,
};

type Listener = () => void;

let state: GameState = initialState;

let initialized = false;
let initializing = false;

const initGameState = () => {
	if (initialized || initializing) return;
	initializing = true;
	try {
		if (typeof localStorage !== "undefined") {
			const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
			if (saved) state = JSON.parse(saved) as GameState;
		}
	} catch {
		// ignore
	}
	initialized = true;
	initializing = false;
	notify();
};

/** Reload state from localStorage and notify subscribers if changed. */
export const reloadGameStateFromStorage = () => {
	try {
		if (typeof localStorage === "undefined") return;
		const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!saved) return;
		const parsed = JSON.parse(saved) as GameState;
		if (JSON.stringify(parsed) !== JSON.stringify(state)) {
			state = parsed;
			notify();
		}
	} catch {
		// ignore
	}
};

const listeners = new Set<Listener>();

const notify = () => listeners.forEach((l) => l());

export const getGameState = () => state;

export const isGameStateInitialized = () => initialized;

export const setGameState = (
	next: Partial<GameState> | ((prev: GameState) => GameState),
) => {
	const nextState =
		typeof next === "function"
			? (next as (p: GameState) => GameState)(state)
			: { ...state, ...next };
	state = nextState;
	try {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
	} catch {
		// ignore storage errors
	}
	notify();
	return state;
};

// Mutation helpers
import { clues } from "../lib/clues";

/**
 * Start the game.
 */
export const startGame = () => {
	// Find a random clue to start with
	const availableClueIds = clues.map((c) => c.id);
	const randomClueId =
		availableClueIds[Math.floor(Math.random() * availableClueIds.length)];
	setGameState({
		hasStarted: true,
		startTime: new Date().toISOString(),
		currentClue: randomClueId,
	});
};

/**
 * Mark a clue as completed and choose a new random clue.
 * @param completedId the id of the clue being completed
 * @param checkWord optional word used for checking/recording the completion
 */
export const completeClue = (completedId: number, checkWord: string = "") => {
	const now = new Date().toISOString();

	const nextState = {
		completedClues: [
			...state.completedClues,
			{ id: completedId, time: now, word: checkWord },
		],
	} as GameState;

	// Pick a new random clue id from available clues
	const availableClueIds = clues
		.filter(
			(c) =>
				!nextState.completedClues.some((cc) => cc.id === c.id) && !c.isFinal,
		)
		.map((c) => c.id);

	const newClueId =
		availableClueIds.length > 0
			? availableClueIds[Math.floor(Math.random() * availableClueIds.length)]
			: null;

	if (newClueId !== null && newClueId !== undefined) {
		nextState.currentClue = newClueId;
	} else {
		// Check for final clue
		const finalClue = clues.find((c) => c.isFinal);
		if (
			finalClue &&
			!nextState.completedClues.some((cc) => cc.id === finalClue.id)
		) {
			nextState.currentClue = finalClue.id;
		} else {
			// No more clues available, game completed
			nextState.currentClue = null;
			nextState.hasCompleted = true;
			nextState.endTime = now;
		}
	}

	setGameState(nextState);
};

export const resetGameState = () => {
	state = initialState;
	try {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
	} catch {
		// ignore
	}
	notify();
};

export const subscribeGameState = (cb: Listener) => {
	listeners.add(cb);
	return () => listeners.delete(cb);
};

export const useGameState = () => {
	const gameState = useSyncExternalStore(subscribeGameState, getGameState);

	const [isLoading, setIsLoading] = useState(() => !isGameStateInitialized());

	useEffect(() => {
		let mounted = true;

		if (!isGameStateInitialized()) {
			initGameState();
		}

		if (mounted) setIsLoading(false);

		const onFocus = () => reloadGameStateFromStorage();
		const onVisibility = () => {
			if (document.visibilityState === "visible") reloadGameStateFromStorage();
		};

		if (typeof window !== "undefined" && typeof document !== "undefined") {
			window.addEventListener("focus", onFocus);
			document.addEventListener("visibilitychange", onVisibility);
		}

		return () => {
			mounted = false;
			if (typeof window !== "undefined" && typeof document !== "undefined") {
				window.removeEventListener("focus", onFocus);
				document.removeEventListener("visibilitychange", onVisibility);
			}
		};
	}, []);

	return { gameState, setGameState, resetGameState, isLoading };
};
