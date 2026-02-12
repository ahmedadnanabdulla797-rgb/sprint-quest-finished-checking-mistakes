import React, { useState } from 'react';

type Props = {
  onWin: () => void;
  onNext: () => void;
  isCompleted: boolean;
};

export const PlaygroundGame: React.FC<Props> = ({ onWin, onNext, isCompleted }) => {
  const [moved, setMoved] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const checkWin = (m: boolean, c: boolean, s: number) => {
    if (m && c && s >= 3 && !done) {
      setDone(true);
      onWin();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-center">
      <h2 className="text-2xl font-black text-indigo-700 font-kids">
        🎉 Party Playground
      </h2>

      <p className="text-indigo-600 font-semibold">
        Move the cat, click the star, and collect 3 coins!
      </p>

      {/* Game Area */}
      <div className="relative w-full max-w-[420px] h-[260px] bg-indigo-50 rounded-2xl border-4 border-indigo-200 flex items-center justify-center">
        {/* Cat */}
        <button
          onClick={() => {
            setMoved(true);
            checkWin(true, clicked, score);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl transition-transform hover:scale-110"
        >
          🐱
        </button>

        {/* Star */}
        <button
          onClick={() => {
            setClicked(true);
            checkWin(moved, true, score);
          }}
          className="absolute right-4 top-6 text-3xl animate-pulse"
        >
          ⭐
        </button>

        {/* Coin */}
        <button
          onClick={() => {
            const newScore = score + 1;
            setScore(newScore);
            checkWin(moved, clicked, newScore);
          }}
          className="text-3xl"
        >
          🪙
        </button>
      </div>

      <div className="bg-white rounded-xl px-4 py-2 shadow border">
        <span className="font-bold">Score:</span> {score} / 3
      </div>

      {done && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 w-full max-w-[420px]">
          <p className="font-black text-emerald-700 text-lg">You did it! 🎉</p>
          <button
            onClick={onNext}
            className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-kids shadow"
          >
            Next Level ➡️
          </button>
        </div>
      )}

      {isCompleted && !done && (
        <div className="text-emerald-600 font-bold">Already completed ✅</div>
      )}
    </div>
  );
};
