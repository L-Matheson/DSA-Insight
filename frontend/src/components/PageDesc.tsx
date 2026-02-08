const PageDesc = ({ description }: { description: string }) => {
  return (
    <span
      style={{
        fontSize: "18px",
        color: "var(--text-secondary)",
        lineHeight: "1.6",
        marginBottom: "20px",
        display: "flex",
        textAlign: "left",
      }}
    >
      {description}
    </span>
  );
};

export default PageDesc;
