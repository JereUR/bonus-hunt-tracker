import { useState } from 'react'
import styled from 'styled-components'

import slotIcon from '../../assets/slot-icon.png'
import { budgetIcon, coinIcon, giftIcon, lockIcon } from '../../utils/Icons'
import CheckBox from '../../utils/CheckBox'

export default function LeftSide() {
  const [budget, setBudget] = useState('')
  const [classNameBudget, setClassNameBudget] = useState(false)
  const [checked, setChecked] = useState(false)
  const [bonusList, setBonusList] = useState([])

  const handleFocus = (name) => {
    switch (name) {
      case 'budget':
        setClassNameBudget(true)
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
    }
  }

  return (
    <>
      <LeftSideStyled>
        <div className="budget-title">
          <h3>{budgetIcon} PRESUPUESTO INICIAL</h3>
        </div>
        <form>
          <div className="budget-form">
            <div className="input-container">
              <input
                className={classNameBudget ? 'focus' : ''}
                type="number"
                name="budget"
                value={budget}
                onChange={({ target }) => setBudget(target.value)}
                onFocus={({ target }) => handleFocus(target.name)}
                onBlur={({ target }) => handleBlur(target.name)}
                disabled={checked}
                style={{ opacity: checked ? '1' : '0.7' }}
              />
              <p
                className={classNameBudget ? 'price price-focus' : 'price'}
                style={{ opacity: checked ? '1' : '0.7' }}
              >
                $
              </p>
              {checked && <p className="lock-icon">{lockIcon}</p>}
            </div>
            <div className="checkbox">
              <CheckBox checked={checked} setChecked={setChecked} />
            </div>
          </div>
          <div className="slots-section">
            <div className="bonus-title">
              <h3>{giftIcon} LISTA DE BONUS</h3>
            </div>
            <div className="bonus-table">
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
              </table>
            </div>
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
  background: var(--background-home-color);
  border: 3px solid var(--primary-color);
  border-right-width: 3px;
  backdrop-filter: blur(4.5px);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: auto;
  overflow-x: hidden;

  .budget-title {
    color: var(--text-color);
    width: fit-content;
    margin: 50px auto;
    border-radius: 20px 0 20px 0;
    overflow: hidden;
    box-shadow: 0px 0px 2px 2px var(--primary-color);
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

  .budget-form {
    display: flex;
    justify-content: center;
    gap: 2rem;

    .input-container {
      position: relative;
      margin-left: 50px;

      .lock-icon {
        position: absolute;
        top: -20px;
        left: 10px;
        font-size: 24px;
      }

      .price {
        position: absolute;
        top: -20px;
        left: 70px;
        font-size: 24px;
      }

      .price-focus {
        color: var(--secondary-color);
      }

      input {
        text-align: center;
        padding: 10px 0;
        font-size: 24px;
        width: 100%;
        color: #fff;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
      }

      .focus {
        border-bottom: 1px solid var(--secondary-color);
        color: var(--secondary-color);
      }

      i {
        color: var(--check-color);
      }
    }

    .checkbox {
      margin-top: 20px;
    }
  }

  .bonus-title {
    color: var(--text-color);
    width: fit-content;
    margin: 20px auto 50px auto;
    border-radius: 20px 0 20px 0;
    overflow: hidden;
    box-shadow: 0px 0px 2px 2px var(--primary-color);
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

  .bonus-table {
    table {
      width: 100%;
      border-collapse: collapse;
    }

    tr {
      display: flex;
      justify-content: space-around;
    }

    th {
      padding: 20px;
      font-size: 20px;

      i {
        margin-right: 5px;
      }

      img {
        width: 20px;
        margin-right: 5px;
      }
    }
  }
`
