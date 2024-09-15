'use client'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { FriendsList, Navbar } from '../home/components'

export default function Settings() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await getAuth().signOut()
      console.log('Logged out')
      // to login
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className="flex min-h-screen text-white">
      <div
        className="
        w-1/5 shadow-md
      "
      >
        <Navbar />
      </div>
      <div
        className="
        flex flex-col items-center justify-center w-3/5
      "
      >
        <h1>Settings</h1>

        <button
          onClick={handleLogout}
          className="
          px-4 py-2 rounded-md bg-red-500 text-white
        "
        >
          Log out
        </button>
      </div>
      <div className="flex min-h-screen text-white">
        <FriendsList />
      </div>
    </div>
  )
}
