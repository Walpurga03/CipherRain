import { useEffect, useState } from 'react';

interface MatrixTerminalProps {
  messages: string[];
  onComplete: () => void;
}

const MatrixTerminal: React.FC<MatrixTerminalProps> = ({ messages, onComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      setTimeout(onComplete, 2000);
      return;
    }

    const currentMessage = messages[currentMessageIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayedText(currentMessage.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1);
          setIsTyping(true);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex, messages, onComplete]);

  return (
    <div className="matrix-terminal">
      <div className="matrix-terminal-text">
        {displayedText}
        {isTyping && <span className="cursor">_</span>}
      </div>
    </div>
  );
};

export default MatrixTerminal;
