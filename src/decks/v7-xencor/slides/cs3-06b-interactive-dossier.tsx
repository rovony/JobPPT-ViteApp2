import React from 'react';
import PharmAgentApp from '../components/pharmagent/pharmagent';

export default function CS3InteractiveDossier() {
  return (
    <div style={{ width: '100vw', height: '100dvh', overflow: 'hidden', backgroundColor: '#0c0a09' }}>
      <style>{`
        .emerald-glow { box-shadow: 0 0 0 1px rgba(52,211,153,0.35), 0 0 18px -2px rgba(16,185,129,0.45); }
        .rose-glow { box-shadow: 0 0 0 1px rgba(251,113,133,0.4), 0 0 18px -2px rgba(244,63,94,0.45); }
        .amber-glow { box-shadow: 0 0 0 1px rgba(251,191,36,0.4), 0 0 18px -2px rgba(245,158,11,0.4); }
        @keyframes typingDot { 0%,80%,100% { transform: translateY(0); opacity:0.4 } 40% { transform: translateY(-3px); opacity:1 } }
        .typing-dot { animation: typingDot 1.2s infinite; }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.55) } 70% { box-shadow: 0 0 0 8px rgba(52,211,153,0) } 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0) } }
        .pulse-ring { animation: pulseRing 1.6s ease-out infinite; }

        .pharmagent-slide {
          background:
            radial-gradient(circle at 18% 12%, rgba(16,185,129,0.13), transparent 28%),
            radial-gradient(circle at 82% 18%, rgba(20,184,166,0.10), transparent 32%),
            #0c0a09;
        }

        .pharmagent-wrapper {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
        }

        .pharmagent-shell {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
        }

        .pharmagent-main-grid {
          grid-template-columns: minmax(13rem, 15rem) minmax(0, 1fr) minmax(18rem, 22rem);
        }

        .pharmagent-evidence-grid {
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
        }

        .pharmagent-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(16,185,129,0.45) rgba(41,37,36,0.55);
        }

        .pharmagent-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .pharmagent-scrollbar::-webkit-scrollbar-track {
          background: rgba(41,37,36,0.55);
        }

        .pharmagent-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16,185,129,0.45);
          border-radius: 999px;
        }

        @media (max-width: 1120px) {
          .pharmagent-desktop-timeline {
            display: none;
          }

          .pharmagent-main-grid {
            grid-template-columns: minmax(0, 1fr) minmax(17rem, 21rem);
          }
        }

        @media (max-width: 860px) {
          .pharmagent-chat-rail {
            display: none;
          }

          .pharmagent-main-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .pharmagent-evidence-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
      <div className="pharmagent-slide pharmagent-wrapper">
        <PharmAgentApp />
      </div>
    </div>
  );
}
