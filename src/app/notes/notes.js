"use client";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import Link from "next/link";
import { DarkToogle } from "@/components/darkButton";
import { LoadingBar } from "@/components/loading";
const api_url = "https://notes-api.dicoding.dev/v2/notes";

export function NotesHome() {
  const [notes, setNotes] = useState([]);
  const [archive, setArchive] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getNotes();
    getArchive();

    const interval = setInterval(() => {
      setCount((p) => p + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(`count ${count}`);

  async function getNotes() {
    setLoading(true);
    try {
      const response = await fetch(api_url);
      const { data } = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getArchive() {
    try {
      const response = await fetch(`${api_url}/archived`);
      const { data } = await response.json();
      setArchive(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addNotes(title, body) {
    try {
      const response = await fetch(`${api_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      setTitle("");
      setBody("");
      getNotes();
    } catch (Error) {
      console.error(Error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNotes(title, body);
  }

  async function deleteNotes(id) {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: "DELETE",
      });
      getNotes();
    } catch (error) {
      console.error(error);
    }
  }

  async function archiveNotes(params) {
    try {
      const response = await fetch(`${api_url}/${params}/archive`, {
        method: "POST",
      });
      getArchive();
      getNotes();
    } catch (Error) {
      console.error(Error);
    }
  }

  function handleArchive(id) {
    archiveNotes(id);
  }

  async function unarchiveNotes(params) {
    try {
      const response = await fetch(`${api_url}/${params}/unarchive`, {
        method: "POST",
      });
      getArchive();
      getNotes();
    } catch (error) {
      console.error(error);
    }
  }

  function handleUnarchive(id) {
    unarchiveNotes(id);
  }

  return (
    <main>
      <header>
        <h1 className="p-10 text-center font-bold text-2xl bg-indigo-500 dark:bg-rose-600">
          Halo selamat datang di App Notes
        </h1>
      </header>
      <DarkToogle title="DarkButton" />
      <section>
        <div className=" mx-auto relative w-[800px]">
          <form
            className="border-2 border-neutral-200 dark:bg-zinc-950 rounded-md shadow-md p-20"
            onSubmit={handleSubmit}
          >
            <label className="font-bold">Title</label>
            <br />
            <input
              className="input border-2 border-blue-600 w-full rounded-md dark:bg-slate-900"
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(eve) => {
                setTitle(eve.target.value);
              }}
              required
            />
            <br />

            <label>Body</label>
            <br />
            <input
              className="input border-2 border-blue-600 w-full rounded-md dark:bg-slate-900"
              type="text"
              name="body"
              placeholder="body"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              required
            />
            <br />

            <input
              className=" bg-purple-500 hover:bg-purple-400 w-full rounded-md"
              type="submit"
              name="submit"
              value={"click"}
            />
          </form>
        </div>
      </section>

      <section>
        <h1 className="text-white">set count {count}</h1>
        <h1 className="text-2xl font-extrabold text-center underline">Notes</h1>
        <>{loading ? <LoadingBar /> : null}</>

        <div className="grid grid-cols-3 gap-4 p-4 border-2 border-neutral-200 rounded-md m-5">
          {notes.map((note) => (
            <div
              className="border-2 border-sky-600 rounded-md p-5"
              key={note.id}
            >
              <h1 className=" text-2xl font-bold">{note.title}</h1>
              <p>{note.body}</p>

              <div className="flex gap-4 m-4">
                <button
                  className="bg-red-500 p-3 w-full rounded-lg hover:bg-red-400 transition-all"
                  onClick={() => deleteNotes(note.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-sky-500 p-3 w-full rounded-lg hover:bg-sky-400 transition-all"
                  onClick={() => handleArchive(note.id)}
                >
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-extrabold capitalize text-center underline">
          arsip
        </h1>
        <div className="grid grid-cols-3 gap-4 p-4 border-2 border-neutral-200 rounded-md m-5">
          {archive.map((note) => {
            return (
              <div
                className="border-2 border-red-500 rounded-md p-5"
                key={note.id}
              >
                <h1 className=" text-2xl font-bold">{note.title}</h1>
                <p>{note.body}</p>

                <div className="flex m-4">
                  <button
                    className="bg-indigo-500 hover:bg-indigo-400 w-full p-3 rounded-lg"
                    onClick={() => {
                      handleUnarchive(note.id);
                    }}
                  >
                    Unarchive
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
