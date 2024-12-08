import { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import MatrixButton from './components/MatrixButton';
import MatrixTerminal from './components/MatrixTerminal';
import CipherMenu from './components/CipherMenu';
import CipherPage from './components/ciphers/CipherPage';
import AudioService from './services/AudioService';

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCipherMenu, setShowCipherMenu] = useState(false);
  const [selectedCipher, setSelectedCipher] = useState<string | null>(null);

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
    setShowCipherMenu(true);
  };

  const handleCipherSelect = (cipherId: string) => {
    setSelectedCipher(cipherId);
    setShowCipherMenu(false);
  };

  const handleBackToMenu = () => {
    setSelectedCipher(null);
    setShowCipherMenu(true);
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
        {showCipherMenu && !selectedCipher && (
          <CipherMenu onSelect={handleCipherSelect} />
        )}
        {selectedCipher && (
          <CipherPage 
            cipherId={selectedCipher}
            onBack={handleBackToMenu}
          />
        )}
      </div>
    </div>
  );
}

export default App;
