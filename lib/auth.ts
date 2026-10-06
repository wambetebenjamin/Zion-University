import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockStudents } from "./mock-student-data";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Student ID / Portal Credentials",
      credentials: {
        identifier: { label: "Student ID / Email", type: "text", placeholder: "student@zion.ac.ke or ZU/2026/0491" },
        password: { label: "Password", type: "password", placeholder: "••••••••" }
      },
      async authorize(credentials) {
        if (!credentials?.identifier) {
          return null;
        }

        const id = credentials.identifier.trim();
        // Check if matching email or studentNumber
        let matched = Object.values(mockStudents).find(
          (s) => s.email.toLowerCase() === id.toLowerCase() || s.studentNumber.toLowerCase() === id.toLowerCase()
        );

        // Fallback default student profile for any valid test input
        if (!matched) {
          matched = mockStudents["ZU/2026/0491"];
        }

        return {
          id: matched.id,
          name: matched.fullName,
          email: matched.email,
          studentNumber: matched.studentNumber,
          role: "student",
          campus: matched.campus,
          programme: matched.programmeName,
        } as any;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "student";
        token.studentNumber = (user as any).studentNumber;
        token.campus = (user as any).campus;
        token.programme = (user as any).programme;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).studentNumber = token.studentNumber;
        (session.user as any).campus = token.campus;
        (session.user as any).programme = token.programme;
      }
      return session;
    }
  },
  pages: {
    signIn: "/portal/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "zion-university-super-secret-key-2026",
};
