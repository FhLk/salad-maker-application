"use client"
import { useState, useEffect } from "react";
import React, { FC } from 'react';
import { ingredients } from "./ListIngredient";
import ManageRecipe from "./ManageRecipe";
import Swal from "sweetalert2";
interface RecipeData {
    id: string,
    name: string,
    ingredients: ingredients[],
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
            <div className="bg-white p-3 rounded-[16px]">
                <h2 className="text-xl font-bold py-3">Your recipes</h2>
                <div className="grid grid-cols-4 gap-4">
                    {data.map((item, i) => (
                        <div key={i} className="bg-shape rounded-[16px] py-[24px] px-[12px] h-[250px] flex flex-col justify-between">
                            <div className="bg-white rounded-[16px] p-[16px] ">
                                <p>{item.name}</p>
                                <p className="text-[24px] font-bold">{item.calories} <span className=" text-[#F8B602]">Cal</span> </p>
                            </div>
                            <ManageRecipe recipeId={item.id} onDelRecipe={getAllRecipes} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default List