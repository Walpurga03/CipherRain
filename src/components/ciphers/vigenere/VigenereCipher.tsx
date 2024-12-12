import React, { useState, useEffect, useCallback } from 'react';
import { VigenereService } from '../../../services/ciphers/VigenereService';
import './VigenereCipher.scss';

interface VigenereCipherProps {
  onBack: () => void;
}

const vigenereInfo = {
  title: "Vigenère Verschlüsselung",
  description: `Die Vigenère-Verschlüsselung ist eine der faszinierendsten historischen Verschlüsselungsmethoden. Sie wurde im 16. Jahrhundert entwickelt und galt über 300 Jahre als "unknackbar".

  So funktioniert's:
  1. Wähle ein Schlüsselwort (z.B. "KEY")
  2. Wiederhole das Schlüsselwort unter dem Text
  3. Jeder Buchstabe des Schlüssels verschiebt den darüberliegenden Buchstaben
     K = 10 Positionen
     E = 4 Positionen
     Y = 24 Positionen

  Beispiel:
  Text:     HALLO WELT
  Schlüssel: KEYKE YKEY
  Ergebnis:  RIJVZ UCJR

  Besonderheiten:
  ✓ Jeder Buchstabe wird unterschiedlich verschoben
  ✓ Gleiche Buchstaben im Text werden verschieden verschlüsselt
  ✓ Je länger der Schlüssel, desto sicherer die Verschlüsselung

  Historische Bedeutung:
  Diese Methode wurde von Diplomaten und Militärs verwendet und als "le chiffre indéchiffrable" (die unknackbare Verschlüsselung) bezeichnet. Erst im 19. Jahrhundert wurde sie von Friedrich Kasiski geknackt.

  Tipp: Verwende lange, zufällige Schlüsselwörter für bessere Sicherheit!`,
};

export const VigenereCipher: React.FC<VigenereCipherProps> = ({ onBack }) => {
  const [key, setKey] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState(false);

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

  const processText = useCallback(() => {
    if (input && key) {
      const result = isEncrypting 
        ? VigenereService.encrypt(input, key)
        : VigenereService.decrypt(input, key);
      setOutput(result);
    } else {
      setOutput('');
    }
  }, [input, key, isEncrypting]);

  return (
    <div className="vigenere-cipher">
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
        <h2>Vigenère Verschlüsselung</h2>
      </div>

      <div className="shift-control">
        <div className="shift-label">Schlüssel</div>
        <input
          type="text"
          className="shift-input"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Schlüssel eingeben..."
        />
      </div>

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

      <div className="text-area">
        <label>Text eingeben</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isEncrypting ? "Text zum Verschlüsseln..." : "Text zum Entschlüsseln..."}
        />
      </div>

      <div className="text-area">
        <label>Ergebnis</label>
        <textarea
          value={output}
          readOnly
          placeholder="Ergebnis erscheint hier..."
        />
      </div>

      {showInfo && (
        <div className="info-overlay" onClick={() => setShowInfo(false)}>
          <div className="info-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowInfo(false)}>×</button>
            <h3>{vigenereInfo.title}</h3>
            <div className="info-text">
              {vigenereInfo.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="wiki-link">
              <a href="https://de.wikipedia.org/wiki/Vigenère-Chiffre" 
                 target="_blank" 
                 rel="noopener noreferrer">
                Mehr auf Wikipedia
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VigenereCipher;
