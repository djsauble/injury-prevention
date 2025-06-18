import React, { useState, useEffect } from 'react';
import './MileagePlanner.css'; // Import the CSS file
import Slider from '@mui/material/Slider'; // Import Material UI Slider

const MileagePlanner: React.FC = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; // Changed to shorthand day names
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
    <div className="mileage-planner">
      <h1>{totalMileage} miles this week</h1>
      <div className="days-container">
        {days.map((day, index) => (
          <div key={day} className="day-planner">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MileagePlanner;
