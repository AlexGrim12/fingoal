import React from 'react'

interface Goal {
  id: number
  user: string
  content: string
  likes: number
  comments: number
}

const sampleGoals: Goal[] = [
  {
    id: 1,
    user: 'Maria',
    content: 'Ahorrar $5000 para un viaje',
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    user: 'Juan',
    content: 'Pagar mi deuda de tarjeta de crédito en 6 meses',
    likes: 20,
    comments: 5,
  },
]

export default function Feed() {
  return (
    <div className="space-y-4">
      {sampleGoals.map((goal) => (
        <div
          key={goal.id}
          className="bg-white bg-opacity-10 p-4 rounded-lg shadow"
        >
          <p className="font-bold">{goal.user}</p>
          <p className="mt-2">{goal.content}</p>
          <div className="mt-4 flex justify-between text-gray-200">
            <span>{goal.likes} likes</span>
            <span>{goal.comments} comentarios</span>
          </div>
        </div>
      ))}
    </div>
  )
}
