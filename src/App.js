import React, { useState } from "react";
import RainGrid from "./RainGrid";

function App() {
  // Default grid size
  const [rows, setRows] = useState(20);
  const [columns, setColumns] = useState(15);
  const [intervalTime, setIntervalTime] = useState(100);  // Drop speed
  const [colorChangeInterval, setColorChangeInterval] = useState(2000);  // Color change interval

  const handleRowsChange = (e) => {
    const newRows = Math.max(5, Math.min(50, parseInt(e.target.value))); // Limit between 5 and 50 rows
    setRows(newRows);
  };

  const handleColumnsChange = (e) => {
    const newColumns = Math.max(5, Math.min(30, parseInt(e.target.value))); // Limit between 5 and 30 columns
    setColumns(newColumns);
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "20px" }}>
      <h1>Dynamic Rain Effect with Changing Colors</h1>

      {/* Grid Size Controls */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Rows: 
          <input
            type="number"
            value={rows}
            onChange={handleRowsChange}
            min="5"
            max="50"
            style={{ width: "60px", marginLeft: "10px" }}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Columns: 
          <input
            type="number"
            value={columns}
            onChange={handleColumnsChange}
            min="5"
            max="30"
            style={{ width: "60px", marginLeft: "10px" }}
          />
        </label>
      </div>

      {/* RainGrid */}
      <RainGrid
        rows={rows}
        columns={columns}
        intervalTime={intervalTime}
        colorChangeInterval={colorChangeInterval}
      />
    </div>
  );
}

export default App;
