import './landing-page.css'
import Lanyard from '../../components/Lanyard/Lanyard';
import lanyardTexture from '../../components/Lanyard/lanyard.png';
import lanyardModel from '../../components/Lanyard/card.glb';
import { useRef } from 'react';
import VariableProximity from '../../components/VariableProximity/VariableProximity';

function LandingPage() {

  const containerRef = useRef(null);

  return (
    <>
      <div className='landing-page-container'>

        <div className='lanyard-container'>
          <Lanyard gravity={[0, -40, 0]} />
        </div>

        <div className='landing-page-text-container'>
          <h1>Vinko Visuals is a creative design and visual experience <span>agency</span></h1>
        </div>

      </div>

      <div className='landing-page-text-container-2'>
        <div className="curved-container">
          <svg viewBox="0 0 100 25" className="curve" preserveAspectRatio="none">
            <path d="M 0 10 Q 50 -10 100 10 L 100 100 L 0 100 Z" fill="#c4e0ef" />
          </svg>
        </div>
        <div className='landing-page-text-container-2-content-wrapper'>

        </div>
      </div>
    </>
  );
}

export default LandingPage;