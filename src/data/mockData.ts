import { LeaderBoard } from "@/pages/LeaderboardPage";
import { QuizLevel } from "../../types";

export const MOCK_LEVELS: QuizLevel[] = [
  {
    id: "1a3890c5-96dd-4c81-a337-7dc38e82558a",
    name: "Level 1",
    description: "Foundational concepts and basic knowledge.",
    parts: [
      {
        id: "61fa749d-4122-4504-b5e7-c4bdd65984a7",
        name: "Bổ Sung 1",
        levelId: "1a3890c5-96dd-4c81-a337-7dc38e82558a",
        description: "Phần ôn tập sổ sung số 1",
        duration: 2000,
        questionCount: 12,
      },
      {
        id: "eaad19b7-3965-44c3-a1fd-cbb0d3e3ce72",
        name: "Bổ Sung 2",
        levelId: "1a3890c5-96dd-4c81-a337-7dc38e82558a",
        description: "Phần ôn tập sổ sung số 2",
        duration: 2000,
        questionCount: 23,
      },
      {
        id: "d051e1f8-2410-4c53-8650-438afbcdd894",
        name: "OT1",
        levelId: "1a3890c5-96dd-4c81-a337-7dc38e82558a",
        description: "Ôn tập tổng hợp số 1",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "005fc9a6-fb8d-46c0-9f45-a36cf54be110",
        name: "OT2",
        levelId: "1a3890c5-96dd-4c81-a337-7dc38e82558a",
        description: "Ôn tập tổng hợp số 2",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "94160047-c31a-4388-967b-215b8378fa2a",
        name: "OT3",
        levelId: "1a3890c5-96dd-4c81-a337-7dc38e82558a",
        description: "Ôn tập tổng hợp số 3",
        duration: 2700,
        questionCount: 58,
      },
      {
        id: "a310bdf7-c7e5-422e-af0a-caba62888f83",
        name: "GM1",
        levelId: "1a3890c5-96dd-4c81-a337-7dc38e82558a",
        description: "Kiến thức nền tảng số 1",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "fa21d802-ccfa-4390-84fa-4f75f00649f5",
        name: "GM2",
        levelId: "1a3890c5-96dd-4c81-a337-7dc38e82558a",
        description: "Kiến thức nền tảng số 2",
        duration: 2700,
        questionCount: 45,
      },
    ],
  },

  {
    id: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
    name: "Level 2",
    description: "Intermediate challenges and complex scenarios.",
    parts: [
      {
        id: "abc730d2-33f7-4b24-bac6-61fbfb60fcf1",
        name: "GM1",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Basic knowledge 1",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "9588dc2e-c8a0-44d0-bcaa-39d460045700",
        name: "GM2",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Basic knowledge 2",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "d725f6ed-6b5e-4b66-a404-9dd040ee5a7d",
        name: "OT1",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 1",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "59af9780-c462-4ad9-b9ba-5f98bbc19ca5",
        name: "OT2",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 2",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "6eeb6bb5-5795-4246-bfef-65e20fed1acc",
        name: "OT3",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 3",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "0157b7b8-56a2-4f46-bf28-e855bfb36728",
        name: "OT4",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 4",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "91834493-139f-46a9-80b2-d09e28cf8db6",
        name: "OT5",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 5",
        duration: 2100,
        questionCount: 33,
      },
      {
        id: "ef0938ac-dea0-4795-a2ca-3a84a883eeaa",
        name: "Bổ Sung 1",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Supplementary comprehensive review 1",
        duration: 2700,
        questionCount: 45,
      }
    ],
  },

  {
    id: "dda4402a-4cc0-4b3b-94b1-22a06e3b3242",
    name: "Level 3",
    description: "Advanced mastery and expert level analysis.",
    parts: [
      {
        id: "db82cd06-ca13-4034-a9fd-7a11c90a9658",
        name: "GM1",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Basic knowledge 1",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "34b9104b-5d51-4802-848c-1217f4528163",
        name: "GM2",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Basic knowledge 2",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "79f7008b-ccdd-499b-a53a-cdf9849e607e",
        name: "OT1",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 1",
        duration: 2400,
        questionCount: 40,
      },
      {
        id: "9cf71ac1-7a43-40be-9981-e3fb9c209f9d",
        name: "OT2",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 2",
        duration: 2400,
        questionCount: 40,
      },
      {
        id: "3f792fe3-33d4-4f6d-8797-db4ad22e25bf",
        name: "OT3",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 3",
        duration: 2400,
        questionCount: 40,
      },
      {
        id: "09b573c3-ccb5-4e79-84d7-6ad13d0076d2",
        name: "OT4",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 4",
        duration: 2400,
        questionCount: 40,
      },
      {
        id: "413093a5-e449-46bb-a1b4-13cc8ca41fff",
        name: "OT5",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Comprehensive review 5",
        duration: 1680,
        questionCount: 28,
      },
      {
        id: "f1ee95be-8009-429b-ab99-77c4f4312b1a",
        name: "Bổ Sung 1",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Supplementary comprehensive review 1",
        duration: 1200,
        questionCount: 17,
      },
      {
        id: "f3c62f6c-5c37-43eb-b3a9-3de6badc3bac",
        name: "Bổ Sung 2",
        levelId: "5acedaad-1ab8-4efc-b2f3-339e5d81bfda",
        description: "Supplementary comprehensive review 2",
        duration: 2700,
        questionCount: 45,
      }
    ],
  },
  
  {
    id: "practice",
    name: "Practice Test",
    description: "Full-length simulation of the final assessment.",
    parts: [
      {
        id: "29d957d9-76ac-439d-a6ec-59f4f57d0be0",
        name: "Random Test Level 1",
        levelId: "practice",
        description: "Random 45 questions from Level 1 Test",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "df7d5e14-80c5-40b8-88ea-0153985085ec",
        name: "Random Test Level 2",
        levelId: "practice",
        description: "Random 45 questions from Level 2 Test",
        duration: 2700,
        questionCount: 45,
      },
      {
        id: "bbc142bf-8bd6-49d7-a0ec-acf8b8814341",
        name: "Random Test Level 3",
        levelId: "practice",
        description: "Random 45 questions from Level 3 Test",
        duration: 2700,
        questionCount: 45,
      }
    ],
  },
];

