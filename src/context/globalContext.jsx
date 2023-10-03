import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { supabase } from '../services/supabase'
import {
  addBonusToSupabase,
  deleteAllBonusFromUser,
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
    supabase.auth.getSession().then(({ data }) => {
      if (data.session.user !== null) {
        getUserInfo(data.session.user)
      }
    })

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
    if (session.user === null) return

    const { error, bonuses } = await getBonusesFromSupabase()

    if (error === null) {
      setBonusList(bonuses)
    }
  }

  const addBonus = async (bonus) => {
    if (session.user === null) return

    const { error } = await addBonusToSupabase(bonus)

    if (error === null) {
      getBonuses()
    }

    return { error }
  }

  const deleteAllBonus = async (id) => {
    const { error } = await deleteAllBonusFromUser(id)

    if (error === null) getBonuses()

    return { error }
  }

  const deleteBonusItem = async (id) => {
    const { error } = await deleteBonusFromSupabase(id)

    if (error === null) getBonuses()
  }

  const updateBonusItem = async (id, win, odd) => {
    const { error } = await updateBonusItemFromSupabase(id, win, odd)

    if (error === null) {
      getBonuses()
    }

    return { error }
  }

  const updateWin = async ({ id, win }) => {
    let odd

    bonusList.map((bonus) => {
      if (bonus.id === id) {
        if (win !== null) {
          odd = (Number(win) / Number(bonus.bet)).toFixed(2)
        } else {
          odd = null
        }
      }
    })

    const { error } = await updateBonusItem(id, win, odd)

    return { error }
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
        deleteAllBonus,
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
