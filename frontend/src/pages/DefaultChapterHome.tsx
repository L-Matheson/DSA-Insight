import React from "react";
import PageDesc from "../components/PageDesc";
import PageTitle from "../components/PageTitle";

const DefaultChapterHome: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <PageTitle title="No Chapter Home Available" />
        <PageDesc description={"This chapter does not have a dedicated homepage yet. Check the subtopics or jump to problems and examples."} />
        <div style={{ marginTop: 12, color: "var(--text-muted)" }}>
          <p>Coming soon — content is under construction.</p>
        </div>
      </div>
    </div>
  );
};

export default DefaultChapterHome;
