import React from 'react'

const friends = [
  { id: 1, name: 'Ana', online: true },
  { id: 2, name: 'Carlos', online: false },
  { id: 3, name: 'Elena', online: true },
]

export default function FriendsList() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Amigos</h2>
      <ul className="space-y-2">
        {friends.map((friend) => (
          <li key={friend.id} className="flex items-center">
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                friend.online ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></span>
            <span>{friend.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
