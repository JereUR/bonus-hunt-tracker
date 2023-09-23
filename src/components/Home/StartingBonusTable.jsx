import styled from 'styled-components'
import { useState } from 'react'

import slotIcon from '../../assets/slot-icon.png'
import betIcon from '../../assets/bet-icon.png'
import { coinIcon, winIcon } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'
import CheckBox from '../../utils/CheckBox'

export default function StartingBonusTable({
  handleFocus,
  handleBlur,
  bonusList
}) {
  const [winInputs, setWinInputs] = useState(bonusList.map(() => ''))
  const [errorWins, setErrorWins] = useState(bonusList.map(() => ({})))

  const { updateWin } = useGlobalContext()

  const validation = (index) => {
    let error = ''

    if (winInputs[index] === '') {
      error = 'Debe ingresar un valor.'
    }

    if (winInputs[index] < 0) {
      error = 'El monto debe ser mayor a 0'
    }

    return error
  }

  const handleWinInputChange = (index, value) => {
    const newWinInputs = [...winInputs]
    newWinInputs[index] = value
    setWinInputs(newWinInputs)
  }

  const addWin = (index) => {
    const errors = [...errorWins]
    const newError = validation(index)
    errors[index] = newError
    setErrorWins(errors)

    if (!Object.keys(newError).length) {
      updateWin()
    }
  }

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
              <th>{winIcon} Win</th>
              <th>{coinIcon} x Win</th>
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
                      type="number"
                      name={`winInput-${index}`}
                      id={`win-input-${index}`}
                      value={winInputs[index]}
                      onChange={({ target }) =>
                        handleWinInputChange(index, target.value)
                      }
                      onFocus={({ target }) => handleFocus(target.name)}
                      onBlur={({ target }) => handleBlur(target.name)}
                    />
                    <div className="checkbox">
                      <CheckBox
                        checked={item.win !== null}
                        functionClick={() => addWin(index)}
                      />
                    </div>
                  </div>
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
  }

  .checkbox {
    margin-left: 10px;
  }
`

const ErrorText = styled.p`
  font-size: 12px;
  color: var(--error-color);
`
