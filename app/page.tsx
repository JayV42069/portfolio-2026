import { Mail, Zap, Cpu, GitBranch, Rocket } from "lucide-react";
import TradingChart from "@/components/TradingChart";
import Terminal from "@/components/Terminal";
import ModuleGrid from "@/components/ModuleGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Hero Section */}
        <section className="mb-24 md:mb-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Jay-Dee | Frontend Engineer
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed">
            Architecting high-performance UIs and real-time systems through AI-accelerated workflows.
          </p>
          <div className="my-12">
            <TradingChart />
          </div>
        </section>

        <section className="py-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 italic">SYSTEM_OVERRIDE</h2>
            <p className="text-zinc-500">Query the engineer directly via the secure console.</p>
          </div>
          <Terminal />
        </section>

        <section className="py-20 border-t border-white/5">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 italic uppercase">Physics_Lab</h2>
            <p className="text-zinc-500">Real-time modular state management and mass calculation engine.</p>
          </div>
          <ModuleGrid />
        </section>

        {/* Technical Wins */}
        <section className="mb-24 md:mb-32">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">Technical Wins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trading Dashboard</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Real-time state management and data visualization using Next.js 15 and Zustand.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modular Vehicle Physics</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                3D engine integration and complex physics simulations in Godot 4.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Monorepo Architecture</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Scalable workspace management utilizing Turborepo and Bun.
              </p>
            </div>
          </div>
        </section>

        {/* The Edge */}
        <section className="mb-24 md:mb-32">
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-8 h-8" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">The Edge</h2>
            </div>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl">
              I ship production-ready code 3x faster by leveraging agentic AI loops and automated CI/CD pipelines.
            </p>
          </div>
        </section>

        {/* Contact */}
        <footer className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              <span>GitHub</span>
            </a>
            <a
              href="mailto:hello@jay-dee.dev"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
