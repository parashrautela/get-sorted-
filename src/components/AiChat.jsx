import React, { useState } from 'react';
import { ArrowLeft, MessageSquarePlus, ChevronDown, Car, Mic, Send, Keyboard, X } from 'lucide-react';

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

  // Check if BMW Goal is already added
  const isBmwGoalAdded = goals.some(g => g.name === 'BMW 3 Series');

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F8] relative text-slate-800 font-sans pb-4 h-full select-none overflow-hidden animate-fadeIn">
      
      {/* Background Frame Gradient (Light mint green to transparent) */}
      <div className="absolute top-0 left-0 w-full h-[320px] bg-gradient-to-b from-[#E6F4EA] to-transparent pointer-events-none"></div>

      {/* Header Container */}
      <div className="relative px-5 pt-4 pb-3 flex items-center justify-between z-10">
        <button 
          onClick={onBack}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-100/80 shadow-sm hover:bg-slate-50 transition active:scale-90"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>

        <span className="font-poppins font-bold text-[16px] text-slate-800 tracking-tight">
          Savvy AI
        </span>

        <button 
          onClick={() => {
            setActiveScenario('welcome');
            setInputText('');
          }}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-100/80 shadow-sm hover:bg-slate-50 transition active:scale-90 cursor-pointer"
        >
          <MessageSquarePlus className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Scenario Selector Pills */}
      <div className="relative px-4 py-2 bg-[#FAF8F8]/80 backdrop-blur-sm border-b border-slate-100 flex space-x-2 overflow-x-auto z-10 shrink-0 select-none scrollbar-none">
        {[
          { id: 'welcome', label: '👋 Welcome' },
          { id: 'voice-typing', label: '🎙️ Voice Trend' },
          { id: 'spendings-roast', label: '🔥 Roast' },
          { id: 'savings-plan', label: '💡 Plan' },
          { id: 'set-goal', label: '🚗 Goal' }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveScenario(item.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium font-poppins transition-all duration-200 ease-in-out whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] border ${
              activeScenario === item.id 
                ? 'bg-[#07995C] text-white shadow-sm border-[#07995C]' 
                : 'bg-white border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 z-10 flex flex-col justify-start scrollbar-none">
        
        {/* Scenario 0: Welcome Landing Page */}
        {activeScenario === 'welcome' && (
          <div className="flex-1 flex flex-col justify-center px-2 space-y-6 pt-2 animate-fadeIn select-text">
            <h1 className="text-[34px] font-bold text-slate-800 font-poppins tracking-tight pl-1 leading-none">
              Hey you 👋
            </h1>
            
            <div className="space-y-4 pl-1">
              <p className="text-[15px] font-medium leading-relaxed text-slate-600 font-poppins">
                <span className="font-semibold text-slate-800">Parash</span>, your last 7 days had a very committed relationship with Starbucks: 8 trips for <span className="font-semibold text-slate-800">₹5,240</span> total.
              </p>
              
              <p className="text-[15px] font-medium leading-relaxed text-slate-600 font-poppins">
                I can also see you’ve got recurring income set up, but no upcoming bills tracked right now. Do you want to look at your spending or set up bills?
              </p>
            </div>
          </div>
        )}
        
        {/* Scenario 1: Voice Typing */}
        {activeScenario === 'voice-typing' && (
          <>
            {/* User message */}
            <div className="flex justify-end pr-2">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 max-w-[85%] shadow-sm">
                <p className="text-[14px] font-medium text-[#020617]">
                  Jus, how are my finances looking?
                </p>
              </div>
            </div>

            {/* AI Response */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 px-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#EDF4FB]">
                  <JuspayAiLogo className="w-[20px] h-[20px]" />
                </div>
                <span className="text-[12px] font-medium text-slate-400">Generated live insights</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400 opacity-60" />
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
                <p className="text-[14px] font-medium leading-relaxed text-[#020617]">
                  You’re doing better than last month 👀
                  <br /><br />
                  Your savings are rising compared to last month, especially during weekdays. If this trend continues, you could see a 15-20% increase in monthly savings soon.
                </p>

                {/* Savings Trend Line Chart widget */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between opacity-80">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[14px] font-semibold text-slate-800">Savings Trend</span>
                      <span className="flex items-center px-1.5 py-0.5 rounded-full text-[12px] bg-emerald-50 border border-emerald-500/20 text-emerald-500 font-semibold space-x-0.5">
                        <span className="inline-block transform rotate-180 text-[8px]">▼</span>
                        <span>18%</span>
                      </span>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-full px-2 py-1 flex items-center space-x-1 shadow-sm">
                      <span className="text-[12px] text-slate-500 font-medium">Last 30 days</span>
                      <ChevronDown className="w-2.5 h-2.5 text-slate-500 opacity-60" />
                    </div>
                  </div>

                  {/* Gorgeous Custom SVG Savings Trend Chart */}
                  <div className="relative w-full h-[120px] pt-2">
                    <svg viewBox="0 0 320 100" className="w-full h-[90px] overflow-visible">
                      <defs>
                        <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Area Fill */}
                      <path 
                        d="M 0 60 C 20 58, 40 50, 60 52 C 80 54, 100 48, 120 44 C 140 40, 160 48, 180 46 C 200 44, 220 38, 240 34 C 260 30, 280 26, 300 24 C 310 23, 320 22, 320 22 L 320 100 L 0 100 Z" 
                        fill="url(#chart-glow)" 
                      />
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="320" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="320" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
                      {/* Main Trend Line */}
                      <path 
                        d="M 0 60 C 20 58, 40 50, 60 52 C 80 54, 100 48, 120 44 C 140 40, 160 48, 180 46 C 200 44, 220 38, 240 34 C 260 30, 280 26, 300 24 C 310 23, 320 22, 320 22" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                        className="animate-[dash_1.5s_ease-in-out_forwards]"
                      />
                      {/* Dot pointer indicator */}
                      <circle cx="320" cy="22" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="flex justify-between text-[12px] text-slate-400 font-medium px-1 mt-1">
                      <span>May 1</span>
                      <span>May 8</span>
                      <span>May 15</span>
                      <span>May 22</span>
                      <span>Jun 1</span>
                    </div>
                  </div>
                </div>

                <p className="text-[14px] text-slate-500 font-medium leading-normal">
                  Want me to <span className="text-slate-400">help optimize your spending categories or build a smarter savings plan?</span>
                </p>
              </div>
            </div>
          </>
        )}

        {/* Scenario 2: Spendings Roast */}
        {activeScenario === 'spendings-roast' && (
          <>
            {/* User message */}
            <div className="flex justify-end pr-2">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 max-w-[85%] shadow-sm">
                <p className="text-[14px] font-medium text-[#020617]">
                  Roast my spending habits 😭
                </p>
              </div>
            </div>

            {/* AI Response */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 px-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#EDF4FB]">
                  <JuspayAiLogo className="w-[20px] h-[20px]" />
                </div>
                <span className="text-[12px] font-medium text-slate-400">Analyzed monthly spending</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400 opacity-60" />
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
                <p className="text-[14px] font-medium leading-relaxed text-[#020617]">
                  Alright, Here’s where your money disappeared this month 💀
                  <br /><br />
                  You stay financially responsible during weekdays, then spend weekends like future-you will handle the consequences 💳🍔
                  <br /><br />
                  This month was heavily carried by food, shopping, and transport. At this point, Swiggy is lowkey acting like a recurring subscription .
                </p>

                {/* Monthly Breakdown Pie chart widget */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between opacity-80">
                    <span className="text-[14px] font-semibold text-slate-800">Monthly Breakdown</span>
                    <div className="bg-white border border-slate-100 rounded-full px-2 py-1 flex items-center space-x-1 shadow-sm">
                      <span className="text-[12px] text-slate-500 font-medium">May 2026</span>
                      <ChevronDown className="w-2.5 h-2.5 text-slate-500 opacity-60" />
                    </div>
                  </div>

                  {/* Custom Donut Chart SVG */}
                  <div className="flex justify-center relative py-1">
                    <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                      {/* Donut arcs */}
                      {/* Food: 12400 (42.2%) -> color: #07995C (brand green) */}
                      <circle 
                        cx="90" cy="90" r="65" 
                        fill="transparent" 
                        stroke="#07995C" 
                        strokeWidth="24"
                        strokeDasharray={`${2 * Math.PI * 65}`}
                        strokeDashoffset={`${2 * Math.PI * 65 * (1 - 0.422)}`}
                        className="transition-all duration-1000"
                      />
                      {/* Transport: 9800 (33.3%) -> color: #10B981 (emerald) */}
                      <circle 
                        cx="90" cy="90" r="65" 
                        fill="transparent" 
                        stroke="#10B981" 
                        strokeWidth="24"
                        strokeDasharray={`${2 * Math.PI * 65}`}
                        strokeDashoffset={`${2 * Math.PI * 65 * (1 - 0.333)}`}
                        style={{ transformOrigin: '90px 90px', transform: 'rotate(152deg)' }}
                      />
                      {/* Shopping: 7200 (24.5%) -> color: #34D399 (emerald light) */}
                      <circle 
                        cx="90" cy="90" r="65" 
                        fill="transparent" 
                        stroke="#34D399" 
                        strokeWidth="24"
                        strokeDasharray={`${2 * Math.PI * 65}`}
                        strokeDashoffset={`${2 * Math.PI * 65 * (1 - 0.245)}`}
                        style={{ transformOrigin: '90px 90px', transform: 'rotate(272deg)' }}
                      />
                    </svg>

                    {/* Donut Center Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[12px] text-slate-400 font-medium leading-none">Total Spend</span>
                      <span className="text-[24px] font-bold text-[#020617] tracking-tight mt-1">₹29,400</span>
                    </div>
                  </div>

                  {/* Categories Breakdown Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 bg-[#07995C] rounded-full shrink-0"></span>
                      <div>
                        <p className="text-[12px] text-slate-500 font-medium">Food</p>
                        <p className="text-[12px] font-bold text-slate-800">₹12,400</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full shrink-0"></span>
                      <div>
                        <p className="text-[12px] text-slate-500 font-medium">Transport</p>
                        <p className="text-[12px] font-bold text-slate-800">₹9,800</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 bg-[#34D399] rounded-full shrink-0"></span>
                      <div>
                        <p className="text-[12px] text-slate-500 font-medium">Shopping</p>
                        <p className="text-[12px] font-bold text-slate-800">₹7,200</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

        {/* Scenario 3: Savings Plan Recommendations */}
        {activeScenario === 'savings-plan' && (
          <>
            {/* User message */}
            <div className="flex justify-end pr-2">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 max-w-[85%] shadow-sm">
                <p className="text-[14px] font-medium text-[#020617]">
                  yo how can i save ₹15k this month 😭
                </p>
              </div>
            </div>

            {/* AI Response */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 px-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#EDF4FB]">
                  <JuspayAiLogo className="w-[20px] h-[20px]" />
                </div>
                <span className="text-[12px] font-medium text-slate-400">Personalized plans ready</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400 opacity-60" />
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
                <p className="text-[14px] font-medium leading-relaxed text-[#020617]">
                  Your spending habits aren’t actually that bad. Most of your money is just disappearing through repeated small spends over the month.
                  <br /><br />
                  <strong>Where your money went this month:</strong>
                  <br />
                  • <strong>Food Delivery:</strong> ₹6,400 spent (Late night orders are carrying this category rn)
                  <br />
                  • <strong>Shopping:</strong> ₹5,200 spent (Mostly impulse + weekend purchases)
                  <br />
                  • <strong>Cabs & Transport:</strong> ₹3,100 spent (Higher than your usual average)
                  <br /><br />
                  I created 2 plans that could realistically help you save ₹15k this month 👇
                </p>

                {/* Plans lists */}
                <div className="space-y-3">
                  
                  {/* Smart Saver Plan Option */}
                  <div 
                    onClick={() => setSavingsPlan('smart-saver')}
                    className={`p-3.5 border rounded-2xl flex flex-col space-y-2 cursor-pointer transition ${savingsPlan === 'smart-saver' ? 'bg-slate-50 border-brand-blue shadow-sm' : 'bg-white border-slate-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 font-semibold text-[14px]">
                        <span>Smart Saver Plan</span>
                        <span>⚡</span>
                      </div>

                      {/* Custom radio button */}
                      <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${savingsPlan === 'smart-saver' ? 'border-brand-blue bg-white' : 'border-slate-300'}`}>
                        {savingsPlan === 'smart-saver' && <span className="w-2.5 h-2.5 bg-brand-blue rounded-full"></span>}
                      </span>
                    </div>

                    <p className="text-[12px] text-slate-500 leading-normal">
                      To optimize your budget, cut spending by 25%. Limit food deliveries to weekends and avoid impulse buys. Set a weekly budget of ₹7,000 to save around ₹15,800.
                    </p>
                  </div>

                  {/* Flexible Savings Plan Option */}
                  <div 
                    onClick={() => setSavingsPlan('flexible')}
                    className={`p-3.5 border rounded-2xl flex flex-col space-y-2 cursor-pointer transition ${savingsPlan === 'flexible' ? 'bg-slate-50 border-brand-blue shadow-sm' : 'bg-white border-slate-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[14px]">
                        Flexible Savings Plan
                      </div>

                      {/* Custom radio button */}
                      <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${savingsPlan === 'flexible' ? 'border-brand-blue bg-white' : 'border-slate-300'}`}>
                        {savingsPlan === 'flexible' && <span className="w-2.5 h-2.5 bg-brand-blue rounded-full"></span>}
                      </span>
                    </div>

                    <p className="text-[12px] text-slate-500 leading-normal">
                      Over the next six weeks, save consistently. Start with ₹8,000 this month and set aside savings for next month. This reduces stress and ensures steady progress.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

        {/* Scenario 4: Set a Goal */}
        {activeScenario === 'set-goal' && (
          <>
            {/* User message */}
            <div className="flex justify-end pr-2">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 max-w-[85%] shadow-sm">
                <p className="text-[14px] font-medium text-[#020617]">
                  Can I afford a BMW right now?
                </p>
              </div>
            </div>

            {/* AI response 1 */}
            <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm max-w-[85%]">
              <p className="text-[14px] font-medium text-[#020617] leading-relaxed">
                It depends; BMWs come in a wide price range. Which model are you considering?
              </p>
            </div>

            {/* User message 2 */}
            <div className="flex justify-end pr-2">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 max-w-[85%] shadow-sm">
                <p className="text-[14px] font-medium text-[#020617]">
                  I'm thinking about a BMW 3 Series.
                </p>
              </div>
            </div>

            {/* AI response 2 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 px-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#EDF4FB]">
                  <JuspayAiLogo className="w-[20px] h-[20px]" />
                </div>
                <span className="text-[12px] font-medium text-slate-400">Goal analysis complete.</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400 opacity-60" />
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
                <p className="text-[14px] font-medium leading-relaxed text-[#020617]">
                  Understood. The BMW 3 Series typically starts at around ₹75 lakh on-road, depending on the variant and location. Honestly, taking some time before purchasing could ease the financial stress. 
                  <br /><br />
                  I suggest building a savings goal first instead of rushing into the buy. 
                  <br /><br />
                  If you save about ₹35k-₹45k each month, you could aim for a solid down payment in the next 2-3 years without straining your finances.
                </p>

                {/* Start Savings Goal card */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 bg-teal-500/10 rounded-full flex items-center justify-center shrink-0">
                      <Car className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-[16px] font-semibold text-slate-800 truncate">BMW 3 Series Goal</h4>
                          <p className="text-[12px] text-slate-400 mt-0.5">Timeline · 32 months</p>
                        </div>
                        <span className="text-[16px] font-bold text-slate-800 text-right whitespace-nowrap">₹12 Lakh</span>
                      </div>
                    </div>
                  </div>

                  {/* Add goal CTA button */}
                  <button 
                    disabled={isBmwGoalAdded}
                    onClick={() => onAddGoal({
                      name: 'BMW 3 Series',
                      timeLeft: '32 months left',
                      saved: 0,
                      target: 1200000,
                      color: 'blue',
                      icon: 'Car'
                    })}
                    className={`w-full py-3.5 rounded-2xl text-[14px] font-semibold text-center transition shadow-sm active:scale-98 ${isBmwGoalAdded ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-gradient-to-r from-[#0358ce] to-[#1542aa] text-white hover:brightness-105'}`}
                  >
                    {isBmwGoalAdded ? 'Goal Started ✓' : 'Start Savings Goal'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Voice Assistant / Input section */}
      <div className="px-4 py-2 shrink-0 z-10 select-none space-y-3.5">
        
        {/* Dynamic Suggestion Chips */}
        {activeScenario !== 'voice-typing' && (
          <div className="flex overflow-x-auto gap-2 py-1 scrollbar-none justify-start pl-1 snap-x snap-mandatory">
            {[
              { label: 'look at spending', scenario: 'spendings-roast' },
              { label: 'smart saver plan', scenario: 'savings-plan' },
              { label: 'bmw 3 series goal', scenario: 'set-goal' },
              { label: 'set up bills', scenario: 'welcome', action: 'bills' }
            ].map((chip, i) => (
              <button
                key={i}
                onClick={() => {
                  if (chip.action === 'bills') {
                    alert("Tracked 3 upcoming payments! Check them out on the Recurring tab.");
                  } else {
                    setActiveScenario(chip.scenario);
                  }
                }}
                className="snap-start px-3.5 py-1.5 bg-white rounded-xl border border-slate-200 text-[12px] font-semibold text-slate-600 shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:border-[#07995C]/30 hover:bg-[#F0FDF4] active:scale-95 transition-all cursor-pointer whitespace-nowrap font-poppins"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Speaking badge/control showing ONLY in voice-typing scenario */}
        {activeScenario === 'voice-typing' && (
          <div className="flex flex-col items-center justify-end h-[170px] relative mt-2">
            
            {/* Glowing / Wave Mic layout */}
            <div className="relative flex flex-col items-center justify-center pt-8">
              
              {/* Speaking... Status label Anchored to Mic */}
              <div className="absolute -top-6 bg-white border border-slate-100 rounded-full px-4 py-1.5 shadow-sm text-xs font-semibold text-slate-700 font-poppins z-20">
                Speaking...
              </div>

              {/* Pulsing ring 1 */}
              <div className="absolute w-[120px] h-[120px] bg-[#07995C]/10 rounded-full animate-mic-wave pointer-events-none"></div>
              {/* Pulsing ring 2 */}
              <div className="absolute w-[90px] h-[90px] bg-[#07995C]/15 rounded-full animate-mic-wave pointer-events-none" style={{ animationDelay: '0.6s' }}></div>

              {/* Central Mic Button */}
              <button 
                onClick={() => setActiveScenario('welcome')}
                className="relative w-16 h-16 bg-[#07995C] text-white rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 active:scale-[0.96] transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg"
              >
                <Mic className="w-7 h-7 text-white" />
              </button>
            </div>

            {/* Keyboard / Close controls */}
            <div className="absolute bottom-1 w-full flex justify-between px-3">
              <button 
                onClick={() => setActiveScenario('spendings-roast')}
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm active:scale-90 hover:bg-slate-50 transition cursor-pointer"
              >
                <Keyboard className="w-6 h-6 text-slate-500" />
              </button>

              <button 
                onClick={onBack}
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm active:scale-90 hover:bg-slate-50 transition cursor-pointer"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
          </div>
        )}

        {/* Regular text input box for non-voice-typing scenarios */}
        {activeScenario !== 'voice-typing' && (
          <div className="bg-white border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center space-x-3 shadow-sm w-full transition-all duration-200 ease-in-out focus-within:border-[#07995C]/40 focus-within:shadow-md focus-within:bg-[#FAF8F8]/50">
            {/* Lightning bolt icon */}
            <span className="text-[#07995C] shrink-0 font-bold text-lg select-none">⚡</span>
            
            <input 
              type="text" 
              placeholder="Ask me anything"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputText.trim()) {
                  alert(`Sending request: "${inputText}"`);
                  setInputText('');
                }
              }}
              className="flex-1 bg-transparent text-[14px] text-slate-800 placeholder-slate-400 border-none focus:outline-none focus:ring-0 py-2 font-poppins"
            />
            
            {/* Conditional action button: Soundwave mic or Send arrow */}
            {inputText.trim() === '' ? (
              <button 
                onClick={() => setActiveScenario('voice-typing')}
                className="w-10 h-10 rounded-full bg-[#07995C] flex items-center justify-center shrink-0 shadow-sm hover:shadow active:scale-[0.96] transition-all duration-200 ease-in-out cursor-pointer"
              >
                {/* Vertical soundwave voice indicator lines */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-white">
                  <line x1="6" y1="9" x2="6" y2="15" strokeLinecap="round" />
                  <line x1="10" y1="5" x2="10" y2="19" strokeLinecap="round" />
                  <line x1="14" y1="8" x2="14" y2="16" strokeLinecap="round" />
                  <line x1="18" y1="11" x2="18" y2="13" strokeLinecap="round" />
                </svg>
              </button>
            ) : (
              <button 
                onClick={() => {
                  alert(`Sending request: "${inputText}"`);
                  setInputText('');
                }}
                className="w-10 h-10 rounded-full bg-[#07995C] flex items-center justify-center shrink-0 shadow-sm hover:shadow active:scale-[0.96] transition-all duration-200 ease-in-out cursor-pointer"
              >
                <Send className="w-4 h-4 text-white -ml-0.5" />
              </button>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
