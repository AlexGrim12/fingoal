'use client'
import React, { useState } from 'react'

export default function CreateGoal() {
  const [goal, setGoal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para publicar la meta
    console.log('Nueva meta:', goal)
    setGoal('')
  }

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded bg-zinc-900 text-white border-none focus:outline-none"
          rows={3}
          placeholder="¿Cuál es tu próxima meta financiera?"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Publicar Meta
        </button>
      </form>
    </div>
  )
}
