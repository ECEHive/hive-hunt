import { describe, test, expect } from "bun:test";
import { clues } from "@/lib/clues";

describe("clues data", () => {
	test("all clues have unique ids", () => {
		const ids = clues.map((c) => c.id);
		const unique = new Set(ids);
		expect(unique.size).toBe(ids.length);
	});

	test("one clue has isFinal flag", () => {
		const finals = clues.filter((c) => c.isFinal);
		expect(finals.length).toBe(1);
	});

	test("each clue has text, hint, and location", () => {
		for (const clue of clues) {
			expect(typeof clue.text).toBe("string");
			expect(typeof clue.hint).toBe("string");
			expect(clue.location && typeof clue.location.lat).toBe("number");
			expect(clue.location && typeof clue.location.lng).toBe("number");
		}
	});
});
