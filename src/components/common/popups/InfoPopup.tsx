import React from 'react';

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  wikiLink?: string;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ isOpen, onClose, title, content, wikiLink }) => {
  if (!isOpen) return null;

  return (
    <div className="info-popup-overlay" onClick={onClose}>
      <div className="info-popup" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h3>{title}</h3>
        <div className="content">
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {wikiLink && (
          <div className="wiki-link">
            <a href={wikiLink} target="_blank" rel="noopener noreferrer">
              Mehr auf Wikipedia →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPopup;
