import React, { useState } from 'react';
import { CipherService } from '../../services/CipherService';

interface CipherPageProps {
  cipherId: string;
  onBack: () => void;
}

const CipherPage: React.FC<CipherPageProps> = ({ cipherId, onBack }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [key, setKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getCipherTitle = () => {
    switch (cipherId) {
      case 'caesar':
        return 'Caesar Verschlüsselung';
      case 'vigenere':
        return 'Vigenère Chiffre';
      case 'blowfish':
        return 'Blowfish';
      case 'aes':
        return 'AES';
      case 'xor':
        return 'XOR';
      case 'ripemd160':
        return 'RIPEMD-160';
      case 'sha256':
        return 'SHA-256';
      case 'rsa':
        return 'RSA';
      default:
        return 'Verschlüsselung';
    }
  };

  const handleEncrypt = async () => {
    if (!input) return;
    setIsProcessing(true);

    try {
      let result = '';
      switch (cipherId) {
        case 'caesar':
          const shift = parseInt(key) || 3; // Default shift of 3 if no key
          result = CipherService.caesar.encrypt(input, shift);
          break;
        case 'xor':
          if (!key) {
            alert('Bitte geben Sie einen Schlüssel ein');
            return;
          }
          result = CipherService.xor.encrypt(input, key);
          break;
        case 'sha256':
          result = await CipherService.sha256.hash(input);
          break;
        default:
          alert('Diese Verschlüsselungsmethode ist noch nicht implementiert');
          return;
      }
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
      let result = '';
      switch (cipherId) {
        case 'caesar':
          const shift = parseInt(key) || 3;
          result = CipherService.caesar.decrypt(input, shift);
          break;
        case 'xor':
          if (!key) {
            alert('Bitte geben Sie einen Schlüssel ein');
            return;
          }
          result = CipherService.xor.decrypt(input, key);
          break;
        default:
          alert('Diese Entschlüsselungsmethode ist noch nicht implementiert');
          return;
      }
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
        <button className="back-button" onClick={onBack}>
          ← Zurück
        </button>
        <h2>{getCipherTitle()}</h2>
      </div>
      
      <div className="cipher-content">
        <div className="input-section">
          <label>Eingabetext:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Gib hier deinen Text ein..."
          />
        </div>

        {cipherId !== 'ripemd160' && cipherId !== 'sha256' && (
          <div className="key-section">
            <label>
              {cipherId === 'caesar' ? 'Verschiebung (Standard: 3):' : 'Schlüssel:'}
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={cipherId === 'caesar' ? 'Zahl eingeben...' : 'Schlüssel eingeben...'}
            />
          </div>
        )}

        <div className="output-section">
          <label>Ergebnis:</label>
          <textarea
            value={output}
            readOnly
            placeholder="Hier erscheint das Ergebnis..."
          />
        </div>

        <div className="button-group">
          <button 
            className="action-button" 
            onClick={handleEncrypt}
            disabled={isProcessing || !input}
          >
            {cipherId === 'sha256' || cipherId === 'ripemd160' ? 'Hash berechnen' : 'Verschlüsseln'}
          </button>
          {cipherId !== 'ripemd160' && cipherId !== 'sha256' && (
            <button 
              className="action-button" 
              onClick={handleDecrypt}
              disabled={isProcessing || !input}
            >
              Entschlüsseln
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CipherPage;
