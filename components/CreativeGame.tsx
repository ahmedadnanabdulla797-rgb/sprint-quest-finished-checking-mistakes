import React, { useState, useEffect } from 'react';
import { sounds } from '../services/sounds';

interface CreativeGameProps {
  onWin: () => void;
  isCompleted: boolean;
  onNext: () => void;
}

export const CreativeGame: React.FC<CreativeGameProps> = ({ onWin, isCompleted, onNext }) => {
  const [mySteps, setMySteps] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spritePos, setSpritePos] = useState({ x: 50, y: 50 });
  const [pet, setPet] = useState('🐱');

  // This function only adds the name to the list, it doesn't move the cat yet
  const addStep = (step: string) => {
    if (mySteps.length < 6 && !isPlaying) {
      sounds.playPop();
      setMySteps([...mySteps, step]);
    }
  };

  const clearSteps = () => {
    setMySteps([]);
    setIsPlaying(false);
    setIsJumping(false);
    setIsSpinning(false);
    setSpritePos({ x: 50, y: 50 });
  };

  const startShow = async () => {
    if (mySteps.length === 0) return;
    
    setIsPlaying(true);
    sounds.playFanfare();

    // Loop through each step in the "Recipe" one by one
    for (const step of mySteps) {
      if (step === 'Move') {
        setSpritePos(p => ({ ...p, x: Math.min(p.x + 10, 80) }));
      } else if (step === 'Jump') {
        setIsJumping(true);
        await new Promise(r => setTimeout(r, 600));
        setIsJumping(false);
      } else if (step === 'Spin') {
        setIsSpinning(true);
        await new Promise(r => setTimeout(r, 600));
        setIsSpinning(false);
      }
      // Wait a little bit between steps
      await new Promise(r => setTimeout(r, 400));
    }

    onWin();
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white h-full">
      {/* 1. The Stage */}
      <div className="relative w-full h-48 bg-gradient-to-b from-blue-200 to-green-100 rounded-[2rem] border-4 border-indigo-100 overflow-hidden shadow-inner">
        <div 
          className={`absolute text-6xl transition-all duration-500 
            ${isJumping ? 'animate-bounce' : ''} 
            ${isSpinning ? 'animate-spin' : ''}`}
          style={{ 
            left: `${spritePos.x}%`, 
            top: `${spritePos.y}%`, 
            transform: 'translate(-50%, -50%)',
          }}
        >
          {pet}
        </div>
      </div>

      {/* 2. Action Buttons - These now only add to the recipe */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={() => addStep('Move')} className="bg-blue-400 text-white px-4 py-3 rounded-xl font-black shadow-[0_4px_0_0_#3b82f6] active:translate-y-1 active:shadow-none">➡️ MOVE</button>
        <button onClick={() => addStep('Jump')} className="bg-yellow-400 text-white px-4 py-3 rounded-xl font-black shadow-[0_4px_0_0_#eab308] active:translate-y-1 active:shadow-none">🆙 JUMP</button>
        <button onClick={() => addStep('Spin')} className="bg-purple-400 text-white px-4 py-3 rounded-xl font-black shadow-[0_4px_0_0_#a855f7] active:translate-y-1 active:shadow-none">🔄 SPIN</button>
        <button onClick={() => { sounds.playPop(); setPet(pet === '🐱' ? '🐶' : '🐱'); }} className="bg-pink-400 text-white px-4 py-3 rounded-xl font-black shadow-[0_4px_0_0_#ec4899] active:translate-y-1 active:shadow-none">🌈 CHANGE</button>
      </div>

      {/* 3. The Recipe Box */}
      <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-dashed border-indigo-200 min-h-[80px]">
        <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">My Magic Recipe:</p>
        <div className="flex flex-wrap gap-2">
          {mySteps.map((step, i) => (
            <div key={i} className="bg-white px-3 py-1 rounded-lg shadow-sm border border-indigo-100 text-indigo-600 font-bold text-sm">
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Start Button - This is what triggers the movement */}
      <div className="flex gap-3">
        <button onClick={clearSteps} className="bg-gray-100 text-gray-400 px-4 py-4 rounded-2xl font-black text-xs uppercase">🗑️ Reset</button>
        <button 
          onClick={startShow}
          disabled={mySteps.length === 0 || isPlaying}
          className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#16a34a] active:translate-y-1 active:shadow-none disabled:opacity-50"
        >
          {isPlaying ? 'WATCHING... ✨' : 'START THE SHOW! 🚀'}
        </button>
      </div>

      {isCompleted && (
        <button onClick={onNext} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black animate-bounce mt-2 shadow-[0_6px_0_0_#4338ca]">
          NEXT LEVEL! 🏆
        </button>
      )}
    </div>
  );
};
