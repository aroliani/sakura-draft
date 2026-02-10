import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CHART_DATA } from "@/data/mockData";
import { useState } from "react";

interface Props {
  onDateClick: (date: string) => void;
}

export default function ActivityChart({ onDateClick }: Props) {
  const data = CHART_DATA.labels.map((label, i) => ({
    name: label,
    date: CHART_DATA.dates[i],
    Upload: CHART_DATA.uploads[i],
    Persetujuan: CHART_DATA.approvals[i],
  }));

  const handleClick = (payload: any) => {
    if (payload?.activePayload?.[0]) {
      onDateClick(payload.activePayload[0].payload.date);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-bold text-foreground mb-1">📈 Aktivitas Mingguan</h3>
      <p className="text-xs text-muted-foreground mb-4">Klik pada titik grafik untuk melihat dokumen pada hari tersebut</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} onClick={handleClick} style={{ cursor: "pointer" }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(350 15% 90%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(0 0% 49%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(0 0% 49%)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(350 15% 90%)",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="Upload" stroke="hsl(352 48% 28%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(352 48% 28%)" }} activeDot={{ r: 7 }} />
          <Line type="monotone" dataKey="Persetujuan" stroke="hsl(155 54% 40%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(155 54% 40%)" }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
