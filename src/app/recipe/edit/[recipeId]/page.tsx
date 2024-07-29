"use client"
import EditRecipe from '@/components/EditRecipe';
import { useParams } from 'next/navigation';


export default function EditRecipePage() {
  const params = useParams<{ recipeId: string }>();
  return (
    <div className="mx-auto">
      <EditRecipe params={params.recipeId}/>
    </div>
  );
}
