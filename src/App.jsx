import React, { useState } from 'react';
import PhoneShell from './components/PhoneShell';
import Homescreen from './components/Homescreen';
import AiChat from './components/AiChat';
import Onboarding from './components/Onboarding';
import { Smartphone, Sparkles, Sliders, Target, CreditCard, Code, CheckCircle, Info } from 'lucide-react';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'financial-health' | 'recurring' | 'ask-ai'
  const [activeScenario, setActiveScenario] = useState('welcome'); // 'welcome', 'voice-typing', 'spendings-roast', 'savings-plan', 'set-goal'
  const [savingsPlan, setSavingsPlan] = useState('default'); // 'default', 'smart-saver', 'flexible'
  
  // Dynamic goals state
  const [goals, setGoals] = useState([
    {
      name: 'BMW 3 Series',
      timeLeft: '18 months left',
      saved: 900000,
      target: 1500000,
      color: 'blue',
      icon: 'Car'
    },
    {
      name: 'Thailand Trip',
      timeLeft: '08 months left',
      saved: 20000,
      target: 78000,
      color: 'orange',
      icon: 'Plane'
    },
    {
      name: 'Nike Dunk Low',
      timeLeft: '3 months left',
      saved: 4500,
      target: 12000,
      color: 'emerald',
      icon: 'ShoppingBag'
    }
  ]);

  // Toast notification state
  const [toast, setToast] = useState(null);
  const [showSplineEmbed, setShowSplineEmbed] = useState(false);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // Navigates and optionally sets the scenario
  const handleNavigate = (tab, scenario = null) => {
    setActiveTab(tab);
    if (scenario) {
      setActiveScenario(scenario);
    }
  };

  // Handles adding/updating goals from AI Assistant
  const handleAddGoal = (newGoal) => {
    // Check if goal with same name exists
    const exists = goals.some(g => g.name === newGoal.name);
    if (exists) {
      // Update/overwrite existing goal with AI-specified timeline and targets
      setGoals(goals.map(g => g.name === newGoal.name ? { ...g, ...newGoal } : g));
      showToast('BMW Goal updated to AI Recommendations! (32 Months, ₹12 Lakh Target)');
    } else {
      setGoals([newGoal, ...goals]);
      showToast('New Savings Goal added to Dashboard!');
    }
  };

  // Apply savings plan and update stats
  const handleSelectSavingsPlan = (plan) => {
    setSavingsPlan(plan);
    if (plan === 'smart-saver') {
      showToast('Smart Saver Plan applied! Budget reduced, savings rate increased.');
    } else if (plan === 'flexible') {
      showToast('Flexible Savings Plan applied! Savings target updated.');
    }
  };

  const isBmwGoalAdded = goals.some(g => g.name === 'BMW 3 Series');

  return (
    <div className="h-screen w-full bg-white flex justify-center items-center overflow-hidden text-ink">
      <div className="w-full max-w-[390px] h-full bg-white flex flex-col shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px] relative border-x border-hairline overflow-hidden">
        
        {/* Active Screen component */}
        {!isOnboarded && !showSplineEmbed ? (
          <Onboarding onComplete={() => setShowSplineEmbed(true)} />
        ) : showSplineEmbed && !isOnboarded ? (
          <div className="relative w-full h-full bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
            {/* Wrapper to trick Spline into rendering a wider canvas. Using 'zoom' instead of 'transform: scale' preserves pointer event coordinates in webkit. */}
            <div 
              style={{ 
                width: '1000px', 
                height: '2164px', 
                zoom: 0.39,
                position: 'absolute',
                top: 0,
                left: 0,
                transformOrigin: 'top left'
              }}
            >
              <iframe 
                src="https://my.spline.design/interactive3dparallaxscene-QxvE8HyFwxmLVxM4B1SCNGh4/" 
                frameBorder="0" 
                style={{ width: '100%', height: '100%' }}
                title="Interactive 3D Background"
              ></iframe>
            </div>
            
            {/* Floating Continue Button */}
            <div className="absolute bottom-10 left-0 w-full px-6 z-20 flex justify-center pointer-events-none">
              <button 
                onClick={() => { setShowSplineEmbed(false); setIsOnboarded(true); setActiveTab('home'); }}
                className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[15px] font-semibold py-3.5 px-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/20 transition-all duration-300 active:scale-95"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        ) : activeTab === 'ask-ai' ? (
          <AiChat 
            onBack={() => setActiveTab('home')} 
            activeScenario={activeScenario}
            setActiveScenario={setActiveScenario}
            savingsPlan={savingsPlan}
            setSavingsPlan={handleSelectSavingsPlan}
            onAddGoal={handleAddGoal}
            goals={goals}
          />
        ) : (
          <Homescreen 
            onNavigate={handleNavigate} 
            activeTab={activeTab} 
            goals={goals}
            savingsPlan={savingsPlan}
          />
        )}

        {/* Visual Floating Toast Inside Phone Screen */}
        {toast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white border border-slate-800 text-[11px] font-semibold py-2.5 px-4 rounded-xl shadow-lg z-50 flex items-center space-x-2 animate-bounce w-[85%] max-w-[320px]">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

      </div>
    </div>
  );
}
