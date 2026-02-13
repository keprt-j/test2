import { useEffect } from 'react';
import { GAME_TEXT } from '../constants/gameText';

interface ChangeMindPageProps {
  noCount: number;
  onReturn: () => void;
}

export function ChangeMindPage({ noCount, onReturn }: ChangeMindPageProps) {
  useEffect(() => {
    // Auto-redirect after 2.5 seconds
    const timer = setTimeout(() => {
      onReturn();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onReturn]);

  const getMessage = () => {
    if (noCount === 1) {
      return GAME_TEXT.changeMind.firstNo;
    } else if (noCount === 2) {
      return GAME_TEXT.changeMind.secondNo;
    }
    return GAME_TEXT.changeMind.thirdNo;
  };

  const message = getMessage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl animate-fade-in-up">
        <div className="text-8xl mb-6">{message.emoji}</div>
        <h1 className="text-5xl font-bold text-white mb-6">
          {message.title}
        </h1>
        <p className="text-white text-2xl opacity-90">
          {message.subtitle}
        </p>
        <div className="mt-8">
          <div className="inline-block bg-white/20 rounded-full px-6 py-2">
            <p className="text-white text-sm">Returning to question...</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
