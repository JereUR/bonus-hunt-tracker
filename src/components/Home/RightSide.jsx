import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import useGetAttributesDetails from '../../utils/useGetAttributesDetails'

export default function RightSide() {
  const { budget, bonusList } = useGlobalContext()
  const { maxWin, maxOdd, currentAvg, requiredAvg } = useGetAttributesDetails()
  console.log({ maxWin })
  console.log({ maxOdd })
  console.log({ currentAvg })
  console.log({ requiredAvg })

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
        <p>{requiredAvg ? requiredAvg : '-'}</p>
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color3);
    border-radius: 5px;
  }
`
