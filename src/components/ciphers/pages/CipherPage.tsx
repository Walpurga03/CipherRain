import React, { useState } from 'react';
import CipherService from '../../../services/CipherService';
import InfoPopup from '../../common/popups/InfoPopup';

interface CipherPageProps {
  cipherId: string;
  onBack: () => void;
}

const CipherPage: React.FC<CipherPageProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [key, setKey] = useState('3'); // Default Caesar shift
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleEncrypt = () => {
    if (!input) return;
    setIsProcessing(true);
    try {
      const shift = parseInt(key) || 3;
      const result = CipherService.caesar.encrypt(input, shift);
      setOutput(result);
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Ein Fehler ist aufgetreten');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrypt = () => {
    if (!input) return;
    setIsProcessing(true);
    try {
      const shift = parseInt(key) || 3;
      const result = CipherService.caesar.decrypt(input, shift);
      setOutput(result);
    } catch (error) {
      console.error('Decryption error:', error);
      alert('Ein Fehler ist aufgetreten');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cipher-page">
      <div className="cipher-header">
        <button className="back-button" onClick={onBack}>←</button>
        <h2>Caesar Verschlüsselung</h2>
        <button className="info-button" onClick={() => setShowInfo(true)}>ℹ️</button>
      </div>

      <div className="cipher-content">
        <div className="input-group">
          <label>
            Verschiebung (Standard: 3)
            <input
              type="number"
              min="0"
              max="25"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="key-input"
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            Text
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Text zum Verschlüsseln/Entschlüsseln eingeben..."
              rows={4}
            />
          </label>
        </div>

        <div className="button-group">
          <button 
            onClick={handleEncrypt}
            disabled={isProcessing || !input}
            className="action-button"
          >
            Verschlüsseln
          </button>
          <button 
            onClick={handleDecrypt}
            disabled={isProcessing || !input}
            className="action-button"
          >
            Entschlüsseln
          </button>
        </div>

        <div className="output-group">
          <label>
            Ergebnis
            <textarea
              value={output}
              readOnly
              rows={4}
              placeholder="Hier erscheint das Ergebnis..."
            />
          </label>
        </div>
      </div>

      {showInfo && (
        <InfoPopup
          isOpen={true}
          onClose={() => setShowInfo(false)}
          title="Caesar-Verschlüsselung"
          content="Die Caesar-Verschlüsselung ist eines der einfachsten und bekanntesten Verschlüsselungsverfahren. Sie wurde nach Julius Caesar benannt, der sie zur geheimen Kommunikation mit seinen Generälen nutzte.

Bei dieser Verschlüsselung wird jeder Buchstabe im Klartext um eine bestimmte Anzahl von Stellen im Alphabet verschoben. Die Verschiebung (der Schlüssel) ist typischerweise 3, kann aber beliebig gewählt werden.

Beispiel mit Verschiebung 3:
A → D
B → E
C → F
...
Z → C"
          wikiLink="https://de.wikipedia.org/wiki/Caesar-Verschl%C3%BCsselung"
        />
      )}
    </div>
  );
};

export default CipherPage;
