export interface Programme {
  id: string;
  slug: string;
  name: string;
  facultySlug: string;
  facultyName: string;
  level: "Certificate" | "Diploma" | "Undergraduate" | "Postgraduate";
  duration: string;
  campus: "Nairobi" | "Mombasa" | "Both Campuses";
  studyMode: "Full Time" | "Part Time" | "Hybrid / Evening";
  tuitionKES: number;
  entryRequirements: string[];
  careerOutcomes: string[];
  description: string;
  curriculumHighlights: string[];
}

export interface Faculty {
  slug: string;
  name: string;
  shortName: string;
  programmeCount: number;
  deanName: string;
  deanTitle: string;
  deanBio: string;
  photo: string;
  mission: string;
  overview: string;
  departments: string[];
  programmes: Programme[];
}

export interface ResearchCentre {
  slug: string;
  name: string;
  shortName: string;
  focusArea: string;
  leadResearcher: string;
  leadTitle: string;
  publicationsCount: number;
  photo: string;
  description: string;
  strategicGoals: string[];
  currentProjects: {
    title: string;
    grantValue: string;
    partner: string;
    lead: string;
  }[];
  recentPublications: {
    title: string;
    journal: string;
    year: number;
    authors: string;
    doi: string;
  }[];
  partners: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  valueKES: number;
  valueText: string;
  category: "Merit" | "Need-Based" | "STEM" | "Sports & Arts" | "Regional";
  eligibility: string[];
  coverage: string;
  deadline: string; // ISO date
  slots: number;
  description: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  category: "Academic" | "Research" | "Sports" | "Alumni" | "Campus" | "Community";
  publishedAt: string;
  author: string;
  readTime: string;
  summary: string;
  image: string;
  content: string[];
  tags: string[];
}

export interface UniversityEvent {
  slug: string;
  title: string;
  date: string;
  time: string;
  campus: "Nairobi Main Campus" | "Mombasa Coastal Campus" | "Virtual & Hybrid";
  venue: string;
  category: "Academic" | "Open Day" | "Conference" | "Workshop" | "Commencement";
  image: string;
  summary: string;
  description: string;
  speakers: {
    name: string;
    role: string;
    organization: string;
  }[];
  registrationOpen: boolean;
  maxAttendees: number;
  registeredCount: number;
}

export interface AlumniProfile {
  id: string;
  name: string;
  gradYear: number;
  degree: string;
  currentRole: string;
  organization: string;
  image: string;
  quote: string;
}

