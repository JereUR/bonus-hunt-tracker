import styled, { keyframes } from 'styled-components'

import { useWindowSize } from '../../utils/useWindowSize'

export default function Orb() {
  const { width, height } = useWindowSize()

  const moveOrb = keyframes`
    0% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(${width / 1.2}px, ${height / 2}px);
    }

    100% {
      transform: translate(0, 0);
    }
  `

  const moveOrbResponsive = keyframes`
    0% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(${width / 1.3}px, ${height / 2.5}px);
    }

    100% {
      transform: translate(0, 0);
    }
  `

  const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -35vh;
    margin-top: -35vh;
    background: linear-gradient(
      180deg,
      rgb(102, 0, 153) 0%,
      rgb(204, 0, 255) 100%
    );
    filter: blur(400px);
    animation: ${moveOrb} 15s alternate linear infinite;

    @media screen and (max-width: 480px) {
      width: 40vh;
      height: 40vh;
      animation: ${moveOrbResponsive} 10s alternate linear infinite;
    }
  `

  return <OrbStyled width={width} height={height} />
}
