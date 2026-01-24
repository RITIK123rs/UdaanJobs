import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

function PieGraph({applicationCount}) {
  const data = [
    { name: "Pending Applications", value: applicationCount.pending , color: "#faad14" },
    { name: "Accepted Applications", value: applicationCount.accepted , color: "#52c41a" },
    { name: "Rejected Applications", value: applicationCount.rejected , color: "#ff4d4f" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="recruiterDashboard pieGraphWrapper" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>

      <div style={{ width: 280, height: 254 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={95}
              label={false}
              labelLine={false}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="pieLegend me-3" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", fontSize: 14 }}>
            <div style={{ width: 25, height: 25, backgroundColor: item.color, borderRadius: 4, margin: "0 13px" }} />
            <span >
              {item.name} <strong>({total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%)</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieGraph;
