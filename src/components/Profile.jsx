import React, { useEffect, useState } from 'react';
import {
  ChevronLeft, ChevronRight, BadgeCheck, Landmark, FileText,
  MessageSquare, Mail, RefreshCw, LogOut, Lock, EyeOff, Share,
  ArrowRight, Gauge, ArrowUp
} from 'lucide-react';
import laurelLeft from '../assets/laurel-left.png';
import laurelRight from '../assets/laurel-right.png';
import profileIcon from '../assets/profile icon.png';

const SCORE = 73;

/* Tier ladder — something to climb toward */
const TIERS = [
  { name: 'Sorting Out', min: 0, max: 40, color: '#E53935' },
  { name: 'Finding Your Feet', min: 41, max: 60, color: '#FF9500' },
  { name: 'Getting Sorted', min: 61, max: 80, color: '#1A7A4A' },
  { name: 'Fully Sorted', min: 81, max: 100, color: '#00C853' },
];
const tierFor = (score) => TIERS.find((t) => score >= t.min && score <= t.max);

/* Bar color by score out of 5 — one consistent S/L across the ramp, hue is the only variable
   (green 145°, amber 35°, red 2° — all at S 68% / L 40%) so the three states read as one system */
const barColor = (score) => {
  if (score >= 4) return 'hsl(145, 68%, 40%)';
  if (score >= 2.5) return 'hsl(35, 68%, 40%)';
  return 'hsl(2, 68%, 40%)';
};

