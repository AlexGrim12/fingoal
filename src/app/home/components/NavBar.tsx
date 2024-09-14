import React from 'react'
import Link from 'next/link'
import { Home, Search, User, Settings } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="flex flex-col p-4">
      <Link
        href="/home"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <Home className="mr-2" />
        <span>Feed</span>
      </Link>
      <Link
        href="/search"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <Search className="mr-2" />
        <span>Buscar</span>
      </Link>
      <Link
        href="/profile"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <User className="mr-2" />
        <span>Mi Perfil</span>
      </Link>

      <Link
        href="/settings"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <Settings className="mr-2" />
        <span>Configuración</span>
      </Link>
    </nav>
  )
}
