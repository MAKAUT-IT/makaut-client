import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import api from '../lib/api';

interface Announcement {
  _id: string;
  title: string;
  createdAt: string;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await api.get('/announcements');
        setAnnouncements(response.data.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Header - Blue gradient bar */}
      <div className="bg-gradient-to-r from-[#0066a1] to-[#004d7a] text-white text-xs py-1 px-4">
        <div className="container mx-auto flex justify-between">
          <span>Welcome to MAKAUT Portal</span>
          <span>ISO 9001:2015 Certified</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b-4 border-[#f5a623]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/makaut-logos.png" alt="MAKAUT Logo" className="h-16 w-auto"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div>
              <p className="text-xs text-gray-500 italic">formerly known as</p>
              <h1 className="text-lg md:text-xl font-bold text-[#0066a1]">
                Maulana Abul Kalam Azad University of Technology, West Bengal
              </h1>
              <p className="text-sm text-[#f5a623] font-medium">West Bengal University of Technology</p>
            </div>
          </div>
          <Button
            onClick={() => navigate('/login')}
            className="bg-[#0066a1] hover:bg-[#004d7a] text-white px-6"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Address Bar */}
      <div className="bg-[#004d7a] text-white text-xs py-2 px-4">
        <div className="container mx-auto">
          <p><strong>Main Campus:</strong> NH-12 (Old NH-34) Simhat, Haringhata, Nadia, Pin - 741249, West Bengal</p>
          <p><strong>City Office / Office of the Controller of Examinations:</strong> BF 142, Sector 1, Salt Lake City, Kolkata - 700064</p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066a1]/80 to-transparent z-10" />
        <img
          src="/makaut-logo.png"
          alt="MAKAUT Campus"
          className="w-full h-48 md:h-72 object-contain"
        />
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20 text-white hidden md:block">
          {/* <p className="text-2xl font-light tracking-widest">MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY</p> */}
        </div>
      </div>

      {/* Three Main Sections */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div
            className="bg-white p-6 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-all"
            onClick={() => navigate('/login')}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">MEMBER'S AREA</h3>
            <p className="text-[#0066a1] text-sm flex items-center gap-1">
              • Click to Visit
            </p>
          </div>

          <div
            className="bg-white p-6 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-all"
            onClick={() => navigate('/login')}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">LETTERS & NOTICES</h3>
            <p className="text-[#0066a1] text-sm flex items-center gap-1">
              • Click to Visit
            </p>
          </div>

          <div
            className="bg-white p-6 cursor-pointer hover:bg-gray-50 transition-all"
            onClick={() => navigate('/login')}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">APPLICATION & NOTICE</h3>
            <p className="text-[#0066a1] text-sm flex items-center gap-1">
              • Click to Visit
            </p>
          </div>
        </div>
      </section>

      {/* General Section + Announcements */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* General Section */}
          <div className="lg:col-span-2 bg-[#e8f4fc] p-6 rounded">
            <h4 className="text-xl font-bold text-[#0066a1] mb-4 border-b-2 border-[#0066a1] pb-2">GENERAL</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="bg-white border-l-4 border-[#17a2b8] p-4">
                <p className="text-sm font-bold text-gray-700 mb-3">TRANSCRIPT/DUPLICATE GRADE CARD</p>
                <Button className="w-full bg-[#17a2b8] hover:bg-[#138496] text-white text-sm">
                  Apply Now
                </Button>
              </div>
              {/* Card 2 */}
              <div className="bg-white border-l-4 border-[#0066a1] p-4">
                <p className="text-sm font-bold text-gray-700 mb-3">NEW SYLLABUS</p>
                <Button className="w-full bg-[#343a40] hover:bg-[#23272b] text-white text-sm">
                  Click to Visit
                </Button>
              </div>
              {/* Card 3 */}
              <div className="bg-white border-l-4 border-[#f5a623] p-4">
                <p className="text-sm font-bold text-gray-700 mb-3">TEACHERS</p>
                <Button className="w-full bg-[#fd7e14] hover:bg-[#e96b02] text-white text-sm">
                  Click to Visit
                </Button>
              </div>
              {/* Card 4 */}
              <div className="bg-white border-l-4 border-[#28a745] p-4">
                <p className="text-sm font-bold text-gray-700 mb-3">ANNOUNCEMENT</p>
                <Button className="w-full bg-[#28a745] hover:bg-[#218838] text-white text-sm">
                  Apply Now
                </Button>
              </div>
              {/* Card 5 */}
              <div className="bg-white border-l-4 border-[#6c757d] p-4">
                <p className="text-sm font-bold text-gray-700 mb-3">NOTICES</p>
                <Button className="w-full bg-[#6c757d] hover:bg-[#5a6268] text-white text-sm">
                  Click to Visit
                </Button>
              </div>
            </div>
          </div>

          {/* Latest Announcements */}
          <div className="bg-white p-6 rounded border">
            <h4 className="text-xl font-bold text-[#0066a1] mb-4 border-b-2 border-[#f5a623] pb-2">
              LATEST ANNOUNCEMENT
            </h4>
            <div className="h-64 overflow-y-auto">
              <ul className="space-y-3 text-sm">
                {announcements.length > 0 ? (
                  announcements.map((ann) => (
                    <li key={ann._id} className="border-b pb-2">
                      <span className="text-gray-500">{formatDate(ann.createdAt)}</span>
                      <span className="mx-1">-</span>
                      <span className="text-gray-700">{ann.title}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="border-b pb-2">
                      <span className="text-gray-500">14-11-2025</span> - Distribution of Grade Cards of Supplementary Examination
                    </li>
                    <li className="border-b pb-2">
                      <span className="text-gray-500">06-11-2025</span> - Notification on Form fill-up for Regular & Backlog Students
                    </li>
                    <li className="border-b pb-2">
                      <span className="text-gray-500">14-10-2025</span> - Notice for Back Paper Enrollment
                    </li>
                  </>
                )}
              </ul>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 border-[#0066a1] text-[#0066a1] hover:bg-[#0066a1] hover:text-white"
              onClick={() => navigate('/login')}
            >
              View All Announcements
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* University Info */}
            <div>
              <h5 className="font-bold text-lg mb-3 text-[#f5a623]">MAKAUT, WB</h5>
              <p className="text-sm text-gray-300">
                Maulana Abul Kalam Azad University of Technology, West Bengal
              </p>
              <p className="text-sm text-gray-400 mt-2">
                NH-12 (Old NH-34) Simhat, Haringhata, Nadia, Pin - 741249, West Bengal
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="font-bold text-lg mb-3 text-[#f5a623]">Contact Us</h5>
              <p className="text-sm text-gray-300">Email: controller_exam@makautwb.ac.in</p>
              <p className="text-sm text-gray-300 mt-1">Phone: +91 33 2334 5678</p>
              <p className="text-sm text-gray-300 mt-1">Fax: +91 33 2334 5679</p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-bold text-lg mb-3 text-[#f5a623]">Quick Links</h5>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-sm text-gray-300 hover:text-[#f5a623] text-left transition-colors"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm text-gray-300 hover:text-[#f5a623] text-left transition-colors"
                >
                  Student Portal
                </button>
                <a
                  href="https://makautwb.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-[#f5a623] transition-colors"
                >
                  University Main Website
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-6 pt-4 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} MAKAUT, WB. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
