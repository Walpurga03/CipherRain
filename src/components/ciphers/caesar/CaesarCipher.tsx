import React, { useState, useEffect } from 'react';
import CipherService from '../../../services/CipherService';
import InfoPopup from '../../common/popups/InfoPopup';
import './CaesarCipher.scss';

interface CaesarCipherProps {
  onBack: () => void;
}

export const CaesarCipher: React.FC<CaesarCipherProps> = ({ onBack }) => {
  const [shift, setShift] = useState<number>(3);
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    processText();
  }, [input, shift, isEncrypting]);

  const processText = () => {
    if (input) {
      const result = isEncrypting 
        ? CipherService.caesar.encrypt(input, shift)
        : CipherService.caesar.decrypt(input, shift);
      setOutput(result);
    } else {
      setOutput('');
    }
  };

  const handleShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setShift(value);
  };

  const caesarInfo = {
    title: "Caesar Verschlüsselung",
    description: `Die Caesar-Verschlüsselung ist eine der ältesten und einfachsten Verschlüsselungsmethoden. 
    Jeder Buchstabe im Klartext wird um eine bestimmte Anzahl von Positionen im Alphabet verschoben.

    Beispiel mit Verschiebung 3:
    A → D, B → E, C → F, usw.
    
    Vorteile:
    - Einfach zu verstehen und anzuwenden
    - Schnelle Verschlüsselung und Entschlüsselung
    
    Nachteile:
    - Sehr unsicher, da es nur 25 mögliche Schlüssel gibt
    - Anfällig für Häufigkeitsanalysen
    
    Historisch wurde diese Verschlüsselung von Julius Caesar für militärische Kommunikation verwendet.`,
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
        <h2>Caesar Verschlüsselung</h2>
      </div>

      <div className="shift-control">
        <div className="shift-label">Verschiebung</div>
        <input
          type="number"
          className="shift-input"
          value={shift}
          onChange={handleShiftChange}
          min="0"
          max="25"
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
        <textarea value={output} readOnly placeholder="Hier erscheint das Ergebnis..." />
      </div>

      <InfoPopup
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title={caesarInfo.title}
        content={caesarInfo.description}
      />
    </div>
  );
};

export default CaesarCipher;
