import styled from 'styled-components'
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
        <h5>START:</h5>
        <p>{budget ? budget : '-'}</p>
      </div>
      <div className="data-container">
        <h5>CURRENT AVG:</h5>
        <p>{currentAvg ? currentAvg : '-'}</p>
      </div>
      <div className="data-container">
        <h5>REQUIRED AVG :</h5>
        {requiredAvg ? (
          <p>{requiredAvg <= 0 ? 'Profit' : requiredAvg}</p>
        ) : (
          <p>-</p>
        )}
      </div>
      <div className="data-container">
        <h5>BONUSES:</h5>
        <p>{bonusList.length}</p>
      </div>
      <div className="data-container">
        <h5>MAX WIN:</h5>
        <p>{maxWin ? maxWin : '-'}</p>
      </div>
      <div className="data-container">
        <h5>MAX X:</h5>
        <p>{maxOdd ? maxOdd : '-'}</p>
      </div>
      <div className="data-container">
        <h5>TOTAL WIN:</h5>
        <p>{totalWin ? totalWin : '-'}</p>
      </div>
      <div className="data-container">
        <h5>RESULTADO FINAL:</h5>
        <p className={finalResult < 0 ? 'loss' : 'profit'}>
          {finalResult > 0 ? `+ ${finalResult}` : finalResult}
        </p>
      </div>
    </RightSideStyled>
  )
}

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

  .data-container {
    .loss {
      color: var(--error-color);
    }

    .profit {
      color: var(--check-color);
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
