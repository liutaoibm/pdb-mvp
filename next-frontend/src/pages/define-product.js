import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import './define-product.css';

const DefineProduct = () => {
  const [formData, setFormData] = useState({
    id: 'Prod 001',
    name: '',
    description: '',
    industry: '',
    labels: []
  });

  const [selectedTab, setSelectedTab] = useState('Define Product');
  const [selectedLabelTab, setSelectedLabelTab] = useState('Labels');
  
  // Checkbox state for release label
  const [releaseChecked, setReleaseChecked] = useState(true);
  const [phaseChecked, setPhaseChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Changed: ${name} - ${value}`);
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', formData);
      console.log('Product saved:', response.data);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/dashboard" className="breadcrumb-link">
          Dashboard
        </Link>
        <span>/</span>
        <span>Define a new product</span>
      </div>

      <h1 className="page-title">Define a new product</h1>

      {/* Main Tabs */}
      <div className="tabs">
        {['Define Product', 'Define System', 'Define Service', 'Define API', 'Define Resource', 'Product Summary'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`tab ${selectedTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label>ID</label>
            <input 
              type="text" 
              name="id" 
              value={formData.id} 
              onChange={handleChange}
              className="readonly" 
              readOnly
            />
          </div>
          <div className="form-field">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter product name"
            />
          </div>
          <div className="form-field">
            <label>Industry</label>
            <select 
              name="industry" 
              value={formData.industry} 
              onChange={handleChange}
            >
              <option value="">Choose an option</option>
              <option value="industry1">Industry 1</option>
              <option value="industry2">Industry 2</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label>Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Write here"
          ></textarea>
        </div>

        {/* Labels Tabs */}
        <div className="label-tabs">
          {['Labels', 'Tags', 'Links', 'Annotations'].map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedLabelTab(tab)}
              className={`label-tab ${selectedLabelTab === tab ? 'active' : ''}`}
            >
              {tab}
              <span className="badge">0</span>
            </button>
          ))}
        </div>

        <div className="labels-selected">
          <p>{(releaseChecked ? 1 : 0) + (phaseChecked ? 1 : 0)} Label{(releaseChecked && phaseChecked) ? 's' : ''} Selected</p>
        </div>

        {/* Labels Table */}
        <div className="table-container">
          <div className="toolbar">
            <button type="button" className="toolbar-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
            <button type="button" className="toolbar-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <button type="button" className="toolbar-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg>
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th className="checkbox-cell"></th>
                <th>Label Name</th>
                <th>Key Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input 
                    type="checkbox" 
                    checked={releaseChecked}
                    onChange={() => setReleaseChecked(!releaseChecked)} 
                  />
                </td>
                <td>Release</td>
                <td>MVP1</td>
                <td>A short description of the label goes here and how it works.</td>
              </tr>
              <tr>
                <td>
                  <input 
                    type="checkbox" 
                    checked={phaseChecked}
                    onChange={() => setPhaseChecked(!phaseChecked)} 
                  />
                </td>
                <td>Phase</td>
                <td>Exploration</td>
                <td>A short description of the label goes here and how it works.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="action-buttons">
          <button type="button" className="btn-add-label">
            Add Recommended Label
            <span>+</span>
          </button>
          
          <button type="submit" className="btn-save-product">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default DefineProduct;
