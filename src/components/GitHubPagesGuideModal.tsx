import React from 'react';
import { X, Globe, Zap, Cpu, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesGuideModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 text-zinc-100 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Hosting Beat Maker on GitHub Pages</h2>
              <p className="text-xs text-zinc-400">Why it's ridiculously easy & zero maintenance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-sm text-zinc-300">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-300">Why does pushing raw source ZIP to `main` show a blank page?</h3>
              <p className="text-xs text-amber-200/80 mt-1">
                The exported ZIP file contains raw React TypeScript source code (<code className="font-mono text-white bg-zinc-950 px-1 py-0.5 rounded">src/main.tsx</code>, <code className="font-mono text-white bg-zinc-950 px-1 py-0.5 rounded">App.tsx</code>). Browsers cannot run uncompiled <code className="font-mono text-amber-300">.tsx</code> files directly!
              </p>
              <p className="text-xs text-amber-200/80 mt-1.5 font-semibold text-emerald-300">
                ✓ Solution: GitHub needs to compile the project first using <code className="font-mono text-white bg-zinc-950 px-1 py-0.5 rounded">npm run build</code>!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <Code2 className="w-4 h-4" /> 1. Preview Locally in VS Code
              </div>
              <p className="text-xs text-zinc-400 mb-2">
                Run the following in your VS Code terminal:
              </p>
              <div className="font-mono bg-zinc-900 p-2 rounded text-xs text-emerald-300 space-y-1">
                <div>npm install</div>
                <div>npm run dev</div>
              </div>
              <p className="text-[11px] text-zinc-400 mt-2">
                Open <span className="text-zinc-200 font-mono">http://localhost:3000</span> to test with instant hot reload. To test production build: <span className="font-mono text-zinc-200">npm run build && npm run preview</span>
              </p>
            </div>

            <div className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl">
              <div className="flex items-center gap-2 text-purple-400 font-semibold mb-1">
                <Cpu className="w-4 h-4" /> 2. Deploy with GitHub Actions
              </div>
              <p className="text-xs text-zinc-400 mb-2">
                We included <span className="font-mono text-purple-300">.github/workflows/deploy.yml</span>!
              </p>
              <ol className="text-xs text-zinc-300 list-decimal list-inside space-y-1">
                <li>Push source files to your repo's <span className="font-mono text-purple-300">main</span> branch.</li>
                <li>Go to GitHub Repo → <strong>Settings</strong> → <strong>Pages</strong>.</li>
                <li>Set <em>Source</em> to <strong>GitHub Actions</strong>.</li>
                <li>GitHub builds & publishes automatically on every push!</li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> 3 Steps to Publish Your Beat Maker
            </h3>
            <ol className="space-y-2 text-xs">
              <li className="p-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl flex items-start gap-2">
                <span className="font-mono text-purple-400 font-bold">1.</span>
                <div>
                  <strong className="text-zinc-200">Add gh-pages package:</strong>
                  <div className="font-mono bg-zinc-950 p-2 rounded mt-1 text-purple-300 border border-zinc-800">
                    npm install --save-dev gh-pages
                  </div>
                </div>
              </li>
              <li className="p-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl flex items-start gap-2">
                <span className="font-mono text-purple-400 font-bold">2.</span>
                <div>
                  <strong className="text-zinc-200">Add script in package.json:</strong>
                  <div className="font-mono bg-zinc-950 p-2 rounded mt-1 text-purple-300 border border-zinc-800">
                    "deploy": "vite build && gh-pages -d dist"
                  </div>
                </div>
              </li>
              <li className="p-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl flex items-start gap-2">
                <span className="font-mono text-purple-400 font-bold">3.</span>
                <div>
                  <strong className="text-zinc-200">Run deploy command:</strong>
                  <div className="font-mono bg-zinc-950 p-2 rounded mt-1 text-emerald-400 border border-zinc-800">
                    npm run deploy
                  </div>
                  <p className="text-zinc-400 mt-1">Your beat maker is instantly live at <span className="font-mono text-zinc-300">https://yourusername.github.io/beat-maker</span>!</p>
                </div>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">🚀 Built-in Features Included in This App</h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 16 / 32 Step Grid Sequencer</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dual-Oscillator Synthesizer</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Filter Cutoff, Res & ADSR Envelope</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Delay, Reverb & Overdrive Effects</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Per-step Velocity & Pitch Editing</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Swing Groove & Tap Tempo</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Song Mode / Pattern Arranger</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Lossless WAV Audio Export</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl text-xs transition"
          >
            Got it, let's create music!
          </button>
        </div>
      </div>
    </div>
  );
};
