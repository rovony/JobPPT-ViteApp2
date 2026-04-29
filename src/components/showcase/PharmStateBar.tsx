import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PharmStateBarProps {
  progressPercentage: number; // 0 to 100
}

export default function PharmStateBar({ progressPercentage }: PharmStateBarProps) {
  // Max values for each state group
  const maxVals = {
    context: 4,
    dataset: 6,
    nca: 7,
    model: 8,
    qc: 5,
    audit: 47
  };

  // Calculate current based on progress
  const current = {
    context: Math.min(maxVals.context, Math.floor((progressPercentage / 10) * maxVals.context)),
    dataset: Math.min(maxVals.dataset, Math.floor((progressPercentage / 25) * maxVals.dataset)),
    nca: Math.min(maxVals.nca, Math.floor((progressPercentage / 40) * maxVals.nca)),
    model: Math.min(maxVals.model, Math.floor((progressPercentage / 60) * maxVals.model)),
    qc: Math.min(maxVals.qc, Math.floor((progressPercentage / 80) * maxVals.qc)),
    audit: Math.min(maxVals.audit, Math.floor((progressPercentage / 100) * maxVals.audit))
  };

  return (
    <div className="w-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded p-3 flex flex-col gap-2">
      <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">
        PHARMSTATE · TYPED SHARED BUS
      </div>
      <div className="flex gap-2">
        <StatePill label="CONTEXT" current={current.context} total={maxVals.context} />
        <StatePill label="DATASET" current={current.dataset} total={maxVals.dataset} />
        <StatePill label="NCA" current={current.nca} total={maxVals.nca} />
        <StatePill label="MODEL" current={current.model} total={maxVals.model} />
        <StatePill label="QC" current={current.qc} total={maxVals.qc} />
        <StatePill label="AUDIT" current={current.audit} total={maxVals.audit} isAudit />
      </div>
    </div>
  );
}

function StatePill({ label, current, total, isAudit = false }: { label: string, current: number, total: number, isAudit?: boolean }) {
  const isComplete = current === total;
  const isStarted = current > 0;
  
  return (
    <div className={`px-3 py-1 rounded-full border text-[10px] deck-mono transition-colors duration-300 ${
      isComplete ? 'bg-[color:var(--case)]/20 border-[color:var(--case)] text-[color:var(--case)]' :
      isStarted ? 'bg-[color:var(--case-amber)]/10 border-[color:var(--case-amber)]/50 text-[color:var(--case-amber)]' :
      'bg-[color:var(--bg-deep)] border-[color:var(--cream-hairline)] text-[color:var(--cream-muted)]'
    }`}>
      {label} {isAudit ? current : `${current}/${total}`}
    </div>
  );
}
