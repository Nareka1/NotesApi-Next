"use client";
import Link from "next/link";
import { array } from "./test";
import { useState } from "react";

export default function Test() {
  function handleButton() {
    setLikes(likes + 1);
  }
  const [likes, setLikes] = useState(0);
  return (
    <div>
      <Link href={"/"}>kembali ke notes</Link>
      <br />
      <h1>wawe</h1>

      <div>
        <button onClick={handleButton}>likes {likes}</button>
        <ul>
          {array.map((ray, index) => {
            return (
              <li className="border-2" key={index}>
                {ray}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
