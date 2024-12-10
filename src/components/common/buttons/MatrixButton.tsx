import { ButtonHTMLAttributes } from 'react';
import './MatrixButton.scss';

interface MatrixButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MatrixButton: React.FC<MatrixButtonProps> = ({ children, ...props }) => {
  return (
    <div className="matrix-button-container">
      <button className="matrix-button" {...props}>
        {children}
      </button>
    </div>
  );
};

export default MatrixButton;
