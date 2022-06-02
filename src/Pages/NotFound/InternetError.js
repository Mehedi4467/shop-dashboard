import React from 'react';
import errorImage from '../../Images/Error/error.webp';
const InternetError = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img src={errorImage} alt="error images" />
        </div>
    );
};

export default InternetError;