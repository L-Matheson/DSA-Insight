import React from "react";
import type { Chapter } from "../interfaces/course";

import ChapterOneHome from "../pages/algorithmDesign/chapterone/ChapterOneHome";
import DefaultChapterHome from "../pages/DefaultChapterHome";
export class AlgorithmDesignHandler {
    private chapters: Chapter[] = [
    {
        title: "Chapter 1: Algorithms: Efficiency, Analysis, and Order",
        description: "Foundations of algorithmic thinking, correctness, and basic analysis.",
        subTopics: [
            "Problem solving & algorithmic problems",
            "Proofs of correctness (invariants, induction)",
            "Asymptotic notation: O, Θ, Ω",
        ],
        homepage: ChapterOneHome,

    },
    {
        title: "Chapter 2: Divide and Conquer",
        description: "Divide problems into subproblems, combine solutions, and analyze recurrence relations.",
        subTopics: [
            "Merge sort and quicksort",
            "Master theorem and recurrence solving",
            "Selection algorithms",
        ],
        homepage: DefaultChapterHome,
    },
    {
        title: "Chapter 3: Dynamic Programming",
        description: "Techniques for optimal substructure and overlapping subproblems using memoization and tabulation.",
        subTopics: [
            "Knapsack, Longest Common Subsequence",
            "Optimal substructure & memoization",
            "State design and complexity trade-offs",
        ],
        homepage: DefaultChapterHome,
    },
    {
        title: "Chapter 4: Greedy Algorithms",
        description: "Designing greedy strategies and proving their correctness via exchange arguments and matroids.",
        subTopics: [
            "Interval scheduling",
            "Huffman coding and optimal prefix codes",
            "Minimum spanning trees (Kruskal, Prim)",
        ],
        homepage: DefaultChapterHome,
    },
    {
        title: "Chapter 5: Backtracking",
        description: "Classic graph traversals and shortest-path / flow algorithms with applications and analysis.",
        subTopics: [
            "BFS & DFS and applications",
            "Dijkstra, Bellman-Ford, Floyd-Warshall",
            "Max-flow (Ford–Fulkerson / Edmonds–Karp) basics",
        ],
        homepage: DefaultChapterHome,
    },
    {
        title: "Chapter 6: Branch and Bound",
        description: "Deeper study of runtime/space complexity, NP, reductions, and approximation algorithms.",
        subTopics: [
            "Amortized analysis and probabilistic analysis",
            "NP, NP-completeness, and reductions",
            "Approximation algorithms and intractability",
        ],
        homepage: DefaultChapterHome,
    },
    ];

    getAllChapters(): Chapter[] {
        return this.chapters.map((u) => ({ ...u, subTopics: u.subTopics ? [...u.subTopics] : [] }));
    }

    findByTitle(title: string): Chapter | undefined {
        return this.chapters.find((unit) => unit.title.toLowerCase() === title.toLowerCase());
    }

}

export const algorithmDesignHandler = new AlgorithmDesignHandler();
export default algorithmDesignHandler;