// 6 Faculties
export const faculties: Faculty[] = [
  {
    slug: "business-and-economics",
    name: "School of Business and Economics",
    shortName: "Business & Economics",
    programmeCount: 16,
    deanName: "Prof. Grace Wanjiku Kariuki",
    deanTitle: "Dean, School of Business & PhD in Applied Economics (Oxford)",
    deanBio: "Prof. Kariuki has over 22 years of academic and consultancy leadership across East Africa, advising the Central Bank of Kenya, AfDB, and the East African Community on trade and monetary policies.",
    photo: "/images/faculties/business.jpg",
    mission: "To cultivate ethical, visionary African business leaders and economic thinkers through transformative experiential learning and high-impact policy research.",
    overview: "The School of Business and Economics is internationally accredited, blending cutting-edge global commerce strategies with deep insights into African frontier markets, enterprise development, and sustainable financial technologies.",
    departments: [
      "Department of Finance & Accounting",
      "Department of Strategic Management & Leadership",
      "Department of Economics & Policy Analysis",
      "Department of Marketing & Supply Chain Management"
    ],
    programmes: [
      {
        id: "bba",
        slug: "bachelor-of-business-administration",
        name: "Bachelor of Business Administration (BBA)",
        facultySlug: "business-and-economics",
        facultyName: "School of Business and Economics",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 145000,
        entryRequirements: [
          "KCSE Mean Grade of C+ (plus) with at least C+ in Mathematics and English",
          "Or GCE A-Levels with 2 Principal passes and 1 Subsidiary pass",
          "Or a recognized Diploma in Business with Distinction or Credit"
        ],
        careerOutcomes: [
          "Financial Analyst & Investment Advisor",
          "Operations & Supply Chain Manager",
          "Corporate Strategy Consultant",
          "Commercial & Retail Banking Executive",
          "Entrepreneurship & Venture Development"
        ],
        description: "A comprehensive undergraduate degree preparing students for decisive executive leadership in local and multinational enterprises across the continent.",
        curriculumHighlights: [
          "Strategic Management & Governance",
          "Corporate Financial Modelling",
          "African Frontier Markets Analysis",
          "Digital Marketing & E-Commerce",
          "Business Analytics with Python"
        ]
      },
      {
        id: "bcom",
        slug: "bachelor-of-commerce",
        name: "Bachelor of Commerce (B.Com - Accounting / Finance / Marketing)",
        facultySlug: "business-and-economics",
        facultyName: "School of Business and Economics",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 140000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with C+ in Mathematics and English / Kiswahili",
          "CPA Section 4 or ACCA Level 2 holders enter into 2nd year"
        ],
        careerOutcomes: [
          "Chartered Public Accountant (CPA/ACCA)",
          "Tax Consultant & Compliance Officer",
          "Risk & Internal Auditor",
          "Portfolio Manager"
        ],
        description: "Accredited by ICPAK and ACCA, offering exemptions and direct tracks to professional certification alongside an honors university degree.",
        curriculumHighlights: [
          "Advanced Financial Accounting",
          "International Taxation & Transfer Pricing",
          "Derivatives & Risk Management",
          "Forensic Accounting & Fraud Auditing"
        ]
      },
      {
        id: "mba",
        slug: "master-of-business-administration",
        name: "Master of Business Administration (MBA - Executive & Regular)",
        facultySlug: "business-and-economics",
        facultyName: "School of Business and Economics",
        level: "Postgraduate",
        duration: "2 Years (4 Semesters / Weekend & Evening)",
        campus: "Both Campuses",
        studyMode: "Hybrid / Evening",
        tuitionKES: 220000,
        entryRequirements: [
          "Bachelor's degree with Upper Second Class Honours from a recognized university",
          "Or Lower Second Class Honours with at least 2 years relevant management experience"
        ],
        careerOutcomes: [
          "Chief Executive Officer / Managing Director",
          "Management Consultant",
          "Director of Business Operations",
          "Private Equity & Venture Capital Principal"
        ],
        description: "An intensive executive degree designed for high-potential managers seeking boardroom acumen, strategic leadership, and regional market mastery.",
        curriculumHighlights: [
          "Executive Global Strategy",
          "Corporate Valuation & Mergers",
          "Disruptive Technology Leadership",
          "Organisational Behaviour & Change"
        ]
      },
      {
        id: "dip-ba",
        slug: "diploma-in-business-management",
        name: "Diploma in Business Management",
        facultySlug: "business-and-economics",
        facultyName: "School of Business and Economics",
        level: "Diploma",
        duration: "2 Years (6 Trimesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 65000,
        entryRequirements: [
          "KCSE Mean Grade of C- (minus) with D+ in Mathematics and English",
          "Or Certificate in Business Studies with Credit pass"
        ],
        careerOutcomes: [
          "Assistant Office Administrator",
          "Sales & Business Development Associate",
          "Accounts Assistant",
          "Direct progression to BBA Year 2"
        ],
        description: "Practical foundational business diploma equipping graduates with immediate workplace competencies and accelerated university progression.",
        curriculumHighlights: [
          "Principles of Management",
          "Business Mathematics & Statistics",
          "Customer Relationship Management",
          "Financial Record Keeping"
        ]
      }
    ]
  },
  {
    slug: "law",
    name: "School of Law",
    shortName: "Law",
    programmeCount: 8,
    deanName: "Hon. Prof. Peter Otieno Omondi",
    deanTitle: "Dean of Law, Senior Counsel & Doctor of Laws (LL.D, Harvard)",
    deanBio: "Senior Counsel Prof. Omondi has argued precedent-setting constitutional and international commercial arbitration cases before the Supreme Court of Kenya and the East African Court of Justice.",
    photo: "/images/faculties/law.jpg",
    mission: "To inspire legal scholarship, champion the rule of law, constitutionalism, and human rights, and produce distinguished advocates with unyielding ethical integrity.",
    overview: "The Zion University School of Law is accredited by the Council of Legal Education (CLE). It features a state-of-the-art moot courtroom, an active Legal Aid Clinic serving underprivileged communities in Nairobi and Mombasa, and world-class faculty.",
    departments: [
      "Department of Public Law & Jurisprudence",
      "Department of Commercial Law & Maritime Studies",
      "Department of Private Law & Human Rights",
      "Zion Centre for Clinical Legal Education & Moot Court"
    ],
    programmes: [
      {
        id: "llb",
        slug: "bachelor-of-laws-llb",
        name: "Bachelor of Laws (LL.B Honors)",
        facultySlug: "law",
        facultyName: "School of Law",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Nairobi",
        studyMode: "Full Time",
        tuitionKES: 195000,
        entryRequirements: [
          "KCSE Mean Grade of B (plain) with at least B (plain) in English or Kiswahili",
          "Or a recognized first degree in any discipline with Upper Second Class Honours",
          "Or 3 Principal Passes in GCE A-Levels with Grade B in English"
        ],
        careerOutcomes: [
          "Advocate of the High Court of Kenya (after KSL)",
          "Corporate Legal Counsel & Compliance Lead",
          "Judicial Officer / Magistrate / Registrar",
          "International Human Rights Attorney",
          "Policy Analyst & Legislative Drafter"
        ],
        description: "A premier legal degree rigorous in constitutional law, commercial transactions, human rights, environmental justice, and international jurisprudence.",
        curriculumHighlights: [
          "Constitutional Law & Governance",
          "Commercial Transactions & Banking Law",
          "Criminal Law & Evidence",
          "Public International Law & Law of the Sea",
          "Appellate Moot Court Advocacy"
        ]
      },
      {
        id: "llm",
        slug: "master-of-laws-llm",
        name: "Master of Laws (LL.M in Commercial & Maritime Law)",
        facultySlug: "law",
        facultyName: "School of Law",
        level: "Postgraduate",
        duration: "2 Years (4 Semesters)",
        campus: "Both Campuses",
        studyMode: "Hybrid / Evening",
        tuitionKES: 260000,
        entryRequirements: [
          "Bachelor of Laws (LL.B) degree with at least Upper Second Class Honours from a CLE-accredited institution"
        ],
        careerOutcomes: [
          "Senior Maritime & Admiralty Lawyer",
          "International Arbitrator (CIArb)",
          "Legal Policy Lead for Multinational Corporations",
          "Law Professor & Senior Researcher"
        ],
        description: "Specialized postgraduate legal program leveraging our Mombasa coastal maritime hub and Nairobi financial center to explore complex international commercial litigation.",
        curriculumHighlights: [
          "International Commercial Arbitration",
          "Admiralty & Maritime Law of East Africa",
          "Cross-Border Mergers & Antitrust Law",
          "Intellectual Property in Digital Age"
        ]
      },
      {
        id: "dip-law",
        slug: "diploma-in-law-paralegal-studies",
        name: "Diploma in Law & Paralegal Studies",
        facultySlug: "law",
        facultyName: "School of Law",
        level: "Diploma",
        duration: "2 Years (6 Trimesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 75000,
        entryRequirements: [
          "KCSE Mean Grade of C (plain) with C+ in English / Kiswahili"
        ],
        careerOutcomes: [
          "Senior Legal Assistant & Paralegal",
          "Court Administrator / Registry Officer",
          "Conveyancing & Land Registry Clerk",
          "Pathway to LL.B Degree"
        ],
        description: "Prepares proficient legal assistants for law firms, non-governmental organizations, judiciary registries, and corporate legal departments.",
        curriculumHighlights: [
          "Civil Litigation Procedures",
          "Land Law & Conveyancing Practice",
          "Legal Research & Drafting",
          "Ethics in Legal Practice"
        ]
      }
    ]
  },
  {
    slug: "engineering-and-technology",
    name: "School of Engineering and Technology",
    shortName: "Engineering & Tech",
    programmeCount: 18,
    deanName: "Dr. Eng. Samuel Mwangi Ndung'u",
    deanTitle: "Dean, School of Engineering, EBK Registered Engineer & PhD (MIT/UoN)",
    deanBio: "Dr. Ndung'u is a pioneer in East African smart grid robotics and telecommunications infrastructure, serving on the Engineers Board of Kenya (EBK) standardisation committee.",
    photo: "/images/faculties/engineering.jpg",
    mission: "To spearhead engineering innovation, artificial intelligence, sustainable infrastructure, and industrial computing that accelerates Africa's technological sovereignty.",
    overview: "Fully accredited by the Engineers Board of Kenya (EBK) and the Commission for University Education (CUE). The School boasts advanced robotics labs, IoT testing facilities, and high-performance computing clusters.",
    departments: [
      "Department of Electrical & Electronic Engineering",
      "Department of Computer Science & Software Engineering",
      "Department of Civil & Environmental Engineering",
      "Department of Mechanical & Mechatronic Systems"
    ],
    programmes: [
      {
        id: "bsc-cs",
        slug: "bsc-computer-science",
        name: "B.Sc. Computer Science & Artificial Intelligence",
        facultySlug: "engineering-and-technology",
        facultyName: "School of Engineering and Technology",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 165000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with B (plain) in Mathematics, Physics, and English",
          "Or GCE A-Levels with passes in Mathematics and Physics"
        ],
        careerOutcomes: [
          "AI / Machine Learning Engineer",
          "Full-Stack Software Architect",
          "Cloud Infrastructure & DevOps Engineer",
          "Cybersecurity Specialist",
          "Data Scientist"
        ],
        description: "A future-proof computing degree covering distributed systems, machine learning, cloud architecture, and cybersecurity engineering.",
        curriculumHighlights: [
          "Data Structures & Advanced Algorithms",
          "Deep Learning & Natural Language Processing",
          "Cloud Computing & Microservices Architecture",
          "Mobile App & Web Development",
          "Cryptography & Network Security"
        ]
      },
      {
        id: "bsc-ee",
        slug: "bsc-electrical-and-electronic-engineering",
        name: "B.Sc. Electrical and Electronic Engineering (EBK Accredited)",
        facultySlug: "engineering-and-technology",
        facultyName: "School of Engineering and Technology",
        level: "Undergraduate",
        duration: "5 Years (10 Semesters)",
        campus: "Nairobi",
        studyMode: "Full Time",
        tuitionKES: 175000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with at least C+ in Mathematics, Physics, Chemistry, and English"
        ],
        careerOutcomes: [
          "Power Systems & Grid Engineer (KPLC/KenGen)",
          "Telecommunications & 5G Systems Engineer",
          "Automation & Embedded Hardware Engineer",
          "Renewable Energy Systems Designer"
        ],
        description: "EBK-accredited 5-year engineering honors degree preparing graduates to build continental power, renewable energy, and telecommunication networks.",
        curriculumHighlights: [
          "Electrical Circuit Analysis & High Voltage Systems",
          "Power Electronics & Renewable Energy Drives",
          "Microprocessor Systems & Robotics",
          "Digital Signal Processing & Microwave Communications"
        ]
      },
      {
        id: "bsc-civil",
        slug: "bsc-civil-and-structural-engineering",
        name: "B.Sc. Civil and Structural Engineering",
        facultySlug: "engineering-and-technology",
        facultyName: "School of Engineering and Technology",
        level: "Undergraduate",
        duration: "5 Years (10 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 175000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with C+ in Mathematics, Physics, Chemistry and English"
        ],
        careerOutcomes: [
          "Structural Engineer",
          "Highway & Transportation Project Manager",
          "Hydrology & Water Resources Engineer",
          "Geotechnical Consultant"
        ],
        description: "Prepares engineers for major infrastructure developments, smart cities, coastal harbor engineering, and sustainable transport networks.",
        curriculumHighlights: [
          "Structural Dynamics & Reinforced Concrete",
          "Geotechnical & Foundation Engineering",
          "Coastal & Harbor Engineering",
          "Environmental Impact & Water Systems"
        ]
      },
      {
        id: "msc-data",
        slug: "msc-data-science-analytics",
        name: "M.Sc. Data Science and Analytics",
        facultySlug: "engineering-and-technology",
        facultyName: "School of Engineering and Technology",
        level: "Postgraduate",
        duration: "2 Years (4 Semesters)",
        campus: "Both Campuses",
        studyMode: "Hybrid / Evening",
        tuitionKES: 240000,
        entryRequirements: [
          "B.Sc. in Computer Science, Engineering, Mathematics, Statistics, or related STEM discipline with Upper Second Class"
        ],
        careerOutcomes: [
          "Lead Data Scientist",
          "Chief Analytics Officer",
          "Big Data Solutions Architect",
          "Quantitative Research Lead"
        ],
        description: "Advanced computational training in predictive modeling, big data pipelines, deep neural networks, and scalable business intelligence.",
        curriculumHighlights: [
          "Statistical Learning Theory",
          "Distributed Big Data Engines (Spark/Kafka)",
          "Applied Computer Vision & NLP",
          "Data Ethics & Governance in Africa"
        ]
      }
    ]
  },
  {
    slug: "health-sciences",
    name: "School of Health Sciences",
    shortName: "Health Sciences",
    programmeCount: 14,
    deanName: "Prof. Dr. Mary Khakasa Simiyu",
    deanTitle: "Dean, School of Health Sciences & Consultant Epidemiologist (MBChB, MMed, PhD)",
    deanBio: "Prof. Simiyu has led infectious disease control research initiatives across Africa in partnership with WHO, CDC, and the Kenya Medical Research Institute (KEMRI).",
    photo: "/images/faculties/health.png",
    mission: "To advance universal healthcare through rigorous clinical training, transformative biomedical research, and compassionate patient-centered healthcare delivery.",
    overview: "Accredited by the Nursing Council of Kenya (NCK) and the Kenya Medical Practitioners and Dentists Council (KMPDC). Partnerships with Kenyatta National Hospital, Coast General Teaching & Referral Hospital, and Aga Khan University Hospital.",
    departments: [
      "Department of Nursing Sciences & Midwifery",
      "Department of Public Health & Epidemiology",
      "Department of Medical Laboratory Sciences",
      "Department of Pharmacy & Clinical Pharmacology"
    ],
    programmes: [
      {
        id: "bsc-nursing",
        slug: "bsc-nursing-direct-entry-upgrading",
        name: "B.Sc. Nursing (BScN - Direct Entry & Upgrading)",
        facultySlug: "health-sciences",
        facultyName: "School of Health Sciences",
        level: "Undergraduate",
        duration: "4 Years (Direct) / 2.5 Years (Upgrading)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 185000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with C+ in Biology, Chemistry, Mathematics/Physics, and English/Kiswahili",
          "Or KRCHN Diploma for Upgrading candidates with NCK registration"
        ],
        careerOutcomes: [
          "Registered Clinical Nurse Specialist",
          "Nurse Manager / Director of Nursing Services",
          "Community Health Nurse Coordinator",
          "International Clinical Healthcare Practitioner"
        ],
        description: "Accredited by the Nursing Council of Kenya, preparing clinical healthcare leaders equipped with hands-on hospital rotations and community health immersions.",
        curriculumHighlights: [
          "Human Anatomy & Medical Physiology",
          "Medical-Surgical Nursing",
          "Maternal, Neonatal & Child Health",
          "Mental Health & Psychiatric Nursing",
          "Clinical Pharmacology & Pathophysiology"
        ]
      },
      {
        id: "bsc-public-health",
        slug: "bsc-public-health",
        name: "B.Sc. Public Health & Global Health",
        facultySlug: "health-sciences",
        facultyName: "School of Health Sciences",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 155000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with C+ in Biology, Chemistry, and Mathematics"
        ],
        careerOutcomes: [
          "Epidemiologist & Disease Surveillance Officer",
          "Public Health Policy Officer (MoH / WHO)",
          "WASH & Environmental Health Manager",
          "NGO Health Program Director"
        ],
        description: "Equips future health practitioners to analyze health determinants, combat epidemics, design nutrition interventions, and implement resilient health systems.",
        curriculumHighlights: [
          "Epidemiology & Biostatistics",
          "Environmental Health & Occupational Safety",
          "Health Economics & Financing",
          "Global Disease Surveillance"
        ]
      },
      {
        id: "mph",
        slug: "master-of-public-health",
        name: "Master of Public Health (MPH - Epidemiology & Health Systems)",
        facultySlug: "health-sciences",
        facultyName: "School of Health Sciences",
        level: "Postgraduate",
        duration: "2 Years (4 Semesters)",
        campus: "Both Campuses",
        studyMode: "Hybrid / Evening",
        tuitionKES: 235000,
        entryRequirements: [
          "Bachelor's degree in Health Sciences, Biological Sciences, Medicine, or related field with Upper Second Class Honours"
        ],
        careerOutcomes: [
          "Principal Epidemiologist",
          "Health Systems Specialist (UNICEF/WHO/USAID)",
          "Clinical Trial Safety Monitor",
          "University Health Researcher"
        ],
        description: "A prestigious postgraduate public health qualification for healthcare executives, policy makers, and clinical researchers across East Africa.",
        curriculumHighlights: [
          "Advanced Epidemiologic Methods",
          "Health Policy Formulation & Analysis",
          "Biostatistical Computing with R & Stata",
          "Pandemic Preparedness & Response"
        ]
      }
    ]
  },
  {
    slug: "education",
    name: "School of Education",
    shortName: "Education",
    programmeCount: 12,
    deanName: "Prof. Kipchumba Koech Arap Ruto",
    deanTitle: "Dean, School of Education & Professor of Curriculum Studies (PhD, Kenyatta University)",
    deanBio: "Prof. Ruto is a recognized authority on Competency-Based Curriculum (CBC) implementation and teacher education policy in Kenya, advising the Teachers Service Commission (TSC).",
    photo: "/images/faculties/education.jpg",
    mission: "To educate inspirational, innovative educators and curriculum leaders capable of igniting intellectual curiosity and shaping future generations.",
    overview: "All teacher education programs are fully recognized by the Teachers Service Commission (TSC) and the Ministry of Education. The School incorporates digital pedagogy labs, CBC teaching clinics, and school attachment programs.",
    departments: [
      "Department of Educational Foundations & Policy",
      "Department of Curriculum & Instructional Media",
      "Department of Science & Mathematics Education",
      "Department of Special Needs Education & Guidance"
    ],
    programmes: [
      {
        id: "bed-arts",
        slug: "bachelor-of-education-arts",
        name: "Bachelor of Education (Arts - CBC Aligned)",
        facultySlug: "education",
        facultyName: "School of Education",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 110000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with at least C+ in two teaching subjects of choice (English, Literature, Kiswahili, History, CRE, Geography, etc.)"
        ],
        careerOutcomes: [
          "Secondary School & Junior High Teacher (TSC Registered)",
          "Curriculum Developer (KICD)",
          "Educational Assessment Officer (KNEC)",
          "School Principal & Administrator"
        ],
        description: "Prepares visionary secondary and junior school educators with mastery in modern pedagogical methods and CBC classroom leadership.",
        curriculumHighlights: [
          "Competency-Based Curriculum Design",
          "Educational Psychology & Child Development",
          "Classroom Instructional Technology",
          "Teaching Practicum & School Attachment"
        ]
      },
      {
        id: "bed-science",
        slug: "bachelor-of-education-science",
        name: "Bachelor of Education (Science & STEM)",
        facultySlug: "education",
        facultyName: "School of Education",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 120000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with C+ in two STEM teaching subjects (Mathematics, Physics, Chemistry, Biology, Computer Studies)"
        ],
        careerOutcomes: [
          "STEM High School / College Educator",
          "Science Laboratory Instructor",
          "Educational Technology Consultant",
          "Education Officer in Ministry of Education"
        ],
        description: "Empowers educators with high-tech science laboratory techniques, mathematical pedagogy, and computer-assisted teaching methods.",
        curriculumHighlights: [
          "STEM Pedagogical Methodologies",
          "Laboratory Management & Safety",
          "Calculus & Analytical Mechanics for Teachers",
          "Educational Measurement & Evaluation"
        ]
      },
      {
        id: "med",
        slug: "master-of-education-leadership",
        name: "Master of Education in Educational Leadership & Policy",
        facultySlug: "education",
        facultyName: "School of Education",
        level: "Postgraduate",
        duration: "2 Years (4 Semesters)",
        campus: "Both Campuses",
        studyMode: "Hybrid / Evening",
        tuitionKES: 180000,
        entryRequirements: [
          "Bachelor of Education degree with at least Upper Second Class Honours",
          "Or Lower Second with 2 years of teaching experience"
        ],
        careerOutcomes: [
          "Chief Quality Assurance Officer",
          "County Director of Education",
          "University Lecturer & Educational Researcher",
          "School Board Director"
        ],
        description: "Strategic executive program for headteachers, education officers, and school owners aiming to lead institutional transformation.",
        curriculumHighlights: [
          "Educational Policy & Legal Frameworks",
          "Financial Management in Educational Institutions",
          "School Strategic Planning & Governance",
          "Curriculum Evaluation & Quality Assurance"
        ]
      }
    ]
  },
  {
    slug: "arts-and-social-sciences",
    name: "School of Arts and Social Sciences",
    shortName: "Arts & Social Sciences",
    programmeCount: 14,
    deanName: "Prof. Amina Hassan Mwidau",
    deanTitle: "Dean, School of Arts & Social Sciences & PhD in International Relations (London/UoN)",
    deanBio: "Prof. Mwidau is a distinguished scholar in diplomatic history, peacebuilding, and media ethics in the Horn of Africa and the East African Community.",
    photo: "/images/faculties/arts.jpg",
    mission: "To nurture critical enquiry, creative expression, cultural appreciation, and diplomatic expertise that enriches democratic discourse and societal development.",
    overview: "Home to state-of-the-art media broadcasting studios, translation suites, psychological counseling clinics, and diplomatic simulation chambers.",
    departments: [
      "Department of Journalism, Media & Digital Communication",
      "Department of International Relations & Diplomacy",
      "Department of Psychology & Counseling",
      "Department of Sociology, Development & Gender Studies"
    ],
    programmes: [
      {
        id: "ba-journalism",
        slug: "ba-journalism-and-mass-communication",
        name: "B.A. Journalism and Digital Media Studies",
        facultySlug: "arts-and-social-sciences",
        facultyName: "School of Arts and Social Sciences",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 135000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with C+ in English and Kiswahili"
        ],
        careerOutcomes: [
          "Broadcast Journalist & News Anchor",
          "Digital Content Producer & Video Editor",
          "Corporate Public Relations & Communications Officer",
          "Investigative Reporter & Photojournalist"
        ],
        description: "Hands-on multimedia training with broadcast television and radio studios, podcast suites, investigative reporting labs, and digital storytelling.",
        curriculumHighlights: [
          "Television & Radio Studio Production",
          "Investigative Journalism & Data Storytelling",
          "Strategic Corporate Communications & PR",
          "Media Law, Ethics & Copyright"
        ]
      },
      {
        id: "ba-ir",
        slug: "ba-international-relations-diplomacy",
        name: "B.A. International Relations and Diplomacy",
        facultySlug: "arts-and-social-sciences",
        facultyName: "School of Arts and Social Sciences",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Nairobi",
        studyMode: "Full Time",
        tuitionKES: 140000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with C+ in English and History/Geography"
        ],
        careerOutcomes: [
          "Diplomat & Foreign Service Officer (Ministry of Foreign Affairs)",
          "United Nations & International NGO Program Officer",
          "Geopolitical Risk Analyst",
          "Conflict Resolution & Peacebuilding Negotiator"
        ],
        description: "Prepares future diplomats, international civil servants, and global policy negotiators in Nairobi, the diplomatic capital of Africa.",
        curriculumHighlights: [
          "Diplomatic Protocol & Foreign Policy",
          "African Union & Regional Integration",
          "International Conflict Management & Peace Studies",
          "Global Political Economy"
        ]
      },
      {
        id: "ba-psych",
        slug: "bachelor-of-psychology-counseling",
        name: "Bachelor of Psychology and Counseling",
        facultySlug: "arts-and-social-sciences",
        facultyName: "School of Arts and Social Sciences",
        level: "Undergraduate",
        duration: "4 Years (8 Semesters)",
        campus: "Both Campuses",
        studyMode: "Full Time",
        tuitionKES: 130000,
        entryRequirements: [
          "KCSE Mean Grade of C+ with C+ in Biology and English"
        ],
        careerOutcomes: [
          "Licensed Counseling Psychologist",
          "Organizational Wellbeing & HR Consultant",
          "Child & Adolescent Behavioral Specialist",
          "Rehabilitation & Trauma Counselor"
        ],
        description: "Rigorous behavioral science training combined with supervised clinical counseling practicum in community and corporate environments.",
        curriculumHighlights: [
          "Theories of Personality & Human Development",
          "Abnormal Psychology & Psychopathology",
          "Counseling Skills & Psychotherapy Techniques",
          "Trauma & Crisis Intervention"
        ]
      }
    ]
  }
];

