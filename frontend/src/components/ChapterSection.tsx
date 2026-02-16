import React from "react";
import InnerCard from "./InnerCard";
import DataTable from "./DataTable";

interface KeyConceptItem {
  label?: string;
  description?: string;
  text?: string;
}

interface KeyConceptList {
  title?: string;
  listType: "ul" | "ol";
  items: (string | KeyConceptItem)[];
}

interface CodeSnippet {
  lines: { label: string; value: string }[];
}

interface ProTip {
  text: string;
}

interface Subsection {
  title: string;
  paragraphs?: string[];
  keyConcepts?: KeyConceptList;
}

interface InnerCardData {
  title: string;
  titleColor?: string;
  definition: string;
  codeSnippet: string;
  example: string;
}

interface DataTableData {
  columns: (string | { header: string; align?: "left" | "center" | "right" })[];
  rows: (string[] | { value: string; color?: string; fontFamily?: string }[])[];
  firstColumnColor?: string;
  firstColumnMonospace?: boolean;
}

interface ChapterSectionProps {
  sectionNumber: number;
  title: string;
  paragraphs?: string[];
  subsections?: Subsection[];
  keyConcepts?: KeyConceptList;
  codeSnippet?: CodeSnippet;
  proTip?: ProTip;
  innerCards?: InnerCardData[];
  dataTable?: { title?: string; data: DataTableData };
}

const ChapterSection: React.FC<ChapterSectionProps> = ({
  sectionNumber,
  title,
  paragraphs,
  subsections,
  keyConcepts,
  codeSnippet,
  proTip,
  innerCards,
  dataTable,
}) => {
  const renderList = (list: KeyConceptList) => {
    const ListTag = list.listType === "ol" ? "ol" : "ul";

    return (
      <>
        {list.title && (
          <h3 style={{ marginTop: "24px" }}>{list.title}</h3>
        )}
        <ListTag style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
          {list.items.map((item, idx) => {
            if (typeof item === "string") {
              return <li key={idx}>{item}</li>;
            } else if (item.label && item.description) {
              return (
                <li key={idx}>
                  <strong>{item.label}:</strong> {item.description}
                </li>
              );
            } else if (item.text) {
              return <li key={idx}>{item.text}</li>;
            }
            return null;
          })}
        </ListTag>
      </>
    );
  };

  return (
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
      <h2>
        {sectionNumber}. {title}
      </h2>

      {paragraphs &&
        paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

      {keyConcepts && renderList(keyConcepts)}

      {codeSnippet && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "var(--bg-elevated)",
            borderRadius: "6px",
            marginTop: "12px",
            fontFamily: "monospace",
          }}
        >
          {codeSnippet.lines.map((line, idx) => (
            <div key={idx}>
              <strong>{line.label}:</strong> {line.value}
            </div>
          ))}
        </div>
      )}

      {subsections &&
        subsections.map((subsection, idx) => (
          <div key={idx}>
            <h3 style={{ marginTop: "24px" }}>{subsection.title}</h3>
            {subsection.paragraphs &&
              subsection.paragraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            {subsection.keyConcepts && renderList(subsection.keyConcepts)}
          </div>
        ))}

      {innerCards && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {innerCards.map((card, idx) => (
            <InnerCard
              key={idx}
              title={card.title}
              titleColor={card.titleColor}
              definition={card.definition}
              codeSnippet={card.codeSnippet}
              example={card.example}
            />
          ))}
        </div>
      )}

      {dataTable && (
        <>
          {dataTable.title && (
            <h3 style={{ marginTop: "32px" }}>{dataTable.title}</h3>
          )}
          <DataTable
            columns={dataTable.data.columns}
            rows={dataTable.data.rows}
            firstColumnColor={dataTable.data.firstColumnColor}
            firstColumnMonospace={dataTable.data.firstColumnMonospace}
          />
        </>
      )}

      {proTip && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "var(--bg-elevated)",
            borderRadius: "6px",
            borderLeft: "4px solid var(--accent-primary)",
          }}
        >
          <strong>💡 Pro Tip:</strong> {proTip.text}
        </div>
      )}
    </div>
  );
};

export default ChapterSection;
