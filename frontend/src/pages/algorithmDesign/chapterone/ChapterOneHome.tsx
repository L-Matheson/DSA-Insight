import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import algorithmDesignHandler from "../../../handlers/algorithmDesignHandler";
import courseHandler from "../../../handlers/courseHandler";
import PageTitle from "../../../components/PageTitle";
import Tag from "../../../components/Tag";
import ChapterSection from "../../../components/ChapterSection";
import ProblemCard from "../../../components/ProblemCard";

const ChapterOneHome: React.FC = () => {
  const { "course-title": courseTitle, chapter: chapterTitle } = useParams();
  const course = courseHandler.findByTitle(courseTitle || "");
  const chapter = algorithmDesignHandler.findByTitle(chapterTitle || "");
  const navigate = useNavigate();

  if (!course || !chapter) {
    return (
      <div style={{ padding: 24 }}>
        <PageTitle title="Chapter Not Found" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {chapter.subTopics.map((topic, idx) => (
          <Tag key={idx} displayTag={topic} />
        ))}
      </div>

      <ChapterSection
        sectionNumber={1}
        title="Introduction to Algorithm Analysis"
        paragraphs={[
          "The foundation of computer science lies in understanding how algorithms solve computational problems. This chapter introduces the fundamental concepts needed to design, analyze, and prove the correctness and efficiency of algorithms.",
          "We'll explore what makes a good algorithm, how to mathematically prove that an algorithm works correctly, and how to analyze its efficiency using asymptotic notation.",
        ]}
      />

      <ChapterSection
        sectionNumber={2}
        title="Problem Solving & Algorithmic Problems"
        paragraphs={[
          "An <strong>algorithmic problem</strong> is a specification of input-output relationships. An <strong>algorithm</strong> is a step-by-step procedure that transforms input into the desired output.",
        ]}
        keyConcepts={{
          title: "Key Concepts:",
          listType: "ul",
          items: [
            {
              label: "Problem Instance",
              description: "A specific input to a problem",
            },
            {
              label: "Problem Size",
              description:
                "A measure of input complexity (e.g., array length n)",
            },
            {
              label: "Algorithm Correctness",
              description:
                "An algorithm is correct if it produces the right output for every valid input",
            },
            {
              label: "Algorithm Efficiency",
              description:
                "How well an algorithm uses computational resources (time and space)",
            },
          ],
        }}
        codeSnippet={{
          lines: [
            { label: "Input", value: "An array A[1..n] and a value x" },
            {
              label: "Output",
              value: "Index i where A[i] = x, or -1 if x is not in A",
            },
          ],
        }}
      />

      <ChapterSection
        sectionNumber={3}
        title="Proofs of Correctness"
        paragraphs={[
          "To prove an algorithm is correct, we must show it produces the right answer for all possible inputs. Two primary techniques are:",
        ]}
        subsections={[
          {
            title: "Loop Invariants",
            paragraphs: [
              "A <strong>loop invariant</strong> is a property that holds before and after each iteration of a loop. To prove correctness using loop invariants, we must show:",
            ],
            keyConcepts: {
              listType: "ol",
              items: [
                {
                  label: "Initialization",
                  description:
                    "The invariant is true before the first iteration",
                },
                {
                  label: "Maintenance",
                  description:
                    "If the invariant is true before an iteration, it remains true after",
                },
                {
                  label: "Termination",
                  description:
                    "When the loop terminates, the invariant gives us the desired result",
                },
              ],
            },
          },
          {
            title: "Mathematical Induction",
            paragraphs: [
              "<strong>Mathematical induction</strong> is used to prove statements for all natural numbers n:",
            ],
            keyConcepts: {
              listType: "ol",
              items: [
                {
                  label: "Base Case",
                  description: "Prove the statement holds for n = 0 (or n = 1)",
                },
                {
                  label: "Inductive Step",
                  description:
                    "Assume the statement holds for n = k, then prove it holds for n = k + 1",
                },
              ],
            },
          },
        ]}
        proTip={{
          text: "Loop invariants and induction are closely related — both rely on proving a base case and showing a property is preserved through iterations/steps.",
        }}
      />

      <ChapterSection
        sectionNumber={4}
        title="Asymptotic Notation: O, Θ, Ω"
        paragraphs={[
          "Asymptotic notation allows us to describe the behavior of algorithms as input size grows to infinity, ignoring constant factors and lower-order terms.",
        ]}
        innerCards={[
          {
            title: "O (Big-O) — Upper Bound",
            definition: "f(n) = O(g(n)) means f(n) grows no faster than g(n).",
            codeSnippet: "∃ c &gt; 0, n₀ : f(n) ≤ c·g(n) ∀ n ≥ n₀",
            example: "3n² + 5n + 2 = O(n²)",
          },
          {
            title: "Ω (Big-Omega) — Lower Bound",
            definition:
              "f(n) = Ω(g(n)) means f(n) grows at least as fast as g(n).",
            codeSnippet: "∃ c &gt; 0, n₀ : f(n) ≥ c·g(n) ∀ n ≥ n₀",
            example: "n² + 100 = Ω(n²)",
          },
          {
            title: "Θ (Big-Theta) — Tight Bound",
            definition:
              "f(n) = Θ(g(n)) means f(n) grows at the same rate as g(n).",
            codeSnippet: "f(n) = O(g(n)) AND f(n) = Ω(g(n))",
            example: "2n² - 3n = Θ(n²)",
          },
        ]}
        dataTable={{
          title: "Common Time Complexities",
          data: {
            columns: ["Complexity", "Name", "Example Algorithm"],
            rows: [
              ["O(1)", "Constant", "Array access, hash lookup"],
              ["O(log n)", "Logarithmic", "Binary search"],
              ["O(n)", "Linear", "Linear search"],
              ["O(n log n)", "Linearithmic", "Merge sort, quicksort"],
              ["O(n²)", "Quadratic", "Bubble sort, selection sort"],
              ["O(2ⁿ)", "Exponential", "Recursive Fibonacci"],
              ["O(n!)", "Factorial", "Permutation generation"],
            ],
          },
        }}
      />

      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--accent-primary)",
          textAlign: "left",
        }}
      >
        <h2>🎯 Key Takeaways</h2>
        <ul style={{ lineHeight: "2", color: "var(--text-secondary)" }}>
          <li>
            An algorithm must be <strong>correct</strong> (produces right output
            for all inputs) and <strong>efficient</strong> (uses reasonable
            resources)
          </li>
          <li>
            Use <strong>loop invariants</strong> and <strong>induction</strong>{" "}
            to prove correctness
          </li>
          <li>
            Asymptotic notation (O, Ω, Θ) characterizes algorithm efficiency as
            input size grows
          </li>
          <li>
            <strong>Big-O</strong> gives upper bounds,{" "}
            <strong>Big-Omega</strong> gives lower bounds,{" "}
            <strong>Big-Theta</strong> gives tight bounds
          </li>
          <li>
            Focus on the dominant term and ignore constants when analyzing
            complexity
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "40px", textAlign: "left" }}>
        <h2>📝 Practice Problems</h2>
        <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
          Test your understanding with these practice problems:
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <ProblemCard
            title="Problem 1: Prove Correctness"
            description="Prove the correctness of insertion sort using loop invariants."
          />

          <ProblemCard
            title="Problem 2: Analyze Complexity"
            description="Find the tight bound (Θ) for the function f(n) = 5n³ + 2n² - 8n + 100."
          />

          <ProblemCard
            title="Problem 3: Compare Algorithms"
            description="Compare algorithms with O(n log n) vs O(n²) for n = 1000. Which is faster?"
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "48px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate(`/${course.title}`)}
          style={{
            padding: "10px 20px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-elevated)";
            e.currentTarget.style.borderColor = "var(--accent-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-surface)";
            e.currentTarget.style.borderColor = "var(--border-subtle)";
          }}
        >
          ← Back to {course.title}
        </button>

        <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Chapter 1 of 6
        </div>

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "var(--accent-primary)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
            fontSize: "14px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          Next Chapter →
        </button>
      </div>
    </div>
  );
};

export default ChapterOneHome;
