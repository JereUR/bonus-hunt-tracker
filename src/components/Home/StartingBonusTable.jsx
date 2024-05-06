import styled, { keyframes } from 'styled-components'
import { useState } from 'react'
import { toast } from 'react-toastify'

import slotIcon from '../../assets/slot-icon.png'
import betIcon from '../../assets/bet-icon.png'
import {
  arrowBack,
  coinIcon,
  editIcon,
  targetIcon,
  winIcon
} from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'
import CheckBox from '../../utils/CheckBox'
import useGetAttributesDetails from '../../utils/useGetAttributesDetails'
import Loader from '../Loader/Loader'

export default function StartingBonusTable({
  bonusList,
  setChecked,
  setClassNameBudget
}) {
  const [winInputs, setWinInputs] = useState(bonusList.map(() => ''))
  const [errorWins, setErrorWins] = useState(bonusList.map(() => null))
  const [errorFinish, setErrorFinish] = useState('')
  const [checkedWins, setCheckedWins] = useState(bonusList.map(() => false))
  const [classNameWins, setClassNameWins] = useState(bonusList.map(() => false))
  const [edits, setEdits] = useState(bonusList.map(() => false))
  const [loading, setLoading] = useState(false)

  const {
    updateWin,
    setOnRun,
    setReset,
    deleteAllBonus,
    session,
    setBudget,
    budget,
    addHistory
  } = useGlobalContext()

  const { currentAvg, totalWin } = useGetAttributesDetails()

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

  const validationFinish = () => {
    let error = ''

    bonusList.forEach((bonus) => {
      if (bonus.win === null) {
        error = 'Debe completar el Bonus Hunt antes de finalizar.'
      }
    })

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

  const handleBack = () => {
    bonusList.forEach((item) => {
      updateWin({ id: item.id, win: null, odd: null })
    })
    setReset(true)
    setOnRun(false)
  }

  const handleEdit = (index) => {
    const newCkeckedWins = [...checkedWins]
    newCkeckedWins[index] = false
    setCheckedWins(newCkeckedWins)

    const newEdits = [...edits]
    newEdits[index] = true
    setEdits(newEdits)
  }

  const addWin = async (index) => {
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
      const odd = Number(winInputs[index] / bonusList[index].bet)

      const { error } = await updateWin({
        id: bonusList[index].id,
        win: winInputs[index],
        odd
      })

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

      const newEdits = [...edits]
      newEdits[index] = false
      setEdits(newEdits)
    }
  }

  const handleFinish = async () => {
    const err = validationFinish()
    setErrorFinish(err)

    if (!Object.keys(err).length) {
      setLoading(true)
      const { error } = await deleteAllBonus(session.user.id)
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
        const historyData = {
          odd: currentAvg,
          budget,
          win: totalWin,
          user_id: session.user.id
        }

        const { error: errorHistory } = await addHistory(historyData)

        if (errorHistory) {
          toast.error(errorHistory.message, {
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
          setOnRun(false)
          setBudget('')
          setChecked(false)
          setClassNameBudget(false)
        }
      }

      setLoading(false)
    } else {
      setTimeout(() => {
        setErrorFinish('')
      }, 5000)
    }
  }

  return (
    <Container>
      <ButtonBack onClick={handleBack}>
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
                {item.win && !edits[index] ? (
                  <td className="win-td">
                    <span>$ {item.win}</span>
                    <div
                      onClick={() => {
                        handleEdit(index)
                      }}
                    >
                      {editIcon}
                    </div>
                  </td>
                ) : (
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
                )}
                <td>{item.odd ? `x ${item.odd.toFixed(2)}` : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BonusTableStyled>
      {errorFinish !== '' && <ErrorTextFinish>{errorFinish}</ErrorTextFinish>}
      <ButtonStyled onClick={handleFinish}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Finalizar
      </ButtonStyled>
      {loading && <Loader customClass="finish-loader" />}
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
  font-size: 20px;
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

  .finish-loader {
    margin: -30px auto auto auto;
  }
`

const BonusTableStyled = styled.div`
  box-shadow: inset 0px 10px 10px -10px var(--secondary-color2);
  padding: 20px 5px;
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

  tbody tr:hover {
    background-color: var(--background-default-color2);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 20px;
    overflow: hidden;
  }

  td {
    padding: 15px 5px 20px 5px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
  }

  th {
    font-weight: bold;
    height: 50px;
    padding: 20px 10px;
    text-transform: uppercase;

    i {
      margin-right: 5px;
    }

    img {
      width: 20px;
      margin-right: 5px;
    }
  }

  .win-td {
    display: flex;
    justify-content: center;

    span {
      width: 60%;
    }

    i {
      color: var(--secondary-color3);
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: var(--secondary-color);
      }
    }
  }

  .input-container {
    display: flex;
    justify-content: center;

    input {
      padding: 3px 10px;
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
    margin-top: 5px;
  }
`

const ErrorText = styled.p`
  margin-right: 30px;
  font-size: 12px;
  color: var(--error-color);
  animation: ${shake} 0.6s;
`

const ErrorTextFinish = styled(ErrorText)`
  margin-top: 30px;
  margin-bottom: -20px;
  animation: ${shake} 0.6s;
`
