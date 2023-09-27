import styled, { keyframes } from 'styled-components'
import { useState } from 'react'

import slotIcon from '../../assets/slot-icon.png'
import betIcon from '../../assets/bet-icon.png'
import { arrowBack, coinIcon, targetIcon, winIcon } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'
import CheckBox from '../../utils/CheckBox'

export default function StartingBonusTable({ bonusList }) {
  const [winInputs, setWinInputs] = useState(bonusList.map(() => ''))
  const [errorWins, setErrorWins] = useState(bonusList.map(() => null))
  const [checkedWins, setCheckedWins] = useState(bonusList.map(() => false))
  const [classNameWins, setClassNameWins] = useState(bonusList.map(() => false))

  const { updateWin, setOnRun } = useGlobalContext()

  const validation = (index) => {
    let error = ''

    if (winInputs[index] === '') {
      error = 'La recompensa no puede ser vacia.'
    }

    if (winInputs[index] < 0) {
      error = 'La recompensa no puede ser negativa'
    }

    return error
  }

  const handleFocus = (event) => {
    const index = event.target.name.split('-')[1]
    const classChange = [...classNameWins]
    classChange[index] = true
    setClassNameWins(classChange)
  }

  const handleBlur = (event) => {
    const index = event.target.name.split('-')[1]
    const classChange = [...classNameWins]
    classChange[index] = false
    setClassNameWins(classChange)
  }

  const handleWinInputChange = (index, value) => {
    const newWinInputs = [...winInputs]
    newWinInputs[index] = value
    setWinInputs(newWinInputs)
  }

  const addWin = (index) => {
    const newCkeckedWins = [...checkedWins]
    newCkeckedWins[index] = !newCkeckedWins[index]
    setCheckedWins(newCkeckedWins)

    const errors = [...errorWins]
    const newError = validation(index)
    errors[index] = newError
    setErrorWins(errors)

    if (!Object.keys(newError).length) {
      const errors = [...errorWins]
      errors[index] = null
      setErrorWins(errors)
      updateWin({ id: bonusList[index].id, win: winInputs[index] })
    }
  }

  return (
    <Container>
      <ButtonBack onClick={() => setOnRun(false)}>
        {arrowBack} <span>Volver</span>
      </ButtonBack>
      <h1>Lista de Bonus</h1>
      <h3>
        {targetIcon}
        Let the hunt begin
        {targetIcon}
      </h3>
      <BonusTableStyled>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <img src={slotIcon} alt="slot-icon" /> Nombre de Slot
              </th>
              <th>
                <img src={betIcon} alt="slot-icon" /> Apuesta
              </th>
              <th>{winIcon} Recompensa</th>
              <th className="small-column">{coinIcon} Cuota</th>
            </tr>
          </thead>
          <tbody>
            {bonusList?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.slotName}</td>
                <td>$ {item.bet}</td>
                <td className="input-win">
                  <div className="input-container">
                    <input
                      className={classNameWins[index] ? 'focused' : ''}
                      type="number"
                      name={`winInput-${index}`}
                      id={`win-input-${index}`}
                      value={winInputs[index]}
                      onChange={({ target }) =>
                        handleWinInputChange(index, target.value)
                      }
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={checkedWins[index]}
                    />
                    <div className="checkbox">
                      <CheckBox
                        checked={checkedWins[index]}
                        functionClick={() => addWin(index)}
                      />
                    </div>
                  </div>
                  {errorWins[index] && (
                    <ErrorText>{errorWins[index]}</ErrorText>
                  )}
                </td>
                <td>
                  {checkedWins[index] &&
                    errorWins[index] === null &&
                    (winInputs[index] === 0 ? 'x 0' : 'x ' + item.odd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </BonusTableStyled>
      <ButtonStyled>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Finalizar
      </ButtonStyled>
    </Container>
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
  top: 3%;
  left: 3%;
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

const ButtonStyled = styled.button`
  position: relative;
  display: inline-block;
  padding: 15px 20px;
  width: 40%;
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
  margin: 50px 0;
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
    color: #000;
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
`

const Container = styled.div`
  padding: 20px;

  h1 {
    color: var(--secondary-color);
    font-size: 42px;
    margin-bottom: -5px;
    text-shadow: 2px 2px 4px var(--primary-color);
  }

  h3 {
    color: var(--primary-color);
    margin-bottom: 3vw;

    i {
      font-size: 28px;
    }

    i:first-child {
      margin-right: 10px;
    }

    i:nth-child(2) {
      margin-left: 10px;
    }
  }
`

const BonusTableStyled = styled.div`
  box-shadow: inset 0px 10px 10px -10px var(--secondary-color2);
  border-radius: 10px;
  height: 100%;
  overflow-y: auto;

  thead,
  tbody {
    flex: 1;

    .small-column {
      width: 8%;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 20px;
  }

  th {
    padding: 20px;

    i {
      margin-right: 5px;
    }

    img {
      width: 20px;
      margin-right: 5px;
    }
  }

  .input-container {
    display: flex;
    justify-content: center;

    input {
      padding: 8px;
      font-weight: bold;
      border-radius: 5px;
      border: 2px solid var(--secondary-color3);
      background-color: var(--background-home-color);
      font-size: 18px;
      width: 40%;
      text-align: right;
      color: var(--primary-color);

      &.focused {
        border: 2px solid var(--primary-color) !important;
        color: var(--primary-color2);
      }
    }
  }

  .checkbox {
    margin-left: 10px;
    margin-top: 9px;
  }
`

const ErrorText = styled.p`
  margin-right: 30px;
  font-size: 12px;
  color: var(--error-color);
`
