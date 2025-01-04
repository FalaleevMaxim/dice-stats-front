import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function RollHistogram({ rollStats, width, height }) {
    const data = Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        "Количество": rollStats[i + 1] || 0, // Учитываем, что числа начинаются с 1
    }));

    return (
        <BarChart width={width} height={height} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="number" label={{ value: "Результат", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Количество", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Количество" fill="#8884d8" />
        </BarChart>
    );
}

export default RollHistogram