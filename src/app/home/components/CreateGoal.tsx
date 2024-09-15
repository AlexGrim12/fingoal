'use client'
import React, { useState } from 'react'
import { db, storage } from '../../../firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import CapitalOneAd from './CapitalOne'

// Remove the unused Goal interface
// export default function CreateGoal() {
export default function CreateGoal() {
  const [goal, setGoal] = useState('')
  const [loading] = useState(false)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('saving') // Initialize category
  const [showSavingForm, setShowSavingForm] = useState(true) // Track saving form display
  const [showEntrepreneurshipForm, setShowEntrepreneurshipForm] =
    useState(false) // Track entrepreneurship form display
  const [showOwnershipForm, setShowOwnershipForm] = useState(false) // Track ownership form display
  const [savingAmount, setSavingAmount] = useState(0) // Amount for saving goal
  const [savingCurrent, setSavingCurrent] = useState(0) // Current amount for saving goal
  const [image, setImage] = useState<string | null>(null)

  // const [q1, setQ1] = useState('')
  // const [q2, setQ2] = useState('')
  // const [q3, setQ3] = useState('')
  // const [q4, setQ4] = useState('')
  // const [q5, setQ5] = useState('')

  const auth = getAuth()
  const user = auth.currentUser
  const userEmail = user ? user.email : 'unknown' // Get the current user's email

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      console.error('User not authenticated')
      return
    }

    const goalsCollectionRef = collection(db, 'goals')
    const newGoalData = {
      goal: goal,
      description: description,
      category: category,
      savingAmount: savingAmount,
      savingCurrent: savingCurrent,
      userEmail: userEmail,
      likes: 0,
      comments: [],
      image: '',
    }

    if (image) {
      newGoalData.image = image
    }

    try {
      const newGoalDoc = await addDoc(goalsCollectionRef, newGoalData)
      console.log('Goal added with ID:', newGoalDoc.id)
      // Reset form fields
      setGoal('')
      setCategory('saving')
      setShowSavingForm(true)
      setShowEntrepreneurshipForm(false)
      setShowOwnershipForm(false)
      setSavingAmount(0)
      setSavingCurrent(0)
      setImage(null)
    } catch (error) {
      console.error('Error saving goal to Firestore:', error)
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    switch (newCategory) {
      case 'saving':
        setShowSavingForm(true)
        setShowEntrepreneurshipForm(false)
        setShowOwnershipForm(false)
        break
      case 'entrepreneurship':
        setShowSavingForm(false)
        setShowEntrepreneurshipForm(true)
        setShowOwnershipForm(false)
        break
      case 'Ownership':
        setShowSavingForm(false)
        setShowEntrepreneurshipForm(false)
        setShowOwnershipForm(true)
        break
      default:
        setShowSavingForm(true)
        setShowEntrepreneurshipForm(false)
        setShowOwnershipForm(false)
        break
    }
  }

  // Function to handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (file) {
      try {
        const storageRef = ref(storage, `images/${uuidv4()}`) // Generate a unique name for the image
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state changes, including progress, etc.
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Error uploading file:', error)
            // ... display an error message to the user
          },
          () => {
            // Handle successful uploads
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImage(downloadURL)
              console.log('File available at', downloadURL)
            })
          }
        )
      } catch (error) {
        console.error('Error uploading image:', error)
        // ... display an error message to the user
        // auth/operation-not-allowed: The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.
        // auth/operation-not-allowed: This operation is not allowed. You must enable this service in the console.
      }
    }
  }

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow mb-6">
      {/* categoria de la meta: saving, entrepreneurship, Ownership path */}
      <h2 className="text-lg font-semibold text-white">New Goal</h2>
      <p className="text-white text-opacity-80 mb-2">
        Choose a category for your goal
      </p>
      {/* botonoes para elegir entre saving, entrepreneurship, Ownership path */}
      <div className="flex space-x-2 mb-2">
        <button
          className={`px-2 py-1 bg-green-500 text-white rounded ${
            category === 'saving' ? 'bg-green-500' : ''
          }`}
          onClick={() => handleCategoryChange('saving')}
        >
          Saving
        </button>
        <button
          className={`px-2 py-1 bg-amber-500 text-white rounded ${
            category === 'entrepreneurship' ? 'bg-amber-500' : ''
          }`}
          onClick={() => handleCategoryChange('entrepreneurship')}
        >
          Entrepreneurship
        </button>
        <button
          className={`px-2 py-1 bg-orange-500 text-white rounded ${
            category === 'Ownership' ? 'bg-orange-500' : ''
          }`}
          onClick={() => handleCategoryChange('Ownership')}
        >
          Ownership
        </button>
      </div>
      <hr className="border-b border-white border-opacity-20 mb-2" />

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded bg-zinc-900 text-white border-none focus:outline-none"
          rows={3}
          placeholder="What's your goal?"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        {showSavingForm && (
          <div className="flex flex-row">
            <input
              type="number"
              className="w-full p-2 border rounded bg-zinc-900 text-white border-none focus:outline-none mr-2"
              placeholder="Saving amount: "
              value={savingAmount}
              onChange={(e) => setSavingAmount(parseInt(e.target.value))}
            />
            <input
              type="number"
              className="w-full p-2 border rounded bg-zinc-900 text-white border-none focus:outline-none"
              placeholder="Saving current: "
              value={savingCurrent}
              onChange={(e) => setSavingCurrent(parseInt(e.target.value))}
            />
          </div>
        )}
        {showEntrepreneurshipForm && (
          <div>
            {/* What is your business name?
  What is your buisiness idea? (Describe in a few sentences)
  What problem does your business solve?
  How do you plan to make money? (selling products, subscription, advertising)
  What is your main target audience? (age group, interests, location) */}
            <textarea
              className="w-full p-2 border rounded bg-zinc-900 text-white border-none focus:outline-none"
              rows={3}
              placeholder="Entrepreneurship description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <CapitalOneAd />
          </div>
        )}
        {showOwnershipForm && (
          <div>
            <textarea
              className="w-full p-2 border rounded bg-zinc-900 text-white border-none focus:outline-none"
              rows={3}
              placeholder="Ownership path description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <CapitalOneAd />
          </div>
        )}
        {/* Image upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          type="submit"
          className="w-full text-white rounded-lg bg-white bg-opacity-20 p-2 hover:bg-white hover:bg-opacity-30 transition duration-300 ease-in-out cursor-pointer mt-2"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Create Goal'}
        </button>
      </form>
    </div>
  )
}
