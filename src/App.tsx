import MileagePlanner from './components/MileagePlanner';
import MileageHistory from './components/MileageHistory';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

function App() {
  const [view, setView] = useState('planner');
  const [weeklyHistory, setWeeklyHistory] = useState<number[]>(() => {
    const savedHistory = localStorage.getItem('mileageHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('mileageHistory', JSON.stringify(weeklyHistory));
  }, [weeklyHistory]);

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, nextView: string | null) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleAddWeek = (total: number) => {
    setWeeklyHistory([...weeklyHistory, total]);
  };

  const handleResetHistory = () => {
    setWeeklyHistory([]);
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
        {view === 'planner' ? <MileagePlanner onAddWeek={handleAddWeek} /> : <MileageHistory weeklyHistory={weeklyHistory} onResetHistory={handleResetHistory} />}
      </Box>
    </Stack>
  )
}

export default App
