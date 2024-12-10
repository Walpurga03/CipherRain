import { useState } from 'react';
import MatrixRain from './components/common/rain/MatrixRain';
import MatrixButton from './components/common/buttons/MatrixButton';
import MatrixTerminal from './components/common/terminal/MatrixTerminal';
import CipherMenu from './components/ciphers/menu/CipherMenu';
import CaesarCipher from './components/ciphers/caesar/CaesarCipher';
import InfoPopup from './components/common/popups/InfoPopup';
import SoundButton from './components/common/buttons/SoundButton';
import AudioService from './services/AudioService';
import './App.scss';

const App = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCipher, setShowCipher] = useState(false);
  const [selectedCipher, setSelectedCipher] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showSoundButton, setShowSoundButton] = useState(false);

  const terminalMessages = [
    "Wake up, Neo...",
    "The Matrix has you...",
    "Follow the white rabbit...",
    "Knock, knock, Neo..."
  ];

  const handleMatrixButtonClick = () => {
    setShowTerminal(true);
    setShowSoundButton(true);
    // Sound automatisch starten
    const audio = AudioService.getInstance();
    audio.playSound('matrix-enter');
  };

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    setShowCipher(true);
  };

  const handleCipherSelect = (cipherId: string) => {
    setSelectedCipher(cipherId);
  };

  const handleBackFromCipher = () => {
    setSelectedCipher(null);
  };

  const handleSoundToggle = () => {
    const audio = AudioService.getInstance();
    audio.stopSound();
    setShowSoundButton(false);
  };

  return (
    <div className="app">
      <MatrixRain />
      <SoundButton show={showSoundButton} onToggle={handleSoundToggle} />
      
      <div className="content">
        {!showTerminal && !showCipher && (
          <MatrixButton onClick={handleMatrixButtonClick}>
            ENTER THE MATRIX
          </MatrixButton>
        )}

        {showTerminal && !showCipher && (
          <MatrixTerminal 
            messages={terminalMessages}
            onComplete={handleTerminalComplete}
          />
        )}

        {showCipher && !selectedCipher && (
          <CipherMenu 
            onSelect={handleCipherSelect}
          />
        )}

        {showCipher && selectedCipher === 'caesar' && (
          <CaesarCipher onBack={handleBackFromCipher} />
        )}

        {/* Platzhalter für zukünftige Cipher-Implementierungen */}
        {showCipher && selectedCipher && selectedCipher !== 'caesar' && (
          <div className="placeholder">
            <h2>In Entwicklung</h2>
            <p>Diese Verschlüsselungsmethode wird noch implementiert.</p>
            <button onClick={handleBackFromCipher}>Zurück zum Menü</button>
          </div>
        )}
      </div>

      {showInfo && (
        <InfoPopup 
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
          title="About CipherRain"
          content="Welcome to CipherRain, where cryptography meets the Matrix. Explore various encryption methods in a cyberpunk-inspired interface."
        />
      )}
    </div>
  );
};

export default App;
