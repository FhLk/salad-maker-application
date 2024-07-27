"use client"
import { useState, useEffect } from "react";
import React, { FC } from 'react';
import { ingredientData } from "./ListIngredient";
import ManageRecipe from "./ManageRecipe";
interface RecipeData {
    id: string,
    name: string,
    ingredients: ingredientData[],
    calories: number
}


const List: FC = () => {
    const [data, setData] = useState<RecipeData[]>([]);

    const getAllRecipes = async () => {
        try {
            const respose = await fetch("http://localhost:8000/recipes/")
            const jsonData = await respose.json();
            setData(jsonData);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
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
                        <ManageRecipe recipeId={item.id} onDelRecipe={getAllRecipes} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default List