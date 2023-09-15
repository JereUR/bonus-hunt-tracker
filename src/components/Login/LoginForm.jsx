import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const initialState = {
  email: '',
  password: ''
}

export default function LoginForm({ setActive }) {
  const [inputState, setInputState] = useState(initialState)
  const [classNameEmail, setClassNameEmail] = useState(false)
  const [classNamePassword, setClassNamePassword] = useState(false)

  const { email, password } = inputState

  const handleFocus = (name) => {
    switch (name) {
      case 'email':
        setClassNameEmail(true)
        break
      case 'password':
        setClassNamePassword(true)
        break
    }
  }

  const handleBlur = (name) => {
    switch (name) {
      case 'email':
        if (email === '') {
          setClassNameEmail(false)
        }
        break
      case 'password':
        if (password === '') {
          setClassNamePassword(false)
        }
        break
      default:
        break
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputState({
      ...inputState,
      [name]: value
    })
  }

  return (
    <LoginFormStyled>
      <form>
        <div className="user-box">
          <input
            className={classNameEmail ? 'focus' : ''}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            value={email}
            name="email"
            type="text"
            onChange={handleChange}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            className={classNamePassword ? 'focus' : ''}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            value={password}
            name="password"
            type="password"
            onChange={handleChange}
          />
          <label>Contraseña</label>
        </div>
        <button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Iniciar Sesión
        </button>
      </form>
      <p className="signup">
        No tienes cuenta?{' '}
        <p className="a2" onClick={() => setActive(1)}>
          Regístrate!
        </p>
      </p>
    </LoginFormStyled>
  )
}

const btnAnim1 = keyframes`
  0% {
    left: -100%;
  }

  50%,100% {
    left: 100%;
  }
`

const btnAnim2 = keyframes`
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
`

const btnAnim3 = keyframes`
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
`

const btnAnim4 = keyframes`
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
`

const LoginFormStyled = styled.div`
  p:first-child {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .user-box {
    position: relative;
  }

  .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }

  .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
  }

  .user-box .focus ~ label {
    top: -20px;
    left: 0;
    color: #fff;
    font-size: 12px;
  }

  button {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    font-weight: bold;
    background: transparent;
    cursor: pointer;
    border: none;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    margin: 10px 0;
    letter-spacing: 3px;
    transition: all 0.4s ease-in-out;
  }

  button::before {
    content: '';
    width: 0%;
    height: 100%;
    position: absolute;
    background-color: #fff;
    left: 0;
    top: 0;
    z-index: -1;
    transition: 0.4s ease-in-out;
  }

  button:hover {
    color: #272727;
    border-radius: 5px;
  }

  button:hover::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
  }

  button span {
    position: absolute;
    display: block;
  }

  button span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #fff);
    animation: ${btnAnim1} 1.5s linear infinite;
  }

  button span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff);
    animation: ${btnAnim2} 1.5s linear infinite;
    animation-delay: 0.375s;
  }

  button span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #fff);
    animation: ${btnAnim3} 1.5s linear infinite;
    animation-delay: 0.75s;
  }

  button span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #fff);
    animation: ${btnAnim4} 1.5s linear infinite;
    animation-delay: 1.125s;
  }

  .signup {
    display: flex;
    justify-content: center;
    margin-bottom: -25px;
  }

  p:last-child {
    color: #aaa;
    font-size: 14px;
  }

  p.a2 {
    cursor: pointer;
    margin-left: 5px;
    color: #fff;
    text-decoration: none;
  }

  p.a2:hover {
    background: transparent;
    color: #aaa;
    border-radius: 5px;
  }
`