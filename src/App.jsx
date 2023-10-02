import { useMemo, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import './App.css'
import Login from './components/Login/Login'
import Orb from './components/Orb/Orb'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'
import { useGlobalContext } from './context/globalContext'
import useUpdateSession from './utils/useUpdateSession'
import Header from './components/Header/Header'
import { DIRECTIONS } from './utils/Direction'

export default function App() {
  const [active, setActive] = useState('login')
  const { session } = useGlobalContext()
  useUpdateSession({ session, setActive })

  const displayData = () => {
    switch (active) {
      case DIRECTIONS.LOGIN:
        return <Login setActive={setActive} />
      case DIRECTIONS.SIGNUP:
        return <SignUp setActive={setActive} />
      case DIRECTIONS.HOME:
        return (
          <>
            <Header active={active} setActive={setActive} />
            <Home />
          </>
        )
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  return (
    <div>
      {orbMemo}
      <main>{displayData()}</main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
