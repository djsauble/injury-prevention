import React, { useState, useEffect } from 'react';
import { Slider, Stack } from '@mui/material';

const MileagePlanner: React.FC = () => {
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

  return (
    <Stack alignItems="center">
      <h1>{totalMileage} miles this week</h1>
      <Stack direction="row">
        {days.map((day, index) => (
          <Stack key={day} alignItems="center">
            <h2>{day}</h2>
            <Slider
              orientation="vertical"
              min={0}
              max={20}
              value={mileage[index]}
              onChange={(_, newValue) => handleMileageChange(index, newValue as number)}
              sx={{ width: 50, height: 200 }}
              aria-labelledby={`vertical-slider-${index}`}
            />
            <p>{mileage[index]} miles</p>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default MileagePlanner;
