import styled from 'styled-components'

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
  padding: 2rem;
  overflow-y: hidden;

  //Responsive Design

  @media screen and (max-width: 480px) {
    display: block;
    overflow-y: auto;
  }
`
