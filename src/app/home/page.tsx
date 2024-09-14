import React from 'react'
import { Navbar, CreateGoal, Feed, FriendsList } from './components'

export default function HomePage() {
  return (
    <div className="flex min-h-screen text-white">
      {/* Left Column - Navbar */}
      <div className="w-1/5 shadow-md">
        <Navbar />
      </div>

      {/* Center Column - Create Goal and Feed */}
      <div className="w-3/5 px-4 py-6">
        <CreateGoal />
        <Feed />
      </div>

      {/* Right Column - Friends List */}
      <div className="w-1/5  shadow-md">
        <FriendsList />
      </div>
    </div>
  )
}
