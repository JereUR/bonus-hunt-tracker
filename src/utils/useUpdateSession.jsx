import { useEffect } from 'react'

export default function useUpdateSession({ session, setActive }) {
  useEffect(() => {
    if (session !== null && session?.session !== null) {
      setActive('home')
    } else {
      setActive('login')
    }
  }, [session])
}
