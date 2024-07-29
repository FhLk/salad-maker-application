import Link from 'next/link'
import React, { FC } from 'react'

interface RecipeID {
    recipeId: string,
    onDelRecipe: () => void;
}

const DelRecipe: FC<RecipeID> = ({ recipeId, onDelRecipe }) => {

    const removeRecipe = async (id: string) => {
        try {
            const respose = await fetch(`http://localhost:8000/recipes/${id}`, {
                method: "DELETE"
            })
            if(respose.status === 200){
                onDelRecipe()
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='flex'>
            <button className="p-3 bg-sky-300 rounded-lg text-center">
                <Link href={`/recipe/edit/${recipeId}`}>Edit Recipe</Link>
            </button>
            <button className="p-3 bg-sky-300 rounded-lg text-center" onClick={() => removeRecipe(recipeId)}>
                Delete
            </button>
        </div>
    )
}

export default DelRecipe
