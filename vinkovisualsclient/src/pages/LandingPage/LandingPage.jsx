import './landing-page.css'
import Lanyard from '../../components/Lanyard/Lanyard';
import lanyardTexture from '../../components/Lanyard/lanyard.png';
import lanyardModel from '../../components/Lanyard/card.glb';
import { useRef, useState, useEffect } from 'react';
import VariableProximity from '../../components/VariableProximity/VariableProximity';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import DistortedImageSlider from '../../components/DistortedImageSlider/DistortedImageSlider';
import NavigationButton from '../../components/NavigationButton/NavigationButton';

function LandingPage() {

  const [opacity, setOpacity] = useState(1);

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

      if(newOpacity < 0.9) {
        mouseAnimation.style.opacity = 0;
      }else if(newOpacity >= 1) {
        mouseAnimation.style.opacity = 1;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <>
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
          <svg width="21" height="31" viewBox="0 0 21 31" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="20" height="30" rx="10" stroke="#333" fill="none" stroke-width="1" />

            <rect x="10.2" y="5.2" width="1" height="6" fill="#333" stroke-linecap="round">
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
          <div className='landing-page-text-container-2-content-wrapper-button-conversion'>
            <NavigationButton text="Browse the Catalog" link="/catalog" />
          </div>
        </div>
      </div>

      <div className='landing-page-text-container-3'>

      </div>
    </>
  );
}

export default LandingPage;