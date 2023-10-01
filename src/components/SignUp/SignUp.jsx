import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

import logo from '../../assets/logo2.png'
import { arrowBack } from '../../utils/Icons'
import { ToastContainer, toast } from 'react-toastify'
import { useGlobalContext } from '../../context/globalContext'
import { signUpWithEmail } from '../../services'

const initialState = {
  name: '',
  user_name: '',
  email: '',
  password: '',
  confirm_password: ''
}

export default function SignUp({ setActive }) {
  const [inputState, setInputState] = useState(initialState)
  const [classNameName, setClassNameName] = useState(false)
  const [classNameUsername, setClassNameUsername] = useState(false)
  const [classNameEmail, setClassNameEmail] = useState(false)
  const [classNamePassword, setClassNamePassword] = useState(false)
  const [classNamePasswordConfirm, setClassNamePasswordConfirm] =
    useState(false)
  const [errorForm, setErrorForm] = useState({})
  const [loading, setLoading] = useState(false)

  const { error, setError } = useGlobalContext()

  const { name, user_name, email, password, confirm_password } = inputState

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
      case 'confirmPassword':
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
      case 'confirmPassword':
        if (confirmPassword === '') {
          setClassNamePasswordConfirm(false)
        }
        break
    }
  }

  const validation = () => {
    let err = {}

    if (name === '') {
      err.name = 'Debe ingresar su nombre.'
    }

    if (name.length > 25) {
      err.name = 'El nombre no debe exceder los 25 caracteres.'
    }

    if (user_name === '') {
      err.user_name = 'Debe ingresar su nombre de usuario.'
    }

    if (user_name.length > 15) {
      err.user_name = 'El nombre de usuario no debe exceder los 15 caracteres.'
    }

    if (email === '') {
      err.email = 'Debe ingresar un email.'
    }

    if (password === '') {
      err.password = 'Debe ingresar una contraseña.'
    }

    if (password.length < 8) {
      err.password = 'La contraseña debe tener un mínimo de 8 caracteres.'
    }

    if (confirm_password === '') {
      err.confirm_password = 'Debe confirmar su contraseña.'
    }

    if (confirm_password !== password) {
      err.password = 'Las contraseñas no coinciden.'
      err.confirm_password = 'Las contraseñas no coinciden.'
    }

    return err
  }

  const handleInput =
    (name) =>
    ({ target }) => {
      setInputState({ ...inputState, [name]: target.value })
    }

  const handleSignUp = async (e) => {
    e.preventDefault()

    const err = validation()
    setErrorForm(err)

    /* if (Object.keys(err).length === 0) {
      setLoading(true)
      const { error: errorSignUp, errorUpdate } = await signUpWithEmail(
        inputState
      )

      if (errorSignUp !== null && errorSignUp !== undefined) {
        setError(errorSignUp.message)
        return
      }

      if (errorUpdate !== null && errorUpdate !== undefined) {
        setError(errorUpdate.message)
        return
      }

      setInputState(initialState)

      toast.success(
        'Registro exitoso. Chequea tu email y confirma tu cuenta para poder iniciar sesión. Redirigiendo...',
        {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        }
      )

      setTimeout(() => {
        setActive(0)
      }, 4000)
    } */

    setLoading(false)
  }

  return (
    <LoginFormStyled>
      <ButtonBack onClick={() => setActive('login')}>
        {arrowBack} <span>Volver</span>
      </ButtonBack>
      <div className="img-container">
        <img src={logo} alt="logo" />
      </div>
      <form onSubmit={handleSignUp}>
        {error && <ErrorText>{error}</ErrorText>}
        <div className="user-box">
          <input
            className={classNameName ? 'focus' : ''}
            onFocus={({ target }) => handleFocus(target.name)}
            onBlur={({ target }) => handleBlur(target.name)}
            value={name}
            name="name"
            type="text"
            onChange={handleInput}
          />
          {errorForm.name && <ErrorText>{errorForm.name}</ErrorText>}
          <label>Nombre</label>
        </div>
        <div className="user-box">
          <input
            className={classNameUsername ? 'focus' : ''}
            onFocus={({ target }) => handleFocus(target.name)}
            onBlur={({ target }) => handleBlur(target.name)}
            value={user_name}
            name="user_name"
            type="text"
            onChange={handleInput}
          />
          {errorForm.user_name && <ErrorText>{errorForm.user_name}</ErrorText>}
          <label>Nombre de usuario</label>
        </div>
        <div className="user-box">
          <input
            className={classNameEmail ? 'focus' : ''}
            onFocus={({ target }) => handleFocus(target.name)}
            onBlur={({ target }) => handleBlur(target.name)}
            value={email}
            name="email"
            type="text"
            onChange={handleInput}
          />
          {errorForm.email && <ErrorText>{errorForm.email}</ErrorText>}
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            className={classNamePassword ? 'focus' : ''}
            onFocus={({ target }) => handleFocus(target.name)}
            onBlur={({ target }) => handleBlur(target.name)}
            value={password}
            name="password"
            type="password"
            onChange={handleInput}
          />
          {errorForm.password && <ErrorText>{errorForm.password}</ErrorText>}
          <label>Contraseña</label>
        </div>
        <div className="user-box">
          <input
            className={classNamePasswordConfirm ? 'focus' : ''}
            onFocus={({ target }) => handleFocus(target.name)}
            onBlur={({ target }) => handleBlur(target.name)}
            value={confirm_password}
            name="confirm_password"
            type="password"
            onChange={handleInput}
          />
          {errorForm.confirm_password && (
            <ErrorText>{errorForm.confirm_password}</ErrorText>
          )}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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

const ErrorText = styled.span`
  display: flex;
  justify-content: left;
  font-size: 12px;
  color: var(--error-color);
`

const LoginFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 90vh;
  padding: 100px 60px 40px 60px;
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
    margin: auto;
    border-radius: 20px;
    border: 1px solid var(--primary-color2);
    background: rgba(235, 227, 238, 0.78);
    backdrop-filter: blur(4.5px);
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
    color: var(--primary-color2);
    font-size: 14px;
  }

  .user-box .focus {
    border-bottom: 1px solid var(--primary-color);
    color: var(--primary-color);
  }

  .register-btn {
    position: relative;
    display: inline-block;
    padding: 15px 20px;
    font-weight: bold;
    background: transparent;
    cursor: pointer;
    border: none;
    color: var(--primary-color);
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    margin: 40px 0 10px 0;
    letter-spacing: 3px;
    transition: all 0.4s ease-in-out;

    &::before {
      content: '';
      width: 0%;
      height: 100%;
      position: absolute;
      background-color: var(--primary-color);
      left: 0;
      top: 0;
      z-index: -1;
      transition: 0.4s ease-in-out;
    }

    &:hover {
      border-radius: 5px;
      color: #fff;
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
      background: linear-gradient(90deg, transparent, var(--primary-color));
      animation: ${btnAnim1} 1.5s linear infinite;
    }

    span:nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--primary-color));
      animation: ${btnAnim1} 1.5s linear infinite;
    }

    span:nth-child(2) {
      top: -100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, var(--primary-color));
      animation: ${btnAnim2} 1.5s linear infinite;
      animation-delay: 0.375s;
    }

    span:nth-child(3) {
      bottom: 0;
      right: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg, transparent, var(--primary-color));
      animation: ${btnAnim3} 1.5s linear infinite;
      animation-delay: 0.75s;
    }

    span:nth-child(4) {
      bottom: -100%;
      left: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(360deg, transparent, var(--primary-color));
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color3);
    border-radius: 5px;
  }
`
