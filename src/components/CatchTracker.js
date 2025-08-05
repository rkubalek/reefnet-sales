import React, { useState, useEffect } from 'react';
import './CatchTracker.css';

const CatchTracker = () => {
  const [catchEntries, setCatchEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    salmonType: 'Pink',
    pounds: '',
    fish: '',
    notes: ''
  });

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const savedCatch = localStorage.getItem('reefnetCatchData');
      if (savedCatch) {
        const parsedData = JSON.parse(savedCatch);
        if (Array.isArray(parsedData)) {
          setCatchEntries(parsedData);
        }
      }
    } catch (error) {
      console.error('Error loading catch data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('reefnetCatchData', JSON.stringify(catchEntries));
    } catch (error) {
      console.error('Error saving catch data to localStorage:', error);
    }
  }, [catchEntries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    
    if (!newEntry.pounds && !newEntry.fish) {
      alert('Please enter either pounds or number of fish (or both)');
      return;
    }

    const entry = {
      ...newEntry,
      id: Date.now(),
      pounds: newEntry.pounds ? parseFloat(newEntry.pounds) : '',
      fish: newEntry.fish ? parseInt(newEntry.fish) : '',
      timestamp: new Date().toISOString()
    };

    setCatchEntries(prev => [entry, ...prev]);
    
    // Reset form
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      salmonType: 'Pink',
      pounds: '',
      fish: '',
      notes: ''
    });
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setCatchEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const calculateStats = () => {
    const totalPounds = catchEntries.reduce((acc, entry) => acc + (parseFloat(entry.pounds) || 0), 0);
    const totalFish = catchEntries.reduce((acc, entry) => acc + (parseInt(entry.fish) || 0), 0);
    const byType = catchEntries.reduce((acc, entry) => {
      acc[entry.salmonType] = acc[entry.salmonType] || { lbs: 0, fish: 0 };
      acc[entry.salmonType].lbs += parseFloat(entry.pounds) || 0;
      acc[entry.salmonType].fish += parseInt(entry.fish) || 0;
      return acc;
    }, {});
    const byMonth = catchEntries.reduce((acc, entry) => {
      const month = new Date(entry.date).toLocaleString('default', { month: 'long' });
      acc[month] = acc[month] || { lbs: 0, fish: 0 };
      acc[month].lbs += parseFloat(entry.pounds) || 0;
      acc[month].fish += parseInt(entry.fish) || 0;
      return acc;
    }, {});
    return { totalPounds, totalFish, byType, byMonth };
  };

  const stats = calculateStats();

  const exportData = () => {
    const csvContent = [
      ['Date', 'Salmon Type', 'Pounds', 'Number of Fish', 'Notes'],
      ...catchEntries.map(entry => [
        entry.date,
        entry.salmonType,
        entry.pounds,
        entry.fish,
        entry.notes
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reefnet-catch-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="catch-tracker">
      <div className="tracker-header">
        <h2>📊 Catch Tracker</h2>
        <p>Track daily catch totals and monitor seasonal progress</p>
      </div>

      <div className="tracker-grid">
        {/* Add New Entry */}
        <div className="add-entry-section">
          <h3>Add New Catch Entry</h3>
          <form onSubmit={handleAddEntry} className="entry-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newEntry.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="salmonType">Salmon Type</label>
                <select
                  id="salmonType"
                  name="salmonType"
                  value={newEntry.salmonType}
                  onChange={handleInputChange}
                >
                  <option value="Pink">Pink Salmon</option>
                  <option value="Coho">Coho (Silver)</option>
                  <option value="Keta">Keta (Chum)</option>
                  <option value="Sockeye">Sockeye</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pounds">Pounds (lbs)</label>
                <input
                  type="number"
                  id="pounds"
                  name="pounds"
                  value={newEntry.pounds}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="fish">Number of Fish</label>
                <input
                  type="number"
                  id="fish"
                  name="fish"
                  value={newEntry.fish}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={newEntry.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Weather conditions, quality notes, etc..."
              />
            </div>

            <button type="submit" className="add-entry-button">
              ➕ Add Entry
            </button>
          </form>
        </div>

        {/* Statistics */}
        <div className="stats-section">
          <h3>Season Summary</h3>
          
          <div className="stats-grid">
            <div className="stat-card total">
              <h4>Total Catch</h4>
              <div className="stat-value">
                {stats.totalPounds ? `${stats.totalPounds.toLocaleString()} lbs` : ''}
                {stats.totalPounds && stats.totalFish ? ' + ' : ''}
                {stats.totalFish ? `${stats.totalFish.toLocaleString()} fish` : ''}
              </div>
            </div>
          </div>

          <div className="breakdown-section">
            <h4>Catch by Salmon Type</h4>
            <div className="breakdown-list">
              {Object.entries(stats.byType).map(([type, qtyObj]) => {
                const avgSize = qtyObj.fish ? (qtyObj.lbs / qtyObj.fish) : null;
                return (
                  <div key={type} className="breakdown-item">
                    <span className="breakdown-label">{type}</span>
                    <span className="breakdown-value">
                      {qtyObj.lbs ? `${qtyObj.lbs.toLocaleString()} lbs` : ''}
                      {qtyObj.lbs && qtyObj.fish ? ' + ' : ''}
                      {qtyObj.fish ? `${qtyObj.fish.toLocaleString()} fish` : ''}
                      {qtyObj.fish && avgSize ? ` (avg ${(avgSize).toFixed(2)} lbs/fish)` : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="breakdown-section">
            <h4>Catch by Month</h4>
            <div className="breakdown-list">
              {Object.entries(stats.byMonth).map(([month, qtyObj]) => (
                <div key={month} className="breakdown-item">
                  <span className="breakdown-label">{month}</span>
                  <span className="breakdown-value">
                    {qtyObj.lbs ? `${qtyObj.lbs.toLocaleString()} lbs` : ''}
                    {qtyObj.lbs && qtyObj.fish ? ' + ' : ''}
                    {qtyObj.fish ? `${qtyObj.fish.toLocaleString()} fish` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={exportData} className="export-button">
            📊 Export Data
          </button>
        </div>
      </div>

      {/* Catch History */}
      <div className="catch-history">
        <h3>Recent Catch Entries</h3>
        
        {catchEntries.length === 0 ? (
          <div className="empty-state">
            <p>No catch entries yet. Add your first entry above.</p>
          </div>
        ) : (
          <div className="entries-table">
            <div className="table-header">
              <div className="header-cell">Date</div>
              <div className="header-cell">Type</div>
              <div className="header-cell">Pounds (lbs)</div>
              <div className="header-cell">Number of Fish</div>
              <div className="header-cell">Notes</div>
              <div className="header-cell">Actions</div>
            </div>
            
            {catchEntries.map(entry => (
              <div key={entry.id} className="table-row">
                <div className="table-cell">{new Date(entry.date).toLocaleDateString()}</div>
                <div className="table-cell">{entry.salmonType}</div>
                <div className="table-cell">{entry.pounds ? entry.pounds.toLocaleString() : ''}</div>
                <div className="table-cell">{entry.fish ? entry.fish.toLocaleString() : ''}</div>
                <div className="table-cell">{entry.notes || '-'}</div>
                <div className="table-cell">
                  <button 
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="delete-button"
                    title="Delete entry"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatchTracker; 