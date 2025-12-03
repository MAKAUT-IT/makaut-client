// components/VisionMission.tsx
"use client";
import { motion } from "framer-motion";

export default function VisionMission({
  vision,
  mission
}: {
  vision: string;
  mission: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="md:col-span-2 bg-white/90 dark:bg-slate-800 p-6 rounded-lg shadow"
      >
        <h3 className="text-xl font-semibold">Vision</h3>
        <p className="mt-3 text-slate-700 dark:text-slate-200">{vision}</p>

        <h3 className="mt-6 text-xl font-semibold">Mission</h3>
        <ul className="mt-3 list-disc list-inside space-y-2 text-slate-700 dark:text-slate-200">
          {mission.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/80 dark:bg-slate-800 p-6 rounded-lg shadow"
      >
        <h4 className="font-semibold">Quick Facts</h4>
        <dl className="mt-3 text-sm text-slate-700 dark:text-slate-200">
          <dt className="font-medium">Established</dt>
          <dd className="mb-2">2001</dd>

          <dt className="font-medium">Programs</dt>
          <dd className="mb-2">B.Tech (IT), M.Tech (CS)</dd>

          <dt className="font-medium">Contact</dt>
          <dd>it-dept@college.edu</dd>
        </dl>
      </motion.aside>
    </div>
  );
}
