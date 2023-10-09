
import React, { useState } from 'react';
import './App.css'


const App = () => {
  const [recipe, setRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const getRandomRecipe = async () => {
    

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${my_api}`);
      const data = await response.json();
      setRecipe(data.recipes[0]);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    }
  };

  const addToFavorites = () => {
    setFavorites([...favorites, recipe]);
  };

  return (
    <div className="App">
      <h1>Random Recipe Generator</h1>
      <button onClick={getRandomRecipe}>Get Random Recipe</button>
      {recipe && (
        <div>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <ul>
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.original}</li>
            ))}
          </ul>
          <button onClick={addToFavorites}>Add to Favorites</button>
        </div>
      )}
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            {favorite.title} <img src={favorite.image} alt={favorite.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
