import React, { useState } from 'react';
import { RIPEMD160Service } from '../../../services/ciphers/RIPEMD160Service';
import './RIPEMD160Hash.scss';

interface RIPEMD160Props {
    onBack: () => void;
}

const RIPEMD160Hash: React.FC<RIPEMD160Props> = ({ onBack }) => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        setError('');
        
        try {
            if (value.trim()) {
                const hashedText = RIPEMD160Service.hash(value);
                setOutput(hashedText);
            } else {
                setOutput('');
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(output);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };

    return (
        <div className="ripemd160-container">
            <div className="ripemd160-header">
                <div className="ripemd160-nav">
                    <button onClick={onBack} className="ripemd160-back-btn">
                        <span className="ripemd160-back-icon">←</span>
                        <span>Zurück</span>
                    </button>
                    <button onClick={toggleInfo} className="ripemd160-info-btn">
                        {showInfo ? 'Info ausblenden' : 'Info anzeigen'}
                    </button>
                </div>
                <h2 className="ripemd160-title">RIPEMD-160 Hash</h2>
            </div>

            {showInfo && (
                <div className="ripemd160-info">
                    <h3>Über RIPEMD-160</h3>
                    <p>
                        RIPEMD-160 (RACE Integrity Primitives Evaluation Message Digest) ist eine kryptographische Hash-Funktion, 
                        die einen 160-Bit (20-Byte) Hash-Wert erzeugt. Sie wurde als Alternative zu SHA-1 entwickelt und wird 
                        häufig in Kryptowährungen wie Bitcoin verwendet.
                    </p>
                    <p>
                        Eigenschaften von RIPEMD-160:
                    </p>
                    <ul>
                        <li>Erzeugt einen 160-Bit (40 Zeichen in Hexadezimal) Hash-Wert</li>
                        <li>Kollisionsresistent: Es ist praktisch unmöglich, zwei verschiedene Eingaben zu finden, die den gleichen Hash ergeben</li>
                        <li>Deterministisch: Die gleiche Eingabe erzeugt immer den gleichen Hash-Wert</li>
                        <li>Lawineneffekt: Kleine Änderungen in der Eingabe führen zu völlig anderen Hash-Werten</li>
                    </ul>
                </div>
            )}

            <div className="ripemd160-content">
                <div className="ripemd160-input-section">
                    <label htmlFor="input-text" className="ripemd160-label">Text zum Hashen:</label>
                    <textarea
                        id="input-text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Geben Sie den Text ein..."
                        className="ripemd160-textarea"
                        autoComplete="off"
                        spellCheck="false"
                    />
                    {error && <div className="ripemd160-error">{error}</div>}
                </div>

                <div className="ripemd160-output-section">
                    <label htmlFor="output-text" className="ripemd160-label">Hash-Ausgabe:</label>
                    <div className="ripemd160-output-container">
                        <input
                            id="output-text"
                            type="text"
                            value={output}
                            readOnly
                            className="ripemd160-output"
                            placeholder="Hash wird hier angezeigt..."
                        />
                        {output && (
                            <button onClick={handleCopyClick} className="ripemd160-copy-btn">
                                Kopieren
                            </button>
                        )}
                    </div>
                </div>

                <div className="ripemd160-wiki">
                    <a href="https://de.wikipedia.org/wiki/RIPEMD" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="ripemd160-wiki-link">
                        Mehr auf Wikipedia
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RIPEMD160Hash;
