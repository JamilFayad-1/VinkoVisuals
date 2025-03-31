import '../styles/landing-page.css'
import Lanyard from '../components/Lanyard/Lanyard';
import lanyardTexture from '../components/Lanyard/lanyard.png';
import lanyardModel from '../components/Lanyard/card.glb';
import { useRef } from 'react';
import VariableProximity from '../components/VariableProximity/VariableProximity';

function LandingPage() {

  const containerRef = useRef(null);

  return (
    <div className='landing-page-container'>
      {/* <div
        ref={containerRef}
        style={{ position: 'relative' }}
      >
        <VariableProximity
          label={'Vinko Visuals'}
          className={'variable-proximity-demo'}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff='linear'
        />
      </div> */}

      <div className='lanyard-container'>
        <Lanyard gravity={[0, -40, 0]} />
      </div>
    </div>
  );
}

export default LandingPage;