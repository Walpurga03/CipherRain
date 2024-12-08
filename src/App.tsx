import { useState } from 'react';
import MatrixRain from './MatrixRain';
import MatrixButton from './components/MatrixButton';
import MatrixTerminal from './components/MatrixTerminal';
import AudioService from './services/AudioService';

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const messages = [
    "Wake up, Neo...",
    "The Matrix has you...",
    "Follow the white rabbit...",
    "Knock, knock, Neo..."
  ];

  const handleEnterMatrix = () => {
    AudioService.play('matrix-enter');
    setIsEntered(true);
    setShowTerminal(true);
  };

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    // Hier können weitere Aktionen nach dem Terminal hinzugefügt werden
  };

  return (
    <div className="app">
      <MatrixRain />
      <div className="content">
        {!isEntered && (
          <div className="enter-matrix">
            <MatrixButton onClick={handleEnterMatrix}>
              Enter The Matrix
            </MatrixButton>
          </div>
        )}
        {showTerminal && (
          <MatrixTerminal 
            messages={messages} 
            onComplete={handleTerminalComplete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
