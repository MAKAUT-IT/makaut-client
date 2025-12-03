// src/lib/department.ts

export const departmentInfo = {
  name: "B.Tech — Information Technology Department",

  short:
    "A leading IT department focused on innovation, research, software development, AI, and modern computing.",

  // ⭐ Hero Image (Banner)
  heroImage:
    "https://res.cloudinary.com/dyo7pelfy/image/upload/v1764702811/main_pic_makaut_nfnrzv.jpg",

  // ⭐ Vision
  vision:
    "To empower students with cutting-edge knowledge in Information Technology, fostering innovation, research, and leadership for a technologically advanced society.",

  // ⭐ Mission
  mission: [
    "To provide high-quality technical education through modern curriculum and advanced laboratory infrastructure.",
    "To promote research, innovation, and industry collaboration for real-world skill development.",
    "To nurture ethical values, teamwork, and lifelong learning among students.",
  ],

  // ⭐ Statistics (optional but looks very professional)
  stats: [
    { label: "Students", value: "1200+" },
    { label: "Faculty Members", value: 25 },
    { label: "Annual Publications", value: 80 },
    { label: "Placement Record", value: "92%" },
  ],

  // ⭐ LABS — Your Final Cloudinary Images Inserted
  labs: [
    {
      id: "lab1",
      title: "Advanced Computing Lab",
      desc: "High-performance computers, development tools, and modern learning setup for programming and software development.",
      img: "https://res.cloudinary.com/dyo7pelfy/image/upload/v1764766577/WhatsApp_Image_2025-12-03_at_18.24.18_063ce0fb_xs2fnd.jpg",
    },
    {
      id: "lab2",
      title: "AI & ML Research Lab",
      desc: "A dedicated lab for machine learning, AI training, research experiments, and model development.",
      img: "https://res.cloudinary.com/dyo7pelfy/image/upload/v1764766576/WhatsApp_Image_2025-12-03_at_18.24.19_dd0b2e6c_h6misb.jpg",
    },
    {
      id: "lab3",
      title: "Innovation & Project Lab",
      desc: "A creative workspace for students to build prototypes, IoT models, robotics ideas, and major project innovations.",
      img: "https://res.cloudinary.com/dyo7pelfy/image/upload/v1764702811/main_pic_makaut_nfnrzv.jpg",
    },
  ],

  // ⭐ Accreditation
  accreditation: [
    {
      body: "NBA Accredited",
      details: "The B.Tech IT Programme is accredited under the National Board of Accreditation (NBA).",
      logo: "/about/nba.png", // you can replace with Cloudinary if needed
    },
    {
      body: "NAAC Accreditation",
      details: "The institution is accredited with NAAC Grade A.",
      logo: "/about/naac.png",
    },
  ],
};
