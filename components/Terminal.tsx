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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const runCommand = (raw: string) => {
    const cmd = raw.toLowerCase().trim();
    if (cmd === "clear") {
      setHistory([]);
    } else if (COMMANDS[cmd]) {
      setHistory((prev) => [...prev, `> ${raw}`, COMMANDS[cmd]]);
    } else if (cmd !== "") {
      setHistory((prev) => [...prev, `> ${raw}`, `Command not found: ${cmd}. Type 'help' for options.`]);
    }
    setInput("");
    inputRef.current?.focus();
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
        role="region"
        aria-label="Terminal output log"
        tabIndex={0}
        className="h-64 overflow-y-auto p-4 bg-black/80 backdrop-blur-sm space-y-1 custom-scrollbar focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50"
      >
        {history.map((line, i) => (
          <div key={i} className={line.startsWith(">") ? "text-emerald-500" : "text-zinc-300"}>
            {line}
          </div>
        ))}
        <form onSubmit={(e) => { e.preventDefault(); runCommand(input); }} className="flex items-center pt-1">
          <label htmlFor="terminal-input" className="sr-only">Terminal command prompt</label>
          <ChevronRight size={14} className="text-emerald-500 mr-1 shrink-0" aria-hidden="true" />
          <input
            id="terminal-input"
            ref={inputRef}
            autoFocus
            aria-label="Terminal command input"
            placeholder="Type a command (e.g. help, skills)..."
            className="flex-1 bg-transparent border-none outline-none text-emerald-400 placeholder:text-zinc-600 caret-emerald-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>

      {/* Quick Suggestions Bar */}
      <div className="bg-zinc-950/80 px-4 py-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto text-xs text-zinc-400">
        <span className="text-zinc-500 text-[11px] shrink-0">Quick run:</span>
        {(["help", "projects", "skills", "experience", "clear"] as const).map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => runCommand(cmd)}
            className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 cursor-pointer"
            aria-label={`Run command ${cmd}`}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
