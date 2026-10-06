import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { mockStudents } from "@/lib/mock-student-data";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized. Please log in to view student portal status." }, { status: 401 });
  }

  const studentNumber = (session.user as any).studentNumber || "ZU/2026/0491";
  const student = mockStudents[studentNumber] || mockStudents["ZU/2026/0491"];

  return NextResponse.json({
    studentNumber: student.studentNumber,
    fullName: student.fullName,
    programmeName: student.programmeName,
    facultyName: student.facultyName,
    campus: student.campus,
    applicationRef: student.applicationRef,
    applicationStatus: student.applicationStatus,
    applicationSteps: student.applicationSteps,
    documents: student.documents,
    notices: student.notices,
  });
}
