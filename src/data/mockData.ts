import { LeaderBoard } from "@/pages/LeaderboardPage";
import { QuizLevel, School } from "../../types";

export const MOCK_LEVELS: QuizLevel[] = [
  {
    id: "a263a204-149d-42a0-a7fa-75646e7e3516",
    name: "Level 1",
    description: "Foundational concepts and basic knowledge.",
    parts: [
      { id: "1d21942d-99d5-47cb-befe-8e784741956b", name: "Bổ Sung 1", levelId: "1a3890c5-96dd-4c81-a337-7dc38e82558a", description: "Phần ôn tập sổ sung số 1", duration: 2000, questionCount: 12 },
      { id: "1d21942d-99d5-47cb-befe-8e784741956c", name: "Bổ Sung 2", levelId: "a263a204-149d-42a0-a7fa-75646e7e3516", description: "Phần ôn tập sổ sung số 2", duration: 2000, questionCount: 22 },
      { id: "1d21942d-99d5-47cb-befe-8e784741956d", name: "OT1", levelId: "a263a204-149d-42a0-a7fa-75646e7e3516", description: "Ôn tập tổng hợp số 1", duration: 2700, questionCount: 45 },
      { id: "1d21942d-99d5-47cb-befe-8e784741956e", name: "OT2", levelId: "a263a204-149d-42a0-a7fa-75646e7e3516", description: "Ôn tập tổng hợp số 2", duration: 2700, questionCount: 45 },
      { id: "1d21942d-99d5-47cb-befe-8e784741956f", name: "OT3", levelId: "a263a204-149d-42a0-a7fa-75646e7e3516", description: "Ôn tập tổng hợp số 3", duration: 2700, questionCount: 58 },
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
      { id: "1d21942d-99d5-47cb-befe-8e784741956a", name: "Random Test Level 1", levelId: "practice", description: "45 câu ngẫu nhiên của Level 1", duration: 2700, questionCount: 45  },
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

export const MOCK_LEADERBOARD: LeaderBoard[]  = [
  { id: "u1", studentName: "Tôn Nữ Tú Anh", score: 450, time_spent: 80, school_name: "THCS Huỳnh Văn Nghệ", class_name: "6A4", rank: 1 },
  { id: "u2", studentName: "Nguyễn Linh Anh", score: 450, time_spent: 82, school_name: "THCS Yên Thế", class_name: "7A1", rank: 2 },
  { id: "u3", studentName: "Hồ Quang Tùng", score: 450, time_spent: 82, school_name: "THCS Huỳnh Văn Nghệ", class_name: "8A2", rank: 3 },
];
