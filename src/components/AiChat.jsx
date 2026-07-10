import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, SquarePen, Plus, Mic, ArrowUp, X, Keyboard, Car,
  ReceiptText, ScanLine, Users, ChevronDown
} from 'lucide-react';
import InsightChart from './InsightChart';

const SavvyLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="12" fill="url(#savvyGrad)" />
    <path
      d="M12 5.5l1.55 3.75L17.5 10.5l-3.95 1.25L12 15.5l-1.55-3.75L6.5 10.5l3.95-1.25L12 5.5z"
      fill="white"
    />
    <circle cx="17" cy="16.5" r="1.4" fill="white" opacity="0.9" />
    <defs>
      <linearGradient id="savvyGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#07995C" />
        <stop offset="1" stopColor="#34D399" />
      </linearGradient>
    </defs>
  </svg>
);

const VOICE_PHRASE = 'Savvy, how are my finances looking?';

/* ---------------- Scripted conversations (finance scenarios) ---------------- */

const SCRIPTS = {
  'voice-typing': [
    { role: 'user', text: VOICE_PHRASE },
    {
      role: 'ai',
      tag: 'Generated live insights',
      text: (
        <>
          You're doing better than last month 👀
          <br /><br />
          Your savings are rising compared to last month, especially during weekdays. If this
          trend continues, you could see a <strong>15–20% increase</strong> in monthly savings soon.
        </>
      ),
      widget: 'trend',
      footer: (
        <>
          Want me to optimize your spending categories, or build a smarter savings plan?
        </>
      ),
      chips: [
        { icon: '💡', label: 'Build a savings plan', scenario: 'savings-plan' },
        { icon: '🔥', label: 'Roast me instead', scenario: 'spendings-roast' }
      ]
    }
  ],

  'spendings-roast': [
    { role: 'user', text: 'Roast my spending habits 😭' },
    {
      role: 'ai',
      tag: 'Analyzed monthly spending',
      text: (
        <>
          Alright, here's where your money disappeared this month 💀
          <br /><br />
          You stay financially responsible during weekdays, then spend weekends like
          future-you will handle the consequences 💳🍔
          <br /><br />
          This month was heavily carried by food, shopping and transport. At this point,
          Swiggy is lowkey acting like a recurring subscription.
        </>
      ),
      widget: 'donut',
      chips: [
        { icon: '💡', label: 'Okay, help me fix it', scenario: 'savings-plan' },
        { icon: '📈', label: 'Show my savings trend', trend: true }
      ]
    }
  ],

  'savings-plan': [
    { role: 'user', text: 'yo how can i save ₹15k this month 😭' },
    {
      role: 'ai',
      tag: 'Personalized plans ready',
      text: (
        <>
          Your spending habits aren't actually that bad. Most of your money is just
          disappearing through repeated small spends over the month.
          <br /><br />
          <strong>Where your money went this month:</strong>
          <br />
          • <strong>Food Delivery:</strong> ₹6,400 (late-night orders are carrying this category rn)
          <br />
          • <strong>Shopping:</strong> ₹5,200 (mostly impulse + weekend purchases)
          <br />
          • <strong>Cabs & Transport:</strong> ₹3,100 (higher than your usual average)
          <br /><br />
          I created 2 plans that could realistically get you to ₹15k this month 👇
        </>
      ),
      widget: 'plans',
      footer: <>Tap a plan to apply it — I'll adjust your budgets automatically.</>,
      chips: [
        { icon: '🚗', label: 'Now check a big goal', scenario: 'set-goal' }
      ]
    }
  ],

  'set-goal': [
    { role: 'user', text: 'Can I afford a BMW right now?' },
    {
      role: 'ai',
      text: (
        <>
          It depends — BMWs come in a wide price range. Which model are you considering?
        </>
      )
    },
    { role: 'user', text: "I'm thinking about a BMW 3 Series." },
    {
      role: 'ai',
      tag: 'Goal analysis complete',
      text: (
        <>
          Understood. The BMW 3 Series typically starts around <strong>₹75 lakh on-road</strong>,
          depending on variant and location. Honestly, taking some time before purchasing could
          ease the financial stress.
          <br /><br />
          I suggest building a savings goal first instead of rushing the buy. If you save about
          <strong> ₹35k–₹45k each month</strong>, you could aim for a solid down payment in the
          next 2–3 years without straining your finances.
        </>
      ),
      widget: 'goal',
      chips: [
        { icon: '💡', label: 'Build the monthly plan', scenario: 'savings-plan' }
      ]
    }
  ]
};