// 6 Research Centres
export const researchCentres: ResearchCentre[] = [
  {
    slug: "centre-for-ai-and-data-science",
    name: "Centre for AI & Data Science Innovation (CADSI)",
    shortName: "AI & Data Science",
    focusArea: "Artificial Intelligence, African NLP, Machine Learning, and Big Data in Agriculture & Healthcare",
    leadResearcher: "Dr. Eng. Samuel Ndung'u & Dr. Faith Chebet",
    leadTitle: "Principal Investigator & Senior AI Fellow",
    publicationsCount: 64,
    photo: "/images/research/ai-data.jpg",
    description: "CADSI is a leading computational research laboratory pioneering indigenous African language natural language processing models, smart automated diagnostics for rural clinics, and satellite crop yield forecasting.",
    strategicGoals: [
      "Develop low-resource African LLMs covering Swahili, Sheng, Kikuyu, Luo, and Somali",
      "Deploy AI-driven diagnostic imaging tools across 100+ rural health dispensaries in Kenya",
      "Partner with regional agricultural cooperatives to provide automated weather-crop advisory algorithms"
    ],
    currentProjects: [
      {
        title: "Sheng & Swahili Foundation Model for Healthcare Consultation",
        grantValue: "$1,200,000 (USAID / Gates Foundation)",
        partner: "Ministry of Health Kenya & Google Research Africa",
        lead: "Dr. Faith Chebet"
      },
      {
        title: "Satellite Computer Vision for Drought Vulnerability in Turkana & Garissa",
        grantValue: "$850,000 (UNDP / Kenya Space Agency)",
        partner: "Kenya Red Cross & RCMRD",
        lead: "Dr. Eng. Samuel Ndung'u"
      }
    ],
    recentPublications: [
      {
        title: "Benchmarking Swahili-English Code-Switched Transformers in East African Clinical Dialogue",
        journal: "IEEE Transactions on Neural Networks & Learning Systems",
        year: 2025,
        authors: "Chebet, F., Ndung'u, S., Kariuki, G.",
        doi: "10.1109/TNNLS.2025.3409112"
      },
      {
        title: "High-Resolution Satellite Deep Learning for Smallholder Maize Yield Estimation in Western Kenya",
        journal: "Nature Africa Digital Agriculture",
        year: 2024,
        authors: "Ndung'u, S., Omondi, P., Ruto, K.",
        doi: "10.1038/s41598-024-58911-3"
      }
    ],
    partners: ["Google Research Africa", "Microsoft Africa Research Institute", "Kenya Space Agency", "KEMRI", "USAID"]
  },
  {
    slug: "institute-for-public-health-epidemiology",
    name: "Institute for Public Health & Epidemiology (IPHE)",
    shortName: "Public Health & Epidemiology",
    focusArea: "Infectious Disease Surveillance, Maternal & Child Health, Pandemic Preparedness, Coastal Health Dynamics",
    leadResearcher: "Prof. Dr. Mary Khakasa Simiyu",
    leadTitle: "Executive Director & Professor of Clinical Epidemiology",
    publicationsCount: 92,
    photo: "/images/research/public-health.jpg",
    description: "IPHE conducts frontline clinical and epidemiological investigations across Kenya. Its specialized laboratories analyze malaria genomic resistance, vaccine efficacy, and climate-induced waterborne pathology along the Indian Ocean coastline.",
    strategicGoals: [
      "Lead East Africa's genomic sequencing network for emerging pathogen surveillance",
      "Reduce maternal mortality through mobile telemedicine interventions in marginalized communities",
      "Strengthen community healthcare worker training frameworks with evidence-based policy briefs"
    ],
    currentProjects: [
      {
        title: "Genomic Surveillance of Antimalarial Drug Resistance in Coastal Kenya",
        grantValue: "$2,400,000 (Wellcome Trust / WHO)",
        partner: "Coast General Hospital & KEMRI Kilifi",
        lead: "Prof. Dr. Mary Simiyu"
      },
      {
        title: "Community Telemedicine for High-Risk Pregnancies in Nairobi Informal Settlements",
        grantValue: "$650,000 (UNICEF / Rockefeller Foundation)",
        partner: "Nairobi City County Health Directorate",
        lead: "Dr. Edwin Mutua"
      }
    ],
    recentPublications: [
      {
        title: "Emergence of Plasmodium falciparum Kelch13 Mutations in Coastal Kenya: A 5-Year Longitudinal Cohort",
        journal: "The Lancet Infectious Diseases",
        year: 2025,
        authors: "Simiyu, M. K., Hassan, A., Otieno, P.",
        doi: "10.1016/S1473-3099(25)00124-7"
      },
      {
        title: "Maternal Health Outcomes in Urban Informal Settlements Using AI-Augmented Midwife Systems",
        journal: "BMC Public Health",
        year: 2024,
        authors: "Simiyu, M. K., Kariuki, G., Mwidau, A.",
        doi: "10.1186/s12889-024-18452-9"
      }
    ],
    partners: ["World Health Organization", "KEMRI", "Wellcome Trust", "UNICEF", "CDC Kenya"]
  },
  {
    slug: "centre-for-african-legal-studies",
    name: "Centre for African Legal Studies & Rule of Law (CALSR)",
    shortName: "African Legal Studies",
    focusArea: "Constitutionalism, Judicial Reform, AfCFTA Trade Law, Maritime Jurisprudence, Human Rights",
    leadResearcher: "Hon. Prof. Peter Otieno Omondi, SC",
    leadTitle: "Director & Distinguished Chair in Comparative African Law",
    publicationsCount: 48,
    photo: "/images/research/legal-studies.jpg",
    description: "CALSR is an international think-tank examining the evolution of constitutional democracy in Africa, cross-border commercial dispute resolution under the African Continental Free Trade Area (AfCFTA), and maritime security in the Western Indian Ocean.",
    strategicGoals: [
      "Publish the annual State of Constitutionalism in East Africa report",
      "Draft unified model guidelines for AfCFTA cross-border e-commerce dispute resolution",
      "Provide free legal aid representation to over 5,000 indigent citizens annually through the Legal Clinic"
    ],
    currentProjects: [
      {
        title: "Harmonisation of AfCFTA Commercial Dispute Rules and Regional Court Jurisdiction",
        grantValue: "$550,000 (African Union / Afreximbank)",
        partner: "East African Court of Justice & Kenya Law",
        lead: "Hon. Prof. Peter Omondi, SC"
      },
      {
        title: "Maritime Security and Fisheries Legal Protection in the Swahili Coastline",
        grantValue: "$400,000 (Blue Economy Initiative / SIDA)",
        partner: "Kenya Maritime Authority & University of Dar es Salaam",
        lead: "Dr. Bernard Wanyama"
      }
    ],
    recentPublications: [
      {
        title: "The Transformative Jurisprudence of the Supreme Court of Kenya: 2013-2025 Retrospective",
        journal: "Harvard African Law Review",
        year: 2025,
        authors: "Omondi, P. O., Mwidau, A. H.",
        doi: "10.1093/halr/2025.018"
      },
      {
        title: "Maritime Boundary Delimitation and Resource Sovereignty in East Africa",
        journal: "International & Comparative Law Quarterly",
        year: 2024,
        authors: "Omondi, P. O., Simiyu, M. K.",
        doi: "10.1017/iclq.2024.089"
      }
    ],
    partners: ["African Union Commission", "East African Court of Justice", "International Commission of Jurists (Kenya)", "Kenya Maritime Authority"]
  },
  {
    slug: "centre-for-renewable-energy-climate",
    name: "Centre for Renewable Energy & Climate Resilience (CRECR)",
    shortName: "Renewable Energy & Climate",
    focusArea: "Geothermal Innovation, Off-Grid Solar Microgrids, Green Hydrogen, Climate Adaptation",
    leadResearcher: "Prof. Kenneth Kiprono Bii",
    leadTitle: "Director & Senior Energy Systems Fellow",
    publicationsCount: 57,
    photo: "/images/research/renewable-energy.jpg",
    description: "CRECR drives sustainable green energy engineering across East Africa. In collaboration with KenGen and the Geothermal Development Company (GDC), the centre designs next-generation geothermal reinjection models, solar mini-grids for pastoralist regions, and green industrial solutions.",
    strategicGoals: [
      "Optimise Rift Valley geothermal steam exploitation through predictive thermodynamic simulation",
      "Deploy 50 high-efficiency solar water desalination units along coastal Mombasa communities",
      "Establish Kenya's first academic Green Hydrogen Testing & Certification Facility"
    ],
    currentProjects: [
      {
        title: "Next-Gen Low-Enthalpy Geothermal Power Generation in the Olkaria Basin",
        grantValue: "$1,850,000 (KenGen / JICA Japan)",
        partner: "KenGen & Tokyo Institute of Technology",
        lead: "Prof. Kenneth Bii"
      },
      {
        title: "Solar-Powered Reverse Osmosis Desalination for Mombasa Coastal Schools",
        grantValue: "$720,000 (Climate Development Fund / Danida)",
        partner: "Mombasa County Water Department",
        lead: "Dr. Eng. Samuel Ndung'u"
      }
    ],
    recentPublications: [
      {
        title: "Thermodynamic Performance of Binary Organic Rankine Cycles in High-Silica Geothermal Fluids",
        journal: "Applied Energy (Elsevier)",
        year: 2025,
        authors: "Bii, K. K., Ndung'u, S., Kariuki, G.",
        doi: "10.1016/j.apenergy.2025.123841"
      },
      {
        title: "Off-Grid Decentralized Solar Storage Microgrids for Rural Arid Settlements in Kenya",
        journal: "Renewable & Sustainable Energy Reviews",
        year: 2024,
        authors: "Bii, K. K., Chebet, F.",
        doi: "10.1016/j.rser.2024.114502"
      }
    ],
    partners: ["KenGen", "Geothermal Development Company (GDC)", "JICA", "UNEP Nairobi", "Kenya Power"]
  },
  {
    slug: "fintech-and-inclusive-economy-centre",
    name: "Financial Technologies & Inclusive Economy Centre (FTIEC)",
    shortName: "FinTech & Inclusive Economy",
    focusArea: "Mobile Money Ecosystems, Central Bank Digital Currencies (CBDC), Microfinance Analytics, Financial Inclusion",
    leadResearcher: "Prof. Grace Wanjiku Kariuki",
    leadTitle: "Director & Chair of African Financial Systems",
    publicationsCount: 51,
    photo: "/images/research/fintech.jpg",
    description: "Kenya is the global heart of mobile money innovation. FTIEC investigates the macroeconomic impacts of digital currencies, algorithmic credit scoring for MSMEs, and cross-border remittances across the EAC and COMESA.",
    strategicGoals: [
      "Design open-source algorithmic credit scoring models that eliminate bias against women entrepreneurs",
      "Advise the Central Bank of Kenya on digital asset regulation and retail CBDC architecture",
      "Train over 1,000 FinTech startup founders through the Zion University Enterprise Incubation Lab"
    ],
    currentProjects: [
      {
        title: "Interoperable Cross-Border Mobile Money Settlement Architecture for East Africa",
        grantValue: "$980,000 (Central Bank of Kenya / AfDB)",
        partner: "Safaricom, Equity Bank & EAC Secretariat",
        lead: "Prof. Grace Kariuki"
      },
      {
        title: "AI-Powered Micro-Credit Risk Scoring for Smallholder Farmers",
        grantValue: "$600,000 (Mastercard Foundation)",
        partner: "Kenya Commercial Bank (KCB) & FSD Kenya",
        lead: "Dr. David Kibet"
      }
    ],
    recentPublications: [
      {
        title: "Mobile Money Interoperability and Household Consumption Resilience in East Africa",
        journal: "Journal of Development Economics",
        year: 2025,
        authors: "Kariuki, G. W., Ndung'u, S., Omondi, P.",
        doi: "10.1016/j.jdeveco.2025.103194"
      },
      {
        title: "Algorithmic Fairness in Micro-Lending: Mitigating Bias in Alternative Credit Scoring",
        journal: "World Development",
        year: 2024,
        authors: "Kariuki, G. W., Chebet, F.",
        doi: "10.1016/j.worlddev.2024.106882"
      }
    ],
    partners: ["Central Bank of Kenya", "Safaricom M-PESA", "Financial Sector Deepening (FSD) Kenya", "Mastercard Foundation", "AfDB"]
  },
  {
    slug: "agritech-and-food-security-hub",
    name: "AgriTech & Food Security Research Hub (AFSH)",
    shortName: "AgriTech & Food Security",
    focusArea: "Climate-Smart Crops, Precision Irrigation, Post-Harvest Cold Chains, Bio-Fortification",
    leadResearcher: "Prof. Kipchumba Koech Arap Ruto",
    leadTitle: "Hub Lead & Professor of Agricultural Science",
    publicationsCount: 44,
    photo: "/images/research/agritech.jpg",
    description: "AFSH translates laboratory plant genetics and IoT soil telemetry into high-yielding, drought-tolerant agricultural practices for farmers in arid and semi-arid lands (ASALs) across Kenya.",
    strategicGoals: [
      "Release 3 certified climate-resilient sorghum and finger millet seed varieties",
      "Deploy low-cost IoT automated drip irrigation sensors manufactured in-house",
      "Reduce post-harvest horticultural loss by 40% using evaporative solar cooling chambers"
    ],
    currentProjects: [
      {
        title: "Bio-Fortified Drought-Tolerant Legumes for Semi-Arid Eastern Kenya",
        grantValue: "$1,100,000 (KALRO / AGRA)",
        partner: "Kenya Agricultural & Livestock Research Organization (KALRO)",
        lead: "Prof. Kipchumba Ruto"
      },
      {
        title: "IoT Drip Irrigation & Soil Moisture Telemetry for Smallholder Horticulture",
        grantValue: "$520,000 (Netherlands Embassy / FAO)",
        partner: "Ministry of Agriculture Kenya",
        lead: "Dr. Beatrice Chesang"
      }
    ],
    recentPublications: [
      {
        title: "Genetic Characterization of Drought-Tolerant Sorghum Landraces in Kenya",
        journal: "Field Crops Research",
        year: 2025,
        authors: "Ruto, K. K., Simiyu, M. K.",
        doi: "10.1016/j.fcr.2025.109204"
      },
      {
        title: "Solar-Powered Cold Storage Impact on Mango Value Chains in Coastal Kenya",
        journal: "Food Security & Policy",
        year: 2024,
        authors: "Ruto, K. K., Bii, K. K.",
        doi: "10.1007/s12571-024-01478-2"
      }
    ],
    partners: ["KALRO", "AGRA", "FAO", "Ministry of Agriculture & Livestock Development", "ICIPE"]
  }
];

