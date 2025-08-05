import React, { useState, useEffect } from 'react';
import './SettingsPanel.css';

const SettingsPanel = ({ isOpen, onClose, onSaveSettings, currentSettings }) => {
  const [settings, setSettings] = useState({
    defaultGroundsPrice: '',
    defaultTenderingRate: '0.25',
    defaultUnloadingFee: '0.15',
    defaultProfitMargin: '15',
    defaultStorageCost: '0.05',
    defaultShippingRate: '0.02',
    defaultMinShipping: '0.25'
  });

  useEffect(() => {
    if (currentSettings) {
      setSettings(currentSettings);
    }
  }, [currentSettings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSaveSettings(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings({
      defaultGroundsPrice: '',
      defaultTenderingRate: '0.25',
      defaultUnloadingFee: '0.15',
      defaultProfitMargin: '15',
      defaultStorageCost: '0.05',
      defaultShippingRate: '0.02',
      defaultMinShipping: '0.25'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2>⚙️ Default Settings</h2>
          <p>Configure default values for pricing calculations</p>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Pricing Defaults</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="defaultGroundsPrice">Default Grounds Price ($/lb)</label>
                <input
                  type="number"
                  id="defaultGroundsPrice"
                  name="defaultGroundsPrice"
                  value={settings.defaultGroundsPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g., 2.50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="defaultTenderingRate">Default Tendering Rate ($/lb)</label>
                <input
                  type="number"
                  id="defaultTenderingRate"
                  name="defaultTenderingRate"
                  value={settings.defaultTenderingRate}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g., 0.25"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="defaultUnloadingFee">Default Unloading Fee ($/lb)</label>
                <input
                  type="number"
                  id="defaultUnloadingFee"
                  name="defaultUnloadingFee"
                  value={settings.defaultUnloadingFee}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="defaultProfitMargin">Default Profit Margin (%)</label>
                <input
                  type="number"
                  id="defaultProfitMargin"
                  name="defaultProfitMargin"
                  value={settings.defaultProfitMargin}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Cost Calculations</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="defaultStorageCost">Storage Cost ($/day/lb)</label>
                <input
                  type="number"
                  id="defaultStorageCost"
                  name="defaultStorageCost"
                  value={settings.defaultStorageCost}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="defaultShippingRate">Shipping Rate ($/mile)</label>
                <input
                  type="number"
                  id="defaultShippingRate"
                  name="defaultShippingRate"
                  value={settings.defaultShippingRate}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="defaultMinShipping">Minimum Shipping Cost ($)</label>
                <input
                  type="number"
                  id="defaultMinShipping"
                  name="defaultMinShipping"
                  value={settings.defaultMinShipping}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <div className="info-text">
                  <p>These settings will be used as defaults for new quotes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button onClick={handleReset} className="reset-button">
            Reset to Defaults
          </button>
          <div className="action-buttons">
            <button onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleSave} className="save-button">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 