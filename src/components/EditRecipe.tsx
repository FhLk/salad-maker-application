"use client"

import React, { FC, useEffect, useState } from 'react'
import { ingredients } from './ListIngredient';
import Swal from 'sweetalert2';
import { permanentRedirect, redirect } from 'next/navigation';
import { RecipeData } from './ListRecipe';


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
    <div className='bg-white p-[20px] rounded-[16px]'>
      <h2 className='text-xl font-bold'>Your ingredients to make a salad Recipe</h2>
      <div className='flex flex-col gap-4 bg-white py-5'>
        {ingredientsEdit.map((item, i) => (
          <div key={i} className="flex justify-between py-1">
            <div className='flex space-x-7'>
              <img className='flex-none' src='/img-placheholder.svg' height="80px" width="80px"></img>
              <div className='space-y-3'>
                <p className='font-bold'>{item.ingredient}</p>
                <p className='flex gap-3 items-center text-[15px] text-[#A098AE]'>
                  <button className="p-3 bg-[#F8B602] h-5 w-5 rounded-full flex justify-center items-center font-bold text-black" onClick={() => decreaseIngredient(item)}> - </button>
                    x{item.count} 
                  <button className="p-3 bg-[#F8B602] h-5 w-5 rounded-full flex justify-center items-center font-bold text-black" onClick={() => increaseIngredient(item)}> + </button>
                </p>
                <button className="text-[#FE0000] underline" onClick={() => deleteIngredient(item)}>Delete</button>
              </div>
            </div>
            <div className='flex items-center font-bold'>
              <p>x{item.calories * item.count} <span className=" text-[#F8B602]">Cal</span></p>
            </div>
          </div>
        ))}
      </div>
      <p className='flex justify-between text-2xl'>Total Calorie <span className=''>{totalCalories} <span className=" text-[#F8B602] font-bold">Cal</span></span></p>
      <button className="p-3 bg-[#F8B602] w-full my-3 text-white font-bold rounded-lg text-center" onClick={() => updateRecipe()}>Update Recipe</button>
    </div>
  )
}

export default EditRecipe