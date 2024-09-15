'use client'
import React, { useState } from 'react'
import { db } from '../../firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import Navbar from '../home/components/NavBar'
import { FriendsList } from '../home/components'

interface Goal {
  id: string
  user: string
  content: string
  likes: number
  comments: number
  category: string
  savingAmount?: number
  savingCurrent?: number
  image?: string
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('content')
  const [searchResults, setSearchResults] = useState<Goal[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setLoading(true)
    const goalsCollectionRef = collection(db, 'goals')
    let searchQuery

    switch (searchType) {
      case 'content':
        searchQuery = query(
          goalsCollectionRef,
          where('goal', '>=', searchTerm),
          where('goal', '<=', searchTerm + '\uf8ff')
        )
        break
      case 'category':
        searchQuery = query(
          goalsCollectionRef,
          where('category', '==', searchTerm)
        )
        break
      case 'user':
        searchQuery = query(
          goalsCollectionRef,
          where('userEmail', '==', searchTerm)
        )
        break
      default:
        searchQuery = query(
          goalsCollectionRef,
          where('goal', '>=', searchTerm),
          where('goal', '<=', searchTerm + '\uf8ff')
        )
    }

    try {
      const querySnapshot = await getDocs(searchQuery)
      const results: Goal[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        user: doc.data().userEmail,
        content: doc.data().goal,
        likes: doc.data().likes || 0,
        comments: doc.data().comments?.length || 0,
        category: doc.data().category,
        savingAmount: doc.data().savingAmount,
        savingCurrent: doc.data().savingCurrent,
        image: doc.data().image,
      }))
      setSearchResults(results)
    } catch (error) {
      console.error('Error searching goals:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen text-white">
      <div className="w-1/5 shadow-md">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center w-3/5">
        <h1 className="text-3xl font-bold mb-6 text-white ">Search Goals</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex space-x-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term..."
              className="flex-grow p-2 rounded bg-gray-700 text-white"
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="content">Content</option>
              <option value="category">Category</option>
              <option value="user">User Email</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Search
            </button>
          </div>
        </form>

        {loading ? (
          <p className="text-white">Searching...</p>
        ) : searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map((goal) => (
              <div
                key={goal.id}
                className="bg-white bg-opacity-10 p-4 rounded-lg shadow"
              >
                <div className="flex justify-between">
                  <p className="font-bold text-white">{goal.user}</p>
                  <p className="text-gray-300">{goal.category}</p>
                </div>
                <p className="mt-2 text-white">{goal.content}</p>
                {goal.savingAmount && goal.savingCurrent && (
                  <div className="flex justify-between text-gray-200 mt-2">
                    <p>Target: ${goal.savingAmount}</p>
                    <p>Current: ${goal.savingCurrent}</p>
                    <p>Remaining: ${goal.savingAmount - goal.savingCurrent}</p>
                  </div>
                )}
                {goal.image && (
                  <Image
                    src={goal.image}
                    alt="Goal Image"
                    className="mt-2 mx-auto w-92 h-auto rounded-md shadow-xl border-2 border-white"
                    width={500}
                    height={300}
                  />
                )}
                <div className="mt-4 flex justify-between text-gray-200">
                  <span>{goal.likes} likes</span>
                  <span>{goal.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm && !loading ? (
          <p className="text-white">No results found.</p>
        ) : null}
      </div>
      <div className="w-1/5 shadow-md">
        <FriendsList />
      </div>
    </div>
  )
}
