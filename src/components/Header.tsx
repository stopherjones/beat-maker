import React, { useRef, useState } from 'react';
import { Play, Pause, Square, Download, Upload, Globe, Volume2, Sparkles, FolderDown, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Preset, Pattern, ProjectFile } from '../types';
import { DEFAULT_PRESETS } from '../data/presets';
import { audioEngine } from '../audio/engine';

interface HeaderProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStop: () => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  swing: number;
  onSwingChange: (swing: number) => void;
  stepCount: number;
  onStepCountChange: (count: number) => void;
  currentPresetId: string;
  onSelectPreset: (preset: Preset) => void;
  pattern: Pattern;
  onExportProject: () => void;
  onImportFile: (importedData: any) => void;
  onResetSession: () => void;
  onOpenGHGuide: () => void;
  isExporting: boolean;
  onExportWav: () => void;
  masterVol: number;
  onMasterVolChange: (vol: number) => void;
  hasSavedSession: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isPlaying,
  onTogglePlay,
  onStop,
  bpm,
  onBpmChange,
  swing,
  onSwingChange,
  stepCount,
  onStepCountChange,
  currentPresetId,
  onSelectPreset,
  pattern,
  onExportProject,
  onImportFile,
  onResetSession,
  onOpenGHGuide,
  isExporting,
  onExportWav,
  masterVol,
  onMasterVolChange,
  hasSavedSession
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Tap Tempo calculation
  const tapTimesRef = useRef<number[]>([]);
  const [tapNotice, setTapNotice] = useState(false);

  const handleTapTempo = () => {
    const now = performance.now();
    const times = tapTimesRef.current;
    
    // Reset if last tap was over 2 seconds ago
    if (times.length > 0 && now - times[times.length - 1] > 2000) {
      tapTimesRef.current = [now];
      return;
    }

    times.push(now);
    if (times.length > 4) {
      times.shift();
    }

    if (times.length >= 2) {
      const intervals = [];
      for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i - 1]);
      }
      const avgIntervalMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgIntervalMs);
      const clampedBpm = Math.min(220, Math.max(50, calculatedBpm));
      onBpmChange(clampedBpm);
      setTapNotice(true);
      setTimeout(() => setTapNotice(false), 800);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        onImportFile(imported);
      } catch (err) {
        alert('Invalid JSON file format. Please upload a valid Beatmaker Project or Pattern file.');
      }
    };
    reader.readAsText(file);
    // reset value so same file can be loaded twice if needed
    e.target.value = '';
  };

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 text-zinc-100 p-3 sm:p-4 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Auto-Save Badge */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                Beat & Synth <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">GH Pages Ready</span>
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="hidden sm:inline">Auto-saves session to browser</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Saved Locally
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenGHGuide}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-purple-400 rounded-lg text-xs font-medium flex items-center gap-1.5 transition border border-zinc-700"
              title="How to host on GitHub Pages"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transport Controls (Play, Stop, BPM, Swing) */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-zinc-950/80 p-2 rounded-2xl border border-zinc-800/80 w-full lg:w-auto">
          {/* Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/20'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/25'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" /> Play Beat
              </>
            )}
          </button>

          {/* Stop Button */}
          <button
            onClick={onStop}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition"
            title="Stop Beat"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>

          <div className="h-6 w-px bg-zinc-800 mx-1 hidden sm:block" />

          {/* BPM Control */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">BPM</span>
            <input
              type="number"
              min={50}
              max={220}
              value={bpm}
              onChange={(e) => onBpmChange(Number(e.target.value))}
              className="w-14 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-center font-mono text-xs text-purple-300 font-bold focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleTapTempo}
              className={`px-2 py-1 text-[11px] font-mono font-medium rounded-lg border transition ${
                tapNotice
                  ? 'bg-purple-500 text-white border-purple-400'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
              title="Tap to set BPM"
            >
              TAP
            </button>
          </div>

          {/* Swing Control */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Swing</span>
            <input
              type="range"
              min={0}
              max={50}
              value={swing}
              onChange={(e) => onSwingChange(Number(e.target.value))}
              className="w-16 accent-purple-500 cursor-pointer"
            />
            <span className="text-[11px] font-mono text-zinc-400 w-6">{swing}%</span>
          </div>

          <div className="h-6 w-px bg-zinc-800 mx-1 hidden md:block" />

          {/* Step Count 16 vs 32 */}
          <div className="hidden md:flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => onStepCountChange(16)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold transition ${
                stepCount === 16 ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              16 Steps
            </button>
            <button
              onClick={() => onStepCountChange(32)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold transition ${
                stepCount === 32 ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              32 Steps
            </button>
          </div>

          {/* Master Volume */}
          <div className="flex items-center gap-1.5 pl-1">
            <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={masterVol}
              onChange={(e) => {
                const vol = Number(e.target.value);
                onMasterVolChange(vol);
                if (audioEngine.masterGain) {
                  audioEngine.masterGain.gain.value = vol;
                }
              }}
              className="w-16 accent-purple-500 cursor-pointer"
              title="Master Volume"
            />
          </div>
        </div>

        {/* Presets, Project Export/Import & GH Pages Guide */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end overflow-x-auto pb-1 lg:pb-0">
          
          {/* Preset Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2 py-1.5 rounded-xl border border-zinc-800">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={currentPresetId}
              onChange={(e) => {
                const found = DEFAULT_PRESETS.find((p) => p.id === e.target.value);
                if (found) onSelectPreset(found);
              }}
              className="bg-transparent text-xs text-zinc-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="" disabled className="bg-zinc-900 text-zinc-400">Load Preset...</option>
              {DEFAULT_PRESETS.map((p) => (
                <option key={p.id} value={p.id} className="bg-zinc-900 text-zinc-100">
                  {p.name} ({p.genre})
                </option>
              ))}
            </select>
          </div>

          {/* Export WAV Button */}
          <button
            onClick={onExportWav}
            disabled={isExporting}
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 whitespace-nowrap"
            title="Export full audio to WAV file"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? 'Exporting...' : 'Export WAV'}
          </button>

          {/* Export Full Project File */}
          <button
            onClick={onExportProject}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-medium flex items-center gap-1.5 transition whitespace-nowrap"
            title="Export entire project file (.json) to save to GitHub or disk"
          >
            <FolderDown className="w-3.5 h-3.5 text-purple-400" />
            <span>Export Project</span>
          </button>

          {/* Import Project or Pattern */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition whitespace-nowrap"
            title="Import Project or Pattern (.json)"
          >
            <Upload className="w-3.5 h-3.5 text-zinc-400" />
            <span>Import .json</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Reset Session Button */}
          <button
            onClick={onResetSession}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-rose-400 rounded-xl transition border border-zinc-800"
            title="Reset session to default factory state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* GH Pages Guide Modal trigger */}
          <button
            onClick={onOpenGHGuide}
            className="hidden lg:flex px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 rounded-xl text-xs font-medium items-center gap-1.5 transition whitespace-nowrap"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            GH Pages Guide
          </button>
        </div>

      </div>
    </header>
  );
};

