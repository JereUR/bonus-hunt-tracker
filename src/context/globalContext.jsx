import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { supabase } from '../services/supabase'
import {
  addBonusToSupabase,
  deleteBonusFromSupabase,
  getBonusesFromSupabase,
  updateBonusItemFromSupabase
} from '../services'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [onRun, setOnRun] = useState(false)
  const [budget, setBudget] = useState('')
  const [bonusList, setBonusList] = useState([])
  const [reset, setReset] = useState(false)
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  //Session

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (session !== null) {
        getUserInfo(session?.user)
      }
    })
  }, [])

  const getUserInfo = async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)

    if (error === null) {
      setUser(data)
    }
  }

  //Bonuses

  const getBonuses = async () => {
    if (user === null) return

    const { error, bonuses } = await getBonusesFromSupabase()

    if (error === null) {
      setBonusList(bonuses)
    }
  }

  const addBonus = async (bonus) => {
    if (user === null) return

    const { error } = await addBonusToSupabase(bonus)

    if (error === null) {
      getBonuses()
    }
  }

  const deleteBonusItem = async (id) => {
    const { error } = await deleteBonusFromSupabase(id)

    if (error === null) getBonuses()
  }

  /*  const deleteBonusItem = (id) => {
    let newData = bonusList.filter((el) => el.id !== id)
    setBonusList(newData)
  }*/

  const updateBonusItem = async (id, win, odd) => {
    const { error } = await updateBonusItemFromSupabase(id, win, odd)

    if (error === null) {
      getBonuses()
    }
  }

  const updateWin = ({ id, win }) => {
    setBonusList((prevBonusList) => {
      return prevBonusList.map((bonus) => {
        if (bonus.id === id) {
          let odd

          if (win !== null) {
            odd = (Number(win) / Number(bonus.bet)).toFixed(2)
          } else {
            odd = null
          }

          return {
            ...bonus,
            win,
            odd
          }
        }
        return bonus
      })
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        session,
        user,
        budget,
        setBudget,
        getBonuses,
        bonusList,
        addBonus,
        deleteBonusItem,
        onRun,
        setOnRun,
        updateWin,
        updateBonusItem,
        reset,
        setReset,
        error,
        setError
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
