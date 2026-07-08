import React, { useState, useEffect } from 'react';

export default function PhoneShell({ children }) {
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Dynamic Ambient Glow behind the phone */}
      <div className="absolute -inset-10 bg-brand-blue/10 rounded-[60px] blur-3xl opacity-30 animate-pulse-slow"></div>

      {/* Phone Case outer frame */}
      <div className="relative w-[420px] h-[880px] bg-slate-900 rounded-[56px] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_4px_rgba(255,255,255,0.05),0_0_0_1px_rgba(255,255,255,0.1),inset_0_2px_4px_rgba(255,255,255,0.2)] flex flex-col overflow-hidden border border-slate-800">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-[26px] left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-full z-50 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
          <div className="w-[12px] h-[12px] bg-slate-900 rounded-full border border-slate-800 ml-auto mr-3"></div>
        </div>

        {/* Speaker line */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[60px] h-[4px] bg-slate-800 rounded-full z-50"></div>

        {/* Screen inner container */}
        <div className="relative flex-1 w-full bg-brand-bg rounded-[42px] overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-[3px] border-black">
          
          {/* Status Bar */}
          <div className="absolute top-0 left-0 w-full h-[54px] px-6 flex items-center justify-between text-black font-semibold text-[13px] z-40 bg-transparent">
            {/* Left side: Time */}
            <div className="flex items-center space-x-1">
              <span className="font-['Inter'] font-semibold tracking-tight text-[14px]">{currentTime}</span>
            </div>
            
            {/* Right side: Status icons */}
            <div className="flex items-center space-x-1.5 pt-0.5">
              {/* Cellular Connection */}
              <svg width="17" height="11" viewBox="0 0 17 11" fill="none" className="opacity-80">
                <rect x="0.5" y="8" width="2.5" height="2.5" rx="0.5" fill="black" />
                <rect x="4.5" y="6" width="2.5" height="4.5" rx="0.5" fill="black" />
                <rect x="8.5" y="4" width="2.5" height="6.5" rx="0.5" fill="black" />
                <rect x="12.5" y="1" width="2.5" height="9.5" rx="0.5" fill="black" />
              </svg>

              {/* Wifi Icon */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none" className="opacity-80">
                <path d="M7.5 10.5C8.05228 10.5 8.5 10.0523 8.5 9.5C8.5 8.94772 8.05228 8.5 7.5 8.5C6.94772 8.5 6.5 8.94772 6.5 9.5C6.5 10.0523 6.94772 10.5 7.5 10.5Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 6C5.567 6 3.8 6.7835 2.53553 8.04797L3.94975 9.46218C4.85736 8.55457 6.11736 8 7.5 8C8.88264 8 10.1426 8.55457 11.0503 9.46218L12.4645 8.04797C11.2 6.7835 9.433 6 7.5 6Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 3C4.46243 3 1.77665 4.2343 0.228149 6.22384L1.79255 7.44474C2.97746 5.92248 5.03264 5 7.5 5C9.96736 5 12.0225 5.92248 13.2075 7.44474C14.7719 6.22384C13.2234 4.2343 10.5376 3 7.5 3Z" fill="black" />
              </svg>

              {/* Battery Indicator */}
              <div className="relative w-[22px] h-[11px] border border-black/35 rounded-[3px] flex items-center p-[1px]">
                <div className="bg-black h-full w-[85%] rounded-[1.5px]"></div>
                <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-black/45 rounded-r-[1px]" />
              </div>
            </div>
          </div>

          {/* App Screen Content */}
          <div className="flex-1 w-full h-full pt-[54px] pb-[24px] overflow-y-auto flex flex-col bg-brand-bg select-text">
            {children}
          </div>

          {/* Home Indicator Bottom Area */}
          <div className="absolute bottom-0 left-0 w-full h-[24px] z-40 bg-transparent flex items-center justify-center pointer-events-none">
            <div className="w-[120px] h-[5px] bg-black rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.1)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
