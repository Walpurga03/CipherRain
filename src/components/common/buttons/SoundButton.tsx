import React, { useState } from 'react';
import AudioService from '../../../services/AudioService';

const SoundButton: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleSound = () => {
    const audio = AudioService.getInstance();
    if (isMuted) {
      setIsMuted(false);
    } else {
      audio.stopSound();
      setIsMuted(true);
      // Starte die Ausblend-Animation
      setTimeout(() => setIsVisible(false), 300);
    }
  };

  if (!isVisible) return null;

  return (
    <button 
      className={`sound-button ${isMuted ? 'muted fade-out' : ''}`}
      onClick={toggleSound}
      title={isMuted ? 'Sound einschalten' : 'Sound ausschalten'}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
};

export default SoundButton;
