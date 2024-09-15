'use client'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'

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
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      text-white
      font-sans
    "
    >
      <div>
        <h1>Settings</h1>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Log out
      </button>
    </div>
  )
}