export const MOCK_LEADERBOARD: LeaderBoard[] = [
  {
    id: "u1",
    studentName: "Huỳnh Linh Đan",
    score: 450,
    time_spent: 80,
    school_name: "THCS Trần Đại Nghĩa",
    class_name: "6A10",
    rank: 1,
  },
  {
    id: "u2",
    studentName: "Nguyễn Linh Anh",
    score: 450,
    time_spent: 82,
    school_name: "THCS Yên Thế",
    class_name: "7A1",
    rank: 2,
  },
  {
    id: "u3",
    studentName: "Hồ Quang Tùng",
    score: 450,
    time_spent: 82,
    school_name: "THCS Nguyễn Du",
    class_name: "8A1",
    rank: 3,
  },
];

export const levels = [
  { id: 1, name: "Level 1", tag: "Beginner", color: "#4ade80", parts: 4, description: "Foundation of Faith" },
  { id: 2, name: "Level 2", tag: "Intermediate", color: "#fb923c", parts: 5, description: "Growing in Scripture" },
  { id: 3, name: "Level 3", tag: "Advanced", color: "#c084fc", parts: 6, description: "Deep Dive into Theology" },
  { id: 4, name: "Practice Exam", tag: "Practice", color: "#c8a46e", parts: 3, description: "Full Simulation Mode" },
];

