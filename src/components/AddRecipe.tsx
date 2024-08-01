import React, { FC, useEffect, useState } from 'react'
import { ingredients } from './ListIngredient'
import Swal from 'sweetalert2'

interface RecipesProps {
  recipes: ingredients[],
  totalCalories: number
}

const Recipes: FC<RecipesProps> = ({ recipes, totalCalories }) => {
  const [totleIngredients, setTotalIngredients] = useState<number>(0)

  useEffect(()=>{
    console.log(recipes);
    
    setTotalIngredients(recipes.reduce((acc, ingredient) => acc + ingredient.count, 0));
  },[totalCalories])

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
      title: "Recipe Name",
      input: "text",
      inputPlaceholder: "Input your recipe name...",
      confirmButtonText: "Create New Recipe",
      confirmButtonColor: "#2FB62D",
      showCancelButton: true, 
      cancelButtonText: "Cancel",
      cancelButtonColor: "#FFFFFF",
      showCloseButton:true,
      inputValue: "",
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        addNewRecipes(result.value)
        Swal.fire("Create New Recipe", "", "success");
      }
    })
  }

  return (
    <div className='text-white text-2xl font-bold flex justify-between items-center space-x-[10px]'>
      <div className='flex w-full justify-between items-center px-[16px] rounded-[16px] h-[60px] bg-[#F8B602]'>
          <p><span className=' bg-white px-[8px] rounded-lg text-[#F8B602] '>{totleIngredients}</span> Your Ingredients</p>
          <p>{totalCalories} Cal</p>
      </div>
      <button className="p-3 bg-[#2FB62D] w-[296px] h-[60px] rounded-[16px] text-center" onClick={requireName}>Create Recipes</button>
      {/* <p>Total Calories: {totalCalories}</p>
      <div className="grid grid-cols-4 gap-4">
        {recipes.map((item, i) => (
          <div key={i} className="bg-orange-100">
            <p>{item.ingredient}</p>
            <p>{item.category}</p>
            <p>{item.calories}</p>
            <p>{item.count}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Recipes
