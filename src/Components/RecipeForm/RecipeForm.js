// RecipeForm.js
import React, { useState } from 'react';
import './RecipeForm.css'; // Import the CSS file

function RecipeForm() {
  const [formData, setFormData] = useState({
    dishName: '',
    glutenFree: false,
    vegan: false,
    specialInstructions: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // In a real application, you would send this data to an API
  };

  return (
    <div className="recipe-form-container">
      <h2 className="recipe-form-title">Create Your Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dishName" className="form-label">Dish Name:</label>
          <input
            type="text"
            id="dishName"
            name="dishName"
            value={formData.dishName}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="dietary-restrictions-label">Dietary Restrictions:</label>
          <label className="dietary-option">
            <input
              type="checkbox"
              name="glutenFree"
              checked={formData.glutenFree}
              onChange={handleChange}
              className="dietary-checkbox"
            />
            Gluten-Free
          </label>
          <label className="dietary-option">
            <input
              type="checkbox"
              name="vegan"
              checked={formData.vegan}
              onChange={handleChange}
              className="dietary-checkbox"
            />
            Vegan
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="specialInstructions" className="form-label">Special Instructions:</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <button type="submit" className="create-recipe-button">
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;