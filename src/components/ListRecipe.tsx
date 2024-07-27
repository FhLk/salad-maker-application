"use client"
import { useState, useEffect } from "react";
import React, { FC } from 'react';
import Recipes from "./AddRecipe";
import { ingredientData } from "./ListIngredient";
export interface RecipeData {
    id: string,
    name: string,
    ingredient: ingredientData[],
    calories: number
}

const List: FC = () => {
    const [data, setData] = useState<RecipeData[]>([]);

    useEffect(() => {

        const getAllRecipes = async () => {
            try {
                const respose = await fetch("http://localhost:8000/recipes/")
                const jsonData = await respose.json();
                setData(jsonData);

            } catch (error) {
                console.error(error);
            }
        }
        getAllRecipes()
    }, [])

    return (
        <div>
            <h1>Recipes Page</h1>
            <div className="grid grid-cols-4 gap-4">
                {data.map((item, i) => (
                    <div key={i} className="bg-orange-100">
                        <p>{item.name}</p>
                        <p>{item.calories}</p>
                        <button className="p-3 bg-sky-300 rounded-lg text-center">Edit</button>
                        <button className="p-3 bg-sky-300 rounded-lg text-center">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default List