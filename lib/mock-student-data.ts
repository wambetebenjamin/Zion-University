export interface StudentRecord {
  id: string;
  studentNumber: string;
  nationalId: string;
  fullName: string;
  email: string;
  phone: string;
  programmeName: string;
  facultyName: string;
  campus: "Nairobi" | "Mombasa";
  yearOfStudy: number;
  semester: number;
  applicationRef: string;
  applicationStatus: "Submitted" | "Under Review" | "Verified" | "Offer Issued" | "Enrolled";
  applicationSteps: {
    title: string;
    description: string;
    date: string;
    status: "completed" | "current" | "upcoming";
  }[];
  feeSummary: {
    totalBilledKES: number;
    amountPaidKES: number;
    balanceKES: number;
    dueDate: string;
    invoices: {
      id: string;
      description: string;
      amountKES: number;
      date: string;
      status: "Paid" | "Pending" | "Partially Paid";
    }[];
    payments: {
      ref: string;
      method: "M-PESA Paybill" | "KCB Bank Wire" | "Stanbic Bank Wire" | "Scholarship Credit";
      amountKES: number;
      date: string;
      status: "Confirmed";
    }[];
  };
  timetable: {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
    courses: {
      code: string;
      name: string;
      time: string;
      venue: string;
      lecturer: string;
    }[];
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: "Verified" | "Under Review" | "Action Required";
    downloadUrl: string;
  }[];
  notices: {
    id: string;
    title: string;
    date: string;
    category: "Academic" | "Finance" | "Examinations" | "Campus Life";
    content: string;
    priority: "Normal" | "High" | "Urgent";
  }[];
  examResults: {
    semesterName: string;
    gpa: number;
    cumulativeGpa: number;
    courses: {
      code: string;
      name: string;
      credits: number;
      grade: string;
      points: number;
    }[];
  }[];
}

