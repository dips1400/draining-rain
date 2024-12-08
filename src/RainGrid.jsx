import React, { useEffect, useState } from "react";
import "./RainGrid.css";

const RainGrid = ({ rows, columns, intervalTime, colorChangeInterval }) => {
  // Function to generate a random color
  const getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  };

  const [grid, setGrid] = useState([]);
  const [currentColor, setCurrentColor] = useState(getRandomColor());

  // Initialize the grid with empty cells
  useEffect(() => {
    const createEmptyGrid = () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({
          active: false,
          color: "",
        }))
      );
    setGrid(createEmptyGrid());
  }, [rows, columns]);

  // Change color periodically
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColor(getRandomColor()); // Change to a new color every `colorChangeInterval`
    }, colorChangeInterval);

    return () => clearInterval(colorInterval);
  }, [colorChangeInterval]);

  // Rain animation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isAboveActive = rowIndex > 0 && prevGrid[rowIndex - 1][colIndex].active;

            if (isAboveActive) {
              return {
                active: true,
                color: prevGrid[rowIndex - 1][colIndex].color,
              };
            } else if (rowIndex === 0 && Math.random() < 0.1) {
              return {
                active: true,
                color: currentColor,  // Use the current color for new rain drops
              };
            } else {
              return { active: false, color: "" };
            }
          })
        );
        return newGrid;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [currentColor, intervalTime]);

  return (
    <div
      className="rain-grid"
      style={{
        gridTemplateRows: `repeat(${rows}, 13px)`,
        gridTemplateColumns: `repeat(${columns}, 13px)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell.active ? "active" : ""}`}
            style={{
              backgroundColor: cell.active ? cell.color : "transparent",
            }}
          />
        ))
      )}
    </div>
  );
};

export default RainGrid;

