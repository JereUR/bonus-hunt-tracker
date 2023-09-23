import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

export default function RightSide() {
  const { budget, bonusList, onRun } = useGlobalContext()

  return <RightSideStyled>{budget}</RightSideStyled>
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
`
