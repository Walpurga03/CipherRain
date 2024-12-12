import React, { useState, useEffect } from 'react';
import { BlowfishService } from '../../../services/ciphers/BlowfishService';
import './BlowfishCipher.scss';

interface BlowfishCipherProps {
  onBack: () => void;
}

const blowfishInfo = {
  title: "Blowfish Verschlüsselung",
  description: `Die Blowfish-Verschlüsselung ist eine leistungsstarke symmetrische Blockchiffre, die 1993 von Bruce Schneier entwickelt wurde.

  Funktionsweise:
  - Schlüssellänge: 32 bis 448 Bit
  - Blockgröße: 64 Bit
  - 16 Runden Feistel-Netzwerk
  
  Vorteile:
  - Sehr schnell auf 32-Bit-Systemen
  - Frei verfügbar, keine Patente
  - Kompakter Code (4KB)
  
  Besonderheiten:
  - Verwendet S-Boxen und P-Arrays
  - Schlüsselabhängige S-Boxen
  - Keine bekannten erfolgreichen Angriffe
  
  Diese Verschlüsselung wird häufig in Passwort-Hashing-Systemen und für sichere Kommunikation verwendet.`,
};

export const BlowfishCipher: React.FC<BlowfishCipherProps> = ({ onBack }) => {
  const [key, setKey] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);

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

  const processText = () => {
    if (input && key) {
      try {
        const result = isEncrypting 
          ? BlowfishService.encrypt(input, key)
          : BlowfishService.decrypt(input, key);
        setOutput(result);
      } catch (error: any) {
        setOutput(`Fehler: ${error?.message || 'Unbekannter Fehler'}`);
      }
    } else {
      setOutput('');
    }
  };

  return (
    <div className="caesar-cipher">
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
        <h2>Blowfish Verschlüsselung</h2>
      </div>

      {showInfo && (
        <div className="info-overlay" onClick={() => setShowInfo(false)}>
          <div className="info-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowInfo(false)}>×</button>
            <h3>{blowfishInfo.title}</h3>
            <div className="info-text">
              {blowfishInfo.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="wiki-link">
              <a href="https://de.wikipedia.org/wiki/Blowfish" 
                 target="_blank" 
                 rel="noopener noreferrer">
                Mehr auf Wikipedia
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="shift-control">
        <div className="shift-label">Schlüssel</div>
        <input
          type="text"
          className="shift-input"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Schlüssel eingeben (4-56 Zeichen)..."
          minLength={4}
          maxLength={56}
        />
      </div>

      <div className="text-area">
        <label>Eingabetext</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Text zum Verschlüsseln/Entschlüsseln eingeben..."
        />
      </div>

      <div className="button-group">
        <button
          className={`action-button ${isEncrypting ? 'active' : ''}`}
          onClick={() => setIsEncrypting(true)}
        >
          Verschlüsseln
        </button>
        <button
          className={`action-button ${!isEncrypting ? 'active' : ''}`}
          onClick={() => setIsEncrypting(false)}
        >
          Entschlüsseln
        </button>
      </div>

      <div className="text-area">
        <label>Ausgabetext</label>
        <textarea 
          value={output} 
          readOnly 
          placeholder="Hier erscheint das Ergebnis..." 
        />
      </div>
    </div>
  );
};

export default BlowfishCipher;
