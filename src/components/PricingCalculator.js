import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './PricingCalculator.css';

const PricingCalculator = ({ onSaveQuote, settings }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    salmonType: 'Pink',
    processedWeight: '',
    roundWeight: '',
    groundsPrice: settings?.defaultGroundsPrice || '',
    processingType: 'GlazeBoxHG', // Set to a valid default
    storageDays: '0',
    shippingDistance: '',
    unloadingFee: settings?.defaultUnloadingFee || '0.15',
    tenderingRate: settings?.defaultTenderingRate || '0.25',
    profitMargin: settings?.defaultProfitMargin || '15',
    notes: ''
  });

  // Add this useEffect to update form fields when settings change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      groundsPrice: settings?.defaultGroundsPrice || '',
      unloadingFee: settings?.defaultUnloadingFee || '0.15',
      tenderingRate: settings?.defaultTenderingRate || '0.25',
      profitMargin: settings?.defaultProfitMargin || '15',
    }));
  }, [settings]);

  const [calculations, setCalculations] = useState({
    tenderingCost: 0,
    processingCost: 0,
    storageCost: 0,
    shippingCost: 0,
    unloadingCost: 0,
    profitAmount: 0,
    totalCost: 0,
    finalPrice: 0,
    recoveryRate: 0
  });

  // Processing options with your specific pricing
  const processingOptions = useMemo(() => ({
    'GlazeBoxHG': {
      name: 'Glaze & Box Salmon H&G',
      cost: 0.30,
      recovery: 0.75
    },
    'GlazeGradeBoxHG': {
      name: 'Glaze Grade & Box Salmon H&G',
      cost: 0.35,
      recovery: 0.75
    },
    'GlazeGradeSleeveBoxHG': {
      name: 'Glaze Grade Sleeve & Box Salmon H&G',
      cost: 0.41,
      recovery: 0.75
    },
    'FilletSKON_PBI_D_VP': {
      name: 'Salmon Fillet sk/on PBI D VP',
      cost: 1.53,
      recovery: 0.60
    },
    'FilletSKON_PBO_D_VP': {
      name: 'Salmon Fillet sk/on PBO D VP',
      cost: 1.97,
      recovery: 0.60
    },
    'DressedHeadOn': {
      name: 'Dressed Head On',
      cost: 0.55,
      recovery: 0.85
    }
  }), []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProcessingOptionChange = (optionId, checked) => {
    setFormData(prev => ({
      ...prev,
      processingOptions: checked 
        ? [...prev.processingOptions, optionId]
        : prev.processingOptions.filter(id => id !== optionId)
    }));
  };

  const calculateCosts = useCallback(() => {
    const groundsPrice = parseFloat(formData.groundsPrice) || 0;
    const processedWeight = parseFloat(formData.processedWeight) || 0;
    const roundWeight = parseFloat(formData.roundWeight) || 0;
    const storageDays = parseFloat(formData.storageDays) || 0;
    const shippingDistance = parseFloat(formData.shippingDistance) || 0;
    const unloadingFee = parseFloat(formData.unloadingFee) || 0.15;

    // Fallback for processing type
    const baseProcessing = processingOptions[formData.processingType] || Object.values(processingOptions)[0];
    let processingCost = baseProcessing.cost;

    // (No additional processing options)

    // Calculate costs
    const tenderingRate = parseFloat(formData.tenderingRate) || 0;
    const tenderingCost = tenderingRate; // Now it's $/lb directly
    const shippingCost = Math.max(
      parseFloat(settings?.defaultMinShipping || 0.25), 
      shippingDistance * parseFloat(settings?.defaultShippingRate || 0.02)
    ); // Shipping cost per mile with minimum
    const unloadingCost = unloadingFee; // Unloading fee per lb

    // Calculate base cost (before recovery)
    const baseCost = groundsPrice + tenderingCost + shippingCost + unloadingCost;
    const recoveryRate = baseProcessing.recovery;
    
    // Apply recovery rate to get cost after recovery
    const costAfterRecovery = baseCost / recoveryRate;
    
    // Add storage and processing costs after recovery (since they apply to finished product)
    const storageCost = storageDays * (parseFloat(settings?.defaultStorageCost || 0.05)); // Storage cost per day per lb
    const totalCostAfterRecovery = costAfterRecovery + storageCost + processingCost;
    
    // Add profit margin
    const profitRate = parseFloat(formData.profitMargin) / 100;
    const profitAmount = totalCostAfterRecovery * profitRate;
    const finalPrice = totalCostAfterRecovery + profitAmount;

    setCalculations({
      tenderingCost,
      processingCost,
      storageCost,
      shippingCost,
      unloadingCost,
      profitAmount,
      totalCost: totalCostAfterRecovery,
      finalPrice,
      recoveryRate
    });
  }, [formData, processingOptions]);

  useEffect(() => {
    calculateCosts();
  }, [calculateCosts]);

  const handleSaveQuote = () => {
    if (!formData.customerName || (!formData.processedWeight && !formData.roundWeight) || !formData.groundsPrice) {
      alert('Please fill in all required fields (Customer Name, Weight, and Grounds Price)');
      return;
    }

    const quote = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      salmonType: formData.salmonType,
      processedWeight: parseFloat(formData.processedWeight) || 0,
      roundWeight: parseFloat(formData.roundWeight) || 0,
      groundsPrice: parseFloat(formData.groundsPrice),
      processingType: formData.processingType,
      processingOptions: formData.processingOptions,
      storageDays: parseFloat(formData.storageDays),
      shippingDistance: parseFloat(formData.shippingDistance),
      unloadingFee: parseFloat(formData.unloadingFee),
      notes: formData.notes,
      ...calculations
    };

    onSaveQuote(quote);
    
    // Reset form
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      salmonType: 'Pink',
      processedWeight: '',
      roundWeight: '',
      groundsPrice: '',
      processingType: 'GlazeBoxHG',
      storageDays: '0',
      shippingDistance: '',
      unloadingFee: settings?.defaultUnloadingFee || '0.15',
      tenderingRate: settings?.defaultTenderingRate || '0.25',
      profitMargin: settings?.defaultProfitMargin || '15',
      notes: ''
    });

    alert('Quote saved successfully!');
  };

  return (
    <div className="pricing-calculator">
      <div className="calculator-header">
        <h2>💰 Wholesale Pricing Calculator</h2>
        <p>Calculate wholesale pricing for salmon with processing, storage, and shipping costs</p>
      </div>

      <div className="calculator-grid">
        {/* Input Form */}
        <div className="calculator-form">
          <h3>Customer & Order Information</h3>
          
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Customer Name *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerEmail">Email</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerPhone">Phone</label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="salmonType">Salmon Type</label>
                <select
                  id="salmonType"
                  name="salmonType"
                  value={formData.salmonType}
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
                <label htmlFor="processedWeight">Processed Weight (lbs) *</label>
                <input
                  type="number"
                  id="processedWeight"
                  name="processedWeight"
                  value={formData.processedWeight}
                  onChange={handleInputChange}
                  min="0"
                  step="100"
                  placeholder="Enter processed weight"
                />
              </div>
              <div className="form-group">
                <label htmlFor="roundWeight">Round Weight (lbs)</label>
                <input
                  type="number"
                  id="roundWeight"
                  name="roundWeight"
                  value={formData.roundWeight}
                  onChange={handleInputChange}
                  min="0"
                  step="100"
                  placeholder="Enter round weight"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="groundsPrice">Grounds Price ($/lb) *</label>
                <input
                  type="number"
                  id="groundsPrice"
                  name="groundsPrice"
                  value={formData.groundsPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="unloadingFee">Unloading Fee ($/lb)</label>
                <input
                  type="number"
                  id="unloadingFee"
                  name="unloadingFee"
                  value={formData.unloadingFee}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tenderingRate">Tendering Rate ($/lb)</label>
                <input
                  type="number"
                  id="tenderingRate"
                  name="tenderingRate"
                  value={formData.tenderingRate}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g., 0.25"
                />
              </div>
              <div className="form-group">
                <label htmlFor="profitMargin">Profit Margin (%)</label>
                <input
                  type="number"
                  id="profitMargin"
                  name="profitMargin"
                  value={formData.profitMargin}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>Processing Options</h4>
            
            <div className="form-group">
              <label htmlFor="processingType">Processing Type</label>
              <select
                id="processingType"
                name="processingType"
                value={formData.processingType}
                onChange={handleInputChange}
              >
                {Object.entries(processingOptions).map(([key, option]) => (
                  <option key={key} value={key}>
                    {option.name} (+${option.cost}/lb, {option.recovery * 100}% recovery)
                  </option>
                ))}
              </select>
            </div>

            {/* Remove the UI for additional processing options (checkboxes section) */}
          </div>

          <div className="form-section">
            <h4>Storage & Shipping</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="storageDays">Storage Days</label>
                <input
                  type="number"
                  id="storageDays"
                  name="storageDays"
                  value={formData.storageDays}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="shippingDistance">Shipping Distance (miles)</label>
                <input
                  type="number"
                  id="shippingDistance"
                  name="shippingDistance"
                  value={formData.shippingDistance}
                  onChange={handleInputChange}
                  min="0"
                  step="10"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Additional notes or special requirements..."
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="calculator-results">
          <h3>Pricing Breakdown</h3>
          
          <div className="results-grid">
            <div className="result-item">
              <span className="result-label">Grounds Price:</span>
              <span className="result-value">${parseFloat(formData.groundsPrice || 0).toFixed(2)}/lb</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Tendering (${parseFloat(formData.tenderingRate || 0).toFixed(2)}/lb):</span>
              <span className="result-value">${calculations.tenderingCost.toFixed(2)}/lb</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Unloading:</span>
              <span className="result-value">${calculations.unloadingCost.toFixed(2)}/lb</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Processing:</span>
              <span className="result-value">${calculations.processingCost.toFixed(2)}/lb</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Storage:</span>
              <span className="result-value">${calculations.storageCost.toFixed(2)}/lb</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Shipping:</span>
              <span className="result-value">${calculations.shippingCost.toFixed(2)}/lb</span>
            </div>
            
            <div className="result-item total">
              <span className="result-label">Base Cost (after recovery):</span>
              <span className="result-value">${calculations.totalCost.toFixed(2)}/lb</span>
            </div>
            
            <div className="result-item profit">
              <span className="result-label">Profit ({formData.profitMargin}%):</span>
              <span className="result-value">${calculations.profitAmount.toFixed(2)}/lb</span>
            </div>
            
            <div className="result-item recovery">
              <span className="result-label">Recovery Rate:</span>
              <span className="result-value">{(calculations.recoveryRate * 100).toFixed(0)}%</span>
            </div>
            
            <div className="result-item final">
              <span className="result-label">Final Price:</span>
              <span className="result-value">${calculations.finalPrice.toFixed(2)}/lb</span>
            </div>
          </div>

          <div className="total-quantity">
            <h4>Weight Calculations</h4>
            <div className="quantity-breakdown">
              <p><strong>Processed Weight:</strong> {parseFloat(formData.processedWeight || 0).toLocaleString()} lbs</p>
              <p><strong>Round Weight:</strong> {((parseFloat(formData.processedWeight || 0) / calculations.recoveryRate)).toFixed(0)} lbs</p>
              <p><strong>Total Value:</strong> ${((parseFloat(formData.processedWeight || 0) * calculations.finalPrice)).toFixed(2)}</p>
            </div>
          </div>

          <button 
            onClick={handleSaveQuote}
            className="save-quote-button"
            disabled={!formData.customerName || (!formData.processedWeight && !formData.roundWeight) || !formData.groundsPrice}
          >
            💾 Save Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator; 