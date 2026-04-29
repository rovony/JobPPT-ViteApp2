import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { MessageSquareText, User } from 'lucide-react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const NODES = [
  { id: 'h_req', label: 'ANALYST', sub: 'Human-in-the-loop', cx: 16, cy: 15, tone: 'var(--coral)', level: -1, w: 12, h: 10, icon: User },
  { id: 'l0_sup', label: 'SUPERVISOR', sub: 'Classifies · Routes', cx: 42, cy: 15, tone: 'var(--sage)', level: 0, w: 14, h: 10 },

  // L1 - Row A
  { id: 'l1_data', label: 'Data Mgr', sub: 'profiling', cx: 14, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_nca', label: 'NCA', sub: 'AUC · Cmax', cx: 28, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_pbpk', label: 'PBPK', sub: 'whole-body', cx: 42, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_stat', label: 'Statistical', sub: 'XGBoost', cx: 56, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_sim', label: 'Simulator', sub: 'Monte Carlo', cx: 70, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },

  // L1 - Row B
  { id: 'l1_qc', label: 'QC Agent', sub: 'diagnostics', cx: 14, cy: 58, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_rep', label: 'Report', sub: 'FDA docs', cx: 28, cy: 58, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_mod', label: 'Model Mgr', sub: 'Routes to L2', cx: 42, cy: 58, tone: 'var(--amber)', level: 1, w: 11, h: 9, glow: true },
  { id: 'l1_reg', label: 'Reg Intel', sub: 'guidances', cx: 56, cy: 58, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_gen', label: 'General', sub: 'education', cx: 70, cy: 58, tone: 'var(--cream)', level: 1, w: 11, h: 9 },

  // L2
  { id: 'l2_pop', label: 'PopPK Expert', sub: 'structural', cx: 24, cy: 86, tone: 'var(--amber)', level: 2, w: 14, h: 10 },
  { id: 'l2_pkpd', label: 'PKPD Expert', sub: 'Emax · TGI', cx: 42, cy: 86, tone: 'var(--amber)', level: 2, w: 14, h: 10 },
  { id: 'l2_er', label: 'E-R Expert', sub: 'survival', cx: 60, cy: 86, tone: 'var(--amber)', level: 2, w: 14, h: 10 },
];

const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]));

const ORCH_LINKS = NODES.filter(n => n.level === 1).map(n => ({ from: NODE_MAP.l0_sup, to: n, color: 'var(--sage)' }));
const SPEC_LINKS = NODES.filter(n => n.level === 2).map(n => ({ from: NODE_MAP.l1_mod, to: n, color: 'var(--amber)' }));
const ALL_LINKS = [{ from: NODE_MAP.h_req, to: NODE_MAP.l0_sup, color: 'var(--coral)' }, ...ORCH_LINKS, ...SPEC_LINKS];

const DECISIONS = [
  { kicker: 'Why Centralized', title: 'Multi-agent error limits', body: 'Independent systems amplify errors 17.2×. Centralized contains it to 4.4× (Kim et al. 2025).', tone: 'var(--sage)' },
  { kicker: 'Why Three Levels', title: 'Modeler depth boundary', body: 'Level 1 manages data and reporting. Level 2 (PopPK, PKPD) protects deep mathematical reasoning.', tone: 'var(--amber)' },
  { kicker: 'Why Heterogeneous', title: 'Sonnet routes, Opus reasons', body: 'Matches Anthropic\'s empirically optimal vendor profile: small orchestrator + highly capable specialist workers.', tone: 'var(--cyan)' },
];
