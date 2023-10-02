import styled, { keyframes } from 'styled-components'

import logo from '../../assets/logo2.png'
import { useGlobalContext } from '../../context/globalContext'
import Navigation from './Navigation'
import { useEffect, useState } from 'react'

export default function Header({ active, setActive }) {
  const [username, setUsername] = useState('')
  const { session } = useGlobalContext()

  const name = session?.user?.user_metadata.user_name

  useEffect(() => {
    if (session) {
      if (name === undefined) {
        setUsername(session.user?.user_metadata.name)
      } else {
        setUsername(name)
      }
    }
  }, [session])

  return (
    <HeaderStyled>
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="presentation">
          <h2>Bienvenido {username}</h2>
          <h3>Buena Suerte!</h3>
        </div>
      </div>
      <Navigation active={active} setActive={setActive} />
    </HeaderStyled>
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

const HeaderStyled = styled.header`
  background-color: var(--background-default-color);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 50px;
  margin: 1rem 1rem 0 1rem;
  text-align: center;
  background-color: var(--background-home-color);
  border: 3px solid;
  border-image-slice: 1;
  animation: ${rotateBorder} 5s infinite linear;

  .header-container {
    display: flex;
    justify-content: space-between;

    .logo-container {
      margin-left: 5vw;
    }

    .presentation {
      margin-right: 3vw;
    }
  }
`
