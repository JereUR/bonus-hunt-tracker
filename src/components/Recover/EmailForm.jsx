import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { toast } from 'react-toastify'

import newEmail from '../../assets/newEmail.png'
import { arrowBack } from '../../utils/Icons'
import { DIRECTIONS } from '../../utils/Direction'
import Loader from '../Loader/Loader'
import { recoverPassword } from '../../services'

const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EmailForm({ setActive }) {
  const [email, setEmail] = useState('')
  const [classNameEmail, setClassNameEmail] = useState(false)
  const [errorForm, setErrorForm] = useState('')
  const [loading, setLoading] = useState(false)
  const [recSent, setRecSent] = useState(false)

  const handleBlur = () => {
    if (email === '') {
      setClassNameEmail(false)
    }
  }

  const validation = () => {
    let err = ''

    if (!validateEmail.test(String(email).toLowerCase())) {
      err = 'Email no válido.'
    }

    if (email === '') {
      err = 'Debe ingresar un email.'
    }

    return err
  }

  const handleRecover = async (e) => {
    e.preventDefault()

    const err = validation()
    setErrorForm(err)

    if (err === '') {
      setLoading(true)
      const { error } = await recoverPassword(email)

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
        setEmail('')
        setRecSent(true)
      }

      setLoading(false)
    }
  }

  return (
    <EmailFormStyled>
      <ButtonBack onClick={() => setActive(DIRECTIONS.LOGIN)}>
        {arrowBack} <span>Volver al inicio</span>
      </ButtonBack>

      <h1>Recuperar Contraseña</h1>
      {recSent ? (
        <div className="recover-sent">
          <div className="img-container">
            <img src={newEmail} alt="new-email" />
          </div>
          <p>
            <strong>
              Se ha enviado en correo electrónico con instrucciones para
              reestablecer la contraseña.
            </strong>
          </p>
        </div>
      ) : (
        <form onSubmit={handleRecover}>
          <div className="user-box">
            <input
              className={classNameEmail ? 'focus' : ''}
              onFocus={() => setClassNameEmail(true)}
              onBlur={handleBlur}
              value={email}
              name="email"
              type="text"
              onChange={({ target }) => {
                setEmail(target.value)
              }}
            />
            {errorForm && <ErrorText>{errorForm}</ErrorText>}
            <label>Email</label>
          </div>
          <button className="recover-btn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Enviar
          </button>
          {loading && <Loader customClass="recover-loader" />}
        </form>
      )}
    </EmailFormStyled>
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
    width: 10vw;
    margin-left: 10px;
    font-weight: bold;

    //Responsive Design

    @media screen and (max-width: 480px) {
      width: 30vw;
    }
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
  animation: ${shake} 0.6s;
`

const EmailFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: auto;
  padding: 100px 60px 40px 60px;
  margin: 20px auto;
  transform: translate(-50%, -55%);
  background: rgba(0, 0, 0, 0.9);
  border: 3px solid var(--primary-color);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  overflow-y: auto;

  form {
    margin: auto 0;
  }

  h1 {
    color: var(--primary-color);
    font-size: 36px;
    margin-bottom: 70px;
  }

  .recover-loader {
    margin: 10px auto;
  }

  .recover-sent {
    .img-container {
      margin-top: -30px;

      img {
        width: 130px;
      }
    }

    strong {
      font-size: 16px;
    }
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
    top: -25px;
    left: 0;
    color: var(--primary-color2);
    font-size: 14px;
  }

  .user-box .focus {
    border-bottom: 1px solid var(--primary-color);
    color: var(--primary-color);
  }

  .recover-btn {
    position: relative;
    display: inline-block;
    padding: 15px 20px;
    width: 60%;
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color3);
    border-radius: 5px;
  }

  //Responsive Design

  @media screen and (max-width: 480px) {
    width: 90%;
    height: auto;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
  }
`
