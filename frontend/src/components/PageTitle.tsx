const PageTitle = ({ title }: { title: string }) => {
  return (
    <span
      style={{
        fontSize: "30px",
        fontWeight: 700,
        color: "var(--text-primary)",
        letterSpacing: "-0.5px",
        display: "block",
        textAlign: "left",
        paddingBottom: "8px",
        borderBottom: "1px solid var(--text-secondary)",
      }}
    >
      {title}
    </span>
  );
};

export default PageTitle;
