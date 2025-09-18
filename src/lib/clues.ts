export type Clue = {
	id: number;
	isFinal?: boolean;
	text: string; // Clue text, may contain HTML
	hint: string; // Hint text
	location: { lat: number; lng: number };
};

export const clues = [
	// 0 Campanile
	{
		id: 0,
		text:
			"The spotlight of the open-air stage<br>" +
			"Once a fountain, now a silent cage<br>" +
			"Look where shadows stretch at dusk's debut",
		hint: "A tall steel symbol in the old logo's view",
		location: { lat: 33.77431503948425, lng: -84.39815834518541 },
	},
	// 1 Student Center Ice Cream Statue
	{
		id: 1,
		text:
			"It swirls like dessert, but stone through and through<br>" +
			"Just across from Josh Johnson's GT debut<br>" +
			"But once did tour where the breeze goes",
		hint: "Flame or cone? The debate burns on.",
		location: { lat: 33.77415936142189, lng: -84.39908355160178 },
	},
	// 2 Van Leer Roof
	{
		id: 2,
		text:
			"Born in '62, fireproof skin,<br>" +
			"Wired for minds that spark within<br>" +
			"Its name, a nod to a man from '93<br>" +
			"Ascend toward where the signal's free —<br>" +
			"A satellite's bowl that all can see",
		hint: "Climb past electrons to reach the stars.",
		location: { lat: 33.7760940812658, lng: -84.39713455531107 },
	},
	// 3 IC Solar Table
	{
		id: 3,
		text:
			"A shaded path not well-tread<br>" +
			"It catches rays above your head<br>" +
			"Do you see what IC?",
		hint: "Somewhere solar meets silicon.",
		location: { lat: 33.776003343447904, lng: -84.400921821897 },
	},
	// 4 Seven Bridges
	{
		id: 4,
		text:
			"A challenge born from Königsberg's lore,<br>" +
			"Where paths are crossed—but not once more.<br>" +
			"Seven spans to test your stride,<br>" +
			"One-way journeys, logic as your guide.",
		hint: "Near where the stone workers reside.",
		location: { lat: 33.77691510303969, lng: -84.3982052100543 },
	},
	// 5 Gairs
	{
		id: 5,
		text: "Gairs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>----- Gairs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>----- ----- Gairs",
		hint: "Rainbow",
		location: { lat: 33.77696011407176, lng: -84.39588019291968 },
	},
	// 6 Einstein
	{
		id: 6,
		text: "His biggest awarded work is not his most famous<br>One of three but doesn't make bagels",
		hint: "Thoughtful and seated, but never speaks.",
		location: { lat: 33.775069569186144, lng: -84.39792036222558 },
	},
	// 7 Skiles Sign
	{
		id: 7,
		text:
			"Where the mural greets all with a welcome,<br>" +
			"Look for the sign where a saucy slice was taped.<br>" +
			"It once defied gravity's cheesy display,<br>" +
			"A delicious triangle to brighten a day.",
		hint: "Near the mouse, and your studio's house.",
		location: { lat: 33.7739349583727, lng: -84.39617017072088 },
	},
	// 8 Hive
	{
		id: 8,
		isFinal: true,
		text:
			"From the ashes of knowledge, a turtle duck will rise,<br>" +
			"Seek the place where wisdom never dies.<br>" +
			"A final clue in this quest you chase,<br>" +
			"Find the start of this chase.",
		hint: "Just go back to the Hive.",
		location: { lat: 33.77549370257786, lng: -84.39738166389168 },
	},
] as Clue[];
