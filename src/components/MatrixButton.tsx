import React from 'react';

interface MatrixButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const MatrixButton: React.FC<MatrixButtonProps> = ({ onClick, children }) => {
  return (
    <button className="matrix-button" onClick={onClick}>
      <div className="matrix-code" />
      {children}
    </button>
  );
};

export default MatrixButton;
