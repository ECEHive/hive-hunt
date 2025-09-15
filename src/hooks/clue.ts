import { useState, useEffect } from "react";
import { clues, type Clue } from "@/lib/clues";

/**
 * Get the clue information of a clue from it's ID.
 */
export const useClue = (id: number | null) => {
	const [clue, setClue] = useState<Clue | null>(null);

	useEffect(() => {
		const foundClue = clues.find((c) => c.id === id);
		setClue(foundClue ?? null);
	}, [id]);

	return clue;
};
