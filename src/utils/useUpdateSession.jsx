import { useEffect } from 'react'
import { DIRECTIONS } from './Direction'

export default function useUpdateSession({ session, setActive }) {
  useEffect(() => {
    if (session !== null && session?.session !== null) {
      setActive(DIRECTIONS.HOME)
    } else {
      setActive(DIRECTIONS.LOGIN)
    }
  }, [session])
}
