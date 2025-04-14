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

  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const slowScrollRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
        slowScrollRef.current.style.opacity = 1 - `${scrollDistance / sectionHeight * 1.4}`;
        slowScrollRef.current.style.filter = `blur(${scrollDistance / sectionHeight * 5}px)`;
      }
    }
  }, [scrollY]);

  return (
    <>
      <div ref={slowScrollRef} className='landing-page-container'>

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
            <button>Browse the Catalog</button>
          </div>
        </div>
      </div>

      <div className='landing-page-text-container-3'>
        <NavigationButton text="Browse the Catalog" link="/catalog" />
      </div>
    </>
  );
}

export default LandingPage;