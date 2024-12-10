import React from 'react';
import './SoundButton.scss';

interface SoundButtonProps {
  show: boolean;
  onToggle: () => void;
}

const SoundButton: React.FC<SoundButtonProps> = ({ show, onToggle }) => {
  if (!show) return null;

  return (
    <button 
      className={`sound-button ${show ? 'fade-in' : ''}`}
      onClick={onToggle}
    >
      🔊
    </button>
  );
};

export default SoundButton;
