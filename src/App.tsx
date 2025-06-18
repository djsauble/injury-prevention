import './App.css'
import MileagePlanner from './components/MileagePlanner'; // Import MileagePlanner
import MileageHistory from './components/MileageHistory'; // Import MileageHistory
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

function App() {
  const [view, setView] = useState('planner');

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, nextView: string | null) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label="view toggle"
      >
        <ToggleButton value="planner" aria-label="mileage planner">
          Mileage Planner
        </ToggleButton>
        <ToggleButton value="history" aria-label="mileage history">
          Mileage History
        </ToggleButton>
      </ToggleButtonGroup>

      {view === 'planner' ? <MileagePlanner /> : <MileageHistory />}
    </>
  )
}

export default App
