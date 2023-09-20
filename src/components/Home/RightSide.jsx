import styled from 'styled-components'

export default function RightSide() {
  return <RightSideStyled>RigthSide</RightSideStyled>
}

const RightSideStyled = styled.div`
  flex: 1;
  background: rgba(10, 10, 10, 0.78);
  border: 3px solid var(--primary-color);
  border-left-width: 0px;
  backdrop-filter: blur(4.5px);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
  overflow-x: hidden;
`
