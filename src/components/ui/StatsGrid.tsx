// components/StatsGrid.tsx
"use client";
import { motion } from "framer-motion";

type Stat = { label: string; value: string | number };

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s, idx) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          className="bg-white/80 dark:bg-slate-800 p-4 rounded-lg shadow-sm text-center"
          role="article"
          aria-labelledby={`stat-${idx}`}
        >
          <div id={`stat-${idx}`} className="text-2xl font-bold">
            {s.value}
          </div>
          <div className="mt-1 text-sm text-slate-600">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
