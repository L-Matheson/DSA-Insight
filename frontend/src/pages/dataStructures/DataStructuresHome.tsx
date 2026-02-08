import React from "react";
import UnitCard from "../../components/ChapterCard";

const DataStructuresHome = () => {
  const units = [
    {
      title: "Unit 1: Arrays & Linked Lists",
      subTopics: [
        "Dynamic arrays and ArrayList implementation",
        "Singly and doubly linked lists",
        "Stack and queue implementations",
      ],
    },
    {
      title: "Unit 2: Trees & Binary Search Trees",
      subTopics: [
        "Binary tree traversals (in-order, pre-order, post-order)",
        "Binary Search Tree operations and balancing",
        "AVL trees and Red-Black trees",
      ],
    },
    {
      title: "Unit 3: Heaps & Priority Queues",
      subTopics: [
        "Min-heap and max-heap properties",
        "Heap operations (insert, extract, heapify)",
        "Priority queue applications",
      ],
    },
    {
      title: "Unit 4: Hash Tables",
      subTopics: [
        "Hash functions and collision resolution",
        "Chaining vs open addressing",
        "Hash table performance and applications",
      ],
    },
    {
      title: "Unit 5: Graphs",
      subTopics: [
        "Graph representations (adjacency matrix/list)",
        "Breadth-First Search (BFS) and Depth-First Search (DFS)",
        "Topological sorting and cycle detection",
      ],
    },
    {
      title: "Unit 6: Advanced Structures",
      subTopics: [
        "Tries and suffix trees",
        "Union-Find (Disjoint Set)",
        "Segment trees and Fenwick trees",
      ],
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ display: "flex", textAlign: "left" }}>1. Covered Topics</h2>
        <ul style={{ lineHeight: "1.8", textAlign: "left", fontSize: "1.1em" }}>
          <li>Implement and analyze fundamental data structures efficiently</li>
          <li>Choose appropriate data structures for specific problem requirements</li>
          <li>Understand time and space complexity trade-offs</li>
          <li>Apply data structures to solve real-world programming challenges</li>
          <li>Design custom data structures for specialized use cases</li>
          <li>Optimize code performance through proper structure selection</li>
        </ul>
      </div>

      {/* Course Topics */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ display: "flex", textAlign: "left" }}>2. Course Topics</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {units.map((unit, index) => (
            <UnitCard key={index} title={unit.title} topics={unit.subTopics} />
          ))}
        </div>
      </div>

      {/* Complexity Comparison */}
      <div style={{ marginBottom: "40px", padding: "20px", borderRadius: "8px", textAlign: "left" }}>
        <h2>3. Data Structure Operations Complexity</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Structure</th>
                <th style={{ padding: "10px" }}>Access</th>
                <th style={{ padding: "10px" }}>Search</th>
                <th style={{ padding: "10px" }}>Insert</th>
                <th style={{ padding: "10px" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "10px" }}><strong>Array</strong></td>
                <td style={{ padding: "10px" }}>O(1)</td>
                <td style={{ padding: "10px" }}>O(n)</td>
                <td style={{ padding: "10px" }}>O(n)</td>
                <td style={{ padding: "10px" }}>O(n)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "10px" }}><strong>Linked List</strong></td>
                <td style={{ padding: "10px" }}>O(n)</td>
                <td style={{ padding: "10px" }}>O(n)</td>
                <td style={{ padding: "10px" }}>O(1)</td>
                <td style={{ padding: "10px" }}>O(1)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "10px" }}><strong>BST</strong></td>
                <td style={{ padding: "10px" }}>O(log n)</td>
                <td style={{ padding: "10px" }}>O(log n)</td>
                <td style={{ padding: "10px" }}>O(log n)</td>
                <td style={{ padding: "10px" }}>O(log n)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "10px" }}><strong>Hash Table</strong></td>
                <td style={{ padding: "10px" }}>N/A</td>
                <td style={{ padding: "10px" }}>O(1)*</td>
                <td style={{ padding: "10px" }}>O(1)*</td>
                <td style={{ padding: "10px" }}>O(1)*</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: "0.9em", color: "#666", marginTop: "10px" }}>* Average case; worst case is O(n)</p>
        </div>
      </div>

      {/* Key Structures Covered */}
      <div style={{ marginBottom: "40px" }}>
        <h2>4. Key Data Structures & Applications</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Linear Structures</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>Arrays: Random access, cache-friendly</li>
              <li>Linked Lists: Dynamic sizing, fast insertion</li>
              <li>Stacks: LIFO, function calls, undo operations</li>
              <li>Queues: FIFO, task scheduling, BFS</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Tree Structures</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>BST: Sorted data, logarithmic operations</li>
              <li>Heaps: Priority queues, heap sort</li>
              <li>Tries: String search, autocomplete</li>
              <li>AVL/Red-Black: Self-balancing trees</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Hash-Based Structures</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>Hash Tables: Fast lookups, caching</li>
              <li>Hash Sets: Uniqueness, membership testing</li>
              <li>Bloom Filters: Space-efficient probabilistic sets</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Graph Structures</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>Adjacency Matrix: Dense graphs, fast edge lookup</li>
              <li>Adjacency List: Sparse graphs, memory efficient</li>
              <li>Edge List: Simple representation, sorting edges</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Practice Resources */}
      <div style={{ marginBottom: "40px" }}>
        <h2>5. Practice & Resources</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Coding Practice</h3>
            <ul>
              <li>LeetCode data structure problems</li>
              <li>Implementation exercises</li>
              <li>Past exam and quiz problems</li>
            </ul>
          </div>

          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Visualization Tools</h3>
            <ul>
              <li>VisuAlgo interactive animations</li>
              <li>Data Structure Visualizations website</li>
              <li>Custom implementation visualizers</li>
            </ul>
          </div>

          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Additional Resources</h3>
            <ul>
              <li>Textbook readings and examples</li>
              <li>Online tutorials and documentation</li>
              <li>Algorithm analysis resources</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructuresHome;
