"use client"

import React, { FC, useEffect, useState } from 'react'
import { ingredientData } from './ListIngredient';

interface RecipeData{
  id : string,
  name: string,
  ingredients: ingredientData[],
  calories: number
}

const EditRecipe : FC<{params:string}> =({ params })=> {
  const [recipeData, setRecipeData] = useState<RecipeData>({ id:"",name:"",ingredients:[],calories: 0});

  const getRecipeByID = async ()=>{
    const respose = await fetch(`http://localhost:8000/recipes/${params}`,{
      method:"GET"
    });    
    const jsonData = await respose.json();
    setRecipeData(jsonData);
  }

  useEffect(()=>{
    getRecipeByID()
  },[params])

  return (
    <div>
      <p>{recipeData.id}</p>
      <p>{recipeData.calories}</p>
      <p>{recipeData.name}</p>
      <div className='grid grid-cols-4 gap-4'>
      {recipeData.ingredients.map((item,i) => (
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

export default EditRecipe