import { Dialog } from './components/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { useEffect, useState } from 'preact/hooks'
import { EmptyGoals } from './components/empty-goals'

export function App() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3333/summary')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setSummary(data.summary)
      })
  }, [])

  return (
    <Dialog>
      {/* nullish coalescense operator */}
      {summary?.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}
