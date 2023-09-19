import styled from 'styled-components'

export default function Home() {
  return <HomeStyled></HomeStyled>
}

const HomeStyled = styled.div`
  height: 100vh;
  flex: 2;
  background: rgba(10, 10, 10, 0.78);
  border: 2px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow: auto;
  overflow-x: hidden;
`