// 5 Scholarships
export const scholarships: Scholarship[] = [
  {
    id: "vc-merit",
    name: "Vice Chancellor's Academic Excellence Scholarship",
    valueKES: 450000,
    valueText: "100% Full Tuition Waiver + KES 50,000 Annual Book Stipend",
    category: "Merit",
    eligibility: [
      "KCSE Mean Grade of A or A- (minus) achieved in the immediate past year",
      "Outstanding leadership demonstrated in high school or community service",
      "Available for all undergraduate degree programmes across Nairobi and Mombasa"
    ],
    coverage: "Full tuition, laboratory fees, examination fees, library access, and campus health insurance for 4 years.",
    deadline: "2026-11-15T23:59:59Z",
    slots: 25,
    description: "The most prestigious academic merit award at Zion University, reserved for top-tier achievers dedicated to transformative scholarship and community impact."
  },
  {
    id: "stem-women",
    name: "Women in STEM Leadership Fellowship",
    valueKES: 350000,
    valueText: "80% Tuition Waiver + Dedicated Tech Industry Mentorship",
    category: "STEM",
    eligibility: [
      "Female applicants admitted to School of Engineering, Computer Science, or Data Science",
      "KCSE Mean Grade of B+ (plus) with strong grades in Mathematics and Physics",
      "Commitment to participating in the Zion Women in Tech outreach programme"
    ],
    coverage: "Covers 80% tuition for the full duration of study plus priority placement in Google, Microsoft, and Safaricom research internships.",
    deadline: "2026-11-20T23:59:59Z",
    slots: 40,
    description: "Established to close the gender gap in African computing, robotics, and electrical engineering leadership through financial aid and executive coaching."
  },
  {
    id: "eac-regional",
    name: "East African Community (EAC) Integration Award",
    valueKES: 250000,
    valueText: "KES 250,000 Annual Tuition Subsidy",
    category: "Regional",
    eligibility: [
      "Citizens of EAC partner states (Uganda, Tanzania, Rwanda, Burundi, South Sudan, DRC, Somalia)",
      "Admitted to any Undergraduate or Postgraduate degree programme",
      "Demonstrated commitment to regional economic, environmental, or cultural integration"
    ],
    coverage: "Reduces international tuition rates to local resident rates plus provides a KES 250,000 annual subsidy.",
    deadline: "2026-11-25T23:59:59Z",
    slots: 50,
    description: "Promoting cross-border educational collaboration, knowledge exchange, and pan-African unity across the greater East African region."
  },
  {
    id: "sports-creative",
    name: "Athletics & Creative Arts Talent Bursary",
    valueKES: 200000,
    valueText: "Up to 70% Tuition Waiver + Elite Training Facility Access",
    category: "Sports & Arts",
    eligibility: [
      "National or regional-level athletes (Athletics, Rugby, Football, Basketball, Swimming)",
      "Or exceptional creative artists (Drama, Music, Media Production, Literature)",
      "Minimum university admission requirements met for the chosen programme"
    ],
    coverage: "Covers 50% to 70% tuition, physiotherapy, sports kits, and national competition travel allowances.",
    deadline: "2026-11-30T23:59:59Z",
    slots: 35,
    description: "Empowering talented sportsmen and creative artists to achieve academic excellence without compromising their athletic and artistic ambitions."
  },
  {
    id: "mombasa-coastal",
    name: "Mombasa Coastal Community Opportunity Grant",
    valueKES: 180000,
    valueText: "50% Tuition Waiver for Coastal Region Residents",
    category: "Need-Based",
    eligibility: [
      "Residents of Coast region counties (Mombasa, Kilifi, Kwale, Lamu, Taita Taveta, Tana River)",
      "Admitted to programmes based at the Mombasa Satellite Campus",
      "Demonstrated financial need with recommendation from local administrative leadership"
    ],
    coverage: "Covers 50% of annual tuition fees across all certificate, diploma, and degree programmes at Mombasa campus.",
    deadline: "2026-11-10T23:59:59Z",
    slots: 60,
    description: "Targeted educational equity grant fostering coastal economic advancement, maritime studies, and youth empowerment."
  }
];

