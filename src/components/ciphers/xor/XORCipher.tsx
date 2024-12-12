import React, { useState, useEffect } from 'react';
import CipherService from '../../../services/CipherService';
import './XORCipher.scss';

interface XORCipherProps {
  onBack: () => void;
}

const xorInfo = {
  title: "XOR Verschlüsselung",
  description: `Die XOR-Verschlüsselung ist eine einfache aber effektive symmetrische Verschlüsselungsmethode, 
  die auf der XOR (Exclusive OR) Operation basiert.

  Funktionsweise:
  - Jedes Zeichen des Textes wird mit dem entsprechenden Zeichen des Schlüssels XOR-verknüpft
  - Der Schlüssel wird wiederholt, wenn er kürzer als der Text ist
  - Die XOR-Operation ist ihre eigene Inverse: (A XOR B) XOR B = A
  
  Vorteile:
  - Sehr schnell und einfach zu implementieren
  - Mathematisch perfekte Verschlüsselung bei gleichlangem, zufälligem Schlüssel
  - XOR ist seine eigene Inverse (gleicher Prozess für Ver- und Entschlüsselung)
  
  Nachteile:
  - Unsicher bei Wiederverwendung des Schlüssels
  - Anfällig für Known-Plaintext-Angriffe
  - Keine Integritätsprüfung
  
  Die XOR-Verschlüsselung wird oft als Baustein in komplexeren Verschlüsselungsalgorithmen verwendet.`,
};

export const XORCipher: React.FC<XORCipherProps> = ({ onBack }) => {
  const [key, setKey] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [keyError, setKeyError] = useState<string>('');

  useEffect(() => {
    processText();
  }, [input, key, isEncrypting]);

  useEffect(() => {
    if (showInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showInfo]);

  const validateKey = (key: string): boolean => {
    if (key.length === 0) {
      setKeyError('Der Schlüssel darf nicht leer sein');
      return false;
    }
    
    // Prüfe auf gültige ASCII-Zeichen
    const invalidChars = key.split('').filter(char => {
      const code = char.charCodeAt(0);
      return code < 32 || code > 126;
    });

    if (invalidChars.length > 0) {
      setKeyError('Der Schlüssel darf nur ASCII-Zeichen enthalten');
      return false;
    }

    setKeyError('');
    return true;
  };

  const processText = () => {
    if (input && key) {
      try {
        if (!validateKey(key)) {
          setOutput('');
          return;
        }
        const result = isEncrypting 
          ? CipherService.xor.encrypt(input, key)
          : CipherService.xor.decrypt(input, key);
        setOutput(result);
      } catch (error) {
        if (error instanceof Error) {
          setOutput('Fehler: ' + error.message);
        } else {
          setOutput('Ein unbekannter Fehler ist aufgetreten');
        }
      }
    } else {
      setOutput('');
    }
  };

  return (
    <div className="xor-cipher">
      <div className="cipher-header">
        <div className="nav-buttons">
          <button className="back-button" onClick={onBack}>
            <span className="back-icon">←</span>
            <span className="back-text">Zurück</span>
          </button>
          <button className="info-button" onClick={() => setShowInfo(true)}>
            <span className="info-icon">i</span>
          </button>
        </div>
        <h2>XOR Verschlüsselung</h2>
      </div>

      {showInfo && (
        <div className="info-overlay" onClick={() => setShowInfo(false)}>
          <div className="info-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowInfo(false)}>×</button>
            <h3>{xorInfo.title}</h3>
            <div className="info-text">
              {xorInfo.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="wiki-link">
              <a href="https://kryptografie.de/kryptografie/chiffre/xor.htm" 
                 target="_blank" 
                 rel="noopener noreferrer">
                Mehr auf Info
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="mode-toggle">
        <button 
          className={isEncrypting ? 'active' : ''} 
          onClick={() => setIsEncrypting(true)}
        >
          Verschlüsseln
        </button>
        <button 
          className={!isEncrypting ? 'active' : ''} 
          onClick={() => setIsEncrypting(false)}
        >
          Entschlüsseln
        </button>
      </div>

      <div className="input-section">
        <div className="key-input">
          <label htmlFor="key">Schlüssel:</label>
          <input
            type="text"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Geben Sie einen Schlüssel ein (ASCII-Zeichen)"
          />
          {keyError && <div className="error-message">{keyError}</div>}
          <div className="key-info">
            Erlaubte Zeichen: A-Z, a-z, 0-9 und Sonderzeichen (!@#$ etc.)
          </div>
        </div>

        <div className="text-area">
          <label htmlFor="input">Eingabetext:</label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isEncrypting ? "Text zum Verschlüsseln" : "Text zum Entschlüsseln"}
          />
        </div>

        <div className="text-area">
          <label htmlFor="output">Ausgabetext:</label>
          <textarea
            id="output"
            value={output}
            readOnly
            placeholder="Ergebnis erscheint hier"
          />
        </div>
      </div>
    </div>
  );
};

export default XORCipher;
