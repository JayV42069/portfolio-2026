"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";

interface PriceData {
  time: number;
  price: number;
}

export default function TradingChart() {
  const maxDataPoints = 40;
  const currentPriceRef = useRef<number>(65000);

  const [data, setData] = useState<PriceData[]>(() => {
    const initialData: PriceData[] = [];
    let basePrice = 65000;
    for (let i = maxDataPoints; i > 0; i--) {
      basePrice += (Math.random() - 0.5) * 150;
      initialData.push({ time: Date.now() - i * 1000, price: basePrice });
    }
    return initialData;
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [leverage, setLeverage] = useState(20);
  const [position, setPosition] = useState<{ entry: number; type: "LONG" | "SHORT" } | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setData((prev) => {
        // High-frequency tick simulation
        const volatility = 120; 
        const change = (Math.random() - 0.49) * volatility; // Slight upward bias
        const nextPrice = Math.max(1000, currentPriceRef.current + change);
        currentPriceRef.current = nextPrice;

        const newData = [...prev, { time: Date.now(), price: nextPrice }];
        if (newData.length > maxDataPoints) newData.shift();
        return newData;
      });
    }, 400); // 400ms High-Frequency Ticks

    return () => clearInterval(interval);
  }, [isPlaying]);

  const closePosition = () => {
    setPosition(null);
  };

  const currentPriceForPnl = data.length > 0 ? data[data.length - 1].price : 65000;
  const pnl = position
    ? ((currentPriceForPnl - position.entry) / position.entry) * leverage * 100 * (position.type === "LONG" ? 1 : -1)
    : 0;

  if (data.length === 0) return <div className="text-white">Initializing Engine...</div>;

  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.9995;
  const maxPrice = Math.max(...prices) * 1.0005;
  const currentPrice = prices[prices.length - 1];
  const previousPrice = prices[prices.length - 2] || currentPrice;
  const isPriceUp = currentPrice >= previousPrice;

  // 3. Mathematical Coordinate Mapping System
  const svgWidth = 600;
  const svgHeight = 250;
  const padding = 20;
  
  const points = data.map((d, index) => {
    const x = padding + (index / (data.length - 1)) * (svgWidth - padding * 2);
    // Inverse Y because SVG 0,0 is top-left
    const y = svgHeight - padding - ((d.price - minPrice) / (maxPrice - minPrice)) * (svgHeight - padding * 2);
    return `${x},${y}`;
  }).join(" ");

  // Generate Area Fill Path
  const firstPointX = padding;
  const lastPointX = svgWidth - padding;
  const bottomY = svgHeight - padding;
  const areaPoints = `${firstPointX},${bottomY} ${points} ${lastPointX},${bottomY}`;

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-2xl">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">ENG-FEED v1.0</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h3 className="text-2xl font-mono font-bold text-white mt-1">
            BTCUSD: <span className={isPriceUp ? "text-emerald-400" : "text-rose-400"}>${currentPrice.toFixed(2)}</span>
          </h3>
        </div>

        {/* Real-Time Interaction Desk */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause price stream" : "Start price stream"}
            className="p-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button 
            onClick={() => {
              setPosition(null);
              currentPriceRef.current = 65000;
            }}
            aria-label="Reset price feed and clear position"
            className="p-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* SVG Performance Chart Rendering Core */}
      <div className="relative bg-black/40 border border-white/5 rounded-lg p-2 overflow-hidden">
        <svg
          role="img"
          aria-label="BTCUSD live price chart"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPriceUp ? "#10b981" : "#f43f5e"} stopOpacity="0.25" />
              <stop offset="100%" stopColor={isPriceUp ? "#10b981" : "#f43f5e"} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Dynamic Background Grid Lines */}
          {[0, 1, 2, 3].map((i) => {
            const yPos = padding + (i / 3) * (svgHeight - padding * 2);
            return (
              <line 
                key={i} x1={padding} y1={yPos} x2={svgWidth - padding} y2={yPos} 
                stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" 
              />
            );
          })}

          {/* Area Fill */}
          <polygon points={areaPoints} fill="url(#chartGradient)" />

          {/* Main Ticker Stroke Line */}
          <polyline
            fill="none"
            stroke={isPriceUp ? "#10b981" : "#f43f5e"}
            strokeWidth="2"
            points={points}
            className="transition-all duration-300 ease-out"
          />

          {/* Active Order Line Visualization */}
          {position && (
            <line 
              x1={padding} 
              y1={svgHeight - padding - ((position.entry - minPrice) / (maxPrice - minPrice)) * (svgHeight - padding * 2)}
              x2={svgWidth - padding}
              y2={svgHeight - padding - ((position.entry - minPrice) / (maxPrice - minPrice)) * (svgHeight - padding * 2)}
              stroke={position.type === "LONG" ? "rgba(16,185,129,0.4)" : "rgba(244,63,94,0.4)"}
              strokeWidth="1"
              strokeDasharray="6 3"
            />
          )}

          {/* Dynamic Real-time Reticle Head */}
          <circle
            cx={svgWidth - padding}
            cy={svgHeight - padding - ((currentPrice - minPrice) / (maxPrice - minPrice)) * (svgHeight - padding * 2)}
            r="4"
            fill={isPriceUp ? "#10b981" : "#f43f5e"}
          />
        </svg>

        {/* Floating Position Execution Tags */}
        {position && (
          <div className={`absolute top-4 right-4 text-xs font-mono px-3 py-1.5 rounded border ${
            pnl >= 0 ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30" : "bg-rose-950/80 text-rose-400 border-rose-500/30"
          }`}>
            {position.type} @ ${position.entry.toFixed(0)} | PnL: {pnl >= 0 ? "+" : ""}{pnl.toFixed(1)}%
          </div>
        )}
      </div>

      {/* Interactive Desk Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5 font-mono text-xs">
        {/* Risk / Leverage Slider Block */}
        <div className="flex flex-col justify-center bg-zinc-900/50 border border-white/5 rounded-lg p-3">
          <div className="flex justify-between text-zinc-400 mb-2">
            <span>RISK ENGINE LEVERAGE</span>
            <span className="text-white font-bold">{leverage}x</span>
          </div>
          <input 
            type="range" min="1" max="100" value={leverage} 
            onChange={(e) => setLeverage(Number(e.target.value))}
            aria-label="Risk engine leverage multiplier"
            className="w-full accent-white bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Live Execution Desk Trigger Hooks */}
        <div className="flex gap-2">
          {!position ? (
            <>
              <button
                onClick={() => setPosition({ entry: currentPrice, type: "LONG" })}
                className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/20 rounded-lg py-3 transition-all"
              >
                <TrendingUp size={14} /> INSTANT LONG
              </button>
              <button
                onClick={() => setPosition({ entry: currentPrice, type: "SHORT" })}
                className="flex-1 flex items-center justify-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold border border-rose-500/20 rounded-lg py-3 transition-all"
              >
                <TrendingDown size={14} /> INSTANT SHORT
              </button>
            </>
          ) : (
            <button
              onClick={closePosition}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 rounded-lg py-3 transition-all animate-in fade-in zoom-in duration-200"
            >
              <RefreshCw size={14} className={isPlaying ? "animate-spin-slow" : ""} /> 
              CLOSE POSITION (EXIT AT ${currentPrice.toFixed(2)})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
