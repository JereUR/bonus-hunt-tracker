import styled from 'styled-components'
import { useEffect, useState } from 'react'

import slotIcon from '../../assets/slot-icon.png'
import betIcon from '../../assets/bet-icon.png'
import { editIcon, plusIcon, settingsIcon, trashIcon } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'
import Loader from '../Loader/Loader'
import { toast } from 'react-toastify'

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
  const [loading, setLoading] = useState(false)

  const { bonusList, deleteBonusItem, addBonus, getBonuses, session } =
    useGlobalContext()

  useEffect(() => {
    if (session !== null) getBonuses()
  }, [session])

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

  const editData = async (el) => {
    await deleteBonusItem(el.id)

    document.getElementById('slotName-input').value = el.slotName
    document.getElementById('bet-input').value = el.bet

    setBonusData({
      slotName: el.slotName,
      bet: el.bet,
      win: null,
      odd: null,
      user_id: session?.user.id || session?.session.user.id
    })
  }

  const handleAdd = async () => {
    setLoading(true)
    const errors = validation()
    setErrorBonus(errors)

    if (Object.keys(errors).length === 0) {
      const { error } = await addBonus(bonusData)
      setClassNameSlotName(false)
      setClassNameBet(false)
      setBonusData(initialBonusData)
      setErrorBonus({})

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
    }

    setLoading(false)
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
            <th>{settingsIcon} Edición</th>
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
      <button type="button" onClick={handleAdd} className="button">
        <span className="button__text">Agregar Bonus</span>
        <span className="button__icon">{plusIcon}</span>
      </button>
      <div>
        <div>
          {errorBonus.slotName && <ErrorText>{errorBonus.slotName}</ErrorText>}
        </div>
        <div>{errorBonus.bet && <ErrorText>{errorBonus.bet}</ErrorText>}</div>
      </div>
      {loading && <Loader customClass="add-bonus-loader" />}
    </BonusTableStyled>
  )
}

const BonusTableStyled = styled.div`
  box-shadow: inset 0px 10px 10px -10px var(--secondary-color2);
  padding: 20px 5px;
  border-radius: 10px;
  height: 100%;
  overflow-y: auto;

  .add-bonus-loader {
    margin: 20px auto 10px auto;
  }

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

  tbody tr:hover {
    background-color: var(--background-default-color2);
  }

  tbody tr:last-child:hover {
    background-color: transparent;
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

  .input-bonus,
  .id-container {
    border: none !important;
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
    height: 45px;
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
    transition: all 0.4s;
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color3);
    border-radius: 5px;
  }
`

const ErrorText = styled.span`
  font-size: 12px;
  color: var(--error-color);
`
