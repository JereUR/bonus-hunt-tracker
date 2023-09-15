import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

import logo from '../../assets/logo.png'
import { arrowBack } from '../../utils/Icons'

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function SignUp({ setActive }) {
  const [inputState, setInputState] = useState(initialState)
  const [classNameName, setClassNameName] = useState(false)
  const [classNameUsername, setClassNameUsername] = useState(false)
  const [classNameEmail, setClassNameEmail] = useState(false)
  const [classNamePassword, setClassNamePassword] = useState(false)
  const [classNamePasswordConfirm, setClassNamePasswordConfirm] =
    useState(false)

  const { name, username, email, password, confirmPassword } = inputState

  const handleFocus = (nameTag) => {
    switch (nameTag) {
      case 'name':
        setClassNameName(true)
        break
      case 'username':
        setClassNameUsername(true)
        break
      case 'email':
        setClassNameEmail(true)
        break
      case 'password':
        setClassNamePassword(true)
        break
      case 'password-confirm':
        setClassNamePasswordConfirm(true)
        break
    }
  }

  const handleBlur = (nameTag) => {
    switch (nameTag) {
      case 'name':
        if (name === '') {
          setClassNameName(false)
        }
        break
      case 'username':
        if (username === '') {
          setClassNameUsername(false)
        }
        break
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
      case 'password-confirm':
        if (confirmPassword === '') {
          setClassNamePasswordConfirm(false)
        }
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
      <ButtonBack onClick={() => setActive(0)}>
        {arrowBack} <span>Volver</span>
      </ButtonBack>
      <img src={logo} alt="logo" />
      <form>
        <div className="user-box">
          <input
            className={classNameName ? 'focus' : ''}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            value={name}
            name="name"
            type="text"
            onChange={handleChange}
          />
          <label>Nombre</label>
        </div>
        <div className="user-box">
          <input
            className={classNameUsername ? 'focus' : ''}
            onFocus={() => handleFocus('username')}
            onBlur={() => handleBlur('username')}
            value={username}
            name="username"
            type="text"
            onChange={handleChange}
          />
          <label>Nombre de usuario</label>
        </div>
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
        <div className="user-box">
          <input
            className={classNamePasswordConfirm ? 'focus' : ''}
            onFocus={() => handleFocus('password-confirm')}
            onBlur={() => handleBlur('password-confirm')}
            value={confirmPassword}
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />
          <label>Confirmar contraseña</label>
        </div>
        <button className="register-btn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Registrarse
        </button>
      </form>
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

const ButtonBack = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  top: 5%;
  left: 6%;
  color: var(--primary-color2);
  transition: all 0.3s ease-in-out;

  span {
    position: absolute;
    top: 17%;
    font-size: 18px;
    margin-left: 10px;
    font-weight: bold;
  }

  &:hover {
    transform: scale(1.05);
    color: var(--primary-color);
  }
`

const LoginFormStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 80vh;
  padding: 100px 60px 40px 60px;
  margin: 20px auto;
  transform: translate(-50%, -55%);
  background: rgba(0, 0, 0, 0.9);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;

  img {
    width: 400px;
    margin-bottom: 30px;
  }

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

  .register-btn {
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

    &::before {
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

    &:hover {
      color: #272727;
      border-radius: 5px;
    }

    &:hover::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
    }

    span {
      position: absolute;
      display: block;
    }

    span:nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #fff);
      animation: ${btnAnim1} 1.5s linear infinite;
    }

    span:nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #fff);
      animation: ${btnAnim1} 1.5s linear infinite;
    }

    span:nth-child(2) {
      top: -100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, #fff);
      animation: ${btnAnim2} 1.5s linear infinite;
      animation-delay: 0.375s;
    }

    span:nth-child(3) {
      bottom: 0;
      right: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg, transparent, #fff);
      animation: ${btnAnim3} 1.5s linear infinite;
      animation-delay: 0.75s;
    }

    span:nth-child(4) {
      bottom: -100%;
      left: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(360deg, transparent, #fff);
      animation: ${btnAnim4} 1.5s linear infinite;
      animation-delay: 1.125s;
    }
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
