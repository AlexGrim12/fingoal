import Link from 'next/link'
import React from 'react'

export default function HeaderLogout() {
  return (
    <header className=" flex items-center justify-between p-4 bg-white bg-opacity-15 rounded-md m-3">
      <h1 className="text-xl font-extrabold text-white tracking-tight md:text-4xl">
        FinGoal
      </h1>
      <div>
        <button className="text-white font-bold text-l bg-opacity-0 mr-2 bg-white p-2 rounded-lg border-2 border-white border-opacity-20 hover:bg-opacity-30 transition duration-300">
          <Link href="/register">Registrarse</Link>
        </button>
        <button className="text-white font-bold text-l bg-opacity-20 bg-white p-2 rounded-lg border-2 border-white border-opacity-5 hover:bg-opacity-30  transition duration-300">
          <Link href="/login">Iniciar Sesión</Link>
        </button>
      </div>
    </header>
  )
}
