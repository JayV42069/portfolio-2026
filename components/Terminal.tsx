"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";

const COMMANDS: Record<string, string> = {
  help: "Available commands: skills, stack, experience, projects, contact, clear",
  skills: "Frontend: Next.js (App Router), TypeScript, Tailwind CSS, State Propagation. Systems: Godot 4 (3D GDScript), Python, Order Flow Logic.",
  stack: "Current Local Dev Environment: Bun runtime, Turbopack, Git, Windows 11 Power Shell.",
  experience: "System Integrator & Frontend Developer. Specialized in modular state management and building real-time interface tools for complex workflows.",
  projects: "1. DriveThrive: A 3D vehicle physics engine built in Godot 4 featuring modular component durability and structural grid mechanics. 2. DeepchartsPro 3.0: Spearheaded surgical architecture migration to version 3.0 utilizing the Strangler Fig Pattern to smoothly phase out legacy dependencies.",
  contact: "Email: jaydeevntr@gmail.com | GitHub: https://github.com/JayV42069",
};

export default function Terminal() {
  const [history, setHistory] = useState<string[]>(["Welcome to Jay-Dee OS v2.0.0", "Type 'help' to begin..."]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    
    if (input.trim()) {
      setCmdHistory((prev) => [...prev, input]);
    }
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setHistory([]);
    } else if (COMMANDS[cmd]) {
      setHistory([...history, `> ${input}`, COMMANDS[cmd]]);
    } else if (cmd !== "") {
      setHistory([...history, `> ${input}`, `Command not found: ${cmd}. Type 'help' for options.`]);
    }
    
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(cmdHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex] || "");
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-black border border-white/10 rounded-lg overflow-hidden shadow-2xl font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-zinc-900/50 px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-zinc-500" />
          <span className="text-zinc-400 text-xs uppercase tracking-widest">System_Console</span>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="h-64 overflow-y-auto p-4 bg-black/80 backdrop-blur-sm space-y-1 custom-scrollbar focus-within:ring-1 focus-within:ring-emerald-500/40"
      >
        {history.map((line, i) => (
          <div key={i} className={line.startsWith(">") ? "text-emerald-500" : "text-zinc-300"}>
            {line}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center">
          <ChevronRight size={14} className="text-emerald-500 mr-1 shrink-0" aria-hidden="true" />
          <input
            autoFocus
            aria-label="Terminal command prompt"
            placeholder="Type a command (e.g. 'help')..."
            className="flex-1 bg-transparent border-none outline-none text-emerald-400 caret-emerald-500 placeholder:text-zinc-600 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>
    </div>
  );
}
