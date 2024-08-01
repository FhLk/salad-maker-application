import ListRecipe from "@/components/ListRecipe";

export default function recipePage(){
    return (
        <div className="w-full min-h-screen px-[40px] py-3">
          <h1 className="text-3xl font-bold  my-4">Recipes</h1>
          <ListRecipe/>
        </div>
      );
}