export const partsByLevel: Record<number, Part[]> = {
  1: [
    { id: 101, levelId: 1, name: "Part 1", topic: "Genesis & Creation", questions: 20, duration: 30, difficulty: "Easy" },
    { id: 102, levelId: 1, name: "Part 2", topic: "Exodus & Law", questions: 25, duration: 35, difficulty: "Easy" },
    { id: 103, levelId: 1, name: "Part 3", topic: "Psalms & Worship", questions: 20, duration: 30, difficulty: "Easy" },
    { id: 104, levelId: 1, name: "GM", topic: "General Mastery", questions: 30, duration: 45, difficulty: "Medium" },
  ],
  2: [
    { id: 201, levelId: 2, name: "Part 1", topic: "Matthew & Mark", questions: 30, duration: 45, difficulty: "Medium" },
    { id: 202, levelId: 2, name: "Part 2", topic: "Luke & John", questions: 30, duration: 45, difficulty: "Medium" },
    { id: 203, levelId: 2, name: "Part 3", topic: "Acts & Romans", questions: 25, duration: 40, difficulty: "Medium" },
    { id: 204, levelId: 2, name: "Part 4", topic: "Epistles", questions: 25, duration: 40, difficulty: "Medium" },
    { id: 205, levelId: 2, name: "GM", topic: "General Mastery", questions: 40, duration: 60, difficulty: "Hard" },
  ],
  3: [
    { id: 301, levelId: 3, name: "Part 1", topic: "Prophets & Prophecy", questions: 35, duration: 50, difficulty: "Hard" },
    { id: 302, levelId: 3, name: "Part 2", topic: "Revelation", questions: 30, duration: 45, difficulty: "Hard" },
    { id: 303, levelId: 3, name: "Part 3", topic: "Theology & Doctrine", questions: 40, duration: 60, difficulty: "Hard" },
    { id: 304, levelId: 3, name: "Part 4", topic: "Church History", questions: 35, duration: 50, difficulty: "Hard" },
    { id: 305, levelId: 3, name: "Part 5", topic: "Hermeneutics", questions: 30, duration: 45, difficulty: "Expert" },
    { id: 306, levelId: 3, name: "GM", topic: "Grand Mastery", questions: 50, duration: 75, difficulty: "Expert" },
  ],
  4: [
    { id: 401, levelId: 4, name: "Mock Exam A", topic: "Full Bible Survey", questions: 60, duration: 90, difficulty: "Mixed" },
    { id: 402, levelId: 4, name: "Mock Exam B", topic: "NT Focus", questions: 60, duration: 90, difficulty: "Mixed" },
    { id: 403, levelId: 4, name: "Mock Exam C", topic: "OT Focus", questions: 60, duration: 90, difficulty: "Mixed" },
  ],
};

export interface Part {
  id: number;
  levelId: number;
  name: string;
  topic: string;
  questions: number;
  duration: number;
  difficulty: string;
}

export const schools: School[] = [
  { id: 1, name: "Grace Academy", city: "Nashville", students: 340, active: true },
  { id: 2, name: "Faith Christian School", city: "Atlanta", students: 210, active: true },
  { id: 3, name: "Trinity Prep", city: "Dallas", students: 180, active: true },
  { id: 4, name: "Emmanuel High School", city: "Houston", students: 290, active: false },
  { id: 5, name: "Calvary Christian Academy", city: "Orlando", students: 155, active: true },
  { id: 6, name: "Bethel Community School", city: "Denver", students: 120, active: true },
  { id: 7, name: "Hope Lutheran School", city: "Minneapolis", students: 200, active: false },
  { id: 8, name: "Cornerstone Academy", city: "Charlotte", students: 175, active: true },
];

export interface School {
  id: number;
  name: string;
  city: string;
  students: number;
  active: boolean;
}

