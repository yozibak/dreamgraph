import { useEffect, useState } from 'react'
import { createNote, fetchNotes } from './network'
import { Note } from './types'

export default () => {
  const [notes, setNotes] = useState<Note[]>([])
  useEffect(() => {
    let mount = true
    async function init() {
      const data = await fetchNotes()
      if (mount) {
        setNotes(data)
      }
    }
    init()
    return () => {
      mount = false
    }
  }, [])

  return (
    <>
      <h1>hello world</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.createdAt}>{note.content}</li>
        ))}
      </ul>
      <NoteForm />
    </>
  )
}

const NoteForm = () => {
  const [content, setContent] = useState('')
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await createNote(content)
      }}
    >
      <input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="what's up?"
      />
    </form>
  )
}
