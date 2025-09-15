/// <reference types="bun-types" />
/// <reference types="bun-types/test-globals" />
import { haversineDistance, calculateTotalDistance } from "@/lib/utils";

const within = (value: number, target: number, delta: number) =>
	Math.abs(value - target) <= delta;

test("haversineDistance returns ~0 for identical points", () => {
	expect(haversineDistance(0, 0, 0, 0)).toBeCloseTo(0, 5);
});

test("haversineDistance basic known distance", () => {
	// Approx distance between (0,0) and (0,1) ~111,319m
	const d = haversineDistance(0, 0, 0, 1);
	expect(within(d, 111_319, 400)).toBe(true);
});

test("calculateTotalDistance with ordered clues", () => {
	const completed = [
		{ id: 0, time: new Date(0).toISOString(), word: "A" },
		{ id: 1, time: new Date(1).toISOString(), word: "B" },
	];
	const total = calculateTotalDistance(completed as any);
	expect(total).toBeGreaterThan(0);
});
