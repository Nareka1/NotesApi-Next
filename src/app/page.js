// "use client";
import Link from "next/link";
import Image from "next/image";
import { NotesHome } from "@/app/notes/notes";
import { DarkToogle } from "@/components/darkButton";

export const metadata = {
  title: "Belajar Notes Api dari Dicoding",
  description:
    "membuat notes dengan api dari dicoding, menggunakan frameworks Next.js",
  keywords: ["Next.js", "API", "dicoding"],
};

export default function Home() {
  return (
    <main>
      <DarkToogle />
      <section>
        <div className="">
          <Link className="bg-sky-500 p-4 w-20 " href={"/notes"}>
            Notes App
          </Link>
          <br />
        </div>
        <div>
          <br></br>
          <Link className="bg-green-500 p-4 w-20 " href={"/test"}>
            Test Route
          </Link>
        </div>
      </section>
    </main>
  );
}

console.log(metadata);
