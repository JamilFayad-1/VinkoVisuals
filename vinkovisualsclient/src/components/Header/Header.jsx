import { useEffect, useState } from 'react';
import './header.css'
import GooeyNav from '../GooeyNav/GooeyNav'

function Header() {

    const items = [
        { label: "Catalog", href: "#" },
        { label: "Vision to reality", href: "#" },
        { label: "Shop", href: "#" },
        { label: "Contact", href: "#" },
    ];

    const brandName = "Vinko Visuals";
    
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleLetterHover = (index) => {
        setHoveredIndex(index);
    };
    
    const handleLetterLeave = () => {
        setHoveredIndex(null);
    };

    const renderAnimatedBrandName = () => {
        return brandName.split('').map((letter, index) => {
            if (letter === ' ') {
                return <span key={index} className="brand-letter-space">&nbsp;</span>;
            }
            
            return (
                <span
                    key={index}
                    className={`brand-letter ${hoveredIndex === index ? 'hovered' : ''}`}
                    onMouseEnter={() => handleLetterHover(index)}
                    onMouseLeave={handleLetterLeave}
                >
                    {letter}
                </span>
            );
        });
    };

    return (
        <div className='header-container'>
            <h1 id='animatedBrandName'>{renderAnimatedBrandName()}</h1>
            <nav className='header-nav'>
                <GooeyNav
                    items={items}
                    animationTime={200}
                    pCount={1}
                    minDistance={10}
                    maxDistance={35}
                    maxRotate={75}
                    colors={[5, 6, 7, 8]}
                    timeVariance={900}
                />
            </nav>
        </div>
    );

}

export default Header;
