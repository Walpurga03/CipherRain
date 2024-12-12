import React, { useState, useEffect } from 'react';
import CipherService from '../../../services/CipherService';
import './AESCipher.scss';

interface AESCipherProps {
  onBack: () => void;
}

type AESVariant = '128' | '192' | '256';

const aesInfo = {
  title: "AES Verschlüsselung",
  description: `Der Advanced Encryption Standard (AES) ist einer der wichtigsten und sichersten symmetrischen Verschlüsselungsalgorithmen.
  Er arbeitet mit Blöcken von 128 Bits und unterstützt Schlüssellängen von 128, 192 oder 256 Bits.

  Schlüssellängen:
  - AES-128: 16 Zeichen
  - AES-192: 24 Zeichen
  - AES-256: 32 Zeichen

  Funktionsweise:
  - Daten werden in 4x4 Byte-Blöcke aufgeteilt
  - Mehrere Runden von Transformationen werden angewendet
  - Jede Runde beinhaltet: SubBytes, ShiftRows, MixColumns, AddRoundKey
  
  Vorteile:
  - Sehr hohe Sicherheit
  - Effiziente Hardware- und Software-Implementierung
  - Weltweiter Standard für symmetrische Verschlüsselung
  
  Nachteile:
  - Schlüsselaustausch muss sicher erfolgen
  - Rechenintensiver als einfachere Algorithmen
  
  AES wurde 2001 vom NIST als Standard ausgewählt und wird seitdem weltweit in verschiedensten Sicherheitsanwendungen eingesetzt.`,
};

const getRequiredKeyLength = (variant: AESVariant): number => {
  switch (variant) {
    case '128': return 16;
    case '192': return 24;
    case '256': return 32;
  }
};

export const AESCipher: React.FC<AESCipherProps> = ({ onBack }) => {
  const [variant, setVariant] = useState<AESVariant>('256');
  const [key, setKey] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [keyError, setKeyError] = useState<string>('');

  useEffect(() => {
    processText();
  }, [input, key, isEncrypting, variant]);

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

  const validateKey = (key: string, variant: AESVariant): boolean => {
    const requiredLength = getRequiredKeyLength(variant);
    if (key.length !== requiredLength) {
      setKeyError(`Der Schlüssel muss genau ${requiredLength} Zeichen lang sein für AES-${variant}`);
      return false;
    }
    setKeyError('');
    return true;
  };

  const processText = () => {
    if (input && key) {
      try {
        if (!validateKey(key, variant)) {
          setOutput('');
          return;
        }
        const result = isEncrypting 
          ? CipherService.aes.encrypt(input, key)
          : CipherService.aes.decrypt(input, key);
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
    <div className="aes-cipher">
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
        <h2>AES Verschlüsselung</h2>
      </div>

      {showInfo && (
        <div className="info-overlay" onClick={() => setShowInfo(false)}>
          <div className="info-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowInfo(false)}>×</button>
            <h3>{aesInfo.title}</h3>
            <div className="info-text">
              {aesInfo.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="wiki-link">
              <a href="https://de.wikipedia.org/wiki/Advanced_Encryption_Standard" 
                 target="_blank" 
                 rel="noopener noreferrer">
                Mehr auf Wikipedia
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
        <div className="variant-select">
          <label htmlFor="variant">AES-Variante:</label>
          <select
            id="variant"
            value={variant}
            onChange={(e) => setVariant(e.target.value as AESVariant)}
          >
            <option value="128">AES-128 (16 Zeichen)</option>
            <option value="192">AES-192 (24 Zeichen)</option>
            <option value="256">AES-256 (32 Zeichen)</option>
          </select>
        </div>

        <div className="key-input">
          <label htmlFor="key">Schlüssel:</label>
          <input
            type="text"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={`Geben Sie einen ${getRequiredKeyLength(variant)}-Zeichen Schlüssel ein (nur ASCII-Zeichen)`}
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

export default AESCipher;
