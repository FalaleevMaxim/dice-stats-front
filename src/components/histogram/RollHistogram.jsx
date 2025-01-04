import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function RollHistogram({ rollStats, width, height }) {
    const data = Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        "Выпало раз": rollStats[i + 1] || 0, // Учитываем, что числа начинаются с 1
    }));

    return (
        <BarChart width={width} height={height} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="number" label={{ value: "Число с куба", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Выпало раз", angle: -90, position: "insideLeft" }} />
            <Tooltip
                contentStyle={{
                    backgroundColor: "#20232a", // Тёмный фон
                    color: "#61dafb",           // Голубой текст
                    borderRadius: "8px",        // Скруглённые углы
                    border: "1px solid #61dafb", // Голубая рамка
                }}
                labelStyle={{
                    color: "#ffffff" // Белый текст для заголовка
                }}
                itemStyle={{
                    color: "#61dafb" // Голубой текст для элементов
                }}
                labelFormatter={(rollNumber) => {
                    return "Число с куба: " + rollNumber
                }}
            />
            <Legend />
            <Bar dataKey="Выпало раз" fill="#61dafb" />
        </BarChart>
    );
}

export default RollHistogram