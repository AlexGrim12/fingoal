'use client'
import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import { FriendsList, Navbar } from '@/app/home/components'

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

export default function Profile() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userGoals, setUserGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      setUserEmail(user.email)
      fetchUserGoals(user.email)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserGoals = async (email: string | null) => {
    if (!email) return

    try {
      const goalsCollectionRef = collection(db, 'goals')
      const userGoalsQuery = query(
        goalsCollectionRef,
        where('userEmail', '==', email)
      )
      const querySnapshot = await getDocs(userGoalsQuery)

      const goalsData: Goal[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        user: doc.data().userEmail,
        content: doc.data().goal,
        savingAmount: doc.data().savingAmount,
        savingCurrent: doc.data().savingCurrent,
        category: doc.data().category,
        likes: doc.data().likes || 0,
        comments: doc.data().comments?.length || 0,
        image: doc.data().image,
      }))

      setUserGoals(goalsData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user goals:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!userEmail) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="flex min-h-screen text-white">
      <div className="w-1/5 shadow-md">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">User Profile</h1>
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-2 text-white">Email</h2>
          <p className="text-gray-300">{userEmail}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Your Goals</h2>
        <div className="space-y-6">
          {userGoals.length === 0 ? (
            <p className="text-gray-300">
              You haven&apos;t created any goals yet.
            </p>
          ) : (
            userGoals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white bg-opacity-10 p-4 rounded-lg shadow"
              >
                <div className="flex justify-between">
                  <p className="font-bold text-white">{goal.category}</p>
                </div>
                <p className="mt-2 text-white">{goal.content}</p>
                {goal.savingAmount && goal.savingCurrent && (
                  <div className="flex justify-between text-gray-200 mt-2">
                    <p>Target: ${goal.savingAmount}</p>
                    <p>Current: ${goal.savingCurrent}</p>
                    <p>Remaining: ${goal.savingAmount - goal.savingCurrent}</p>
                    <div className="w-52 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (goal.savingCurrent / goal.savingAmount) * 100
                          }%`,
                        }}
                      >
                        {(
                          (goal.savingCurrent / goal.savingAmount) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </div>
                  </div>
                )}
                {goal.image && (
                  <Image
                    src={goal.image}
                    alt="Goal Image"
                    className="mt-2 mx-auto w-96 h-auto rounded-md shadow-xl border-2 border-white"
                    width={500}
                    height={300}
                  />
                )}
                <div className="mt-4 flex justify-between text-gray-200">
                  <span>{goal.likes} likes</span>
                  <span>{goal.comments} comments</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-1/5  shadow-md">
        <FriendsList />
      </div>
    </div>
  )
}
