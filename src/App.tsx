import './App.css';
import React, { useState } from 'react';

function App() {
  const [checklist, setChecklist] = useState([
    { label: 'Warm up for at least 5 minutes', checked: false },
    { label: 'Stretch major muscle groups', checked: false },
    { label: 'Check for any pain or discomfort', checked: false },
    { label: 'Hydrate before activity', checked: false },
  ]);

  const handleCheck = (index: number) => {
    setChecklist(prev => prev.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="pre-activity-checklist" style={{ maxWidth: 420, margin: '2rem auto', padding: 32, border: '2px solid #1976d2', borderRadius: 16, background: 'white', boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)' }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>Pre-Activity Checklist</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {checklist.map((item, idx) => (
          <li key={item.label} style={{ marginBottom: 18, display: 'flex', alignItems: 'center', background: '#f0f4fa', borderRadius: 8, padding: '10px 16px' }}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheck(idx)}
              id={`check-${idx}`}
              style={{ marginRight: 16, width: 20, height: 20, accentColor: '#1976d2' }}
            />
            <label htmlFor={`check-${idx}`} style={{ fontSize: 18, color: '#222', cursor: 'pointer' }}>{item.label}</label>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 24, fontWeight: 600, textAlign: 'center', fontSize: 18, color: checklist.every(i => i.checked) ? '#388e3c' : '#888' }}>
        {checklist.every(i => i.checked)
          ? 'Ready to go!'
          : 'Complete all items before starting your activity.'}
      </div>
    </div>
  );
}

export default App;
