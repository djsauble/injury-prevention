import React from 'react';
import { Stack, Typography, List, ListItem, ListItemText } from '@mui/material';

interface MileageHistoryProps {
  weeklyHistory: number[];
}

const MileageHistory: React.FC<MileageHistoryProps> = ({ weeklyHistory }) => {
  return (
    <Stack alignItems="center">
      <Typography variant="h4" gutterBottom>Mileage History</Typography>
      {weeklyHistory.length === 0 ? (
        <Typography>You haven't submitted any weekly mileage yet</Typography>
      ) : (
        <List>
          {weeklyHistory.slice().reverse().map((total, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Week ${weeklyHistory.length - index}: ${total} miles`} />
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
};

export default MileageHistory;