// News Articles
export const newsArticles: NewsArticle[] = [
  {
    slug: "zion-university-awarded-5m-renewable-energy-grant",
    title: "Zion University Secures $5M Continental Renewable Energy Research Grant",
    category: "Research",
    publishedAt: "2026-09-28",
    author: "Prof. Kenneth Bii & Corporate Communications",
    readTime: "4 min read",
    summary: "The Centre for Renewable Energy & Climate Resilience has been awarded $5 million by the African Development Bank to pioneer scalable geothermal steam and solar mini-grids across East Africa.",
    image: "/images/news/news-1.jpg",
    content: [
      "In a major validation of African-led scientific innovation, Zion University has officially been awarded a $5,000,000 research and infrastructure development grant by the African Development Bank (AfDB) in partnership with the Ministry of Energy of Kenya.",
      "The grant will finance the expansion of the Centre for Renewable Energy & Climate Resilience (CRECR) at the Nairobi Main Campus and establish five new solar desalination pilot installations along the Mombasa coastline.",
      "Speaking during the ceremonial grant signing, Vice Chancellor Prof. Jeremiah Mutiso noted that 'African universities must become the epicenters of sustainable industrialization. This grant will empower our engineering faculty and graduate researchers to build tangible, home-grown energy solutions.'",
      "Key deliverables over the next three years include establishing an advanced thermodynamic simulation lab, deploying micro-grid power hubs to over 20 off-grid pastoralist schools in northern Kenya, and publishing open-source geothermal optimization software."
    ],
    tags: ["Renewable Energy", "AfDB", "Geothermal", "Engineering", "Research Excellence"]
  },
  {
    slug: "annual-commencement-ceremony-2026",
    title: "31st Annual Commencement Ceremony: Celebrating 3,450 New Graduates in Nairobi",
    category: "Campus",
    publishedAt: "2026-09-15",
    author: "Admissions & Alumni Relations",
    readTime: "3 min read",
    summary: "Over 3,450 undergraduate and postgraduate students were conferred degrees during the 31st Congregation for the Conferment of Degrees and Award of Diplomas at the Nairobi Sports Complex.",
    image: "/images/news/news-2.jpg",
    content: [
      "The Zion University grounds in Nairobi were filled with joy and pageantry as 3,450 graduates celebrated their academic achievements during the 31st Annual Commencement Ceremony.",
      "The graduating class included 2,120 undergraduates, 890 postgraduates (including 42 PhD recipients), and 440 diploma holders across all six faculties.",
      "The Chief Guest, Cabinet Secretary for Education, lauded Zion University's uncompromising commitment to technological fluency, ethical leadership, and research that directly addresses Kenya's economic blueprint.",
      "Valedictorian Sharon Achieng (B.Sc. Computer Science & AI, First Class Honours) urged her peers to 'deploy our intellect and courage in building an African continent that innovates boldly and serves humanity justly.'"
    ],
    tags: ["Graduation", "Alumni", "Commencement", "Academic Excellence", "Nairobi Campus"]
  },
  {
    slug: "engineering-robotics-team-wins-african-summit",
    title: "Zion Robotics Team Wins Gold at All-Africa Universities Tech Innovation Summit",
    category: "Academic",
    publishedAt: "2026-08-30",
    author: "School of Engineering and Technology",
    readTime: "5 min read",
    summary: "A team of five Zion University engineering students took first prize in Kigali, Rwanda with their autonomous solar-powered crop-monitoring agricultural drone.",
    image: "/images/news/news-3.jpg",
    content: [
      "Zion University's student engineering team, 'AeroAgri Kenya', has clinched the Gold Trophy at the 2026 All-Africa Universities Tech Innovation Summit held at the Kigali Convention Centre in Rwanda.",
      "Competing against 48 top universities from 18 African countries, the Zion University team designed and live-demonstrated an autonomous solar-powered drone equipped with multispectral computer vision cameras capable of detecting early maize lethal necrosis disease.",
      "The prototype, which costs 70% less than imported commercial agricultural drones, was fully fabricated at the Zion University FabLab using locally sourced components and lightweight composite plastics.",
      "The team received $25,000 in seed funding and will be incubated within the Zion University Enterprise Hub to commercialize the technology for smallholder farmer cooperatives across East Africa."
    ],
    tags: ["Robotics", "Engineering", "AgriTech", "Student Innovation", "Kigali Summit"]
  }
];

