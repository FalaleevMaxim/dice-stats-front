import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const RollHistoryChart = ({ rollHistory, width, height }) => {
  // Преобразуем историю бросков в формат для графика
  const data = rollHistory.map((value, index) => ({
    rollNumber: index + 1, // Номер броска
    "Выпавшее значение": value,      // Значение броска
  }));

  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="rollNumber"
        label={{ value: "Бросок", position: "insideBottom", offset: -5 }}
      />
      <YAxis
        label={{ value: "Результат", angle: -90, position: "insideLeft" }}
        domain={[1, 20]} // Значения бросков лежат в пределах d20
      />
      <Tooltip />
      <Legend />
      <Line
        type="linear" // Ломаная линия
        dataKey="Выпавшее значение"
        stroke="#8884d8"
        dot={{ stroke: "#8884d8", strokeWidth: 2, r: 3 }}
      />
    </LineChart>
  );
};
 export default RollHistoryChart