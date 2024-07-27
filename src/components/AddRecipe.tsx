import React, { FC, useEffect, useState } from 'react'
import { ingredientData } from './ListIngredient'

interface RecipesProps {
  recipes: ingredientData[]
}



const Recipes: FC<RecipesProps> = ({ recipes }) => {

  const addNewRecipes = async () =>{
    try {
      const recipesRequest = recipes;
      const respose = await fetch("http://localhost:8000/recipes/",{
        method: "POST",
        body: JSON.stringify({
          name: "Test",
          ingredients : recipesRequest,
          calories : 0
        })
      })

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={addNewRecipes}>Summit Recipes</button>
      <div className="grid grid-cols-4 gap-4">
        {recipes.map((item,i) => (
          <div key={i} className="bg-orange-100">
            <p>{item.ingredient}</p>
            <p>{item.category}</p>
            <p>{item.calories}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recipes
