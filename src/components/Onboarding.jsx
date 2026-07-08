import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Edit2,
  ChevronRight,
  Info,
  X,
  ChevronDown
} from 'lucide-react';
import maskGroupImg from '../assets/Mask group.png';
import ellipseImg from '../assets/Ellipse 3639.png';
import scoreImg from '../assets/Score.png';
import scoreGlowImg from '../assets/score fglow.png';
import splashVideo from '../assets/Change_the_background_of_this.mp4';
import commitmentsTotalImg from '../assets/40,120.png';
import commitmentsGlowImg from '../assets/glow for the money .png';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [showExplainer, setShowExplainer] = useState(false);
  const [loadingTicks, setLoadingTicks] = useState([false, false, false, false]);
  const timerRef = useRef(null);

  const [heroRevealed, setHeroRevealed] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    subscriptions: true,
    medical: true,
    savings: true,
    emis: true,
    rent: true
  });

  // Step 8 — Sorted Score Reveal
  const [scoreRevealed, setScoreRevealed] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [rowsVisible, setRowsVisible] = useState(false);
  const [showScoreInfo, setShowScoreInfo] = useState(false);

  useEffect(() => {
    if (step === 8) {
      setScoreRevealed(false);
      setCardVisible(false);
      setRowsVisible(false);

      const t1 = setTimeout(() => setScoreRevealed(true), 100);
      const t2 = setTimeout(() => setCardVisible(true), 500);
      const t3 = setTimeout(() => setRowsVisible(true), 800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [step]);

  // Handle Commitments Reveal animation (Step 7)
  useEffect(() => {
    if (step === 7) {
      setHeroRevealed(false);
      setCardsVisible(false);

      const t1 = setTimeout(() => setHeroRevealed(true), 100);
      const t2 = setTimeout(() => setCardsVisible(true), 500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [step]);

  // Steps definitions:
  // 1: Splash
  // 2: Phone Entry
  // 3: OTP Code
  // 4: Consent Connect
  // 6: Checklist Loading (Skip 5 since it's a modal sheet over 4)
  // 7: Onboarding Complete

  // Handle OTP timer
  useEffect(() => {
    if (step === 3 && resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, resendTimer]);

  // Handle Sequential Loading Checklist (Step 6)
  useEffect(() => {
    if (step === 6) {
      setLoadingTicks([false, false, false, false]);
      
      const timings = [800, 1600, 2400, 3200];
      const timers = timings.map((time, index) => {
        return setTimeout(() => {
          setLoadingTicks(prev => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }, time);
      });

      // Auto transition to Screen 7 after all ticks are complete
      const finishTimer = setTimeout(() => {
        setStep(7);
      }, 4200);

      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(finishTimer);
      };
    }
  }, [step]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep(3);
      setResendTimer(30);
    }
  };

  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 4) {
      setOtp(val);
      if (val.length === 4) {
        // Auto submit with small delay
        setTimeout(() => {
          setStep(4);
        }, 500);
      }
    }
  };

  const formatTimer = (seconds) => {
    return `0:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-white relative text-[#0D0D0D] font-sans pb-8 select-none h-full overflow-hidden">
      
      {/* Top Bar for Back Navigation */}
      {(step === 2 || step === 3 || step === 4) && (
        <div className="px-6 pt-5 pb-2 shrink-0 z-10 flex items-center justify-between">
          {step > 2 ? (
            <button 
              onClick={() => setStep(step === 6 ? 4 : step - 1)}
              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}
          
          <span className="text-[12px] font-medium text-slate-400 font-poppins">
            Step {step - 1} of 5
          </span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-between px-7 pt-8 pb-4 relative z-10 h-full">
        
        {/* Steps 1-3: shared persistent video background (never unmounts, so playback never restarts) */}
        {step <= 3 && (
          <div className="absolute inset-0 z-40 bg-[#B4B4B4] flex flex-col select-none overflow-hidden">

            <video
              src={splashVideo}
              autoPlay
              loop
              muted
              playsInline
              className={
                step === 1
                  ? "absolute left-1/2 top-10 -translate-x-1/2 w-[92%] h-auto object-contain transition-all duration-500 ease-out"
                  : "absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              }
              style={
                step === 1
                  ? {
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                      maskComposite: 'intersect',
                      WebkitMaskComposite: 'source-in',
                    }
                  : undefined
              }
            />

            {/* Step 1: Splash copy + CTA */}
            {step === 1 && (
              <div className="relative z-10 mt-auto px-7 pb-6 space-y-6 shrink-0">
                <div className="space-y-3">
                  <h1 className="text-[40px] leading-[1.05] font-denton font-medium text-[#0D0D0D]">
                    Lets get your<br />money sorted
                  </h1>
                  <p className="text-[16px] text-[#5A5F6D] font-poppins">
                    Take Control of Your Money
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full text-white py-4 rounded-full font-poppins font-bold text-[16px] cursor-pointer transition duration-200 active:scale-[0.98] shadow-lg bg-[#07995C] hover:bg-[#068550]"
                >
                  Get started
                </button>

                {/* Home indicator */}
                <div className="w-full h-[24px] shrink-0 flex items-center justify-center">
                  <div className="w-[120px] h-[5px] bg-black rounded-full"></div>
                </div>
              </div>
            )}

            {/* Steps 2 & 3: bottom sheet over the video */}
            {(step === 2 || step === 3) && (
              <div
                className="relative z-10 mt-auto bg-white rounded-t-[28px] px-7 pt-8 pb-5 flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.12)] animate-slide-up"
                style={{ minHeight: '46%' }}
              >
                {step === 2 ? (
                  <form onSubmit={handlePhoneSubmit} className="flex flex-col flex-1">
                    <p className="text-[14px] text-[#5A5F6D] font-poppins font-medium mb-3">Enter your phone no</p>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength="10"
                      placeholder="00000 00000"
                      autoFocus
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#07995C] outline-none text-[38px] font-poppins font-medium text-[#0D0D0D] placeholder-slate-300 pb-2 transition-colors"
                    />

                    <div className="flex-1" />

                    <button
                      type="submit"
                      disabled={phone.length !== 10}
                      className="w-full text-white py-4 rounded-full font-poppins font-bold text-[16px] transition duration-200 active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed bg-[#07995C] hover:bg-[#068550]"
                    >
                      Get started
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col flex-1">
                    <p className="text-[13px] text-[#5A5F6D] font-poppins font-semibold mb-6">Enter OTP</p>
 
                    <div className="relative select-none">
                      <div className="flex justify-between">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="w-[64px] text-center">
                            <div className="h-10 flex items-center justify-center text-[28px] font-poppins font-bold text-[#0D0D0D]">
                              {otp[i] || ''}
                            </div>
                            <div className={`h-[2px] ${otp.length === i ? 'bg-[#07995C]' : 'bg-black'}`}></div>
                          </div>
                        ))}
                      </div>
 
                      <input
                        type="tel"
                        maxLength="4"
                        autoFocus
                        value={otp}
                        onChange={handleOtpChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
 
                    <p className="text-[13px] text-[#5A5F6D] font-poppins mt-4">
                      Sent to +91 {phone}{' '}
                      <button
                        onClick={() => setStep(2)}
                        className="text-[#0D0D0D] font-semibold underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </p>
 
                    <div className="flex-1" />
 
                    <button
                      onClick={() => setStep(4)}
                      disabled={otp.length !== 4}
                      className="w-full text-white py-4 rounded-full font-poppins font-bold text-[16px] transition duration-200 active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed bg-[#07995C] hover:bg-[#068550]"
                    >
                      Get started
                    </button>
                  </div>
                )}
 
                {/* Home indicator */}
                <div className="w-full h-[20px] shrink-0 flex items-center justify-center mt-3">
                  <div className="w-[100px] h-[4px] bg-black rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Consent / Account Connect */}
        {step === 4 && (
          <div className="flex-1 flex flex-col justify-between h-full pt-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <h2 
                  className="text-[32px] font-denton font-medium text-[#0D0D0D] leading-tight"
                >
                  Connect your profile
                </h2>
                <p className="text-[14.5px] text-[#5A5F6D] font-poppins leading-normal">
                  We need read-only access to find your commitments automatically.
                </p>
              </div>

              {/* Secure Info Points */}
              <div className="space-y-3.5 pt-4">
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex items-start space-x-3.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[13.5px] font-bold text-slate-800 font-poppins">Read-Only Statement Access</h4>
                    <p className="text-[11.5px] text-[#5A5F6D] font-poppins mt-0.5 leading-relaxed">We can only read transactional statements. No transaction capability.</p>
                  </div>
                </div>

                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex items-start space-x-3.5">
                  <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[13.5px] font-bold text-slate-800 font-poppins">Bank-Grade Encryption</h4>
                    <p className="text-[11.5px] text-[#5A5F6D] font-poppins mt-0.5 leading-relaxed">Your data is stored with 256-bit SSL encryption. Zero sharing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4">
              <button 
                onClick={() => setStep(6)}
                className="w-full bg-[#07995C] text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer hover:bg-[#068550] transition duration-200 active:scale-[0.98] font-poppins shadow-md"
              >
                Securely Connect
              </button>
              
              <button 
                onClick={() => setShowExplainer(true)}
                className="w-full text-slate-500 hover:text-slate-800 text-[13px] font-medium transition cursor-pointer text-center block py-1 font-poppins"
              >
                Why do we need this?
              </button>
            </div>
          </div>
        )}        {/* Step 6: Loading / Data Fetch */}
        {step === 6 && (
          <div className="flex-1 flex flex-col justify-between h-full pt-6">
            <div className="space-y-6">
              
              {/* Custom linear loading bar at the top */}
              <div className="space-y-2">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#E6F4EA] to-[#07995C] rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(loadingTicks.filter(Boolean).length / 4) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-poppins">
                  Analyzing statements...
                </p>
              </div>

              <h2 
                className="text-[28px] font-denton font-medium text-[#0D0D0D] leading-tight pt-1"
              >
                Pulling your picture together
              </h2>
              
              {/* Sequential Checklist */}
              <div className="space-y-4 pt-4">
                {[
                  'Bank accounts connected',
                  'EMIs & commitments found',
                  'Subscriptions detected',
                  'Credit profile loaded'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3.5 transition-all duration-300">
                    <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all ${loadingTicks[idx] ? 'bg-[#E6F4EA] border border-[#07995C]/25 text-[#07995C] scale-100' : 'bg-slate-50 border border-slate-200 text-transparent scale-90'}`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className={`text-[14px] font-medium transition-colors duration-300 font-poppins ${loadingTicks[idx] ? 'text-slate-800' : 'text-slate-400'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[12.5px] text-slate-400 text-center font-poppins pb-4">
              This usually takes under 10 seconds
            </p>
          </div>
        )}        {/* Step 7: Commitments Reveal Screen */}
        {step === 7 && (
          <div className="absolute inset-0 bg-white z-40 flex flex-col overflow-y-auto scrollbar-none">
            
            {/* Top Welcome Title */}
            <div className="px-6 pt-8 pb-2 space-y-1.5 shrink-0">
              <h2 className="font-denton font-bold text-[32px] text-[#0D0D0D] leading-none">
                You are in
              </h2>
              <p className="font-poppins font-normal text-[14.5px] text-[#8A8A8A]">
                We found <span className="font-semibold text-slate-700">7 commitments</span> totaling
              </p>
            </div>

            {/* Hero Visual — Glow + Total (oversized, cropped by the sheet below) */}
            <div className="relative w-full h-[260px] flex justify-center overflow-visible shrink-0">
              <div
                className="absolute top-0 w-[360px] h-[519px] transition-opacity duration-700 ease-out"
                style={{ opacity: heroRevealed ? 1 : 0 }}
              >
                <img
                  src={commitmentsGlowImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-transform duration-700 ease-out"
                  style={{ transform: `scale(${heroRevealed ? 1 : 0.85})` }}
                />
                <img
                  src={commitmentsTotalImg}
                  alt="₹40,120"
                  className="absolute left-1/2 top-[36%] h-[92px] w-auto object-contain z-10"
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
              </div>
            </div>

            {/* Bottom Sheet — Commitments List */}
            <div className="relative z-10 bg-[#F5F5F5] rounded-t-[28px] px-7 pt-8 pb-12 flex-1 space-y-6 shadow-[0_-8px_30px_rgba(0,0,0,0.02)]">
              <h3 className="font-denton font-semibold text-[22px] text-[#0D0D0D] pt-4 leading-none">
                Commitments
              </h3>

              {/* Categorized list */}
              <div className="space-y-4">
                {[
                  {
                    id: 'subscriptions',
                    name: 'Subscriptions',
                    dotColor: 'bg-orange-500',
                    total: '900',
                    items: [
                      { merchant: 'Netflix', bank: 'UPI', amount: '650', due: '12 days', source: 'SMS' },
                      { merchant: 'Spotify', bank: 'HDFC', amount: '250', due: '15 days', source: 'BANK' }
                    ]
                  },
                  {
                    id: 'medical',
                    name: 'Medical',
                    dotColor: 'bg-purple-500',
                    total: '650',
                    items: [
                      { merchant: 'Pharmeasy', bank: 'ICICI', amount: '650', due: '5 days', source: 'SMS' }
                    ]
                  },
                  {
                    id: 'savings',
                    name: 'Savings',
                    dotColor: 'bg-yellow-500',
                    total: '5,000',
                    items: [
                      { merchant: 'Mutual Fund SIP', bank: 'UPI', amount: '5,000', due: '2 days', source: 'AA' }
                    ]
                  },
                  {
                    id: 'emis',
                    name: 'EMIs / Loans',
                    dotColor: 'bg-blue-500',
                    total: '18,570',
                    items: [
                      { merchant: 'HDFC Home Loan', bank: 'HDFC', amount: '15,000', due: '10 days', source: 'AA' },
                      { merchant: 'iPad EMI', bank: 'ICICI', amount: '3,570', due: '22 days', source: 'BANK' }
                    ]
                  },
                  {
                    id: 'rent',
                    name: 'Rent',
                    dotColor: 'bg-red-500',
                    total: '15,000',
                    items: [
                      { merchant: 'Apartment Rent', bank: 'UPI', amount: '15,000', due: '4 days', source: 'BANK' }
                    ]
                  }
                ].map((category) => {
                  const isExpanded = expandedCategories[category.id];
                  return (
                    <div key={category.id} className="space-y-2.5">
                      {/* Category Header Row */}
                      <div 
                        onClick={() => setExpandedCategories(prev => ({ ...prev, [category.id]: !prev[category.id] }))}
                        className="flex items-center justify-between w-full cursor-pointer py-1.5 select-none"
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${category.dotColor}`} />
                          <span className="text-[12px] font-medium text-slate-500 font-poppins">
                            {category.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-slate-800">
                          <span className="text-[13px] font-semibold font-poppins">₹{category.total}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-185' : ''}`} />
                        </div>
                      </div>

                      {/* Commitment Cards List */}
                      {isExpanded && (
                        <div className="space-y-3">
                          {category.items.map((item, index) => (
                            <div 
                              key={index}
                              className={`bg-white rounded-[12px] p-3 border border-[#EEEEEE] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all duration-500 ease-out transform ${cardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                              style={{ transitionDelay: `${index * 50}ms` }}
                            >
                              <div className="flex items-center min-w-0 flex-1">
                                {/* Left: edit icon */}
                                <button className="text-[#CCCCCC] hover:text-[#0d0d0d] transition p-1.5 cursor-pointer shrink-0">
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                {/* Center content stack */}
                                <div className="flex flex-col pl-2 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-poppins font-medium text-[14px] text-[#0D0D0D] leading-none shrink-0">{item.merchant}</span>
                                    <span className="bg-slate-50 text-slate-500 border border-slate-200/60 rounded px-1.5 py-0.5 text-[9px] font-bold font-poppins shrink-0 uppercase tracking-wide leading-none">
                                      {item.source}
                                    </span>
                                  </div>
                                  <span className="font-poppins text-[10px] text-slate-400 mt-1.5 leading-none">
                                    via {item.bank}
                                  </span>
                                </div>
                              </div>

                              {/* Right: amount & due date */}
                              <div className="flex flex-col items-end shrink-0 ml-3">
                                <span className="font-poppins font-semibold text-[14.5px] text-slate-800 leading-none tabular-nums">
                                  ₹{item.amount}
                                </span>
                                <span className="font-poppins text-[10px] text-[#8A8A8A] mt-1.5 leading-none">
                                  Due {item.due}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Cash expenses nudge */}
              <div className="pt-4 space-y-3">
                <p className="font-poppins font-normal text-[13px] text-[#8A8A8A] italic">
                  People you pay in cash usually hide here. Anything we missed?
                </p>
                <div className="flex overflow-x-auto space-x-2 py-1 scrollbar-none snap-x w-full">
                  {['Maid', 'Cook', 'Driver', 'Parents', 'Society', 'Other'].map((chip, idx) => (
                    <button 
                      key={idx}
                      className="border border-[#0D0D0D] text-[#0D0D0D] px-4 py-1.5 rounded-full text-[13px] font-medium font-poppins hover:bg-slate-100 transition duration-150 cursor-pointer whitespace-nowrap snap-start shrink-0"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Sticky Bottom CTA */}
            <div className="sticky bottom-0 left-0 w-full bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5] to-transparent pt-4 pb-6 px-6 z-30 shrink-0">
              <button 
                onClick={() => setStep(8)}
                className="w-full bg-[#07995C] text-white py-4 rounded-full font-poppins font-bold text-[16px] text-center shadow-lg active:scale-95 transition cursor-pointer hover:bg-[#068550]"
              >
                Lock these in
              </button>
            </div>

          </div>
        )}

      </div>

        {/* Step 8: Sorted Score Reveal */}
        {step === 8 && (
          <div className="absolute inset-0 z-50 bg-[#EBEBEB] flex flex-col overflow-hidden">

            {/* Progress bar — 100% brand green */}
            <div className="w-full h-[3px] bg-[#E0E0E0] shrink-0">
              <div className="h-full bg-[#07995C] rounded-r-full" style={{ width: '100%' }} />
            </div>

            {/* Top Zone — Score Visual (60% of screen) */}
            <div className="flex-[0_0_60%] flex flex-col items-center justify-center relative select-none">

              {/* Glow + score number — fixed-size box so both share one center */}
              <div className="relative w-[260px] h-[260px] shrink-0 flex items-center justify-center">
                <img
                  src={scoreGlowImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-all duration-700 ease-out"
                  style={{
                    opacity: scoreRevealed ? 1 : 0,
                    transform: `scale(${scoreRevealed ? 1 : 0.7})`,
                  }}
                />

                {/* Score number + info icon */}
                <div
                  className="relative flex items-center z-10 transition-all duration-500 ease-out"
                  style={{
                    opacity: scoreRevealed ? 1 : 0,
                    transform: scoreRevealed ? 'translateY(0)' : 'translateY(8px)',
                  }}
                >
                  <img src={scoreImg} alt="73" className="h-[80px] w-auto object-contain" />
                  <button
                    onClick={() => setShowScoreInfo(true)}
                    className="ml-1 text-[#8A8A8A] cursor-pointer"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* out of 100 */}
              <p className="font-poppins font-normal text-[16px] text-[#4A4A4A] mt-1 z-10">out of 100</p>

              {/* Badge */}
              <div className="flex items-center space-x-1.5 px-4 py-2 rounded-[20px] mt-4 z-10" style={{ background: '#E8E8E8' }}>
                <Check className="w-3.5 h-3.5 text-[#0D0D0D]" strokeWidth={2.5} />
                <span className="font-poppins font-medium text-[12px] text-[#0D0D0D]">Based on your finances</span>
              </div>

            </div>

            {/* Bottom Zone — Summary Card (40%) */}
            <div
              className="flex-[0_0_40%] flex flex-col"
              style={{
                transform: cardVisible ? 'translateY(0)' : 'translateY(40px)',
                opacity: cardVisible ? 1 : 0,
                transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
              }}
            >
              <div className="bg-white rounded-t-[28px] flex-1 px-7 pt-8 pb-6 flex flex-col shadow-[0px_-4px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
                <div
                  className="absolute right-[-135px] bottom-[-145px] w-[300px] h-[300px] opacity-70 pointer-events-none"
                  style={{
                    background: 'repeating-radial-gradient(circle at center, transparent 0 8px, rgba(27, 226, 125, 0.42) 8.5px 9.5px)',
                    borderRadius: '50%',
                    filter: 'blur(0.15px)',
                  }}
                />
                <div className="absolute right-[-72px] bottom-[-78px] w-[210px] h-[210px] rounded-full bg-[#8DFFC6]/35 blur-[34px] pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-denton font-bold text-[28px] text-[#0D0D0D] leading-none">
                      Your Sorted Summary
                    </h2>
                    <p className="font-poppins font-medium text-[15px] text-[#A0A0A0] leading-[1.15] mt-2 max-w-[250px]">
                      You're on the right track, but there's room to improve.
                    </p>
                  </div>
                  <button
                    onClick={onComplete}
                    aria-label="Close summary"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#444444] hover:bg-slate-100 active:scale-95 transition cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" strokeWidth={2.1} />
                  </button>
                </div>

                <div className="relative z-10 mt-6 ml-5 flex-1">
                  <div className="absolute left-[8.5px] top-3 bottom-8 w-[2px] bg-[#EBEAF0]" />
                  {[
                    'EMI loads',
                    'Emergency fund',
                    'Savings rate',
                  ].map((label, i) => (
                    <div
                      key={label}
                      className="relative flex items-center gap-4 pb-8 last:pb-0"
                      style={{
                        opacity: rowsVisible ? 1 : 0,
                        transform: rowsVisible ? 'translateY(0)' : 'translateY(8px)',
                        transition: `opacity 0.4s ease ${i * 100}ms, transform 0.4s ease ${i * 100}ms`,
                      }}
                    >
                      <span className="w-[18px] h-[18px] rounded-full bg-[#F0F0F6] flex items-center justify-center shrink-0 relative z-10">
                        <span className="w-[6px] h-[6px] bg-[#4B3AB4] rotate-45 rounded-[1px]" />
                      </span>
                      <span className="font-poppins font-semibold text-[15px] text-[#45464A] leading-none">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onComplete}
                  className="relative z-10 w-full py-4 rounded-full font-poppins font-bold text-[18px] text-white text-center active:scale-[0.98] transition cursor-pointer bg-[#101614] shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Score Info Bottom Sheet */}
            {showScoreInfo && (
              <div className="absolute inset-0 bg-black/40 z-60 flex flex-col justify-end" onClick={() => setShowScoreInfo(false)}>
                <div className="bg-white rounded-t-[28px] p-7 space-y-4" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-denton font-bold text-[20px] text-[#0D0D0D]">How is this calculated?</h3>
                    <button onClick={() => setShowScoreInfo(false)} className="text-slate-400 cursor-pointer"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { factor: 'EMI to Income Ratio', weight: '30%' },
                      { factor: 'Emergency Fund Coverage', weight: '25%' },
                      { factor: 'Savings Rate', weight: '25%' },
                      { factor: 'Commitment Consistency', weight: '20%' },
                    ].map((f, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-[#F0F0F0] last:border-0">
                        <span className="font-poppins text-[14px] text-[#0D0D0D]">{f.factor}</span>
                        <span className="font-poppins font-semibold text-[13px] text-[#00A651]">{f.weight}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-poppins text-[12px] text-[#8A8A8A] leading-relaxed">Your Sorted Score is based on your actual bank data and recurring commitments — not a survey.</p>
                </div>
              </div>
            )}

          </div>
        )}

      {/* Step 5: Explainer Drawer Bottom Sheet */}
      {showExplainer && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end transition-all duration-300">
          {/* Overlay dismissal */}
          <div className="flex-1" onClick={() => setShowExplainer(false)}></div>
          
          <div className="bg-white border-t border-slate-100 rounded-t-[32px] p-7 space-y-7 relative overflow-hidden animate-slide-up shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            {/* Subtle background glow */}
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-gradient-to-br from-emerald-100/20 to-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Background pattern images from Figma */}
            <img 
              src={ellipseImg} 
              alt="" 
              className="absolute right-[-10px] top-[100px] w-[80px] h-[300px] pointer-events-none object-contain z-0 select-none opacity-80" 
            />
            <img 
              src={maskGroupImg} 
              alt="" 
              className="absolute right-[-20px] top-[-50px] w-[220px] h-[480px] pointer-events-none object-contain z-0 select-none opacity-90" 
            />

            <div className="flex items-center justify-between pb-1 relative z-10">
              <h3 
                className="text-[22px] font-denton font-medium text-slate-900"
              >
                Why we ask for this
              </h3>
              <button 
                onClick={() => setShowExplainer(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition active:scale-90 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative pl-8 space-y-6 py-1 z-10">
              {/* Connecting vertical line */}
              <div className="absolute left-[9.5px] top-[12px] bottom-[12px] w-[1px] bg-slate-100"></div>
              
              {[
                "Auto-detect bills.",
                "Track your spending.",
                "Keep your finances up to date.",
                "Give you a complete financial overview."
              ].map((text, index) => (
                <div key={index} className="relative flex items-center min-h-[24px]">
                  {/* Bullet marker */}
                  <div className="absolute -left-[29px] w-[20px] h-[20px] bg-[#EEF2FF] rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#4F46E5] rotate-45 rounded-[0.5px]"></div>
                  </div>
                  <span className="text-[15.5px] font-medium text-slate-700 font-poppins leading-normal">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowExplainer(false)}
              className="w-full bg-[#121716] text-[#F1F2F3] py-4 rounded-2xl font-semibold text-[15px] cursor-pointer hover:bg-black transition duration-200 active:scale-[0.98] font-poppins relative z-10 shadow-sm"
            >
              I understand
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
