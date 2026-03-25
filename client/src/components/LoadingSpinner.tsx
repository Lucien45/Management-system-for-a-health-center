import React from 'react';
import '../assets/LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
    return(
        <div className="spinner-container">
            <div className="loading">
                <svg height="48px" width="64px">
                <polyline id="back" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" />
                <polyline id="front" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" />
                </svg>
            </div>
        </div>
    );
};

export default LoadingSpinner;
