import styled from 'styled-components'
import LoginForm from './LoginForm'
import { githubIcon, googleIcon } from '../../utils/Icons'

export default function Login({ setActive }) {
  return (
    <LoginStyled>
      <LoginForm />
      <div className="separator">
        <hr className="continuous-line" />
        <span>o</span>
        <hr className="continuous-line" />
      </div>
      <div className="button-section">
        <ButtonStyledGoogle>
          {googleIcon}
          Iniciar Sesión con Google
        </ButtonStyledGoogle>
        <ButtonStyledGithub>
          {githubIcon}
          Iniciar Sesión con Github
        </ButtonStyledGithub>
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
  line-height: 1.25rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  gap: 0.75rem;
  color: rgb(65, 63, 63);
  background-color: #fff;
  cursor: pointer;
  transition: all 0.6s ease;

  svg {
    height: 24px;
  }

  &:hover {
    transform: scale(1.02);
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
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  margin: 20px auto;
  transform: translate(-50%, -55%);
  background: rgba(0, 0, 0, 0.9);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 10px 0;
  }

  .continuous-line {
    flex-grow: 1;
    border: none;
    height: 1.5px;
    width: 10vw;
    background-color: #ffffff;
    margin: 0 10px;
  }
`
