import styled, { keyframes } from 'styled-components'

import CheckBox from '../../utils/CheckBox'
import { lockIcon } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'

export default function BudgetForm({
  classNameBudget,
  handleFocus,
  handleBlur,
  checked,
  setChecked,
  errorForm
}) {
  const { budget, setBudget } = useGlobalContext()

  return (
    <>
      <BudgetFormStyled>
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
      </BudgetFormStyled>
      {errorForm.budget && <ErrorText>{errorForm.budget}</ErrorText>}
      {errorForm.checked && <ErrorText>{errorForm.checked}</ErrorText>}
    </>
  )
}

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

const BudgetFormStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  .input-container {
    position: relative;
    margin-left: 50px;

    .lock-icon {
      position: absolute;
      top: -15px;
      left: -15px;
      font-size: 24px;
    }

    .price {
      position: absolute;
      top: -15px;
      left: 30px;
      font-size: 24px;
    }

    .price-focus {
      color: var(--check-color);
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
      border-bottom: 1px solid var(--check-color);
      color: var(--check-color);
    }

    i {
      color: var(--check-color);
    }
  }

  .checkbox {
    margin-top: 20px;
  }
`

const ErrorText = styled.span`
  font-size: 12px;
  color: var(--error-color);
  animation: ${shake} 0.6s;
`
