import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <ul>
        <li><Link href="/ingredient">Go to Ingredient Page</Link></li>
        <li><Link href="/recipe">Go to Recipe Page</Link></li>
      </ul>
    </main>
  );
}
