"use client"

import React, { FC, useEffect, useState } from 'react'
import { ingredients } from './ListIngredient';
import Swal from 'sweetalert2';
import { permanentRedirect, redirect } from 'next/navigation';

interface RecipeData {
  id: string,
  name: string,
  ingredients: ingredients[],
  calories: number
}

const EditRecipe: FC<{ params: string }> = ({ params }) => {
  const [recipeData, setRecipeData] = useState<RecipeData>({ id: "", name: "", ingredients: [], calories: 0 });
  const [ingredientsEdit, setIngredientsEdit] = useState<ingredients[]>([])
  const [ingredientEdit, setIngredientEdit] = useState<ingredients>()
  const [totalCalories, setTotalCalories] = useState<number>(0)

  const getRecipeByID = async () => {
    const respose = await fetch(`http://localhost:8000/recipes/${params}`, {
      method: "GET"
    });
    const jsonData = await respose.json();
    setRecipeData(jsonData);
    setIngredientsEdit(jsonData.ingredients);
    setTotalCalories(jsonData.calories)
  }

  useEffect(() => {
    getRecipeByID()
  }, [params])

  const increaseIngredient = (ingredient: ingredients) => {
    setIngredientEdit({...ingredient,count:++ingredient.count})
  }

  const decreaseIngredient = (ingredient: ingredients) => {
    if(ingredient.count > 0){
      setIngredientEdit({...ingredient,count:--ingredient.count})
    }
    if(ingredient.count === 0){
      ingredientsEdit.splice(ingredientsEdit.indexOf(ingredient),1)
      setIngredientsEdit([...ingredientsEdit])
    }
  }

  const deleteIngredient = (ingredient: ingredients)=>{
    ingredientsEdit.splice(ingredientsEdit.indexOf(ingredient),1)
    setIngredientsEdit([...ingredientsEdit])
  }

  useEffect(()=>{
    calculateCalories()
  },[ingredientEdit,ingredientsEdit])

  const calculateCalories = () => {
    setTotalCalories(ingredientsEdit.reduce((acc, ingredient) => acc + (ingredient.count * ingredient.calories), 0));
  };

  const updateRecipe = async ()=>{
    const respose = await fetch(`http://localhost:8000/recipes/${params}`, {
      method: "PATCH",
      body: JSON.stringify({
        ingredients: ingredientsEdit,
        calories: totalCalories
      })
    });
    if(respose.status === 200){
      getRecipeByID()
      Swal.fire("Update Recipe", "", "success");
    }
  }

  return (
    <div>
      <p>{recipeData.id}</p>
      <p>{recipeData.name}</p>
      <p>{totalCalories}</p>
      <div className='grid grid-cols-4 gap-4'>
        {ingredientsEdit.map((item, i) => (
          <div key={i} className="bg-orange-100">
            <p>{item.ingredient}</p>
            <p>{item.category}</p>
            <p>{item.calories}</p>
            <div className='flex'>
            <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={() => decreaseIngredient(item)}>Decrease</button>
            <p>{item.count}</p>
            <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={() => increaseIngredient(item)}>Increase</button>
            </div>
            <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={() => deleteIngredient(item)}>Delete</button>
          </div>
        ))}
      </div>
      <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={() => updateRecipe()}>Update Recipe</button>
    </div>
  )
}

export default EditRecipe