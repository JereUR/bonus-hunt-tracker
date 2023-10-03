import styled, { keyframes } from 'styled-components'

import { useGlobalContext } from '../../context/globalContext'
import useGetAttributesDetails from '../../utils/useGetAttributesDetails'

export default function RightSide() {
  const { budget, bonusList } = useGlobalContext()
  const { maxWin, maxOdd, currentAvg, requiredAvg, totalWin } =
    useGetAttributesDetails()

  const finalResult = totalWin - budget
  return (
    <RightSideStyled>
      <div className="data-container">
        <h3>START</h3>
        <p>{budget ? `$${budget}` : '-'}</p>
      </div>
      <div className="data-container">
        <h3>CURRENT AVG</h3>
        <p>{currentAvg ? `x ${currentAvg}` : '-'}</p>
      </div>
      <div className="data-container">
        <h3>REQUIRED AVG</h3>
        {requiredAvg ? (
          <p>{requiredAvg <= 0 ? 'PROFIT' : `x ${requiredAvg}`}</p>
        ) : (
          <p>-</p>
        )}
      </div>
      <div className="data-container">
        <h3>BONUSES</h3>
        <p>{bonusList.length}</p>
      </div>
      <div className="data-container">
        <h3>MAX WIN</h3>
        <p>{maxWin ? `$${maxWin}` : '-'}</p>
      </div>
      <div className="data-container">
        <h3>MAX X</h3>
        <p>{maxOdd ? `x ${maxOdd}` : '-'}</p>
      </div>
      <div className="data-container">
        <h3>TOTAL WIN</h3>
        <p>{totalWin ? `$${totalWin}` : '-'}</p>
      </div>
      <div className="data-container balance ">
        <h2>BALANCE</h2>
        <p className={finalResult < 0 ? 'loss' : 'profit'}>
          {finalResult > 0 ? `+ $${finalResult}` : `$${finalResult}`}
        </p>
      </div>
    </RightSideStyled>
  )
}

const rotateBorder = keyframes`
  0% {
    border-image-source: linear-gradient(to right, var(--secondary-color), var(--primary-color));
  }
  25% {
    border-image-source: linear-gradient(to bottom, var(--secondary-color), var(--primary-color));
  }
  50% {
    border-image-source: linear-gradient(to left, var(--secondary-color), var(--primary-color));
  }
  75% {
    border-image-source: linear-gradient(to top, var(--secondary-color), var(--primary-color));
  }
  100% {
    border-image-source: linear-gradient(to right, var(--secondary-color), var(--primary-color));
  }
`

const RightSideStyled = styled.div`
  flex: 1;
  background: rgba(10, 10, 10, 0.78);
  border: 3px solid var(--secondary-color);
  backdrop-filter: blur(4.5px);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;

  .balance {
    margin: 40px 15px 40px 15px !important;

    p {
      font-size: 26px !important;
    }

    .loss {
      color: var(--error-color);
    }

    .profit {
      color: var(--check-color);
    }
  }

  .data-container {
    padding: 5px;
    margin: 20px 50px;
    border-radius: 10px;
    background-color: var(--background-home-color);
    border: 1px solid;
    border-image-slice: 1;
    animation: ${rotateBorder} 8s infinite linear;
    line-height: 5px;

    h2 {
      position: relative;
      display: inline-block;
      letter-spacing: 8px;
      color: var(--secondary-color);
      text-shadow: 3px 3px 5px var(--primary-color3);

      &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--secondary-color);
        z-index: -1;
        text-shadow: inherit;
      }
    }

    h3 {
      position: relative;
      display: inline-block;
      letter-spacing: 2px;
      color: var(--secondary-color);
      text-shadow: 3px 3px 5px var(--primary-color3);

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--secondary-color);
        z-index: -1;
        text-shadow: inherit;
      }
    }

    p {
      font-size: 20px;
      font-weight: bold;
    }

    @media (max-width: 1000px) {
      line-height: 20px;
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color3);
    border-radius: 5px;
  }
`