const GENERIC_REPLY = {
  role: 'ai',
  tag: 'Live snapshot',
  text: (
    <>
      Here's where you stand right now — you've got <strong>₹42,300 safe to spend</strong> with
      12 days to payday. That's roughly ₹3,500/day of headroom, and you're currently pacing
      well under it.
      <br /><br />
      Want me to dig into something specific?
    </>
  ),
  chips: [
    { icon: '🔥', label: 'Roast my spending', scenario: 'spendings-roast' },
    { icon: '💡', label: 'Save ₹15k this month', scenario: 'savings-plan' },
    { icon: '📈', label: 'Savings trend', trend: true }
  ]
};

/* ---------------- Donut breakdown widget ---------------- */

const DONUT_DATA = [
  { label: 'Food', value: 12400, color: '#07995C' },
  { label: 'Transport', value: 9800, color: '#10B981' },
  { label: 'Shopping', value: 7200, color: '#34D399' }
];

const DonutBreakdown = () => {
  const total = DONUT_DATA.reduce((s, d) => s + d.value, 0);
  const R = 65;
  const C = 2 * Math.PI * R;
  let acc = 0;

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between opacity-80">
        <span className="text-[13px] font-semibold text-slate-800 font-poppins">Monthly Breakdown</span>
        <div className="bg-white border border-slate-100 rounded-full px-2.5 py-1 flex items-center space-x-1 shadow-sm">
          <span className="text-[11px] text-slate-500 font-medium font-poppins">May 2026</span>
          <ChevronDown className="w-2.5 h-2.5 text-slate-500 opacity-60" />
        </div>
      </div>

      <div className="flex justify-center relative py-1">
        <svg width="170" height="170" viewBox="0 0 180 180" className="transform -rotate-90">
          {DONUT_DATA.map((d) => {
            const frac = d.value / total;
            const rotation = (acc / total) * 360;
            acc += d.value;
            return (
              <circle
                key={d.label}
                cx="90" cy="90" r={R}
                fill="transparent"
                stroke={d.color}
                strokeWidth="24"
                strokeDasharray={`${Math.max(frac * C - 3, 0)} ${C}`}
                style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '90px 90px' }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] text-slate-400 font-medium leading-none font-poppins">Total Spend</span>
          <span className="text-[22px] font-bold text-[#020617] tracking-tight mt-1 font-poppins">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
        {DONUT_DATA.map((d) => (
          <div key={d.label} className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
            <div>
              <p className="text-[11px] text-slate-500 font-medium font-poppins">{d.label}</p>
              <p className="text-[12px] font-bold text-slate-800 font-poppins">₹{d.value.toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- Main component ---------------- */

export default function AiChat({
  onBack,
  activeScenario,
  setActiveScenario,
  savingsPlan,
  setSavingsPlan,
  onAddGoal,
  goals
}) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceDone, setVoiceDone] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [insightDismissed, setInsightDismissed] = useState(false);
  const [contextDismissed, setContextDismissed] = useState(false);

  const timersRef = useRef([]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const isBmwGoalAdded = goals.some((g) => g.name === 'BMW 3 Series');
  const inVoiceOverlay = activeScenario === 'voice-typing' && !voiceDone;

  const schedule = (fn, ms) => {
    timersRef.current.push(setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  /* Play scenarios as real conversations: user msg -> typing -> AI reply */
  useEffect(() => {
    clearTimers();
    setIsTyping(false);
    setShowQuickActions(false);

    if (activeScenario === 'welcome') {
      setMessages([]);
      return clearTimers;
    }

    if (activeScenario === 'voice-typing' && !voiceDone) {
      // Voice overlay: reveal the transcript word by word, then auto-run the query
      setMessages([]);
      setTranscript('');
      const words = VOICE_PHRASE.split(' ');
      words.forEach((w, i) => {
        schedule(() => setTranscript((t) => (t ? t + ' ' : '') + w), 800 + i * 320);
      });
      schedule(() => setVoiceDone(true), 800 + words.length * 320 + 1100);
      return clearTimers;
    }

    const script = SCRIPTS[activeScenario];
    if (!script) return clearTimers;

    setMessages([]);
    let delay = 250;
    script.forEach((msg) => {
      if (msg.role === 'user') {
        schedule(() => setMessages((m) => [...m, msg]), delay);
        delay += 750;
      } else {
        schedule(() => setIsTyping(true), delay);
        delay += 1300;
        schedule(() => {
          setIsTyping(false);
          setMessages((m) => [...m, msg]);
        }, delay);
        delay += 650;
      }
    });
    return clearTimers;
  }, [activeScenario, voiceDone]);

  /* Keep the thread pinned to the latest message */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const startNewChat = () => {
    clearTimers();
    setVoiceDone(false);
    setInputText('');
    setMessages([]);
    setIsTyping(false);
    setActiveScenario('welcome');
  };

  const openVoiceMode = () => {
    setVoiceDone(false);
    setActiveScenario('voice-typing');
  };

  const showTrend = () => {
    setVoiceDone(true);
    setActiveScenario('voice-typing');
  };

  const handleChip = (chip) => {
    if (chip.scenario) setActiveScenario(chip.scenario);
    else if (chip.trend) showTrend();
  };

  const routeInput = (text) => {
    const t = text.toLowerCase();
    if (t.includes('roast')) return 'spendings-roast';
    if (t.includes('bmw') || t.includes('car') || t.includes('afford') || t.includes('goal')) return 'set-goal';
    if (t.includes('save') || t.includes('plan') || t.includes('budget')) return 'savings-plan';
    if (t.includes('trend') || t.includes('doing') || t.includes('finance')) return 'trend';
    return null;
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    setInputText('');
    setShowQuickActions(false);

    const route = routeInput(text);
    if (route === 'trend') { showTrend(); return; }
    if (route && route !== activeScenario) { setActiveScenario(route); return; }

    // Free-form question: answer with a live financial snapshot
    setMessages((m) => [...m, { role: 'user', text }]);
    schedule(() => setIsTyping(true), 500);
    schedule(() => {
      setIsTyping(false);
      setMessages((m) => [...m, GENERIC_REPLY]);
    }, 1900);
  };

  const quickActions = [
    { icon: ReceiptText, label: 'Log an expense', fill: 'log ₹200 auto ride' },
    { icon: ScanLine, label: 'Scan a bill', fill: 'scan my electricity bill' },
    { icon: Users, label: 'Split with friends', fill: 'split ₹1,840 dinner 4 ways' }
  ];

  /* ---------------- Widgets that need live state ---------------- */

  const renderWidget = (widget) => {
    if (widget === 'trend') {
      return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
          <InsightChart
            data={[
              { name: 'Sep 3', current: 20, previous: 50 },
              { name: 'Sep 4', current: 30, previous: 70 },
              { name: 'Sep 5', current: 95, previous: 25 },
              { name: 'Sep 6', current: 70, previous: 55 },
              { name: 'Sep 7', current: 20, previous: 40 }
            ]}
            lines={[
              { dataKey: 'current', name: 'Savings', color: '#07995C' },
              { dataKey: 'previous', name: 'Spending', color: '#ffc658' }
            ]}
            height={170}
          />
        </div>
      );
    }

    if (widget === 'donut') return <DonutBreakdown />;

    if (widget === 'plans') {
      const plans = [
        {
          id: 'smart-saver',
          title: 'Smart Saver Plan',
          emoji: '⚡',
          badge: 'Saves ~₹15,800',
          desc: 'Cut spending by 25%. Limit food deliveries to weekends and avoid impulse buys. Weekly budget of ₹7,000.'
        },
        {
          id: 'flexible',
          title: 'Flexible Savings Plan',
          emoji: '🌊',
          badge: 'Steady & low-stress',
          desc: 'Save consistently over six weeks. Start with ₹8,000 this month and roll savings into next month.'
        }
      ];
      return (
        <div className="space-y-2.5">
          {plans.map((plan) => {
            const selected = savingsPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSavingsPlan(plan.id)}
                className={`p-3.5 border rounded-2xl flex flex-col space-y-2 cursor-pointer transition-all active:scale-[0.99] ${
                  selected
                    ? 'bg-[#F0FDF4] border-[#07995C] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 font-semibold text-[14px] text-slate-800 font-poppins">
                    <span>{plan.title}</span>
                    <span>{plan.emoji}</span>
                  </div>
                  <span
                    className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selected ? 'border-[#07995C] bg-white' : 'border-slate-300'
                    }`}
                  >
                    {selected && <span className="w-2 h-2 bg-[#07995C] rounded-full"></span>}
                  </span>
                </div>
                <span className="w-fit text-[10.5px] font-bold text-[#07995C] bg-[#07995C]/10 px-2 py-0.5 rounded-md font-poppins">
                  {plan.badge}
                </span>
                <p className="text-[12px] text-slate-500 leading-normal font-poppins">{plan.desc}</p>
              </div>
            );
          })}
        </div>
      );
    }

    if (widget === 'goal') {
      return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 bg-teal-500/10 rounded-full flex items-center justify-center shrink-0">
              <Car className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[15px] font-semibold text-slate-800 truncate font-poppins">BMW 3 Series Goal</h4>
                  <p className="text-[12px] text-slate-400 mt-0.5 font-poppins">Timeline · 32 months</p>
                </div>
                <span className="text-[15px] font-bold text-slate-800 text-right whitespace-nowrap font-poppins">₹12 Lakh</span>
              </div>
            </div>
          </div>
          <button
            disabled={isBmwGoalAdded}
            onClick={() =>
              onAddGoal({
                name: 'BMW 3 Series',
                timeLeft: '32 months left',
                saved: 0,
                target: 1200000,
                color: 'blue',
                icon: 'Car'
              })
            }
            className={`w-full py-3.5 rounded-2xl text-[14px] font-semibold text-center transition shadow-sm active:scale-[0.98] font-poppins ${
              isBmwGoalAdded
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-[#07995C] text-white hover:brightness-105'
            }`}
          >
            {isBmwGoalAdded ? 'Goal Started ✓' : 'Start Savings Goal'}
          </button>
        </div>
      );
    }

    return null;
  };

  const starterChips = [
    { icon: '🔥', label: 'Roast my spending', onTap: () => setActiveScenario('spendings-roast') },
    { icon: '💰', label: 'Help me save ₹15k', onTap: () => setActiveScenario('savings-plan') },
    { icon: '🚗', label: 'Can I afford a BMW?', onTap: () => setActiveScenario('set-goal') },
    { icon: '📈', label: 'How am I doing?', onTap: showTrend }
  ];

  const showEmptyState = activeScenario === 'welcome' && messages.length === 0 && !isTyping;

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F8] relative text-slate-800 font-sans pb-3 h-full select-none overflow-hidden animate-fadeIn">
      {/* Ambient top gradient */}
      <div className="absolute top-0 left-0 w-full h-[280px] bg-gradient-to-b from-[#E6F4EA] to-transparent pointer-events-none"></div>

      {/* ---------- Header ---------- */}
      <div className="relative px-4 pt-4 pb-2 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-100/80 shadow-sm hover:bg-slate-50 transition active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center space-x-2">
          <SavvyLogo className="w-7 h-7" />
          <div className="flex flex-col">
            <span className="font-poppins font-bold text-[15px] text-slate-800 tracking-tight leading-none">
              Savvy AI
            </span>
            <div className="flex items-center mt-1 space-x-1">
              <span className="w-1.5 h-1.5 bg-[#07995C] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-medium text-slate-400 font-poppins leading-none">
                Watching your money
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={startNewChat}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-100/80 shadow-sm hover:bg-slate-50 transition active:scale-90 cursor-pointer"
          title="New chat"
        >
          <SquarePen className="w-[18px] h-[18px] text-slate-600" />
        </button>
      </div>

      {/* ---------- Pinned financial context (dismissable — frees up space once seen) ---------- */}
      {!contextDismissed && (
        <div className="relative mx-4 mt-1 mb-2 z-10 shrink-0 bg-white/70 backdrop-blur-sm border border-slate-100 rounded-2xl pl-3.5 pr-8 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <button
            onClick={() => setContextDismissed(true)}
            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 active:scale-90 transition cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3 h-3" strokeWidth={2.5} />
          </button>
          <div className="flex items-end justify-between mb-1.5">
            <div className="flex items-baseline space-x-1.5">
              <span className="font-poppins font-bold text-[17px] text-slate-800 leading-none">₹42,300</span>
              <span className="font-poppins font-medium text-[11px] text-slate-500">safe to spend</span>
            </div>
            <span className="font-poppins font-semibold text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              12 days to payday
            </span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-slate-400 z-10" title="Cycle elapsed"></div>
            <div className="h-full bg-[#07995C] rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      )}

      {/* ---------- Conversation / Empty state ---------- */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 z-10 flex flex-col scrollbar-none"
      >
        {showEmptyState ? (
          <div className="flex-1 flex flex-col pt-2 animate-fadeIn select-text">
            {/* Since-yesterday delta */}
            {!insightDismissed && (
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative mb-5">
                <button
                  onClick={() => setInsightDismissed(true)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-poppins">
                    Since yesterday
                  </span>
                </div>
                <p className="text-[13.5px] font-medium text-slate-800 leading-snug pr-6 font-poppins">
                  3 new transactions · <span className="text-red-500">Swiggy spend spiked</span>
                </p>
              </div>
            )}

            <h1 className="text-[30px] font-bold text-slate-800 font-poppins tracking-tight leading-tight pl-0.5">
              Hey Parash 👋
            </h1>
            <p className="text-[14px] font-medium text-slate-500 font-poppins leading-relaxed mt-1.5 pl-0.5">
              Your last 7 days had a very committed relationship with Starbucks —
              <span className="font-semibold text-slate-700"> 8 trips, ₹5,240</span>. What should we dig into?
            </p>

            {/* Starter prompt chips — easier to tap, leaves more breathing room than boxed cards */}
            <div className="flex flex-wrap gap-2 mt-6">
              {starterChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={chip.onTap}
                  className="px-3.5 py-2.5 bg-white rounded-full border border-slate-200 text-[13px] font-semibold text-slate-700 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#07995C]/40 hover:bg-[#F0FDF4] hover:text-[#07995C] active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5 font-poppins"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5 pb-2">
            {messages.map((m, i) => {
              if (m.role === 'user') {
                return (
                  <div key={i} className="flex justify-end animate-msgIn">
                    <div className="bg-[#07995C] rounded-[20px] rounded-br-[6px] px-4 py-2.5 max-w-[82%] shadow-sm">
                      <p className="text-[14px] font-medium text-white leading-relaxed font-poppins">{m.text}</p>
                    </div>
                  </div>
                );
              }
              const isLast = i === messages.length - 1;
              return (
                <div key={i} className="animate-msgIn space-y-2.5 select-text">
                  <div className="flex items-center space-x-2 px-0.5">
                    <SavvyLogo className="w-6 h-6" />
                    <span className="text-[12px] font-semibold text-slate-500 font-poppins">
                      {m.tag || 'Savvy'}
                    </span>
                  </div>
                  <div className="space-y-3 pl-0.5 pr-1">
                    <div className="text-[14px] font-medium leading-relaxed text-[#0F172A] font-poppins">
                      {m.text}
                    </div>
                    {m.widget && renderWidget(m.widget)}
                    {m.footer && (
                      <div className="text-[13px] font-medium leading-relaxed text-slate-500 font-poppins">
                        {m.footer}
                      </div>
                    )}
                    {m.chips && isLast && !isTyping && (
                      <div className="flex flex-wrap gap-2 pt-1 select-none">
                        {m.chips.map((chip, ci) => (
                          <button
                            key={ci}
                            onClick={() => handleChip(chip)}
                            className="px-3.5 py-2 bg-white rounded-full border border-slate-200 text-[12.5px] font-semibold text-slate-600 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-[#07995C]/40 hover:bg-[#F0FDF4] hover:text-[#07995C] active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5 font-poppins"
                          >
                            <span>{chip.icon}</span>
                            <span>{chip.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="animate-msgIn flex items-center space-x-2 px-0.5">
                <SavvyLogo className="w-6 h-6" />
                <div className="bg-white border border-slate-100 rounded-full px-3.5 py-2.5 shadow-sm flex items-center space-x-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="typing-dot w-1.5 h-1.5 bg-slate-400 rounded-full"
                      style={{ animationDelay: `${d * 0.18}s` }}
                    ></span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------- Composer ---------- */}
      <div className="px-4 pt-1 shrink-0 z-10 select-none relative">
        {/* Quick actions popover */}
        {showQuickActions && (
          <div className="absolute bottom-full left-4 mb-2 bg-white border border-slate-200 rounded-2xl shadow-lg p-1.5 w-[220px] animate-msgIn z-20">
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                onClick={() => {
                  setInputText(qa.fill);
                  setShowQuickActions(false);
                  inputRef.current?.focus();
                }}
                className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition text-left cursor-pointer"
              >
                <qa.icon className="w-4 h-4 text-[#07995C] shrink-0" />
                <span className="text-[13px] font-medium text-slate-700 font-poppins">{qa.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="bg-white border border-slate-200/80 rounded-[26px] pl-2 pr-2 py-2 flex items-center space-x-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] w-full transition-all duration-200 focus-within:border-[#07995C]/40 focus-within:shadow-md">
          <button
            onClick={() => setShowQuickActions((s) => !s)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 cursor-pointer ${
              showQuickActions ? 'bg-[#07995C]/10 text-[#07995C] rotate-45' : 'text-slate-500 hover:bg-slate-50'
            }`}
            title="Quick actions"
          >
            <Plus className="w-5 h-5 transition-transform" />
          </button>

          <input
            ref={inputRef}
            type="text"
            placeholder="Ask anything about your money…"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 bg-transparent text-[13.5px] text-slate-800 placeholder-slate-400 border-none focus:outline-none focus:ring-0 py-1.5 font-poppins min-w-0"
          />

          {inputText.trim() === '' ? (
            <button
              onClick={openVoiceMode}
              className="w-9 h-9 rounded-full bg-[#07995C] flex items-center justify-center shrink-0 shadow-sm hover:shadow active:scale-90 transition-all cursor-pointer"
              title="Talk to Savvy"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-white">
                <line x1="6" y1="9" x2="6" y2="15" strokeLinecap="round" />
                <line x1="10" y1="5" x2="10" y2="19" strokeLinecap="round" />
                <line x1="14" y1="8" x2="14" y2="16" strokeLinecap="round" />
                <line x1="18" y1="11" x2="18" y2="13" strokeLinecap="round" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-[#07995C] flex items-center justify-center shrink-0 shadow-sm hover:shadow active:scale-90 transition-all cursor-pointer"
              title="Send"
            >
              <ArrowUp className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </button>
          )}
        </div>

        <p className="text-center text-[9.5px] font-medium text-slate-400 font-poppins mt-2">
          Savvy can make mistakes — double-check important numbers.
        </p>
      </div>

      {/* ---------- Voice mode overlay ---------- */}
      {inVoiceOverlay && (
        <div className="absolute inset-0 z-50 bg-gradient-to-b from-[#04150D] via-[#071F14] to-[#020905] flex flex-col items-center justify-between py-12 animate-fadeIn">
          <div className="flex flex-col items-center pt-6">
            <span className="text-[12px] font-semibold text-emerald-300/70 tracking-[0.2em] uppercase font-poppins">
              Savvy Voice
            </span>
          </div>

          {/* Orb */}
          <div className="flex flex-col items-center space-y-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-[150px] h-[150px] rounded-full bg-[#07995C]/20 animate-orb-ring"></div>
              <div className="absolute w-[150px] h-[150px] rounded-full bg-[#07995C]/15 animate-orb-ring" style={{ animationDelay: '0.7s' }}></div>
              <button
                onClick={() => setVoiceDone(true)}
                className="relative w-[130px] h-[130px] rounded-full bg-gradient-to-br from-[#0CBF74] via-[#07995C] to-[#065F46] shadow-[0_0_60px_rgba(7,153,92,0.45)] animate-orb flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
              >
                <Mic className="w-9 h-9 text-white/90" />
              </button>
            </div>

            <div className="h-16 px-10 text-center">
              {transcript ? (
                <p className="text-[16px] font-medium text-white/90 leading-relaxed font-poppins">
                  “{transcript}”
                </p>
              ) : (
                <p className="text-[14px] font-medium text-white/40 font-poppins">Listening…</p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="w-full flex justify-between px-10">
            <button
              onClick={() => {
                setVoiceDone(false);
                setActiveScenario('welcome');
              }}
              className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/10 active:scale-90 hover:bg-white/15 transition cursor-pointer"
              title="Type instead"
            >
              <Keyboard className="w-5 h-5 text-white/80" />
            </button>
            <button
              onClick={() => {
                setVoiceDone(false);
                setActiveScenario('welcome');
              }}
              className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/10 active:scale-90 hover:bg-white/15 transition cursor-pointer"
              title="End voice mode"
            >
              <X className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
