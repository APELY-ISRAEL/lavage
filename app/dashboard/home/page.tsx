'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Pie, PieChart, Cell } from "recharts";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    collected: 0,
    pending: 0,
    invoices: 0,
    customers: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        collected: 1200,
        pending: 300,
        invoices: 42,
        customers: 25,
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig: ChartConfig = {
    desktop: { label: "Desktop", color: "#2563eb" },
    mobile: { label: "Mobile", color: "#60a5fa" },
  };

  const pieData = [
    { name: "Collected", value: data.collected },
    { name: "Pending", value: data.pending },
    { name: "Invoices", value: data.invoices },
    { name: "Customers", value: data.customers },
  ];

  const pieColors = ["#10b981", "#facc15", "#3b82f6", "#8b5cf6"];

  return (
    <>
      {/* Titre */}
      <div className="text-xl font-bold mb-4">Dashboard</div>

      <div className="space-y-6">
        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-[120px]" />
              ))
            : <>
                <Card title="Collected" value={data.collected} type="collected" />
                <Card title="Pending" value={data.pending} type="pending" />
                <Card title="Total Invoices" value={data.invoices} type="invoices" />
                <Card title="Total Customers" value={data.customers} type="customers" />
                <Card title="Collected" value={data.collected} type="collected" />
                <Card title="Pending" value={data.pending} type="pending" />
                <Card title="Total Invoices" value={data.invoices} type="invoices" />
                <Card title="Total Customers" value={data.customers} type="customers" />
              </>}
        </div>

        {/* Graphiques */}
        <div className="grid gap-6 lg:grid-cols-2">
          {loading
            ? <>
                <div className="animate-pulse bg-gray-200 h-[300px] rounded-lg" />
                <div className="animate-pulse bg-gray-200 h-[300px] rounded-lg" />
              </>
            : <>
                {/* Bar Chart */}
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickFormatter={(v) => v.slice(0, 3)} />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
                      <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                {/* Pie Chart */}
                <ChartContainer config={chartConfig} className="h-[300px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={100}
                        paddingAngle={5}
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </>}
        </div>
      </div>
    </>
  );
}
