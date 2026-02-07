// Course interface used across the app to represent a course/section
interface Course {
  title: string;
  description: string;
  icon: string;
  topics: string[];
  link: string;
}

export type { Course };