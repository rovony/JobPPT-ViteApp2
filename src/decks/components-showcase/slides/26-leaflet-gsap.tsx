// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'leaflet/dist/leaflet.css';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

const SITES = [
  { city: 'Mumbai',   pos: [19.07, 72.87], status: 'CDSCO 2024' },
  { city: 'Delhi',    pos: [28.61, 77.20], status: 'CDSCO 2024' },
  { city: 'Bangalore',pos: [12.97, 77.59], status: 'CDSCO 2024' },
  { city: 'Hyderabad',pos: [17.39, 78.49], status: 'CDSCO 2024' },
  { city: 'Chennai',  pos: [13.08, 80.27], status: 'CDSCO 2024' },
];

export default function LeafletGsapShowcase() {
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.fromTo(counterRef.current,
      { textContent: 0 },
      {
        textContent: 32,
        duration: 1.6,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate() { if (counterRef.current) counterRef.current.textContent = Math.round(this.targets()[0].textContent).toString(); },
      });
  }, []);

  return (
    <LibraryShowcase
      category="§6 / §5A · Real maps + timeline animation"
      library="react-leaflet + gsap"
      npmInstall="npm install react-leaflet leaflet gsap @gsap/react"
      url="react-leaflet.js.org · gsap.com"
      headline={<>Real interactive maps + <span style={{ color: 'var(--violet)', fontStyle: 'italic' }}>GSAP timelines</span>.</>}
      subhead="Leaflet for live tile-based maps. GSAP for SplitText, MorphSVG, and number tweens that Motion's variants can't express elegantly."
      tone="var(--violet)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Leaflet trial sites" tone="var(--violet)">
          <div style={{ flex: 1, minHeight: 0, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
            <MapContainer center={[20.59, 78.96]} zoom={4} scrollWheelZoom={false} style={{ width: '100%', height: '100%', background: 'var(--panel)' }}>
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {SITES.map((s) => (
                <CircleMarker key={s.city} center={s.pos as any} radius={8} pathOptions={{ color: '#A38BC4', fillColor: '#A38BC4', fillOpacity: 0.6 }}>
                  <Popup>{s.city} · {s.status}</Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </Frame>

        <Frame title="Variant B · GSAP number tween" tone="var(--cyan)">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cyan)', letterSpacing: 'var(--ls-mono-wide)' }}>
              Investigator sites — phase 3
            </div>
            <div className="deck-display" style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)', fontWeight: 700, color: 'var(--cyan)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              <span ref={counterRef}>0</span>
            </div>
            <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginTop: 8, textAlign: 'center', maxWidth: '28ch' }}>
              GSAP timeline with snap-to-int and power2 ease — smoother than Motion for pure number scrubs
            </div>
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
