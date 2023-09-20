import styled from 'styled-components'

import slotIcon from '../../assets/slot-icon.png'
import { coinIcon } from '../../utils/Icons'

export default function BonusTable({
  bonusList,
  classNameSlotName,
  slotName,
  handleInputChange,
  handleFocus,
  handleBlur,
  classNameBet,
  bet
}) {
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
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>$ {item.bet}</td>
            </tr>
          ))}
          <tr className="bonus-form">
            <td className="id-container">
              <p>{bonusList.length + 1}</p>
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
    </BonusTableStyled>
  )
}

const BonusTableStyled = styled.div`
  box-shadow: inset 0px 10px 10px -10px var(--secondary-color2);
  border-radius: 10px;

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

    .input-bonus {
      input {
        text-align: center;
        padding: 10px 0;
        font-size: 16px;
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
    }
  }
`
