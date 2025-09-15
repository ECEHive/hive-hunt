export type Clue = {
	id: number;
	isFinal?: boolean;
	text: string; // Clue text, may contain HTML
	hint: string; // Hint text
	location: { lat: number; lng: number };
};

export const clues = [
	{
		id: 0,
		text:
			"The spotlight of the open-air stage<br>" +
			"Once a fountain, now a silent cage<br>" +
			"Look where shadows stretch at dusk's debut",
		hint: "A steel symbol in the sunset's view",
		location: { lat: 33.77431503948425, lng: -84.39815834518541 },
	},
	{
		id: 1,
		text:
			"It swirls like dessert, but stone through and through<br>" +
			"Just across from Josh Johnson's GT debut<br>" +
			"But once did tour where the breeze goes",
		hint: "Flame or cone? The debate burns on.",
		location: { lat: 33.77415936142189, lng: -84.39908355160178 },
	},
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
	{
		id: 3,
		text:
			"A shaded path not well-tread<br>" +
			"It catches rays above your head<br>" +
			"Do you see what IC?",
		hint: "Somewhere solar meets silicon.",
		location: { lat: 33.776003343447904, lng: -84.400921821897 },
	},
	{
		id: 4,
		text:
			"Where two towers meet in coded thought,<br>" +
			"Overseen from the Falcon's flight path,<br>" +
			"Not a great white — just big, blue, and bold.",
		hint: "A connection in more ways than one.",
		location: { lat: 33.77710867217703, lng: -84.39700721967783 },
	},
	{
		id: 5,
		text: "Gairs",
		hint: "Rainbow",
		location: { lat: 33.77696011407176, lng: -84.39588019291968 },
	},
	{
		id: 6,
		text: "His biggest awarded work is not his most famous<br>One of three but doesn't make bagels",
		hint: "Thoughtful and seated, but never speaks.",
		location: { lat: 33.775069569186144, lng: -84.39792036222558 },
	},
	{
		id: 7,
		isFinal: true,
		text:
			"From the ashes of knowledge, a turtle duck will rise,<br>" +
			"Seek the place where wisdom never dies.<br>" +
			"A final clue in this quest you chase,<br>" +
			"Find the start of this chase.",
		hint: "Just go back to the Hive.",
		location: { lat: 33.775526042544506, lng: -84.3973845836205 },
	},
] as Clue[];
