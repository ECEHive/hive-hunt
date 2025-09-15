import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HintProps {
	hint: string;
	clueId: number;
	usedHints: Array<number>;
	lastClueSolvedAt: number; // timestamp in ms
	onUseHint: (clueId: number) => void;
}

const HINT_DELAY = 2 * 60 * 1000; // 2 minutes in ms

export const Hint: React.FC<HintProps> = ({
	hint,
	clueId,
	usedHints,
	lastClueSolvedAt,
	onUseHint,
}) => {
	const [now, setNow] = useState(Date.now());
	const [showHint, setShowHint] = useState(false);

	useEffect(() => {
		// If hint already used, show it
		if (usedHints.includes(clueId)) {
			setShowHint(true);
		}
	}, [clueId, usedHints]);

	useEffect(() => {
		if (!showHint) {
			const interval = setInterval(() => setNow(Date.now()), 1000);
			return () => clearInterval(interval);
		}
	}, [showHint]);

	const timePassed = now - lastClueSolvedAt;
	const canShowButton = timePassed >= HINT_DELAY;
	const secondsLeft = Math.max(0, Math.ceil((HINT_DELAY - timePassed) / 1000));

	const handleShowHint = () => {
		setShowHint(true);
		onUseHint(clueId);
	};

	// If the hint is not yet available and hasn't been shown, render a raw countdown
	if (!showHint && !canShowButton) {
		return (
			<span className="text-sm text-muted-foreground block text-center mt-2">
				Hint available in {secondsLeft} seconds
			</span>
		);
	}

	// If the hint is avaible but not yet shown, render a message + button
	if (!showHint && canShowButton) {
		return (
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				<div>
					<p className="text-sm text-muted-foreground">
						A hint is available. Using it will penalize you.
					</p>
				</div>

				<div>
					<Button size="sm" onClick={handleShowHint}>
						Show hint
					</Button>
				</div>
			</div>
		);
	}

	// Otherwise render states inside a subtle Card for visual consistency
	return (
		<Card className="mt-3">
			<CardHeader>
				<CardTitle className="text-lg">Hint</CardTitle>
			</CardHeader>
			<CardContent>
				{/* Shown: display the hint text */}
				{showHint && <p className="text-sm italic text-foreground">{hint}</p>}
			</CardContent>
		</Card>
	);
};
