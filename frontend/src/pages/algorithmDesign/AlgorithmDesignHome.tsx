import React from "react";
import ChapterCard from "../../components/ChapterCard";
import algorithmDesignHandler from "../../handlers/algorithmDesignHandler";

const AlgorithmDesignHome = () => {

  const chapters = algorithmDesignHandler.getAllChapters();

  return (
    <div style={{ width: "100%" }}>
  

      {/* Course Topics */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{display: "flex", textAlign: "left"}} >1. Course Topics</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {chapters.map((chapter, index) => (
              <ChapterCard
                key={index}
                title={chapter.title}
                topics={chapter.subTopics}
                courseTitle={"Algorithm Design"}
              />
            ))}
          </div>
      </div>

      {/* Complexity Notation Reference */}
      <div
        style={{ marginBottom: "40px", padding: "20px", borderRadius: "8px", textAlign: "left" }}
      >
        <h2>2. Algorithm Complexity Reference</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <div>
            <strong>O (Big-O):</strong> [Upper bound definition]
          </div>
          <div>
            <strong>Ω (Big-Omega):</strong> [Lower bound definition]
          </div>
          <div>
            <strong>Θ (Big-Theta):</strong> [Tight bound definition]
          </div>
        </div>
        <h3 style={{ marginTop: "20px" }}>
          Common Time Complexities (Best to Worst)
        </h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <code>O(1)</code> - [Constant]
          </li>
          <li>
            <code>O(log n)</code> - [Logarithmic]
          </li>
          <li>
            <code>O(n)</code> - [Linear]
          </li>
          <li>
            <code>O(n log n)</code> - [Linearithmic]
          </li>
          <li>
            <code>O(n²)</code> - [Quadratic]
          </li>
          <li>
            <code>O(n³)</code> - [Cubic]
          </li>
          <li>
            <code>O(2ⁿ)</code> - [Exponential]
          </li>
          <li>
            <code>O(n!)</code> - [Factorial]
          </li>
        </ul>
      </div>

      {/* Key Algorithms */}
      <div style={{ marginBottom: "40px" }}>
        <h2>3. Key Algorithms Covered</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "15px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "0" }}>Sorting & Searching</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>[Algorithm 1: e.g., Merge Sort - O(n log n)]</li>
              <li>[Algorithm 2: e.g., Quick Sort - O(n log n) avg]</li>
              <li>[Algorithm 3: e.g., Binary Search - O(log n)]</li>
            </ul>
          </div>

          <div
            style={{
              padding: "15px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "0" }}>Graph Algorithms</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left"   }}>
              <li>[Algorithm 1: e.g., Dijkstra's - O((V+E) log V)]</li>
              <li>[Algorithm 2: e.g., Bellman-Ford - O(VE)]</li>
              <li>[Algorithm 3: e.g., Floyd-Warshall - O(V³)]</li>
            </ul>
          </div>

          <div
            style={{
              padding: "15px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "0" }}>Dynamic Programming</h3>
            <ul style={{ fontSize: "0.95em" }}>
              <li>[Problem 1: e.g., Fibonacci - O(n)]</li>
              <li>[Problem 2: e.g., Knapsack - O(nW)]</li>
              <li>[Problem 3: e.g., LCS - O(mn)]</li>
            </ul>
          </div>

          <div
            style={{
              padding: "15px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "0" }}>Greedy Algorithms</h3>
            <ul style={{ fontSize: "0.95em" }}>
              <li>[Algorithm 1: e.g., Huffman Coding]</li>
              <li>[Algorithm 2: e.g., Prim's MST]</li>
              <li>[Algorithm 3: e.g., Kruskal's MST]</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Practice Resources */}
      <div style={{ marginBottom: "40px" }}>
        <h2>4. Practice & Resources</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Problem Sets</h3>
            <ul>
              <li>[Link to HW assignments]</li>
              <li>[Practice problem repository]</li>
              <li>[Past exam problems]</li>
            </ul>
          </div>

          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Online Platforms</h3>
            <ul>
              <li>[LeetCode problems list]</li>
              <li>[HackerRank challenges]</li>
              <li>[CodeForces problems]</li>
            </ul>
          </div>

          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Additional Resources</h3>
            <ul>
              <li>[Supplementary readings]</li>
              <li>[Video lectures]</li>
              <li>[Visualization tools]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDesignHome;
