import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { toast } from 'react-toastify'

import { signInWithEmail } from '../../services'
import Loader from '../Loader/Loader'
import { DIRECTIONS } from '../../utils/Direction'
import { EyeIcon, noEyeIcon } from '../../utils/Icons'

const initialState = {
  email: '',
  password: ''
}

const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginForm({ setActive }) {
  const [inputState, setInputState] = useState(initialState)
  const [classNameEmail, setClassNameEmail] = useState(false)
  const [classNamePassword, setClassNamePassword] = useState(false)
  const [errorForm, setErrorForm] = useState({})
  const [loading, setLoading] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)

  const { email, password } = inputState

  useEffect(() => {
    if (email !== '') {
      setClassNameEmail(true)
    }

    if (password !== '') {
      setClassNamePassword(true)
    }
  }, [email, password])

  const validation = () => {
    let err = {}

    if (!validateEmail.test(String(email).toLowerCase())) {
      err.email = 'Email no válido.'
    }

    if (email === '') {
      err.email = 'Ingrese un email.'
    }

    if (password === '') {
      err.password = 'Ingrese una contraseña.'
    }

    return err
  }

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

  const handleEmail = async (e) => {
    e.preventDefault()

    const err = validation()
    setErrorForm(err)

    if (Object.keys(err).length === 0) {
      setLoading(true)
      let { error } = await signInWithEmail({
        email: inputState.email,
        password: inputState.password
      })

      if (error.message === 'Invalid login credentials') {
        error.message = 'Credenciales incorrectas.'
      }

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
      } else {
        setInputState(initialState)
        setClassNameEmail(false)
        setClassNamePassword(false)
      }
    }

    setLoading(false)
  }

  return (
    <LoginFormStyled>
      <form onSubmit={handleEmail}>
        <div className="user-box">
          <input
            className={classNameEmail ? 'focus' : ''}
            onFocus={({ target }) => handleFocus(target.name)}
            onBlur={({ target }) => handleBlur(target.name)}
            value={email}
            name="email"
            type="text"
            onChange={handleChange}
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
            type={viewPassword ? 'text' : 'password'}
            onChange={handleChange}
          />
          {errorForm.password && <ErrorText>{errorForm.password}</ErrorText>}
          <label>Contraseña</label>
          <span
            type="button"
            className={
              classNamePassword ? 'btn-show-pass focus' : 'btn-show-pass'
            }
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? noEyeIcon : EyeIcon}
          </span>
        </div>
        <button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Iniciar Sesión
        </button>
      </form>
      {loading && <Loader customClass="login-loader" />}
      <p className="recover" onClick={() => setActive(DIRECTIONS.RECOVER)}>
        ¿Has olvidado la contraseña?
      </p>
      <p className="signup">
        No tienes cuenta?{' '}
        <span className="a2" onClick={() => setActive(DIRECTIONS.SIGNUP)}>
          Regístrate!
        </span>
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

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60%{
    transform: translateX(-5px);
  }
  40%, 80% {
    transform: translateX(5px);
  }
  `

const ErrorText = styled.span`
  display: flex;
  margin-top: -20px;
  margin-bottom: 10px;
  justify-content: left;
  font-size: 12px;
  color: var(--error-color);
  animation: ${shake} 0.6s;
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

  .login-loader {
    margin: 10px auto;
  }

  .user-box {
    position: relative;

    .btn-show-pass {
      position: absolute;
      top: 15%;
      right: 20px;
      transform: translateY(-50%);
      border: none !important;
      font-size: 1.5rem;
      background-color: transparent;
      cursor: pointer;
    }
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
    color: var(--primary-color);
    font-size: 14px;
  }

  .user-box .focus {
    border-bottom: 1px solid var(--primary-color);
    color: var(--primary-color);
  }

  button {
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
    margin: 10px 0;
    letter-spacing: 3px;
    transition: all 0.4s ease-in-out;
  }

  button::before {
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

  button:hover {
    border-radius: 5px;
    color: #fff;
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
    background: linear-gradient(90deg, transparent, var(--primary-color));
    animation: ${btnAnim1} 1.5s linear infinite;
  }

  button span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, var(--primary-color));
    animation: ${btnAnim2} 1.5s linear infinite;
    animation-delay: 0.375s;
  }

  button span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, var(--primary-color));
    animation: ${btnAnim3} 1.5s linear infinite;
    animation-delay: 0.75s;
  }

  button span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, var(--primary-color));
    animation: ${btnAnim4} 1.5s linear infinite;
    animation-delay: 1.125s;
  }

  .recover {
    font-size: 11px;
    color: var(--secondary-color3);
    margin-bottom: 30px;
    cursor: pointer;

    &:hover {
      color: var(--secondary-color);
    }
  }

  .signup {
    display: flex;
    justify-content: center;
    margin-bottom: -5px;
  }

  p:last-child {
    color: #aaa;
    font-size: 14px;
  }

  .a2 {
    cursor: pointer;
    margin-left: 5px;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }

  .a2:hover {
    background: transparent;
    color: var(--primary-color);
    border-radius: 5px;
  }

  //Responsive design

  @media screen and (max-width: 480px) {
  }
`
