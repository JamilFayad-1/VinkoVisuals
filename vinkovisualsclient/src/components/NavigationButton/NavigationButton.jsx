import React from 'react';
import './NavigationButton.css';

const NavigationButton = ({ text, link }) => {
    return (
        <a className='navigation-button' href={link}>
            {text}
        </a>
    );
};

export default NavigationButton;
