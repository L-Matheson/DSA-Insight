import React from "react";
import UnitCard from "../../components/UnitCard";

const SystemsProgrammingHome = () => {
  const units = [
    {
      title: "Unit 1: C Programming Fundamentals",
      subTopics: [
        "C syntax, types, and control structures",
        "Pointers and pointer arithmetic",
        "Arrays, strings, and structs",
      ],
    },
    {
      title: "Unit 2: Memory Management",
      subTopics: [
        "Stack vs heap memory allocation",
        "malloc, calloc, realloc, and free",
        "Memory leaks and debugging with Valgrind",
      ],
    },
    {
      title: "Unit 3: Processes & System Calls",
      subTopics: [
        "Process creation and lifecycle (fork, exec)",
        "System call interface and error handling",
        "Inter-process communication (IPC)",
      ],
    },
    {
      title: "Unit 4: Concurrency & Threads",
      subTopics: [
        "POSIX threads (pthreads) and thread management",
        "Race conditions and synchronization primitives",
        "Mutexes, semaphores, and condition variables",
      ],
    },
    {
      title: "Unit 5: File Systems & I/O",
      subTopics: [
        "File descriptors and system I/O operations",
        "File system structure and organization",
        "Buffering, caching, and performance",
      ],
    },
    {
      title: "Unit 6: Operating System Concepts",
      subTopics: [
        "Scheduling algorithms and context switching",
        "Virtual memory and paging",
        "Deadlocks and resource management",
      ],
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ display: "flex", textAlign: "left" }}>1. Covered Topics</h2>
        <ul style={{ lineHeight: "1.8", textAlign: "left", fontSize: "1.1em" }}>
          <li>Write efficient low-level C programs with proper memory management</li>
          <li>Understand how programs interact with the operating system</li>
          <li>Implement concurrent programs using threads and synchronization</li>
          <li>Debug system-level issues using appropriate tools</li>
          <li>Work with file systems and perform system I/O operations</li>
          <li>Analyze and optimize system performance</li>
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

      {/* Essential Tools & Commands */}
      <div style={{ marginBottom: "40px", padding: "20px", borderRadius: "8px", textAlign: "left" }}>
        <h2>3. Essential Tools & Commands</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <div>
            <strong>GCC:</strong> GNU Compiler Collection for C/C++
          </div>
          <div>
            <strong>GDB:</strong> GNU Debugger for step-by-step debugging
          </div>
          <div>
            <strong>Valgrind:</strong> Memory leak detection and profiling
          </div>
          <div>
            <strong>Make:</strong> Build automation tool
          </div>
          <div>
            <strong>strace:</strong> System call tracer
          </div>
          <div>
            <strong>perf:</strong> Performance analysis tool
          </div>
        </div>
        <h3 style={{ marginTop: "20px" }}>Common GCC Flags</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li><code>-Wall -Wextra</code> - Enable all warnings</li>
          <li><code>-g</code> - Include debug information</li>
          <li><code>-O2</code> - Optimization level 2</li>
          <li><code>-lpthread</code> - Link pthread library</li>
          <li><code>-fsanitize=address</code> - Address sanitizer</li>
        </ul>
      </div>

      {/* Key Concepts */}
      <div style={{ marginBottom: "40px" }}>
        <h2>4. Core Systems Programming Concepts</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Memory Management</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>Stack: automatic allocation, limited size</li>
              <li>Heap: dynamic allocation, manual management</li>
              <li>Memory leaks and dangling pointers</li>
              <li>RAII patterns and smart memory usage</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Process Management</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>fork() creates child processes</li>
              <li>exec() replaces process image</li>
              <li>wait() and process synchronization</li>
              <li>Zombie and orphan processes</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>Concurrency</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>Thread creation and joining</li>
              <li>Critical sections and mutual exclusion</li>
              <li>Producer-consumer problem</li>
              <li>Deadlock prevention and avoidance</li>
            </ul>
          </div>

          <div style={{ padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h3 style={{ marginTop: "0" }}>System I/O</h3>
            <ul style={{ fontSize: "0.95em", textAlign: "left" }}>
              <li>File descriptors (stdin, stdout, stderr)</li>
              <li>open(), read(), write(), close()</li>
              <li>Buffered vs unbuffered I/O</li>
              <li>File permissions and ownership</li>
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
            <h3>Hands-On Projects</h3>
            <ul>
              <li>Custom shell implementation</li>
              <li>Memory allocator (malloc clone)</li>
              <li>Multi-threaded server</li>
              <li>File system utilities</li>
            </ul>
          </div>

          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Linux Resources</h3>
            <ul>
              <li>Man pages (man 2 for system calls)</li>
              <li>Linux kernel documentation</li>
              <li>POSIX standards reference</li>
            </ul>
          </div>

          <div style={{ padding: "20px", borderRadius: "8px" }}>
            <h3>Additional Resources</h3>
            <ul>
              <li>"The Linux Programming Interface" book</li>
              <li>Stack Overflow C and Linux tags</li>
              <li>Online C programming tutorials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemsProgrammingHome;
