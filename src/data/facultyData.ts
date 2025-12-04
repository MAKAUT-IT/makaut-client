// Faculty data type
export interface Faculty {
    id: string;
    name: string;
    designation: string;
    photo: string;
    department: string;
    email: string;
    email2?: string;
    areasOfInterest: string[];
    about: string;
    education: {
        degree: string;
        institution: string;
        year: string;
    }[];
    achievements: string[];
    publications: {
        title: string;
        journal: string;
        year: string;
        link?: string;
    }[];
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        googleScholar?: string;
    };
}

// All faculty data
export const facultyData: Faculty[] = [
    {
        id: 'nabarun-bhattacharyya',
        name: 'Prof. Nabarun Bhattacharyya',
        designation: 'Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/2.jpg',
        department: 'Department of Information Technology',
        email: 'nabarun.bhattacharyya@makautwb.ac.in',
        areasOfInterest: [],
        about: 'Prof. Nabarun Bhattacharyya is a distinguished professor with extensive experience in teaching and research.',
        education: [
            
        ],
        achievements: [
            
        ],
        publications: [
            
        ],
        socialLinks: {
            googleScholar: '#',
            linkedin: '#',
        },
    },
    {
        id: 'debasis-giri',
        name: 'Dr. Debasis Giri',
        designation: 'Associate Professor & HoD',
        photo: 'https://it.makautwb.ac.in/images/faculty/4.jpg',
        department: 'Department of Information Technology',
        email: 'debasis.giri@makautwb.ac.in',
        areasOfInterest: ['Cryptography', ' E-commerce security', 'Information Security','Design & Analysis of Algorithms'],
        about: 'Dr. Debasis Giri is currently working as an Associate Professor in the Department of Information Technology, Maulana Abul Kalam Azad University of Technology (Formerly known as West Bengal University of Technology), West Bengal, India. Prior to this, he also held academic positions as Professor in the Department of Computer Science and Engineering and Dean in the School of Electronics, Computer Science and Informatics, Haldia Institute of Technology, Haldia, India. He did his masters (M.Tech and M.Sc) both from IIT Kharagpur, India, and also completed his Ph.D from IIT Kharagpur, India. He is ten-th all India rank holder in Graduate Aptitude Test in Engineering (GATE) in 1999. He received a certificate from All India Science Teachers’ Association in Science Aptitude & Talent Search Test in 1988. He received Chester W Sall Memorial Awards with 2nd place for the paper titled on “Real-Time Speech Emotion Analysis for Smart home assistants” in the 2023 IEEE International Conference on Consumer Electronics (ICCE2023).His current research interests include Cryptography, Information Security, Cybersecurity, Blockchain, E-commerce security, AI/ML and Design & Analysis of Algorithms. He has authored more than 150 research papers in reputed international journals and conference proceedings. He is serving as Associate Editorial of 6 international Journals. Dr. Giri has been involved as Technical Program Committee members of several international conferences in repute. He is the founder of the International Conference on Mathematics and Computing. He has organized many events like, Workshop, Seminar, FDP and International conferences. He is also program committee member of several international conferences. He has served as a General chairs/Program Chairs/Organizing Chairs of several International conferences and he is a author of more than 20 edited books/conference proceedings. He is a member of IEEE, and a life member of Cryptology Research Society of India, and the International Society for Analysis, its Applications and Computation (ISAAC).',
        education: [
            { degree: 'Ph.D. in Computer Science ', institution: 'IIT Kharagpur', year: '' },
          
        ],
        achievements: [
            'He is ten-th all India rank holder in Graduate Aptitude Test in Engineering (GATE) in 1999',
        ],
        publications: [
            
        ],
        socialLinks: {
            googleScholar: 'https://scholar.google.co.in/citations?user=iRpPSjEAAAAJ&hl=en',
            linkedin: '#',
        },
    },
    {
        id: 'somdatta-chakravortty',
        name: 'Dr. Somdatta Chakravortty',
        designation: 'Associate Professor & HoD(GI)',
        photo: 'https://it.makautwb.ac.in/images/faculty/1.jpg',
        department: 'Department of Information Technology',
        email: 'somdatta.chakravortty@makautwb.ac.in',
        areasOfInterest: ['Hypersprectral remote sensing', 'Machine Learning', 'Image processing'],
        about: 'Dr. Somdatta Chakravortty is an Associate Professor in the Department of Information Technology at Maulana Abul Kalam Azad University of Technology, West Bengal, where she joined on 01st September 2018 under a regular appointment. She has rich professional experience spanning both academia and industry. Before joining MAKAUT, she served as Assistant Professor at the Government College of Engineering & Ceramic Technology, Kolkata (2008–2018), Lecturer at Heritage Institute of Technology, Anandapur (2006–2008), Lecturer at MCKV Institute of Engineering, Howrah (2004–2006), and Lecturer at Dr. B.C. Roy Engineering College, Durgapur (2003–2004). Her career began in industry, where she worked as an Assistant Engineer at Consulting Engineering Services (India) Limited, Kolkata from 1997 to 2000. She is an active member of several esteemed professional societies including IEEE Membership in Professional Societies, Indian Society of Remote Sensing, Institution of Engineers, Computer Society of India, and Association of Engineers. Her academic interests and expertise include Hypersprectral remote sensing, Machine learning,Image processing.',
        education: [
            { degree: 'Ph.D ', institution: 'Calcutta University', year: '' },
            { degree: 'M.Tech ', institution: 'Bengal Engineering and Science University', year: '' },
            { degree: 'B.Tech', institution: 'Kanpur University', year: '' },
        ],
        achievements: [
            
        ],
        publications: [
            
        ],
        socialLinks: {
            googleScholar: 'https://scholar.google.com/citations?user=IXPRmUcAAAAJ&hl=en',
        },
    },
    {
        id: 'dipanwita-ghosh',
        name: 'Dr. Dipanwita Ghosh',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/8.jpg',
        department: 'Department of Information Technology',
        email: 'ghosh.dipanwita90@gmail.com',
        areasOfInterest: ['Artificial Intellegence', 'Machine Learning', 'Satellite Image Processing'],
        about: 'Ms. Dipanwita Ghosh is a faculty in the department of Information Technology at Maulana Abul Kalam Azad University of Technology,West Bengal. Currently she is pursuing Ph.D from department of Computer Science of MAKAUT,WB formerly known as WBUT,WB. She had worked as guest lecturer(Department of Information Technology) in Government College Of Engineering & Ceramic Technology, Kolkata, West Bengal. She was also worked as a Research Scholar in DST major research project and UGC Major Research Project. Ms. Dipanwita Ghosh has completed his M.Tech in Computer Science & Engineering from West Bengal University of Technology and B.Tech in Information Technology in Government College of Engineering & Ceramic Technology.',
        education: [
            { degree: 'M.Tech', institution: 'Maulana Abul Kalam Azad University of Technology', year: '' },
            
        ],
        achievements: [
           
        ],
        publications: [
           
        ],
         socialLinks: {
            googleScholar: 'https://scholar.google.com/citations?user=MZwJGXAAAAAJ&hl=en&oi=ao',
        },
    },
    {
        id: 'jadav-chandra-das',
        name: 'Dr. Jadav Chandra Das',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/3.jpg',
        department: 'Department of Information Technology',
        email: ' jadavchandra.das@makautwb.ac.in',
        areasOfInterest: ['Nano Communication', 'Quantum Dot-Cellular Automata','IoT',],
        about: 'JADAV CHANDRA DAS received Ph.D degree in Computer Science and Engineering (Nanotechnology) from West Bengal University of Technology, West Bengal, India, in 2019. He also received M. Tech degree in Multimedia and Software Systems from West Bengal University of Technology, West Bengal, India, in 2011. Presently he is an Assistant Professor in the department of Information Technology, MAKAUT,WB, NH-12 (Old NH-34) Simhat, Haringhata, Nadia 741249, West Bengal. Previously he was associated with the Department of CSE, UEM, Kolkata, and SVIST, Sonarpur, Kolkata. He has more than 12 years of teaching experiences and has 8 years of research experience during which he has published 57 research papers in peer-reviewed journal and conferences. He has more than 35 SCI journal publications. He received many prestigious honours for best paper publication in SCI journal and conferences. He has good scholarly records. He received IET Premium Award for best journal paper in IET Circuits Devices & Systems journal in 2018 and J. C. Bose Memorial Award for best journal paper in IETE journal of Research in 2016. His research interest includes Cryptography, Steganography, QCA based Image Processing, reversible logic design with QCA, Nanocommunication network design, IoT and Quantum computing.',
        education: [
            { degree: 'Ph.D ', institution: 'Maulana Abul Kalam Azad University of Technology ', year: '' },
            
        ],
        achievements: [
             'IET Premium Awards 2018 for best journal paper in IET Circuits, Devices & Systems, 2018.',
         'One of the 50 highlighted papers published in FITEE during 2016-2017.',
        'Certificate of Outstanding     Contribution in Reviewing, Microprocessors and Microsystems, 2018.',
    'J. C. Bose Memorial award for best journal paper in IETE Journal of Research, 2016.',
    'Best paper award in MICRO-2016, Int. Conference held at Kolkata, 2016.',
    'Second Best paper award in NanoBioCon-2016, Int. Conference held at MAKAUT, 2016.',
    'Best poster presentation award in NanoBioCon-2016, Int. Conference held at MAKAUT, 2016.',
    'Session Best paper award in MICRO-2016, Int. Conference held at Kolkata, 2016.',
    'Certificate of Merit for excellent out comes in education by Sonarpur Education Trust, Rajpur, 24pgs(s), West Bengal, India.',
        ],
        publications: [
            
        ],
        socialLinks: {
            googleScholar: 'https://scholar.google.co.in/citations?user=43nFahkAAAAJ&hl=en',
        },
    },
    {
        id: 'kamarujjaman',
        name: 'Dr. Kamarujjaman',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/13.jpg',
        department: 'Department of Information Technology',
        email: 'skmasum000@gmail.com',
        areasOfInterest: ['Medical Image Processing',
  'Machine Learning',
  'Soft Computing',
  'Signal & Image Processing',
  'FPGA-based Implementation',
  'Bio-informatics'],
        about: 'Dr. Kamarujjaman is currently serving as an Assistant Professor in the Department of Information Technology at Maulana Abul Kalam Azad University of Technology, West Bengal, since 4th January 2022. Prior to joining MAKAUT, he worked as an Assistant Professor at Techno India University, West Bengal, and also served as a Visiting Faculty at the Government College of Engineering and Ceramic Technology, Kolkata, as well as RCC Institute of Information Technology, Kolkata. He has been awarded a Ph.D. in Computer Science and Engineering and has completed his B.Tech. in Computer Science and Engineering and M.Tech. in Information Technology from Maulana Abul Kalam Azad University of Technology (formerly West Bengal University of Technology, Kolkata). He qualified GATE in 2012 and has been actively contributing to research as a Technical Program Committee member and reviewer for multiple international journals and conferences. He is a member of several reputed research and professional bodies including IEEE (since 2019), IEEE Computer Society, IEEE Young Professionals, IEEE Biometrics Council, IEEE Council on Electronic Design Automation, IEEE Council on RFID, IEEE Council on Superconductivity, IEEE Nanotechnology Council, IEEE Sensors Council, and IEEE Systems Council.',
        education: [
            { degree: 'Ph.D ', institution: 'Maulana Abul Kalam Azad University of Technology', year: '' },
            
        ],
        achievements: [
            'Maulana Azad National Fellowship for Ph.D. (2015- 2019), MoMA & UGC, Govt. of India.',
            'Silver Medal for being 2 nd in M. Tech.',
            'GATE Scholarship (2012-14) for M.Tech, AICTE, Govt. of India.',
            ' MCM Scholarship (2008-2012) for B.Tech, Ministry of Minority Affairs, Govt. of West Bengal.',
        ],
        publications: [
           
        ],
        socialLinks: {
            googleScholar: 'https://scholar.google.com/citations?hl=en&user=29l4pd8AAAAJ',
        },

    },
    {
        id: 'nabanita-ganguly',
        name: 'Dr. Nabanita Ganguly',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/15.jpg',
        department: 'Department of Information Technology',
        email: 'nabanita.ganguly@makautwb.ac.in',
        areasOfInterest: ['Information Security', ],
        about: 'Dr. Nabanita Ganguly has received Ph.D. degree in Computer Science and Engineering Department from Jadavpur University. She is currently working as an Assistant Professor in the department of Information Technology at Maulana Abul Kalam Azad University of Technology (MAKAUT). She has served as Assistant Professor in different colleges under MAKAUT (formally known as West Bengal University of Technology). She has delivered lectures at Jadavpur University and Indian Association for Cultivation of Science for the past few years. She has been teaching experience for more than 9 years in totality. She has published many reputed SCI/SCI(E) indexed international journals and conferences.',
        education: [
            { degree: 'Ph.D ', institution: 'Jadavpur University', year: '' },
            
        ],
        achievements: [
            
        ],
        publications: [
            
        ],
        socialLinks: {
            googleScholar: 'https://scholar.google.com/citations?user=WSNAbv4AAAAJ&hl=en&authuser=1',
        },
    },
    {
        id: 'sayantani-saha',
        name: 'Dr. Sayantani Saha',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/6.jpg',
        department: 'Department of Information Technology',
        email: 'sayantani.saha@makautwb.ac.in',
        areasOfInterest: ['Data security','access control', 'mobility management','Wireless Sensor Network',],
        about: 'Mrs. Sayantani Saha has joined as an Assistant Professor in Department of Computer Science and Engineering, Maulana Abul Kalam Azad University of Technology formally known as West Bengal University of technology (WBUT), India in 2018. She is currently perusing PhD degree in Computer Science & Engineering Department from Jadavpur University. She has completed her BTech in Information Technology from RCCIIT in 2008 and MTech degree in Distributed and Mobile Computing from Jadavpur University in 2010. She has nearly two years of industry experience, four years of research experience and around five years of teaching experience. She has worked as a programmer Analyst in Cognizant Technology Solutions Pvt Ltd. From 2010 to 2012. After that, she joined Jadavpur University as a research scholar. She was associated with “Remote Health: A Framework for Health-care Services using Mobile and Sensor-Cloud Technologies” project funded by ITRA, MHRD. Previously she was an assistant Professor at B.P.Poddar Institute of Management & Technology. She has published her research work in several international conferences and journal. Her area of research interest is in data security, access control, mobility management, Wireless Sensor Network etc.',
        education: [
            { degree: 'M.Tech', institution: 'University of Calcutta', year: '' },
            
        ],
        achievements: [
            
        ],
        publications: [
            
        ],
        socialLinks: {
            googleScholar: 'https://scholar.google.com/citations?user=kNczl0wAAAAJ&hl=en&oi=ao',
        },
    },
    {
        id: 'joy-samadder',
        name: 'Mr. Joy Samadder',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/5.jpg',
        department: 'Department of Information Technology',
        email: ' joy.samadder@makautwb.ac.in',
        areasOfInterest: ['IoT','Cloud Computing','Information Security',],
        about: 'Mr. Joy Samadder is a highly accomplished academic professional and a certified Microsoft Innovative Educator, with over eight years of experience in teaching and research. He currently serves as an Assistant Professor in the Department of Information Technology at Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal. In addition to his teaching role, he is the Training and Placement In-Charge at the university and holds the distinction of being a certified Advanced Level Innovation Ambassador, recognized by the Ministry of Education Innovation Cell and AICTE. Previously, Mr. Samadder served as an Assistant Professor in the Department of Computer Science & Engineering at Brainware University, Kolkata. He was also associated with MAKAUT as a TEQIP Project Assistant and contributed as a guest lecturer. Mr. Samadder holds both M.Tech and B.Tech degrees in Information Technology from West Bengal University of Technology (now MAKAUT), reflecting his strong academic background and dedication to IT education. Notably, he served as a mentor for the winning team in the Smart India Hackathon 2019, showcasing his commitment to fostering innovation among students. An active researcher, Mr. Samadder has published numerous articles in esteemed international and national journals and conferences. His research interests include the Internet of Things, Cybersecurity, Machine Learning, and Edge Computing. Furthermore, he serves as a reviewer for several prestigious journals, contributing to the advancement of knowledge in his field.',
        education: [
            { degree: 'M.Tech ', institution: 'Maulana Abul Kalam Azad University of Technology', year: '' },
            
        ],
        achievements: [
            'Mentor of SIH2019 Software Edition Winning Team',
            'He has UK design Patent on AI-BASED SOLAR POWERED AGRICULTURE ROBOT(Design number: 6384111)',
        ],
        publications: [],
        socialLinks: {
            googleScholar: 'https://scholar.google.co.in/citations?hl=en&user=CzKoMzcAAAAJ',
        },
    },
    {
        id: 'sayan-kumar-roy',
        name: 'Mr. Sayan Kumar Roy',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/31.jpg',
        department: 'Department of Information Technology',
        email: 'sayankumar.roy@makautwb.ac.in',
        areasOfInterest: ['Internet of Things',],
        about: 'Sayan Kumar Roy has joined as a faculty in the Department of Information Technology, Maulana Abul Kalam Azad University of Technology, WB formally known as West Bengal University of Technology (WBUT), India in 2019. He has completed his MCA degree from Maulana Abul Kalam Azad University of Technology, WB in 2015 and M.Tech. degree in Information Technology from Maulana Abul Kalam Azad University of Technology, WB in 2017. He has published his research work in several national and international conferences, as well as in international journals. He has a UK design patent on 5G-BASED AI ROBOT FOR FRUIT HARVESTING (Design Number: 6391275) and has published two books named EDGE COMPUTING FOR IOT ARCHITECTURES, USE CASES, AND INNOVATIONS (ISBN: 978-81-984249-6-9) and THE TOLD AND UNTOLD STORIES OF DATABASE MANAGEMENT SYSTEM (ISBN: 9789348492890).',
        education: [
            { degree: 'M.Tech ', institution: 'Maulana Abul Kalam Azad University of Technology', year: '' },
            
        ],
        achievements: [
            'He has a UK design patent on 5G-BASED AI ROBOT FOR FRUIT HARVESTING (Design Number: 6391275).',
            'He has published two books named EDGE COMPUTING FOR IOT ARCHITECTURES, USE CASES, AND INNOVATIONS (ISBN: 978-81-984249-6-9) and THE TOLD AND UNTOLD STORIES OF DATABASE MANAGEMENT SYSTEM (ISBN: 9789348492890).',
        ],
        publications: [],
        socialLinks: {
            googleScholar: 'https://scholar.google.com/citations?user=sUseJKUAAAAJ&hl=en%E2%80%9D%20target=%E2%80%9D_blank',
        },
    },
    {
        id: 'kamalika-bhattacharjya',
        name: 'Ms. Kamalika Bhattacharjya',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/9.jpg',
        department: 'Department of Information Technology',
        email: 'b.kamalika01@gmail.com',
        areasOfInterest: ['Wireless Sensor Network (WSN)','Internet of Things (IoT)','Wireless Sensor Underwater Network (UWSN)','Internet of Underwater Things (IoUT)','Cloud Computing',' Edge Computing',],
        about: 'Kamalika Bhattacharjya has joined as a faculty in the Department of Information Technology, Maulana Abul Kalam Azad University of Technology, WB formally known as West Bengal University of Technology (WBUT), India in 2019. She has completed her B.Tech. degree in Computer Science & Engineering from Maulana Abul Kalam Azad University of Technology, WB in 2016 and M.Tech. degree in Computer Science & Engineering from Maulana Abul Kalam Azad University of Technology, WB in 2018. She has assured 2nd Rank in Computer Science and Engineering in M.Tech (In-house). She has published her research work in several national conferences, international conferences, and international journals. She is a reviewer of IGI Global Publication. She has qualified UGC-NET in 2019 and WBSET in 2020. She has received the ‘Outstanding Paper Award’ in 4rd Regional Science and Technology Congress (Southern Region) organized by West Bengal State Council of Science and Technology, 2019.',
        education: [
            { degree: 'M.Tech ', institution: 'Maulana Abul Kalam Azad University of Technology', year: '' },
            
        ],
        achievements: [
            '2nd Rank in Computer Science and Engineering in the in-house (Maulana Abul Kalam Azad University of Technology).',
            'Qualify NET 2019.',
            'Qualify WBSET 2019',
            'Outstanding paper award in 4rd Regional Science and Technology Congress (Southern Region) organised by West Bengal State Council of Science and Technology, 2019.',
        ],
        publications: [],
        socialLinks: {
            googleScholar: 'https://scholar.google.com/citations?user=Ri7Eqq4AAAAJ&hl=en',
        },
    },
    {
        id: 'sayani-manna',
        name: 'Ms. Sayani Manna',
        designation: 'Assistant Professor',
        photo: 'https://it.makautwb.ac.in/images/faculty/17.jpg',
        department: 'Department of Information Technology',
        email: 'sayaniresearch2018@gmail.com',
        areasOfInterest: ['Digital Image Processing', 'Machine Learning', ],
        about: 'Ms. Sayani Manna is a faculty in the department of Information Technology at Maulana Abul Kalam Azad University of Technology, West Bengal. She has an experience of 6.5 years in academics. She has worked as Assistant Professor in Department of Computer Science & Engineering at Brainware University, Kolkata, West Bengal. She has also worked as Lecturer in Department of Computer Science & Engineering at RCC Institute of Information Technology, Beleghata, Kolkata, West Bengal. She was associated with RCC Institute of Information Technology, Beleghata, Kolkata, West Bengal as TEQIP Teaching Assistant. Ms. Sayani Manna completed her M.Tech and B.Tech in Computer Science & Engineering from West Bengal University of Technology and is presently continuing PhD at CSIR-CMERI.',
        education: [
            { degree: 'M.Tech', institution: 'West Bengal University of Technology ', year: '' },
            
        ],
        achievements: [
            
        ],
        publications: [],
        socialLinks: {
            googleScholar: 'https://scholar.google.com/citations?user=Ga_bY8oAAAAJ&hl=en&oi=ao',
        },
    },
];

// Helper function to get initials
export const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

