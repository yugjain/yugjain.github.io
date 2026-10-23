import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  Calendar,
  Clock,
  Globe2,
  FileText,
  Sparkles,
  Layers,
  Send
} from 'lucide-react';

export function DossierDrawer({ activeDossier, onClose, onBookIntro }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (activeDossier) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeDossier, onClose]);

  return (
    <AnimatePresence>
      {activeDossier && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Slide-Over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative z-10 w-full max-w-2xl bg-[#0B0B0C] text-white h-full max-h-[100dvh] overflow-y-auto border-l border-[#27272A] shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Sticky Top Bar */}
              <div className="sticky top-0 z-20 bg-[#0B0B0C]/95 backdrop-blur-md px-5 sm:px-8 py-3.5 sm:py-5 border-b border-[#27272A] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-accent text-accent-text text-[10px] sm:text-[11px] font-mono font-extrabold uppercase tracking-wider">
                    {activeDossier.type}
                  </span>
                  <span className="text-[11px] font-mono text-[#A1A1AA] hidden sm:inline">
                    {activeDossier.badge}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1C1C21] border border-[#27272A] flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors"
                  aria-label="Close Dossier"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-accent mb-2">
                    {activeDossier.company} • CASE ARCHITECTURE
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {activeDossier.headline}
                  </h2>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
                    {activeDossier.clientPills.map((pill, i) => (
                      <span
                        key={i}
                        className="px-2.5 sm:px-3 py-1 rounded-full bg-[#161618] border border-[#27272A] text-xs font-bold text-white"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {activeDossier.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#141417] border border-[#27272A]"
                    >
                      <div className="text-sm font-mono font-extrabold text-accent">
                        {m.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#A1A1AA] mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Section 1: The Bottleneck */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                  <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#A1A1AA]">
                    01 / THE COMMERCIAL & OPERATIONAL BOTTLENECK
                  </div>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    {activeDossier.bottleneck}
                  </p>
                </div>

                {/* Section 2: Systems & Governance Architecture */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-accent">
                    02 / SYSTEMS & GOVERNANCE ARCHITECTURE DEPLOYED
                  </div>
                  <div className="space-y-2.5 sm:space-y-3">
                    {activeDossier.architecture.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#141417] border border-[#27272A] flex items-start gap-3 sm:gap-4"
                      >
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent/15 border border-accent/40 text-accent font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          0{idx + 1}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Commercial Outcome */}
                <div className="p-5 sm:p-6 rounded-2xl bg-accent text-accent-text space-y-1.5 sm:space-y-2 shadow-xl">
                  <div className="text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    03 / EXECUTIVE & COMMERCIAL OUTCOME
                  </div>
                  <p className="text-sm sm:text-base font-bold leading-relaxed">
                    {activeDossier.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-4 sm:p-6 border-t border-[#27272A] bg-[#121215] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs text-[#A1A1AA] text-center sm:text-left">
                Want to deploy this governance framework across your portfolio?
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBookIntro();
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-accent text-accent-text font-bold text-xs hover:bg-accent-hover transition-colors inline-flex items-center justify-center gap-1.5 shrink-0"
              >
                Discuss Mandate <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function WorkingPaperModal({ activePaper, onClose, onSelectPaper, allPapers }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (activePaper) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activePaper, onClose]);

  return (
    <AnimatePresence>
      {activePaper && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Slide-Over Essay Reader */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative z-10 w-full max-w-2xl bg-white text-[#0B0B0C] h-full max-h-[100dvh] overflow-y-auto border-l border-[#E4E4E7] shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Top Reader Header */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-3.5 sm:py-5 border-b border-[#E4E4E7] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#0B0B0C] text-white text-[10px] sm:text-[11px] font-mono font-bold">
                    {activePaper.type}
                  </span>
                  <span className="text-[11px] font-mono text-[#52525B] hidden sm:inline">
                    {activePaper.readTime} • {activePaper.date}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center text-[#0B0B0C] hover:bg-[#0B0B0C] hover:text-white transition-colors"
                  aria-label="Close Reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Article Content */}
              <article className="p-5 sm:p-10 space-y-6 sm:space-y-8">
                <div className="border-b border-[#E4E4E7] pb-5 sm:pb-6">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {activePaper.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#F7F7F5] border border-[#E4E4E7] text-[10px] sm:text-[11px] font-mono font-bold text-[#52525B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0B0B0C] leading-[1.15] mb-3 sm:mb-4">
                    {activePaper.title}
                  </h1>
                  <p className="text-sm sm:text-lg text-[#52525B] leading-relaxed font-medium">
                    {activePaper.subtitle}
                  </p>
                  <div className="mt-4 sm:mt-5 flex items-center gap-2.5 text-xs font-mono text-[#52525B]">
                    <img
                      src="/yug-avatar.jpg"
                      alt="Yug Jain"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-[#0B0B0C]"
                    />
                    <span className="font-bold text-[#0B0B0C]">BY YUG JAIN</span>
                    <span>•</span>
                    <span className="text-[11px]">CLIENT PARTNER</span>
                  </div>
                </div>

                {/* Executive Thesis Callout */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0B0C] text-white space-y-2">
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-accent">
                    EXECUTIVE THESIS
                  </div>
                  <p className="text-sm sm:text-base font-semibold leading-relaxed">
                    “{activePaper.thesis}”
                  </p>
                </div>

                {/* Body Sections */}
                <div className="space-y-5 sm:space-y-6">
                  {activePaper.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0B0B0C]">
                        {sec.heading}
                      </h3>
                      <p className="text-sm sm:text-base text-[#3F3F46] leading-relaxed">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Key Takeaway */}
                <div className="p-5 sm:p-6 rounded-2xl bg-accent text-[#0B0B0C] space-y-1.5 border border-[#0B0B0C]/10">
                  <div className="text-[10px] sm:text-[11px] font-mono font-extrabold uppercase tracking-wider">
                    OPERATING RULE OF THUMB
                  </div>
                  <p className="text-xs sm:text-sm md:text-base font-bold leading-relaxed">
                    {activePaper.takeaway}
                  </p>
                </div>

                {/* Next Paper Switcher */}
                <div className="pt-5 sm:pt-6 border-t border-[#E4E4E7]">
                  <div className="text-xs font-mono font-bold uppercase text-[#52525B] mb-3">
                    More Working Papers:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {allPapers
                      .filter((p) => p.id !== activePaper.id)
                      .map((p) => (
                        <button
                          key={p.id}
                          onClick={() => onSelectPaper(p)}
                          className="text-left p-3.5 sm:p-4 rounded-xl bg-[#F7F7F5] border border-[#E4E4E7] hover:border-[#0B0B0C] transition-all flex items-center justify-between group"
                        >
                          <div>
                            <div className="text-[10px] font-mono font-bold text-[#52525B]">
                              {p.type} • {p.readTime}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-[#0B0B0C] group-hover:underline mt-0.5">
                              {p.title}
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#0B0B0C] shrink-0 ml-2" />
                        </button>
                      ))}
                  </div>
                </div>
              </article>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function BookIntroModal({ isOpen, onClose }) {
  const [selectedRegion, setSelectedRegion] = useState('us');
  const [selectedTopic, setSelectedTopic] = useState('Enterprise Client Partner / CS Leadership');
  const [selectedSlot, setSelectedSlot] = useState('9:30 AM – 11:30 AM EST (NYC Morning)');

  const regionCorridors = {
    us: {
      label: 'US Corridor (NYC / SF / Boston)',
      overlap: '8:00 AM – 1:00 PM EST (Daily Live Overlap)',
      slots: [
        '8:30 AM – 10:00 AM EST (Early NYC / East Coast)',
        '9:30 AM – 11:30 AM EST (NYC Morning / SF Early)',
        '11:30 AM – 1:00 PM EST (NYC Midday / SF Morning)'
      ]
    },
    uk: {
      label: 'UK & Europe Corridor (London / Dublin)',
      overlap: '8:30 AM – 4:30 PM GMT/BST (Full Day Overlap)',
      slots: [
        '9:00 AM – 11:00 AM GMT (London Morning)',
        '1:00 PM – 3:00 PM GMT (London Afternoon)',
        '3:00 PM – 5:00 PM GMT (London Late Afternoon)'
      ]
    },
    global: {
      label: 'APAC / UAE / India Corridor',
      overlap: '9:00 AM – 7:00 PM IST / GST',
      slots: [
        '10:30 AM – 12:30 PM IST (Morning Slot)',
        '2:30 PM – 4:30 PM IST (Afternoon Slot)',
        '6:00 PM – 8:00 PM IST (Evening Slot)'
      ]
    }
  };

  const topics = [
    'Enterprise Client Partner / CS Leadership Role',
    'Fractional Advisory / Post-Sales Architecture',
    'Co-Founder / Applied AI Collaboration'
  ];

  const handleRegionChange = (key) => {
    setSelectedRegion(key);
    setSelectedSlot(regionCorridors[key].slots[0]);
  };

  const handleDispatchInvite = () => {
    const subject = encodeURIComponent(`15-Min Intro: ${selectedTopic} — Yug Jain`);
    const body = encodeURIComponent(
      `Hi Yug,\n\nI reviewed your portfolio and would love to schedule a 15-minute intro call.\n\n` +
        `• Topic: ${selectedTopic}\n` +
        `• Preferred Timezone Corridor: ${regionCorridors[selectedRegion].label}\n` +
        `• Preferred Window: ${selectedSlot}\n\n` +
        `Best regards,`
    );
    window.location.href = `mailto:yugrjain@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Box with Mobile Max-Height and Smooth Scrolling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="relative z-10 w-full max-w-xl bg-[#0B0B0C] text-white border border-[#27272A] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6 max-h-[90dvh] overflow-y-auto"
          >
            <div className="flex items-start justify-between border-b border-[#27272A] pb-3 sm:pb-4">
              <div>
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-accent text-accent-text text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-wider">
                  EXECUTIVE SCHEDULER • 15-MIN INTRO
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 sm:mt-2">
                  Schedule an Executive Intro
                </h3>
                <p className="text-[11px] sm:text-xs text-[#A1A1AA] mt-0.5 sm:mt-1">
                  Synchronized across US (NYC/SF), UK (London), and Global enterprise hours.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C1C21] border border-[#27272A] flex items-center justify-center text-white hover:border-accent"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Direct Google Calendar Link (Always Visible) */}
            <a
              href="https://calendar.app.google/3yNWBXCxBVos8ufr8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 sm:py-4 px-5 rounded-xl sm:rounded-2xl bg-accent text-accent-text font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-accent-hover transition-all flex items-center justify-center gap-2 shadow-xl group"
            >
              <Calendar className="w-4 h-4" />
              Book Direct on Google Calendar
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Step 1: Select Topic */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-[#A1A1AA] block">
                1. Select Conversation Agenda
              </label>
              <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`text-left px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      selectedTopic === t
                        ? 'bg-white text-[#0B0B0C] border-white shadow-md'
                        : 'bg-[#141417] text-white border-[#27272A] hover:border-white/40'
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs">{t}</span>
                    {selectedTopic === t && <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Timezone Corridor */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-[#A1A1AA] block">
                2. Select Your Operating Timezone
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { id: 'us', title: 'US (EST/PST)' },
                  { id: 'uk', title: 'UK (GMT/BST)' },
                  { id: 'global', title: 'APAC / UAE' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleRegionChange(r.id)}
                    className={`py-2 px-1.5 sm:px-3 rounded-xl text-[10px] sm:text-xs font-mono font-bold border text-center transition-all ${
                      selectedRegion === r.id
                        ? 'bg-accent text-accent-text border-accent font-bold'
                        : 'bg-[#141417] text-[#A1A1AA] border-[#27272A] hover:text-white'
                    }`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-accent pt-0.5">
                ✦ {regionCorridors[selectedRegion].overlap}
              </div>
            </div>

            {/* Step 3: Preferred Window */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-[#A1A1AA] block">
                3. Suggested Overlap Window
              </label>
              <div className="grid grid-cols-1 gap-1">
                {regionCorridors[selectedRegion].slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`text-left px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono border transition-all ${
                      selectedSlot === slot
                        ? 'bg-[#1C1C22] text-accent border-accent font-bold'
                        : 'bg-[#141417] text-[#A1A1AA] border-[#27272A]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={handleDispatchInvite}
                className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-[#141417] border border-[#27272A] text-white hover:border-white font-mono text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3 h-3 text-accent" />
                Dispatch Email Request
              </button>
              <a
                href="/Yug-Jain-Executive-Resume.pdf"
                download="Yug-Jain-Executive-Resume.pdf"
                className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-[#141417] border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-white font-mono text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3 h-3 text-accent" />
                Download CV (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
