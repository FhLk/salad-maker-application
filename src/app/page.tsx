import Navbar from "@/components/Navbar";
import Link from "next/link";
import IngredientPage from "./ingredient/page";

export default function Home() {
  return (
    <main className="min-h-screen flex w-full">
      <IngredientPage/>
    </main>
  );
}