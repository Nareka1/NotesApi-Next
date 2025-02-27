"use client";
import { useState, useEffect } from "react";
// import { useEffect, useState } from "react/cjs/react.production";
const api_url = "https://notes-api.dicoding.dev/v2/notes";

async function fetchNote() {
  try {
    const response = await fetch(api_url);
    const { data } = await response.json();
    return data;
  } catch (er) {
    console.error(er);
  }
}

async function fetchArchiveNotes() {
  try {
    const response = await fetch(`${api_url}/archived`);
    const { data } = await response.json();
    return data;
  } catch (er) {
    console.error(er);
  }
}

export default function NoteList() {
  const [notes, setNote] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    async function loadNotes() {
      const fetchedNotes = await fetchNote();
      setNote(fetchedNotes);
    }

    async function loadArchive() {
      const archived = await fetchArchiveNotes();
      setArchivedNotes(archived);
    }

    loadArchive();
    loadNotes();
  }, []);

  return (
    <section>
      <form></form>

      <div>
        <div>
          <h1>notes</h1>
          {notes.map((note) => {
            return (
              <div id="sampelList" key={note.id}>
                <h1>{note.title}</h1>
                <p>{note.body}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <h1>archive</h1>
          {archivedNotes.map((note) => {
            return (
              <div className="border-2 border-red-500" key={note.id}>
                <h1>{note.title}</h1>
                <p>{note.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
