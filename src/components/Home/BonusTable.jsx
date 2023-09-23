import styled from 'styled-components'
import { useState } from 'react'

import slotIcon from '../../assets/slot-icon.png'
import betIcon from '../../assets/bet-icon.png'
import { editIcon, plusIcon, trashIcon } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'

export default function BonusTable({
  classNameSlotName,
  setClassNameSlotName,
  slotName,
  bonusData,
  setBonusData,
  initialBonusData,
  handleFocus,
  handleBlur,
  classNameBet,
  setClassNameBet,
  bet,
  errorForm
}) {
  const [errorBonus, setErrorBonus] = useState({})

  const { bonusList, setBonusList, deleteBonusItem } = useGlobalContext()

  const generateRandomId = () => {
    const randomNum = Math.floor(Math.random() * 10000)
    return `bonus_${randomNum}`
  }

  const validation = () => {
    let error = {}

    if (slotName === '') {
      error.slotName = 'Debe ingresar nombre de slot.'
    }

    if (bet === '') {
      error.bet = 'Debe ingresar monto de apuesta.'
    }

    if (bet < 0) {
      error.bet = 'La apuesta debe ser positiva.'
    }

    return error
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBonusData({
      ...bonusData,
      [name]: value
    })
  }

  const editData = (el) => {
    deleteBonusItem(el.id)

    document.getElementById('slotName-input').value = el.slotName
    document.getElementById('bet-input').value = el.bet

    setBonusData({ slotName: el.slotName, bet: el.bet })
  }

  const addBonus = () => {
    const errors = validation()
    setErrorBonus(errors)

    if (!Object.keys(errors).length) {
      const id = generateRandomId()

      const data = {
        id,
        slotName,
        bet
      }

      setBonusList([...bonusList, data])
      setClassNameSlotName(false)
      setClassNameBet(false)
      setBonusData(initialBonusData)
    }
  }

  return (
    <BonusTableStyled>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <img src={slotIcon} alt="slot-icon" /> Nombre de Slot
            </th>
            <th>
              <img src={betIcon} alt="bet-icon" /> Apuesta
            </th>
          </tr>
        </thead>
        <tbody>
          {bonusList?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.slotName}</td>
              <td>$ {item.bet}</td>
              <td>
                <div className="icons-container">
                  <span className="edit-logo" onClick={() => editData(item)}>
                    {editIcon}
                  </span>
                  <span
                    className="delete-logo"
                    onClick={() => deleteBonusItem(item.id)}
                  >
                    {trashIcon}
                  </span>
                </div>
              </td>
            </tr>
          ))}
          <tr className="bonus-form">
            <td className="id-container">
              <p className={classNameBet || classNameSlotName ? 'focus' : ''}>
                {bonusList.length + 1}
              </p>
            </td>
            <td className="input-bonus">
              <input
                className={
                  classNameSlotName ? 'focus input-name' : 'input-name'
                }
                type="text"
                name="slotName"
                id="slotName-input"
                value={slotName}
                onChange={handleInputChange}
                onFocus={({ target }) => handleFocus(target.name)}
                onBlur={({ target }) => handleBlur(target.name)}
              />
            </td>
            <td className="input-bonus">
              <input
                className={classNameBet ? 'focus' : ''}
                type="number"
                name="bet"
                id="bet-input"
                value={bet}
                onChange={handleInputChange}
                onFocus={({ target }) => handleFocus(target.name)}
                onBlur={({ target }) => handleBlur(target.name)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {errorForm.bonusList && <ErrorText>{errorForm.bonusList}</ErrorText>}
      <button type="button" onClick={addBonus} className="button">
        <span className="button__text">Agregar Bonus</span>
        <span className="button__icon">{plusIcon}</span>
      </button>
      <div>
        <div>
          {errorBonus.slotName && <ErrorText>{errorBonus.slotName}</ErrorText>}
        </div>
        <div>{errorBonus.bet && <ErrorText>{errorBonus.bet}</ErrorText>}</div>
      </div>
    </BonusTableStyled>
  )
}

const BonusTableStyled = styled.div`
  box-shadow: inset 0px 10px 10px -10px var(--secondary-color2);
  border-radius: 10px;
  height: 100%;
  overflow-y: auto;

  .icons-container {
    span {
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }

    .edit-logo {
      margin-right: 20px;
      color: var(--secondary-color2);

      &:hover {
        color: var(--secondary-color);
      }
    }

    .delete-logo {
      color: var(--error-color2);

      &:hover {
        color: var(--error-color);
      }
    }
  }

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

  .bonus-form {
    p {
      font-size: 20px;
      margin-top: 5px;
    }

    p.focus {
      color: var(--check-color);
    }

    .input-bonus {
      input {
        text-align: center;
        padding: 10px 0;
        font-size: 20px;
        color: #fff;
        opacity: 0.5;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
      }

      .focus {
        border-bottom: 1px solid var(--check-color);
        color: var(--check-color);
      }
    }
  }

  .button {
    position: relative;
    width: 250px;
    height: 40px;
    font-size: 20px;
    border-radius: 10px;
    margin: 20px auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #34974d;
    opacity: 0.9;
    background-color: var(--check-color);
  }

  .button,
  .button__icon,
  .button__text {
    transition: all 0.3s;
  }

  .button .button__text {
    transform: translateX(30px);
    color: #fff;
    font-weight: 600;
  }

  .button .button__icon {
    border-radius: 10px;
    position: absolute;
    transform: translateX(180px);
    height: 100%;
    width: 40px;
    background-color: var(--check-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button i {
    width: 30px;
    stroke: #fff;
  }

  .button:hover {
    background: var(--check-color2);
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 250px;
    transform: translateX(-6px);
  }

  .button:active .button__icon {
    background-color: var(--check-color2);
  }

  .button:active {
    border: 1px solid var(--check-color2);
  }
`

const ErrorText = styled.span`
  font-size: 12px;
  color: var(--error-color);
`
