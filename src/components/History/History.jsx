import styled from 'styled-components'

export default function History() {
  return <HistoryStyled>History</HistoryStyled>
}

const HistoryStyled = styled.div`
  z-index: 1;
  position: relative;
  flex: 1;
  background: var(--background-default-color);
  border: 3px solid var(--secondary-color);
  margin: 1rem;
  backdrop-filter: blur(4.5px);
  overflow-x: hidden;
  overflow-y: auto;
`
