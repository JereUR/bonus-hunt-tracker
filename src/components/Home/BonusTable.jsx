import styled from 'styled-components'

import slotIcon from '../../assets/slot-icon.png'
import { coinIcon, plusIcon } from '../../utils/Icons'
import { useEffect, useState } from 'react'

export default function BonusTable({
  bonusList,
  setBonusList,
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
  bet
}) {
  const [errorForm, setErrorForm] = useState({})

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

  const addBonus = () => {
    const errors = validation()
    setErrorForm(errors)

    if (!Object.keys(errors).length) {
      const id = generateRandomId()

      const data = {
        id,
        name: slotName,
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
            <th>{coinIcon} Apuesta</th>
          </tr>
        </thead>
        <tbody>
          {bonusList?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>$ {item.bet}</td>
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
                value={bet}
                onChange={handleInputChange}
                onFocus={({ target }) => handleFocus(target.name)}
                onBlur={({ target }) => handleBlur(target.name)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={addBonus} className="button">
        <span className="button__text">Agregar Bonus</span>
        <span className="button__icon">{plusIcon}</span>
      </button>
    </BonusTableStyled>
  )
}

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
        font-size: 16px;
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
