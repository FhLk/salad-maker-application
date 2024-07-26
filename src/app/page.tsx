import Link from "next/link";

export default function Home() {
  return (
    <main className="text-black">
      <ul>
        <li><Link href="/ingredient">Go to Ingredient Page</Link></li>
        <li><Link href="/recipe">Go to Recipe Page</Link></li>
        <li><Link href="/edit">Go to Edit Recipe Page</Link></li>
      </ul>
    </main>
  );
}