// Upcoming Events
export const upcomingEvents: UniversityEvent[] = [
  {
    slug: "annual-commencement-ceremony-2026-event",
    title: "31st Annual Commencement & Honours Conferment Ceremony",
    date: "2026-11-28",
    time: "08:30 AM - 01:30 PM EAT",
    campus: "Nairobi Main Campus",
    venue: "Main Convocation Pavilion & Live Stream",
    category: "Commencement",
    image: "/images/events/event-1.jpg",
    summary: "The formal conferment of degrees, diplomas, and honorary doctorates for the graduating class of 2026.",
    description: "Join university leadership, faculty, graduating scholars, parents, and distinguished dignitaries as we celebrate the academic triumph of the class of 2026. The ceremony will feature the Chancellor's address, conferment of doctoral degrees, and presentation of the Vice Chancellor's Gold Medal.",
    speakers: [
      {
        name: "Dr. James Mworia, CBS",
        role: "University Chancellor",
        organization: "Zion University Governance Council"
      },
      {
        name: "Prof. Jeremiah Mutiso, PhD",
        role: "Vice Chancellor",
        organization: "Zion University"
      }
    ],
    registrationOpen: true,
    maxAttendees: 5000,
    registeredCount: 3840
  },
  {
    slug: "east-africa-ai-research-symposium-2026",
    title: "East Africa AI & Digital Sovereignty Symposium 2026",
    date: "2026-11-12",
    time: "09:00 AM - 05:00 PM EAT",
    campus: "Nairobi Main Campus",
    venue: "Chandaria Innovation Auditorium & Virtual Stream",
    category: "Conference",
    image: "/images/events/event-2.jpg",
    summary: "Leading researchers, policymakers, and tech pioneers discuss African LLMs, AI ethics, and data infrastructure.",
    description: "A two-day high-level research symposium bringing together computer scientists, legal experts, fintech founders, and government regulators to explore how artificial intelligence can be tailored for African economic sovereignty.",
    speakers: [
      {
        name: "Dr. Faith Chebet",
        role: "Senior AI Research Fellow",
        organization: "Centre for AI & Data Science Innovation (CADSI)"
      },
      {
        name: "Eng. Samuel Ndung'u, PhD",
        role: "Dean of Engineering",
        organization: "Zion University"
      },
      {
        name: "Hon. Prof. Peter Omondi, SC",
        role: "Dean of Law",
        organization: "Zion University School of Law"
      }
    ],
    registrationOpen: true,
    maxAttendees: 600,
    registeredCount: 482
  },
  {
    slug: "open-day-career-fair-2026",
    title: "University Open Day & Career Fair 2026 (Nairobi & Mombasa)",
    date: "2026-10-24",
    time: "09:00 AM - 04:00 PM EAT",
    campus: "Virtual & Hybrid",
    venue: "Simultaneous events at Nairobi Main Campus & Mombasa Coastal Campus",
    category: "Open Day",
    image: "/images/events/event-3.jpg",
    summary: "Explore degree programmes, meet faculty deans, tour state-of-the-art facilities, and receive on-the-spot admission assessments.",
    description: "Prospective undergraduate and postgraduate students, high school leavers, and working professionals are invited to explore over 80 accredited degree, diploma, and certificate programmes. Enjoy interactive science demonstrations, moot court exhibitions, scholarship consultations, and campus tours.",
    speakers: [
      {
        name: "Prof. Grace Wanjiku Kariuki",
        role: "Dean of Business & Economics",
        organization: "Zion University"
      },
      {
        name: "Prof. Dr. Mary Khakasa Simiyu",
        role: "Dean of Health Sciences",
        organization: "Zion University"
      }
    ],
    registrationOpen: true,
    maxAttendees: 1200,
    registeredCount: 910
  }
];

