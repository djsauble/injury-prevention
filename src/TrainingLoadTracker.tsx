import { useState } from 'react'

export interface RunEntry {
  date: string // ISO date string
  distance: number // in kilometers
  intensity: number // 1-10 scale
}

function getWeek(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - d.getDay())
  return d.toISOString().slice(0, 10)
}

function calculateWeeklyTotals(runs: RunEntry[]) {
  const weekMap: Record<string, { distance: number; intensity: number }> = {}
  for (const run of runs) {
    const week = getWeek(new Date(run.date))
    if (!weekMap[week]) weekMap[week] = { distance: 0, intensity: 0 }
    weekMap[week].distance += run.distance
    weekMap[week].intensity += run.intensity
  }
  return weekMap
}

export default function TrainingLoadTracker() {
  const [runs, setRuns] = useState<RunEntry[]>([])
  const [date, setDate] = useState('')
  const [distance, setDistance] = useState('')
  const [intensity, setIntensity] = useState('')
  const [alert, setAlert] = useState<string | null>(null)

  function addRun(e: React.FormEvent) {
    e.preventDefault()
    if (!date || !distance || !intensity) return
    const newRun: RunEntry = {
      date,
      distance: parseFloat(distance),
      intensity: parseInt(intensity, 10),
    }
    const newRuns = [...runs, newRun]
    setRuns(newRuns)
    setDate('')
    setDistance('')
    setIntensity('')
    checkTrainingLoad(newRuns)
  }

  function checkTrainingLoad(runs: RunEntry[]) {
    const weekTotals = calculateWeeklyTotals(runs)
    const weeks = Object.keys(weekTotals).sort()
    if (weeks.length < 2) return setAlert(null)
    const last = weekTotals[weeks[weeks.length - 1]]
    const prev = weekTotals[weeks[weeks.length - 2]]
    const distIncrease = prev.distance > 0 ? (last.distance - prev.distance) / prev.distance : 0
    const intIncrease = prev.intensity > 0 ? (last.intensity - prev.intensity) / prev.intensity : 0
    if (distIncrease > 0.1) {
      setAlert('Warning: Your weekly distance increased by more than 10%!')
    } else if (intIncrease > 0.1) {
      setAlert('Warning: Your weekly intensity increased by more than 10%!')
    } else {
      setAlert(null)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Training Load Tracker</h2>
      <form onSubmit={addRun} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </label>
        <label>
          Distance (km):
          <input type="number" min="0" step="0.01" value={distance} onChange={e => setDistance(e.target.value)} required />
        </label>
        <label>
          Intensity (1-10):
          <input type="number" min="1" max="10" value={intensity} onChange={e => setIntensity(e.target.value)} required />
        </label>
        <button type="submit">Add Run</button>
      </form>
      {alert && <div style={{ color: 'red', marginTop: 12 }}>{alert}</div>}
      <h3 style={{ marginTop: 24 }}>Run History</h3>
      <ul style={{ textAlign: 'left' }}>
        {runs.map((run, i) => (
          <li key={i}>
            {run.date}: {run.distance} km, intensity {run.intensity}
          </li>
        ))}
      </ul>
    </div>
  )
}
