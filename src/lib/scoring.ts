import { type CompletedClue } from "@/hooks/game-state";
import { calculateTotalDistance } from "./distance";

const MIN_DISTANCE_METERS = 1200; // Minimum distance to avoid division by zero
const HINT_PENALTY_FRACTION = 0.25;
const MAX_PACE = 5;
const MIN_PACE = 0.5;

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
	usedHints: number[],
	completedClues: CompletedClue[],
): number {
	const start = new Date(startTime);
	const end = new Date(endTime);
	const timeInSeconds = (end.getTime() - start.getTime()) / 1000;
	const originalDistance = calculateTotalDistance(completedClues);

	const distance = Math.max(originalDistance, MIN_DISTANCE_METERS);
	const pace = distance / timeInSeconds; // meters per second
	const normalizedPace = (pace - MIN_PACE) / (MAX_PACE - MIN_PACE);
	const hintPenalty = Math.pow(1 - HINT_PENALTY_FRACTION, usedHints.length);
	const finalScore = 1000 * normalizedPace * hintPenalty;

	return Math.min(1000, Math.max(0, Math.round(finalScore)));
}

/**
 * Get detailed score breakdown for display
 */
export function getBreakdown(
	startTime: string,
	endTime: string,
	usedHints: number[],
	completedClues: CompletedClue[],
): {
	pace: number;
	distance: number;
	duration: string;
	score: number;
	start: string;
	end: string;
} {
	const start = new Date(startTime);
	const end = new Date(endTime);
	const timeInSeconds = (end.getTime() - start.getTime()) / 1000;
	const originalDistance = calculateTotalDistance(completedClues);
	const distance = Math.max(originalDistance, MIN_DISTANCE_METERS);
	const pace = distance / timeInSeconds; // meters per second

	const score = calculateScore(startTime, endTime, usedHints, completedClues);

	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = Math.floor(timeInSeconds % 60);
	const duration = [
		hours > 0 ? `${hours}h` : null,
		minutes > 0 ? `${minutes}m` : null,
		`${seconds}s`,
	]
		.filter(Boolean)
		.join(" ");

	return {
		pace,
		distance: originalDistance,
		duration,
		score,
		start: start.toLocaleString(),
		end: end.toLocaleString(),
	};
}
