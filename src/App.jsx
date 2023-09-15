import { useMemo, useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Orb from './components/Orb/Orb'
import SignUp from './components/SignUp/SignUp'

function App() {
  const [active, setActive] = useState(0)

  const displayData = () => {
    switch (active) {
      case 0:
        return <Login setActive={setActive} />
      case 1:
        return <SignUp setActive={setActive} />
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

export default App