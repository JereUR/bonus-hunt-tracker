import styled from 'styled-components'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import { useState } from 'react'

export default function Home() {
  const [onRun, setOnRun] = useState(false)

  return (
    <HomeStyled>
      <LeftSide onRun={onRun} setOnRun={setOnRun} />
      <RightSide onRun={onRun} />
    </HomeStyled>
  )
}

const HomeStyled = styled.div`
  display: flex;
  height: 90vh;
  overflow-y: hidden;
`
