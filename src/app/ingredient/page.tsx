import ListIngredient from "@/components/ListIngredient";

export default function IngredientPage() {
  return (
    <div className="w-full min-h-screen px-[40px] py-3">
      <div className="flex justify-between w-full">
        <h1 className="font-bold w-1/2 text-3xl">Let's Create...your own salad!!!</h1>
        <input type="text" placeholder="Search ingredients to make a salad..." className="rounded-lg w-1/3 p-2" />
      </div>
      <ListIngredient/>
    </div>
  );
}
