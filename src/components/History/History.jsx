import styled from 'styled-components'
import moment from 'moment'
import { useEffect } from 'react'

import { useGlobalContext } from '../../context/globalContext'
import { balanceIcon, coinIcon, dateIcon, winIcon } from '../../utils/Icons'
import { DIRECTIONS } from '../../utils/Direction'

export default function History({ setActive }) {
  const { historyList, getHistories, session } = useGlobalContext()

  useEffect(() => {
    if (session !== null) getHistories()
  }, [session])

  return (
    <HistoryStyled>
      <div className="title-histories">
        <h1>Historial de Partidas Realizadas</h1>
      </div>
      <div className="history-table">
        {historyList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>{coinIcon} Cuota promedio</th>
                <th>{dateIcon} Fecha</th>
                <th>$ Presupuesto inicial</th>
                <th>{winIcon} Recompensa total</th>
                <th>{balanceIcon} Balance</th>
              </tr>
            </thead>
            <tbody>
              {historyList?.map((item, index) => {
                const balance = item.win - item.budget
                const balanceAbs = Math.abs(balance)

                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>x {item.odd}</td>
                    <td>{moment(item.created_at).format('DD-MM-YYYY')}</td>
                    <td>$ {item.budget}</td>
                    <td>$ {item.win}</td>
                    <td className={balance < 0 ? 'loss' : 'win'}>
                      {balance < 0 ? `- $ ${balanceAbs}` : balanceAbs}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="no-histories">
            <h1>Sin Bonus Hunt realizados 😅</h1>
            <p>
              Realiza tu primer Bonus Hunt{' '}
              <span onClick={() => setActive(DIRECTIONS.HOME)}>Aquí!</span>
            </p>
          </div>
        )}
      </div>
    </HistoryStyled>
  )
}

const HistoryStyled = styled.div`
  z-index: 1;
  height: 90vh;
  position: relative;
  flex: 1;
  background: var(--background-default-color);
  border: 3px solid var(--secondary-color);
  border-radius: 10px;
  padding: 20px 5px;
  margin: 1rem;
  backdrop-filter: blur(4.5px);
  overflow-x: hidden;
  overflow-y: auto;

  .title-histories {
    margin: 5vw;

    h1 {
      color: var(--secondary-color);
      font-size: 42px;
      text-shadow: 2px 2px 4px var(--primary-color);
    }
  }

  thead,
  tbody {
    flex: 1;

    .win {
      color: var(--check-color);
    }

    .loss {
      color: var(--error-color);
    }
  }

  tbody tr:hover {
    background-color: var(--background-default-color2);
  }

  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    font-size: 20px;
  }

  td {
    padding: 25px 5px 25px 5px;
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

  .history-table {
    box-shadow: inset 0px 10px 10px -10px var(--secondary-color2);
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    overflow-y: auto;
  }

  .no-histories {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;

    span {
      color: var(--secondary-color);
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: var(--secondary-color3);
      }
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
