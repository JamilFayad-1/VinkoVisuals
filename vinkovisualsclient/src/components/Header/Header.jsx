import { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.css'

function Header() {

    const brandName = "Vinko Visuals";

    const glowColors = [
        '#FFADAD',
        '#FFD6A5',
        '#FDFFB6',
        '#CAFFBF',
        '#9BF6FF',
        '#A0C4FF',
        '#BDB2FF', 
        '#FFC6FF'  
    ];

    const glowColors2 = [
        '#1783be',
        '#0077b6',
        '#54a6d3',
        '#a3d0e9',
        '#cce6f3',
        '#006aa3',
        '#00598a'  
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredColor, setHoveredColor] = useState(null);
    const [isEasterEggActive, setIsEasterEggActive] = useState(false);
    const logoEasterEggIndexRef = useRef(0);
    const lettersRef = useRef([]);

    // Faire la fonction de getRandomColor2 

    const getRandomColor2 = () => {
        return glowColors2[Math.floor(Math.random() * glowColors.length)];
    }

    const getRandomColor = () => { 
        return glowColors[Math.floor(Math.random() * glowColors.length)];
    };

    const triggerEasterEgg = () => {
        setIsEasterEggActive(true);

        // Generate all random colors at once
        const randomColors = lettersRef.current.map(() => ({
            color1: getRandomColor(),
            color2: getRandomColor(),
            color3: getRandomColor(),
            color4: getRandomColor(),
            color5: getRandomColor()
        }));

        // Set the easter egg class on all letters using a single requestAnimationFrame
        requestAnimationFrame(() => {
            lettersRef.current.forEach((letter, i) => {
                if (!letter) return;

                letter.classList.add('brand-letter-easter-egg');

                letter.style.animationDelay = `${i * 30}ms`;
                letter.style.setProperty('--glow-color1', randomColors[i].color1);
                letter.style.setProperty('--glow-color2', randomColors[i].color2);
                letter.style.setProperty('--glow-color3', randomColors[i].color3);
                letter.style.setProperty('--glow-color4', randomColors[i].color4);
                letter.style.setProperty('--glow-color5', randomColors[i].color5);
            });
        });

        // Reset after animation completes
        setTimeout(() => {
            requestAnimationFrame(() => {
                lettersRef.current.forEach(letter => {
                    if (!letter) return;

                    letter.classList.remove('brand-letter-easter-egg');

                    letter.style.removeProperty('--glow-color1');
                    letter.style.removeProperty('--glow-color2');
                    letter.style.removeProperty('--glow-color3');
                    letter.style.removeProperty('--glow-color4');
                    letter.style.removeProperty('--glow-color5');
                    letter.style.removeProperty('animation-delay');
                });

                setIsEasterEggActive(false);
                logoEasterEggIndexRef.current = 0;
            });
        }, 2200);
    };

    const handleLetterHover = (index) => {
        if (isEasterEggActive) return;

        logoEasterEggIndexRef.current += 1;

        if (logoEasterEggIndexRef.current >= 25) {
            triggerEasterEgg();
        } else {
            setHoveredIndex(index);
            setHoveredColor(getRandomColor2());
        }
    };

    const handleLetterLeave = () => {
        setHoveredIndex(null);
    };

    const renderAnimatedBrandName = () => {
        return brandName.split('').map((letter, index) => {
            if (letter === ' ') {
                return <span key={`space-${index}`} className="brand-letter-space">&nbsp;</span>;
            }

            const isHovered = hoveredIndex === index;
            const style = isHovered ? {
                color: hoveredColor,
                textShadow: `0 0 10px ${hoveredColor}80, 0 0 15px ${hoveredColor}40`,
                transform: 'translateY(-5px) scale(1.1)'
                
            } : {};

            return (
                <NavLink
                    to="/"
                    key={`letter-${index}`}
                    className="brand-letter"
                    style={style}
                    ref={el => lettersRef.current[index] = el}
                    onMouseEnter={() => handleLetterHover(index)}
                    onMouseLeave={handleLetterLeave}
                >
                    {letter}
                </NavLink>
            );
        });
    };

    return (
        <div className='header-container'>
            <h1 id='animatedBrandName'>{renderAnimatedBrandName()}</h1>
            <nav className='header-nav'>
                <ul>
                    <li><NavLink to="/catalog" className={({ isActive }) => isActive ? "active" : ""}>Catalog</NavLink></li>
                    <li><NavLink to="/vision" className={({ isActive }) => isActive ? "active" : ""}>Vision to reality</NavLink></li>
                    <li><NavLink to="/shop" className={({ isActive }) => isActive ? "active" : ""}>Shop</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink></li>
                </ul>
            </nav>
        </div>
    );

}

export default Header;
