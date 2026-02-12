import React, { useState } from 'react';
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
  const [spritePos, setSpritePos] = useState({ x: 50, y: 70 }); // Lowered starting Y so jump has more room
  const [pet, setPet] = useState('🐱');

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
    setSpritePos({ x: 50, y: 70 });
  };

  const startShow = async () => {
    if (mySteps.length === 0) return;
    
    setIsPlaying(true);
    sounds.playFanfare();

    // Start from the left
    setSpritePos({ x: 15, y: 70 });
    await new Promise(r => setTimeout(r, 500));

    for (const step of mySteps) {
      if (step === 'Move') {
        setSpritePos(p => ({ ...p, x: Math.min(p.x + 15, 85) }));
        await new Promise(r => setTimeout(r, 600));
      } 
      else if (step === 'Jump') {
        setIsJumping(true); 
        // We use a longer timeout for a bigger, more satisfying jump
        await new Promise(r => setTimeout(r, 800)); 
        setIsJumping(false);
      } 
      else if (step === 'Spin') {
        setIsSpinning(true);
        await new Promise(r => setTimeout(r, 800));
        setIsSpinning(false);
      }
      await new Promise(r => setTimeout(r, 300));
    }

    setIsPlaying(false);
    onWin();
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white h-full max-w-md mx-auto">
      {/* 1. LARGER STAGE: Increased height from h-48 to h-64 for better jumping room */}
      <div className="relative w-full h-64 bg-gradient-to-b from-blue-300 via-blue-100 to-green-200 rounded-[2.5rem] border-4 border-indigo-100 overflow-hidden shadow-inner">
        
        {/* Decorative Clouds for height reference */}
        <div className="absolute top-8 left-10 text-2xl opacity-50">☁️</div>
        <div className="absolute top-12 right-12 text-2xl opacity-50">☁️</div>

        <div 
          className={`absolute text-7xl transition-all duration-500 flex items-center justify-center
            ${isJumping ? 'animate-bounce-high' : ''} 
            ${isSpinning ? 'animate-spin' : ''}`}
          style={{ 
            left: `${spritePos.x}%`, 
            top: `${spritePos.y}%`, 
            transform: 'translate(-50%, -50%)',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {pet}
        </div>
        
        {/* Floor Line */}
        <div className="absolute bottom-0 w-full h-4 bg-green-400/30"></div>
      </div>

      {/* 2. Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => addStep('Move')} className="bg-blue-400 text-white py-3 rounded-2xl font-black shadow-[0_4px_0_0_#3b82f6] active:translate-y-1 active:shadow-none text-sm">➡️ MOVE</button>
        <button onClick={() => addStep('Jump')} className="bg-yellow-400 text-white py-3 rounded-2xl font-black shadow-[0_4px_0_0_#eab308] active:translate-y-1 active:shadow-none text-sm">🆙 JUMP</button>
        <button onClick={() => addStep('Spin')} className="bg-purple-400 text-white py-3 rounded-2xl font-black shadow-[0_4px_0_0_#a855f7] active:translate-y-1 active:shadow-none text-sm">🔄 SPIN</button>
        <button onClick={() => { sounds.playPop(); setPet(pet === '🐱' ? '🐶' : '🐱'); }} className="bg-pink-400 text-white py-3 rounded-2xl font-black shadow-[0_4px_0_0_#ec4899] active:translate-y-1 active:shadow-none text-sm">🌈 CHANGE</button>
      </div>

      {/* 3. Recipe Box */}
      <div className="bg-indigo-50 p-3 rounded-2xl border-2 border-dashed border-indigo-200">
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {mySteps.map((step, i) => (
            <div key={i} className="bg-white px-3 py-1 rounded-lg shadow-sm border border-indigo-100 text-indigo-600 font-bold text-xs animate-in zoom-in">
              {step}
            </div>
          ))}
          {mySteps.length === 0 && <span className="text-indigo-300 text-xs italic">Build your show!</span>}
        </div>
      </div>

      {/* 4. Controls */}
      <div className="flex gap-2">
        <button onClick={clearSteps} className="bg-gray-100 text-gray-400 px-4 py-4 rounded-2xl font-black text-[10px] uppercase">🗑️</button>
        <button 
          onClick={startShow}
          disabled={mySteps.length === 0 || isPlaying}
          className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#16a34a] active:translate-y-1 active:shadow-none disabled:opacity-50"
        >
          {isPlaying ? '✨ SHOWTIME ✨' : 'START THE SHOW! 🚀'}
        </button>
      </div>

      {isCompleted && !isPlaying && (
        <button onClick={onNext} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black animate-bounce shadow-[0_6px_0_0_#4338ca]">
          NEXT LEVEL! 🏆
        </button>
      )}

      {/* CUSTOM CSS FOR HIGH JUMP */}
      <style>{`
        @keyframes bounce-high {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-50%, -150%); } /* Jumps up much higher */
        }
        .animate-bounce-high {
          animation: bounce-high 0.8s infinite;
        }
      `}</style>
    </div>
  );
};
