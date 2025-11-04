"use client"

import React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

// ✅ Export du type ChartConfig
export interface ChartConfig {
  desktop: { label: string; color: string }
  mobile: { label: string; color: string }
}

// ✅ Export des composants wrapper
export const ChartContainer: React.FC<{ config: ChartConfig; className?: string; children: React.ReactNode }> = ({
  config,
  className,
  children,
}) => {
  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-md ${className || ""}`}
      style={{
        "--color-desktop": config.desktop.color,
        "--color-mobile": config.mobile.color,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

export const ChartLegend: React.FC<{ content: React.ReactNode }> = ({ content }) => {
  return <div className="mt-2">{content}</div>
}

export const ChartLegendContent: React.FC = () => {
  return <div className="flex gap-2 text-sm font-medium">
    <span className="inline-block w-3 h-3 bg-blue-600 rounded-full" /> Desktop
    <span className="inline-block w-3 h-3 bg-sky-400 rounded-full ml-2" /> Mobile
  </div>
}

export const ChartTooltip: React.FC<{ content: React.ReactNode }> = ({ content }) => {
  return <div className="shadow-lg p-2 bg-white rounded">{content}</div>
}

export const ChartTooltipContent: React.FC = () => {
  return <div className="text-sm">Détails du point survolé</div>
}

// ✅ Données et configuration
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
}

// ✅ Composant principal exporté
export const Component: React.FC = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
          <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
