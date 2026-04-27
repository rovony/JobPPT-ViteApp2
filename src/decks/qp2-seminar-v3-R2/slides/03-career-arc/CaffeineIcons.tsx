import React from 'react';
import { motion } from 'framer-motion';

const EASE = 'linear';

function Steam({ width = 40, height = 60, delay = 0 }) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 40 60"
      style={{ position: 'absolute', top: -height + 10, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0, 0.6, 0], y: -20 }}
      transition={{ duration: 3, ease: EASE, delay, repeat: Infinity }}
    >
      <path d="M10,60 Q20,45 10,30 T10,0" fill="none" stroke="var(--cream-muted)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <path d="M25,55 Q35,40 25,25 T25,-5" fill="none" stroke="var(--cream-muted)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M18,65 Q28,50 18,35 T18,5" fill="none" stroke="var(--cream-muted)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </motion.svg>
  );
}

export function SmallCoffee({ reduced }) {
  return (
    <div style={{ position: 'relative', width: 80, height: 60, margin: '0 auto' }}>
      {!reduced && <Steam delay={0} />}
      <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Saucer */}
        <ellipse cx="50" cy="70" rx="45" ry="10" fill="color-mix(in srgb, var(--coral) 30%, var(--bg))" />
        <ellipse cx="50" cy="68" rx="35" ry="7" fill="var(--bg)" />
        {/* Cup */}
        <path d="M15,20 L85,20 L75,65 Q70,75 50,75 Q30,75 25,65 Z" fill="var(--coral)" />
        <path d="M15,20 L85,20 L75,65 Q70,75 50,75 Q30,75 25,65 Z" fill="url(#cup-grad)" opacity="0.3" />
        {/* Rim */}
        <ellipse cx="50" cy="20" rx="35" ry="6" fill="var(--coral)" />
        <ellipse cx="50" cy="20" rx="32" ry="4" fill="color-mix(in srgb, var(--bg) 80%, var(--coral))" />
        {/* Handle */}
        <path d="M18,30 C5,30 0,45 12,55" fill="none" stroke="var(--coral)" strokeWidth="6" strokeLinecap="round" />
        {/* Coffee Bean Logo */}
        <ellipse cx="50" cy="45" rx="5" ry="8" fill="var(--bg)" opacity="0.5" transform="rotate(15 50 45)" />
        <path d="M48,38 Q52,45 48,52" fill="none" stroke="var(--coral)" strokeWidth="1.5" />
        
        <defs>
          <linearGradient id="cup-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function TallCoffee({ reduced }) {
  return (
    <div style={{ position: 'relative', width: 90, height: 120, margin: '0 auto' }}>
      {!reduced && <Steam delay={1} height={80} />}
      <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Cup Body */}
        <path d="M20,20 L80,20 L70,130 Q68,140 50,140 Q32,140 30,130 Z" fill="color-mix(in srgb, var(--cyan) 60%, var(--panel))" />
        <path d="M20,20 L80,20 L70,130 Q68,140 50,140 Q32,140 30,130 Z" fill="url(#tall-grad)" opacity="0.2" />
        {/* Sleeve */}
        <path d="M23,60 L77,60 L73,100 L27,100 Z" fill="var(--amber)" opacity="0.8" />
        {/* Lid */}
        <rect x="15" y="10" width="70" height="10" rx="5" fill="var(--cream-muted)" />
        <rect x="25" y="0" width="50" height="10" rx="3" fill="var(--cream-muted)" />
        {/* Coffee Bean Logo on Sleeve */}
        <ellipse cx="50" cy="80" rx="8" ry="12" fill="var(--bg)" opacity="0.7" transform="rotate(-15 50 80)" />
        <path d="M47,69 Q54,80 49,90" fill="none" stroke="var(--amber)" strokeWidth="2" />

        <defs>
          <linearGradient id="tall-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function Thermos({ reduced }) {
  return (
    <div style={{ position: 'relative', width: 100, height: 160, margin: '0 auto' }}>
      {!reduced && <Steam delay={2} height={100} />}
      <svg viewBox="0 0 120 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Handle */}
        <path d="M90,50 L110,50 L110,110 L95,110" fill="none" stroke="var(--violet)" strokeWidth="8" strokeLinejoin="round" />
        {/* Thermos Body */}
        <path d="M25,30 L95,30 L85,170 Q83,180 60,180 Q37,180 35,170 Z" fill="var(--violet)" />
        <path d="M25,30 L95,30 L85,170 Q83,180 60,180 Q37,180 35,170 Z" fill="url(#thermos-grad)" opacity="0.3" />
        {/* Lid */}
        <rect x="20" y="15" width="80" height="15" rx="2" fill="var(--panel)" stroke="var(--cream-hairline)" />
        <path d="M35,15 L40,0 L80,0 L85,15 Z" fill="var(--panel)" stroke="var(--cream-hairline)" />
        {/* Merck Logo */}
        <text x="60" y="100" textAnchor="middle" fontFamily="var(--font-display)" fontSize="18" fontWeight="800" fill="var(--bg)" letterSpacing="1">MERCK</text>

        <defs>
          <linearGradient id="thermos-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function EspressoMachine({ reduced }) {
  return (
    <div style={{ position: 'relative', width: 160, height: 180, margin: '0 auto' }}>
      <svg viewBox="0 0 200 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Base */}
        <rect x="20" y="190" width="160" height="20" rx="4" fill="var(--panel)" stroke="var(--cream-hairline)" />
        <rect x="30" y="210" width="10" height="10" rx="2" fill="var(--panel)" />
        <rect x="160" y="210" width="10" height="10" rx="2" fill="var(--panel)" />
        {/* Main Body */}
        <path d="M30,80 L170,80 L170,190 L30,190 Z" fill="color-mix(in srgb, var(--cyan) 30%, var(--bg))" stroke="var(--cyan)" strokeWidth="2" />
        {/* Top Control Panel */}
        <path d="M20,60 L180,60 L170,80 L30,80 Z" fill="var(--panel)" stroke="var(--cream-hairline)" strokeWidth="2" />
        {/* Bean Hopper */}
        <path d="M70,20 L130,20 L120,60 L80,60 Z" fill="color-mix(in srgb, var(--amber) 40%, var(--bg))" stroke="var(--amber)" strokeWidth="2" />
        <rect x="60" y="10" width="80" height="10" rx="5" fill="var(--panel)" stroke="var(--cream-hairline)" strokeWidth="2" />
        {/* Dials */}
        <circle cx="50" cy="70" r="6" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="2" />
        <circle cx="75" cy="70" r="6" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="2" />
        <circle cx="100" cy="70" r="6" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="2" />
        {/* Brew Group */}
        <rect x="80" y="80" width="40" height="30" fill="var(--panel)" stroke="var(--cream-hairline)" strokeWidth="2" />
        <rect x="85" y="110" width="30" height="15" rx="2" fill="var(--panel)" stroke="var(--cream-hairline)" strokeWidth="2" />
        {/* Portafilter handle */}
        <path d="M115,117 L140,125" stroke="var(--panel)" strokeWidth="6" strokeLinecap="round" />
        {/* Steam Wand */}
        <path d="M150,80 L155,140 Q155,145 150,150" fill="none" stroke="var(--cream-muted)" strokeWidth="4" strokeLinecap="round" />
        {/* Drip Tray */}
        <rect x="35" y="180" width="130" height="10" fill="var(--bg)" stroke="var(--cream-hairline)" />
        {/* Espresso Cup */}
        <path d="M90,165 L110,165 L105,180 Q100,185 95,180 Z" fill="var(--cream)" />
        <path d="M110,170 C115,170 115,175 110,175" fill="none" stroke="var(--cream)" strokeWidth="2" strokeLinecap="round" />
        
        {/* Drip Animation */}
        {!reduced && (
          <motion.circle cx="100" cy="130" r="1.5" fill="var(--amber)"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 35, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn' }}
          />
        )}
      </svg>
    </div>
  );
}

export function IVBag({ reduced }) {
  return (
    <div style={{ position: 'relative', width: 140, height: 260, margin: '0 auto' }}>
      <svg viewBox="0 0 160 300" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* IV Pole */}
        <rect x="130" y="0" width="6" height="300" fill="var(--cream-muted)" />
        <path d="M133,20 L100,20 L100,30" fill="none" stroke="var(--cream-muted)" strokeWidth="4" />
        <path d="M133,20 L150,20 L150,30" fill="none" stroke="var(--cream-muted)" strokeWidth="4" />
        <circle cx="100" cy="35" r="5" fill="none" stroke="var(--cream-muted)" strokeWidth="3" />
        
        {/* Tubing from bag to pump */}
        <path d="M100,150 L100,200 L130,200" fill="none" stroke="var(--amber)" strokeWidth="3" opacity="0.6" />
        {/* Tubing out of pump to patient */}
        <path d="M130,250 L100,250 L100,300" fill="none" stroke="var(--amber)" strokeWidth="3" strokeDasharray="5,5" opacity="0.6" />
        
        {/* IV Bag */}
        <rect x="70" y="45" width="60" height="80" rx="10" fill="color-mix(in srgb, var(--amber) 40%, var(--bg))" stroke="var(--amber)" strokeWidth="2" />
        {/* Liquid level */}
        <path d="M70,65 L130,65 L130,115 Q130,125 120,125 L80,125 Q70,125 70,115 Z" fill="color-mix(in srgb, var(--amber) 80%, var(--bg))" opacity="0.7" />
        {/* Formula Label */}
        <rect x="75" y="75" width="50" height="20" rx="2" fill="var(--bg)" opacity="0.9" />
        <text x="100" y="89" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="var(--cream)">C₈H₁₀N₄O₂</text>
        
        {/* Drip Chamber */}
        <rect x="95" y="125" width="10" height="20" rx="3" fill="var(--bg)" stroke="var(--cream-hairline)" />
        {!reduced && (
          <motion.circle cx="100" cy="130" r="2" fill="var(--amber)"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 12, opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeIn' }}
          />
        )}

        {/* Infusion Pump */}
        <rect x="115" y="190" width="36" height="60" rx="4" fill="var(--amber)" stroke="color-mix(in srgb, var(--amber) 60%, var(--bg))" strokeWidth="2" />
        <rect x="120" y="195" width="26" height="15" rx="2" fill="var(--bg)" />
        <text x="133" y="206" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="var(--amber)">PK</text>
        {/* Pump buttons */}
        <rect x="120" y="220" width="6" height="6" rx="1" fill="var(--bg)" opacity="0.8" />
        <rect x="130" y="220" width="6" height="6" rx="1" fill="var(--bg)" opacity="0.8" />
        <rect x="140" y="220" width="6" height="6" rx="1" fill="var(--bg)" opacity="0.8" />
        <rect x="120" y="232" width="6" height="6" rx="1" fill="var(--bg)" opacity="0.8" />
        <rect x="130" y="232" width="6" height="6" rx="1" fill="var(--bg)" opacity="0.8" />
        <rect x="140" y="232" width="6" height="6" rx="1" fill="var(--bg)" opacity="0.8" />
      </svg>
    </div>
  );
}
