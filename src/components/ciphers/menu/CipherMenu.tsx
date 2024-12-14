import React from 'react';
import './CipherMenu.scss';

interface CipherOption {
  id: string;
  name: string;
  type: 'symmetric' | 'hash' | 'asymmetric';
  description: string;
  icon?: string;
}

interface CipherMenuProps {
  onSelect: (cipherId: string) => void;
}

const CipherMenu: React.FC<CipherMenuProps> = ({ onSelect }) => {
  const ciphers: CipherOption[] = [
    // Symmetrische Algorithmen
    { 
      id: 'caesar',
      name: 'Caesar Verschlüsselung',
      type: 'symmetric',
      description: 'Klassische Verschiebechiffre',
      icon: '⚔️'
    },
    { 
      id: 'vigenere',
      name: 'Vigenère Verschlüsselung',
      type: 'symmetric',
      description: 'Polyalphabetische Substitution mit Schlüsselwort',
      icon: '🔠'
    },
    { 
      id: 'blowfish',
      name: 'Blowfish Verschlüsselung',
      type: 'symmetric',
      description: 'Moderne symmetrische Blockchiffre',
      icon: '🐡'
    },
    { 
      id: 'aes',
      name: 'AES',
      type: 'symmetric',
      description: 'Advanced Encryption Standard - Modernster Verschlüsselungsstandard',
      icon: '🔒'
    },
    { 
      id: 'xor',
      name: 'XOR',
      type: 'symmetric',
      description: 'Einfache aber effektive XOR-Verschlüsselung',
      icon: '⊕'
    },
    // Hash Funktionen
    { 
      id: 'ripemd160',
      name: 'RIPEMD-160',
      type: 'hash',
      description: 'Kryptographische Hash-Funktion mit 160-Bit Ausgabe',
      icon: '#️⃣'
    },
    { 
      id: 'sha256',
      name: 'SHA-256',
      type: 'hash',
      description: 'Sicherer Hash-Algorithmus der SHA-2 Familie',
      icon: '🔐'
    },
    // Asymmetrischer Algorithmus
    { 
      id: 'rsa',
      name: 'RSA',
      type: 'asymmetric',
      description: 'Public-Key-Verschlüsselung für sichere Kommunikation',
      icon: '🔑'
    }
  ];

  return (
    <div className="cipher-menu">
      <div className="menu-content">
        <h2 data-text="Wähle eine Verschlüsselungsmethode">
          Wähle eine Verschlüsselungsmethode
        </h2>
        <div className="cipher-categories">
          <div className="category">
            <h3>Symmetrische Verschlüsselung</h3>
            <div className="cipher-grid">
              {ciphers.filter(c => c.type === 'symmetric').map(cipher => (
                <button
                  key={cipher.id}
                  className="cipher-button"
                  onClick={() => onSelect(cipher.id)}
                >
                  <div className="cipher-button-content">
                    <span className="cipher-name">{cipher.name}</span>
                    {cipher.icon && <span className="cipher-icon">{cipher.icon}</span>}
                    <span className="cipher-description">{cipher.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="category">
            <h3>Hash-Funktionen</h3>
            <div className="cipher-grid">
              {ciphers.filter(c => c.type === 'hash').map(cipher => (
                <button
                  key={cipher.id}
                  className="cipher-button"
                  onClick={() => onSelect(cipher.id)}
                >
                  <div className="cipher-button-content">
                    <span className="cipher-name">{cipher.name}</span>
                    {cipher.icon && <span className="cipher-icon">{cipher.icon}</span>}
                    <span className="cipher-description">{cipher.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="category">
            <h3>Asymmetrische Verschlüsselung</h3>
            <div className="cipher-grid">
              {ciphers.filter(c => c.type === 'asymmetric').map(cipher => (
                <button
                  key={cipher.id}
                  className="cipher-button"
                  onClick={() => onSelect(cipher.id)}
                >
                  <div className="cipher-button-content">
                    <span className="cipher-name">{cipher.name}</span>
                    <span className="cipher-description">{cipher.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CipherMenu;
