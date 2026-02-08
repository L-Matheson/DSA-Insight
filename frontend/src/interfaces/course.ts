import type { JSX, ReactElement, ReactNode } from 'react';

interface Course {
  title: string;
  description: string;
  icon: string;
  topics: string[];
  link: string;
  homepage:  React.ComponentType; // Adjusted to accept various React node types
}

interface Unit {
  title: string;
  description: string;
  subTopics: string[];
  content?: React.ComponentType; // Accepts any valid React node (string, JSX, etc.)
}

export type { Course, Unit };