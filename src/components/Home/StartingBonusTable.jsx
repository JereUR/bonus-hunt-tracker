import styled from 'styled-components'
import { useState } from 'react'

import slotIcon from '../../assets/slot-icon.png'
import betIcon from '../../assets/bet-icon.png'
import { coinIcon, winIcon } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'
import CheckBox from '../../utils/CheckBox'

export default function StartingBonusTable({ bonusList }) {
  const [winInputs, setWinInputs] = useState(bonusList.map(() => ''))
  const [errorWins, setErrorWins] = useState(bonusList.map(() => null))
  const [checkedWins, setCheckedWins] = useState(bonusList.map(() => false))
  const [classNameWins, setClassNameWins] = useState(bonusList.map(() => false))

  const { updateWin } = useGlobalContext()

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
      updateWin()
    }
  }

  console.log(classNameWins)

  return (
    <Container>
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
                    (winInputs[index] === 0
                      ? 'x 0'
                      : 'x ' +
                        parseFloat((winInputs[index] / item.bet).toFixed(2)))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </BonusTableStyled>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
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
      border-radius: 5px;
      border: 2px solid var(--primary-color3);
      background-color: var(--background-home-color);
      font-size: 16px;
      width: 100%;

      &.focused {
        border: 2px solid var(--primary-color) !important;
      }
    }
  }

  .checkbox {
    margin-left: 10px;
  }
`

const ErrorText = styled.p`
  text-align: left;
  font-size: 12px;
  color: var(--error-color);
`
