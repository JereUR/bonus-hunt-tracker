import styled, { keyframes } from 'styled-components'

export default function Background() {
  return <StaticStyled></StaticStyled>
}

const interference = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
`

const StaticStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--secondary-color-background);
    opacity: 0.7;
    animation: ${interference} 1s infinite;
  }
`
