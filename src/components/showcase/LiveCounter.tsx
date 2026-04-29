import React, { useEffect, useState } from 'react';

interface LiveCounterProps {
  initialValue: number;
  intervalMs?: number;
  className?: string;
  isActive?: boolean;
}

export default function LiveCounter({ initialValue, intervalMs = 4000, className = "", isActive = true }: LiveCounterProps) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, isActive]);

  return <span className={className}>{count}</span>;
}
