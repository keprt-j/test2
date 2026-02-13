import { useState, useEffect } from 'react';
import { GAME_TEXT } from '../constants/gameText';

interface HomePageProps {
  onYes: () => void;
  onNo: () => void;
  noButtonSize: number;
  noButtonPosition: { x: number; y: number };
  shouldMoveNo: boolean;
}

export function HomePage({ onYes, onNo, noButtonSize, noButtonPosition, shouldMoveNo }: HomePageProps) {
  const [showText, setShowText] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Stagger the text loading with smoother timing
    setTimeout(() => setShowText(true), 300);
    setTimeout(() => setShowQuestion(true), 1500);
    setTimeout(() => setShowButtons(true), 2500);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-2xl w-full">
        <div className={`mb-8 transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-white text-2xl mb-4 opacity-90">
            {GAME_TEXT.home.beforeQuestion1}
          </p>
          <p className="text-white text-xl opacity-80">
            {GAME_TEXT.home.beforeQuestion2}
          </p>
        </div>

        <h1 className={`text-6xl font-bold text-white mb-12 transition-all duration-700 ${showQuestion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {GAME_TEXT.home.question}
        </h1>

        <div className={`flex gap-6 justify-center items-center transition-all duration-700 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={onYes}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full text-2xl transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl"
          >
            Yes
          </button>

          <button
            onClick={onNo}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-12 rounded-full text-2xl transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl"
            style={
              shouldMoveNo
                ? {
                    position: 'fixed',
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                    transform: `scale(${noButtonSize / 100})`,
                  }
                : {
                    transform: `scale(${noButtonSize / 100})`,
                  }
            }
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
