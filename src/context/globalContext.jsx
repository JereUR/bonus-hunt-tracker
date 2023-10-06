import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { supabase } from '../services/supabase'
import {
  addBonusToSupabase,
  addHistoryToSupabase,
  deleteAllBonusFromUser,
  deleteBonusFromSupabase,
  getBonusesFromSupabase,
  getHistoriesFromSupabase,
  updateBonusItemFromSupabase
} from '../services'
import { toast } from 'react-toastify'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [onRun, setOnRun] = useState(false)
  const [budget, setBudget] = useState('')
  const [bonusList, setBonusList] = useState([])
  const [historyList, setHistoryList] = useState([])
  const [reset, setReset] = useState(false)
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  //Session

  useEffect(() => {
    const { error: errorUser } = supabase.auth.getSession().then(({ data }) => {
      if (errorUser) {
        toast.error(errorUser.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        })
      } else {
        if (data.session.user !== null) {
          getUserInfo(data.session.user)
        }
      }
    })

    const { error: errorSession } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (errorSession) {
          toast.error(errorSession.message, {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'
          })
        } else {
          setSession(session)

          if (session !== null) {
            getUserInfo(session?.user)
          }
        }
      }
    )
  }, [])

  const getUserInfo = async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)

    if (error === null) {
      setUser(data)
    }

    return { error }
  }

  //Bonuses

  const getBonuses = async () => {
    if (session.user === null) return

    const { error, bonuses } = await getBonusesFromSupabase()

    if (error === null) {
      setBonusList(bonuses)
    }

    return { error }
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

    return { error }
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

  //Histories

  const getHistories = async () => {
    if (session.user === null) return

    const { error, histories } = await getHistoriesFromSupabase()

    if (error === null) {
      setHistoryList(histories)
    }

    return { error }
  }

  const addHistory = async (history) => {
    if (session.user === null) return

    const { error } = await addHistoryToSupabase(history)

    if (error === null) {
      getHistories()
    }

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
        getHistories,
        historyList,
        addHistory,
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
