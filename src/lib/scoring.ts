import { type CompletedClue } from "@/hooks/game-state";
import { calculateTotalDistance } from "./distance";

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
	const minDistance = Math.max(totalDistance, 100); // Prevent division by zero with a small baseline

	const velocityScore = (timeInSeconds / minDistance) * 100;
	const hintPenalty = usedHints.length * 50;
	const totalScore = Math.round(velocityScore + hintPenalty);
	const efficiency = timeInSeconds / (minDistance / 100); // seconds per 100m

	return {
		totalScore,
		velocityScore: Math.round(velocityScore),
		hintPenalty,
		totalDistance: Math.round(totalDistance),
		timeInSeconds: Math.round(timeInSeconds),
		efficiency: Math.round(efficiency),
	};
}