// 4 Alumni Profiles
export const alumniProfiles: AlumniProfile[] = [
  {
    id: "alumni-1",
    name: "CPA David Mutiso Maina",
    gradYear: 2014,
    degree: "Bachelor of Commerce (Finance Honours)",
    currentRole: "Chief Financial Officer",
    organization: "East African Development Bank (EADB)",
    image: "/images/alumni/alumni-1.jpg",
    quote: "Zion University gave me far more than financial formulas; it gave me the ethical backbone and strategic audacity to lead multi-billion shilling sovereign investment portfolios across the continent."
  },
  {
    id: "alumni-2",
    name: "Adv. Catherine Njeri Odhiambo",
    gradYear: 2016,
    degree: "Bachelor of Laws (LL.B First Class Honours)",
    currentRole: "Lead International Legal Counsel",
    organization: "African Continental Free Trade Area (AfCFTA) Secretariat",
    image: "/images/alumni/alumni-2.jpg",
    quote: "The moot court competitions and intensive legal research training at Zion School of Law prepared me directly to negotiate complex cross-border trade treaties in Accra and Addis Ababa."
  },
  {
    id: "alumni-3",
    name: "Eng. Brian Kiprono Cheruiyot",
    gradYear: 2018,
    degree: "B.Sc. Electrical & Electronic Engineering",
    currentRole: "Director of Clean Grid Infrastructure",
    organization: "KenGen (Kenya Electricity Generating Company)",
    image: "/images/alumni/alumni-3.jpg",
    quote: "Working hands-on in the Zion University renewable energy labs gave me the direct engineering competence to commission massive geothermal and solar installations powering Kenya's national grid."
  },
  {
    id: "alumni-4",
    name: "Dr. Evelyn Mwende Kilonzo",
    gradYear: 2019,
    degree: "B.Sc. Nursing & M.Sc. Public Health",
    currentRole: "Regional Health Advisor for Maternal Health",
    organization: "World Health Organization (WHO Africa)",
    image: "/images/alumni/alumni-4.jpg",
    quote: "The clinical hospital attachments and community health immersions at Zion University instilled in me an unshakable devotion to healthcare equity for every mother and child in East Africa."
  }
];

