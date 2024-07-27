"use client"
import { useState, useEffect } from "react";
import React, { FC } from 'react';
import Recipes from "./AddRecipe";
export interface ingredientData {
  id: string,
  ingredient: string,
  category: string,
  calories: number
}

const List : FC = ()=> {
  const [data, setData] = useState<ingredientData[]>([]);
  const [ingredients, setIngredients] = useState<ingredientData[]>([])

  useEffect(() => {

    const getAllIngredients = async () => {
      try {
        const respose = await fetch("http://localhost:8000/ingredients/")
        const jsonData = await respose.json();
        setData(jsonData);

      } catch (error) {
        console.error(error);
      }
    }
    getAllIngredients()
  }, [])

  const selectIngredient = async (ingredient : ingredientData) =>{
    setIngredients([...ingredients,ingredient])
    console.log(ingredients);
  }

  const removeIngredients = ()=>{
    setIngredients([])
  }

  return (
    <div>
      <div className="flex justify-around">
        <button className="p-3 bg-sky-300 rounded-lg text-center">Vegetables</button>
        <button className="p-3 bg-sky-300 rounded-lg text-center">Fruit</button>
        <button className="p-3 bg-sky-300 rounded-lg text-center">Protein</button>
        <button className="p-3 bg-sky-300 rounded-lg text-center">Dressing</button>
      </div>
        <div className="grid grid-cols-4 gap-4">
        {data.map((item,i) => (
          <div key={i} className="bg-orange-100" onClick={()=>selectIngredient(item)}>
            <p>{item.ingredient}</p>
            <p>{item.category}</p>
            <p>{item.calories}</p>
          </div>
        ))}
        </div>
        <Recipes recipes={ingredients} />
        <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={removeIngredients}>Clear Ingredients</button>
    </div>
  );
}

export default List