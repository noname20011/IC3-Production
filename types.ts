export interface QuizLevel {
  id: string;
  name: string;
  description: string;
  parts: QuizPart[];
}

export interface QuizPart {
  id: string | number;
  name: string;
  levelId: string;
  description?: string;
  duration?: number
  questionCount?: number
}

export interface School {
  id: string;
  name: string;
  location: string;
}

export interface PasswordRecord {
  id: string;
  text: string;
  expiresAt: string;
  schoolId: string;
  partId: string;
  levelId: string;
}

