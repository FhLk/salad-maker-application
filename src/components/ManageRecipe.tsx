import { url } from 'inspector';
import Link from 'next/link'
import React, { FC } from 'react'
import Swal from 'sweetalert2';

interface RecipeID {
    recipeId: string,
    onDelRecipe: () => void;
}

const DelRecipe: FC<RecipeID> = ({ recipeId, onDelRecipe }) => {

    const deleteRecipe = async (id: string) => {
        try {
            const respose = await fetch(`http://localhost:8000/recipes/${id}`, {
                method: "DELETE"
            })
            if (respose.status === 200) {
                onDelRecipe()
            }
        } catch (error) {
            console.error(error);
        }
    }

    const alertDelete = () => {
        Swal.fire({
            title: "Delete Recipe",
            icon: "warning",
            iconColor: "#FF3F56",
            showCancelButton: true,
            confirmButtonColor: "#FF3F56",
            cancelButtonColor: "#FFFFFF",
            confirmButtonText: "Delete",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRecipe(recipeId)
                Swal.fire({
                    title: "Deleted",
                    text: "Your recipe has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className='flex justify-between'>
            <button className="p-1 w-[100px] h-[40px] bg-white rounded-[20px] text-center 
            text-[#FE0000] hover:bg-red-500 hover:text-white" onClick={() => alertDelete()}>
                Delete
            </button>
            <Link href={`/recipe/edit/${recipeId}`}>
                <button className="p-1 w-[100px] h-[40px] bg-white rounded-[20px] text-center
                hover:bg-slate-200">
                    Edit
                </button>
            </Link>
        </div>
    )
}

export default DelRecipe
