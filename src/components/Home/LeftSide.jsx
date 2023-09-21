import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { budgetIcon, giftIcon } from '../../utils/Icons'
import BudgetForm from './BudgetForm'
import BonusTable from './BonusTable'

const initialBonusData = {
  id: '',
  slotName: '',
  bet: ''
}

const data = [
  {
    id: 1,
    name: 'example',
    bet: '20'
  },
  {
    id: 2,
    name: 'example 2',
    bet: '40'
  }
]

export default function LeftSide() {
  const [budget, setBudget] = useState('')
  const [classNameBudget, setClassNameBudget] = useState(false)
  const [checked, setChecked] = useState(false)
  const [bonusList, setBonusList] = useState(data)
  const [bonusData, setBonusData] = useState(initialBonusData)
  const [classNameSlotName, setClassNameSlotName] = useState(false)
  const [classNameBet, setClassNameBet] = useState(false)

  const { slotName, bet } = bonusData

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

  return (
    <>
      <LeftSideStyled>
        <div className="budget-title">
          <h3>{budgetIcon} PRESUPUESTO INICIAL</h3>
        </div>
        <form>
          <BudgetForm
            classNameBudget={classNameBudget}
            budget={budget}
            setBudget={setBudget}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            checked={checked}
            setChecked={setChecked}
          />
          <div className="slots-section">
            <div className="bonus-title">
              <h3>{giftIcon} LISTA DE BONUS</h3>
            </div>
            <BonusTable
              bonusList={bonusList}
              setBonusList={setBonusList}
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
            />
          </div>
        </form>
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
  border-right-width: 3px;
  margin-right: 20px;
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
`
