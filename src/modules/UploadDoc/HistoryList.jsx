import React from "react";

const HistoryList = ({ history }) => (
  <>
    {history.map((fileName, index) => (
      <li key={index} style={{ opacity: 0.8, fontStyle: "italic" }}>
        <i data-lucide="file-text"></i> {fileName}
      </li>
    ))}
  </>
);

export default HistoryList;
