const Tag = ({ displayTag }: { displayTag: string }) => {
  return (
    <span
      style={{
        fontSize: "12px",
        backgroundColor: "var(--bg-elevated)",
        color: "var(--text-secondary)",
        padding: "4px 10px",
        borderRadius: "4px",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {displayTag}
    </span>
  );
};

export default Tag;