export const passwords: ExamPassword[] = [
  { id: 1, code: "GR4CE-2024", school: "Grace Academy", level: "Level 1", part: "Part 2", expires: "2024-04-15", uses: 12, maxUses: 50, created: "2024-04-01" },
  { id: 2, code: "FAITH-XM01", school: "Faith Christian School", level: "Level 2", part: "Part 1", expires: "2024-05-01", uses: 30, maxUses: 30, created: "2024-03-20" },
  { id: 3, code: "TRIN-ADV3", school: "Trinity Prep", level: "Level 3", part: "Part 3", expires: "2024-06-30", uses: 5, maxUses: 40, created: "2024-04-05" },
  { id: 4, code: "CALV-PRC1", school: "Calvary Christian Academy", level: "Practice Exam", part: "Mock Exam A", expires: "2024-04-20", uses: 22, maxUses: 60, created: "2024-03-25" },
  { id: 5, code: "BETH-2024", school: "Bethel Community School", level: "Level 1", part: "GM", expires: "2024-04-30", uses: 8, maxUses: 25, created: "2024-04-02" },
  { id: 6, code: "CORN-L2P4", school: "Cornerstone Academy", level: "Level 2", part: "Part 4", expires: "2024-05-15", uses: 0, maxUses: 35, created: "2024-04-08" },
];

export interface ExamPassword {
  id: number;
  code: string;
  school: string;
  level: string;
  part: string;
  expires: string;
  uses: number;
  maxUses: number;
  created: string;
}

export const leaderboardData = [
  { rank: 1, name: "Sophia Chen", school: "Grace Academy", level: "Level 3", part: "Part 2", score: 98, time: "38:12", date: "2024-04-08" },
  { rank: 2, name: "Marcus Williams", school: "Faith Christian School", level: "Level 3", part: "Part 2", score: 95, time: "41:05", date: "2024-04-08" },
  { rank: 3, name: "Emma Rodriguez", school: "Trinity Prep", level: "Level 3", part: "Part 2", score: 93, time: "39:44", date: "2024-04-07" },
  { rank: 4, name: "Noah Johnson", school: "Calvary Christian Academy", level: "Level 3", part: "Part 2", score: 91, time: "43:20", date: "2024-04-07" },
  { rank: 5, name: "Aiden Park", school: "Grace Academy", level: "Level 3", part: "Part 2", score: 90, time: "44:02", date: "2024-04-06" },
  { rank: 6, name: "Isabella Martinez", school: "Bethel Community School", level: "Level 3", part: "Part 2", score: 88, time: "40:15", date: "2024-04-06" },
  { rank: 7, name: "Ethan Davis", school: "Cornerstone Academy", level: "Level 3", part: "Part 2", score: 87, time: "45:30", date: "2024-04-05" },
  { rank: 8, name: "Olivia Thompson", school: "Faith Christian School", level: "Level 3", part: "Part 2", score: 85, time: "42:18", date: "2024-04-05" },
  { rank: 9, name: "Liam Anderson", school: "Trinity Prep", level: "Level 3", part: "Part 2", score: 84, time: "46:00", date: "2024-04-04" },
  { rank: 10, name: "Ava Wilson", school: "Grace Academy", level: "Level 3", part: "Part 2", score: 83, time: "43:50", date: "2024-04-04" },
];

export const questionsData = [
  { id: 1, text: "Who wrote the book of Genesis?", type: "single", level: "Level 1", part: "Part 1", points: 10 },
  { id: 2, text: "Which of the following are fruits of the Spirit?", type: "multiple", level: "Level 1", part: "Part 2", points: 15 },
  { id: 3, text: "The Ten Commandments were given on Mount Sinai.", type: "truefalse", level: "Level 1", part: "Part 2", points: 10 },
  { id: 4, text: "Arrange the Beatitudes in correct order.", type: "reorder", level: "Level 2", part: "Part 1", points: 20 },
  { id: 5, text: "Match each parable to its chapter.", type: "match", level: "Level 2", part: "Part 2", points: 20 },
  { id: 6, text: "Identify the location of Jerusalem on the map.", type: "hotspot", level: "Level 3", part: "Part 1", points: 15 },
];
