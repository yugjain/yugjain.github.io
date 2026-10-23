import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Copy, 
  Check, 
  ChevronDown, 
  ExternalLink,
  Music, 
  Trophy, 
  Coffee, 
  Play, 
  Square, 
  Volume2,
  Layers, 
  Cpu, 
  TrendingUp, 
  Flame,
  Globe2,
  FileText,
  Calendar,
  BookOpen,
  Quote,
  CheckCircle2,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { guitarSynth } from './utils/guitarAudio';
import {
  advisoryDossiers,
  workingPapers,
  ninetyDayPlaybook,
  executiveEndorsements
} from './data/portfolioData';
import {
  DossierDrawer,
  WorkingPaperModal,
  BookIntroModal
} from './components/InteractiveDrawers';

export default function App() {
  // Mobile Navigation Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Email Copy State
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yugrjain@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Interactive Drawers & Modals State
  const [activeDossier, setActiveDossier] = useState(null);
  const [activePaper, setActivePaper] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // 90-Day Operating Blueprint Tab State
  const [activePlaybookTab, setActivePlaybookTab] = useState(0);

  // Live Synchronized Global Clocks (NYC, LDN, BOM)
  const [globalTimes, setGlobalTimes] = useState({
    nyc: '--:--',
    ldn: '--:--',
    bom: '--:--'
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const formatTime = (tz) => 
        new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);

      setGlobalTimes({
        nyc: formatTime('America/New_York'),
        ldn: formatTime('Europe/London'),
        bom: formatTime('Asia/Kolkata')
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timeline Accordion State (Section 2 - Part B)
  const [openTimelineId, setOpenTimelineId] = useState('01');

  // ─────────────────────────────────────────────────────────────
  // ACOUSTIC GUITAR 4-BAR SEQUENCER & KARPLUS-STRONG ENGINE
  // ─────────────────────────────────────────────────────────────
  const songsRepertoire = [
    {
      id: 'clapton',
      title: 'Wonderful Tonight',
      artist: 'Eric Clapton',
      bpm: 95,
      slug: 'wonderful-tonight',
      chords: [
        { name: 'G', tab: '320003', freqs: [98, 123.47, 146.83, 196, 293.66, 392] },
        { name: 'D', tab: 'xx0232', freqs: [146.83, 220, 293.66, 369.99] },
        { name: 'C', tab: 'x32010', freqs: [130.81, 164.81, 196, 261.63, 329.63] },
        { name: 'D', tab: 'xx0232', freqs: [146.83, 220, 293.66, 369.99] }
      ]
    },
    {
      id: 'dylan',
      title: 'Knockin’ on Heaven’s Door',
      artist: 'Bob Dylan',
      bpm: 72,
      slug: 'knockin-on-heavens-door',
      chords: [
        { name: 'G', tab: '320003', freqs: [98, 123.47, 146.83, 196, 293.66, 392] },
        { name: 'D', tab: 'xx0232', freqs: [146.83, 220, 293.66, 369.99] },
        { name: 'Am', tab: 'x02210', freqs: [110, 164.81, 220, 261.63, 329.63] },
        { name: 'C', tab: 'x32010', freqs: [130.81, 164.81, 196, 261.63, 329.63] }
      ]
    },
    {
      id: 'eagles',
      title: 'Hotel California',
      artist: 'Eagles',
      bpm: 75,
      slug: 'hotel-california',
      chords: [
        { name: 'Bm', tab: 'x24432', freqs: [123.47, 185, 246.94, 293.66, 369.99] },
        { name: 'F#7', tab: '242322', freqs: [92.50, 138.59, 185, 233.08, 277.18, 369.99] },
        { name: 'A', tab: 'x02220', freqs: [110, 164.81, 220, 277.18, 329.63] },
        { name: 'E', tab: '022100', freqs: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63] }
      ]
    },
    {
      id: 'layla',
      title: 'Layla — Unplugged',
      artist: 'Eric Clapton',
      bpm: 92,
      slug: 'layla-unplugged',
      chords: [
        { name: 'Dm', tab: 'xx0231', freqs: [146.83, 220, 293.66, 349.23] },
        { name: 'Bb', tab: 'x13331', freqs: [116.54, 174.61, 233.08, 293.66, 349.23] },
        { name: 'C', tab: 'x32010', freqs: [130.81, 164.81, 196, 261.63, 329.63] },
        { name: 'Dm', tab: 'xx0231', freqs: [146.83, 220, 293.66, 349.23] }
      ]
    },
    {
      id: 'beatles',
      title: 'Something',
      artist: 'The Beatles',
      bpm: 68,
      slug: 'something',
      chords: [
        { name: 'C', tab: 'x32010', freqs: [130.81, 164.81, 196, 261.63, 329.63] },
        { name: 'Cmaj7', tab: 'x32000', freqs: [130.81, 164.81, 196, 246.94, 329.63] },
        { name: 'C7', tab: 'x32310', freqs: [130.81, 164.81, 233.08, 261.63, 329.63] },
        { name: 'F', tab: '133211', freqs: [87.31, 130.81, 174.61, 220, 261.63, 349.23] }
      ]
    }
  ];

  const [selectedSong, setSelectedSong] = useState(songsRepertoire[0]);
  const [isPlayingSequencer, setIsPlayingSequencer] = useState(false);
  const [activeChordIndex, setActiveChordIndex] = useState(0);
  const sequenceTimerRef = useRef(null);
  const audioElemRef = useRef(null);

  // Stop playback cleanly
  const stopPlayback = () => {
    setIsPlayingSequencer(false);
    if (sequenceTimerRef.current) {
      clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
    if (audioElemRef.current) {
      audioElemRef.current.pause();
      audioElemRef.current.currentTime = 0;
    }
    setActiveChordIndex(0);
  };

  // Start 4-bar Karplus-Strong progression loop
  const startSequencerLoop = (song) => {
    guitarSynth.initContext();
    setIsPlayingSequencer(true);

    const beatDuration = 60 / song.bpm;
    const barDuration = beatDuration * 4;

    let currentStep = 0;

    const playBar = () => {
      const chordIdx = currentStep % 4;
      setActiveChordIndex(chordIdx);
      const chord = song.chords[chordIdx];

      guitarSynth.strumChord(chord.freqs, 'down', 0);
      guitarSynth.strumChord(chord.freqs, 'down', beatDuration * 1.0);
      guitarSynth.strumChord(chord.freqs, 'up', beatDuration * 1.5);
      guitarSynth.strumChord(chord.freqs, 'up', beatDuration * 2.5);
      guitarSynth.strumChord(chord.freqs, 'down', beatDuration * 3.0);
      guitarSynth.strumChord(chord.freqs, 'up', beatDuration * 3.5);

      currentStep++;
      sequenceTimerRef.current = setTimeout(playBar, barDuration * 1000);
    };

    playBar();
  };

  // Toggle Play / Stop with MP3 fallback check
  const togglePlaySong = (song) => {
    if (isPlayingSequencer && selectedSong.id === song.id) {
      stopPlayback();
      return;
    }

    stopPlayback();
    setSelectedSong(song);

    const mp3Url = `/audio/${song.slug}.mp3`;
    const testAudio = new Audio(mp3Url);

    testAudio.oncanplaythrough = () => {
      audioElemRef.current = testAudio;
      testAudio.play();
      setIsPlayingSequencer(true);
      testAudio.onended = () => stopPlayback();
    };

    testAudio.onerror = () => {
      startSequencerLoop(song);
    };
  };

  useEffect(() => {
    return () => stopPlayback();
  }, []);

  // Timeline Data (Webstacked Numbered Rows)
  const timelineData = [
    {
      num: '01',
      company: 'NTT DATA North America',
      role: 'Client Partner & Customer Success Manager',
      period: '2022 — Present',
      highlightBadge: '$1M ARR Portfolio • US Accounts',
      shortDesc: 'Dual mandate across delivery governance and commercial growth for a $1M ARR Salesforce & MuleSoft enterprise portfolio spanning North American REITs, Fortune 500 Consumer Goods, InsurTech, Wealth Management, and Retail.',
      fullMetrics: [
        { label: 'ARR Expansion', val: '+30%' },
        { label: 'Gross Logo Retention', val: '80%+' },
        { label: 'Portfolio ARR', val: '$1.0M' },
        { label: 'Operating Division', val: 'North America' }
      ],
      details: [
        'Expanded account ARR by 30% through consultative upselling, multi-year Metascale extensions, and adjacent MuleSoft API integration change orders across North American enterprise accounts.',
        'Sustained an 80%+ gross retention baseline across multi-year contracts, steering executive committees with client VPs, CIOs, and Enterprise Architects.',
        'Closed tight feedback loops between US enterprise customer stakeholders and technical delivery squads to mitigate implementation risks early.'
      ]
    },
    {
      num: '02',
      company: 'Deepstash',
      role: 'Customer Success & Content Manager → CSM',
      period: '2020 — 2022',
      highlightBadge: 'First B2B Enterprise Account',
      shortDesc: 'Secured the platform’s first corporate enterprise "Deepstash for Teams" account and engineered daily active retention pipelines.',
      fullMetrics: [
        { label: 'Enterprise Contract', val: '1st B2B' },
        { label: 'Active Retention', val: 'Elevated DAU' },
        { label: 'Motion Built', val: 'PLG → Enterprise' }
      ],
      details: [
        'Pioneered corporate B2B sales motion, aligning product adoption directly with enterprise L&D outcomes.',
        'Built content curation and distribution telemetry that drove measurable gains in Daily Active Users (DAU).',
        'Bridged mobile engineering backlogs directly with client user telemetry to accelerate product-led growth.'
      ]
    },
    {
      num: '03',
      company: 'Office Pulse, CoWorkingOps & WorkAmp',
      role: 'Customer Success Specialist & Operations Manager',
      period: '2016 — 2020',
      highlightBadge: '25+ Enterprise Accounts',
      shortDesc: 'Managed post-sales health and facility operations across 25+ marquee enterprise accounts in India and the UAE.',
      fullMetrics: [
        { label: 'Onboarding Cycle', val: '-50% Time' },
        { label: 'Operating Expenses', val: '-30% OpEx' },
        { label: 'Enterprise Logos', val: '25+ Accounts' }
      ],
      details: [
        'Directed post-sales customer health for 25+ flagship accounts including WeWork, Puma, OYO, and IDFC AMC.',
        'Redesigned end-to-end customer onboarding playbooks, slashing time-to-first-value by 50%.',
        'Streamlined multi-city facility software operations across India and the UAE, driving a 30% reduction in recurring operating expenses.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-light text-dark selection:bg-accent selection:text-accent-text font-sans overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE SLIDE-OVER DRAWERS & MODALS
      ─────────────────────────────────────────────────────────────── */}
      <DossierDrawer
        activeDossier={activeDossier}
        onClose={() => setActiveDossier(null)}
        onBookIntro={() => setIsBookModalOpen(true)}
      />

      <WorkingPaperModal
        activePaper={activePaper}
        onClose={() => setActivePaper(null)}
        onSelectPaper={(paper) => setActivePaper(paper)}
        allPapers={workingPapers}
      />

      <BookIntroModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />


      {/* ─────────────────────────────────────────────────────────────
          FLOATING PILL NAVIGATION (Mobile-Responsive with Slide-Down Sheet)
      ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
        <div className="bg-[#0B0B0C]/90 backdrop-blur-md border border-[#27272A] rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#" className="font-extrabold text-white text-sm sm:text-base tracking-tight hover:text-accent transition-colors">
              YUG JAIN
            </a>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#1C1C1F] text-[#A1A1AA] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              NYC • LDN • DUB • GLOBAL REMOTE
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-semibold text-[#A1A1AA]">
            <a href="#work" className="hover:text-white transition-colors">Operating Record</a>
            <a href="#playbook" className="hover:text-white transition-colors">90-Day Blueprint</a>
            <a href="#advisory" className="hover:text-white transition-colors">Advisory</a>
            <a href="#toolbox" className="hover:text-white transition-colors">Stack & Essays</a>
            <a href="#off-the-clock" className="hover:text-white transition-colors">Off The Clock</a>

            <a
              href="/Yug-Jain-Executive-Resume.pdf"
              download="Yug-Jain-Executive-Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1C1F] border border-[#27272A] text-white hover:border-accent hover:text-accent transition-colors font-mono text-[11px]"
              title="Download Executive CV (PDF)"
            >
              <FileText className="w-3 h-3 text-accent" />
              CV PDF
            </a>

            <button 
              onClick={() => setIsBookModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-accent text-accent-text font-bold hover:bg-accent-hover transition-colors inline-flex items-center gap-1"
            >
              Book Intro <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls: Book Button + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setIsBookModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-accent text-accent-text font-extrabold text-[11px] hover:bg-accent-hover transition-colors inline-flex items-center gap-1"
            >
              Book Intro
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full bg-[#1C1C1F] border border-[#27272A] text-white flex items-center justify-center hover:border-accent"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-accent" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 p-5 rounded-3xl bg-[#0B0B0C]/95 backdrop-blur-xl border border-[#27272A] shadow-2xl md:hidden space-y-4"
            >
              <div className="text-[10px] font-mono uppercase text-[#A1A1AA] tracking-wider border-b border-[#27272A] pb-2">
                Navigation Directory
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-white">
                <a
                  href="#work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#141417] border border-[#27272A] hover:border-accent flex items-center justify-between"
                >
                  <span>Operating Record</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </a>
                <a
                  href="#playbook"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#141417] border border-[#27272A] hover:border-accent flex items-center justify-between"
                >
                  <span>90-Day Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </a>
                <a
                  href="#advisory"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#141417] border border-[#27272A] hover:border-accent flex items-center justify-between"
                >
                  <span>Advisory Dossiers</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </a>
                <a
                  href="#toolbox"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#141417] border border-[#27272A] hover:border-accent flex items-center justify-between"
                >
                  <span>Stack & Essays</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </a>
                <a
                  href="#off-the-clock"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#141417] border border-[#27272A] hover:border-accent flex items-center justify-between col-span-2"
                >
                  <span>Off The Clock (Guitar & Pitch)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </a>
              </div>

              <div className="pt-2 border-t border-[#27272A] flex items-center gap-2">
                <a
                  href="/Yug-Jain-Executive-Resume.pdf"
                  download="Yug-Jain-Executive-Resume.pdf"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#141417] border border-[#27272A] text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  Download CV (PDF)
                </a>
                <a
                  href="https://calendar.app.google/3yNWBXCxBVos8ufr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-accent text-accent-text font-mono text-xs font-extrabold flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Google Calendar
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: THE HERO [LIGHT BACKGROUND #FFFFFF]
          (Mobile Responsive + Tight Typography + Clean Touch Hierarchy)
      ─────────────────────────────────────────────────────────────── */}
      <section className="bg-light pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-light-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          
          {/* Top Row: Responsive Edge-to-Edge Typography + Avatar */}
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-12 border-b border-light-border pb-8 sm:pb-12">
            <div>
              <h1 className="text-5xl sm:text-7xl md:text-[clamp(4.2rem,11.5vw,9.8rem)] font-extrabold leading-[0.92] sm:leading-[0.88] tracking-tight sm:tracking-[-0.04em] text-dark uppercase select-none break-words">
                YUG JAIN
              </h1>
              <div className="mt-2.5 sm:mt-3 text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase text-light-soft">
                ENTERPRISE CLIENT PARTNER • SENIOR CSM • TECHNICAL ACCOUNT MANAGER (TAM)
              </div>
            </div>

            {/* Actual User Avatar (Aviator Headset Portrait) */}
            <div className="relative group shrink-0 self-start md:self-auto">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-dark shadow-2xl p-1 bg-white">
                <img 
                  src="/yug-avatar.jpg" 
                  alt="Yug Jain" 
                  className="w-full h-full object-cover rounded-full grayscale-[15%] contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-accent text-accent-text text-[9px] sm:text-[10px] font-extrabold px-2 sm:px-2.5 py-0.5 rounded-full border border-dark flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-dark animate-ping" />
                GLOBAL
              </div>
            </div>
          </div>

          {/* Middle Row (Webstacked Inline Capsule Statement & Global Clocks) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2 sm:pt-4">
            
            {/* Left Column: Direct Line & Global Operating Footprint */}
            <div className="lg:col-span-4 space-y-4 sm:space-y-6">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-light-soft block mb-1.5 sm:mb-2 font-mono">
                  Direct Line
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-light-neutral border border-light-border hover:border-dark transition-all text-xs sm:text-sm font-bold text-dark w-full justify-between"
                >
                  <span className="font-mono text-xs sm:text-sm truncate">yugrjain@gmail.com</span>
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-light-soft group-hover:text-dark transition-colors shrink-0" />
                  )}
                </button>
              </div>

              {/* Global Operating Clocks Widget (NYC • LDN • BOM) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-light-neutral border border-light-border space-y-2.5 sm:space-y-3">
                <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-light-soft flex items-center justify-between border-b border-light-border pb-2">
                  <span className="flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-accent-text" />
                    Global Operating Clocks
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 font-mono text-center">
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg border border-light-border">
                    <div className="text-[9px] sm:text-[10px] text-light-soft font-bold">NYC (EST)</div>
                    <div className="text-[11px] sm:text-xs font-bold text-dark mt-0.5">{globalTimes.nyc.split(' ')[0]}</div>
                    <div className="text-[8px] sm:text-[9px] text-light-soft">{globalTimes.nyc.split(' ')[1]}</div>
                  </div>
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg border border-light-border">
                    <div className="text-[9px] sm:text-[10px] text-light-soft font-bold">LDN/DUB (GMT)</div>
                    <div className="text-[11px] sm:text-xs font-bold text-dark mt-0.5">{globalTimes.ldn.split(' ')[0]}</div>
                    <div className="text-[8px] sm:text-[9px] text-light-soft">{globalTimes.ldn.split(' ')[1]}</div>
                  </div>
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg border border-light-border">
                    <div className="text-[9px] sm:text-[10px] text-light-soft font-bold">BOM (IST)</div>
                    <div className="text-[11px] sm:text-xs font-bold text-dark mt-0.5">{globalTimes.bom.split(' ')[0]}</div>
                    <div className="text-[8px] sm:text-[9px] text-light-soft">{globalTimes.bom.split(' ')[1]}</div>
                  </div>
                </div>

                {/* Mobility & Enterprise Hours Pill */}
                <div className="pt-0.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white border border-light-border text-[9px] sm:text-[10px] font-mono font-bold text-dark w-full leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-ping" />
                    <span>US (EST) & UK/IE (GMT) LIVE OVERLAP • REMOTE & RELOCATION READY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Statement & CTAs */}
            <div className="lg:col-span-8">
              <div className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.35] tracking-tight text-dark mb-5 sm:mb-6">
                Hi! I’m Yug Jain, an{' '}
                <span className="inline-flex items-center px-3 sm:px-4 py-0.5 rounded-full bg-accent text-accent-text font-black text-lg sm:text-2xl lg:text-3xl align-middle shadow-sm my-1">
                  Enterprise Client Partner
                </span>{' '}
                scaling $1M+ ARR global SaaS portfolios into durable revenue engines.
              </div>

              <p className="text-sm sm:text-lg text-light-soft leading-relaxed max-w-2xl mb-6 sm:mb-8">
                8+ years leading post-sales governance, executive Steering Committees, and net revenue expansion across 
                North American, UK, Irish, and global enterprise accounts—bridging commercial execution with engineering rigor.
              </p>

              {/* Action Buttons Stack (Full Width on Mobile) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                <button 
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-dark text-white font-bold text-xs sm:text-sm hover:bg-accent hover:text-accent-text transition-all inline-flex items-center justify-center gap-2 group shadow-lg min-h-[46px]"
                >
                  <Calendar className="w-4 h-4 text-accent group-hover:text-accent-text transition-colors" />
                  Book 15-Min Intro
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <a 
                  href="/Yug-Jain-Executive-Resume.pdf"
                  download="Yug-Jain-Executive-Resume.pdf"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-accent text-accent-text font-extrabold text-xs sm:text-sm hover:bg-accent-hover transition-all inline-flex items-center justify-center gap-2 shadow-sm min-h-[46px]"
                >
                  <FileText className="w-4 h-4" />
                  Download Executive CV (PDF)
                </a>

                <a 
                  href="https://linkedin.com/in/yugjain" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-light-neutral border border-light-border font-bold text-xs sm:text-sm text-dark hover:border-dark transition-all inline-flex items-center justify-center gap-1.5 min-h-[46px]"
                >
                  LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          ENTERPRISE CLIENTS & ECOSYSTEMS STRIP (#141415 Background)
      ─────────────────────────────────────────────────────────────── */}
      <div className="bg-[#141415] py-4 sm:py-5 border-y border-[#27272A] overflow-hidden select-none">
        <div className="marquee-track animate-marquee text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase">
          <span className="mx-5 text-accent font-extrabold">ENTERPRISE FOOTPRINT ✦</span>
          <span className="mx-5 text-white font-extrabold">NTT DATA NORTH AMERICA ($1M+ US BOOK) ✦</span>
          <span className="mx-5 text-zinc-300">SAMSUNG ✦</span>
          <span className="mx-5 text-zinc-300">UNILEVER ✦</span>
          <span className="mx-5 text-zinc-300">AMAZON SMARTBIZ ✦</span>
          <span className="mx-5 text-zinc-300">BANGALORE AIRPORT (BIAL) ✦</span>
          <span className="mx-5 text-zinc-300">WEWORK ✦</span>
          <span className="mx-5 text-zinc-300">PUMA ✦</span>
          <span className="mx-5 text-zinc-300">SBI MUTUAL FUND ✦</span>
          <span className="mx-5 text-zinc-300">SECLORE ✦</span>
          <span className="mx-5 text-zinc-300">TITAN COMPANY ✦</span>
          <span className="mx-5 text-accent font-extrabold">ENTERPRISE FOOTPRINT ✦</span>
          <span className="mx-5 text-white font-extrabold">NTT DATA NORTH AMERICA ($1M+ US BOOK) ✦</span>
          <span className="mx-5 text-zinc-300">SAMSUNG ✦</span>
          <span className="mx-5 text-zinc-300">UNILEVER ✦</span>
          <span className="mx-5 text-zinc-300">AMAZON SMARTBIZ ✦</span>
          <span className="mx-5 text-zinc-300">BANGALORE AIRPORT (BIAL) ✦</span>
          <span className="mx-5 text-zinc-300">WEWORK ✦</span>
          <span className="mx-5 text-zinc-300">PUMA ✦</span>
          <span className="mx-5 text-zinc-300">SBI MUTUAL FUND ✦</span>
          <span className="mx-5 text-zinc-300">SECLORE ✦</span>
          <span className="mx-5 text-zinc-300">TITAN COMPANY ✦</span>
        </div>
      </div>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: CORE OPERATING TRACK & 90-DAY BLUEPRINT [DARK #0B0B0C]
      ─────────────────────────────────────────────────────────────── */}
      <section id="work" className="bg-dark text-dark-text py-16 sm:py-28 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          
          <div className="max-w-3xl mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-accent block mb-2 sm:mb-3">
              CORE FULL-TIME OPERATIONAL ANCHOR
            </span>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] sm:leading-[1.05] text-white">
              I blend commercial execution with engineering instinct.
            </h2>
          </div>

          {/* Part A: 3 Color-Blocked Stat Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20">
            
            {/* Card 1: Solid Accent Color Block with Black Text */}
            <div className="bg-accent text-accent-text p-6 sm:p-8 rounded-2xl flex flex-col justify-between min-h-[200px] sm:min-h-[260px] relative overflow-hidden group shadow-xl">
              <div className="font-extrabold text-6xl sm:text-8xl tracking-tighter leading-none mb-4 sm:mb-6">
                30%
              </div>
              <div className="relative z-10 font-bold text-sm sm:text-lg leading-snug">
                ARR Expansion across NTT DATA North America’s $1M Salesforce & MuleSoft enterprise portfolio.
              </div>
              <div className="absolute -right-4 -bottom-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[14px] sm:border-[18px] border-black/10 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>

            {/* Card 2: Deep Charcoal #161618 Block with White Text */}
            <div className="bg-dark-card border border-dark-border text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between min-h-[200px] sm:min-h-[260px] relative overflow-hidden group">
              <div className="font-extrabold text-6xl sm:text-8xl tracking-tighter leading-none mb-4 sm:mb-6 text-white">
                80%+
              </div>
              <div className="relative z-10 font-semibold text-sm sm:text-lg leading-snug text-dark-soft">
                Gross Logo Retention sustained through proactive C-suite Steering Committees.
              </div>
              <div className="absolute -right-4 -bottom-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[14px] sm:border-[18px] border-white/5 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>

            {/* Card 3: Pure White #FFFFFF Block with Black Text */}
            <div className="bg-white text-dark p-6 sm:p-8 rounded-2xl flex flex-col justify-between min-h-[200px] sm:min-h-[260px] relative overflow-hidden group shadow-xl">
              <div className="font-extrabold text-6xl sm:text-8xl tracking-tighter leading-none mb-4 sm:mb-6 text-dark">
                50%
              </div>
              <div className="relative z-10 font-bold text-sm sm:text-lg leading-snug text-dark">
                Onboarding Cycle Compression across 25+ marquee enterprise accounts.
              </div>
              <div className="absolute -right-4 -bottom-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[14px] sm:border-[18px] border-dark/10 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>

          </div>

          {/* Part B: Numbered "How I Operate" Dark Rows */}
          <div className="border-t border-dark-border mb-16 sm:mb-24">
            <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-dark-soft py-3 sm:py-4">
              CHRONOLOGICAL OPERATING TRACK RECORD (TAP TO EXPAND)
            </div>

            <div className="divide-y divide-dark-border">
              {timelineData.map((item) => {
                const isOpen = openTimelineId === item.num;
                return (
                  <div key={item.num} className="transition-colors hover:bg-dark-surface/60">
                    <button
                      onClick={() => setOpenTimelineId(isOpen ? null : item.num)}
                      className="w-full py-5 sm:py-8 text-left flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6 group"
                    >
                      <div className="flex items-start sm:items-center gap-4 sm:gap-6 md:w-1/3">
                        <span className="font-mono text-2xl sm:text-3xl font-extrabold text-accent group-hover:text-accent-hover transition-colors">
                          {item.num}
                        </span>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent transition-colors flex items-center gap-2">
                            {item.company}
                          </h3>
                          <div className="text-xs sm:text-sm text-dark-soft mt-0.5">{item.role}</div>
                        </div>
                      </div>

                      <div className="md:w-1/3 pl-10 sm:pl-0">
                        <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-dark-subtle border border-dark-border text-white">
                          {item.highlightBadge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 md:w-1/3 pl-10 sm:pl-0">
                        <span className="text-[11px] sm:text-xs font-mono text-dark-soft">{item.period}</span>
                        <motion.div 
                          animate={{ rotate: isOpen ? 180 : 0 }} 
                          transition={{ duration: 0.2 }}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-dark-subtle border border-dark-border flex items-center justify-center text-white group-hover:border-accent shrink-0"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </button>

                    {/* Expandable Case Drawer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden bg-dark-surface border-t border-dark-border"
                        >
                          <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
                            <p className="text-sm sm:text-base text-dark-text max-w-3xl leading-relaxed">
                              {item.shortDesc}
                            </p>

                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-4">
                              {item.fullMetrics.map((m, idx) => (
                                <div key={idx} className="bg-dark-card border border-dark-border px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl">
                                  <div className="font-mono text-base sm:text-xl font-bold text-accent">{m.val}</div>
                                  <div className="text-[10px] sm:text-xs text-dark-soft">{m.label}</div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-2">
                              <h4 className="text-[10px] sm:text-xs font-mono uppercase text-dark-soft tracking-wider mb-2.5 sm:mb-3">
                                Commercial Milestones & Delivery Cadences
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4 text-xs sm:text-sm">
                                {item.details.map((point, idx) => (
                                  <div key={idx} className="bg-dark-card border border-dark-border p-3.5 sm:p-4 rounded-xl leading-relaxed text-dark-soft">
                                    <span className="text-accent font-bold mr-1.5">•</span>
                                    {point}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Part C: Interactive "First 90 Days — Enterprise Operating Blueprint" */}
          <div id="playbook" className="pt-6 sm:pt-8 border-t border-dark-border">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-accent block mb-2">
                  EXECUTIVE PLAYBOOK FOR US & UK HIRING LEADERS
                </span>
                <h3 className="text-xl sm:text-4xl font-extrabold text-white tracking-tight">
                  How I Run a $1M–$5M+ Portfolio: First 90 Days
                </h3>
              </div>

              {/* 3-Phase Interactive Tab Selector (Full Width on Mobile) */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl sm:rounded-2xl bg-[#141417] border border-dark-border w-full sm:w-auto sm:inline-flex">
                {ninetyDayPlaybook.map((item, idx) => {
                  const isActive = activePlaybookTab === idx;
                  return (
                    <button
                      key={item.phase}
                      onClick={() => setActivePlaybookTab(idx)}
                      className={`px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all text-center ${
                        isActive
                          ? 'bg-accent text-accent-text shadow-md'
                          : 'text-dark-soft hover:text-white'
                      }`}
                    >
                      {item.phase.replace(' — ', '-')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Phase Card */}
            <motion.div
              key={activePlaybookTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#141417] border border-dark-border space-y-6 sm:space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-dark-border pb-4 sm:pb-6">
                <div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-accent uppercase tracking-wider">
                    {ninetyDayPlaybook[activePlaybookTab].tag}
                  </span>
                  <h4 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
                    {ninetyDayPlaybook[activePlaybookTab].title}
                  </h4>
                </div>
                <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-dark border border-dark-border text-[11px] sm:text-xs font-mono text-white shrink-0 self-start md:self-auto">
                  <span className="text-accent font-bold">TARGET: </span>
                  {ninetyDayPlaybook[activePlaybookTab].kpiTarget}
                </div>
              </div>

              <p className="text-sm sm:text-base text-dark-soft max-w-3xl leading-relaxed">
                {ninetyDayPlaybook[activePlaybookTab].summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
                {ninetyDayPlaybook[activePlaybookTab].deliverables.map((deliv, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-dark border border-dark-border flex flex-col justify-between hover:border-accent/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-accent">
                          DELIVERABLE 0{i + 1}
                        </span>
                        <ShieldCheck className="w-4 h-4 text-accent" />
                      </div>
                      <h5 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">
                        {deliv.name}
                      </h5>
                      <p className="text-xs sm:text-sm text-dark-soft leading-relaxed">
                        {deliv.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: STRATEGIC ADVISORY MANDATES [LIGHT #FFFFFF]
          (Clickable Dossiers with Responsive Headers & Touch Targets)
      ─────────────────────────────────────────────────────────────── */}
      <section id="advisory" className="bg-light py-16 sm:py-28 border-b border-light-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-5 sm:pb-6 border-b border-light-border">
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-dark block mb-2">
                TRACK B — SELECTIVE ADVISORY (TAP ANY CARD FOR FULL DOSSIER)
              </span>
              <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-dark">
                Strategic Advisory Footprint
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-light-soft max-w-md mt-3 md:mt-0 leading-relaxed">
              Selective fractional mandates for venture-backed and growth-stage tech companies structuring post-sales retention, telemetry, and enterprise onboarding.
            </p>
          </div>

          {/* 2x2 Brand Identity Canvases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            
            {/* 1. Firework Canvas */}
            <div
              onClick={() => setActiveDossier(advisoryDossiers.firework)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveDossier(advisoryDossiers.firework)}
              className="bg-white border border-light-border rounded-2xl sm:rounded-3xl overflow-hidden hover:border-dark hover:shadow-2xl transition-all group flex flex-col justify-between cursor-pointer text-left"
            >
              <div>
                <div className="h-[110px] sm:h-[125px] w-full bg-[#0F0F12] relative overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between bg-dot-grid border-b border-white/5">
                  <div className="flex items-center justify-between z-10">
                    <span className="bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-white/90 border border-white/10">
                      STRATEGIC ADVISORY
                    </span>
                    <span className="bg-[#1C1C21] px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-accent border border-white/10">
                      SERIES B • COMPLETED JAN 2026
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2.5 my-auto z-10">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#FF0055] to-[#FF5500] flex items-center justify-center text-white shadow-md">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    </div>
                    <span className="text-lg sm:text-xl font-black tracking-wider text-white">FIREWORK</span>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF0055]/15 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                      Firework
                    </h3>
                    <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-accent flex items-center gap-1.5 text-accent-text text-[11px] sm:text-xs font-extrabold group-hover:scale-105 transition-transform shadow-sm">
                      <span>Read Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-dark mb-2 sm:mb-4">
                    Enterprise Adoption, Usage QBRs & Net Retention
                  </h4>

                  <p className="text-xs sm:text-sm text-light-soft leading-relaxed mb-4 sm:mb-6">
                    Advised leadership on structuring customer success operations for Tier-1 accounts. Automated product telemetry reporting to inform QBRs and synchronize enterprise customer needs with engineering roadmaps (completed Jan 31, 2026).
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-8 pb-5 sm:pb-8 pt-0 border-t border-light-border/60">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-light-soft uppercase tracking-wider block mb-2.5 pt-3 sm:pt-4">
                  Enterprise Accounts Advised:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Samsung', 'Unilever', 'Titan', 'Bajaj Finserv'].map((logo) => (
                    <span key={logo} className="px-2.5 sm:px-3 py-1 rounded-full bg-light-neutral border border-light-border text-xs font-bold text-dark">
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. HumanX Canvas */}
            <div
              onClick={() => setActiveDossier(advisoryDossiers.humanx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveDossier(advisoryDossiers.humanx)}
              className="bg-white border border-light-border rounded-2xl sm:rounded-3xl overflow-hidden hover:border-dark hover:shadow-2xl transition-all group flex flex-col justify-between cursor-pointer text-left"
            >
              <div>
                <div className="h-[110px] sm:h-[125px] w-full bg-[#101216] relative overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between bg-dot-grid border-b border-white/5">
                  <div className="flex items-center justify-between z-10">
                    <span className="bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-white/90 border border-white/10">
                      STRATEGIC ADVISORY
                    </span>
                    <span className="bg-[#1C1F26] px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-accent border border-white/10">
                      FEB 2023 — JUN 2023
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2.5 my-auto z-10">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#6366F1] to-[#3B82F6] flex items-center justify-center text-white shadow-md font-black text-sm sm:text-base tracking-tighter">
                      HX
                    </div>
                    <span className="text-lg sm:text-xl font-black tracking-widest text-white">HUMANX</span>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#6366F1]/15 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                      HumanX
                    </h3>
                    <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-accent flex items-center gap-1.5 text-accent-text text-[11px] sm:text-xs font-extrabold group-hover:scale-105 transition-transform shadow-sm">
                      <span>Read Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-dark mb-2 sm:mb-4">
                    End-to-End Sales Cycles, Executive Governance & Cross-Squad Alignment
                  </h4>

                  <p className="text-xs sm:text-sm text-light-soft leading-relaxed mb-4 sm:mb-6">
                    Led full-cycle sales from prospecting to contract onboarding and long-term retention. Bridged Design and Development squads to deliver mission-critical platforms for Bangalore Airport (BIAL), Amazon SmartBiz, SBI Mutual Fund, Seclore, and Times Network.
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-8 pb-5 sm:pb-8 pt-0 border-t border-light-border/60">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-light-soft uppercase tracking-wider block mb-2.5 pt-3 sm:pt-4">
                  Enterprise Clients & Flagship Mandates:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Bangalore Airport (BIAL)', 'Amazon SmartBiz', 'SBI MF (InvesTap NXT)', 'Seclore', 'Times Network'].map((logo) => (
                    <span key={logo} className="px-2.5 sm:px-3 py-1 rounded-full bg-light-neutral border border-light-border text-xs font-bold text-dark">
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Zoftware Canvas */}
            <div
              onClick={() => setActiveDossier(advisoryDossiers.zoftware)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveDossier(advisoryDossiers.zoftware)}
              className="bg-white border border-light-border rounded-2xl sm:rounded-3xl overflow-hidden hover:border-dark hover:shadow-2xl transition-all group flex flex-col justify-between cursor-pointer text-left"
            >
              <div>
                <div className="h-[110px] sm:h-[125px] w-full bg-[#0E1218] relative overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between bg-dot-grid border-b border-white/5">
                  <div className="flex items-center justify-between z-10">
                    <span className="bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-white/90 border border-white/10">
                      STRATEGIC ADVISORY
                    </span>
                    <span className="bg-[#19222E] px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-accent border border-white/10">
                      SAAS AGGREGATION
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2.5 my-auto z-10">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#0EA5E9] to-[#0284C7] flex items-center justify-center text-white shadow-lg">
                      <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-lg sm:text-xl font-black tracking-wider text-white">ZOFTWARE</span>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#0EA5E9]/15 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                      Zoftware
                    </h3>
                    <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-accent flex items-center gap-1.5 text-accent-text text-[11px] sm:text-xs font-extrabold group-hover:scale-105 transition-transform shadow-sm">
                      <span>Read Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-dark mb-2 sm:mb-4">
                    Onboarding Frameworks & Health-Scoring Architecture
                  </h4>

                  <p className="text-xs sm:text-sm text-light-soft leading-relaxed mb-4 sm:mb-6">
                    Architected initial customer onboarding playbooks and lifecycle health models for SMB and mid-market software aggregation platforms.
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-8 pb-5 sm:pb-8 pt-0 border-t border-light-border/60">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-light-soft uppercase tracking-wider block mb-2.5 pt-3 sm:pt-4">
                  Engagement Domain:
                </span>
                <span className="px-3 py-1 rounded-full bg-light-neutral border border-light-border text-xs font-bold text-dark inline-block">
                  B2B Marketplace Lifecycle Ecosystem
                </span>
              </div>
            </div>

            {/* 4. SmartKarrot Canvas */}
            <div
              onClick={() => setActiveDossier(advisoryDossiers.smartkarrot)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveDossier(advisoryDossiers.smartkarrot)}
              className="bg-white border border-light-border rounded-2xl sm:rounded-3xl overflow-hidden hover:border-dark hover:shadow-2xl transition-all group flex flex-col justify-between cursor-pointer text-left"
            >
              <div>
                <div className="h-[110px] sm:h-[125px] w-full bg-[#141210] relative overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between bg-dot-grid border-b border-white/5">
                  <div className="flex items-center justify-between z-10">
                    <span className="bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-white/90 border border-white/10">
                      STRATEGIC ADVISORY
                    </span>
                    <span className="bg-[#241F1A] px-2.5 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-accent border border-white/10">
                      INTELLIGENCE
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2.5 my-auto z-10">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#F97316] to-[#EA580C] flex items-center justify-center text-white shadow-lg">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-lg sm:text-xl font-black tracking-wider text-white">SMARTKARROT</span>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                      SmartKarrot
                    </h3>
                    <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-accent flex items-center gap-1.5 text-accent-text text-[11px] sm:text-xs font-extrabold group-hover:scale-105 transition-transform shadow-sm">
                      <span>Read Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-dark mb-2 sm:mb-4">
                    Automation Adoption Playbooks & Cross-Team Cadences
                  </h4>

                  <p className="text-xs sm:text-sm text-light-soft leading-relaxed mb-4 sm:mb-6">
                    Designed strategic customer onboarding playbooks to accelerate enterprise adoption of automation features, compressing time-to-value across client teams.
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-8 pb-5 sm:pb-8 pt-0 border-t border-light-border/60">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-light-soft uppercase tracking-wider block mb-2.5 pt-3 sm:pt-4">
                  Engagement Domain:
                </span>
                <span className="px-3 py-1 rounded-full bg-light-neutral border border-light-border text-xs font-bold text-dark inline-block">
                  Retention Intelligence SaaS
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: OPERATIONAL & AI TOOLBOX [LIGHT NEUTRAL #F7F7F5]
          (Stack Cards & Working Paper Memos)
      ─────────────────────────────────────────────────────────────── */}
      <section id="toolbox" className="bg-light-neutral py-16 sm:py-28 border-b border-light-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Heading & Academic Foundation */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-dark block mb-2">
                TECHNICAL GROUNDING
              </span>
              <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-dark mb-4 sm:mb-6">
                My enterprise & AI stack.
              </h2>
              <p className="text-sm sm:text-base text-light-soft leading-relaxed mb-6 sm:mb-8">
                Formally trained as an engineer (B.E., Mumbai University). Managing enterprise MuleSoft & Salesforce customer portfolios while exploring how AI transforms post-sales client governance, executive QBRs, and customer intelligence.
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-light-border space-y-3 sm:space-y-4 shadow-sm">
                <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-dark border-b border-light-border pb-2">
                  Academic & Engineering Foundation
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-dark">
                  <span>Bachelor of Engineering (B.E.)</span>
                  <span className="text-[11px] sm:text-xs font-mono text-light-soft">Mumbai Univ</span>
                </div>
                <div className="text-xs text-light-soft leading-relaxed">
                  Rigorous engineering training in systems architecture, logic flows, and technical problem solving applied to multi-million ARR commercial accounts.
                </div>
              </div>
            </div>

            {/* Right Column: Stack Cards + Interactive Working Papers */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              
              {/* Stack Card 1: Salesforce & MuleSoft */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-light-border hover:border-dark transition-all flex items-start gap-4 sm:gap-5 shadow-sm group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E8F4FD] border border-[#BCE1FA] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-[#00A1E0]">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="text-base sm:text-lg font-bold text-dark group-hover:text-[#00A1E0] transition-colors">
                      Salesforce & MuleSoft Ecosystem
                    </h4>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-dark bg-accent px-2 sm:px-2.5 py-0.5 rounded-full">
                      Dual Certified
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-semibold text-light-soft mb-1.5 sm:mb-2">
                    Salesforce Certified AI Associate • Salesforce Certified Associate
                  </div>
                  <p className="text-xs sm:text-sm text-light-soft leading-relaxed">
                    Direct custody over $1M ARR Salesforce CRM & MuleSoft middleware accounts, aligning architectural deliverables with executive commercial renewals and steering committees.
                  </p>
                </div>
              </div>

              {/* Stack Card 2: HubSpot Revenue Stack */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-light-border hover:border-dark transition-all flex items-start gap-4 sm:gap-5 shadow-sm group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FFF1EB] border border-[#FFD0BE] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#FF7A59]">
                    <path d="M17.8 7.2V4.5c.8-.4 1.4-1.3 1.4-2.3 0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5c0 1 .6 1.9 1.4 2.3v2.7c-.8.3-1.5.8-2 1.5L8.7 6.4c.1-.3.2-.6.2-.9 0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3c.4 0 .7-.1 1-.2l2.9 2.3c-.4.7-.6 1.5-.6 2.4s.2 1.7.6 2.4l-2.9 2.3c-.3-.1-.6-.2-1-.2-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.3-.1-.6-.2-.9l2.9-2.3c.5.7 1.2 1.2 2 1.5v2.7c-.8.4-1.4 1.3-1.4 2.3 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-1-.6-1.9-1.4-2.3v-2.7c1.8-.7 3.1-2.5 3.1-4.5s-1.3-3.8-3.1-4.5zm-1.1 6.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="text-base sm:text-lg font-bold text-dark group-hover:text-[#FF7A59] transition-colors">
                      HubSpot Revenue & Pipeline Automation
                    </h4>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-orange-950 bg-orange-100 px-2 sm:px-2.5 py-0.5 rounded-full">
                      Dual Certified
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-semibold text-light-soft mb-1.5 sm:mb-2">
                    Sales Software Certified • Inbound Sales Certified
                  </div>
                  <p className="text-xs sm:text-sm text-light-soft leading-relaxed">
                    Customer health-scoring models, automated lifecycle triggers, and pipeline governance across enterprise onboarding, retention, and expansion stages.
                  </p>
                </div>
              </div>

              {/* Stack Card 3: Applied AI in Post-Sales */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-light-border hover:border-dark transition-all flex items-start gap-4 sm:gap-5 shadow-sm group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="text-base sm:text-lg font-bold text-dark group-hover:text-purple-700 transition-colors">
                      Applied AI in Client Governance
                    </h4>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-dark bg-accent px-2 sm:px-2.5 py-0.5 rounded-full">
                      Active Practice
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-semibold text-light-soft mb-1.5 sm:mb-2">
                    LLM Telemetry Synthesis • Early Churn Detection • Executive QBRs
                  </div>
                  <p className="text-xs sm:text-sm text-light-soft leading-relaxed">
                    Developing streamlined workflows that convert raw platform telemetry, ticket escalation queues, and steering minutes into actionable executive QBR briefs.
                  </p>
                </div>
              </div>

              {/* Interactive Working Papers & Executive Memos */}
              <div className="p-5 sm:p-7 rounded-2xl bg-dark text-white space-y-3.5 sm:space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-accent font-bold">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    WORKING PAPERS & PERSPECTIVES
                  </span>
                  <span>TAP TO READ</span>
                </div>
                <div className="space-y-2.5 sm:space-y-3">
                  {workingPapers.map((paper) => (
                    <button
                      key={paper.id}
                      onClick={() => setActivePaper(paper)}
                      className="w-full text-left p-3.5 sm:p-4 bg-dark-card border border-dark-border rounded-xl flex items-center justify-between group hover:border-accent transition-all"
                    >
                      <div className="pr-3">
                        <div className="text-[9px] sm:text-[10px] font-mono text-accent uppercase tracking-wider mb-0.5">
                          {paper.type} • {paper.readTime}
                        </div>
                        <div className="text-xs sm:text-base font-bold text-white group-hover:text-accent transition-colors leading-snug">
                          {paper.title}
                        </div>
                      </div>
                      <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-dark-subtle border border-dark-border group-hover:bg-accent group-hover:text-accent-text group-hover:border-accent text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1 shrink-0 transition-all">
                        <span>Read</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          EXECUTIVE ENDORSEMENTS & PEER PROOF STRIP [DARK #0B0B0C]
      ─────────────────────────────────────────────────────────────── */}
      <section className="bg-dark text-white py-16 sm:py-24 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14">
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-accent block mb-2">
                COMMERCIAL & TECHNICAL REPUTATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                How Executive Sponsors Describe My Work
              </h2>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-dark-soft mt-2 sm:mt-0">
              US • UK • GLOBAL ENTERPRISE STAKEHOLDERS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {executiveEndorsements.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#141417] border border-dark-border flex flex-col justify-between hover:border-accent/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent opacity-80" />
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-dark border border-dark-border text-[10px] sm:text-[11px] font-mono font-bold text-accent">
                      {item.metricPill}
                    </span>
                  </div>
                  <p className="text-xs sm:text-base text-white/90 leading-relaxed mb-6 sm:mb-8">
                    “{item.quote}”
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-dark-border">
                  <div className="text-xs sm:text-sm font-bold text-white">{item.author}</div>
                  <div className="text-[10px] sm:text-xs font-mono text-dark-soft mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: OFF THE CLOCK / PERSONAL BENTO [LIGHT #FFFFFF]
          (Mobile-Engineered Acoustic Guitar Sequencer & Tactical Pitch)
      ─────────────────────────────────────────────────────────────── */}
      <section id="off-the-clock" className="bg-light py-16 sm:py-28 border-b border-light-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          
          <div className="max-w-3xl mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-dark block mb-2">
              PERSONAL CANVAS
            </span>
            <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-dark">
              Off the Clock.
            </h2>
            <p className="text-xs sm:text-base text-light-soft mt-2 sm:mt-3 leading-relaxed">
              The disciplines, standards, and passions that shape how I think, practice, and recharge.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
            
            {/* Tile 1: Acoustic Guitar 4-Bar Progression Sequencer (7 Cols) */}
            <div className="lg:col-span-7 bg-light-neutral border border-light-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between hover:border-dark transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white border border-light-border text-[10px] sm:text-xs font-mono font-bold text-dark">
                    <Music className="w-3.5 h-3.5 text-accent-text" />
                    ACOUSTIC GUITAR SEQUENCER
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-light-soft">KARPLUS-STRONG SYNTH</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold text-dark mb-2 sm:mb-3">
                  Classic Rock Standards & 4-Bar Loops
                </h3>
                <p className="text-xs sm:text-sm text-light-soft leading-relaxed max-w-xl mb-4 sm:mb-6">
                  Stepping through authentic 4-bar open-chord progressions using a physical Karplus-Strong string modeling engine.
                </p>

                {/* Interactive Sequencer Widget Box */}
                <div className="bg-white border border-light-border rounded-xl sm:rounded-2xl p-3.5 sm:p-5 mb-4 shadow-sm">
                  
                  {/* Top Bar: Song Title, BPM, and Master Play / Stop Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-light-border pb-3">
                    <div>
                      <div className="text-sm sm:text-base font-bold text-dark flex items-center gap-2">
                        <span>{selectedSong.title}</span>
                        <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded bg-light-neutral text-light-soft">
                          {selectedSong.bpm} BPM
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-xs font-mono text-light-soft mt-0.5">{selectedSong.artist}</div>
                    </div>

                    <button
                      onClick={() => togglePlaySong(selectedSong)}
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-bold inline-flex items-center justify-center gap-2 transition-all shadow-md ${
                        isPlayingSequencer 
                          ? 'bg-accent text-accent-text hover:bg-accent-hover ring-2 ring-dark' 
                          : 'bg-dark text-white hover:bg-accent hover:text-accent-text'
                      }`}
                    >
                      {isPlayingSequencer ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Stop Loop</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Progression</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 4-Bar Visual Chord Boxes (2x2 on Mobile, 4x1 on Tablet/Desktop) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                    {selectedSong.chords.map((chord, idx) => {
                      const isActive = isPlayingSequencer && activeChordIndex === idx;
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                            isActive
                              ? 'bg-accent border-dark text-accent-text shadow-lg scale-105 ring-2 ring-dark'
                              : 'bg-light-neutral border-light-border text-dark'
                          }`}
                        >
                          <div className="text-[9px] sm:text-[10px] font-mono uppercase font-bold opacity-70">
                            Bar {idx + 1}
                          </div>
                          <div className="text-lg sm:text-xl font-black mt-0.5 tracking-tight truncate">
                            {chord.name}
                          </div>
                          <div className="text-[8px] sm:text-[9px] font-mono mt-0.5 opacity-80">
                            {chord.tab}
                          </div>

                          {isActive && (
                            <div className="flex items-center justify-center gap-1 mt-1.5 sm:mt-2">
                              <span className="w-1 h-2.5 sm:h-3 bg-accent-text animate-pulse rounded-full" />
                              <span className="w-1 h-3.5 sm:h-4 bg-accent-text animate-pulse delay-75 rounded-full" />
                              <span className="w-1 h-2 sm:h-2.5 bg-accent-text animate-pulse delay-150 rounded-full" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Song Switcher Selector Pills */}
                  <div className="space-y-1.5 pt-2 border-t border-light-border">
                    <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-light-soft mb-1.5">
                      Select Repertoire Progression:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {songsRepertoire.map((song) => {
                        const isThisSelected = selectedSong.id === song.id;
                        return (
                          <button
                            key={song.id}
                            onClick={() => {
                              setSelectedSong(song);
                              if (isPlayingSequencer) {
                                togglePlaySong(song);
                              }
                            }}
                            className={`text-left p-2 sm:p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                              isThisSelected 
                                ? 'bg-dark text-white font-bold shadow-md' 
                                : 'bg-light-neutral text-dark hover:bg-light-subtle font-medium'
                            }`}
                          >
                            <div>
                              <div className="font-semibold text-xs">{song.title}</div>
                              <div className={`text-[10px] ${isThisSelected ? 'text-accent' : 'text-light-soft'}`}>
                                {song.artist} • {song.bpm} BPM
                              </div>
                            </div>
                            {isThisSelected && isPlayingSequencer && (
                              <Volume2 className="w-3.5 h-3.5 text-accent animate-bounce shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              <div className="pt-2 text-[10px] sm:text-xs font-mono text-light-soft flex items-center justify-between border-t border-light-border">
                <span>RHYTHM: Down-Up Strum</span>
                <span className="text-dark font-bold">Physical String Modeling</span>
              </div>
            </div>

            {/* Right Column (5 Cols): Football & Daily Rituals Stack */}
            <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-8 justify-between">
              
              {/* Tile 2: Football & Manchester City (Tactical Pitch Canvas) */}
              <div className="bg-dark text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-dark-border flex flex-col justify-between flex-1 group relative overflow-hidden">
                
                {/* Background Tactical Pitch SVG Graphic */}
                <div className="absolute inset-0 opacity-15 pointer-events-none p-4 flex items-center justify-center">
                  <svg viewBox="0 0 400 300" className="w-full h-full stroke-white fill-none stroke-[1.5]">
                    <rect x="20" y="20" width="360" height="260" rx="4" />
                    <line x1="200" y1="20" x2="200" y2="280" />
                    <circle cx="200" cy="150" r="45" />
                    <rect x="20" y="80" width="60" height="140" />
                    <rect x="320" y="80" width="60" height="140" />
                    <circle cx="50" cy="150" r="4" className="fill-accent stroke-accent" />
                    <circle cx="100" cy="60" r="4" className="fill-white" />
                    <circle cx="100" cy="120" r="4" className="fill-white" />
                    <circle cx="100" cy="180" r="4" className="fill-white" />
                    <circle cx="100" cy="240" r="4" className="fill-white" />
                    <circle cx="170" cy="110" r="4" className="fill-accent stroke-accent" />
                    <circle cx="170" cy="190" r="4" className="fill-accent stroke-accent" />
                    <circle cx="250" cy="70" r="4" className="fill-white" />
                    <circle cx="250" cy="150" r="4" className="fill-white" />
                    <circle cx="250" cy="230" r="4" className="fill-white" />
                    <circle cx="310" cy="150" r="4" className="fill-accent stroke-accent" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-accent text-accent-text text-[10px] sm:text-xs font-mono font-bold inline-flex items-center gap-1 shadow">
                      <Trophy className="w-3.5 h-3.5" />
                      2× UNIVERSITY CHAMPION
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-dark-soft">MAN CITY</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1.5 sm:mb-2">
                    Football & Tactical Pitch Spacing
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-soft leading-relaxed mb-4 sm:mb-6">
                    Two-time Annual University Football Championship winner at Mumbai University and dedicated Manchester City supporter.
                  </p>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-dark-card border border-dark-border space-y-1.5 sm:space-y-2 text-xs">
                    <div className="flex justify-between font-mono text-[11px] sm:text-xs">
                      <span className="text-dark-soft">Pitch Role:</span>
                      <span className="font-bold text-white">Central Midfield Control</span>
                    </div>
                    <div className="flex justify-between font-mono text-[11px] sm:text-xs">
                      <span className="text-dark-soft">Tactical Insight:</span>
                      <span className="font-bold text-accent">Positional Play & Overloads</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-dark-soft pt-1 leading-snug">
                      Midfield control, spatial awareness, and passing tempo mirror high-velocity cross-functional client teams.
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-dark-border flex items-center justify-between text-[10px] sm:text-xs font-mono text-dark-soft relative z-10">
                  <span>CLUB: MANCHESTER CITY</span>
                  <span className="text-accent font-bold">PEP TACTICS</span>
                </div>
              </div>

              {/* Tile 3: The Daily Ritual (Solid Accent Color Card) */}
              <div className="bg-accent text-accent-text p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between flex-1 relative overflow-hidden group shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-dark text-white text-[10px] sm:text-xs font-mono font-bold inline-flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-accent" />
                      DAILY RITUALS
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-bold">CADENCE</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold mb-1.5 sm:mb-2">
                    AeroPress Brew & 4-Day Training
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold opacity-85 leading-relaxed mb-4 sm:mb-6">
                    Freshly ground single-origin specialty coffee using the inverted AeroPress technique, followed by a disciplined 4-day resistance training split.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs font-mono font-bold">
                    <div className="bg-white/90 text-dark p-2.5 sm:p-3 rounded-xl border border-black/10">
                      <div className="text-xs">AEROPRESS</div>
                      <div className="text-[10px] font-normal text-dark/70">Inverted • 200°F</div>
                    </div>
                    <div className="bg-white/90 text-dark p-2.5 sm:p-3 rounded-xl border border-black/10">
                      <div className="text-xs">TRAINING</div>
                      <div className="text-[10px] font-normal text-dark/70">4-Day Split</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-black/15 flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold">
                  <span>RHYTHM & FOCUS</span>
                  <span>CONSISTENCY</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: HIGH-IMPACT DARK FOOTER [DARK #0B0B0C]
          (Yuya + Webstacked Close with Direct Booking)
      ─────────────────────────────────────────────────────────────── */}
      <footer id="contact" className="bg-dark text-white pt-16 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          
          <div className="border-b border-dark-border pb-12 sm:pb-20 mb-8 sm:mb-12">
            
            {/* Executive Mobility & Turnkey Readiness Strip */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-subtle border border-dark-border text-[11px] sm:text-xs font-mono text-white">
                <Globe2 className="w-3.5 h-3.5 text-accent" />
                Live US (EST/PST) & UK/Ireland (GMT) Overlap
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-subtle border border-dark-border text-[11px] sm:text-xs font-mono text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Turnkey Remote Onboarding (Deel / Remote.com / EOR)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-subtle border border-dark-border text-[11px] sm:text-xs font-mono text-white">
                <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                Open to UK, Ireland (CSEP) & US Relocation
              </span>
            </div>

            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-accent block mb-3 sm:mb-4">
              INITIATE COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] sm:leading-[1.0] text-white max-w-4xl mb-5 sm:mb-8">
              Curious about what we can build together? Let’s create durable enterprise growth.
            </h2>
            <p className="text-sm sm:text-lg text-dark-soft max-w-2xl leading-relaxed mb-8 sm:mb-10">
              Available for full-time Client Partner & Customer Success leadership roles, strategic advisory mandates, and early-stage technical collaborations.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a 
                href="https://calendar.app.google/3yNWBXCxBVos8ufr8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-accent text-accent-text font-black text-sm sm:text-base hover:bg-accent-hover transition-all inline-flex items-center justify-center gap-2 group shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                Book 15-Min on Google Calendar
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a 
                href="/Yug-Jain-Executive-Resume.pdf"
                download="Yug-Jain-Executive-Resume.pdf"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white text-dark font-extrabold text-sm sm:text-base hover:bg-accent hover:text-accent-text transition-all inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-5 h-5" />
                Download Executive CV (PDF)
              </a>

              <a 
                href="https://linkedin.com/in/yugjain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-dark-card border border-dark-border text-white font-bold text-sm sm:text-base hover:border-white transition-all inline-flex items-center justify-center gap-2"
              >
                Connect on LinkedIn <ExternalLink className="w-4 h-4 text-dark-soft" />
              </a>
            </div>
          </div>

          {/* Bottom Colophon (3-Column Metadata Row) */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs font-mono text-dark-soft gap-3 sm:gap-4 text-center sm:text-left">
            <div>GLOBAL OPERATING FOOTPRINT: US • UK • IRELAND • INDIA (REMOTE-CAPABLE)</div>
            <div>DESIGNED WITH HIGH CONTRAST & BENTO ENERGY</div>
            <div>© 2026 YUG JAIN • ALL RIGHTS RESERVED</div>
          </div>

        </div>
      </footer>

    </div>
  );
}
