import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/globalContext'

export default function useGetAttributesDetails() {
  const { bonusList, budget, onRun } = useGlobalContext()
  const [maxWin, setMaxWin] = useState(null)
  const [maxOdd, setMaxOdd] = useState(null)
  const [currentAvg, setCurrentAvg] = useState(null)
  const [requiredAvg, setRequiredAvg] = useState(null)

  let betMount = 0
  let oddMount = 0

  useEffect(() => {
    bonusList.forEach((item) => {
      if (item.win !== null && (maxWin === null || item.win > maxWin)) {
        console.log('update')
        setMaxWin(item.win)
      }

      if (item.odd !== null && (maxOdd === null || item.odd > maxOdd)) {
        setMaxOdd(item.odd)
      }

      if (onRun) {
        if (item.odd !== null) {
          oddMount += item.odd
        }
      }

      betMount += item.bet
    })

    const Ravg = (Number(budget) / betMount).toFixed(2)
    const Cavg = (oddMount / bonusList.length).toFixed(2)

    setRequiredAvg(Ravg)
    setCurrentAvg(Cavg)
  }, [bonusList, budget])

  return { maxWin, maxOdd, currentAvg, requiredAvg }
}
