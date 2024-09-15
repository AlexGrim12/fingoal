import React from 'react'
import Link from 'next/link'
import {
  Home,
  Search,
  User,
  Settings,
  NewspaperIcon,
  PlusCircle,
} from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="flex flex-col p-4 h-screen">
      <Link
        href="/home"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <Home className="mr-2" />
        <span>Feed</span>
      </Link>
      <Link
        href="/entrepreneurship"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <PlusCircle className="mr-2" />
        <span>Entrepreneurship</span>
      </Link>

      <Link
        href="/search"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <Search className="mr-2" />
        <span>Search</span>
      </Link>
      <Link
        href="/profile"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <User className="mr-2" />
        <span>Profile</span>
      </Link>
      <a
        href="https://news-asterion-connect.vercel.app/"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <NewspaperIcon className="mr-2" />
        <span>News</span>
      </a>

      <Link
        href="/settings"
        className="flex items-center p-2 hover:bg-indigo-600 hover:bg-opacity-5 rounded"
      >
        <Settings className="mr-2" />
        <span>Settings</span>
      </Link>
    </nav>
  )
}
