// ─── Question Type Definitions ─────────────────────────────────────────────────

export interface SingleQuestion {
  id: number;
  type: "single";
  text: string;
  points: number;
  options: { id: number; value: string; isCorrect: boolean }[];
}
export interface MultipleQuestion {
  id: number;
  type: "multiple";
  text: string;
  points: number;
  options: { id: number; value: string; isCorrect: boolean }[];
}
export interface TrueFalseQuestion {
  id: number;
  type: "truefalse";
  text: string;
  points: number;
  optionsOfTrueFalseType: string[];
  statements: { id: number; value: string; isCorrect: boolean }[];
}
export interface ReorderQuestion {
  id: number;
  type: "reorder";
  text: string;
  points: number;
  options: { id: number; value: string; orderIndex: number }[];
}
export interface MatchQuestion {
  id: number;
  type: "match";
  text: string;
  points: number;
  pairs: {
    left: { value: string };
    right: { value: string };
    isCorrect: boolean;
  }[];
}
export interface HotspotQuestion {
  id: number;
  type: "hotspot";
  text: string;
  points: number;
  imageUrl: string;
  totalRequiredHotSpot: number;
  hotSpots: {
    label: string;
    top: number;
    left: number;
    width: number;
    height: number;
  }[];
}
export interface MultiColQuestion {
  id: number;
  type: "multicol";
  text: string;
  points: number;
  columns: string[];
  rows: { id: number; value: string; correctColumn: number }[];
}

export type Question =
  | SingleQuestion
  | MultipleQuestion
  | TrueFalseQuestion
  | ReorderQuestion
  | MatchQuestion
  | HotspotQuestion
  | MultiColQuestion;

// ─── Mock questions per part ────────────────────────────────────────────────────

