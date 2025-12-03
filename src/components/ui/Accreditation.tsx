// components/Accreditation.tsx
"use client";
import Image from "next/image";

export default function Accreditation({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {items.map((it) => (
        <div
          key={it.body}
          className="flex items-center gap-4 p-4 bg-white/90 dark:bg-slate-800 rounded-lg shadow"
        >
          {it.logo ? (
            <div className="w-20 h-20 relative shrink-0">
              <Image src={it.logo} alt={it.body} fill className="object-contain" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-slate-200 rounded" />
          )}
          <div>
            <div className="font-semibold">{it.body}</div>
            <div className="text-sm text-slate-700 dark:text-slate-200">{it.details}</div>
          </div>
        </div>
      ))}
    </div>
  );
}