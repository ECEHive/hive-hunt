import { describe, test, expect } from "bun:test";
import { haversineDistance, calculateTotalDistance } from "@/lib/distance";
import { clues } from "@/lib/clues";

const within = (value: number, target: number, delta: number) =>
	Math.abs(value - target) <= delta;

describe("distance", () => {
	test("zero distance for identical points", () => {
		expect(haversineDistance(33.7, -84.3, 33.7, -84.3)).toBeCloseTo(0, 5);
	});

	test("approximate known meridian distance", () => {
		const d = haversineDistance(0, 0, 1, 0); // ~111,195m (latitudinal km)
		expect(within(d, 111_195, 500)).toBe(true);
	});

	test("calculateTotalDistance returns 0 for empty list", () => {
		expect(calculateTotalDistance([] as any)).toBe(0);
	});

	test("single completed clue counts distance from final clue start", () => {
		const finalClue = clues.find((c) => c.isFinal)!;
		const first = clues[0]!;
		const completed = [
			{ id: first.id, time: new Date(0).toISOString(), word: "A" },
		];
		const expected = haversineDistance(
			finalClue.location.lat,
			finalClue.location.lng,
			first.location.lat,
			first.location.lng,
		);
		const total = calculateTotalDistance(completed as any);
		expect(Math.abs(total - expected)).toBeLessThan(1e-6);
	});

	test("calculateTotalDistance includes start leg plus sequential legs", () => {
		const finalClue = clues.find((c) => c.isFinal)!;
		const a = clues[0]!;
		const b = clues[1]!;
		const c = clues[2]!;
		const completed = [
			{ id: a.id, time: new Date(0).toISOString(), word: "A" },
			{ id: b.id, time: new Date(1).toISOString(), word: "B" },
			{ id: c.id, time: new Date(2).toISOString(), word: "C" },
		];
		const expected =
			haversineDistance(
				finalClue.location.lat,
				finalClue.location.lng,
				a.location.lat,
				a.location.lng,
			) +
			haversineDistance(
				a.location.lat,
				a.location.lng,
				b.location.lat,
				b.location.lng,
			) +
			haversineDistance(
				b.location.lat,
				b.location.lng,
				c.location.lat,
				c.location.lng,
			);
		const total = calculateTotalDistance(completed as any);
		expect(Math.abs(total - expected)).toBeLessThan(1e-6);
	});
});
