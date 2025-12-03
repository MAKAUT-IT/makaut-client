// app/about/page.tsx
import { departmentInfo } from "@/lib/department";
import AboutHero from "@/components/ui/AboutHero";
import StatsGrid from "@/components/ui/StatsGrid";
import VisionMission from "@/components/ui/VisionMission";
import LabsGrid from "@/components/ui/LabsGrid";
import Accreditation from "@/components/ui/Accreditation";

export const metadata = {
  title: `${departmentInfo.name} — About`,
  description: departmentInfo.short
};

export default function AboutPage() {
  const dept = departmentInfo;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <AboutHero
        title={dept.name}
        subtitle={dept.short}
        image={dept.heroImage}
      />

      <section aria-labelledby="vision-mission" className="mt-12">
        <VisionMission vision={dept.vision} mission={dept.mission} />
      </section>

      <section aria-labelledby="statistics" className="mt-10">
        <h2 id="statistics" className="sr-only">
          Department statistics
        </h2>
        <StatsGrid stats={dept.stats} />
      </section>

      <section aria-labelledby="labs" className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Labs & Research Facilities</h2>
        <LabsGrid labs={dept.labs} />
      </section>

      <section aria-labelledby="accreditation" className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Accreditations</h2>
        <Accreditation items={dept.accreditation} />
      </section>
    </main>
  );
}
