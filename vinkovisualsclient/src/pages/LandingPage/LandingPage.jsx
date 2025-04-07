import './landing-page.css'
import Lanyard from '../../components/Lanyard/Lanyard';
import lanyardTexture from '../../components/Lanyard/lanyard.png';
import lanyardModel from '../../components/Lanyard/card.glb';
import { useRef } from 'react';
import VariableProximity from '../../components/VariableProximity/VariableProximity';

function LandingPage() {

  const containerRef = useRef(null);

  return (
    <div className='landing-page-container'>

      <div className='lanyard-container'>
        <Lanyard gravity={[0, -40, 0]} />
      </div>

      <div className='landing-page-text-container'>
        <h1>Vinko Visuals is a creative design and visual experience <span>agency</span></h1>
      </div>
      
    </div>
  );
}

export default LandingPage;