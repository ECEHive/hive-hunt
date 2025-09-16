import { type CompletedClue } from "@/hooks/game-state";
import { clues } from "./clues";

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
	if (completedClues.length === 0) return 0;

	// Sort clues by completion time to get the order they were visited
	const sortedClues = [...completedClues].sort(
		(a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
	);

	let totalDistance = 0;

	// Determine starting (origin) location: the clue marked isFinal
	const finalClue = clues.find((c) => c.isFinal);
	const originLocation = finalClue?.location;

	// Add initial leg from origin (final clue / starting location) to the first completed clue
	if (originLocation) {
		const firstCompleted = sortedClues[0];
		if (firstCompleted) {
			const firstClue = clues.find((c) => c.id === firstCompleted.id);
			if (firstClue?.location) {
				totalDistance += haversineDistance(
					originLocation.lat,
					originLocation.lng,
					firstClue.location.lat,
					firstClue.location.lng,
				);
			}
		}
	}

	// Sequential legs between visited clues (only if at least 2)
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