export const questionsByPart: Record<number, Question[]> = {
  101: [
    {
      id: 1001,
      type: "single",
      text: "Who wrote the first five books of the Bible?",
      points: 10,
      options: [
        { id: 1, value: "Moses", isCorrect: true },
        { id: 2, value: "David", isCorrect: false },
        { id: 3, value: "Solomon", isCorrect: false },
        { id: 4, value: "Abraham", isCorrect: false },
      ],
    },
    {
      id: 1002,
      type: "multiple",
      text: "Which of the following are part of the Creation account?",
      points: 15,
      options: [
        { id: 1, value: "Light and darkness separated", isCorrect: true },
        { id: 2, value: "Noah builds the ark", isCorrect: false },
        { id: 3, value: "Firmament created", isCorrect: true },
        { id: 4, value: "Adam formed from dust", isCorrect: true },
        { id: 5, value: "Tower of Babel built", isCorrect: false },
        { id: 6, value: "Eve created from Adam's rib", isCorrect: true },
      ],
    },
    {
      id: 1003,
      type: "truefalse",
      text: "Determine whether each statement about the Creation is True or False",
      points: 15,
      optionsOfTrueFalseType: ["Đúng", "Sai"],
      statements: [
        {
          id: 1,
          value: "God created the world in 6 days and rested on the 7th",
          isCorrect: true,
        },
        {
          id: 2,
          value:
            "The serpent in Eden was identified as Satan in the New Testament",
          isCorrect: true,
        },
        {
          id: 3,
          value: "Adam and Eve were created on the 5th day",
          isCorrect: false,
        },
        {
          id: 4,
          value: "The forbidden fruit was explicitly described as an apple",
          isCorrect: false,
        },
      ],
    },
    {
      id: 1004,
      type: "reorder",
      text: "Arrange the days of Creation in the correct order",
      points: 20,
      options: [
        { id: 1, value: "Light created", orderIndex: 1 },
        { id: 2, value: "Sky and water separated", orderIndex: 2 },
        { id: 3, value: "Land, seas, and plants", orderIndex: 3 },
        { id: 4, value: "Sun, moon, and stars", orderIndex: 4 },
        { id: 5, value: "Fish and birds", orderIndex: 5 },
        { id: 6, value: "Land animals and humans", orderIndex: 6 },
      ],
    },
    {
      id: 1005,
      type: "match",
      text: "Match each biblical figure with their role",
      points: 20,
      pairs: [
        {
          left: { value: "Adam" },
          right: { value: "First human" },
          isCorrect: true,
        },
        {
          left: { value: "Eve" },
          right: { value: "First woman" },
          isCorrect: true,
        },
        {
          left: { value: "Cain" },
          right: { value: "First murderer" },
          isCorrect: true,
        },
        {
          left: { value: "Abel" },
          right: { value: "First shepherd" },
          isCorrect: true,
        },
        {
          left: { value: "Noah" },
          right: { value: "Built the Ark" },
          isCorrect: true,
        },
      ],
    },
    {
      id: 1006,
      type: "hotspot",
      text: "Click on the region where the Garden of Eden is believed to be located",
      points: 15,
      imageUrl: "/assets/maps/middle-east.png",
      totalRequiredHotSpot: 1,
      hotSpots: [
        {
          label: "Mesopotamia (correct)",
          top: 35,
          left: 55,
          width: 18,
          height: 22,
        },
        { label: "Egypt", top: 55, left: 30, width: 16, height: 18 },
        { label: "Anatolia", top: 20, left: 45, width: 20, height: 18 },
      ],
    },
    {
      id: 1007,
      type: "multicol",
      text: "Classify each item into its correct category in the Creation story",
      points: 20,
      columns: ["Day 1–3", "Day 4–6", "Not in Creation"],
      rows: [
        { id: 1, value: "Light", correctColumn: 0 },
        { id: 2, value: "Sun & Moon", correctColumn: 1 },
        { id: 3, value: "Tower of Babel", correctColumn: 2 },
        { id: 4, value: "Land and Sea", correctColumn: 0 },
        { id: 5, value: "Birds and Fish", correctColumn: 1 },
        { id: 6, value: "Flood of Noah", correctColumn: 2 },
        { id: 7, value: "Plants and Vegetation", correctColumn: 0 },
        { id: 8, value: "Adam and Eve", correctColumn: 1 },
      ],
    },
  ],

  102: [
    {
      id: 1021,
      type: "single",
      text: "How many plagues did God send on Egypt?",
      points: 10,
      options: [
        { id: 1, value: "7", isCorrect: false },
        { id: 2, value: "10", isCorrect: true },
        { id: 3, value: "12", isCorrect: false },
        { id: 4, value: "40", isCorrect: false },
      ],
    },
    {
      id: 1022,
      type: "multiple",
      text: "Which of these are among the Ten Commandments?",
      points: 15,
      options: [
        { id: 1, value: "You shall not murder", isCorrect: true },
        {
          id: 2,
          value: "You shall love your neighbour as yourself",
          isCorrect: false,
        },
        { id: 3, value: "Honor your father and your mother", isCorrect: true },
        { id: 4, value: "You shall not steal", isCorrect: true },
        { id: 5, value: "You shall not covet", isCorrect: true },
      ],
    },
    {
      id: 1023,
      type: "multicol",
      text: "Sort each plague into the correct group",
      points: 20,
      columns: ["Plagues 1–5", "Plagues 6–10", "Not a plague"],
      rows: [
        { id: 1, value: "Water to blood", correctColumn: 0 },
        { id: 2, value: "Darkness", correctColumn: 1 },
        { id: 3, value: "Frogs", correctColumn: 0 },
        { id: 4, value: "Death of firstborn", correctColumn: 1 },
        { id: 5, value: "Tower collapse", correctColumn: 2 },
        { id: 6, value: "Boils", correctColumn: 1 },
        { id: 7, value: "Flies", correctColumn: 0 },
        { id: 8, value: "Red Sea crossing", correctColumn: 2 },
      ],
    },
  ],

  201: [
    {
      id: 2011,
      type: "single",
      text: "Who baptized Jesus in the Jordan River?",
      points: 10,
      options: [
        { id: 1, value: "John the Baptist", isCorrect: true },
        { id: 2, value: "Peter", isCorrect: false },
        { id: 3, value: "Elijah", isCorrect: false },
        { id: 4, value: "Isaiah", isCorrect: false },
      ],
    },
    {
      id: 2012,
      type: "multiple",
      text: "Which of the following are Beatitudes from Matthew 5?",
      points: 15,
      options: [
        { id: 1, value: "Blessed are the poor in spirit", isCorrect: true },
        { id: 2, value: "Blessed are the peacemakers", isCorrect: true },
        { id: 3, value: "Blessed are the meek", isCorrect: true },
        { id: 4, value: "Blessed are the mighty", isCorrect: false },
        { id: 5, value: "Blessed are the pure in heart", isCorrect: true },
      ],
    },
    {
      id: 2013,
      type: "multicol",
      text: "Classify each miracle or teaching to the correct Gospel",
      points: 20,
      columns: ["Matthew", "Mark", "Luke", "John"],
      rows: [
        { id: 1, value: "Sermon on the Mount (ch 5–7)", correctColumn: 0 },
        { id: 2, value: "Water into wine at Cana", correctColumn: 3 },
        { id: 3, value: "Healing of blind Bartimaeus", correctColumn: 1 },
        { id: 4, value: "Parable of the Prodigal Son", correctColumn: 2 },
        { id: 5, value: "Feeding 5,000", correctColumn: 0 },
        { id: 6, value: "Raising of Lazarus", correctColumn: 3 },
      ],
    },
    {
      id: 2014,
      type: "hotspot",
      text: "Identify where Jesus performed his first miracle",
      points: 15,
      imageUrl: "/assets/maps/galilee.png",
      totalRequiredHotSpot: 1,
      hotSpots: [
        { label: "Cana (correct)", top: 28, left: 42, width: 15, height: 15 },
        { label: "Capernaum", top: 22, left: 58, width: 14, height: 14 },
        { label: "Nazareth", top: 40, left: 40, width: 14, height: 14 },
      ],
    },
  ],
};

export function getQuestionsForPart(partId: number): Question[] {
  return questionsByPart[partId] ?? [];
}

export const TYPE_LABELS: Record<string, string> = {
  single: "Single",
  multiple: "Multiple",
  truefalse: "True/False",
  reorder: "Reorder",
  match: "Match",
  hotspot: "Hotspot",
  multicol: "Multi-Col",
};

export const TYPE_COLORS: Record<string, string> = {
  single: "#4ade80",
  multiple: "#fb923c",
  truefalse: "#60a5fa",
  reorder: "#c084fc",
  match: "#f472b6",
  hotspot: "#c8a46e",
  multicol: "#38bdf8",
};
