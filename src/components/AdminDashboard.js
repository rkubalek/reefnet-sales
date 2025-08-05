import React, { useState, useEffect } from 'react';
import PricingCalculator from './PricingCalculator';
import CatchTracker from './CatchTracker';
import SettingsPanel from './SettingsPanel';
import MaintenanceLog from './MaintenanceLog';
import MenuSettings from './MenuSettings';
import OrderManagement from './OrderManagement';
import './AdminDashboard.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('pricing');
  const [quotes, setQuotes] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    defaultGroundsPrice: '',
    defaultTenderingRate: '10',
    defaultUnloadingFee: '0.15',
    defaultProfitMargin: '15',
    defaultStorageCost: '0.05',
    defaultShippingRate: '0.02',
    defaultMinShipping: '0.25'
  });

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    onLogout();
  };

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('reefnetSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const addQuote = (quote) => {
    const newQuote = {
      ...quote,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setQuotes(prev => [newQuote, ...prev]);
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('reefnetSettings', JSON.stringify(newSettings));
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title">
            <h1>🐟 Reefnet Admin Dashboard</h1>
            <p>Wholesale Pricing & Catch Tracking</p>
          </div>
          <div className="admin-actions">
            <button onClick={() => setShowSettings(true)} className="settings-button">
              ⚙️ Settings
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <button 
          className={`nav-tab ${activeTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          💰 Pricing Calculator
        </button>
        <button 
          className={`nav-tab ${activeTab === 'catch' ? 'active' : ''}`}
          onClick={() => setActiveTab('catch')}
        >
          📊 Catch Tracker
        </button>
        <button 
          className={`nav-tab ${activeTab === 'quotes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          📋 Saved Quotes ({quotes.length})
        </button>
        <button
          className={`nav-tab ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          🛠️ Maintenance Log
        </button>
        <button
          className={`nav-tab ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          🍽️ Menu Settings
        </button>
        <button
          className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📋 Order Management
        </button>
      </nav>

      {/* Content */}
      <main className="admin-content">
        {activeTab === 'pricing' && (
          <PricingCalculator onSaveQuote={addQuote} settings={settings} />
        )}
        
        {activeTab === 'catch' && (
          <CatchTracker />
        )}
        
        {activeTab === 'quotes' && (
          <QuotesList quotes={quotes} />
        )}
        {activeTab === 'maintenance' && (
          <MaintenanceLog />
        )}
        {activeTab === 'menu' && (
          <MenuSettings />
        )}
        {activeTab === 'orders' && (
          <OrderManagement />
        )}
      </main>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSaveSettings={handleSaveSettings}
        currentSettings={settings}
      />
    </div>
  );
};

// Quotes List Component
const QuotesList = ({ quotes }) => {
  const downloadQuote = (quote) => {
    const safeNum = (val) => (typeof val === 'number' && !isNaN(val) ? val : 0);
    const safeStr = (val) => (val !== undefined && val !== null && val !== '' ? String(val) : '-');
    const doc = new jsPDF();
    // Header
    doc.setFontSize(18);
    doc.text('REEFNET SALMON - WHOLESALE QUOTE', 105, 18, { align: 'center' });
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date(quote.createdAt).toLocaleString()}`, 105, 26, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(15, 30, 195, 30);

    // Customer Info
    doc.setFontSize(13);
    doc.text('Customer Information', 15, 40);
    doc.setFontSize(11);
    doc.text(`Customer: ${safeStr(quote.customerName)}`, 15, 47);
    doc.text(`Contact: ${safeStr(quote.customerEmail)}`, 15, 53);
    doc.text(`Phone: ${safeStr(quote.customerPhone)}`, 15, 59);

    // Salmon Details
    doc.setFontSize(13);
    doc.text('Salmon Details', 15, 70);
    doc.setFontSize(11);
    doc.text(`Type: ${safeStr(quote.salmonType)}`, 15, 77);
    doc.text(`Quantity: ${safeNum(quote.processedWeight || quote.quantity)} lbs (processed)`, 15, 83);
    doc.text(`Processing: ${safeStr(quote.processingType)}`, 15, 89);

    // Final Price
    doc.setFontSize(13);
    doc.text('Final Price', 15, 100);
    doc.setFontSize(12);
    doc.text(`$${safeNum(quote.finalPrice).toFixed(2)} per lb`, 15, 108);
    doc.text(`Total Quantity: ${safeNum(quote.processedWeight || quote.quantity)} lbs`, 15, 116);
    doc.text(`Extended Price: $${(safeNum(quote.finalPrice) * safeNum(quote.processedWeight || quote.quantity)).toFixed(2)}`, 15, 124);

    // Notes
    let notesY = 140;
    doc.setFontSize(13);
    doc.text('Notes', 15, notesY);
    doc.setFontSize(11);
    doc.text(safeStr(quote.notes), 15, notesY + 7);

    // Save PDF
    doc.save(`reefnet-quote-${safeStr(quote.customerName)}-${new Date(quote.createdAt).toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="quotes-list">
      <h2>Saved Quotes</h2>
      {quotes.length === 0 ? (
        <div className="empty-state">
          <p>No saved quotes yet. Create a quote using the Pricing Calculator.</p>
        </div>
      ) : (
        <div className="quotes-grid">
          {quotes.map(quote => (
            <div key={quote.id} className="quote-card">
              <div className="quote-header">
                <h3>{quote.customerName}</h3>
                <span className="quote-date">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="quote-details">
                <p><strong>Type:</strong> {quote.salmonType}</p>
                <p><strong>Quantity:</strong> {quote.quantity} lbs</p>
                <p><strong>Processing:</strong> {quote.processingType}</p>
                <p><strong>Final Price:</strong> ${quote.finalPrice}/lb</p>
              </div>
              <div className="quote-actions">
                <button 
                  onClick={() => downloadQuote(quote)}
                  className="download-button"
                >
                  Download Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 