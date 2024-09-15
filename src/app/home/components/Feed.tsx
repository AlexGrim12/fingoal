'use client'
import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'

interface Goal {
  id: number
  user: string
  content: string
  likes: number
  comments: number
  category: string
  savingAmount?: number
  savingCurrent?: number
  image?: string // Add image property
}

export default function Feed() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  // const user = auth.currentUser  // No need to get the current user here
  // const userEmail = user ? user.email : 'unknown' // Get the current user's email

  useEffect(() => {
    const getGoals = async () => {
      try {
        const goalsCollectionRef = collection(db, 'goals')
        // Fetch all goals from the collection
        const querySnapshot = await getDocs(goalsCollectionRef)
        const goalsData: Goal[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          const goal = {
            id: parseInt(doc.id),
            user: data.userEmail,
            content: data.goal,
            savingAmount: data.savingAmount,
            savingCurrent: data.savingCurrent,
            category: data.category,
            likes: 0, // Placeholder for likes
            comments: 0, // Placeholder for comments
            image: data.image, // Add image to the data
          }
          if (data.savingAmount && data.savingAmount !== 0) {
            goal.savingAmount = data.savingAmount
          }
          if (data.savingCurrent && data.savingCurrent !== 0) {
            goal.savingCurrent = data.savingCurrent
          }
          goalsData.push(goal)
        })
        setGoals(goalsData)
        setLoading(false)
      } catch (error) {
        console.error('Error al leer las metas:', error)
        setLoading(false)
      }
    }
    getGoals()
  }, [db])

  return (
    <div className="space-y-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        goals
          .filter((goal) => goal.user) // Filter out the current user's goals
          .map((goal) => (
            <div
              key={goal.id}
              className="bg-white bg-opacity-10 p-4 rounded-lg shadow"
            >
              <div className="flex justify-between">
                <p className="font-bold">{goal.user}</p>
                <p className="text-gray-300">{goal.category}</p>
              </div>
              <p className="mt-2">{goal.content}</p>
              {/* Display saving amount and current if they exist */}
              {goal.savingAmount && goal.savingCurrent && (
                <div
                  className="
                  flex justify-between text-gray-200 
                "
                >
                  <p>Saving Amount: {goal.savingAmount}</p>
                  <p>Saving Current: {goal.savingCurrent}</p>
                  <p>Remaining: {goal.savingAmount - goal.savingCurrent}</p>
                  <p>
                    Progress:{' '}
                    {Math.round((goal.savingCurrent / goal.savingAmount) * 100)}
                    % complete
                  </p>
                </div>
              )}
              {/* Display image if it exists */}
              {goal.image && (
                <Image
                  src={goal.image}
                  alt="Goal Image"
                  className="mt-2 w-full h-auto"
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
  )
}
