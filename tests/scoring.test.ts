import { describe, test, expect } from "bun:test";
import { calculateScore, getBreakdown } from "@/lib/scoring";

const iso = (offsetSeconds: number) =>
	new Date(offsetSeconds * 1000).toISOString();

describe("scoring", () => {
	const start = iso(0);
	const endShort = iso(60 * 10); // 10 minutes
	const endLong = iso(60 * 60 * 1); // 1 hour
	const endVeryLong = iso(60 * 60 * 1000); // 1000 hours

	const completed = [
		{ id: 0, time: iso(60), word: "A" },
		{ id: 1, time: iso(120), word: "B" },
		{ id: 2, time: iso(180), word: "C" },
	] as any;

	test("calculateScore basic lower time yields higher score (same hints)", () => {
		const shortScore = calculateScore(start, endShort, [], completed);
		const longScore = calculateScore(start, endLong, [], completed);
		expect(shortScore).toBeGreaterThan(longScore);
	});

	test("calculateScore adds hint penalties", () => {
		const noHint = calculateScore(start, endShort, [], completed);
		const withHints = calculateScore(start, endShort, [0, 1], completed);
		expect(withHints).toBeLessThan(noHint);
	});

	test("calculateScore never returns less than zero", () => {
		const score = calculateScore(
			start,
			endVeryLong,
			[0, 1, 2, 3, 4],
			completed,
		);
		expect(score).toBeGreaterThanOrEqual(0);
	});

	test("getBreakdown and calculateScore returns same value", () => {
		const breakdown = getBreakdown(start, endShort, [0, 1], completed);
		const score = calculateScore(start, endShort, [0, 1], completed);
		expect(breakdown.score).toBe(score);
	});

	test("calculateScore handles zero distance edge case", () => {
		const minimalCompleted = [{ id: 0, time: iso(60), word: "A" }] as any;
		const score = calculateScore(start, endShort, [], minimalCompleted);
		expect(score).toBeGreaterThanOrEqual(0);
	});
});
