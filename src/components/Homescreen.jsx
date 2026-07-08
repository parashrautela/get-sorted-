import React, { useState } from 'react';
import { 
  Home, 
  ArrowUpRight, 
  TrendingUp, 
  User, 
  RefreshCcw, 
  Eye, 
  EyeOff, 
  Info,
  ChevronRight,
  Bell,
  Wallet,
  ArrowDown,
  Calendar,
  Building2,
  Landmark,
  Car,
  Plane,
  ShoppingCart,
  Coffee,
  Bus,
  Receipt,
  TrendingDown,
  Plus,
  Clock,
  Shield,
  Tv,
  ShoppingBag,
  Target,
  ChevronLeft,
  Check,
  Film,
  X
} from 'lucide-react';
import img16400 from '../assets/16,400.png';
import profileIcon from '../assets/profile icon.png';

const JuspayAiLogo = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="12" fill="url(#juspayAiGrad)" />
    <path d="M6 14.5L10 9.5L13.5 12.5L18 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18" cy="7" r="1.5" fill="white" />
    <defs>
      <linearGradient id="juspayAiGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0361e2" />
        <stop stopColor="#00d2ff" />
      </linearGradient>
    </defs>
  </svg>
);

// Color mapping for dynamic goals
const colorMap = {
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    gradient: 'from-orange-400 to-red-500',
    lightBg: 'bg-orange-50'
  },
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-500',
    gradient: 'from-emerald-400 to-teal-600',
    lightBg: 'bg-[#ECFDF5]'
  }
};

const iconMap = {
  Car: Car,
  Plane: Plane,
  ShoppingBag: ShoppingBag,
};

const formatAmount = (val) => {
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
};

