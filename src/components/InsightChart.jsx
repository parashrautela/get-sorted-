import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export default function InsightChart({ data, lines, height = 220 }) {
  return (
    <div className="w-full bg-canvas rounded-[16px] border border-hairline p-4 hover:shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px] transition-all duration-300">
      
      {/* Custom Legend to match reference image */}
      <div className="flex items-center gap-4 mb-4 px-2">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: line.color }}
            />
            <span className="text-xs font-semibold text-ink">
              {line.name}
            </span>
          </div>
        ))}
      </div>

      <div style={{ height: height, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="var(--color-hairline, #dddddd)" 
            />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'var(--color-muted, #6a6a6a)', fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'var(--color-muted, #6a6a6a)', fontWeight: 500 }} 
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-surface-strong, #f2f2f2)', 
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                fontSize: '12px',
                color: 'var(--color-ink, #222222)',
                fontWeight: 600
              }}
              itemStyle={{ color: 'var(--color-ink, #222222)' }}
            />
            {lines.map((line, idx) => (
              <Line 
                key={idx}
                type="monotone" 
                dataKey={line.dataKey} 
                stroke={line.color} 
                strokeWidth={2.5} 
                dot={false}
                activeDot={{ r: 4, fill: line.color, stroke: '#fff', strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