/* Row toggle — brand green when on */
const Toggle = ({ on, onClick }) => (
  <button
    onClick={onClick}
    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${
      on ? 'bg-[#1A7A4A]' : 'bg-[#dddddd]'
    }`}
  >
    <div
      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
        on ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export default function Profile({ onClose, onNavigate, balanceVisible, setBalanceVisible }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [landed, setLanded] = useState(false);     // score finished counting → laurels spring, bars fill
  const [barsDone, setBarsDone] = useState(false); // bars finished → AI insight fades in

  const tier = tierFor(SCORE);

  /* Score counts up 0 → 73 over 1.2s ease-out; bars stagger after; insight last */
  useEffect(() => {
    let raf;
    const start = performance.now() + 250;
    const duration = 1200;
    const tick = (now) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(eased * SCORE));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLanded(true);
      }
    };
    raf = requestAnimationFrame(tick);
    const insightTimer = setTimeout(() => setBarsDone(true), 250 + 1200 + 3 * 150 + 800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(insightTimer);
    };
  }, []);

  const scoreFactors = [
    { label: 'EMI Load', detail: '22% of income', score: 4.5, pct: 90 },
    { label: 'Emergency Fund', detail: '2.1 months cover', score: 2, pct: 40, focus: true },
    { label: 'Savings Rate', detail: '18% of income', score: 3.5, pct: 70 },
    { label: 'Consistency', detail: '4-month streak', score: 4.5, pct: 90 },
  ];

  const linkedData = [
    { icon: Landmark, label: 'Bank accounts', sub: 'HDFC · ICICI, via Account Aggregator' },
    { icon: FileText, label: 'Credit bureau', sub: 'Score refreshed monthly' },
    { icon: MessageSquare, label: 'SMS parsing', sub: 'Bank messages only' },
    { icon: Mail, label: 'Email parsing', sub: 'Bills and statements only' },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col animate-slideUp overflow-hidden select-none">

      {/* ---------- 1. Top Navigation Bar ---------- */}
      <div className="shrink-0 px-4 pt-4 pb-2 flex items-center justify-between bg-white z-20">
        <button
          onClick={onClose}
          className="w-9 h-9 bg-[#F2F2F2] rounded-full flex items-center justify-center hover:bg-[#ebebeb] transition active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-[#0D0D0D]" />
        </button>
        <span className="font-poppins font-semibold text-[16px] text-[#0D0D0D]">Profile</span>
        <button className="w-9 h-9 bg-[#F2F2F2] rounded-full flex items-center justify-center hover:bg-[#ebebeb] transition active:scale-90 cursor-pointer">
          <Share className="w-4 h-4 text-[#0D0D0D]" />
        </button>
      </div>

      {/* ---------- Scrollable content ---------- */}
      <div className="flex-1 overflow-y-auto scrollbar-none">

        {/* ---------- 2. Identity Block ---------- */}
        <div className="px-6 mt-6 flex items-center">
          {/* Left column — initials avatar with tier ring */}
          <div className="w-[45%] flex flex-col items-center text-center pr-4">
            <div className="relative">
              {/* Tier ring */}
              <div
                className="w-[88px] h-[88px] rounded-full p-[3px]"
                style={{ background: `conic-gradient(${tier.color} ${SCORE}%, #EEEEEE 0)` }}
              >
                <div className="w-full h-full rounded-full bg-white p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#f7f7f7]">
                    <img src={profileIcon} alt="Parash" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <span className="absolute bottom-0.5 right-0.5 w-5 h-5 bg-[#1A7A4A] rounded-full border-2 border-white flex items-center justify-center">
                <BadgeCheck className="w-3 h-3 text-white" />
              </span>
            </div>
            <span className="font-poppins font-bold text-[20px] text-[#0D0D0D] mt-3 leading-none">
              Parash
            </span>
            <span className="font-poppins text-[13px] text-[#8A8A8A] mt-1.5 leading-none">
              {tier.name}
            </span>
          </div>

          {/* Right column — 3 measurable-delta stats (trend, not static counts) */}
          <div className="w-[55%] pl-6">
            {[
              { value: '+8', label: 'Score vs last month' },
              { value: '+₹18,400', label: 'Saved this month' },
              { value: '+6%', label: 'Goal progress this month' },
            ].map((stat, i, arr) => (
              <div
                key={stat.label}
                className={`py-3 ${i < arr.length - 1 ? 'border-b border-[#EEEEEE]' : ''} ${i === 0 ? 'pt-0' : ''} ${i === arr.length - 1 ? 'pb-0' : ''}`}
              >
                <div className="flex items-baseline space-x-1">
                  <p className="font-poppins font-medium text-[20px] text-[#0D0D0D] leading-none tracking-[-0.2px]">
                    {stat.value}
                  </p>
                  <ArrowUp className="w-3 h-3 text-[#0D0D0D] shrink-0 mb-[3px]" strokeWidth={3} />
                </div>
                <p className="font-poppins font-medium text-[12px] text-[#8A8A8A] mt-1.5 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- 3. Score Hero Block ---------- */}
        <div className="mt-10 px-6 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <img
              src={laurelLeft}
              alt=""
              className="h-16 w-auto object-contain transition-all duration-500"
              style={{
                transform: landed ? 'scale(1)' : 'scale(0.5)',
                opacity: landed ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
            <span className="font-poppins font-bold text-[72px] text-[#0D0D0D] leading-[1.05] tracking-[-1px] min-w-[96px] text-center tabular-nums">
              {displayScore}
            </span>
            <img
              src={laurelRight}
              alt=""
              className="h-16 w-auto object-contain transition-all duration-500"
              style={{
                transform: landed ? 'scale(1)' : 'scale(0.5)',
                opacity: landed ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          </div>

          <span className="font-poppins font-semibold text-[16px] text-[#0D0D0D] mt-1">Sorted Score</span>
          <p className="font-poppins text-[14px] text-[#8A8A8A] text-center leading-[1.45] mt-2 max-w-[300px]">
            Better than 68% of people who joined the same month, based on your real bank data.
          </p>
          <span className="font-poppins text-[11px] text-[#8A8A8A] bg-[#F2F2F2] px-3 py-1.5 rounded-full mt-3 leading-none">
            Last updated: Today, 9:41 AM
          </span>
        </div>

        {/* ---------- 4. AI Insight Callout ---------- */}
        <div
          className="mx-6 mt-5 bg-[#F0FAF4] rounded-[12px] p-4 flex items-start space-x-3 transition-opacity duration-700"
          style={{ opacity: barsDone ? 1 : 0 }}
        >
          {/* Spark icon */}
          <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0 mt-0.5" fill="#1A7A4A">
            <path d="M8 1l1.2 4.2L13.5 6.5l-4.3 1.3L8 12l-1.2-4.2L2.5 6.5l4.3-1.3L8 1z" />
            <circle cx="13" cy="12.5" r="1.2" />
          </svg>
          <p className="font-poppins text-[13px] text-[#1A5C3A] leading-[1.5]">
            Your emergency fund is your biggest drag. Build 3 more months and your score jumps
            <span className="font-semibold"> ~12 points.</span>
          </p>
        </div>

        {/* ---------- 5. Score Breakdown ---------- */}
        <div className="px-6 mt-5">
          <h3 className="font-poppins font-semibold text-[14px] text-[#0D0D0D] mb-4">
            What makes your score
          </h3>

          <div>
            {scoreFactors.map((f, i, arr) => (
              <div
                key={f.label}
                className={`py-[10px] ${i < arr.length - 1 ? 'border-b border-[#EEEEEE]' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-poppins font-semibold text-[14px] text-[#0D0D0D] leading-none">
                        {f.label}
                      </span>
                      {f.focus && (
                        <span className="font-poppins font-semibold text-[10px] text-[#E53935] bg-[#FFE8E8] px-2 py-1 rounded-[20px] leading-none">
                          FOCUS
                        </span>
                      )}
                    </div>
                    <span className="font-poppins text-[12px] text-[#8A8A8A] block mt-1.5 leading-none">
                      {f.detail}
                    </span>
                  </div>
                  <span className="font-poppins font-bold text-[16px] text-[#0D0D0D] shrink-0">
                    {f.score}
                    <span className="text-[#8A8A8A] text-[13px] font-medium">/5</span>
                  </span>
                </div>

                {/* Progress bar — 6px, color-coded, sequential fill */}
                <div className="w-full h-[6px] bg-[#EEEEEE] rounded-[4px] overflow-hidden">
                  <div
                    className="h-full rounded-[4px] transition-all duration-700 ease-out"
                    style={{
                      width: landed ? `${f.pct}%` : '0%',
                      backgroundColor: barColor(f.score),
                      transitionDelay: `${i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- 6. Credit Score Strip ---------- */}
        <button className="mx-6 mt-4 w-[calc(100%-48px)] bg-[#F7F7F7] rounded-[12px] p-4 flex items-center justify-between cursor-pointer hover:bg-[#f2f2f2] active:scale-[0.99] transition text-left">
          <div className="flex items-center min-w-0">
            <Gauge className="w-5 h-5 text-[#0D0D0D] shrink-0" strokeWidth={1.8} />
            <div className="ml-3.5 min-w-0">
              <p className="font-poppins font-medium text-[13px] text-[#0D0D0D] leading-none">Credit Score</p>
              <p className="mt-1.5 leading-none">
                <span className="font-poppins font-semibold text-[14px] text-[#1A7A4A]">
                  {balanceVisible ? '726' : '•••'}
                </span>
                <span className="font-poppins font-semibold text-[14px] text-[#1A7A4A]"> – Good</span>
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8A8A8A] shrink-0" />
        </button>

        {/* ---------- Privacy & data (secondary zone) ---------- */}
        <div className="px-6 mt-8">
          <h3 className="font-poppins font-semibold text-[14px] text-[#0D0D0D] mb-1">Privacy</h3>
          <div className="divide-y divide-[#EEEEEE]">
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center min-w-0 pr-4">
                <EyeOff className="w-5 h-5 text-[#0D0D0D] shrink-0" strokeWidth={1.6} />
                <div className="ml-4 min-w-0">
                  <p className="font-poppins text-[14px] text-[#0D0D0D] leading-none">Hide amounts</p>
                  <p className="font-poppins text-[12px] text-[#8A8A8A] mt-1.5 leading-tight">
                    Masks balances across the app
                  </p>
                </div>
              </div>
              <Toggle on={!balanceVisible} onClick={() => setBalanceVisible(!balanceVisible)} />
            </div>

            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center min-w-0 pr-4">
                <Lock className="w-5 h-5 text-[#0D0D0D] shrink-0" strokeWidth={1.6} />
                <div className="ml-4 min-w-0">
                  <p className="font-poppins text-[14px] text-[#0D0D0D] leading-none">App lock</p>
                  <p className="font-poppins text-[12px] text-[#8A8A8A] mt-1.5 leading-tight">Face ID on open</p>
                </div>
              </div>
              <span className="font-poppins font-bold text-[8px] uppercase tracking-[0.32px] text-[#8A8A8A] bg-[#F2F2F2] px-2 py-1 rounded-full shrink-0">
                Soon
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 mt-6">
          <h3 className="font-poppins font-semibold text-[14px] text-[#0D0D0D] mb-1">Linked data</h3>
          <div className="divide-y divide-[#EEEEEE]">
            {linkedData.map((row) => (
              <button
                key={row.label}
                className="w-full py-4 flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center min-w-0 pr-3">
                  <row.icon className="w-5 h-5 text-[#0D0D0D] shrink-0" strokeWidth={1.6} />
                  <div className="ml-4 min-w-0">
                    <p className="font-poppins text-[14px] text-[#0D0D0D] leading-none">{row.label}</p>
                    <p className="font-poppins text-[12px] text-[#8A8A8A] mt-1.5 leading-tight truncate">{row.sub}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A7A4A]" />
                    <span className="font-poppins font-semibold text-[11px] text-[#1A7A4A]">Active</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#c1c1c1] group-hover:text-[#8A8A8A] transition" />
                </div>
              </button>
            ))}

            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center min-w-0 pr-4">
                <RefreshCw className="w-5 h-5 text-[#0D0D0D] shrink-0" strokeWidth={1.6} />
                <div className="ml-4 min-w-0">
                  <p className="font-poppins text-[14px] text-[#0D0D0D] leading-none">Auto-sync transactions</p>
                  <p className="font-poppins text-[12px] text-[#8A8A8A] mt-1.5 leading-tight">Refreshes every 24 hours</p>
                </div>
              </div>
              <Toggle on onClick={() => {}} />
            </div>
          </div>
          <p className="font-poppins text-[12px] text-[#8A8A8A] leading-[1.5] mt-3">
            Pause or revoke any of these anytime.{' '}
            <span className="font-medium text-[#0D0D0D] underline cursor-pointer">Your data stays yours.</span>
          </p>
        </div>

        {/* ---------- Footer ---------- */}
        <div className="px-6 mt-8 pb-8 space-y-4">
          <button className="w-full h-12 rounded-full border border-[#0D0D0D] text-[#0D0D0D] font-poppins text-[15px] font-medium flex items-center justify-center space-x-2 hover:bg-[#F7F7F7] active:scale-[0.98] transition cursor-pointer">
            <LogOut className="w-4 h-4" strokeWidth={1.8} />
            <span>Log out</span>
          </button>
          <p className="font-poppins text-center text-[12px] text-[#8A8A8A]">
            Sorted v1.0 · <span className="underline cursor-pointer">Terms</span> ·{' '}
            <span className="underline cursor-pointer">Privacy</span>
          </p>
        </div>
      </div>

      {/* ---------- 7. Bottom CTA — Sticky ---------- */}
      <div className="shrink-0 px-6 pt-3 pb-[34px] bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.04)] z-20">
        <button
          onClick={() => {
            onClose();
            onNavigate('ask-ai', 'savings-plan');
          }}
          className="w-full h-[52px] rounded-full bg-[#1A7A4A] text-white font-poppins font-medium text-[16px] flex items-center justify-center space-x-2 hover:bg-[#166540] active:scale-[0.98] transition cursor-pointer"
        >
          <span>See how to improve my score</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
