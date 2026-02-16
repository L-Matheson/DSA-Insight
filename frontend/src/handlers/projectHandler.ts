import React from "react";

export interface Project {
  name: string;
  urlSlug: string;
  description: string;
  component?: React.ComponentType;
}

export class ProjectHandler {
  private projects: Project[] = [
    {
      name: "Custom Shell Implementation",
      urlSlug: "custom-shell-implementation",
      description: "Build a Unix-like shell that can execute commands, handle pipes, and manage processes.",
      component: undefined,
    },
    {
      name: "Memory Allocator (malloc clone)",
      urlSlug: "memory-allocator",
      description: "Implement your own dynamic memory allocator similar to malloc() and free().",
      component: undefined,
    },
    {
      name: "Multi-threaded Server",
      urlSlug: "multi-threaded-server",
      description: "Create a concurrent server that handles multiple client connections using threads.",
      component: undefined,
    },
    {
      name: "File System Utilities",
      urlSlug: "file-system-utilities",
      description: "Build command-line utilities for file system operations and analysis.",
      component: undefined,
    },
  ];

  getAllProjects(): Project[] {
    return this.projects.map((p) => ({ ...p }));
  }

  findBySlug(slug: string): Project | undefined {
    return this.projects.find(
      (project) => project.urlSlug.toLowerCase() === slug.toLowerCase()
    );
  }
}

export const projectHandler = new ProjectHandler();
export default projectHandler;
