import React, { useState } from 'react';
import './ProcessingOptions.css';

const ProcessingOptions = ({ onOptionSelect, selectedOptions }) => {
  const [activeTab, setActiveTab] = useState('fillets');
  const [selectedSize, setSelectedSize] = useState('C');
  const [selectedPackaging, setSelectedPackaging] = useState('IQF');
  const [selectedTemperature, setSelectedTemperature] = useState('-4');

  // Processing options data structure
  const processingData = {
    fillets: {
      name: 'Salmon Fillet',
      options: [
        {
          description: 'Salmon Fillet sk/on PBI C IQF -4',
          size: 'C',
          packaging: 'IQF',
          temperature: '-4',
          rack: 1.30,
          tote: 1.42,
          box: 1.52,
          boxFresh: 1.60
        },
        {
          description: 'Salmon Fillet sk/on PBI D IQF -4',
          size: 'D',
          packaging: 'IQF',
          temperature: '-4',
          rack: 1.33,
          tote: 1.47,
          box: 1.57,
          boxFresh: 1.64
        },
        {
          description: 'Salmon Fillet sk/on PBI C IQF 4-9',
          size: 'C',
          packaging: 'IQF',
          temperature: '4-9',
          rack: 1.05,
          tote: 1.19,
          box: 1.30,
          boxFresh: 1.36
        },
        {
          description: 'Salmon Fillet sk/on PBI D IQF 4-9',
          size: 'D',
          packaging: 'IQF',
          temperature: '4-9',
          rack: 1.10,
          tote: 1.23,
          box: 1.34,
          boxFresh: 1.40
        },
        {
          description: 'Salmon Fillet sk/on PBI C IQF 9+',
          size: 'C',
          packaging: 'IQF',
          temperature: '9+',
          rack: 0.94,
          tote: 1.08,
          box: 1.18,
          boxFresh: 1.25
        },
        {
          description: 'Salmon Fillet sk/on PBI D IQF 9+',
          size: 'D',
          packaging: 'IQF',
          temperature: '9+',
          rack: 0.97,
          tote: 1.12,
          box: 1.21,
          boxFresh: 1.28
        },
        {
          description: 'Salmon Fillet sk/on PBI C VP -4',
          size: 'C',
          packaging: 'VP',
          temperature: '-4',
          rack: 1.51,
          tote: 1.65,
          box: 1.75
        },
        {
          description: 'Salmon Fillet sk/on PBI D VP -4',
          size: 'D',
          packaging: 'VP',
          temperature: '-4',
          rack: 1.55,
          tote: 1.68,
          box: 1.78
        },
        {
          description: 'Salmon Fillet sk/on PBI C VP 4-9',
          size: 'C',
          packaging: 'VP',
          temperature: '4-9',
          rack: 1.28,
          tote: 1.41,
          box: 1.50
        },
        {
          description: 'Salmon Fillet sk/on PBI D VP 4-9',
          size: 'D',
          packaging: 'VP',
          temperature: '4-9',
          rack: 1.32,
          tote: 1.46,
          box: 1.53
        },
        {
          description: 'Salmon Fillet sk/on PBI C VP 9+',
          size: 'C',
          packaging: 'VP',
          temperature: '9+',
          rack: 1.16,
          tote: 1.30,
          box: 1.38
        },
        {
          description: 'Salmon Fillet sk/on PBI D VP 9+',
          size: 'D',
          packaging: 'VP',
          temperature: '9+',
          rack: 1.20,
          tote: 1.33,
          box: 1.42
        }
      ]
    },
    portions: {
      name: 'Salmon Portion',
      options: [
        {
          description: 'Salmon Portion sk/on PBI C IQF -4',
          size: 'C',
          packaging: 'IQF',
          temperature: '-4',
          rack: 1.78
        },
        {
          description: 'Salmon Portion sk/on PBI D IQF -4',
          size: 'D',
          packaging: 'IQF',
          temperature: '-4',
          rack: 1.81
        },
        {
          description: 'Salmon Portion sk/on PBI C IQF 4-9',
          size: 'C',
          packaging: 'IQF',
          temperature: '4-9',
          rack: 1.53
        },
        {
          description: 'Salmon Portion sk/on PBI D IQF 4-9',
          size: 'D',
          packaging: 'IQF',
          temperature: '4-9',
          rack: 1.58
        },
        {
          description: 'Salmon Portion sk/on PBI C IQF 9+',
          size: 'C',
          packaging: 'IQF',
          temperature: '9+',
          rack: 1.42
        },
        {
          description: 'Salmon Portion sk/on PBI D IQF 9+',
          size: 'D',
          packaging: 'IQF',
          temperature: '9+',
          rack: 1.47
        },
        {
          description: 'Salmon Portion sk/on PBI C VP -4',
          size: 'C',
          packaging: 'VP',
          temperature: '-4',
          rack: 1.99
        },
        {
          description: 'Salmon Portion sk/on PBI D VP -4',
          size: 'D',
          packaging: 'VP',
          temperature: '-4',
          rack: 2.03
        },
        {
          description: 'Salmon Portion sk/on PBI C VP 4-9',
          size: 'C',
          packaging: 'VP',
          temperature: '4-9',
          rack: 1.77
        },
        {
          description: 'Salmon Portion sk/on PBI D VP 4-9',
          size: 'D',
          packaging: 'VP',
          temperature: '4-9',
          rack: 1.80
        },
        {
          description: 'Salmon Portion sk/on PBI C VP 9+',
          size: 'C',
          packaging: 'VP',
          temperature: '9+',
          rack: 1.65
        },
        {
          description: 'Salmon Portion sk/on PBI D VP 9+',
          size: 'D',
          packaging: 'VP',
          temperature: '9+',
          rack: 1.68
        }
      ]
    },
    other: {
      name: 'Other Processing',
      options: [
        {
          description: 'Salmon Burger Meat Trim Pcs 1# VP',
          cost: 1.72
        },
        {
          description: 'Salmon Burger Meat 1# VP (ex: frames)',
          cost: 3.54
        },
        {
          description: 'Saw Frozen Portions IQF Toted',
          cost: 0.65
        },
        {
          description: 'Saw Frozen Portions IQF Boxed',
          cost: 0.80
        },
        {
          description: 'Saw Frozen Portions VP Toted',
          cost: 0.84
        },
        {
          description: 'Saw Frozen Portions VP Boxed',
          cost: 0.99
        },
        {
          description: 'Grade Salmon H&G',
          cost: 0.08
        },
        {
          description: 'Glaze & Tote Salmon H&G',
          cost: 0.15
        },
        {
          description: 'Glaze & Box Salmon H&G',
          cost: 0.30
        },
        {
          description: 'Glaze Grade & Tote Salmon H&G',
          cost: 0.19
        },
        {
          description: 'Glaze Grade & Box Salmon H&G',
          cost: 0.35
        },
        {
          description: 'Glaze Grade Sleeve & Tote Salmon H&G',
          cost: 0.26
        },
        {
          description: 'Glaze Grade Sleeve & Box Salmon H&G',
          cost: 0.41
        }
      ]
    }
  };

  const handleOptionSelect = (option) => {
    onOptionSelect(option);
  };

  const filteredOptions = processingData[activeTab].options.filter(option => {
    if (activeTab === 'other') return true;
    return option.size === selectedSize && 
           option.packaging === selectedPackaging && 
           option.temperature === selectedTemperature;
  });

  return (
    <div className="processing-options">
      <div className="options-header">
        <h3>Processing Options</h3>
        <p>Select from our comprehensive processing options</p>
      </div>

      <div className="options-tabs">
        <button 
          className={`tab-button ${activeTab === 'fillets' ? 'active' : ''}`}
          onClick={() => setActiveTab('fillets')}
        >
          Fillets
        </button>
        <button 
          className={`tab-button ${activeTab === 'portions' ? 'active' : ''}`}
          onClick={() => setActiveTab('portions')}
        >
          Portions
        </button>
        <button 
          className={`tab-button ${activeTab === 'other' ? 'active' : ''}`}
          onClick={() => setActiveTab('other')}
        >
          Other
        </button>
      </div>

      {activeTab !== 'other' && (
        <div className="filter-controls">
          <div className="filter-group">
            <label>Size:</label>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Packaging:</label>
            <select value={selectedPackaging} onChange={(e) => setSelectedPackaging(e.target.value)}>
              <option value="IQF">IQF</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Temperature:</label>
            <select value={selectedTemperature} onChange={(e) => setSelectedTemperature(e.target.value)}>
              <option value="-4">-4</option>
              <option value="4-9">4-9</option>
              <option value="9+">9+</option>
            </select>
          </div>
        </div>
      )}

      <div className="options-grid">
        {filteredOptions.map((option, index) => (
          <div key={index} className="option-card" onClick={() => handleOptionSelect(option)}>
            <div className="option-header">
              <h4>{option.description}</h4>
            </div>
            <div className="option-pricing">
              {option.rack && (
                <div className="price-item">
                  <span>Rack:</span>
                  <span>${option.rack}</span>
                </div>
              )}
              {option.tote && (
                <div className="price-item">
                  <span>Tote:</span>
                  <span>${option.tote}</span>
                </div>
              )}
              {option.box && (
                <div className="price-item">
                  <span>Box:</span>
                  <span>${option.box}</span>
                </div>
              )}
              {option.boxFresh && (
                <div className="price-item">
                  <span>Box Fresh:</span>
                  <span>${option.boxFresh}</span>
                </div>
              )}
              {option.cost && (
                <div className="price-item">
                  <span>Cost:</span>
                  <span>${option.cost}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingOptions; 