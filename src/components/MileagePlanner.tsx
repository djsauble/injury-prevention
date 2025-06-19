import React, { useState, useEffect } from 'react';
import { Slider, Stack, Typography, Button } from '@mui/material';

interface MileagePlannerProps {
  onAddWeek: (total: number) => void;
}

const MileagePlanner: React.FC<MileagePlannerProps> = ({ onAddWeek }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const [mileage, setMileage] = useState<number[]>(() => {
    const savedMileage = localStorage.getItem('mileage');
    return savedMileage ? JSON.parse(savedMileage) : new Array(7).fill(0);
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

  const handleAddWeek = () => {
    onAddWeek(totalMileage);
    setMileage(new Array(7).fill(0));
  };

  return (
    <Stack alignItems="center">
      <Typography variant="h4" gutterBottom>{totalMileage} miles this week</Typography>
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
