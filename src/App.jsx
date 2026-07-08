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
    <div className="h-screen w-full bg-[#FAF8F8] flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-[390px] h-full bg-[#FAF8F8] flex flex-col shadow-2xl relative border-x border-slate-100 overflow-hidden">
        
        {/* Active Screen component */}
        {!isOnboarded ? (
          <Onboarding onComplete={() => { setIsOnboarded(true); setActiveTab('home'); }} />
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
