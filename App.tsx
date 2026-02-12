import React, { useState, useEffect } from 'react';
import { FULL_CURRICULUM } from './constants';
import { Lesson, LessonStatus } from './types';
import { SpriteSimulator } from './components/SpriteSimulator';
import { LoopGame } from './components/LoopGame';
import { EventsGame } from './components/EventsGame';
import { ConditionGame } from './components/ConditionGame';
import { QuizComponent } from './components/QuizComponent';
import { Confetti } from './components/Confetti';
import { WelcomeModal } from './components/WelcomeModal';
import { sounds } from './services/sounds';
import { LogicWorkshop } from './components/LogicWorkshop';
import logo from './assets/Million Coders Logo_DRK GRY.png';
import { PlaygroundGame } from './components/PlaygroundGame';

const App: React.FC = () => {
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0); 
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [stars, setStars] = useState(0); 
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [pulseStars, setPulseStars] = useState(false);
  const [isQuestFinished, setIsQuestFinished] = useState(false);

  const currentModule = FULL_CURRICULUM[currentModuleIdx];
  const currentLevel = currentModule.lessons[currentLevelIdx];

  const totalLevels = currentModule.lessons.length;
  const progressPercent = ((currentLevelIdx + 1) / totalLevels) * 100;

  const handleLevelUp = () => {
    if (!completed.has(currentLevel.id)) {
      sounds.playFanfare();
      setStars(prev => prev + currentLevel.stars);
      setCompleted(prev => new Set(prev).add(currentLevel.id));
      
      setShowConfetti(true);
      setPulseStars(true);

      setTimeout(() => setShowConfetti(false), 4000);
      setTimeout(() => setPulseStars(false), 1000);
    }
  };

  const nextLevel = () => {
    sounds.playPop();
    if (currentLevelIdx < currentModule.lessons.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
    } else if (currentModuleIdx < FULL_CURRICULUM.length - 1) {
      setCurrentModuleIdx(prev => prev + 1);
      setCurrentLevelIdx(0);
    } else {
      setIsQuestFinished(true);
    }
  };

  const prevLevel = () => {
    sounds.playPop();
    if (currentLevelIdx > 0) {
      setCurrentLevelIdx(prev => prev - 1);
    } else if (currentModuleIdx > 0) {
      const prevModuleIdx = currentModuleIdx - 1;
      const prevModule = FULL_CURRICULUM[prevModuleIdx];
      setCurrentModuleIdx(prevModuleIdx);
      setCurrentLevelIdx(prevModule.lessons.length - 1);
    }
  };

  const restartQuest = () => {
    sounds.playFanfare();
    setCurrentModuleIdx(0);
    setCurrentLevelIdx(0);
    setCompleted(new Set());
    setStars(0);
    setIsQuestFinished(false);
    setShowWelcome(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  useEffect(() => {
    if (currentLevel.type === 'content') {
      handleLevelUp();
      const timer = setTimeout(() => {
        nextLevel();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentLevel.id]);

  return (
    <div className="h-screen bg-[#6366f1] text-[#1e293b] font-['Lexend'] antialiased flex flex-col overflow-hidden selection:bg-indigo-200">
      {showConfetti && <Confetti />}
      
      {showWelcome && <WelcomeModal onClose={() => { sounds.playPop(); setShowWelcome(false); sounds.playFanfare(); }} />}

      {isQuestFinished && (
        <div className="fixed inset-0 z-[300] bg-indigo-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] p-10 w-[95%] max-w-[600px] flex flex-col items-center text-center shadow-2xl border-[6px] border-yellow-400 relative animate-in zoom-in">
            <div className="text-[100px] mb-4 drop-shadow-lg leading-none animate-bounce">🏆</div>
            <h2 className="text-4xl font-black text-indigo-900 mb-2 font-kids uppercase">SUPER CODER!</h2>
            <p className="text-indigo-600 font-bold mb-6 text-xl">YOU DID IT! 🌟</p>
            <button 
              onClick={restartQuest} 
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-6 rounded-[2rem] shadow-[0_10px_0_0_#15803d] flex items-center justify-center gap-3 font-kids active:translate-y-2 active:shadow-none"
            >
              <span className="text-3xl font-black uppercase">PLAY AGAIN! 🚀</span>
            </button>
          </div>
        </div>
      )}

      <header className="bg-white/10 backdrop-blur-xl py-3 px-6 border-b border-white/20 shadow-lg z-20 shrink-0">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-10 w-auto brightness-0 invert" /> 
            <div className="h-8 w-[2px] bg-white/20"></div>
            <h1 className="text-lg font-black text-white uppercase font-kids tracking-wider">SPRITE QUEST</h1>
          </div>
          
          <div className="hidden md:flex flex-col items-end gap-1">
             <div className="w-40 h-3 bg-white/20 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-yellow-400 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
             </div>
             <span className="text-[10px] text-white/70 font-bold uppercase">LEVEL {currentLevelIdx + 1} of {totalLevels}</span>
          </div>

          <div className={`bg-white/95 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl border-2 border-indigo-400 transition-all ${pulseStars ? 'scale-125 rotate-6' : ''}`}>
            <span className="text-xl">⭐</span>
            <span className="text-xl font-black text-indigo-600 tabular-nums">{stars}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1100px] mx-auto grid grid-cols-12 gap-4 p-4 lg:p-6 items-stretch overflow-hidden">
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
          <div className="bg-white/10 backdrop-blur-xl rounded-[1.5rem] p-4 shadow-xl border border-white/20 flex-1 flex flex-col min-h-[150px]">
            <h2 className="text-white font-black mb-3 uppercase tracking-widest text-[10px] text-center font-kids">MY PROGRESS</h2>
            <div className="space-y-2 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              {currentModule.lessons.map((level, idx) => {
                const isCurrent = currentLevelIdx === idx;
                const isDone = completed.has(level.id);
                return (
                  <button key={level.id} onClick={() => { sounds.playPop(); setCurrentLevelIdx(idx); }} className={`w-full p-3 rounded-2xl transition-all border-b-4 flex items-center gap-3 ${isCurrent ? 'bg-yellow-400 border-yellow-600 scale-105' : 'bg-white/10 border-white/5 text-white'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-indigo-900 text-yellow-400' : 'bg-white/20 text-white'}`}>
                      {isDone ? '★' : idx + 1}
                    </div>
                    <span className={`text-[11px] font-black uppercase text-left leading-tight ${isCurrent ? 'text-indigo-900' : 'text-white'}`}>
                      {level.title.split(': ')[1] || level.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-9 flex flex-col h-full overflow-hidden relative">
          <div className="bg-white rounded-[2.5rem] shadow-2xl flex flex-col h-full border-[6px] border-white overflow-hidden relative">
            
            <div className="p-4 flex items-center justify-between px-6 shrink-0 bg-indigo-50 border-b-2 border-indigo-100">
               <button onClick={prevLevel} disabled={currentModuleIdx === 0 && currentLevelIdx === 0} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md border-b-4 border-indigo-200 active:translate-y-1 active:border-b-0 disabled:opacity-20">◀️</button>
               <div className="text-center">
                  <p className="text-indigo-900 font-black text-xs uppercase tracking-widest font-kids">{currentLevel.title}</p>
               </div>
               <button onClick={nextLevel} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md border-b-4 border-green-200 active:translate-y-1 active:border-b-0">▶️</button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-5 flex flex-col min-h-0 custom-scrollbar bg-white">
              {/* FIXED LOGIC BELOW: Added PlaygroundGame check */}
              {currentLevel.content === 'COORDINATE_GAME' ? (
                <SpriteSimulator onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content === 'EVENTS_GAME' ? (
                 <EventsGame onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content === 'LOOP_GAME_EASY' ? (
                 <LoopGame onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content === 'PLAYGROUND_EASY' ? (
                 <PlaygroundGame onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.type === 'quiz' ? (
                 <QuizComponent onWin={handleLevelUp} contentId={currentLevel.content} />
              ) : currentLevel.type === 'project' ? (
                 <LogicWorkshop mode="LOGIC" onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : (
                 <div className="flex flex-col items-center justify-center h-full text-center p-10">
                    <h2 className="text-3xl font-black text-indigo-900 mb-4">{currentLevel.title}</h2>
                    <p className="text-indigo-600 text-xl font-bold mb-8">Ready to learn? Click Next to start! 🚀</p>
                 </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
