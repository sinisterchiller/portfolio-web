import { createPortal } from 'react-dom';
import Particles from './Particles';

function ParticlesBackground() {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <Particles
      particleColors={['#ffffff', '#ffffff']}
      particleCount={200}
      particleSpread={10}
      speed={0.1}
      particleBaseSize={100}
      moveParticlesOnHover={true}
      particleHoverFactor={3}
      alphaParticles={false}
      disableRotation={false}
    />,
    document.body
  );
}

export default ParticlesBackground;

