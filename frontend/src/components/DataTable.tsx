import React from "react";

interface DataTableColumn {
  header: string;
  align?: "left" | "center" | "right";
}

interface DataTableCell {
  value: string;
  color?: string;
  fontFamily?: string;
}

interface DataTableProps {
  columns: (string | DataTableColumn)[];
  rows: (string[] | DataTableCell[])[];
  firstColumnColor?: string;
  firstColumnMonospace?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  firstColumnColor = "var(--accent-primary)",
  firstColumnMonospace = true,
}) => {
  const normalizeColumn = (col: string | DataTableColumn): DataTableColumn => {
    if (typeof col === "string") {
      return { header: col, align: "left" };
    }
    return { align: "left", ...col };
  };

  const normalizedColumns = columns.map(normalizeColumn);

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px",
        backgroundColor: "var(--bg-elevated)",
        borderRadius: "6px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            {normalizedColumns.map((col, idx) => (
              <th
                key={idx}
                style={{
                  textAlign: col.align,
                  padding: "8px",
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => {
                const isFirstColumn = cellIdx === 0;
                const cellValue = typeof cell === "string" ? cell : cell.value;
                const cellColor =
                  typeof cell === "string"
                    ? isFirstColumn
                      ? firstColumnColor
                      : undefined
                    : cell.color;
                const cellFontFamily =
                  typeof cell === "string"
                    ? isFirstColumn && firstColumnMonospace
                      ? "monospace"
                      : undefined
                    : cell.fontFamily;

                return (
                  <td
                    key={cellIdx}
                    style={{
                      padding: "8px",
                      color: cellColor,
                      fontFamily: cellFontFamily,
                    }}
                  >
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
