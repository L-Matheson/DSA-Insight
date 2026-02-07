const PageTitle = ({ title }: { title: string }) => {
  return (
    <span style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px", display: "block", textAlign: "left" }}>
      {title}
    </span>
  );
};

export default PageTitle;
