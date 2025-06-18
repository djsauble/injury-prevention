import React, { useState, useEffect } from 'react';
import './MileagePlanner.css'; // Import the CSS file

const MileagePlanner: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
      <h1>Weekly Mileage: {totalMileage} miles</h1>
      <div className="days-container">
        {days.map((day, index) => (
          <div key={day} className="day-planner">
            <h2>{day}</h2>
            <input
              type="range"
              min="0"
              max="20"
              value={mileage[index]}
              onChange={(e) => handleMileageChange(index, parseInt(e.target.value))}
            />
            <p>{mileage[index]} miles</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MileagePlanner;
