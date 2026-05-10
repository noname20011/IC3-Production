import { LeaderBoard } from "@/pages/LeaderboardPage";
import { QuizLevel, School } from "../../types";

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
        questionCount: 22,
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
    ],
  },
  {
    id: "l2",
    name: "Level 2",
    description: "Intermediate challenges and complex scenarios.",
    parts: [
      // { id: 4, name: "Phần 1", levelId: "l2", description: "Phần thi cơ bản số 1", duration: 45, questionCount: 0 },
      // { id: 5, name: "Phần 2", levelId: "l2", description: "Phần thi cơ bản số 2", duration: 45, questionCount: 0 },
      // { id: 6, name: "GM", levelId: "l2", description: "Phần thi GM cấp độ 1", duration: 60, questionCount: 0 },
    ],
  },
  {
    id: "l3",
    name: "Level 3",
    description: "Advanced mastery and expert level analysis.",
    parts: [
      // { id: 7, name: "Part 1", levelId: "l3" },
      // { id: 8, name: "Part 2", levelId: "l3" },
    ],
  },
  {
    id: "practice",
    name: "Practice Test",
    description: "Full-length simulation of the final assessment.",
    parts: [
      {
        id: "1d21942d-99d5-47cb-befe-8e784741956a",
        name: "Random Test Level 1",
        levelId: "practice",
        description: "45 câu ngẫu nhiên của Level 1",
        duration: 2700,
        questionCount: 45,
      },
      // { id: 10, name: "Mock B", levelId: "practice" },
    ],
  },
];

export const MOCK_SCHOOLS: School[] = [
  { id: "s1", name: "THCS Huỳnh Văn Nghệ", location: "New York" },
  { id: "s2", name: "THCS Yên Thế", location: "Los Angeles" },
  { id: "s3", name: "THCS Nguyễn Trãi", location: "Chicago" },
  { id: "s4", name: "THCS Trần Đại Nghĩa", location: "Boston" },
];

export const MOCK_LEADERBOARD: LeaderBoard[] = [
  {
    id: "u1",
    studentName: "Tôn Nữ Tú Anh",
    score: 450,
    time_spent: 80,
    school_name: "THCS Huỳnh Văn Nghệ",
    class_name: "6A4",
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
    school_name: "THCS Huỳnh Văn Nghệ",
    class_name: "8A2",
    rank: 3,
  },
];
