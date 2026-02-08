import type { JSX, ReactElement, ReactNode } from 'react';

interface Course {
  title: string;
  description: string;
  icon: string;
  topics: string[];
  link: string;
  homepage:  React.ComponentType; 
}

interface Chapter {
  title: string;
  description: string;
  subTopics: string[];
  homepage: React.ComponentType; 
  questions?: Record<string, Question>;
}

interface Question{
  title: string;
  description: string;
  solution: React.ComponentType;
}

export type { Course, Chapter, Question };