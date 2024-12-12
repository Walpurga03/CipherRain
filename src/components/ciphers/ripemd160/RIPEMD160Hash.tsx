import React, { useState } from 'react';
import MatrixButton from '../../common/buttons/MatrixButton';
import { RIPEMD160Service } from '../../../services/ciphers/RIPEMD160Service';
import './RIPEMD160Hash.scss';

interface RIPEMD160Props {
    onBack: () => void;
}

const RIPEMD160Hash: React.FC<RIPEMD160Props> = ({ onBack }) => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        setError('');
        try {
            if (value) {
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

    const handleCopyClick = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="ripemd160-cipher cipher-container">
            <div className="cipher-header">
                <div className="nav-buttons">
                    <MatrixButton onClick={onBack} className="back-button">
                        <span className="back-icon">←</span>
                        <span>Zurück</span>
                    </MatrixButton>
                </div>
                <h2>RIPEMD-160 Hash</h2>
            </div>

            <div className="cipher-content">
                <div className="input-section">
                    <label>Text zum Hashen:</label>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Geben Sie den Text ein..."
                        className="matrix-textarea"
                    />
                    {error && <div className="error-message">{error}</div>}
                </div>

                <div className="output-section">
                    <label>Hash-Ausgabe:</label>
                    <div className="output-container">
                        <input
                            type="text"
                            value={output}
                            readOnly
                            className="matrix-input"
                            placeholder="Hash wird hier angezeigt..."
                        />
                        {output && (
                            <MatrixButton onClick={handleCopyClick} className="copy-button">
                                Kopieren
                            </MatrixButton>
                        )}
                    </div>
                </div>

                <div className="wiki-link">
                    <a href="https://de.wikipedia.org/wiki/RIPEMD" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        Mehr auf Wikipedia
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RIPEMD160Hash;
