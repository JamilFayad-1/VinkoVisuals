import './landing-page.css'
import Lanyard from '../../components/Lanyard/Lanyard';
import { useRef, useState, useEffect } from 'react';
import * as THREE from "three";
import DistortedImageSlider from '../../components/DistortedImageSlider/DistortedImageSlider';
import gsap from '../../utils/gsapSetup';

function LandingPage() {

  const [opacity, setOpacity] = useState(1);
  const [isIdle, setIsIdle] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const idleState = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      const mouseAnimation = document.querySelector('.mouse-scroll-anim');

      const scrollY = window.scrollY;

      const windowHeight = window.innerHeight;
      const fadeStartCalculated = 0;
      const fadeEndCalculated = windowHeight * 0.65;

      const fadeStart = fadeStartCalculated;
      const fadeEnd = fadeEndCalculated;

      const newOpacity = 1 - Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
      setOpacity(newOpacity);

      if (newOpacity < 0.95) {
        mouseAnimation.style.opacity = 0;
      } else if (newOpacity >= 0.95) {
        mouseAnimation.style.opacity = 1;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {

    const mouseAnimation = document.querySelector('.landing-page-text-container-2-extra-info');
    const canvas = document.getElementById('canvas');
    if (!canvas || !mouseAnimation) return;

    const handleMouseDown = () => {
      mouseAnimation.style.opacity = 0;
      idleState.current = false;
      setIsIdle(false);
    }

    const handleMouseUp = () => {
      if (!idleState.current) {
        setTimeout(() => {
          mouseAnimation.style.opacity = 0.7;
          idleState.current = true;
          setIsIdle(true);
        }, 2000);
      }
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };

  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {

    const mouseIcon = document.querySelector('.mouse-scroll-anim');

    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      gsap.to(window, {
        scrollTo: {
          y: windowHeight,
          autokill: false
        }
      })
    };

    mouseIcon.addEventListener('click', handleScroll);

    return () => {
      mouseIcon.removeEventListener('click', handleScroll);
    };
  }, []);

  function useViewportHeight() {
    useEffect(() => {
      const setRealViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
  
      setRealViewportHeight();
      window.addEventListener('resize', setRealViewportHeight);
      window.addEventListener('orientationchange', setRealViewportHeight);
  
      return () => {
        window.removeEventListener('resize', setRealViewportHeight);
        window.removeEventListener('orientationchange', setRealViewportHeight);
      };
    }, []);
  }

  useViewportHeight();

  return (
    <div className='landing-page'>
      <div style={{ opacity, transition: 'opacity 0.2s ease-out' }} className='landing-page-container'>

        {!isMobile && (
          <div className='lanyard-container'>
            <Lanyard gravity={[0, -40, 0]} />
          </div>
        )}

        <div className='landing-page-text-container'>
          <h1>Vinko Visuals is a creative design and visual experience <span>agency</span></h1>
        </div>

        <div className='mouse-scroll-anim'>
          <svg id='mouseAnim' width="21" height="31" viewBox="0 0 21 31" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="20" height="30" rx="10" stroke="#333" fill="none" strokeWidth="1" />

            <rect x="10.2" y="5.2" width="1" height="6" fill="#333" strokeLinecap="round">
              <animate
                attributeName="y"
                values="5; 23"
                dur="1.2s"
                repeatCount="indefinite"
                keyTimes="0; 1"
              />
              <animate
                attributeName="opacity"
                values="1; 0; 0"
                dur="1.2s"
                repeatCount="indefinite"
                keyTimes="0; 0.95; 1"
              />
            </rect>
          </svg>
        </div>

      </div>

      <div className='landing-page-text-container-2'>
        <div className='landing-page-text-container-2-content-wrapper'>
          <div className='landing-page-text-container-2-content-wrapper-title'>
            <p>We create what your mind envisions — crafted with <span>precision</span>, powered by <span>emotion</span>.</p>
            <p>"Creativity is intelligence having fun." – Albert Einstein</p>
          </div>
          <div className='landing-page-text-container-2-content-wrapper-picture'>
            <canvas id="canvas">
              <DistortedImageSlider THREE={THREE} />
            </canvas>
          </div>
          <div className='landing-page-text-container-2-extra-info'>
            <svg className="arrow-hold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24" fill="none">
              <line x1="35" y1="12" x2="5" y2="12" stroke="#616161" strokeWidth="1" strokeLinecap="round" />
              <polyline points="11,8 5,12 11,16" fill="none" stroke="#616161" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Hold to scroll</p>
            <svg className="arrow-hold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24" fill="none">
              <line x1="5" y1="12" x2="35" y2="12" stroke="#616161" strokeWidth="1" strokeLinecap="round" />
              <polyline points="29,8 35,12 29,16" fill="none" stroke="#616161" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className='landing-page-text-container-3'>
      </div>
    </div>
  );
}

export default LandingPage;