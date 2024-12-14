import { useState } from 'react';
import RSACipher from './components/ciphers/rsa/RSACipher';
import MatrixRain from './components/common/rain/MatrixRain';
import MatrixButton from './components/common/buttons/MatrixButton';
import MatrixTerminal from './components/common/terminal/MatrixTerminal';
import CipherMenu from './components/ciphers/menu/CipherMenu';
import CaesarCipher from './components/ciphers/caesar/CaesarCipher';
import VigenereCipher from './components/ciphers/vigenere/VigenereCipher';
import BlowfishCipher from './components/ciphers/blowfish/BlowfishCipher';
import AESCipher from './components/ciphers/aes/AESCipher';
import XORCipher from './components/ciphers/xor/XORCipher';
import RIPEMD160Hash from './components/ciphers/ripemd160/RIPEMD160Hash';
import SHA256Hash from './components/ciphers/sha256/SHA256Hash';
import SoundButton from './components/common/buttons/SoundButton';
import AudioService from './services/AudioService';
import './App.scss';

const App: React.FC = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCipher, setShowCipher] = useState(false);
  const [selectedCipher, setSelectedCipher] = useState<string | null>(null);
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

  const handleSoundToggle = () => {
    const audio = AudioService.getInstance();
    audio.stopSound();
    setShowSoundButton(false);
  };

  const renderContent = () => {
    switch (selectedCipher) {
      case 'caesar':
        return <CaesarCipher onBack={() => setSelectedCipher(null)} />;
      case 'vigenere':
        return <VigenereCipher onBack={() => setSelectedCipher(null)} />;
      case 'blowfish':
        return <BlowfishCipher onBack={() => setSelectedCipher(null)} />;
      case 'aes':
        return <AESCipher onBack={() => setSelectedCipher(null)} />;
      case 'xor':
        return <XORCipher onBack={() => setSelectedCipher(null)} />;
      case 'ripemd160':
        return <RIPEMD160Hash onBack={() => setSelectedCipher(null)} />;
      case 'sha256':
        return <SHA256Hash onBack={() => setSelectedCipher(null)} />;
      case 'rsa':
        return <RSACipher onBack={() => setSelectedCipher(null)} />;
      default:
        return <CipherMenu onSelect={setSelectedCipher} />;
    }
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

        {showCipher && (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default App;
