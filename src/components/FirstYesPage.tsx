import { GAME_TEXT } from '../constants/gameText';

interface FirstYesPageProps {
  onGoBack: () => void;
}

export function FirstYesPage({ onGoBack }: FirstYesPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl animate-fade-in-up">
        <h1 className="text-5xl font-bold text-white mb-8">
          {GAME_TEXT.firstYes.title}
        </h1>

        <div className="mb-8">
          <div className="text-8xl mb-4">🐸</div>
          <p className="text-white text-2xl mb-4">
            {GAME_TEXT.firstYes.subtitle1}
          </p>
        </div>

        <p className="text-white text-xl mb-2 opacity-90">
          {GAME_TEXT.firstYes.subtitle2}
        </p>
        <p className="text-white text-xl mb-8 opacity-90">
          {GAME_TEXT.firstYes.subtitle3}
        </p>

        <button
          onClick={onGoBack}
          className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-4 px-12 rounded-full text-xl transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl"
        >
          {GAME_TEXT.firstYes.buttonText}
        </button>
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
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
