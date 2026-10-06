"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Calendar,
  DollarSign,
  FileText,
  Bell,
  Award,
  CheckCircle,
  Clock,
  Download,
  UploadCloud,
  LogOut,
  MapPin,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { mockStudents, StudentRecord } from "@/lib/mock-student-data";

export default function StudentPortalDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "tracker" | "fees" | "timetable" | "documents" | "notices" | "results"
  >("tracker");

  const [studentData, setStudentData] = useState<StudentRecord | null>(null);
  const [payAmount, setPayAmount] = useState<number>(25000);
  const [payPhone, setPayPhone] = useState("+254 712 345 678");
  const [payLoading, setPayLoading] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    } else if (status === "authenticated") {
      const studentNumber = (session.user as any)?.studentNumber || "ZU/2026/0491";
      const record = mockStudents[studentNumber] || mockStudents["ZU/2026/0491"];
      setStudentData(record);
    }
  }, [status, session, router]);

  if (status === "loading" || !studentData) {
    return (
      <div className="pt-32 pb-20 bg-[#0c1228] min-h-screen flex items-center justify-center text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 border-4 border-[#f5a425] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-white/70 font-bold">
            Loading Student Profile...
          </p>
        </div>
      </div>
    );
  }

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPayLoading(true);
    setTimeout(() => {
      setPayLoading(false);
      setPaySuccess(true);
      if (studentData) {
        setStudentData((prev) => {
          if (!prev) return prev;
          const newBalance = Math.max(0, prev.feeSummary.balanceKES - payAmount);
          const newPaid = prev.feeSummary.amountPaidKES + payAmount;
          return {
            ...prev,
            feeSummary: {
              ...prev.feeSummary,
              balanceKES: newBalance,
              amountPaidKES: newPaid,
              payments: [
                {
                  ref: `MPESA-${Date.now().toString(36).toUpperCase()}`,
                  method: "M-PESA Paybill",
                  amountKES: payAmount,
                  date: new Date().toISOString().split("T")[0],
                  status: "Confirmed",
                },
                ...prev.feeSummary.payments,
              ],
            },
          };
        });
      }
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Student Profile Header Card */}
        <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#162239] border-2 border-[#f5a425] flex items-center justify-center text-[#f5a425] shrink-0 shadow-lg">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-[#f5a425] text-[#0c1228]">
                  Enrolled Scholar
                </span>
                <span className="text-xs text-white/60 font-semibold">{studentData.studentNumber}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                {studentData.fullName}
              </h1>
              <p className="text-xs text-[#f5a425] font-semibold mt-0.5">
                {studentData.programmeName} • Year {studentData.yearOfStudy}, Sem {studentData.semester}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="text-left md:text-right px-4 py-2 bg-[#0c1228] border border-white/10 flex-1 md:flex-none">
              <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold">
                Assigned Campus
              </div>
              <div className="text-xs font-bold text-white flex items-center md:justify-end gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#f5a425]" />
                <span>{studentData.campus} Campus</span>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/portal/login" })}
              className="px-4 py-2.5 bg-white/5 border border-white/20 hover:bg-red-950/60 hover:border-red-500 text-xs font-bold uppercase tracking-wider text-white transition-colors flex items-center gap-2 min-h-[44px]"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Portal Tabs Bar - Horizontal Scroll on Mobile per specification */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-white/10 no-scrollbar">
          {[
            { id: "tracker", label: "Application Tracker", icon: ShieldCheck },
            { id: "fees", label: "Fee Balance & Invoices", icon: DollarSign },
            { id: "timetable", label: "Current Timetable", icon: Calendar },
            { id: "documents", label: "Uploaded Documents", icon: FileText },
            { id: "notices", label: "University Notices", icon: Bell },
            { id: "results", label: "Exam Transcript & GPA", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-xs uppercase font-bold tracking-wider whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] shrink-0 ${
                  isActive
                    ? "bg-[#f5a425] text-[#0c1228] shadow-lg"
                    : "bg-[#18233a] text-white/80 hover:text-white hover:bg-white/5 border border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Application Tracker */}
        {activeTab === "tracker" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
                    Admissions Progress Pipeline
                  </span>
                  <h2 className="text-xl font-bold uppercase text-white mt-1">
                    Application Status: {studentData.applicationStatus}
                  </h2>
                </div>
                <div className="px-3.5 py-1.5 bg-[#0c1228] border border-[#f5a425]/50 text-xs text-[#f5a425] font-bold">
                  Ref: {studentData.applicationRef}
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-6">
                {studentData.applicationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#f5a425] text-[#0c1228] flex items-center justify-center font-black text-xs shrink-0 shadow">
                        ✓
                      </div>
                      {idx < studentData.applicationSteps.length - 1 && (
                        <div className="w-0.5 h-12 bg-[#f5a425]/50 my-1" />
                      )}
                    </div>
                    <div className="bg-[#162239] border border-white/10 p-4 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-white">{step.title}</h4>
                        <span className="text-[11px] text-white/50">{step.date}</span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Fee Balance & Payment */}
        {activeTab === "fees" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Fee Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#18233a] border border-white/10 p-6 shadow-xl">
                <div className="text-xs uppercase font-bold tracking-wider text-white/60 mb-1">
                  Total Semester Billed
                </div>
                <div className="text-2xl font-black text-white">
                  KES {studentData.feeSummary.totalBilledKES.toLocaleString()}
                </div>
              </div>

              <div className="bg-[#18233a] border border-white/10 p-6 shadow-xl">
                <div className="text-xs uppercase font-bold tracking-wider text-green-400 mb-1">
                  Total Amount Paid
                </div>
                <div className="text-2xl font-black text-green-400">
                  KES {studentData.feeSummary.amountPaidKES.toLocaleString()}
                </div>
              </div>

              <div className="bg-[#18233a] border border-[#f5a425] p-6 shadow-xl bg-gradient-to-br from-[#18233a] to-[#0c1228]">
                <div className="text-xs uppercase font-bold tracking-wider text-[#f5a425] mb-1">
                  Outstanding Balance
                </div>
                <div className="text-2xl font-black text-[#f5a425]">
                  KES {studentData.feeSummary.balanceKES.toLocaleString()}
                </div>
                <div className="text-[11px] text-white/50 mt-1">
                  Due before: {studentData.feeSummary.dueDate}
                </div>
              </div>
            </div>

            {/* Invoices and Payments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Invoices List */}
              <div className="lg:col-span-7 bg-[#18233a] border border-white/10 p-6 shadow-xl">
                <h3 className="text-base font-bold uppercase text-white mb-4">
                  Semester Invoices & Breakdown
                </h3>
                <div className="space-y-3">
                  {studentData.feeSummary.invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-3.5 bg-[#162239] border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{inv.description}</div>
                        <div className="text-white/50 text-[11px]">Invoice #{inv.id} • {inv.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">KES {inv.amountKES.toLocaleString()}</div>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 ${
                            inv.status === "Paid"
                              ? "bg-green-950 text-green-300"
                              : "bg-[#f5a425]/20 text-[#f5a425]"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-base font-bold uppercase text-white mt-8 mb-4">
                  Payment History & Receipts
                </h3>
                <div className="space-y-3">
                  {studentData.feeSummary.payments.map((pmt, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-[#162239] border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{pmt.method}</div>
                        <div className="text-white/50 text-[11px]">Ref: {pmt.ref} • {pmt.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">
                          + KES {pmt.amountKES.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-green-300 font-bold uppercase">
                          {pmt.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant M-PESA Paybill Simulation */}
              <div className="lg:col-span-5 bg-[#18233a] border border-white/10 p-6 shadow-xl">
                <h3 className="text-base font-bold uppercase text-white mb-2">
                  Make Instant Fee Payment
                </h3>
                <p className="text-xs text-white/70 mb-4">
                  Pay directly via Safaricom M-PESA Paybill or Banking Gateway.
                </p>

                <div className="p-3 bg-[#0c1228] border border-white/10 mb-4 text-xs space-y-1">
                  <div>
                    <span className="text-white/60">M-PESA Business Paybill:</span>{" "}
                    <span className="font-bold text-[#f5a425]">522522</span>
                  </div>
                  <div>
                    <span className="text-white/60">Account Number:</span>{" "}
                    <span className="font-bold text-white">{studentData.studentNumber}</span>
                  </div>
                </div>

                {paySuccess ? (
                  <div className="p-4 bg-green-950/80 border border-green-500 text-center animate-in fade-in">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-sm font-bold text-green-200">
                      Payment of KES {payAmount.toLocaleString()} Received!
                    </div>
                    <p className="text-xs text-green-300 mt-1">
                      Your fee ledger has been updated instantly.
                    </p>
                    <button
                      onClick={() => setPaySuccess(false)}
                      className="mt-3 text-xs text-white underline font-bold"
                    >
                      Make Another Payment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSimulatePayment} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                        Amount to Pay (KES)
                      </label>
                      <input
                        type="number"
                        min="1000"
                        max="200000"
                        value={payAmount}
                        onChange={(e) => setPayAmount(parseInt(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                        M-PESA Phone Number
                      </label>
                      <input
                        type="tel"
                        value={payPhone}
                        onChange={(e) => setPayPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={payLoading}
                      className="btn-zion w-full justify-center text-xs uppercase font-bold py-3 bg-[#25D366] text-[#0c1228] hover:bg-[#20b858]"
                    >
                      {payLoading ? "Processing M-PESA STK Push..." : `Pay KES ${payAmount.toLocaleString()} via M-PESA`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Timetable */}
        {activeTab === "timetable" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
                    Semester Schedule
                  </span>
                  <h2 className="text-xl font-bold uppercase text-white mt-1">
                    Current Semester Timetable
                  </h2>
                </div>
                <div className="text-xs text-white/70">
                  Year {studentData.yearOfStudy} Trimester 1 (Nairobi Campus)
                </div>
              </div>

              {/* Day Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-white/10">
                {studentData.timetable.map((t) => (
                  <button
                    key={t.day}
                    onClick={() => setSelectedDay(t.day)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                      selectedDay === t.day
                        ? "bg-[#f5a425] text-[#0c1228]"
                        : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {t.day}
                  </button>
                ))}
              </div>

              {/* Scheduled Classes for Selected Day */}
              {(() => {
                const daySchedule = studentData.timetable.find((t) => t.day === selectedDay);
                if (!daySchedule || daySchedule.courses.length === 0) {
                  return (
                    <div className="p-8 text-center text-xs text-white/60">
                      No scheduled lectures for {selectedDay}. Free for personal study or lab assignments.
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {daySchedule.courses.map((course, i) => (
                      <div
                        key={i}
                        className="bg-[#162239] border border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#f5a425] transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#f5a425]/20 text-[#f5a425]">
                              {course.code}
                            </span>
                            <span className="text-xs text-white/60 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#f5a425]" />
                              {course.time}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white">{course.name}</h4>
                          <div className="text-xs text-white/70 mt-1">
                            <span className="text-white/50">Lecturer:</span> {course.lecturer}
                          </div>
                        </div>

                        <div className="px-3.5 py-1.5 bg-[#0c1228] border border-white/10 text-xs font-bold text-[#f5a425] flex items-center gap-1.5 shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{course.venue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 4: Uploaded Documents */}
        {activeTab === "documents" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <div className="border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
                  Vercel Blob Storage Records
                </span>
                <h2 className="text-xl font-bold uppercase text-white mt-1">
                  Uploaded Verification Documents
                </h2>
                <p className="text-xs text-white/70 mt-1">
                  All authenticated credentials stored securely in compliance with the Kenya Data Protection Act 2019.
                </p>
              </div>

              <div className="space-y-4">
                {studentData.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-[#162239] border border-white/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/5 border border-white/10 text-[#f5a425]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                        <div className="text-[11px] text-white/50">
                          {doc.type} • Uploaded on {doc.uploadDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-green-950 text-green-300 border border-green-800 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{doc.status}</span>
                      </span>
                      <button className="text-xs font-bold uppercase text-[#f5a425] hover:text-[#ffb834] flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: University Notices */}
        {activeTab === "notices" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <div className="border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
                  Official Bulletin
                </span>
                <h2 className="text-xl font-bold uppercase text-white mt-1">
                  University Announcements & Notices
                </h2>
              </div>

              <div className="space-y-4">
                {studentData.notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-[#162239] border border-white/10 p-5 hover:border-[#f5a425] transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                          notice.priority === "Urgent"
                            ? "bg-red-950 text-red-300 border border-red-700"
                            : "bg-[#f5a425]/20 text-[#f5a425]"
                        }`}
                      >
                        {notice.category} • {notice.priority}
                      </span>
                      <span className="text-xs text-white/50">{notice.date}</span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{notice.title}</h4>
                    <p className="text-xs text-white/80 leading-relaxed">{notice.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Exam Results & Transcript */}
        {activeTab === "results" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* GPA Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#18233a] border border-white/10 p-6 shadow-xl">
                <div className="text-xs uppercase font-bold tracking-wider text-white/60 mb-1">
                  Cumulative Grade Point Average (CGPA)
                </div>
                <div className="text-3xl font-black text-[#f5a425]">
                  3.85 <span className="text-sm font-normal text-white/50">/ 4.00</span>
                </div>
                <div className="text-xs text-green-400 font-bold mt-1">
                  Standing: First Class Honours Track
                </div>
              </div>

              <div className="bg-[#18233a] border border-white/10 p-6 shadow-xl">
                <div className="text-xs uppercase font-bold tracking-wider text-white/60 mb-1">
                  Completed Credit Units
                </div>
                <div className="text-3xl font-black text-white">
                  38 <span className="text-sm font-normal text-white/50">Credits</span>
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Total required for B.Sc. graduation: 128 Credits
                </div>
              </div>
            </div>

            {/* Detailed Transcript Tables */}
            {studentData.examResults.map((sem, idx) => (
              <div key={idx} className="bg-[#18233a] border border-white/10 p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold uppercase text-white">
                      {sem.semesterName}
                    </h3>
                    <div className="text-xs text-white/60">Semester GPA: {sem.gpa.toFixed(2)}</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-white border border-white/10">
                    <thead className="bg-[#162239] uppercase font-bold text-white/80 border-b border-white/10">
                      <tr>
                        <th className="p-3">Course Code</th>
                        <th className="p-3">Course Title</th>
                        <th className="p-3">Credits</th>
                        <th className="p-3">Grade</th>
                        <th className="p-3 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {sem.courses.map((c, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="p-3 font-bold text-[#f5a425]">{c.code}</td>
                          <td className="p-3 font-semibold text-white">{c.name}</td>
                          <td className="p-3 text-white/70">{c.credits}</td>
                          <td className="p-3 font-bold text-green-400">{c.grade}</td>
                          <td className="p-3 text-right font-bold text-white">{c.points.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
