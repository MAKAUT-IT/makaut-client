import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top header */}
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <img src="/utech-hero.png" alt="University" className="h-12 w-auto hidden sm:block" />
          <div>
            <h1 className="text-lg font-bold">Maulana Abul Kalam Azad University of Technology</h1>
            <p className="text-sm text-gray-600">Main Campus: Simhat, Haringhata, Nadia, West Bengal</p>
          </div>
        </div>

        <div>
          <Button onClick={() => navigate('/login')} className="bg-blue-600 text-white">
            Login
          </Button>
        </div>
      </header>

      {/* Hero image */}
      <div className="w-full">
        <img
          src="/utech-hero.png"
          alt="Campus"
          className="w-full object-cover max-h-64 sm:max-h-96"
        />
      </div>

      {/* Three cards row (Notices area clickable) */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            className="p-6 border rounded-lg hover:shadow-lg cursor-pointer bg-white"
            onClick={() => navigate('/members')}
            role="button"
          >
            <h3 className="text-2xl font-semibold mb-2">MEMBER'S AREA</h3>
            <p className="text-gray-600">Click to Visit</p>
          </div>

          <div
            className="p-6 border rounded-lg hover:shadow-lg cursor-pointer bg-white"
            onClick={() => navigate('/announcements')} // <-- redirect to announcements
            role="button"
          >
            <h3 className="text-2xl font-semibold mb-2">LETTERS & NOTICES</h3>
            <p className="text-gray-600">Click to Visit</p>
          </div>

          <div
            className="p-6 border rounded-lg hover:shadow-lg cursor-pointer bg-white"
            onClick={() => navigate('/announcements')} // also redirect
            role="button"
          >
            <h3 className="text-2xl font-semibold mb-2">APPLICATION & NOTICE</h3>
            <p className="text-gray-600">Click to Visit</p>
          </div>
        </div>
      </section>

      {/* General tiles + Announcements preview */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-sky-50 p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-4">GENERAL</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded text-center">
                <div className="font-semibold mb-2">TRANSCRIPT / DUPLICATE GRADE CARD</div>
                <Button onClick={() => navigate('/apply')} className="mt-2">Apply Now</Button>
              </div>

              <div className="p-4 border rounded text-center">
                <div className="font-semibold mb-2">NEW SYLLABUS</div>
                <Button onClick={() => navigate('/syllabus')} className="mt-2">Click to Visit</Button>
              </div>

              <div className="p-4 border rounded text-center">
                <div className="font-semibold mb-2">TEACHER APPOINTMENT</div>
                <Button onClick={() => navigate('/appointments')} className="mt-2">Click to Visit</Button>
              </div>

              <div className="p-4 border rounded text-center">
                <div className="font-semibold mb-2">VERIFICATION OF ACADEMIC CREDENTIALS</div>
                <Button onClick={() => navigate('/verification')} className="mt-2">Apply Now</Button>
              </div>
            </div>
          </div>

          {/* Announcements column */}
          <div className="col-span-2 bg-slate-50 p-6 rounded-lg">
            <h4 className="text-2xl font-semibold mb-3">LATEST ANNOUNCEMENT</h4>
            <div className="h-56 overflow-y-auto pr-2">
              {/* Sample static items — real list will be on /announcements page */}
              <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700">
                <li>14-11-2025 - Distribution of Grade Cards of Supplementary Examination and Updates of 2024-25</li>
                <li>06-11-2025 - Notification on Form fill-up for Regular & Backlog Students for Odd Semester Examinations 2025-26</li>
                <li>14-10-2025 - Notice for Back Paper Enrollment</li>
              </ul>
            </div>
            <div className="mt-4">
              <Button onClick={() => navigate('/announcements')}>View all announcements</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto">
        <div className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <h5 className="font-bold">Maulana Abul Kalam Azad University of Technology</h5>
              <p className="text-sm">NH-12 (Old NH-34) Simhat, Haringhata, Nadia, Pin - 741249, West Bengal</p>
            </div>

            <div>
              <h5 className="font-semibold">Contact</h5>
              <p className="text-sm">Email: controller_exam@utechwb.ac.in</p>
              <p className="text-sm">Phone: +91 33 1234 5678</p>
            </div>

            <div>
              <h5 className="font-semibold">Quick Links</h5>
              <div className="flex flex-col">
                <Button variant="ghost" onClick={() => navigate('/about')}>About</Button>
                <Button variant="ghost" onClick={() => navigate('/contact')}>Contact</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