// Campus Life & Services
export const studentClubs = [
  {
    name: "Zion Debate Society & Model UN",
    category: "Academic & Leadership",
    members: 420,
    description: "East Africa championship-winning debate team representing Zion at world university championships."
  },
  {
    name: "Tech Innovators & AI League",
    category: "Technology & Coding",
    members: 650,
    description: "Weekly hackathons, open-source building, Google Developer Student Club chapter, and robotics competitions."
  },
  {
    name: "Kenya Red Cross University Chapter",
    category: "Humanitarian & Health",
    members: 380,
    description: "Community first-aid training, regular blood donation drives, and disaster relief volunteerism."
  },
  {
    name: "Zion Drama & Performing Arts Guild",
    category: "Culture & Arts",
    members: 290,
    description: "Annual university theater productions, Swahili poetry festivals, and music ensembles."
  },
  {
    name: "Environmental Action & Green Campus Club",
    category: "Sustainability",
    members: 340,
    description: "Tree planting initiatives, campus waste recycling systems, and coastal marine conservation cleanups in Mombasa."
  },
  {
    name: "Young Entrepreneurs & Business Society",
    category: "Enterprise",
    members: 510,
    description: "Startup pitch competitions, VC networking mixers, and student enterprise marketplace days."
  }
];

export const accommodationOptions = [
  {
    name: "Nairobi Main Campus Executive Hostels (Kilima Halls)",
    campus: "Nairobi",
    roomTypes: "Single, 2-Sharing, 4-Sharing",
    amenities: ["High-speed Wi-Fi (1Gbps)", "24/7 Biometric Security", "Hot Showers & Backup Solar", "Study Lounges & Laundry", "Catering & Meal Plans"],
    feePerSemester: "KES 28,000 - 45,000",
    image: "/images/campus/hostels.jpg"
  },
  {
    name: "Mombasa Coastal Oceanside Student Residences",
    campus: "Mombasa",
    roomTypes: "En-suite Studio, 2-Sharing",
    amenities: ["Ocean Breeze Balconies", "Air Conditioning", "High-speed Fibre Wi-Fi", "Swimming Pool Access", "Full Security & CCTV"],
    feePerSemester: "KES 32,000 - 52,000",
    image: "/images/campus/mombasa-campus.jpg"
  }
];

export const sportsFacilities = [
  "Olympic-size 50m heated swimming pool with certified lifeguards",
  "Standard FIFA-accredited football pitch with floodlights",
  "8-lane synthetic all-weather athletics track (home to university champions)",
  "Indoor sports arena for basketball, volleyball, badminton, and martial arts",
  "State-of-the-art cardiovascular and strength training gymnasium with certified instructors",
  "Lawn tennis and squash courts"
];

export const studentServices = [
  {
    title: "Dean of Students & Counseling Centre",
    description: "Confidential mental health counseling, personal development workshops, and emotional wellness support."
  },
  {
    title: "Career Development & Placement Services",
    description: "CV writing clinics, mock interviews, corporate internships, and annual career expos with 100+ employers."
  },
  {
    title: "Disability & Inclusion Resource Centre",
    description: "Assistive technologies, braille transcription, wheelchair accessibility ramps, and specialized examination accommodation."
  },
  {
    title: "University Health Clinics (24/7)",
    description: "Fully equipped outpatient clinics on both Nairobi and Mombasa campuses with resident medical officers and ambulances."
  }
];

// Contact Details
export const campusLocations = {
  nairobi: {
    name: "Nairobi Main Campus",
    tagline: "Academic Headquarters & Postgraduate Research Centre",
    address: "Zion Towers, University Way, P.O. Box 45290 - 00100, Nairobi, Kenya",
    phone: "+254 20 800 1200 / +254 112 272 061",
    email: "admissions@zion.ac.ke",
    hours: "Monday - Friday: 8:00 AM - 5:30 PM | Saturday: 8:30 AM - 1:00 PM",
    mapEmbed: "https://maps.google.com/maps?q=University+Way+Nairobi+Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  mombasa: {
    name: "Mombasa Coastal Satellite Campus",
    tagline: "Maritime, Blue Economy & Health Sciences Hub",
    address: "Ocean View Academic Park, Nkurumah Road, P.O. Box 90140 - 80100, Mombasa, Kenya",
    phone: "+254 41 400 3400 / +254 112 272 061",
    email: "mombasa@zion.ac.ke",
    hours: "Monday - Friday: 8:00 AM - 5:30 PM | Saturday: 8:30 AM - 1:00 PM",
    mapEmbed: "https://maps.google.com/maps?q=Nkrumah+Road+Mombasa+Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed"
  }
};
