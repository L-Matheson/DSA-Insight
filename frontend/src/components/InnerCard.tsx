import React from "react";

interface InnerCardProps {
  title: string;
  titleColor?: string;
  definition: string;
  codeSnippet: string;
  example: string;
}

const InnerCard: React.FC<InnerCardProps> = ({
  title,
  titleColor = "var(--accent-primary)",
  definition,
  codeSnippet,
  example,
}) => {
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "var(--bg-elevated)",
        borderRadius: "6px",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <h3 style={{ marginTop: 0, color: titleColor }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
        {definition}
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
        dangerouslySetInnerHTML={{ __html: codeSnippet }}
      />
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-muted)",
          marginTop: "8px",
        }}
      >
        <strong>Example:</strong> {example}
      </p>
    </div>
  );
};

export default InnerCard;
