import { useNavigate } from "react-router-dom";

const ChapterCard = ({ title, topics, courseTitle }: { title: string; topics: string[]; courseTitle: string}) => {
    const navigate = useNavigate();


  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        width: "319px",
        display: "flex",
        flexDirection: "column",
        flex: "1 0 auto",
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        transition: "all 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "var(--accent-primary)";
        e.currentTarget.style.boxShadow = "var(--shadow-accent-sm)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => {
        navigate("/" + courseTitle + "/" + title);
      }}
    >
      <h3>{title}</h3>
      <ul style={{ textAlign: "left" }}>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
      <footer style={{ fontSize: "0.9em", color: "var(--text-muted)", marginTop: "auto" }}>
        Pages XX - XX
      </footer>
    </div>
  );
};

export default ChapterCard;
