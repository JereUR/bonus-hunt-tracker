import { useState } from 'react'
import styled from 'styled-components'
import { lockIcon } from '../../utils/Icons'
import CheckBox from '../../utils/CheckBox'

export default function LeftSide() {
  const [budget, setBudget] = useState('')
  const [classNameBudget, setClassNameBudget] = useState(false)
  const [checked, setChecked] = useState(false)

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
    <LeftSideStyled>
      <h2>PRESUPUESTO INICIAL</h2>
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
          {checked && <p className="lock-icon">{lockIcon}</p>}
        </div>
        <div className="checkbox">
          <CheckBox checked={checked} setChecked={setChecked} />
        </div>
      </div>
    </LeftSideStyled>
  )
}

const LeftSideStyled = styled.div`
  flex: 2;
  background: rgba(10, 10, 10, 0.78);
  border: 2px solid var(--primary-color3);
  backdrop-filter: blur(4.5px);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: auto;
  overflow-x: hidden;

  h2 {
    color: var(--secondary-color);
    margin-bottom: 50px;
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
`
