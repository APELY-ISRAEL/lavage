import React from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  value?: number | string;
  type?: "collected" | "pending" | "invoices" | "customers" | ""; // pour couleurs
  loading?: boolean; // true → skeleton
}

export const Card: React.FC<CardProps> = ({ title, value, type = "", loading = false }) => {
  // Skeleton
  if (loading) {
    return (
      <div
        className="animate-pulse bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center my-3"
        style={{ minHeight: "180px" }}
      >
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" /> {/* titre */}
        <div className="h-12 w-3/4 bg-gray-200 rounded" /> {/* valeur */}
      </div>
    );
  }

  // Couleurs par type
  const colorClass = clsx({
    "bg-white text-primary-75": type === "collected",
    "bg-gray-50 text-yellow-700": type === "pending",
    "bg-muted text-blue-700": type === "invoices",
    "bg-purple-50 text-purple-700": type === "customers",
    "bg-white text-gray-800": type === "",
  });

  return (
    <div
      className={clsx(
        "rounded-xl shadow-lg p-6 flex flex-col items-center justify-center my-3 transition-transform transform hover:scale-105",
        colorClass
      )}
      style={{ minHeight: "180px" }}
    >
      <h2 className="text-sm font-semibold text-gray-600">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value ?? "-"}</p>
    </div>
  );
};
