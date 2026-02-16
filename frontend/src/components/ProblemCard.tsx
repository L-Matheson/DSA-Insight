import React from "react";

interface ProblemCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
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
      onClick={onClick}
    >
      <h4 style={{ marginTop: 0 }}>{title}</h4>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default ProblemCard;
