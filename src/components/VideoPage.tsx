import { GAME_TEXT } from '../constants/gameText';

interface VideoPageProps {
  onGoBack: () => void;
}

export function VideoPage({ onGoBack }: VideoPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-4xl w-full animate-fade-in-up">
        <h1 className="text-5xl font-bold text-white mb-8">
          {GAME_TEXT.video.title}
        </h1>

        <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 mb-8">
          <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden mb-4">
            <video
              className="w-full h-full object-contain"
              src={`${import.meta.env.BASE_URL}whiteboard.mp4`}
              controls
              playsInline
            />
          </div>
          
          <p className="text-white text-lg opacity-90">
            {GAME_TEXT.video.subtitle}
          </p>
        </div>

        <button
          onClick={onGoBack}
          className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-4 px-12 rounded-full text-xl transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl"
        >
          {GAME_TEXT.video.buttonText}
        </button>

        <p className="text-white text-sm mt-6 opacity-75">
          {GAME_TEXT.video.hint}
        </p>
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
