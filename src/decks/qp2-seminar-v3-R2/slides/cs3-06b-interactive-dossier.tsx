import React from 'react';
import PharmAgentApp from '../components/pharmagent/pharmagent';

export default function CS3InteractiveDossier() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#0c0a09' }}>
      <style>{`
        .emerald-glow { box-shadow: 0 0 0 1px rgba(52,211,153,0.35), 0 0 18px -2px rgba(16,185,129,0.45); }
        .rose-glow { box-shadow: 0 0 0 1px rgba(251,113,133,0.4), 0 0 18px -2px rgba(244,63,94,0.45); }
        .amber-glow { box-shadow: 0 0 0 1px rgba(251,191,36,0.4), 0 0 18px -2px rgba(245,158,11,0.4); }
        @keyframes typingDot { 0%,80%,100% { transform: translateY(0); opacity:0.4 } 40% { transform: translateY(-3px); opacity:1 } }
        .typing-dot { animation: typingDot 1.2s infinite; }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.55) } 70% { box-shadow: 0 0 0 8px rgba(52,211,153,0) } 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0) } }
        .pulse-ring { animation: pulseRing 1.6s ease-out infinite; }
        
        /* Ensure the app scales nicely if the screen is too small */
        .pharmagent-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .pharmagent-scale {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="pharmagent-wrapper">
        <div className="pharmagent-scale">
          <PharmAgentApp />
        </div>
      </div>
    </div>
  );
}
