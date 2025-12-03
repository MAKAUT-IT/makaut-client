// components/AboutHero.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
  image?: string;
};

export default function AboutHero({ title, subtitle, image }: Props) {
  return (
    <header className="relative rounded-lg overflow-hidden shadow-md">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent" />
      {image ? (
        <Image
          src={image}
          alt={`${title} hero`}
          width={1600}
          height={400}
          className="w-full h-64 object-cover sm:h-80 md:h-96"
          priority
        />
      ) : (
        <div className="w-full h-64 bg-slate-700" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-6 py-10 sm:px-12 sm:py-16 md:py-20 max-w-4xl"
        style={{ marginTop: "-6rem" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow">
          {title}
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-slate-200 max-w-2xl">
          {subtitle}
        </p>
      </motion.div>
    </header>
  );
}
