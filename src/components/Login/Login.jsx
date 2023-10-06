import styled from 'styled-components'
import { useState } from 'react'
import { toast } from 'react-toastify'

import logo from '../../assets/logo2.png'
import LoginForm from './LoginForm'
import { githubIcon, googleIcon } from '../../utils/Icons'
import { signInWithGithub, signInWithGoogle } from '../../services'
import Loader from '../Loader/Loader'

export default function Login({ setActive }) {
  const [loading, setLoading] = useState(false)

  const handleGithub = async () => {
    setLoading(true)
    const { error } = await signInWithGithub()

    if (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
    setLoading(false)
  }

  const handelGoogle = async () => {
    setLoading(true)
    const { error } = await signInWithGoogle()

    if (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
    setLoading(false)
  }

  return (
    <LoginStyled>
      <div className="img-container">
        <img src={logo} alt="logo" />
      </div>
      <LoginForm setActive={setActive} />
      <div className="separator">
        <hr className="continuous-line" />
        <span>o</span>
        <hr className="continuous-line" />
      </div>
      <div className="button-section">
        <ButtonStyledGoogle
          onClick={() => {
            setLoading(true)
            handelGoogle()
            setLoading(false)
          }}
        >
          {googleIcon}
          Iniciar Sesión con Google
        </ButtonStyledGoogle>
        {loading && <Loader customClass="google-loader" />}
        <ButtonStyledGithub onClick={handleGithub}>
          {githubIcon}
          Iniciar Sesión con Github
        </ButtonStyledGithub>
        {loading && <Loader customClass="github-loader" />}
      </div>
    </LoginStyled>
  )
}

const ButtonStyledGoogle = styled.button`
  width: 320px;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1.4rem;
  font-size: 0.875rem;
  margin-top: 10px;
  line-height: 1.25rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid var(--button-text-color);
  box-shadow: 2px 2px 4px var(--primary-color3);
  gap: 0.75rem;
  color: rgb(65, 63, 63);
  background-color: #fff;
  cursor: pointer;

  svg {
    height: 24px;
  }

  &:active {
    box-shadow: none;
    transform: translate(2px, 2px);
  }

  &:first-child {
    margin-bottom: 2vw;
  }
`

const ButtonStyledGithub = styled(ButtonStyledGoogle)`
  color: #ffffff;
  background-color: rgb(24, 23, 23);
`

const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 90vh;
  padding: 40px;
  margin: 20px auto;
  transform: translate(-50%, -55%);
  background: rgba(0, 0, 0, 0.9);
  border: 3px solid var(--primary-color);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  overflow-y: auto;

  img {
    width: 250px;
    padding: 30px 10px;
  }

  .img-container {
    max-width: 300px;
    display: flex;
    justify-content: center;
    margin: 30px auto;
    border-radius: 20px;
    border: 1px solid var(--primary-color2);
    background: rgba(235, 227, 238, 0.78);
    backdrop-filter: blur(4.5px);
  }

  .button-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .google-loader {
      margin-top: -10px;
      margin-bottom: 10px;
    }

    .github-loader {
      margin-top: 20px;
    }
  }

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;

    span {
      color: var(--primary-color);
    }
  }

  .continuous-line {
    flex-grow: 1;
    border: none;
    height: 1.5px;
    width: 10vw;
    background-color: var(--primary-color);
    margin: 0 10px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color3);
    border-radius: 5px;
  }
`
