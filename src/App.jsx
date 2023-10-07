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
import History from './components/History/History'
import EmailForm from './components/Recover/EmailForm'
import PasswordForm from './components/Recover/PasswordForm'

export default function App() {
  const [active, setActive] = useState(DIRECTIONS.LOGIN)
  const { session } = useGlobalContext()
  useUpdateSession({ session, setActive })
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  const displayData = () => {
    if (!token) {
      switch (active) {
        case DIRECTIONS.LOGIN:
          return <Login setActive={setActive} />
        case DIRECTIONS.SIGNUP:
          return <SignUp setActive={setActive} />
        case DIRECTIONS.RECOVER:
          return <EmailForm setActive={setActive} />
        case DIRECTIONS.HOME:
          return (
            <>
              <Header active={active} setActive={setActive} />
              <Home />
            </>
          )
        case DIRECTIONS.HISTORY:
          return (
            <>
              <Header active={active} setActive={setActive} />
              <History setActive={setActive} />
            </>
          )
      }
    } else {
      return <PasswordForm setActive={setActive} token={token} />
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
