import { describe, test, expect } from "bun:test";
import { evaluateQueryParams } from "@/lib/query-params";
import type { GameState } from "@/hooks/game-state";

const baseState: GameState = {
	hasStarted: true,
	hasCompleted: false,
	currentClue: 3,
	completedClues: [],
	usedHints: [],
	startTime: new Date().toISOString(),
	endTime: null,
};

describe("evaluateQueryParams", () => {
	test("detects start flag", () => {
		const res = evaluateQueryParams("?start", baseState);
		expect(res.allowStart).toBe(true);
	});

	test("valid solution attempt", () => {
		const res = evaluateQueryParams("?clueId=3&word=test", baseState);
		expect(res.solutionAttempt).toBeDefined();
		expect(res.solutionAttempt?.isValid).toBe(true);
		expect(res.solutionAttempt?.clueId).toBe(3);
		expect(res.solutionAttempt?.word).toBe("test");
	});

	test("invalid solution attempt (wrong clue)", () => {
		const res = evaluateQueryParams("?clueId=99&word=zzz", baseState);
		expect(res.solutionAttempt).toBeDefined();
		expect(res.solutionAttempt?.isValid).toBe(false);
	});

	test("ignores non-numeric clueId", () => {
		const res = evaluateQueryParams("?clueId=abc", baseState);
		expect(res.solutionAttempt).toBeUndefined();
	});
});
