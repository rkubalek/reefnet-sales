import React, { useState, useEffect } from 'react';

const MaintenanceLog = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    notes: ''
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('reefnetMaintenanceLog');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('reefnetMaintenanceLog', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newEntry.description) {
      alert('Description is required');
      return;
    }
    setEntries(prev => [
      { ...newEntry, id: Date.now() },
      ...prev
    ]);
    setNewEntry({ date: new Date().toISOString().split('T')[0], description: '', notes: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this entry?')) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="maintenance-log">
      <h2>🛠️ Maintenance Log</h2>
      <form onSubmit={handleAddEntry} className="maintenance-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={newEntry.date} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <input type="text" id="description" name="description" value={newEntry.description} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <input type="text" id="notes" name="notes" value={newEntry.notes} onChange={handleInputChange} />
          </div>
          <button type="submit" className="add-entry-button">Add Entry</button>
        </div>
      </form>
      <div className="maintenance-table">
        <div className="table-header">
          <div className="header-cell">Date</div>
          <div className="header-cell">Description</div>
          <div className="header-cell">Notes</div>
          <div className="header-cell">Actions</div>
        </div>
        {entries.length === 0 ? (
          <div className="empty-state">No maintenance entries yet.</div>
        ) : (
          entries.map(entry => (
            <div className="table-row" key={entry.id}>
              <div className="table-cell">{new Date(entry.date).toLocaleDateString()}</div>
              <div className="table-cell">{entry.description}</div>
              <div className="table-cell">{entry.notes || '-'}</div>
              <div className="table-cell">
                <button className="delete-button" onClick={() => handleDelete(entry.id)} title="Delete entry">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MaintenanceLog; 