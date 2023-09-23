import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const costumBonusList = [
  {
    id: 'bonus_1000',
    slotName: 'Slot 1',
    bet: '30',
    win: null
  },
  {
    id: 'bonus_2000',
    slotName: 'Slot 2',
    bet: '40',
    win: null
  },
  {
    id: 'bonus_3000',
    slotName: 'Slot 3',
    bet: '50',
    win: null
  },
  {
    id: 'bonus_4000',
    slotName: 'Slot 4',
    bet: '30',
    win: null
  },
  {
    id: 'bonus_5000',
    slotName: 'Slot 5',
    bet: '80',
    win: null
  },
  {
    id: 'bonus_6000',
    slotName: 'Slot 6',
    bet: '60',
    win: null
  },
  {
    id: 'bonus_7000',
    slotName: 'Slot 7',
    bet: '70',
    win: null
  },
  {
    id: 'bonus_8000',
    slotName: 'Slot 8',
    bet: '80',
    win: null
  },
  {
    id: 'bonus_9000',
    slotName: 'Slot 9',
    bet: '90',
    win: null
  },
  {
    id: 'bonus_1100',
    slotName: 'Slot 10',
    bet: '130',
    win: null
  },
  {
    id: 'bonus_1200',
    slotName: 'Slot 11',
    bet: '40',
    win: null
  },
  {
    id: 'bonus_1300',
    slotName: 'Slot 12',
    bet: '50',
    win: null
  }
]

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [onRun, setOnRun] = useState(true)
  const [budget, setBudget] = useState('')
  const [bonusList, setBonusList] = useState(costumBonusList)

  const deleteBonusItem = (id) => {
    let newData = bonusList.filter((el) => el.id !== id)
    setBonusList(newData)
  }

  const updateWin = (id, win) => {
    setBonusList((prevBonusList) => {
      return prevBonusList.map((bonus) => {
        if (bonus.id === id) {
          return {
            ...bonus,
            win
          }
        }
        return bonus
      })
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        budget,
        setBudget,
        bonusList,
        setBonusList,
        deleteBonusItem,
        onRun,
        setOnRun,
        updateWin
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

GlobalProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
