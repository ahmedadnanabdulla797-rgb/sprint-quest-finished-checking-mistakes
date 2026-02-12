import React, { useState, useEffect } from 'react';
import { sounds } from '../services/sounds';

interface CreativeGameProps {
  onWin: () => void;
  isCompleted: boolean;
  onNext: () => void;
}

export const CreativeGame: React.FC<CreativeGameProps> = ({ onWin, isCompleted, onNext }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const runCode = () => {
    setStatus('running');
    const input = code.toLowerCase();
    
    // Logic: Check if they used a mix of motion and loops/conditions
    if ((input.includes('move') || input.includes('go')) && 
        (input.includes('repeat') || input.includes('if') || input.includes('forever'))) {
      setTimeout(() => {
        setStatus('success');
        sounds.playFanfare();
        onWin();
      }, 2000);
    } else {
      setTimeout(() => {
        setStatus('idle');
        alert("Try combining a move command with a loop (repeat) or a rule (if)!");
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-indigo-50 rounded-3xl border-4 border-indigo-200">
      <div className="text-center">
        <h2 className="text-2xl font-black text-indigo-900 uppercase font-kids">Creative Master Project 🎨</h2>
        <p className="text-indigo-600 font-bold">Combine everything! Use moves, loops, and logic.</p>
      </div>

      <div className="w-full h-48 bg-white rounded-2xl border-4 border-indigo-200 relative overflow-hidden shadow-inner">
        <div 
          className={`absolute text-5xl transition-all duration-1000 ${status === 'running' ? 'animate-bounce' : ''}`}
          style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {status === 'success' ? '🎉' : '🐱'}
        </div>
      </div>

      <div className="w-full space-y-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Example: repeat 5 { move right } if wall then jump"
          className="w-full p-4 rounded-xl border-2 border-indigo-200 font-mono text-sm focus:ring-4 focus:ring-indigo-300 outline-none h-24"
        />
        
        <div className="flex gap-3">
          <button 
            onClick={runCode}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-black shadow-[0_4px_0_0_#4338ca] active:translate-y-1 active:shadow-none"
          >
            RUN CREATION 🚀
          </button>
          {isCompleted && (
            <button onClick={onNext} className="bg-emerald-500 text-white px-8 rounded-xl font-black shadow-[0_4px_0_0_#059669]">
              NEXT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
