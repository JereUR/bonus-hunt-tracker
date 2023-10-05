import { useState } from 'react'
import styled from 'styled-components'

import { budgetIcon, giftIcon } from '../../utils/Icons'
import BudgetForm from './BudgetForm'
import BonusTable from './BonusTable'
import { useGlobalContext } from '../../context/globalContext'
import StartingBonusTable from './StartingBonusTable'

export default function LeftSide() {
  const { session, budget, bonusList, onRun, setOnRun, setReset } =
    useGlobalContext()

  const initialBonusData = {
    slotName: '',
    bet: '',
    win: null,
    odd: null,
    user_id: session?.user.id || session?.session.user.id
  }

  const [classNameBudget, setClassNameBudget] = useState(false)
  const [checked, setChecked] = useState(false)
  const [bonusData, setBonusData] = useState(initialBonusData)
  const [classNameSlotName, setClassNameSlotName] = useState(false)
  const [classNameBet, setClassNameBet] = useState(false)
  const [errorForm, setErrorForm] = useState({})

  const { slotName, bet } = bonusData

  const validation = () => {
    let error = {}

    if (!checked) {
      error.checked = 'Debe confirmar el presupuesto (Click en circulo blanco).'
    } else {
      if (budget === '') {
        error.budget = 'Debe ingresar el presupuesto inicial.'
      }

      if (budget < 0) {
        error.budget = 'El presupuesto debe ser positivo.'
      }
    }

    if (bonusList.length === 0) {
      error.bonusList = 'La lista de bonus esta vacia.'
    }

    return error
  }

  const handleFocus = (name) => {
    switch (name) {
      case 'budget':
        setClassNameBudget(true)
        break
      case 'slotName':
        setClassNameSlotName(true)
        break
      case 'bet':
        setClassNameBet(true)
        break
    }
  }

  const handleBlur = (name) => {
    switch (name) {
      case 'budget':
        if (budget === '') {
          setClassNameBudget(false)
        }
        break
      case 'slotName':
        if (slotName === '') {
          setClassNameSlotName(false)
        }
        break
      case 'bet':
        if (bet === '') {
          setClassNameBet(false)
        }
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validation()
    setErrorForm(errors)

    if (!Object.keys(errors).length) {
      if (window.confirm('¿Comenzar Bonus Hunt?')) {
        setReset(false)
        setOnRun(true)
      }
    }
  }

  return (
    <>
      <LeftSideStyled>
        {!onRun ? (
          <>
            <div className="budget-title">
              <h3>{budgetIcon} PRESUPUESTO INICIAL</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <BudgetForm
                classNameBudget={classNameBudget}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                checked={checked}
                setChecked={setChecked}
                errorForm={errorForm}
              />
              <div className="slots-section">
                <div className="bonus-title">
                  <h3>{giftIcon} LISTA DE BONUS</h3>
                </div>
                <BonusTable
                  classNameSlotName={classNameSlotName}
                  setClassNameSlotName={setClassNameSlotName}
                  slotName={slotName}
                  bonusData={bonusData}
                  initialBonusData={initialBonusData}
                  setBonusData={setBonusData}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  classNameBet={classNameBet}
                  setClassNameBet={setClassNameBet}
                  bet={bet}
                  errorForm={errorForm}
                />
              </div>
              <button className="submit-btn">COMENZAR</button>
            </form>
          </>
        ) : (
          <StartingBonusTable
            bonusList={bonusList}
            setChecked={setChecked}
            setClassNameBudget={setClassNameBudget}
          />
        )}
      </LeftSideStyled>
    </>
  )
}

const LeftSideStyled = styled.div`
  z-index: 1;
  position: relative;
  flex: 2;
  background: var(--background-default-color);
  border: 3px solid var(--secondary-color);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: 10px;
  backdrop-filter: blur(4.5px);
  overflow-x: hidden;
  overflow-y: auto;

  .budget-title {
    color: var(--secondary-color);
    width: fit-content;
    margin: 50px auto;
    border-radius: 20px 0 20px 0;
    overflow: hidden;
    box-shadow: 0px 0px 2px 2px var(--secondary-color2);
    background: var(--background-default-color);
    backdrop-filter: blur(4.5px);

    h3 {
      padding: 10px 30px;
      margin: 0;

      i {
        margin-right: 5px;
        font-size: 22px;
      }
    }
  }

  .slots-section {
    display: flex;
    flex-direction: column;
    align-items: 'flex-start';
    padding: 10px 30px;

    .bonus-title {
      color: var(--secondary-color);
      width: fit-content;
      margin: 20px auto 50px auto;
      border-radius: 20px 0 20px 0;
      overflow: hidden;
      box-shadow: 0px 0px 2px 2px var(--secondary-color2);
      background: var(--background-default-color);
      backdrop-filter: blur(4.5px);

      h3 {
        padding: 10px 30px;
        margin: 0;

        i {
          margin-right: 5px;
          font-size: 22px;
        }
      }
    }
  }

  .submit-btn {
    bottom: 10px;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    margin: 50px 0px;
    padding: 15px;
    width: 50%;
    background-color: var(--primary-color2);
    opacity: 0.7;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 4px var(--secondary-color2);
    transition: opacity 0.3s ease-in-out;

    &:hover {
      opacity: 1;
    }

    &:active {
      box-shadow: none;
      transform: translate(2px, 2px);
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color3);
    border-radius: 5px;
  }
`
