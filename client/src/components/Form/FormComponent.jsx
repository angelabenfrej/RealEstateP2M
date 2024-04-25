import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    lieu: '',
    concierge: '0',
    security_system: '0',
    garden: '0',
    pool: '0',
    heating: '0',
    equipped_kitchen: '0',
    type: '',
    num_bedrooms: '0',
    surface: '0'
  });
  const [isPending, setIsPending] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict-api/', formData);
      setPredictionResult(response.data);
      console.log(response.data)
    } catch (error) {
      setError('Error submitting form: ' + error.message);
    }
    setIsPending(false);
  }
  ;

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label>Region</label>
        <select
          required
          value={formData.lieu}
          name="lieu"
          onChange={handleChange}>
          <option value="">Select region</option>
          <option value="Aghir">Aghir</option>
          <option value="Ben arous">Ben Arous</option>
          <option value="Monastir">Monastir</option>
        </select>

        <label>Property Type</label>
        <select
          required
          value={formData.type}
          name="type"
          onChange={handleChange}>
          <option value="">Select property type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Land">Land</option>
          <option value="Office/Shop">Office/Shop</option>
        </select>

        <label htmlFor="security_system">Security System:</label>
        <select
          required
          value={formData.security_system}
          name="security_system"
          onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <label htmlFor="concierge">Concierge:</label>
        <select
          required
          value={formData.concierge}
          name="concierge"
          onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <label htmlFor="garden">Garden:</label>
        <select
          required
          value={formData.garden}
          name="garden"
          onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <label htmlFor="pool">Pool:</label>
        <select
          required
          value={formData.pool}
          name="pool"
          onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <label htmlFor="heating">Heating:</label>
        <select
          required
          value={formData.heating}
          name="heating"
          onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <label htmlFor="equipped_kitchen">Equipped Kitchen:</label>
        <select
          required
          value={formData.equipped_kitchen}
          name="equipped_kitchen"
          onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <label>Number of Bedrooms</label>
        <input
          type="number"
          min="0"
          value={formData.num_bedrooms}
          name="num_bedrooms"
          onChange={handleChange}
          required
        />

        <label>Surface Area (m²)</label>
        <input
          type="number"
          min="0"
          value={formData.surface}
          name="surface"
          onChange={handleChange}
          required
        />

        {!isPending && <button type='submit'>Give me the Price</button>}
        {isPending && <button disabled type='submit'>Prediction...</button>}
        {predictionResult && (
        <p>Price: {predictionResult.prediction}</p>
      )}
      </form>
    </div>
  );
}

export default FormComponent;
