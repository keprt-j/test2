import { GAME_TEXT } from '../constants/gameText';

export function TrueSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="mb-8 animate-bounce-in">
        <img 
            src="https://media1.tenor.com/m/qidowOYwqScAAAAC/yes-yes-sir.gif" 
            alt="Celebration" 
            className="w-40 h-40 mx-auto mb-6 object-contain"
          />
          <h1 className="text-6xl font-bold text-white mb-6">
            {GAME_TEXT.trueSuccess.title}
          </h1>
          <p className="text-white text-3xl mb-4">
            {GAME_TEXT.trueSuccess.subtitle1}
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-8 animate-fade-in-delayed">
          <p className="text-white text-2xl mb-4">
            {GAME_TEXT.trueSuccess.subtitle2}
          </p>
          <p className="text-white text-xl opacity-90">
            {GAME_TEXT.trueSuccess.subtitle3}
          </p>
        </div>

        <div className="flex gap-4 justify-center text-5xl">
          <span className="animate-float">🎈</span>
          <span className="animate-float-delay-1"></span>
          <span className="animate-float-delay-2">🌟</span>
          <span className="animate-float-delay-1">✨</span>
          <span className="animate-float">🎈</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in-delayed {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-float-delay-1 {
          animation: float 2s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .animate-float-delay-2 {
          animation: float 2s ease-in-out infinite;
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}
