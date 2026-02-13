import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { FirstYesPage } from './components/FirstYesPage';
import { ChangeMindPage } from './components/ChangeMindPage';
import { TrueSuccessPage } from './components/TrueSuccessPage';
import { VideoPage } from './components/VideoPage';

export default function App() {
  const [page, setPage] = useState<'home' | 'firstYes' | 'changeMind' | 'trueSuccess' | 'video'>('home');
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noButtonSize, setNoButtonSize] = useState(100); // percentage
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [shouldMoveNo, setShouldMoveNo] = useState(false);

  const handleYes = () => {
    const newYesCount = yesCount + 1;
    setYesCount(newYesCount);

    if (newYesCount === 1 && noCount === 0) {
      // First yes, no previous no clicks
      setPage('firstYes');
    } else if (noCount >= 1) {
      // Clicked yes after clicking no at least once
      setPage('trueSuccess');
    }
  };

  const handleNo = () => {
    const newNoCount = noCount + 1;
    setNoCount(newNoCount);

    if (newNoCount >= 4 && shouldMoveNo) {
      // Calculate button size to ensure it stays on screen
      const newSize = Math.max(30, noButtonSize - 10);
      setNoButtonSize(newSize);
      
      // Estimate button dimensions based on scale
      const buttonWidth = 150 * (newSize / 100);
      const buttonHeight = 60 * (newSize / 100);
      
      // Move button randomly within safe boundaries
      const maxX = Math.max(0, window.innerWidth - buttonWidth - 20);
      const maxY = Math.max(0, window.innerHeight - buttonHeight - 20);
      
      setNoButtonPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      });
      return; // Stay on current page
    }

    if (newNoCount === 1) {
      // First no click
      setNoButtonSize(85);
      setPage('changeMind');
    } else if (newNoCount === 2) {
      // Second no click
      setNoButtonSize(70);
      setPage('changeMind');
    } else if (newNoCount === 3) {
      // Third no click - go to video
      setNoButtonSize(55);
      setPage('video');
      setShouldMoveNo(true); // Enable moving after video page
    }
  };

  const goHome = () => {
    setPage('home');
    // Reset no button to center position and original size when going home
    setNoButtonPosition({ x: 0, y: 0 });
    // Don't reset the size here - it should remember the shrinking
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      {page === 'home' && (
        <HomePage
          onYes={handleYes}
          onNo={handleNo}
          noButtonSize={noButtonSize}
          noButtonPosition={noButtonPosition}
          shouldMoveNo={shouldMoveNo}
        />
      )}
      {page === 'firstYes' && <FirstYesPage onGoBack={goHome} />}
      {page === 'changeMind' && <ChangeMindPage noCount={noCount} onReturn={goHome} />}
      {page === 'trueSuccess' && <TrueSuccessPage />}
      {page === 'video' && <VideoPage onGoBack={goHome} />}
    </div>
  );
}