import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type CompletedClue } from "@/hooks/game-state";
import { clues } from "./clues";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Calculate the haversine distance between two points on Earth in meters
 */
export function haversineDistance(
	lat1: number,
	lng1: number,
	lat2: number,
	lng2: number,
): number {
	const R = 6371e3; // Earth's radius in meters
	const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
	const φ2 = (lat2 * Math.PI) / 180;
	const Δφ = ((lat2 - lat1) * Math.PI) / 180;
	const Δλ = ((lng2 - lng1) * Math.PI) / 180;

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // Distance in meters
}

/**
 * Calculate the total travel distance for completed clues in order
 */
export function calculateTotalDistance(
	completedClues: CompletedClue[],
): number {
	if (completedClues.length < 2) return 0;

	// Sort clues by completion time to get the order they were visited
	const sortedClues = [...completedClues].sort(
		(a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
	);

	let totalDistance = 0;

	for (let i = 1; i < sortedClues.length; i++) {
		const prevCompletedClue = sortedClues[i - 1];
		const currentCompletedClue = sortedClues[i];

		if (!prevCompletedClue || !currentCompletedClue) continue;

		const prevClue = clues.find((c) => c.id === prevCompletedClue.id);
		const currentClue = clues.find((c) => c.id === currentCompletedClue.id);

		if (prevClue?.location && currentClue?.location) {
			totalDistance += haversineDistance(
				prevClue.location.lat,
				prevClue.location.lng,
				currentClue.location.lat,
				currentClue.location.lng,
			);
		}
	}

	return totalDistance;
}

/**
 * Calculate the final game score using a velocity-focused approach
 * Lower scores are better
 *
 * Velocity-based scoring system:
 * - Base score: normalized time accounting for distance (time per 100m of travel)
 * - Hint penalty: scaled based on completion efficiency
 * - Distance adjustment: built into the velocity calculation
 */
export function calculateScore(
	startTime: string,
	endTime: string,
	hintsUsed: number,
	completedClues: CompletedClue[],
): number {
	const start = new Date(startTime);
	const end = new Date(endTime);
	const timeInSeconds = (end.getTime() - start.getTime()) / 1000;
	const totalDistance = calculateTotalDistance(completedClues);

	// Velocity-based score: time normalized by distance traveled
	// Use a minimum distance to prevent division by zero and handle edge cases
	const minDistance = Math.max(totalDistance, 400); // At least 400m baseline

	// Base score: time per 100m of distance (scaled for readability)
	// This naturally accounts for teams who had to travel further
	const velocityScore = (timeInSeconds / minDistance) * 100;

	// Hint penalty: 300 points per hint (equivalent to ~5 minutes of inefficiency per 100m)
	// This scales with the velocity score, so it's proportional
	const hintPenalty = hintsUsed * 300;

	// Final score combines velocity and hint penalty
	const totalScore = velocityScore + hintPenalty;

	return Math.round(totalScore);
}

/**
 * Get detailed score breakdown for display
 */
export function getScoreBreakdown(
	startTime: string,
	endTime: string,
	usedHints: number[],
	completedClues: CompletedClue[],
): {
	totalScore: number;
	velocityScore: number;
	hintPenalty: number;
	totalDistance: number;
	timeInSeconds: number;
	efficiency: number; // time per 100m
} {
	const start = new Date(startTime);
	const end = new Date(endTime);
	const timeInSeconds = (end.getTime() - start.getTime()) / 1000;
	const totalDistance = calculateTotalDistance(completedClues);
	const minDistance = Math.max(totalDistance, 400);

	const velocityScore = (timeInSeconds / minDistance) * 100;
	const hintPenalty = usedHints.length * 50;
	const totalScore = Math.round(velocityScore + hintPenalty);
	const efficiency = timeInSeconds / (totalDistance / 100); // seconds per 100m

	return {
		totalScore,
		velocityScore: Math.round(velocityScore),
		hintPenalty,
		totalDistance: Math.round(totalDistance),
		timeInSeconds: Math.round(timeInSeconds),
		efficiency: Math.round(efficiency),
	};
}
