'use client'
import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase/config'
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore'
import Image from 'next/image'
import { getAuth } from 'firebase/auth'

interface Comment {
  user: string
  text: string
  timestamp: Date
}

interface Goal {
  id: string
  user: string
  content: string
  likes: number
  comments: Comment[]
  category: string
  savingAmount?: number
  savingCurrent?: number
  image?: string
}

export default function Feed() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const auth = getAuth()

  useEffect(() => {
    const getGoals = async () => {
      try {
        const goalsCollectionRef = collection(db, 'goals')
        const querySnapshot = await getDocs(goalsCollectionRef)
        const goalsData: Goal[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data().userEmail,
          content: doc.data().goal,
          savingAmount: doc.data().savingAmount,
          savingCurrent: doc.data().savingCurrent,
          category: doc.data().category,
          likes: doc.data().likes || 0,
          comments: doc.data().comments || [],
          image: doc.data().image,
        }))
        setGoals(goalsData)
        setLoading(false)
      } catch (error) {
        console.error('Error reading goals:', error)
        setLoading(false)
      }
    }
    getGoals()
  }, [])

  const handleLike = async (goalId: string) => {
    const user = auth.currentUser
    if (!user) {
      console.error('User not authenticated')
      return
    }

    try {
      const goalRef = doc(db, 'goals', goalId)
      await updateDoc(goalRef, {
        likes: (goals.find((g) => g.id === goalId)?.likes || 0) + 1,
      })
      setGoals(
        goals.map((goal) =>
          goal.id === goalId ? { ...goal, likes: goal.likes + 1 } : goal
        )
      )
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handleAddComment = async (goalId: string) => {
    const user = auth.currentUser
    if (!user || !newComment.trim()) {
      return
    }

    const comment: Comment = {
      user: user.email || 'Anonymous',
      text: newComment.trim(),
      timestamp: new Date(),
    }

    try {
      const goalRef = doc(db, 'goals', goalId)
      await updateDoc(goalRef, {
        comments: arrayUnion(comment),
      })
      setGoals(
        goals.map((goal) =>
          goal.id === goalId
            ? { ...goal, comments: [...goal.comments, comment] }
            : goal
        )
      )
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white bg-opacity-10 p-4 rounded-lg shadow"
          >
            <div className="flex justify-between">
              <p className="font-bold">{goal.user}</p>
              <p className="text-gray-300">{goal.category}</p>
            </div>
            <p className="mt-2">{goal.content}</p>
            {goal.savingAmount && goal.savingCurrent && (
              <div className="flex justify-between text-gray-200">
                <p>Target: {goal.savingAmount}</p>
                <p>Current: {goal.savingCurrent}</p>
                <p>Remaining: {goal.savingAmount - goal.savingCurrent}</p>
                <div className="w-52 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (goal.savingCurrent / goal.savingAmount) * 100
                      }%`,
                    }}
                  >
                    {((goal.savingCurrent / goal.savingAmount) * 100).toFixed(
                      2
                    )}
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
              <button
                onClick={() => handleLike(goal.id)}
                className="flex items-center"
              >
                <span className="mr-1">{goal.likes}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </button>
              <span>{goal.comments.length} comments</span>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Comments:</h4>
              {goal.comments.map((comment, index) => (
                <div key={index} className="bg-gray-800 p-2 rounded mb-2">
                  <p className="text-sm">
                    <strong>{comment.user}:</strong> {comment.text}
                  </p>
                  <p className="text-xs text-gray-400">
                    {comment.timestamp.toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="flex mt-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow p-2 rounded-l bg-gray-700 text-white"
                />
                <button
                  onClick={() => handleAddComment(goal.id)}
                  className="bg-blue-500 text-white p-2 rounded-r"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
