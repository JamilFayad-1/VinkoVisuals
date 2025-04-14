import React, {useRef} from 'react';
import './NavigationButton.css';

const NavigationButton = ({ text, link }) => {

    const btnRef = useRef();

    const handleMouseMove = (e) => {
        const button = btnRef.current;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    };

    return (
        <a className='navigation-button' href={link} ref={btnRef} onMouseMove={handleMouseMove}>
            {text}
        </a>
    );
};

export default NavigationButton;
