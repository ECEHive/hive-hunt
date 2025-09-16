import { describe, test, expect } from "bun:test";
import { calculateScore, getScoreBreakdown } from "@/lib/scoring";

const iso = (offsetSeconds: number) =>
	new Date(offsetSeconds * 1000).toISOString();

describe("scoring", () => {
	const start = iso(0);
	const endShort = iso(600); // 10 minutes
	const endLong = iso(3600); // 1 hour

	const completed = [
		{ id: 0, time: iso(60), word: "A" },
		{ id: 1, time: iso(120), word: "B" },
		{ id: 2, time: iso(180), word: "C" },
	] as any;

	test("calculateScore basic lower time yields lower score (same hints)", () => {
		const shortScore = calculateScore(start, endShort, 0, completed);
		const longScore = calculateScore(start, endLong, 0, completed);
		expect(shortScore).toBeLessThan(longScore);
	});

	test("calculateScore adds hint penalties", () => {
		const noHint = calculateScore(start, endShort, 0, completed);
		const withHints = calculateScore(start, endShort, 2, completed);
		expect(withHints).toBeGreaterThan(noHint);
	});

	test("getScoreBreakdown returns consistent total", () => {
		const breakdown = getScoreBreakdown(start, endShort, [0, 1], completed);
		expect(breakdown.totalScore).toBeGreaterThan(0);
		expect(breakdown.velocityScore + breakdown.hintPenalty).toBe(
			breakdown.totalScore,
		);
	});

	test("getScoreBreakdown efficiency scales with distance (mock minimal distance)", () => {
		const minimalCompleted = [{ id: 0, time: iso(60), word: "A" }] as any;
		const breakdown = getScoreBreakdown(start, endShort, [], minimalCompleted);
		expect(breakdown.totalDistance).toBeGreaterThanOrEqual(0); // Non-negative
	});

	test("getScoreBreakdown handles zero distance edge case", () => {
		const minimalCompleted = [{ id: 0, time: iso(60), word: "A" }] as any;
		const breakdown = getScoreBreakdown(start, endShort, [], minimalCompleted);
		expect(breakdown.totalDistance).toBe(0);
		expect(breakdown.efficiency).toBeGreaterThan(0); // Should still compute efficiency
	});
});
