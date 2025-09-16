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

	test("calculateTotalDistance returns 0 for <2 clues", () => {
		expect(calculateTotalDistance([] as any)).toBe(0);
	});

	test("calculateTotalDistance sums sequential distances", () => {
		// Use first three clues defensively (non-null assertions because test data is static)
		const completed = [
			{ id: clues[0]!.id, time: new Date(0).toISOString(), word: "A" },
			{ id: clues[1]!.id, time: new Date(1).toISOString(), word: "B" },
			{ id: clues[2]!.id, time: new Date(2).toISOString(), word: "C" },
		];
		const total = calculateTotalDistance(completed as any);
		expect(total).toBeGreaterThan(0);
	});
});
