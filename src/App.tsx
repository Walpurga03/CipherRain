import { useState } from 'react';
import MatrixRain from './MatrixRain';
import MatrixButton from './components/MatrixButton';

function App() {
  const [isEntered, setIsEntered] = useState(false);

  const handleEnterMatrix = () => {
    setIsEntered(true);
  };

  return (
    <div className="app">
      <MatrixRain />
      <div className="content">
        {!isEntered && (
          <div className="enter-matrix">
            <MatrixButton onClick={handleEnterMatrix}>
              Enter The Matrix
            </MatrixButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
