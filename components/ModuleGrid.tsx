"use client";

import React, { useState, useMemo } from "react";
import { Box, Zap, Anchor, Shield, Cpu } from "lucide-react";

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  mass: number;
  power: number;
  color: string;
}

const AVAILABLE_MODULES: Module[] = [
  { id: "core", name: "AI Core", icon: <Cpu size={18} />, mass: 10, power: 50, color: "text-blue-400" },
  { id: "engine", name: "Plasma Drive", icon: <Zap size={18} />, mass: 40, power: 80, color: "text-emerald-400" },
  { id: "armor", name: "Plating", icon: <Shield size={18} />, mass: 60, power: -5, color: "text-zinc-400" },
  { id: "stabilizer", name: "Gyro", icon: <Anchor size={18} />, mass: 15, power: 10, color: "text-purple-400" },
];

export default function ModuleGrid() {
  const [grid, setGrid] = useState<(string | null)[]>(Array(12).fill(null));
  // Track which module is currently selected on the left
  const [activeTool, setActiveTool] = useState<string>("engine");

  const stats = useMemo(() => {
    return grid.reduce(
      (acc, id) => {
        const mod = AVAILABLE_MODULES.find((m) => m.id === id);
        if (mod) {
          acc.mass += mod.mass;
          acc.power += mod.power;
        }
        return acc;
      },
      { mass: 0, power: 0 }
    );
  }, [grid]);

  const handleGridClick = (index: number) => {
    const newGrid = [...grid];
    // If the slot already has the active tool, remove it (toggle off)
    // Otherwise, install the active tool
    newGrid[index] = newGrid[index] === activeTool ? null : activeTool;
    setGrid(newGrid);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-zinc-950 border border-white/5 rounded-2xl p-8 shadow-2xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Physics_Module_Lab</h3>
          <p className="text-zinc-500 text-xs font-mono">SOCKET_INTEGRITY: OPTIMAL</p>
        </div>
        <div className="flex gap-6 font-mono text-right">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase">Mass_Index</div>
            <div className="text-xl text-white">{stats.mass}kg</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase">Energy_Output</div>
            <div className="text-xl text-emerald-400">{stats.power}kW</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Module Picker - NOW INTERACTIVE */}
        <div className="flex md:flex-col gap-2" role="group" aria-label="Module selection tools">
          {AVAILABLE_MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveTool(mod.id)}
              aria-pressed={activeTool === mod.id}
              aria-label={`Select ${mod.name} module`}
              className={`flex-1 p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none ${
                activeTool === mod.id 
                ? "bg-white/10 border-white/20 ring-1 ring-white/10" 
                : "bg-white/5 border-transparent hover:border-white/10"
              }`}
            >
              <div className={mod.color}>{mod.icon}</div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold">{mod.name}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-3 grid grid-cols-4 gap-2 bg-black/50 p-4 rounded-xl border border-white/5" role="group" aria-label="Physics socket grid">
          {grid.map((slot, i) => {
            const activeMod = AVAILABLE_MODULES.find((m) => m.id === slot);
            const currentSelectedTool = AVAILABLE_MODULES.find((m) => m.id === activeTool);
            return (
              <button
                key={i}
                onClick={() => handleGridClick(i)}
                aria-label={`Socket ${i + 1}: ${
                  activeMod
                    ? `${activeMod.name} installed. Click to remove.`
                    : `Empty slot. Click to install ${currentSelectedTool?.name || 'selected module'}.`
                }`}
                className={`aspect-square rounded-lg border flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                  activeMod 
                    ? `bg-emerald-500/10 border-emerald-500/50 ${activeMod.color}` 
                    : "bg-zinc-900/30 border-white/5 hover:border-white/20 text-zinc-800"
                }`}
              >
                {activeMod ? activeMod.icon : <Box size={14} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
