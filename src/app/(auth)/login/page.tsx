'use client'
import Link from 'next/link'
import { SetStateAction, useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para autenticar al usuario
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
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              placeholder="Enter your email"
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
          <Link href="/home">
            <button className="text-white rounded-lg bg-white bg-opacity-20 p-2 hover:bg-white hover:bg-opacity-30 transition duration-300 ease-in-out cursor-pointer">
              Login
            </button>
          </Link>
        </form>
        <div>
          <p className="text-white mt-4">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="font-bold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
