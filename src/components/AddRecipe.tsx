import React, { FC, useEffect, useState } from 'react'
import { ingredients } from './ListIngredient'
import Swal from 'sweetalert2'

interface RecipesProps {
  recipes: ingredients[],
  totalCalories: number
}

const Recipes: FC<RecipesProps> = ({ recipes, totalCalories }) => {

  const addNewRecipes = async (recipeName : string) => {
    try {
      const recipesRequest = recipes;
      const respose = await fetch("http://localhost:8000/recipes/", {
        method: "POST",
        body: JSON.stringify({
          name: recipeName,
          ingredients: recipesRequest,
          calories: totalCalories
        })
      })

    } catch (error) {
      console.error(error);
    }
  }

  const requireName = () => {
    Swal.fire({
      title: "New Recipe",
      input: "text",
      inputLabel: "Your recipe name",
      inputPlaceholder: "Enter your recipe name",
      confirmButtonText: "Create New Recipe", 
      inputValue: ""
    }).then((result)=>{
      if(result.isConfirmed){
        addNewRecipes(result.value)
        Swal.fire("Create New Recipe", "", "success");
      }
    })
  }

  return (
    <div>
      <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={requireName}>Create Recipes</button>
      <p>Total Calories: {totalCalories}</p>
      <div className="grid grid-cols-4 gap-4">
        {recipes.map((item, i) => (
          <div key={i} className="bg-orange-100">
            <p>{item.ingredient}</p>
            <p>{item.category}</p>
            <p>{item.calories}</p>
            <p>{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recipes
