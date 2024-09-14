'use client'
import Link from 'next/link'
import { SetStateAction, useState } from 'react'

export default function Register() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleNameChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setName(e.target.value)
  }

  const handleUsernameChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para registrar al usuario
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
        style={{
          background: 'rgba( 255, 255, 255, 0.25 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 4px )',
          WebkitBackdropFilter: 'blur( 4px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
        }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              placeholder="Enter your password"
            />
          </div>
          <button className="text-white rounded-lg bg-white bg-opacity-20 p-2 hover:bg-white hover:bg-opacity-30 transition duration-300 ease-in-out cursor-pointer">
            <Link href="/home">Register</Link>
          </button>
        </form>
        <div>
          <p className="text-white mt-4">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-bold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
