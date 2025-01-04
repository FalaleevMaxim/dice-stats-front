import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const RollHistoryChart = ({ rolls, width, height }) => {
  // Преобразуем историю бросков в формат для графика
  const data = rolls.map((roll, index) => ({
    rollNumber: index + 1,        // Номер броска (для оси X)
    rollValue: roll.result,       // Значение броска
    rollDate: roll.date           // Дата броска
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
            tickCount={20}
        />
        <Tooltip
            contentStyle={{
              backgroundColor: "#20232a",
              color: "#61dafb",
              borderRadius: "8px",
              border: "1px solid #61dafb"
            }}
            labelStyle={{
              color: "#ffffff"
            }}
            itemStyle={{
              color: "#61dafb"
            }}
            labelFormatter={(rollNumber) => {
              const roll = data.find(d => d.rollNumber === rollNumber);
              return roll ? `${new Date(roll.rollDate).toLocaleString()}` : `Бросок ${rollNumber}`;
            }}
        />
        <Legend />
        <Line
            type="linear" // Ломаная линия
            dataKey="rollValue"
            name="Выпавшее значение"
            stroke="#61dafb"
            dot={{ stroke: "#61dafb", strokeWidth: 2, r: 3 }}
        />
      </LineChart>
  );
};

export default RollHistoryChart;
