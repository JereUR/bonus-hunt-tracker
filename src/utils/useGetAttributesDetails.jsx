import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/globalContext'

export default function useGetAttributesDetails() {
  const { bonusList, budget, onRun, reset } = useGlobalContext()
  const [maxWin, setMaxWin] = useState(null)
  const [maxOdd, setMaxOdd] = useState(null)
  const [currentAvg, setCurrentAvg] = useState(null)
  const [requiredAvg, setRequiredAvg] = useState(null)
  const [totalWin, setTotalWin] = useState(null)

  let betMount = 0
  let oddMount = 0
  let oddCount = 0
  let win = 0
  console.log(onRun)
  useEffect(() => {
    if (!reset) {
      bonusList.forEach((item) => {
        if (
          item.win !== null &&
          (maxWin === null || Number(item.win) > maxWin)
        ) {
          setMaxWin(Number(item.win))
        }

        if (
          item.odd !== null &&
          (maxOdd === null || Number(item.odd) > maxOdd)
        ) {
          setMaxOdd(Number(item.odd))
        }

        if (onRun) {
          if (item.odd !== null) {
            oddCount++
            oddMount += Number(item.odd)
            win += Number(item.win)
          } else {
            betMount += Number(item.bet)
          }
        } else {
          betMount += Number(item.bet)
        }
      })
    } else {
      bonusList.forEach((item) => {
        betMount += Number(item.bet)
      })
    }

    let Cavg = null
    let Ravg = null

    if (betMount === 0) {
      Ravg = 'F'
    } else {
      if (onRun) {
        Ravg = ((Number(budget) - win) / betMount).toFixed(2)
      } else {
        if (budget > 0) Ravg = (Number(budget) / betMount).toFixed(2)
      }
    }

    if (oddCount > 0) {
      Cavg = (oddMount / oddCount).toFixed(2)
    } else {
      Cavg = (oddMount / bonusList.length).toFixed(2)
    }

    setRequiredAvg(Ravg)
    setCurrentAvg(Cavg)
    setTotalWin(win)
  }, [bonusList, budget, onRun])

  return { maxWin, maxOdd, currentAvg, requiredAvg, totalWin }
}
