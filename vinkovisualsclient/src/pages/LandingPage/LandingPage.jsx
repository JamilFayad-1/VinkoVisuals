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
      const scrollY = window.scrollY;

      const windowHeight = window.innerHeight;
      const fadeStartCalculated = windowHeight;
      const fadeEndCalculated = windowHeight * 0.65;

      const fadeStart = fadeStartCalculated;
      const fadeEnd = fadeEndCalculated;

      const newOpacity = 1 - Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
      setOpacity(newOpacity);
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