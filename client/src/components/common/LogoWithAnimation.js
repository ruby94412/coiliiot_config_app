import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { logoPaths } from './pathConstants';

function LogoWithAnimation({
  themeMode,
  theme,
}) {
  const boxStyle = {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
  const pathsRef = useRef([]);

  const runAnimation = () => {
    gsap.registerPlugin();
    const paths = pathsRef.current;
    gsap.fromTo(
      paths.slice(0, 13),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.15,
      },
    );
    gsap.fromTo(
      paths.slice(13),
      { x: '700%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 0.75,
        ease: 'power2.out',
        stagger: 0.25,
      },
    );
  };

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <div style={boxStyle}>
      <svg width="780pt" height="300pt" viewBox="0 0 1317 501">
        <g
          transform="translate(0 ,501) scale(0.1,-0.1)"
          fill={themeMode === 'dark' ? 'white' : theme.palette.primary.main}
        >
          {logoPaths.map(
            (path, idx) => (
              <path d={path} key={idx} ref={(el) => { pathsRef.current[idx] = el; }} />
            ),
          )}
        </g>
      </svg>
    </div>
  );
}

export default LogoWithAnimation;