export const mockStudents: Record<string, StudentRecord> = {
  "ZU/2026/0491": {
    id: "stu-001",
    studentNumber: "ZU/2026/0491",
    nationalId: "38491024",
    fullName: "Amina Sharon Mwangi",
    email: "student@zion.ac.ke",
    phone: "+254 712 345 678",
    programmeName: "B.Sc. Computer Science & Artificial Intelligence",
    facultyName: "School of Engineering and Technology",
    campus: "Nairobi",
    yearOfStudy: 2,
    semester: 1,
    applicationRef: "ZU-2026-NBO-8831",
    applicationStatus: "Enrolled",
    applicationSteps: [
      {
        title: "Application Submitted Online",
        description: "Application details and academic certificates uploaded via Zion Portal.",
        date: "2026-06-14",
        status: "completed"
      },
      {
        title: "Document Verification",
        description: "KNEC KCSE results slip & National ID authenticated by Registrar of Admissions.",
        date: "2026-06-20",
        status: "completed"
      },
      {
        title: "Faculty Board Assessment",
        description: "School of Engineering Dean's Committee approval for STEM intake.",
        date: "2026-06-28",
        status: "completed"
      },
      {
        title: "Letter of Admission Issued",
        description: "Official Letter of Offer and Student Fee Structure generated.",
        date: "2026-07-05",
        status: "completed"
      },
      {
        title: "Registration & Biometric ID",
        description: "Fees cleared, medical form verified, and student smartcard issued.",
        date: "2026-08-15",
        status: "completed"
      }
    ],
    feeSummary: {
      totalBilledKES: 165000,
      amountPaidKES: 140000,
      balanceKES: 25000,
      dueDate: "2026-11-15",
      invoices: [
        {
          id: "INV-2026-101",
          description: "Tuition Fee - Year 2 Semester 1",
          amountKES: 135000,
          date: "2026-08-10",
          status: "Paid"
        },
        {
          id: "INV-2026-102",
          description: "Computer Lab, Robotics & AI Systems Levies",
          amountKES: 20000,
          date: "2026-08-10",
          status: "Paid"
        },
        {
          id: "INV-2026-103",
          description: "Student Activity & Campus Health Insurance",
          amountKES: 10000,
          date: "2026-08-10",
          status: "Pending"
        }
      ],
      payments: [
        {
          ref: "QK84HD8201",
          method: "M-PESA Paybill",
          amountKES: 80000,
          date: "2026-08-12",
          status: "Confirmed"
        },
        {
          ref: "KCB-TX-991204",
          method: "KCB Bank Wire",
          amountKES: 60000,
          date: "2026-08-25",
          status: "Confirmed"
        }
      ]
    },
    timetable: [
      {
        day: "Monday",
        courses: [
          {
            code: "CSC 210",
            name: "Data Structures and Algorithms",
            time: "08:00 AM - 11:00 AM",
            venue: "Towers Lab 4A (Nairobi)",
            lecturer: "Dr. Faith Chebet"
          },
          {
            code: "MAT 221",
            name: "Linear Algebra & Vector Calculus",
            time: "01:00 PM - 04:00 PM",
            venue: "Lecture Hall 2 (Main Hall)",
            lecturer: "Dr. Peter Kimani"
          }
        ]
      },
      {
        day: "Tuesday",
        courses: [
          {
            code: "CSC 224",
            name: "Object-Oriented Programming (Java & C++)",
            time: "09:00 AM - 12:00 PM",
            venue: "Software Engineering Studio",
            lecturer: "Prof. Samuel Ndung'u"
          },
          {
            code: "ENS 201",
            name: "Digital Logic & Microprocessors",
            time: "02:00 PM - 05:00 PM",
            venue: "Hardware & IoT Lab 1",
            lecturer: "Eng. Brian Cheruiyot"
          }
        ]
      },
      {
        day: "Wednesday",
        courses: [
          {
            code: "CSC 230",
            name: "Relational Database Management Systems",
            time: "08:30 AM - 11:30 AM",
            venue: "Towers Lab 3B",
            lecturer: "Dr. Edwin Mutua"
          },
          {
            code: "IRL 101",
            name: "Ethics & Governance in Technological Society",
            time: "01:30 PM - 03:30 PM",
            venue: "Auditorium A",
            lecturer: "Prof. Amina Mwidau"
          }
        ]
      },
      {
        day: "Thursday",
        courses: [
          {
            code: "CSC 210",
            name: "DSA Practicum & LeetCode Lab",
            time: "09:00 AM - 12:00 PM",
            venue: "High Performance Compute Centre",
            lecturer: "Dr. Faith Chebet"
          },
          {
            code: "CSC 240",
            name: "Computer Networks & TCP/IP Architecture",
            time: "02:00 PM - 05:00 PM",
            venue: "Telecommunications Hall 1",
            lecturer: "Eng. Moses Kibiwott"
          }
        ]
      },
      {
        day: "Friday",
        courses: [
          {
            code: "CSC 250",
            name: "Artificial Intelligence Foundations & Python",
            time: "09:00 AM - 12:00 PM",
            venue: "Chandaria Innovation Hub",
            lecturer: "Dr. Faith Chebet"
          }
        ]
      }
    ],
    documents: [
      {
        id: "doc-1",
        name: "KCSE Secondary Certificate (A- Plain)",
        type: "PDF Document",
        uploadDate: "2026-06-14",
        status: "Verified",
        downloadUrl: "#"
      },
      {
        id: "doc-2",
        name: "National ID Card Scan (Dual Sided)",
        type: "PDF Document",
        uploadDate: "2026-06-14",
        status: "Verified",
        downloadUrl: "#"
      },
      {
        id: "doc-3",
        name: "Passport Size Photograph (Digital)",
        type: "JPEG Image",
        uploadDate: "2026-06-14",
        status: "Verified",
        downloadUrl: "#"
      },
      {
        id: "doc-4",
        name: "Medical Examination Health Fitness Certificate",
        type: "PDF Document",
        uploadDate: "2026-08-14",
        status: "Verified",
        downloadUrl: "#"
      }
    ],
    notices: [
      {
        id: "not-1",
        title: "End of Trimester Examination Timetable Released",
        date: "2026-10-04",
        category: "Examinations",
        content: "Draft timetable for October-November 2026 examinations is now published. Please report any clash to your Head of Department before 15th October.",
        priority: "High"
      },
      {
        id: "not-2",
        title: "Zion Annual Hackathon & Career Expo Registration Open",
        date: "2026-10-02",
        category: "Campus Life",
        content: "Join over 50 tech startups and multinational employers at Chandaria Pavilion. Cash prizes of KES 500,000 for top robotics and AI prototypes.",
        priority: "Normal"
      },
      {
        id: "not-3",
        title: "Deadline for Semester Fee Balance Clearance",
        date: "2026-09-25",
        category: "Finance",
        content: "All students are reminded to ensure outstanding fee balances are cleared before examination card generation commences on November 15th.",
        priority: "Urgent"
      }
    ],
    examResults: [
      {
        semesterName: "Year 1 Semester 2 (Jan - May 2026)",
        gpa: 3.82,
        cumulativeGpa: 3.85,
        courses: [
          { code: "CSC 120", name: "Structured Programming in C", credits: 3, grade: "A", points: 4.0 },
          { code: "CSC 122", name: "Discrete Mathematical Structures", credits: 3, grade: "A", points: 4.0 },
          { code: "MAT 121", name: "Calculus II", credits: 3, grade: "A-", points: 3.7 },
          { code: "PHY 112", name: "Electricity & Magnetism for Computing", credits: 3, grade: "B+", points: 3.3 },
          { code: "ENG 102", name: "Technical Communication & Writing", credits: 3, grade: "A", points: 4.0 }
        ]
      },
      {
        semesterName: "Year 1 Semester 1 (Sep - Dec 2025)",
        gpa: 3.88,
        cumulativeGpa: 3.88,
        courses: [
          { code: "CSC 110", name: "Introduction to Computer Science", credits: 3, grade: "A", points: 4.0 },
          { code: "MAT 111", name: "Calculus I", credits: 3, grade: "A", points: 4.0 },
          { code: "PHY 111", name: "General Physics for Engineers", credits: 3, grade: "A-", points: 3.7 },
          { code: "CSC 112", name: "Computer Systems Architecture", credits: 3, grade: "A", points: 4.0 }
        ]
      }
    ]
  }
};
