import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import algorithmDesignHandler from "../../../handlers/algorithmDesignHandler";
import courseHandler from "../../../handlers/courseHandler";
import PageTitle from "../../../components/PageTitle";
import PageDesc from "../../../components/PageDesc";
import Tag from "../../../components/Tag";

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

 
        <div style={{ marginBottom: "40px", textAlign: "left" }}>
          <h2>1. Introduction to Algorithm Analysis</h2>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            The foundation of computer science lies in understanding how
            algorithms solve computational problems. This chapter introduces the
            fundamental concepts needed to design, analyze, and prove the
            correctness and efficiency of algorithms.
          </p>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            We'll explore what makes a good algorithm, how to mathematically
            prove that an algorithm works correctly, and how to analyze its
            efficiency using asymptotic notation.
          </p>
        </div>

        <div
          style={{
            marginBottom: "40px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            textAlign: "left",
          }}
        >
          <h2>2. Problem Solving & Algorithmic Problems</h2>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            An <strong>algorithmic problem</strong> is a specification of
            input-output relationships. An <strong>algorithm</strong> is a
            step-by-step procedure that transforms input into the desired
            output.
          </p>

          <h3 style={{ marginTop: "24px" }}>Key Concepts:</h3>
          <ul style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            <li>
              <strong>Problem Instance:</strong> A specific input to a problem
            </li>
            <li>
              <strong>Problem Size:</strong> A measure of input complexity (e.g., array length n)
            </li>
            <li>
              <strong>Algorithm Correctness:</strong> An algorithm is correct if
              it produces the right output for every valid input
            </li>
            <li>
              <strong>Algorithm Efficiency:</strong> How well an algorithm uses
              computational resources (time and space)
            </li>
          </ul>

          <h3 style={{ marginTop: "24px" }}>Example Problem: Searching</h3>
          <div
            style={{
              padding: "16px",
              backgroundColor: "var(--bg-elevated)",
              borderRadius: "6px",
              marginTop: "12px",
              fontFamily: "monospace",
            }}
          >
            <div>
              <strong>Input:</strong> An array A[1..n] and a value x
            </div>
            <div>
              <strong>Output:</strong> Index i where A[i] = x, or -1 if x is
              not in A
            </div>
          </div>
        </div>

        <div
          style={{
            marginBottom: "40px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            textAlign: "left",
          }}
        >
          <h2>3. Proofs of Correctness</h2>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            To prove an algorithm is correct, we must show it produces the right
            answer for all possible inputs. Two primary techniques are:
          </p>

          <h3 style={{ marginTop: "24px" }}>Loop Invariants</h3>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            A <strong>loop invariant</strong> is a property that holds before
            and after each iteration of a loop. To prove correctness using loop
            invariants, we must show:
          </p>
          <ol style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            <li>
              <strong>Initialization:</strong> The invariant is true before the
              first iteration
            </li>
            <li>
              <strong>Maintenance:</strong> If the invariant is true before an
              iteration, it remains true after
            </li>
            <li>
              <strong>Termination:</strong> When the loop terminates, the
              invariant gives us the desired result
            </li>
          </ol>

          <h3 style={{ marginTop: "24px" }}>Mathematical Induction</h3>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            <strong>Mathematical induction</strong> is used to prove statements
            for all natural numbers n:
          </p>
          <ol style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            <li>
              <strong>Base Case:</strong> Prove the statement holds for n = 0
              (or n = 1)
            </li>
            <li>
              <strong>Inductive Step:</strong> Assume the statement holds for n
              = k, then prove it holds for n = k + 1
            </li>
          </ol>

          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              backgroundColor: "var(--bg-elevated)",
              borderRadius: "6px",
              borderLeft: "4px solid var(--accent-primary)",
            }}
          >
            <strong>💡 Pro Tip:</strong> Loop invariants and induction are
            closely related — both rely on proving a base case and showing a
            property is preserved through iterations/steps.
          </div>
        </div>

        <div
          style={{
            marginBottom: "40px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            textAlign: "left",
          }}
        >
          <h2>4. Asymptotic Notation: O, Θ, Ω</h2>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
            Asymptotic notation allows us to describe the behavior of algorithms
            as input size grows to infinity, ignoring constant factors and
            lower-order terms.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--bg-elevated)",
                borderRadius: "6px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "var(--accent-primary)" }}>
                O (Big-O) — Upper Bound
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                f(n) = O(g(n)) means f(n) grows no faster than g(n).
              </p>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  marginTop: "12px",
                  padding: "8px",
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "4px",
                }}
              >
                ∃ c &gt; 0, n₀ : f(n) ≤ c·g(n) ∀ n ≥ n₀
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  marginTop: "8px",
                }}
              >
                <strong>Example:</strong> 3n² + 5n + 2 = O(n²)
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--bg-elevated)",
                borderRadius: "6px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "var(--accent-primary)" }}>
                Ω (Big-Omega) — Lower Bound
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                f(n) = Ω(g(n)) means f(n) grows at least as fast as g(n).
              </p>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  marginTop: "12px",
                  padding: "8px",
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "4px",
                }}
              >
                ∃ c &gt; 0, n₀ : f(n) ≥ c·g(n) ∀ n ≥ n₀
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  marginTop: "8px",
                }}
              >
                <strong>Example:</strong> n² + 100 = Ω(n²)
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--bg-elevated)",
                borderRadius: "6px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "var(--accent-primary)" }}>
                Θ (Big-Theta) — Tight Bound
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                f(n) = Θ(g(n)) means f(n) grows at the same rate as g(n).
              </p>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  marginTop: "12px",
                  padding: "8px",
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "4px",
                }}
              >
                f(n) = O(g(n)) AND f(n) = Ω(g(n))
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  marginTop: "8px",
                }}
              >
                <strong>Example:</strong> 2n² - 3n = Θ(n²)
              </p>
            </div>
          </div>

          <h3 style={{ marginTop: "32px" }}>Common Time Complexities</h3>
          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              backgroundColor: "var(--bg-elevated)",
              borderRadius: "6px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <th style={{ textAlign: "left", padding: "8px" }}>
                    Complexity
                  </th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>
                    Example Algorithm
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      fontFamily: "monospace",
                      color: "var(--accent-primary)",
                    }}
                  >
                    O(1)
                  </td>
                  <td style={{ padding: "8px" }}>Constant</td>
                  <td style={{ padding: "8px" }}>Array access, hash lookup</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      fontFamily: "monospace",
                      color: "var(--accent-primary)",
                    }}
                  >
                    O(log n)
                  </td>
                  <td style={{ padding: "8px" }}>Logarithmic</td>
                  <td style={{ padding: "8px" }}>Binary search</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      fontFamily: "monospace",
                      color: "var(--accent-primary)",
                    }}
                  >
                    O(n)
                  </td>
                  <td style={{ padding: "8px" }}>Linear</td>
                  <td style={{ padding: "8px" }}>Linear search</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      fontFamily: "monospace",
                      color: "var(--accent-primary)",
                    }}
                  >
                    O(n log n)
                  </td>
                  <td style={{ padding: "8px" }}>Linearithmic</td>
                  <td style={{ padding: "8px" }}>Merge sort, quicksort</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      fontFamily: "monospace",
                      color: "var(--accent-primary)",
                    }}
                  >
                    O(n²)
                  </td>
                  <td style={{ padding: "8px" }}>Quadratic</td>
                  <td style={{ padding: "8px" }}>Bubble sort, selection sort</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      fontFamily: "monospace",
                      color: "var(--accent-primary)",
                    }}
                  >
                    O(2ⁿ)
                  </td>
                  <td style={{ padding: "8px" }}>Exponential</td>
                  <td style={{ padding: "8px" }}>Recursive Fibonacci</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      fontFamily: "monospace",
                      color: "var(--accent-primary)",
                    }}
                  >
                    O(n!)
                  </td>
                  <td style={{ padding: "8px" }}>Factorial</td>
                  <td style={{ padding: "8px" }}>Permutation generation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
              An algorithm must be <strong>correct</strong> (produces right
              output for all inputs) and <strong>efficient</strong> (uses
              reasonable resources)
            </li>
            <li>
              Use <strong>loop invariants</strong> and{" "}
              <strong>induction</strong> to prove correctness
            </li>
            <li>
              Asymptotic notation (O, Ω, Θ) characterizes algorithm efficiency
              as input size grows
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
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                padding: "16px",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h4 style={{ marginTop: 0 }}>Problem 1: Prove Correctness</h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                }}
              >
                Prove the correctness of insertion sort using loop invariants.
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h4 style={{ marginTop: 0 }}>Problem 2: Analyze Complexity</h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                }}
              >
                Find the tight bound (Θ) for the function f(n) = 5n³ + 2n² - 8n
                + 100.
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h4 style={{ marginTop: 0 }}>Problem 3: Compare Algorithms</h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                }}
              >
                Compare algorithms with O(n log n) vs O(n²) for n = 1000. Which
                is faster?
              </p>
            </div>
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
