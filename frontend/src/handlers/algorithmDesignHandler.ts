import React from "react";
import type { Unit } from "../interfaces/course";


export class AlgorithmDesignHandler {
    private units: Unit[] = [
    {
        title: "Unit 1: Introduction to Algorithm Design",
        description: "Foundations of algorithmic thinking, correctness, and basic analysis.",
        subTopics: [
            "Problem solving & algorithmic paradigms",
            "Proofs of correctness (invariants, induction)",
            "Asymptotic notation: O, Θ, Ω",
        ],
    },
    {
        title: "Unit 2: Divide and Conquer",
        description: "Divide problems into subproblems, combine solutions, and analyze recurrence relations.",
        subTopics: [
            "Merge sort and quicksort",
            "Master theorem and recurrence solving",
            "Selection algorithms",
        ],
    },
    {
        title: "Unit 3: Dynamic Programming",
        description: "Techniques for optimal substructure and overlapping subproblems using memoization and tabulation.",
        subTopics: [
            "Knapsack, Longest Common Subsequence",
            "Optimal substructure & memoization",
            "State design and complexity trade-offs",
        ],
    },
    {
        title: "Unit 4: Greedy Algorithms",
        description: "Designing greedy strategies and proving their correctness via exchange arguments and matroids.",
        subTopics: [
            "Interval scheduling",
            "Huffman coding and optimal prefix codes",
            "Minimum spanning trees (Kruskal, Prim)",
        ],
    },
    {
        title: "Unit 5: Graph Algorithms",
        description: "Classic graph traversals and shortest-path / flow algorithms with applications and analysis.",
        subTopics: [
            "BFS & DFS and applications",
            "Dijkstra, Bellman-Ford, Floyd-Warshall",
            "Max-flow (Ford–Fulkerson / Edmonds–Karp) basics",
        ],
    },
    {
        title: "Unit 6: Complexity Analysis",
        description: "Deeper study of runtime/space complexity, NP, reductions, and approximation algorithms.",
        subTopics: [
            "Amortized analysis and probabilistic analysis",
            "NP, NP-completeness, and reductions",
            "Approximation algorithms and intractability",
        ],
    },
    ];

    getAllUnits(): Unit[] {
        return this.units.map((u) => ({ ...u, subTopics: u.subTopics ? [...u.subTopics] : [] }));
    }

    findByTitle(title: string): Unit | undefined {
        return this.units.find((unit) => unit.title.toLowerCase() === title.toLowerCase());
    }

    filterBySubTopic(query: string): Unit[] {
        const q = query.toLowerCase();
        return this.units.filter((u) => (u.subTopics || []).some((s) => s.toLowerCase().includes(q)));
    }

}

export const algorithmDesignHandler = new AlgorithmDesignHandler();
export default algorithmDesignHandler;

