import styled, { keyframes } from 'styled-components'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

export default function Home() {
  return (
    <HomeStyled>
      <LeftSide />
      <RightSide />
    </HomeStyled>
  )
}

const HomeStyled = styled.div`
  display: flex;
  height: 90vh;
  overflow-y: hidden;
`
