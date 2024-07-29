"use client"
import { useState, useEffect } from "react";
import React, { FC } from 'react';
import Recipes from "./AddRecipe";

export interface ingredients {
  id: string,
  ingredient: string,
  category: string,
  calories: number,
  count: number,
}

const List : FC = ()=> {
  const [ingredients, setIngredients] = useState<ingredients[]>([])
  const [ingredientsAdd, setIngredientsAdd] = useState<ingredients[]>([])
  const [ingredientAdd, setIngredientAdd] = useState<ingredients>()
  const [totalCalories, setTotalCalories] = useState<number>(0)

  //Fetch API
  useEffect(() => {

    const getAllIngredients = async () => {
      try {
        const respose = await fetch("http://localhost:8000/ingredients/")
        if(respose.status === 200){
          const jsonData = await respose.json();
          for (const i in jsonData) {
            jsonData[i].count = 0
          }
          setIngredients(jsonData)
        }
      } catch (error) {
        console.error(error);
      }
    }
    getAllIngredients()
  }, [])

  const increaseIngredient = (ingredient: ingredients) => {
    setIngredientAdd({...ingredient,count:++ingredient.count})
    if(!ingredientsAdd.includes(ingredient)){
      setIngredientsAdd([...ingredientsAdd,ingredient])
    }
  }
  
  useEffect(() => {
    calculateCalories()
  }, [ingredientAdd]);

  const decreaseIngredient = (ingredient: ingredients) => {
    if(ingredient.count > 0){
      setIngredientAdd({...ingredient,count:--ingredient.count})
    }
    
    if(ingredient.count === 0){
      if(ingredientsAdd.length !== 0){
        ingredientsAdd.splice(ingredientsAdd.indexOf(ingredient),1)
        setIngredientsAdd([...ingredientsAdd])   
      }
    }
  }

  const calculateCalories = () => {
    setTotalCalories(ingredientsAdd.reduce((acc, ingredient) => acc + (ingredient.count * ingredient.calories), 0));
  };

  return (
    <div>
      <div className="flex justify-around">
        <button className="p-3 bg-sky-300 rounded-lg text-center">Vegetables</button>
        <button className="p-3 bg-sky-300 rounded-lg text-center">Fruit</button>
        <button className="p-3 bg-sky-300 rounded-lg text-center">Protein</button>
        <button className="p-3 bg-sky-300 rounded-lg text-center">Dressing</button>
      </div>
        <div className="grid grid-cols-4 gap-4">
        {ingredients.map((item,i) => (
          <div key={i} className="bg-orange-100">
            <p>{item.ingredient}</p>
            <p>{item.category}</p>
            <p>{item.calories}</p>
            <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={() => increaseIngredient(item)}>Increase</button>
            <p>{item.count}</p>
            <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={() => decreaseIngredient(item)}>Decrease</button>
          </div>
        ))}
        </div>
        <Recipes recipes={ingredientsAdd} totalCalories={totalCalories} />
    </div>
  );
}

export default List