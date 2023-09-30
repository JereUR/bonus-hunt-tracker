import { useMemo, useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Orb from './components/Orb/Orb'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'
import { useGlobalContext } from './context/globalContext'
import useUpdateSession from './utils/useUpdateSession'
import Header from './components/Header/Header'

export default function App() {
  const [active, setActive] = useState('login')
  const { session } = useGlobalContext()
  useUpdateSession({ session, setActive })

  const displayData = () => {
    switch (active) {
      case 'login':
        return <Login setActive={setActive} />
      case 'signup':
        return <SignUp setActive={setActive} />
      case 'home':
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
    <>
      {orbMemo}
      <main>{displayData()}</main>
    </>
  )
}
