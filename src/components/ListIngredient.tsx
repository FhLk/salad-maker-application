"use client"
import { useState, useEffect } from "react";
import React, { FC } from 'react';
import AddRecipes from "./AddRecipe";

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
    
    else if(ingredient.count === 0){
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
    <div className="space-y-5">
      <h1 className="font-semibold text-lg">Select Category</h1>
      <div className="flex justify-start space-x-10">
        <button className="p-3 bg-white rounded-[16px] text-[#A098AE] text-center h-[160px] w-[160px] px-[24px] py-[32px] hover:bg-slate-300 hover:text-black">Vegetables</button>
        <button className="p-3 bg-white rounded-[16px] text-[#A098AE] text-center h-[160px] w-[160px] px-[24px] py-[32px] hover:bg-slate-300 hover:text-black">Fruit</button>
        <button className="p-3 bg-white rounded-[16px] text-[#A098AE] text-center h-[160px] w-[160px] px-[24px] py-[32px] hover:bg-slate-300 hover:text-black">Protein</button>
        <button className="p-3 bg-white rounded-[16px] text-[#A098AE] text-center h-[160px] w-[160px] px-[24px] py-[32px] hover:bg-slate-300 hover:text-black">Dressing</button>
      </div>
      <h1 className="font-semibold text-lg">Choose your ingredients to make a salad</h1>
        <div className="grid grid-cols-4 gap-4">
        {ingredients.map((item,i) => (
          <div key={i} className="bg-white rounded-2xl w-full px-[24px] py-[32px]">
            <div className="w-full flex justify-center pb-[24px]">
              <img src="./img-placheholder.svg" width="150px" height="90px"/>
            </div>
            <div className="">
              <p className="capitalize">{item.ingredient}</p>
              <p className="font-bold">{item.calories} <span className="text-[#F8B602]"> Cal</span></p>
              <div className="flex space-x-3 justify-end font-bold">
                <button className="p-3 bg-[#F8B602] h-10 w-10 rounded-full flex justify-center items-center" onClick={() => decreaseIngredient(item) }> - </button>
                <p className="flex items-center" >{item.count}</p>
                <button className="p-3 bg-[#F8B602] h-10 w-10 rounded-full flex justify-center items-center" onClick={() => increaseIngredient(item)  }> + </button>
              </div>
            </div>
          </div>
        ))}
        </div>
        <AddRecipes recipes={ingredientsAdd} totalCalories={totalCalories} />
    </div>
  );
}

export default List