export default function Homescreen({ onNavigate, activeTab, goals, savingsPlan }) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [transactionTab, setTransactionTab] = useState('categories'); // 'categories' | 'merchants'
  const [timeframe, setTimeframe] = useState('month'); // Always month view by default for recurring calendar
  const [selectedMerchant, setSelectedMerchant] = useState(null); // null | 'Starbucks'
  const [activeGoalDetails, setActiveGoalDetails] = useState(null); // null | goal object
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
  const [showProfileOverlay, setShowProfileOverlay] = useState(false);
  const [recurringCandidates, setRecurringCandidates] = useState([
    { name: 'Cult.fit', info: 'debited 14 Jan and 14 Feb', amount: 1300, id: 'cult' },
    { name: 'Google One', info: 'debited 3 months running', amount: 130, id: 'google' },
    { name: 'Society maintenance', info: 'debited 5 Jan and 5 Feb', amount: 2500, id: 'society' }
  ]);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);

  // Mock data matching the Figma board
  const balance = "300,469.52";
  const budgetSpent = "37,500";
  const budgetTotal = "75,000";
  const monthlySavings = "65,000";
  const wellnessScore = 87;

  const categories = [
    { name: "Groceries", count: 12, amount: "9,678", percentage: 45, icon: ShoppingCart },
    { name: "Entertainment", count: 8, amount: "5,240", percentage: 25, icon: Coffee },
    { name: "Transport", count: 6, amount: "2,180", percentage: 12, icon: Bus },
    { name: "Subscriptions", count: 15, amount: "6,430", percentage: 18, icon: Receipt }
  ];

  const merchants = [
    { name: "Swiggy / Zomato", count: 15, amount: "9,678", percentage: 45, icon: ShoppingCart },
    { name: "Starbucks", count: 8, amount: "5,240", percentage: 25, icon: Coffee },
    { name: "Uber / Ola", count: 6, amount: "2,180", percentage: 12, icon: Bus },
    { name: "Netflix & Spotify", count: 2, amount: "1,200", percentage: 6, icon: Receipt }
  ];

  const upcomingPayments = [
    {
      name: "HDFC Term Insurance",
      dueDate: "Due in 3 days",
      amount: 1850,
      icon: Shield,
      bgClass: "bg-red-50",
      iconClass: "text-red-500",
      dueClass: "text-red-500"
    },
    {
      name: "Netflix Premium",
      dueDate: "Due July 12",
      amount: 649,
      icon: Tv,
      bgClass: "bg-[#F3E8FF]",
      iconClass: "text-[#9333EA]",
      dueClass: "text-[#6B21A8]"
    },
    {
      name: "Rent / Electricity",
      dueDate: "Due July 15",
      amount: 15000,
      icon: Landmark,
      bgClass: "bg-amber-50",
      iconClass: "text-amber-500",
      dueClass: "text-[#92400E]"
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#EAEAEA] relative text-[#020617] font-sans select-none h-full overflow-hidden">
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-28">

      {/* Main Content Area */}
      <div className="flex-1 px-0 pt-2 pb-10 z-10 space-y-5 scrollbar-none">

        {activeTab === 'financial-health' ? (
          <>
            {/* Header Section */}
            <div className="flex flex-col mb-1 px-4">
              <span className="text-xs font-semibold text-slate-600 font-poppins">
                Financial health
              </span>
              <span className="text-[22px] font-denton font-semibold text-slate-900 mt-1.5 leading-tight">
                Overview
              </span>
            </div>
            {/* Metrics Grid (2x2) */}
            <div className="grid grid-cols-2 gap-4 px-4 animate-fadeIn">
              {/* Bank Balance Card */}
              <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-slate-200/60 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer">
                <span className="text-[12px] font-semibold text-slate-600 font-poppins leading-none">
                  Bank balance
                </span>
                <div className="mt-3">
                  <span className="text-[20px] font-denton font-semibold text-slate-900 leading-none">
                    ₹54,500
                  </span>
                  <span className="text-[12px] font-medium text-slate-500 font-poppins block mt-1.5 leading-none">
                    2 accounts
                  </span>
                </div>
              </div>

              {/* Net Worth Card */}
              <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-slate-200/60 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer">
                <span className="text-[12px] font-semibold text-slate-600 font-poppins leading-none">
                  Net worth
                </span>
                <div className="mt-3">
                  <span className="text-[20px] font-denton font-semibold text-slate-900 leading-none">
                    ₹1,09,600
                  </span>
                  <span className="text-[12px] font-medium text-slate-500 font-poppins block mt-1.5 leading-none">
                    after dues
                  </span>
                </div>
              </div>

              {/* Invested Card */}
              <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-slate-200/60 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer">
                <span className="text-[12px] font-semibold text-slate-600 font-poppins leading-none">
                  Invested
                </span>
                <div className="mt-3">
                  <span className="text-[20px] font-denton font-semibold text-slate-900 leading-none">
                    ₹2,47,500
                  </span>
                  <span className="text-[12px] font-medium text-slate-500 font-poppins block mt-1.5 leading-none">
                    FD + MF + gold
                  </span>
                </div>
              </div>

              {/* Credit Score Card */}
              <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-slate-200/60 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer">
                <span className="text-[12px] font-semibold text-slate-600 font-poppins leading-none">
                  Credit score
                </span>
                <div className="mt-3 flex items-baseline justify-between">
                  <div className="flex flex-col">
                    <span className="text-[20px] font-denton font-semibold text-slate-900 leading-none">
                      726
                    </span>
                    <span className="text-[12px] font-bold text-emerald-600 font-poppins block mt-1.5 leading-none">
                      Good
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0 mb-1"></div>
                </div>
              </div>
            </div>

            {/* Account Details list */}
            <div className="mx-4 bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-slate-600 font-poppins leading-none">
                  Account breakdown
                </span>
                <span className="px-3 py-2 -mx-3 -my-2 text-[12px] font-medium text-[#07995C] font-poppins hover:underline cursor-pointer active:scale-[0.98] transition-all">
                  Manage accounts
                </span>
              </div>
              
              <div className="space-y-3.5">
                {/* HDFC Row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex flex-col ml-3 min-w-0">
                      <span className="text-[13px] font-bold text-slate-900 font-poppins truncate leading-none">
                        HDFC
                      </span>
                      <span className="text-[12px] text-slate-500 font-poppins mt-1.5 leading-none">
                        Salary account
                      </span>
                    </div>
                  </div>
                  <span className="text-[14px] font-semibold text-slate-900 font-denton tracking-tight">
                    ₹12,500
                  </span>
                </div>

                {/* ICICI Row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="flex flex-col ml-3 min-w-0">
                      <span className="text-[13px] font-bold text-slate-900 font-poppins truncate leading-none">
                        ICICI
                      </span>
                      <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium font-poppins mt-1.5 leading-none w-fit">
                        Idle
                      </span>
                    </div>
                  </div>
                  <span className="text-[14px] font-semibold text-slate-900 font-denton tracking-tight">
                    ₹42,000
                  </span>
                </div>
              </div>
            </div>

            {/* Protection/Cover cards (2-column layout) */}
            <div className="grid grid-cols-2 gap-4 px-4 animate-fadeIn">
              {/* Term Life Card */}
              <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-slate-200/60 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer">
                <span className="text-[12px] font-semibold text-slate-600 font-poppins leading-none">
                  Term life
                </span>
                <div className="mt-3">
                  <span className="text-[20px] font-denton font-semibold text-slate-900 leading-none">
                    ₹75L
                  </span>
                  <span className="text-[12px] font-medium text-slate-500 font-poppins block mt-1.5 leading-none">
                    active, renews Mar
                  </span>
                </div>
              </div>

              {/* Health Cover Card */}
              <div className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-slate-200/60 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer">
                <span className="text-[12px] font-semibold text-slate-600 font-poppins leading-none">
                  Health cover
                </span>
                <div className="mt-3">
                  <span className="text-[20px] font-denton font-semibold text-slate-900 leading-none">
                    ₹10L
                  </span>
                  <span className="text-[12px] font-medium text-slate-500 font-poppins block mt-1.5 leading-none">
                    active, family floater
                  </span>
                </div>
              </div>
            </div>

            {/* Savvy AI Insights Section */}
            <div className="flex flex-col space-y-4 mt-2 px-4 animate-fadeIn">
              <div>
                <span className="text-[12px] font-semibold text-slate-600 font-poppins">
                  Insights from Savvy AI
                </span>
              </div>

              {/* Insight Card Block */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out relative overflow-hidden">
                {/* Glow decoration */}
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-br from-indigo-50/40 via-purple-50/20 to-transparent rounded-full blur-2xl z-0 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col">
                  {/* Badge row */}
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2 py-1 rounded text-[11px] font-semibold bg-emerald-50 text-[#07995C] font-poppins">
                      Insight
                    </span>
                  </div>

                  <span className="text-[13px] font-semibold text-slate-800 font-poppins mt-3 leading-none">
                    Cash sitting idle
                  </span>

                  <div className="mt-3 flex items-baseline">
                    <span className="text-[28px] font-denton font-semibold text-slate-900 leading-none">
                      ₹42,000
                    </span>
                    <span className="text-[12px] text-slate-500 font-poppins ml-2 font-normal">
                      idle in ICICI for 3 months
                    </span>
                  </div>

                  <div className="h-[1px] bg-slate-100 w-full my-4" />

                  <p className="text-[13px] text-slate-600 font-poppins font-normal leading-relaxed">
                    Losing value to inflation at <span className="font-semibold text-rose-600">3% interest</span>.
                  </p>

                  {/* Sub comparison cards */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {/* Stays Idle Box */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50 flex flex-col justify-between min-h-[100px]">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-600 font-poppins block leading-none">
                          Stays idle • 3% a year
                        </span>
                        <span className="text-[16px] font-semibold text-slate-900 font-denton block mt-2 leading-none">
                          ₹30,900
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-poppins mt-2 leading-snug">
                        Needs ₹31,800 just to maintain buying power.
                      </p>
                    </div>

                    {/* Liquid Fund Box */}
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 border border-emerald-100 flex flex-col justify-between min-h-[100px]">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-700 font-poppins block leading-none">
                          In liquid fund • 7% a year
                        </span>
                        <span className="text-[16px] font-semibold text-emerald-900 font-denton block mt-2 leading-none">
                          ₹32,100
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700/80 font-poppins mt-2 leading-snug">
                        Beats inflation and earns positive yield.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'recurring' ? (
          /* ---------------------------------------------------- */
          /* RECURRING SCREEN / SPENDING ANALYSIS                 */
          /* ---------------------------------------------------- */
          selectedMerchant === 'Starbucks' ? (
            /* ---------------------------------------------------- */
            /* STARBUCKS DETAIL SCREEN                              */
            /* ---------------------------------------------------- */
            <div className="flex-1 pb-10 z-10 flex flex-col scrollbar-none animate-fadeIn bg-[#FAF8F8]">
              
              {/* Header Banner image block */}
              <div className="h-[170px] w-full relative overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" 
                  alt="Starbucks" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/40 z-0"></div>

                {/* Back button */}
                <button 
                  onClick={() => setSelectedMerchant(null)}
                  className="absolute top-4 left-4 w-9 h-9 rounded-full bg-slate-900/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-slate-900/60 transition active:scale-90 z-10 border border-white/5"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Action Pill */}
                <div className="absolute top-4 right-4 flex items-center bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full space-x-3 text-white z-10 border border-white/10">
                  <button className="cursor-pointer hover:opacity-80 active:scale-95 transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </button>
                  <div className="w-[1px] h-3 bg-white/20"></div>
                  <button className="cursor-pointer hover:opacity-80 active:scale-95 transition flex items-center justify-center w-3.5 h-3.5">
                    <span className="font-serif font-bold text-[11px] italic leading-none">i</span>
                  </button>
                </div>

                {/* Overlapping Brand Badge */}
                <div className="w-12 h-12 bg-gradient-to-tr from-amber-400 to-yellow-500 text-white rounded-xl shadow-md border-[2px] border-white flex items-center justify-center absolute left-6 bottom-[-18px] z-20">
                  <Coffee className="w-6 h-6" />
                </div>

                {/* Right Bottom aligned labels */}
                <div className="absolute right-6 bottom-3.5 z-10 flex flex-col items-end text-white text-right leading-none">
                  <span className="text-[8px] font-bold tracking-widest opacity-90 font-poppins">SHOPPING</span>
                  <span className="text-xl font-denton font-semibold mt-1">Starbucks</span>
                  <span className="text-[7px] opacity-60 font-poppins mt-0.5">Photo from Yelp</span>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 px-4 pt-7 space-y-4 overflow-y-auto scrollbar-none pb-6">
                
                {/* Info & Map Card */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col space-y-3.5">
                  <div className="flex items-center justify-between min-w-0">
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#0F172A] font-poppins leading-none">
                        21 minutes ago
                      </span>
                      <span className="text-[9px] text-[#64748B] font-poppins mt-1.5 leading-none">
                        Eligible for 2% Daily Cash
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-800 shrink-0">
                      <span className="text-sm font-semibold font-denton">₹5,240</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Styled Mock SVG Map */}
                  <div className="h-[120px] rounded-xl overflow-hidden relative border border-slate-100/50 bg-[#E5E9EC]">
                    <svg className="w-full h-full object-cover" viewBox="0 0 320 120" fill="none">
                      {/* Green park spaces */}
                      <path d="M 0,0 L 110,0 L 80,75 L 0,90 Z" fill="#E2F0D9" />
                      <path d="M 230,15 L 320,0 L 320,120 L 250,120 Z" fill="#E2F0D9" />
                      
                      {/* Grid streets */}
                      <path d="M -10,60 L 330,85" stroke="white" strokeWidth="12" strokeLinecap="round" />
                      <path d="M 150,-10 L 170,130" stroke="white" strokeWidth="10" strokeLinecap="round" />
                      <path d="M 70,-10 L 100,130" stroke="white" strokeWidth="6" strokeLinecap="round" />
                      
                      <path d="M -10,60 L 330,85" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
                      <path d="M 150,-10 L 170,130" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />

                      {/* Road label texts */}
                      <text x="35" y="25" fill="#94A3B8" fontSize="6" fontWeight="bold" fontFamily="Poppins" transform="rotate(8, 35, 25)">DOVER RD</text>
                      <text x="110" y="95" fill="#94A3B8" fontSize="5" fontWeight="bold" fontFamily="Poppins" transform="rotate(75, 110, 95)">NORTH BUONA VISTA</text>
                      
                      {/* Starbucks Coffee Pin */}
                      <g transform="translate(162, 70)">
                        {/* Ripple animation indicators */}
                        <circle cx="0" cy="0" r="15" fill="#F59E0B" fillOpacity="0.12" />
                        <circle cx="0" cy="0" r="8" fill="#F59E0B" fillOpacity="0.22" />
                        {/* Pin base card */}
                        <path d="M 0,0 L -5,-7 L 5,-7 Z" fill="#F59E0B" />
                        <rect x="-10" y="-21" width="20" height="15" rx="3" fill="white" stroke="#F59E0B" strokeWidth="1" />
                        {/* Tiny coffee cup icon inside pin */}
                        <circle cx="0" cy="-13" r="4" fill="#F59E0B" />
                        <rect x="-2" y="-15" width="4" height="3" rx="0.5" fill="white" />
                      </g>
                    </svg>
                  </div>

                  {/* Address */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-50">
                    <span className="text-[10px] font-semibold text-[#0F172A] font-poppins truncate leading-none">
                      Starbucks, Singapore, SG
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                {/* Transaction History title */}
                <div className="pl-1 pt-1">
                  <span className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase font-poppins leading-none">
                    Transaction History
                  </span>
                </div>

                {/* History Card */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="space-y-3.5">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between border-b border-slate-50 pb-3 interactive-card cursor-pointer">
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#0F172A] font-poppins leading-none">
                          25/6/22
                        </span>
                        <span className="text-[9px] text-[#64748B] font-poppins mt-1.5 leading-none">
                          Singapore, SG
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-semibold text-[#0F172A] font-denton">
                            ₹1,050
                          </span>
                          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded mt-1">
                            2%
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between pb-1 interactive-card cursor-pointer">
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#0F172A] font-poppins leading-none">
                          15/12/21
                        </span>
                        <span className="text-[9px] text-[#64748B] font-poppins mt-1.5 leading-none">
                          Serangoon, Singapore
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-semibold text-[#0F172A] font-denton">
                            ₹1,150
                          </span>
                          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded mt-1">
                            2%
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Summary Card Footer */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between font-poppins mt-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider leading-none">
                        Total This Month
                      </span>
                      <span className="text-sm font-semibold text-[#0F172A] font-denton mt-2 leading-none">
                        ₹5,240
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider leading-none">
                        Total Daily Cash
                      </span>
                      <span className="text-sm font-semibold text-emerald-600 font-denton mt-2 leading-none">
                        ₹104.80
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Default Spending Analysis view */
            <div className="flex-1 px-4 pt-2 pb-10 z-10 space-y-5 scrollbar-none animate-fadeIn">
              
              {/* Center-aligned Date Title */}
              <div className="flex flex-col items-center justify-center mt-3 mb-1">
                <span className="text-[24px] font-bold text-[#0F172A] font-poppins leading-none tracking-tight">
                  July 2026
                </span>
              </div>

              {selectedCalendarDay !== null ? (
                /* ---------------------------------------------------- */
                /* CALENDAR DAY PAYMENT DETAILS VIEW                   */
                /* ---------------------------------------------------- */
                <div className="flex-1 pb-10 z-10 flex flex-col scrollbar-none animate-fadeIn bg-[#FAF8F8]">
                  
                  {/* Header Row */}
                  <div className="relative px-5 pt-4 pb-3 flex items-center justify-between z-10 bg-white border-b border-slate-50">
                    <button 
                      onClick={() => setSelectedCalendarDay(null)}
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-100/80 shadow-sm hover:bg-slate-50 transition active:scale-90 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-800" />
                    </button>

                    <span className="font-poppins font-bold text-[16px] text-slate-800 tracking-tight">
                      Payment Details
                    </span>

                    <div className="w-9 h-9 opacity-0" /> {/* Spacer */}
                  </div>

                  {/* Content Scroll Wrapper */}
                  <div className="flex-1 px-4 pt-5 space-y-5 overflow-y-auto scrollbar-none pb-6">
                    
                    {/* Date Header Card */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col space-y-2.5">
                      <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase font-poppins">
                        DATE SELECTED
                      </span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[26px] font-bold text-slate-800 font-poppins leading-none tracking-tight">
                          July {selectedCalendarDay}, 2026
                        </span>
                        <span className="text-xs font-bold text-[#07995C] bg-[#E6F4EA] px-2.5 py-1 rounded-full font-poppins leading-none">
                          Auto-pay enabled
                        </span>
                      </div>
                    </div>

                    {/* Scheduled Payments List */}
                    <div className="flex flex-col space-y-3">
                      <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase font-poppins pl-1">
                        SCHEDULED BILLS & DEBITS
                      </span>
                      {(() => {
                        const getPaymentsForDay = (day) => {
                          switch (day) {
                            case 1:
                              return [{ name: 'Swiggy & Zomato', info: 'Food Delivery', amount: 20100, category: 'Food & Drinks' }];
                            case 5:
                              return [{ name: 'Society maintenance', info: 'Home Service', amount: 2500, category: 'Shopping & Bills' }];
                            case 8:
                              return [{ name: 'Starbucks Coffee', info: 'Dining Out', amount: 6400, category: 'Food & Drinks' }];
                            case 10:
                              return [{ name: 'Google One', info: 'Cloud Storage Service', amount: 900, category: 'Shopping & Bills' }];
                            case 14:
                              return [
                                { name: 'Cult.fit', info: 'Health & Fitness Plan', amount: 1300, category: 'Shopping & Bills' },
                                { name: 'Apple Store Cloud', info: 'Storage & Apps Subscription', amount: 1700, category: 'Shopping & Bills' }
                              ];
                            case 16:
                              return [{ name: 'Netflix Premium', info: 'Streaming Entertainment', amount: 1900, category: 'Entertainment' }];
                            case 20:
                              return [{ name: 'Uber Premium Cabs', info: 'Travel & Mobility', amount: 650, category: 'Travel & Cab' }];
                            default:
                              return [];
                          }
                        };
                        const dayPayments = getPaymentsForDay(selectedCalendarDay);
                        if (dayPayments.length === 0) {
                          return (
                            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-center font-poppins space-y-2">
                              <span className="block text-[13px] font-bold text-slate-800">No Payments Scheduled</span>
                              <span className="block text-[10px] text-slate-400">All caught up for this date! No auto-debits scheduled.</span>
                            </div>
                          );
                        }
                        return dayPayments.map((payment, idx) => (
                          <div 
                            key={idx}
                            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between"
                          >
                            <div className="flex items-center min-w-0">
                              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#07995C] flex items-center justify-center shrink-0">
                                {payment.category === 'Food & Drinks' ? (
                                  <Coffee className="w-5 h-5" />
                                ) : payment.category === 'Travel & Cab' ? (
                                  <Car className="w-5 h-5" />
                                ) : payment.category === 'Entertainment' ? (
                                  <Tv className="w-5 h-5" />
                                ) : (
                                  <Receipt className="w-5 h-5" />
                                )}
                              </div>
                              <div className="flex flex-col ml-3 min-w-0">
                                <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                                  {payment.name}
                                </span>
                                <span className="text-[9px] text-slate-500 font-poppins mt-1.5 leading-none">
                                  {payment.info}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center shrink-0 ml-3">
                              <span className="text-sm font-bold text-slate-800 font-denton mr-2.5">
                                  ₹{payment.amount.toLocaleString('en-IN')}
                              </span>
                              <div className="w-5 h-5 rounded-full bg-[#07995C]/10 text-[#07995C] flex items-center justify-center">
                                <Check className="w-3 h-3 font-extrabold" strokeWidth={3.5} />
                              </div>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>

                    {/* Other Payments Schedule Section */}
                    <div className="flex flex-col space-y-3 pt-1">
                      <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase font-poppins pl-1">
                        OTHER PAYMENTS THIS MONTH
                      </span>
                      
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] divide-y divide-slate-50 overflow-hidden">
                        {[
                          { day: 1, name: 'Swiggy & Zomato', amount: 20100 },
                          { day: 5, name: 'Society maintenance', amount: 2500 },
                          { day: 8, name: 'Starbucks Coffee', amount: 6400 },
                          { day: 10, name: 'Google One', amount: 900 },
                          { day: 14, name: 'Cult.fit', amount: 1300 },
                          { day: 14, name: 'Apple Store Cloud', amount: 1700 },
                          { day: 16, name: 'Netflix Premium', amount: 1900 },
                          { day: 20, name: 'Uber Premium Cabs', amount: 650 }
                        ]
                          .filter(p => p.day !== selectedCalendarDay)
                          .map((payment, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/40 transition">
                              <div className="flex items-center min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-[10px] font-bold text-slate-500 font-poppins">
                                  {payment.day}
                                </div>
                                <div className="flex flex-col ml-3 min-w-0">
                                  <span className="text-xs font-bold text-slate-700 font-poppins leading-none">
                                    {payment.name}
                                  </span>
                                  <span className="text-[8px] text-slate-400 font-poppins mt-1 leading-none">
                                    Due on July {payment.day}
                                  </span>
                                </div>
                              </div>

                              <span className="text-xs font-semibold text-slate-700 font-denton shrink-0 ml-3">
                                  ₹{payment.amount.toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                /* ---------------------------------------------------- */
                /* STANDARD MONTHLY CALENDAR GRID & RECURRING CANDIDATES */
                /* ---------------------------------------------------- */
                <>
                  {/* Calendar Card */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col space-y-5 animate-fadeIn">
                    
                    {/* Calendar Header Weekdays */}
                    <div className="grid grid-cols-7 gap-1 text-center font-poppins text-[10px] font-bold text-slate-400 tracking-wider mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                        <span key={idx}>{day}</span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-y-3 gap-x-2 justify-items-center">
                      {/* Empty cells for July 2026 offset (starts on Wednesday, so 3 empty cells) */}
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-10 h-10" />
                      ))}
                      {[
                        { day: 1, amount: '20.1k' },
                        { day: 2 },
                        { day: 3 },
                        { day: 4 },
                        { day: 5, amount: '13.2k' },
                        { day: 6 },
                        { day: 7 },
                        { day: 8, amount: '6.4k' },
                        { day: 9 },
                        { day: 10, amount: '900' },
                        { day: 11 },
                        { day: 12 },
                        { day: 13 },
                        { day: 14, amount: '3k' },
                        { day: 15, current: true },
                        { day: 16, amount: '1.9k' },
                        { day: 17 },
                        { day: 18 },
                        { day: 19 },
                        { day: 20, amount: '650' },
                        { day: 21 },
                        { day: 22 },
                        { day: 23 },
                        { day: 24 },
                        { day: 25 },
                        { day: 26 },
                        { day: 27 },
                        { day: 28 },
                        { day: 29 },
                        { day: 30 },
                        { day: 31 }
                      ].map((item, idx) => {
                        const isCurrent = item.day === 15;
                        return (
                          <div 
                            key={idx}
                            onClick={() => setSelectedCalendarDay(item.day)}
                            className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 cursor-pointer ${
                              isCurrent 
                                ? 'border-[2px] border-[#07995C] bg-[#E6F4EA]/45 font-bold shadow-sm scale-105' 
                                : 'hover:bg-slate-50 hover:scale-105 active:scale-95'
                            }`}
                          >
                            <span className={`text-[12px] font-bold ${isCurrent ? 'text-[#07995C]' : 'text-slate-800'}`}>
                              {item.day}
                            </span>
                            {item.amount && (
                              <span className={`text-[7px] font-extrabold mt-0.5 leading-none ${isCurrent ? 'text-[#07995C]' : 'text-slate-400'}`}>
                                {item.amount}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Possibly Recurring Title and Subtitle */}
                  <div className="flex flex-col space-y-1.5 pl-1 pt-1.5 animate-fadeIn">
                    <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase font-poppins">
                      POSSIBLY RECURRING • {recurringCandidates.length}
                    </span>
                    <span className="text-[11px] text-slate-500 font-poppins leading-relaxed">
                      We spotted these hitting your account more than once. Tap to add them as recurring.
                    </span>
                  </div>

                  {/* Candidates Cards */}
                  <div className="space-y-3 animate-fadeIn">
                    {recurringCandidates.map((candidate) => (
                      <div 
                        key={candidate.id}
                        className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between interactive-card transition-all duration-300"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                            {candidate.name}
                          </span>
                          <span className="text-[9px] text-slate-500 font-poppins mt-1.5 leading-none">
                            {candidate.info}
                          </span>
                        </div>

                        <div className="flex items-center shrink-0 ml-3">
                          <span className="text-xs font-bold text-slate-800 font-denton mr-3">
                            ₹{candidate.amount.toLocaleString('en-IN')}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Added ${candidate.name} (₹${candidate.amount}) to recurring payments!`);
                              setRecurringCandidates(prev => prev.filter(c => c.id !== candidate.id));
                            }}
                            className="bg-[#E6F4EA] text-[#07995C] border border-[#07995C]/20 hover:bg-[#D4EDDA] rounded-lg px-2.5 py-1.5 text-[10px] font-bold active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                          >
                            add recurring →
                          </button>
                        </div>
                      </div>
                    ))}
                    {recurringCandidates.length === 0 && (
                      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-center font-poppins">
                        <span className="text-xs text-slate-400">All recurring transactions successfully tracked!</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )) : (
            /* ---------------------------------------------------- */
            /* DEFAULT HOME SCREEN                                  */
            /* ---------------------------------------------------- */
          <div className="flex-1 px-0 pt-2 pb-10 z-10 space-y-5 scrollbar-none animate-fadeIn">
            
            {/* Top Profile Avatar */}
            <div className="flex justify-end px-6 pt-4 shrink-0 z-10">
              <div 
                onClick={() => setShowProfileOverlay(true)}
                className="w-12 h-12 bg-white rounded-full overflow-hidden border border-white shadow-sm cursor-pointer hover:scale-95 transition active:scale-90"
              >
                <img src={profileIcon} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Centered Value Header */}
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <span className="text-[11px] font-bold tracking-[0.15em] text-[#555555] uppercase font-poppins">
                SAVING SO FAR
              </span>
              <div className="flex items-center justify-center space-x-3.5 mt-2">
                <img 
                  src={img16400} 
                  alt="16,400" 
                  className="h-[76px] w-auto object-contain select-none"
                />
                <button className="text-[#555555] hover:text-slate-800 transition active:scale-95 cursor-pointer flex items-center justify-center self-center">
                  <RefreshCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bento Grid Area */}
            <div className="px-4 space-y-4">
              
              {/* Budget Card */}
              <div 
                onClick={() => onNavigate('recurring')}
                className="bg-white rounded-2xl p-4 flex justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-[0_4px_25px_rgba(0,0,0,0.05)] transition-all duration-300 interactive-card cursor-pointer hover:scale-[0.99]"
              >
                <div className="flex flex-col justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#64748B] font-poppins leading-none">
                    <span className="relative w-4 h-4 shrink-0 flex items-center justify-center">
                      <span className="absolute left-0 bottom-0 w-[13px] h-[13px] rounded-full bg-[#EC6D4F]" />
                      <span className="absolute right-0 top-0 w-[9px] h-[9px] rounded-[3px] bg-[#EC6D4F] border-[1.5px] border-white" />
                    </span>
                    <span>Budget</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" strokeWidth={2} />
                  </div>

                  <div className="mt-3">
                    <span className="text-2xl font-denton font-semibold text-[#0F172A] leading-none tracking-tight block">
                      ₹{budgetSpent}
                    </span>
                    <span className="text-xs text-[#64748B] font-poppins font-normal mt-1 block">
                      of ₹{budgetTotal}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] text-[#475569] font-poppins font-medium mt-4 whitespace-nowrap">
                    <span className="flex items-center space-x-1">
                      <Receipt className="w-3.5 h-3.5 text-[#6E7D97]" strokeWidth={1.8} />
                      <span>42 payments</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#D2D6DD]"></span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#6E7D97]" strokeWidth={1.8} />
                      <span>23 days left</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full pt-1 shrink-0">
                  <span className="text-[11px] font-normal text-[#697891] font-poppins leading-none mb-1">
                    Used <span className="text-[#1769FF] font-bold">50%</span>
                  </span>
                  <div className="relative flex items-end space-x-2.5 h-[64px] pb-0.5">
                    {/* Horizontal guide line at 50% height */}
                    <div className="absolute -left-4 -right-1 top-[32px] h-[1px] bg-[#E2E8F0] z-0"></div>
                    {/* Current period bar */}
                    <div className="w-[30px] h-[30px] bg-[#07995C] rounded-[6px] z-10 shadow-[0_2px_8px_rgba(7,153,92,0.15)] hover:scale-105 transition-transform duration-300"></div>
                    {/* Budget target bar */}
                    <div className="w-[30px] h-[60px] bg-gradient-to-b from-[#92F0C5] to-[#15AA70] rounded-[6px] relative overflow-hidden z-10 shadow-[0_4px_12px_rgba(21,170,112,0.2)] hover:scale-105 transition-transform duration-300">
                      {/* Division line inside target bar indicating 50% */}
                      <div className="absolute top-[30px] left-0 right-0 h-[1px] bg-white/70"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2-Column Row for Guild Free Number and Wellness Score */}
              <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
                {/* Guild Free Number Card */}
                <div className="bg-white rounded-2xl p-4 flex flex-col justify-between h-[126px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-[0_4px_25px_rgba(0,0,0,0.05)] transition-all duration-300">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-[#0F172A] font-poppins leading-none whitespace-nowrap">
                    <Building2 className="w-4 h-4 text-[#F3A35E] fill-[#F3A35E]" strokeWidth={0} />
                    <span>Guild Free Number</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-2xl font-denton font-semibold text-[#0F172A] leading-none tracking-tight">
                      ₹{monthlySavings}
                    </span>
                    <div className="flex items-center space-x-1.5 mt-2">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#ECFFF4] text-[#22C55E] border border-[#22C55E]/40 tracking-tight leading-none whitespace-nowrap">
                        <ArrowDown className="w-2.5 h-2.5 rotate-180 mr-0.5" strokeWidth={2.5} />
                        18%
                      </span>
                      <span className="text-[10px] text-[#64748B] font-poppins font-normal whitespace-nowrap">up this month</span>
                    </div>
                  </div>
                </div>

                {/* Wellness Score Card */}
                <div className="bg-white rounded-2xl p-3 flex flex-col items-center justify-between h-[126px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-[0_4px_25px_rgba(0,0,0,0.05)] transition-all duration-300">
                  <div className="relative w-[110px] h-[60px] overflow-hidden flex items-center justify-center mt-1">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 110 62">
                      <path
                        d="M 10,55 A 45,45 0 0 1 100,55"
                        fill="none"
                        stroke="#F1F5F9"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 10,55 A 45,45 0 0 1 100,55"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="141"
                        strokeDashoffset={141 - (141 * (wellnessScore / 100))}
                        className="drop-shadow-[0_0_4px_rgba(34,197,94,0.3)] transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <span className="absolute bottom-[2px] text-xl font-bold text-[#22C55E] font-poppins tracking-tight leading-none">
                      {wellnessScore}%
                    </span>
                  </div>
                  <span className="text-[10px] text-[#64748B] font-poppins font-semibold tracking-wide mb-0.5">Wellness Score</span>
                </div>
              </div>

              {/* Suggestion Banner */}
              <div className="bg-gradient-to-br from-[#D8FFF0] via-[#A9F7DB] to-[#63F2BF] rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-[#A7F3D0]/30 hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col justify-between h-[96px] relative overflow-hidden">
                <p className="text-xs font-semibold text-[#064E3B] font-poppins leading-snug max-w-[90%]">
                  Your late-night Swiggy orders are adding up fast.
                </p>
                <div className="flex items-center justify-between w-full mt-2 z-10">
                  <button 
                    onClick={() => onNavigate('ask-ai')}
                    className="flex items-center space-x-1 text-[11px] font-bold text-[#047857] font-poppins hover:translate-x-0.5 active:scale-95 transition-all duration-200 cursor-pointer leading-none"
                  >
                    <span>Boost Savings with AI</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#047857]" strokeWidth={2.5} />
                  </button>
                  <div className="flex items-center space-x-1.5 pr-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B]/20"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047857] scale-110 shadow-sm"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B]/20"></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Goals Progress Section */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between px-4">
                <span className="text-xs font-bold tracking-[0.1em] text-[#555555] uppercase font-poppins">
                  Goals Progress
                </span>
                <button 
                  onClick={() => onNavigate('ask-ai', 'set-goal')}
                  className="flex items-center space-x-1 text-[11px] font-bold text-[#0361e2] font-poppins hover:underline cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Goal</span>
                </button>
              </div>

              <div className="flex overflow-x-auto gap-3.5 px-4 pb-3 scrollbar-none snap-x snap-mandatory">
                {goals && goals.map((goal, index) => {
                  const progress = Math.min(100, Math.round((goal.saved / goal.target) * 100));
                  const theme = colorMap[goal.color] || colorMap.blue;
                  const IconComp = iconMap[goal.icon] || Target;
                  
                  return (
                    <div 
                      key={index} 
                      onClick={() => setActiveGoalDetails(goal)}
                      className="w-[220px] shrink-0 snap-start bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[116px] interactive-card cursor-pointer hover:shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-all duration-300 active:scale-95"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2 min-w-0">
                          <div className={`w-8 h-8 rounded-xl ${theme.lightBg} flex items-center justify-center shrink-0`}>
                            <IconComp className={`w-4 h-4 ${theme.text}`} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-[#0F172A] truncate leading-none">
                              {goal.name}
                            </span>
                            <span className="text-[9px] font-medium text-[#64748B] flex items-center mt-1">
                              <Clock className="w-2.5 h-2.5 mr-0.5 text-[#94A3B8]" />
                              {goal.timeLeft}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold ${theme.text} ${theme.lightBg} px-1.5 py-0.5 rounded-md shrink-0`}>
                          {progress}%
                        </span>
                      </div>

                      <div className="mt-2">
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${theme.gradient}`} 
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <div className="flex items-baseline justify-between mt-2 font-poppins leading-none">
                          <span className="text-[10px] font-bold text-[#0F172A]">
                            {formatAmount(goal.saved)}
                          </span>
                          <span className="text-[9px] font-medium text-[#64748B]">
                            of {formatAmount(goal.target)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Payments Section */}
            <div className="flex flex-col space-y-3">
              <div className="px-4">
                <span className="text-xs font-bold tracking-[0.1em] text-[#555555] uppercase font-poppins">
                  Upcoming Payments
                </span>
              </div>

              <div className="px-4 space-y-2.5">
                {upcomingPayments.map((payment, index) => {
                  const PaymentIcon = payment.icon;
                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-2xl p-3 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between interactive-card transition-all duration-300"
                    >
                      <div className="flex items-center min-w-0">
                        <div className={`w-9 h-9 rounded-xl ${payment.bgClass} flex items-center justify-center shrink-0`}>
                          <PaymentIcon className={`w-4 h-4 ${payment.iconClass}`} />
                        </div>
                        <div className="flex flex-col ml-3 min-w-0">
                          <span className="text-xs font-bold text-[#0F172A] truncate">
                            {payment.name}
                          </span>
                          <span className={`text-[10px] font-semibold mt-0.5 ${payment.dueClass}`}>
                            {payment.dueDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center shrink-0 ml-3">
                        <span className="text-xs font-bold text-[#0F172A]">
                          ₹{payment.amount.toLocaleString('en-IN')}
                        </span>
                        <button 
                          onClick={() => alert(`Initiating payment of ₹${payment.amount} for ${payment.name}`)}
                          className="ml-3 bg-[#0361e2] text-white rounded-lg px-2.5 py-1 text-[10px] font-bold hover:bg-[#0251c0] active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </div>

      </div>{/* end scrollable */}

      {/* Navigation Bar — Big Pill + Circle (Glassmorphic) */}
      <div className="absolute bottom-0 left-0 w-full px-4 pb-6 z-40 pointer-events-none flex items-end gap-3">

        {/* Big Glass Pill — Home · Financial Health · Recurring */}
        <div
          className="flex-1 h-[68px] rounded-[34px] flex items-center px-1.5 gap-1 pointer-events-auto"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1.5px solid rgba(255,255,255,0.75)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1.5px 0px rgba(255,255,255,0.60) inset',
          }}
        >
          {/* Home */}
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center justify-center flex-1 h-[56px] rounded-[28px] transition-all duration-250 gap-0.5 active:scale-95"
            style={activeTab === 'home' ? {
              background: 'rgba(20,20,20,0.90)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            } : {}}
          >
            <Home
              className="w-[17px] h-[17px] transition-colors duration-200"
              strokeWidth={2.2}
              color={activeTab === 'home' ? '#ffffff' : '#9CA3AF'}
            />
            <span
              className="text-[9px] font-semibold font-poppins leading-none transition-colors duration-200"
              style={{ color: activeTab === 'home' ? '#ffffff' : '#9CA3AF' }}
            >
              Home
            </span>
          </button>

          {/* Financial Health */}
          <button
            onClick={() => onNavigate('financial-health')}
            className="flex flex-col items-center justify-center flex-1 h-[56px] rounded-[28px] transition-all duration-250 gap-0.5 active:scale-95"
            style={activeTab === 'financial-health' ? {
              background: 'rgba(20,20,20,0.90)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            } : {}}
          >
            <TrendingUp
              className="w-[17px] h-[17px] transition-colors duration-200"
              strokeWidth={2.2}
              color={activeTab === 'financial-health' ? '#ffffff' : '#9CA3AF'}
            />
            <span
              className="text-[8px] font-semibold font-poppins leading-none text-center transition-colors duration-200"
              style={{ color: activeTab === 'financial-health' ? '#ffffff' : '#9CA3AF' }}
            >
              Fin. Health
            </span>
          </button>

          {/* Recurring */}
          <button
            onClick={() => onNavigate('recurring')}
            className="flex flex-col items-center justify-center flex-1 h-[56px] rounded-[28px] transition-all duration-250 gap-0.5 active:scale-95"
            style={activeTab === 'recurring' ? {
              background: 'rgba(20,20,20,0.90)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            } : {}}
          >
            <RefreshCcw
              className="w-[17px] h-[17px] transition-colors duration-200"
              strokeWidth={2.2}
              color={activeTab === 'recurring' ? '#ffffff' : '#9CA3AF'}
            />
            <span
              className="text-[9px] font-semibold font-poppins leading-none transition-colors duration-200"
              style={{ color: activeTab === 'recurring' ? '#ffffff' : '#9CA3AF' }}
            >
              Recurring
            </span>
          </button>
        </div>

        {/* Savvy AI — Glass Circle */}
        <button
          onClick={() => onNavigate('ask-ai')}
          className="shrink-0 w-[68px] h-[68px] rounded-full flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all duration-250 pointer-events-auto"
          style={{
            background: activeTab === 'ask-ai'
              ? 'rgba(200,255,0,0.88)'
              : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: activeTab === 'ask-ai'
              ? '1.5px solid rgba(200,255,0,0.95)'
              : '1.5px solid rgba(255,255,255,0.75)',
            boxShadow: activeTab === 'ask-ai'
              ? '0 8px 28px rgba(180,255,0,0.30), 0 1.5px 0 rgba(255,255,255,0.50) inset'
              : '0 8px 32px rgba(0,0,0,0.10), 0 1.5px 0px rgba(255,255,255,0.60) inset',
          }}
        >
          {/* Sparkle / Star icon */}
          <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px]">
            <path
              d="M12 2.5L13.5 8.5L19.5 10L13.5 11.5L12 17.5L10.5 11.5L4.5 10L10.5 8.5L12 2.5Z"
              fill={activeTab === 'ask-ai' ? '#0D0D0D' : '#9CA3AF'}
            />
            <circle cx="19" cy="5" r="1.5" fill={activeTab === 'ask-ai' ? '#0D0D0D' : '#C8FF00'} />
            <circle cx="5" cy="19" r="1" fill={activeTab === 'ask-ai' ? '#0D0D0D' : '#C8FF00'} />
          </svg>
          <span
            className="text-[8px] font-bold font-poppins leading-none"
            style={{ color: activeTab === 'ask-ai' ? '#0D0D0D' : '#9CA3AF' }}
          >
            Savvy AI
          </span>
        </button>

      </div>

      {/* Goal Detail Bottom Sheet Overlay */}
      {activeGoalDetails && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            onClick={() => setActiveGoalDetails(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-[4px] z-50 animate-fadeIn"
          />
          
          {/* Bottom Sheet Container */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#FAF8F8] rounded-t-[32px] z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] flex flex-col max-h-[82%] animate-slideUp overflow-hidden border-t border-slate-100">
            
            {/* Top Handle and Close Button Row */}
            <div className="p-4 pb-2 flex items-center justify-between shrink-0">
              <button 
                onClick={() => setActiveGoalDetails(null)}
                className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center cursor-pointer shadow-sm hover:scale-95 active:scale-90 transition-all"
              >
                {/* Close X icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-slate-800">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="w-12 h-1 bg-slate-200 rounded-full mr-9"></div> {/* Centered indicator line */}
              <div></div> {/* Placeholder for flex alignment */}
            </div>

            {/* Title & Header Section */}
            <div className="px-6 flex flex-col shrink-0">
              <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase font-poppins">
                Goal details
              </span>
              <span className="text-xl font-bold text-[#0F172A] font-poppins mt-1">
                {activeGoalDetails.name}
              </span>
              <span className="text-[11px] text-[#64748B] font-poppins mt-1">
                Target date: {activeGoalDetails.timeLeft === "Finished" ? "Achieved" : activeGoalDetails.timeLeft}
              </span>
            </div>

            {/* Scrollable sheet content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 scrollbar-none pb-8">
              
              {/* Dial Card Section */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col items-center">
                
                {/* Circular Dial Progress */}
                <div className="relative w-[180px] h-[180px] flex items-center justify-center">
                  
                  {/* SVG Progress Circle */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {/* Inner Defs for Green Gradient */}
                    <defs>
                      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#B7F0AD" />
                        <stop offset="100%" stopColor="#07995C" />
                      </linearGradient>
                    </defs>

                    {/* Track Circle */}
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="64" 
                      className="stroke-slate-100" 
                      strokeWidth="10" 
                      fill="transparent" 
                    />

                    {/* Animated Active Progress Circle */}
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="64" 
                      stroke="url(#greenGradient)"
                      strokeWidth="10" 
                      fill="transparent" 
                      strokeDasharray="402.12"
                      strokeDashoffset={402.12 * (1 - Math.min(100, Math.round((activeGoalDetails.saved / activeGoalDetails.target) * 100)) / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Inside Circle Texts */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 leading-none">
                    <span className="text-[8px] font-bold tracking-wider text-[#64748B] uppercase font-poppins">
                      Card Balance
                    </span>
                    <span className="text-xl font-denton font-semibold text-[#0F172A] mt-2 block truncate max-w-full">
                      ₹{activeGoalDetails.saved.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[8px] font-bold text-[#94A3B8] font-poppins mt-2.5">
                      NO INTEREST CHARGES
                    </span>
                  </div>

                  {/* Star Pin badge on Top of Circle */}
                  <div className="absolute top-[3px] left-[78px] transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#07995C] border-2 border-white flex items-center justify-center shadow-md">
                    <span className="text-white text-[10px]">★</span>
                  </div>

                </div>
              </div>

              {/* Subtitle Info Description */}
              <div className="space-y-3.5 pl-1">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0F172A] font-poppins leading-none">
                    Pay February Balance
                  </span>
                  <span className="text-[10px] text-[#64748B] font-poppins mt-2 leading-relaxed">
                    Paying your goal's monthly balance is recommended to help keep you financially healthy and reach your target earlier.
                  </span>
                </div>

                {/* Links / CTAs */}
                <div className="flex flex-col space-y-2.5 pt-1">
                  <button 
                    onClick={() => {
                      setActiveGoalDetails(null);
                      onNavigate('ask-ai');
                    }}
                    className="flex items-center space-x-2 text-[11px] font-bold text-[#0361e2] font-poppins hover:underline cursor-pointer text-left"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#e6effc] text-[#0361e2] flex items-center justify-center text-[9px] font-serif font-bold italic shrink-0">i</span>
                    <span>Learn More & Consult Savvy AI</span>
                  </button>
                  <button className="flex items-center space-x-2 text-[11px] font-bold text-[#0361e2] font-poppins hover:underline cursor-pointer text-left">
                    <span className="w-4 h-4 shrink-0 flex items-center justify-center text-slate-500 font-bold">⌨</span>
                    <span>Set Other Auto-Save Amount</span>
                  </button>
                </div>
              </div>

              {/* Savings and Growth breakdown */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-wider font-poppins leading-none">
                    Total saved
                  </span>
                  <span className="text-sm font-semibold text-[#0F172A] font-denton mt-2 leading-none">
                    ₹{Math.round(activeGoalDetails.saved * 0.92).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex flex-col border-l border-slate-100 pl-4">
                  <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-wider font-poppins leading-none">
                    Interest Yield
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 font-denton mt-2 leading-none">
                    +₹{Math.round(activeGoalDetails.saved * 0.08).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Sticky Action Buttons */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3 shrink-0 pb-7">
              <button 
                onClick={() => alert(`Scheduled monthly auto-save for ${activeGoalDetails.name}`)}
                className="flex-1 h-11 rounded-full bg-[#E2E8F0]/60 text-slate-800 text-xs font-bold font-poppins cursor-pointer active:scale-95 transition-all hover:bg-[#E2E8F0]/80"
              >
                Schedule
              </button>
              <button 
                onClick={() => {
                  alert(`Funded ₹2,000 to ${activeGoalDetails.name}!`);
                  setActiveGoalDetails(null);
                }}
                className="flex-1 h-11 rounded-full bg-slate-900 text-white text-xs font-bold font-poppins cursor-pointer active:scale-95 transition-all hover:bg-slate-800"
              >
                Pay ₹2,000
              </button>
            </div>

          </div>
        </>
      )}

      {/* Profile Overlay Screen */}
      {showProfileOverlay && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          {/* Overlay dismiss click */}
          <div className="absolute inset-0 z-0" onClick={() => setShowProfileOverlay(false)} />
          
          {/* Bottom Sheet Card */}
          <div className="relative z-10 bg-[#FAF8F8] rounded-t-[32px] w-full max-h-[92%] flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.08)] animate-slide-up overflow-hidden pb-8">
            
            {/* Header Row */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100 bg-white">
              <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase font-poppins">
                PROFILE
              </span>
              <button 
                onClick={() => setShowProfileOverlay(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition active:scale-90 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 scrollbar-none">
              
              {/* Shubham Details Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex items-center space-x-4">
                {/* Avatar badge */}
                <div className="w-16 h-16 rounded-full bg-[#E6F4EA] border border-[#07995C]/20 text-[#07995C] flex items-center justify-center font-denton text-3xl font-bold select-none shrink-0 shadow-inner">
                  S
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[22px] font-bold text-slate-800 font-denton leading-none">
                    Shubham
                  </span>
                  <span className="text-xs font-semibold text-slate-400 font-poppins mt-2 leading-none">
                    +91 99999 99999
                  </span>
                  
                  {/* Finding your feet Month 2 badge */}
                  <div className="mt-3.5 inline-flex items-center space-x-1.5 self-start px-3 py-1 rounded-full border border-[#07995C]/20 bg-[#E6F4EA]/45">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#07995C]" />
                    <span className="text-[9.5px] font-bold text-[#07995C] font-poppins">
                      Finding your feet · month 2
                    </span>
                  </div>
                </div>
              </div>

              {/* Privacy Section */}
              <div className="space-y-3">
                <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase font-poppins pl-1">
                  PRIVACY
                </span>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] divide-y divide-slate-50 overflow-hidden">
                  
                  {/* Hide amounts (Linked to balanceVisible state) */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                        Hide amounts
                      </span>
                      <span className="text-[9px] text-slate-400 font-poppins mt-1.5 leading-normal">
                        Masks balances across Home and Financial health
                      </span>
                    </div>
                    <button 
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none shrink-0 cursor-pointer ${
                        !balanceVisible ? 'bg-[#07995C]' : 'bg-slate-200'
                      }`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                        !balanceVisible ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* App lock */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                        App lock
                      </span>
                      <span className="text-[9px] text-slate-400 font-poppins mt-1.5 leading-none">
                        Face ID on open
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 font-poppins shrink-0 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Soon
                    </span>
                  </div>

                </div>
              </div>

              {/* Linked Data Section */}
              <div className="space-y-3">
                <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase font-poppins pl-1">
                  LINKED DATA
                </span>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] divide-y divide-slate-50 overflow-hidden">
                  
                  {/* Bank accounts */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                        Bank accounts
                      </span>
                      <span className="text-[9px] text-slate-400 font-poppins mt-1.5 leading-normal">
                        HDFC · ICICI, via Account Aggregator
                      </span>
                    </div>
                    <span className="text-[10.5px] font-extrabold text-[#07995C] bg-[#E6F4EA]/60 px-2.5 py-1 rounded-full font-poppins shrink-0">
                      Active
                    </span>
                  </div>

                  {/* Credit bureau */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                        Credit bureau
                      </span>
                      <span className="text-[9px] text-slate-400 font-poppins mt-1.5 leading-normal">
                        Score and accounts, refreshed monthly
                      </span>
                    </div>
                    <span className="text-[10.5px] font-extrabold text-[#07995C] bg-[#E6F4EA]/60 px-2.5 py-1 rounded-full font-poppins shrink-0">
                      Active
                    </span>
                  </div>

                  {/* SMS parsing */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                        SMS parsing
                      </span>
                      <span className="text-[9px] text-slate-400 font-poppins mt-1.5 leading-normal">
                        Bank messages only
                      </span>
                    </div>
                    <span className="text-[10.5px] font-extrabold text-[#07995C] bg-[#E6F4EA]/60 px-2.5 py-1 rounded-full font-poppins shrink-0">
                      Active
                    </span>
                  </div>

                  {/* Email parsing */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                        Email parsing
                      </span>
                      <span className="text-[9px] text-slate-400 font-poppins mt-1.5 leading-normal">
                        Bills and statements only
                      </span>
                    </div>
                    <span className="text-[10.5px] font-extrabold text-[#07995C] bg-[#E6F4EA]/60 px-2.5 py-1 rounded-full font-poppins shrink-0">
                      Active
                    </span>
                  </div>

                </div>
                <p className="text-[9.5px] text-slate-400 text-center font-poppins leading-normal pt-1">
                  Pause or revoke any of these anytime. Your data stays yours.
                </p>
              </div>

              {/* Transactions Section */}
              <div className="space-y-3">
                <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase font-poppins pl-1">
                  TRANSACTIONS
                </span>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-xs font-bold text-slate-800 font-poppins leading-none">
                        Auto-sync transaction history
                      </span>
                      <span className="text-[9px] text-slate-400 font-poppins mt-1.5 leading-normal">
                        Refreshes background logs every 24 hours
                      </span>
                    </div>
                    <span className="text-[10.5px] font-extrabold text-[#07995C] bg-[#E6F4EA]/60 px-2.5 py-1 rounded-full font-poppins shrink-0">
                      Active
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
