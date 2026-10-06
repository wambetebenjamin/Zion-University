"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, X, Check, Lock } from "lucide-react";

export default function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Preference state
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("zion_cookie_consent_v1");
    if (!stored) {
      // Delay slightly for smooth appearance
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (analytics: boolean, marketing: boolean) => {
    const preferences = {
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      act: "Kenya Data Protection Act 2019 Compliant",
    };
    localStorage.setItem("zion_cookie_consent_v1", JSON.stringify(preferences));
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleSavePreferences = () => {
    saveConsent(analyticsCookies, marketingCookies);
  };

  if (!mounted || !showBanner) return null;

  return (
    <>
      {/* Bottom Sticky Banner */}
      <aside
        aria-label="Cookie consent banner"
        className="fixed bottom-0 left-0 right-0 z-[9990] bg-[#162239] border-t-2 border-[#f5a425] shadow-2xl px-4 py-4 md:px-8 md:py-5"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded bg-white/5 border border-white/10 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-[#f5a425]" />
            </div>
            <div>
              <p className="text-sm md:text-base text-white/90 leading-relaxed m-0">
                Zion University uses cookies to improve your experience, personalise content, and measure how our site is used. Read our{" "}
                <Link
                  href="/legal/cookie-policy"
                  className="text-[#f5a425] underline hover:text-[#ffb834] transition-colors font-medium"
                >
                  Cookie Policy
                </Link>
                . Compliant with Kenya Data Protection Act 2019.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 md:flex-none text-xs uppercase font-bold tracking-wider px-4 py-2.5 rounded-none border border-white/30 text-white hover:bg-white/10 transition-colors min-h-[44px]"
            >
              Manage Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 md:flex-none btn-zion text-xs uppercase tracking-wider min-h-[44px]"
            >
              Accept All
            </button>
          </div>
        </div>
      </aside>

      {/* Preferences Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[#172238] border border-white/20 w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#f5a425]" />
                <h3 id="cookie-preferences-title" className="text-lg font-bold text-white uppercase tracking-wide">
                  Cookie Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white p-1"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-white/70 mb-5 leading-relaxed">
              Customise your cookie preferences below in accordance with the Kenya Data Protection Act 2019. Essential cookies cannot be deactivated.
            </p>

            <div className="space-y-4 mb-6">
              {/* Necessary */}
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">Strictly Necessary Cookies</span>
                    <span className="text-[10px] uppercase tracking-wider bg-[#f5a425]/20 text-[#f5a425] px-2 py-0.5 font-bold">
                      Required
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-1">
                    Required for site security, student authentication, and application submission workflows.
                  </p>
                </div>
                <div className="flex items-center text-white/40">
                  <Lock className="w-5 h-5 text-[#f5a425]" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                <div className="pr-4">
                  <span className="font-bold text-sm text-white">Analytics & Performance Cookies</span>
                  <p className="text-xs text-white/60 mt-1">
                    Help us understand prospective student traffic patterns to optimise admission guides.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsCookies}
                    onChange={(e) => setAnalyticsCookies(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f5a425]"></div>
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                <div className="pr-4">
                  <span className="font-bold text-sm text-white">Marketing & Prospectus Cookies</span>
                  <p className="text-xs text-white/60 mt-1">
                    Used to deliver relevant scholarship updates and open-day notices.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingCookies}
                    onChange={(e) => setMarketingCookies(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f5a425]"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="btn-zion text-xs font-bold uppercase tracking-wider"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
