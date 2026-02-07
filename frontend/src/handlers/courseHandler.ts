import type { Course } from "../interfaces/page";

const allCourses: Course[] = [
  {
    title: "Data Science",
    description:
      "Explore statistical analysis, machine learning, data visualization, and the tools that transform raw data into actionable insights.",
    icon: "📊",
    topics: ["Machine Learning", "Statistics", "Data Visualization", "Python/R"],
    link: "/data-science",
  },
  {
    title: "Data Structures",
    description:
      "Master fundamental data structures including arrays, linked lists, trees, graphs, hash tables, and their practical applications.",
    icon: "🗂️",
    topics: ["Trees & Graphs", "Hash Tables", "Linked Lists", "Stacks & Queues"],
    link: "/data-structures",
  },
  {
    title: "Algorithm Design",
    description:
      "Dive into algorithm analysis, design paradigms, optimization techniques, and problem-solving strategies for complex computational challenges.",
    icon: "⚡",
    topics: ["Dynamic Programming", "Greedy Algorithms", "Graph Algorithms", "Complexity Analysis"],
    link: "/algorithm-design",
  },
  {
    title: "Systems Programming",
    description:
      "Learn low-level programming, memory management, concurrency, operating system concepts, and how software interacts with hardware.",
    icon: "⚙️",
    topics: ["C/C++", "Memory Management", "Concurrency", "OS Concepts"],
    link: "/systems-programming",
  },
];

export class CourseHandler {
  private courses: Course[];

  constructor(initialCourses?: Course[]) {
    this.courses = initialCourses ? [...initialCourses] : [...allCourses];
  }

  getAll(): Course[] {
    return this.courses.map((c) => ({ ...c, topics: [...c.topics] }));
  }

  findByTitle(title: string): Course | undefined {
    return this.courses.find((course) => course.title.toLowerCase() === title.toLowerCase());
  }

  filterByTopic(topic: string): Course[] {
    const q = topic.toLowerCase();
    return this.courses.filter((c) => c.topics.some((t) => t.toLowerCase().includes(q)));
  }

}

export const courseHandler = new CourseHandler();
export default courseHandler;