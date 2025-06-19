import React, { useState, useEffect } from 'react';
import { Slider, Stack, Typography, Button, Alert } from '@mui/material';

interface MileagePlannerProps {
  onAddWeek: (total: number) => void;
}

const MileagePlanner: React.FC<MileagePlannerProps> = ({ onAddWeek }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const [mileage, setMileage] = useState<number[]>(() => {
    const savedMileage = localStorage.getItem('mileage');
    return savedMileage ? JSON.parse(savedMileage) : new Array(7).fill(0);
  });
  const [weeklyHistory, setWeeklyHistory] = useState<number[]>(() => {
    const savedHistory = localStorage.getItem('mileageHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('mileage', JSON.stringify(mileage));
  }, [mileage]);

  const handleMileageChange = (dayIndex: number, value: number) => {
    const newMileage = [...mileage];
    newMileage[dayIndex] = value;
    setMileage(newMileage);
  };

  const totalMileage = mileage.reduce((sum, dayMileage) => sum + dayMileage, 0);
  const lastWeekMileage = weeklyHistory.length > 0 ? weeklyHistory[weeklyHistory.length - 1] : 0;
  const recommendedMax = Math.round(lastWeekMileage * 1.1);
  const isOverRecommended = lastWeekMileage > 0 && totalMileage > recommendedMax;
  const restDays = mileage.filter(m => m === 0).length;

  const handleAddWeek = () => {
    onAddWeek(totalMileage);
    setMileage(new Array(7).fill(0));
    // Update local history for recommendations
    setWeeklyHistory([...weeklyHistory, totalMileage]);
    localStorage.setItem('mileageHistory', JSON.stringify([...weeklyHistory, totalMileage]));
  };

  return (
    <Stack alignItems="center">
      <Typography variant="h4" gutterBottom>{totalMileage} miles this week</Typography>
      {lastWeekMileage > 0 && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Last week: {lastWeekMileage} miles &nbsp;|&nbsp; Recommended max: {recommendedMax} miles
        </Typography>
      )}
      {isOverRecommended && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You are exceeding the recommended 10% weekly mileage increase. Consider reducing your mileage to prevent injury.
        </Alert>
      )}
      {restDays < 1 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Try to include at least one rest day per week for optimal recovery.
        </Alert>
      )}
      <Stack direction="row">
        {days.map((day, index) => (
          <Stack key={day} alignItems="center">
            <Typography variant="h6">{day}</Typography>
            <Slider
              orientation="vertical"
              min={0}
              max={20}
              value={mileage[index]}
              onChange={(_, newValue) => handleMileageChange(index, newValue as number)}
              sx={{ width: 50, height: 200 }}
              aria-labelledby={`vertical-slider-${index}`}
            />
            <Typography>{mileage[index]} miles</Typography>
          </Stack>
        ))}
      </Stack>
      <Button variant="contained" onClick={handleAddWeek} sx={{ mt: 2 }}>
        Submit Week
      </Button>
    </Stack>
  );
};

export default MileagePlanner;
