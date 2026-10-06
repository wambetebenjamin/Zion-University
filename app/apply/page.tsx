"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  GraduationCap,
  BookOpen,
  UploadCloud,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Send,
} from "lucide-react";
import { faculties } from "@/lib/data";

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const initialFaculty = searchParams.get("faculty") || "business-and-economics";
  const initialProg = searchParams.get("programme") || "";

  const [step, setStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: "",
    dateOfBirth: "",
    gender: "Female",
    nationality: "Kenyan",
    nationalId: "",
    phone: "",
    email: "",
    postalAddress: "",

    // Step 2: Academic Background
    previousSchool: "",
    qualification: "KCSE (Kenya Certificate of Secondary Education)",
    gradeAchieved: "B+",
    yearCompleted: "2025",
    certificateFileName: "",

    // Step 3: Programme Selection
    facultySlug: initialFaculty,
    programmeId: initialProg || "bba",
    campus: "Nairobi",
    studyMode: "Full Time",
    intakePeriod: "January 2027 Main Intake",

    // Step 4: Documents
    idUploadFileName: "",
    passportPhotoFileName: "",
    extraCertFileName: "",

    // Agreements
    termsAgreed: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    academicCert?: string;
    idDoc?: string;
    passportPhoto?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaFallback, setCaptchaFallback] = useState(false);
  const [captchaV2Checked, setCaptchaV2Checked] = useState(false);

  // Selected faculty & programmes list
  const currentFaculty = faculties.find((f) => f.slug === formData.facultySlug) || faculties[0];
  const availableProgrammes = currentFaculty.programmes;

  // Auto-set first programme if changed
  useEffect(() => {
    if (!availableProgrammes.some((p) => p.id === formData.programmeId)) {
      if (availableProgrammes.length > 0) {
        setFormData((prev) => ({ ...prev, programmeId: availableProgrammes[0].id }));
      }
    }
  }, [formData.facultySlug, availableProgrammes]);

  const handleNext = () => {
    // Step validation
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.nationalId) {
        setErrorMsg("Please complete all required personal details.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.previousSchool || !formData.gradeAchieved) {
        setErrorMsg("Please specify your previous school and grade achieved.");
        return;
      }
    }
    if (step === 3) {
      if (!formData.facultySlug || !formData.programmeId) {
        setErrorMsg("Please select your preferred faculty and programme.");
        return;
      }
    }

    setErrorMsg("");
    setSlideDirection("next");
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setErrorMsg("");
    setSlideDirection("prev");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Simulated file upload to Vercel Blob
  const handleFileUpload = (field: string, file: File | null) => {
    if (!file) return;
    const fileName = file.name;
    if (field === "academicCert") {
      setFormData((prev) => ({ ...prev, certificateFileName: fileName }));
      setUploadedFiles((prev) => ({
        ...prev,
        academicCert: `https://blob.zion.ac.ke/uploads/${Date.now()}-${fileName}`,
      }));
    } else if (field === "idDoc") {
      setFormData((prev) => ({ ...prev, idUploadFileName: fileName }));
      setUploadedFiles((prev) => ({
        ...prev,
        idDoc: `https://blob.zion.ac.ke/uploads/${Date.now()}-${fileName}`,
      }));
    } else if (field === "passportPhoto") {
      setFormData((prev) => ({ ...prev, passportPhotoFileName: fileName }));
      setUploadedFiles((prev) => ({
        ...prev,
        passportPhoto: `https://blob.zion.ac.ke/uploads/${Date.now()}-${fileName}`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAgreed) {
      setErrorMsg("Please accept the Zion University application terms and code of conduct.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const selectedProgObj = availableProgrammes.find((p) => p.id === formData.programmeId);

      const captchaToken = captchaFallback
        ? captchaV2Checked
          ? "mock-recaptcha-v2-verified"
          : ""
        : "mock-recaptcha-token";

      const payload = {
        ...formData,
        programmeName: selectedProgObj ? selectedProgObj.name : formData.programmeId,
        facultyName: currentFaculty.name,
        documents: uploadedFiles,
        captchaToken,
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.challengeNeeded) {
          setCaptchaFallback(true);
          setErrorMsg("Please complete the security checkbox challenge below to finish.");
        } else {
          setErrorMsg(data.error || "Failed to submit application");
        }
        setLoading(false);
        return;
      }

      setSubmissionResult(data);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f5a425]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#f5a425]">Online Application Form</span>
      </div>

      {/* Header Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
          2026/2027 Academic Admissions
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">
          Online Student Application
        </h1>
        <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-xl mx-auto">
          Complete the 5-step form below to apply for undergraduate, postgraduate, or diploma programmes.
        </p>
      </div>

      {submitted ? (
        /* Step 5: Submission Success Screen */
        <div className="bg-[#18233a] border border-[#f5a425] p-8 sm:p-12 text-center shadow-2xl animate-in fade-in">
          <CheckCircle className="w-16 h-16 text-[#f5a425] mx-auto mb-4 animate-bounce" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425] bg-[#f5a425]/20 px-3 py-1">
            Application Successfully Lodged
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-4 mb-2">
            Congratulations, {formData.fullName}!
          </h2>
          <p className="text-sm text-white/80 max-w-lg mx-auto leading-relaxed mb-6">
            Your official application has been recorded in the Zion University Admissions Registry.
            A confirmation email and WhatsApp notification with your reference number have been dispatched.
          </p>

          <div className="bg-[#0c1228] border border-white/10 p-6 max-w-md mx-auto mb-8 text-left">
            <div className="text-xs text-white/60 uppercase font-bold mb-1">Application Reference:</div>
            <div className="text-2xl font-black text-[#f5a425] mb-4">
              {submissionResult?.applicationRef || "ZU-2026-NBO-8831"}
            </div>

            <div className="space-y-2 text-xs text-white/80 border-t border-white/10 pt-3">
              <div>
                <span className="text-white/60">Applicant:</span> {formData.fullName}
              </div>
              <div>
                <span className="text-white/60">Selected Programme:</span>{" "}
                {availableProgrammes.find((p) => p.id === formData.programmeId)?.name}
              </div>
              <div>
                <span className="text-white/60">Campus:</span> {formData.campus} Campus
              </div>
              <div>
                <span className="text-white/60">Study Mode:</span> {formData.studyMode}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/portal"
              className="btn-zion shadow-gold text-xs font-bold uppercase tracking-wider px-6 py-3.5"
            >
              <span>Track Status in Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="btn-zion-outline text-xs font-bold uppercase tracking-wider px-6 py-3.5"
            >
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Multi-Step Application Form Card */
        <div className="bg-[#18233a] border border-white/10 p-6 sm:p-10 shadow-2xl relative">
          {/* Step Progress Indicator (5 Steps) */}
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-[#f5a425] -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />

              {[
                { n: 1, label: "Personal" },
                { n: 2, label: "Academic" },
                { n: 3, label: "Programme" },
                { n: 4, label: "Documents" },
                { n: 5, label: "Review" },
              ].map((s) => (
                <div key={s.n} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      step >= s.n
                        ? "bg-[#f5a425] text-[#0c1228] shadow-lg ring-4 ring-[#18233a]"
                        : "bg-[#0c1228] text-white/50 border border-white/20"
                    }`}
                  >
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span className="hidden sm:block text-[11px] font-bold uppercase tracking-wider text-white/70 mt-2">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-950/80 border border-red-500 text-xs text-red-200 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step Container */}
          <div className="transition-all duration-300 ease-out">
            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-[#f5a425]" />
                    <span>Step 1: Personal Details</span>
                  </h2>
                  <p className="text-xs text-white/60">
                    Enter your official identity details matching your National ID or Passport.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="As shown on ID/Passport"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other / Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Nationality *
                    </label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      placeholder="e.g. Kenyan"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      National ID / Passport No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nationalId}
                      onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                      placeholder="e.g. 38492014"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Mobile Phone (WhatsApp Active) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 700 000 000"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="applicant@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                    Permanent Postal / Physical Address
                  </label>
                  <input
                    type="text"
                    value={formData.postalAddress}
                    onChange={(e) => setFormData({ ...formData, postalAddress: e.target.value })}
                    placeholder="P.O. Box 1234 - 00100 Nairobi"
                    className="w-full px-3.5 py-2.5 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Academic Background */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#f5a425]" />
                    <span>Step 2: Academic Background</span>
                  </h2>
                  <p className="text-xs text-white/60">
                    Provide details on your most recent secondary or tertiary academic qualifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Previous High School / College *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.previousSchool}
                      onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                      placeholder="e.g. Alliance High School / Nairobi School"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Exam Qualification Type *
                    </label>
                    <select
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="KCSE (Kenya Certificate of Secondary Education)">
                        KCSE (Kenya Certificate of Secondary Education)
                      </option>
                      <option value="GCE A-Levels / Cambridge International">
                        GCE A-Levels / Cambridge International
                      </option>
                      <option value="International Baccalaureate (IB)">
                        International Baccalaureate (IB)
                      </option>
                      <option value="Recognized Diploma / TVET Certificate">
                        Recognized Diploma / TVET Certificate
                      </option>
                      <option value="Bachelor's Degree (For Postgraduate Applicants)">
                        Bachelor's Degree (For Postgraduate Applicants)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Overall Grade Achieved / Points *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.gradeAchieved}
                      onChange={(e) => setFormData({ ...formData, gradeAchieved: e.target.value })}
                      placeholder="e.g. A-, B+, 68 points, or Upper 2nd"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Year of Completion *
                    </label>
                    <input
                      type="number"
                      required
                      min="1980"
                      max="2026"
                      value={formData.yearCompleted}
                      onChange={(e) => setFormData({ ...formData, yearCompleted: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Academic Certificate PDF Upload */}
                <div className="p-4 bg-[#0c1228] border border-dashed border-white/20">
                  <label className="block text-xs font-bold uppercase text-[#f5a425] mb-2 flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload KCSE / Academic Certificate Slip (PDF / Image)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload("academicCert", e.target.files?.[0] || null)}
                    className="w-full text-xs text-white/70 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:bg-[#f5a425] file:text-[#0c1228] hover:file:bg-[#ffb834] cursor-pointer"
                  />
                  {formData.certificateFileName && (
                    <div className="mt-2 text-xs text-[#f5a425] font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Ready: {formData.certificateFileName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Programme Selection */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#f5a425]" />
                    <span>Step 3: Programme & Campus Selection</span>
                  </h2>
                  <p className="text-xs text-white/60">
                    Choose your academic faculty, specific degree/diploma programme, campus and schedule.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      School / Faculty *
                    </label>
                    <select
                      value={formData.facultySlug}
                      onChange={(e) => setFormData({ ...formData, facultySlug: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    >
                      {faculties.map((f) => (
                        <option key={f.slug} value={f.slug}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Programme of Study *
                    </label>
                    <select
                      value={formData.programmeId}
                      onChange={(e) => setFormData({ ...formData, programmeId: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    >
                      {availableProgrammes.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.level})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Campus Preference *
                    </label>
                    <select
                      value={formData.campus}
                      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="Nairobi">Nairobi Main Campus</option>
                      <option value="Mombasa">Mombasa Coastal Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Study Mode *
                    </label>
                    <select
                      value={formData.studyMode}
                      onChange={(e) => setFormData({ ...formData, studyMode: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="Full Time">Full Time (Day)</option>
                      <option value="Part Time">Part Time (Evening / Weekend)</option>
                      <option value="Hybrid / Virtual">Hybrid / Virtual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-white/80 mb-1">
                      Intake Cohort *
                    </label>
                    <select
                      value={formData.intakePeriod}
                      onChange={(e) => setFormData({ ...formData, intakePeriod: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="January 2027 Main Intake">January 2027 Main Intake</option>
                      <option value="May 2027 Trimester Intake">May 2027 Trimester Intake</option>
                      <option value="September 2027 Intake">September 2027 Intake</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Supporting Documents Uploads */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-[#f5a425]" />
                    <span>Step 4: Supporting Documents (Vercel Blob Storage)</span>
                  </h2>
                  <p className="text-xs text-white/60">
                    Upload clear scans of your identification and academic credentials.
                  </p>
                </div>

                <div className="p-4 bg-[#0c1228] border border-white/10">
                  <label className="block text-xs font-bold uppercase text-white mb-2">
                    1. National ID Card / Passport Scan (PDF / JPG) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload("idDoc", e.target.files?.[0] || null)}
                    className="w-full text-xs text-white/70 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:bg-[#f5a425] file:text-[#0c1228] hover:file:bg-[#ffb834] cursor-pointer"
                  />
                  {formData.idUploadFileName && (
                    <div className="mt-2 text-xs text-[#f5a425] font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Uploaded: {formData.idUploadFileName}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#0c1228] border border-white/10">
                  <label className="block text-xs font-bold uppercase text-white mb-2">
                    2. Recent Passport Size Photograph (JPG / PNG) *
                  </label>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload("passportPhoto", e.target.files?.[0] || null)}
                    className="w-full text-xs text-white/70 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:bg-[#f5a425] file:text-[#0c1228] hover:file:bg-[#ffb834] cursor-pointer"
                  />
                  {formData.passportPhotoFileName && (
                    <div className="mt-2 text-xs text-[#f5a425] font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Uploaded: {formData.passportPhotoFileName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 5: Review & Submit */}
            {step === 5 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#f5a425]" />
                    <span>Step 5: Review & Submit Application</span>
                  </h2>
                  <p className="text-xs text-white/60">
                    Please verify all entered details before final submission to the Admissions Office.
                  </p>
                </div>

                <div className="bg-[#0c1228] border border-white/10 p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-white/60 font-semibold">Applicant Name:</span>
                      <div className="font-bold text-white text-sm">{formData.fullName}</div>
                    </div>
                    <div>
                      <span className="text-white/60 font-semibold">Email & Phone:</span>
                      <div className="text-white font-medium">{formData.email} • {formData.phone}</div>
                    </div>
                    <div>
                      <span className="text-white/60 font-semibold">National ID / Passport:</span>
                      <div className="text-white font-medium">{formData.nationalId} ({formData.nationality})</div>
                    </div>
                    <div>
                      <span className="text-white/60 font-semibold">Prior School & Grade:</span>
                      <div className="text-white font-medium">{formData.previousSchool} ({formData.gradeAchieved})</div>
                    </div>
                    <div>
                      <span className="text-white/60 font-semibold">Selected Faculty:</span>
                      <div className="text-[#f5a425] font-bold">{currentFaculty.name}</div>
                    </div>
                    <div>
                      <span className="text-white/60 font-semibold">Degree / Programme:</span>
                      <div className="text-[#f5a425] font-bold">
                        {availableProgrammes.find((p) => p.id === formData.programmeId)?.name}
                      </div>
                    </div>
                    <div>
                      <span className="text-white/60 font-semibold">Campus & Mode:</span>
                      <div className="text-white font-medium">{formData.campus} Campus ({formData.studyMode})</div>
                    </div>
                    <div>
                      <span className="text-white/60 font-semibold">Intake Cohort:</span>
                      <div className="text-white font-medium">{formData.intakePeriod}</div>
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="p-4 bg-white/5 border border-white/10">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.termsAgreed}
                      onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                      className="w-5 h-5 accent-[#f5a425] shrink-0 mt-0.5"
                    />
                    <span className="text-xs text-white/90 leading-relaxed">
                      I hereby certify that all information and uploaded academic documents are authentic. I agree to the{" "}
                      <Link href="/legal/terms" target="_blank" className="text-[#f5a425] underline">
                        Zion University Application Terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/legal/privacy-policy" target="_blank" className="text-[#f5a425] underline">
                        Privacy Policy
                      </Link>{" "}
                      in accordance with Kenya law.
                    </span>
                  </label>
                </div>

                {/* Fallback Challenge */}
                {captchaFallback && (
                  <div className="p-3 bg-white/5 border border-[#f5a425] flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="v2appCheck"
                      checked={captchaV2Checked}
                      onChange={(e) => setCaptchaV2Checked(e.target.checked)}
                      className="w-4 h-4 accent-[#f5a425]"
                    />
                    <label htmlFor="v2appCheck" className="text-xs text-white cursor-pointer">
                      Security Check: I verify that I am human
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="btn-zion-outline text-xs font-bold uppercase tracking-wider px-6 py-2.5 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-zion shadow-gold text-xs font-bold uppercase tracking-wider px-7 py-2.5 flex items-center gap-2"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-zion shadow-gold text-xs font-bold uppercase tracking-wider px-8 py-3.5 flex items-center gap-2"
              >
                {loading ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Official Application</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <Suspense fallback={
        <div className="pt-20 text-center text-xs uppercase tracking-widest text-white/60">
          Loading Application Form...
        </div>
      }>
        <ApplyFormContent />
      </Suspense>
    </div>
  );
}
