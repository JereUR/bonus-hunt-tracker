import styled, { keyframes } from 'styled-components'

export default function Loader({ customClass = '' }) {
  return <LoaderStyled className={customClass}></LoaderStyled>
}

const spinnerAction = keyframes`
  100% {
    transform: rotate(1turn);
  }
`

const LoaderStyled = styled.div`
  width: 28px;
  height: 28px;
  display: grid;
  border: 4.5px solid #0000;
  border-radius: 50%;
  border-color: var(--primary-color) #0000;
  animation: ${spinnerAction} 1.5s infinite linear;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 2.2px;
    border: inherit;
    border-radius: 50%;
  }

  &::before {
    border-color: var(--secondary-color) #0000;
    animation: inherit;
    animation-duration: 1s;
    animation-direction: reverse;
  }

  &::after {
    margin: 8.9px;
  }
`
