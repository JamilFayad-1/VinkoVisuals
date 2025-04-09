import './landing-page.css'
import Lanyard from '../../components/Lanyard/Lanyard';
import lanyardTexture from '../../components/Lanyard/lanyard.png';
import lanyardModel from '../../components/Lanyard/card.glb';
import { useRef, useState, useEffect } from 'react';
import VariableProximity from '../../components/VariableProximity/VariableProximity';

function LandingPage() {

  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const slowScrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (slowScrollRef.current) {
      const sectionTop = slowScrollRef.current.offsetTop;
      const sectionHeight = slowScrollRef.current.offsetHeight;

      if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        const scrollDistance = (scrollY - sectionTop) * 0.5;
        slowScrollRef.current.style.transform = `translateY(${scrollDistance}px)`;
        slowScrollRef.current.style.opacity =  1 - `${scrollDistance/sectionHeight * 1.4}`;
        slowScrollRef.current.style.filter = `blur(${scrollDistance/sectionHeight * 5}px)`;
      }
    }
  }, [scrollY]);

  return (
    <>
      <div ref={slowScrollRef} className='landing-page-container'>

        <div className='lanyard-container'>
          <Lanyard gravity={[0, -40, 0]} />
        </div>

        <div className='landing-page-text-container'>
          <h1>Vinko Visuals is a creative design and visual experience <span>agency</span></h1>
        </div>

      </div>

      <div className='transition-shape'>
        <div className="curved-container">
          <svg viewBox="0 0 100 99" className="curve" preserveAspectRatio="none">
            <path d="M 0 100 L 100 100 Q 50 -100 0 100 Z" fill="#c4e0ef" />
          </svg>
        </div>
        <div className='transition-middle-shape'></div>
        <div className="curved-container">
          <svg viewBox="0 0 100 50" className="curve" preserveAspectRatio="none">
            <path d="M 0 0 L 100 0 Q 50 100 0 0 Z" fill="#c4e0ef" />
          </svg>
        </div>
      </div>

      <div className='landing-page-text-container-2'>
        <div className='landing-page-text-container-2-content-wrapper'>
        </div>
      </div>
    </>
  );
}

export default LandingPage;