"use client"
import EditRecipe from '@/components/EditRecipe';
import { useParams } from 'next/navigation';


export default function EditRecipePage() {
  const params = useParams<{ recipeId: string }>();
  return (
    <div className="w-full h-screen px-[40px] py-3">
      <h1 className='text-3xl font-bold my-4'>Edit Recipe</h1>
      <EditRecipe params={params.recipeId}/>
    </div>
  );
}
