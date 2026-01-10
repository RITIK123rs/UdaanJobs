import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";



function PieGraph({jobSeekerCount,recruiterCount}) {

  const data = [
    { name: "JobSeeker", value: jobSeekerCount, color: "#52c41a" },
    { name: "Recruiter", value: recruiterCount, color: "#faad14" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        maxWidth: 600,
        minHeight:280,
        margin: "0 auto",
        paddingRight: 20 ,
      }}
    >
      <div style={{ width: 330, height: 270 }}>
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
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 14,
              fontSize: 14,
            }}
          >
            <div
              style={{
                width: 25,
                height: 20,
                backgroundColor: item.color,
                marginRight: 10,
              }}
            />
            <span className="title" >
              {item.name} {" "}
              <strong>
                ({((item.value / total) * 100).toFixed(0)}%)
              </strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieGraph;
