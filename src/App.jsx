import { useMemo, useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Orb from './components/Orb/Orb'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'

export default function App() {
  const [active, setActive] = useState('home')

  const displayData = () => {
    switch (active) {
      case 'login':
        return <Login setActive={setActive} />
      case 'signup':
        return <SignUp setActive={setActive} />
      case 'home':
        return <Home />
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
