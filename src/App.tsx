import './App.css'
import MileagePlanner from './components/MileagePlanner'; // Import MileagePlanner
import MileageHistory from './components/MileageHistory'; // Import MileageHistory
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; // Use Box instead of Item
import { useState } from 'react';

function App() {
  const [view, setView] = useState('planner');

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, nextView: string | null) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <Stack direction="column" sx={{ height: '100%', alignItems: 'center' }}>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label="view toggle"
        sx={{ padding: '2em 0 2em 0' }}
      >
        <ToggleButton value="planner" aria-label="mileage planner">
          Mileage Planner
        </ToggleButton>
        <ToggleButton value="history" aria-label="mileage history">
          Mileage History
        </ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ width: '100%', overflowY: 'auto' }}>
        {view === 'planner' ? <MileagePlanner /> : <MileageHistory />}
      </Box>
    </Stack>
  )
}

export default App
