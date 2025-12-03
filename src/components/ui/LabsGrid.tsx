// components/LabsGrid.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LabsGrid({ labs }: { labs: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {labs.map((lab) => (
        <motion.article
          key={lab.id}
          whileHover={{ scale: 1.02 }}
          className="bg-white/90 dark:bg-slate-800 rounded-lg overflow-hidden shadow"
        >
          <div className="h-44 relative">
            {lab.img ? (
              <Image
                src={lab.img}
                alt={lab.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-slate-200 h-full" />
            )}
          </div>
          <div className="p-4">
            <h5 className="font-semibold text-lg">{lab.title}</h5>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              {lab.desc}
            </p>
            <div className="mt-4">
              <a
                href="#"
                className="text-sm font-medium underline"
                aria-label={`Learn more about ${lab.title}`}
              >
                Learn more
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
