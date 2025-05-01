import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function RecipeFinder() {
  const [formData, setFormData] = useState({
    dishName: '',
    glutenFree: false,
    vegan: false,
    specialInstructions: '',
  });
  const [recipe, setRecipe] = useState('');
    const navigate=useNavigate();
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleClear = () => {
    setFormData({
      dishName: '',
      glutenFree: false,
      vegan: false,
      specialInstructions: '',
    })
    setRecipe("")
  }


  const handleGenerateRecipe = () => {
    axios.post("http://127.0.0.1:5000/generate_recipe", formData) // Directly passing formData
      .then((response) => {
        console.log(response.data.suggestion);
        setRecipe(response.data.suggestion);
      })
      .catch((error) => {
        console.error("Error generating recipe:", error);
        setRecipe("Error fetching recipe. Please try again.");
      });
  };


  const handleOpenChatbot = () => {
    console.log("Opening chatbot")
    navigate("/chat", { state: { recipe: recipe, formData: formData } }); // Pass the recipe and formData to the chat page
  };

  return (
    <div className="container recipe-finder-container">
      <div className="container text-center mt-3">
        <h1 className="text-primary recipe-finder-title">Recipe Finder</h1>
        <p className="text-secondary recipe-finder-subtitle">Find Delicious Dishes</p>
      </div>
      <div className="container mt-3">
        <div className="container mt-5">
          <h2>Create Your Recipe</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleGenerateRecipe(); }}>
            <div className="form-group">
              <label className="text-primary recipe-finder-label" htmlFor="dishName">Dish Name:</label>
              <input
                type="text"
                className="form-control"
                id="dishName"
                name="dishName"
                value={formData.dishName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-primary recipe-finder-label">Dietary Restrictions:</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="glutenFree"
                  id="glutenFree"
                  value="gluten-free"
                  checked={formData.glutenFree}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="glutenFree">Gluten-Free</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="vegan"
                  id="vegan"
                  value="vegan"
                  checked={formData.vegan}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="vegan">Vegan</label>
              </div>
            </div>
            <div className="form-group">
              <label className="text-primary recipe-finder-label" htmlFor="specialInstructions">Special Instructions:</label>
              <textarea
                className="form-control"
                id="specialInstructions"
                rows="3"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" id="btn">
              Create Recipe
            </button>
            <button
              className="btn btn-info"
              onClick={handleClear}
              id="btn">
              Clear
            </button>
            <br />
            <br />
          </form>
          {recipe && (
            <div id="recipe" className="recipe-container">
              {recipe.split('\n').map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  <br />
                </React.Fragment>
              ))}
            </div>
          )}
          <button onClick={handleOpenChatbot}>Chat with the Bot</button>
        </div>
      </div>
    </div>
  );
};


export default RecipeFinder;