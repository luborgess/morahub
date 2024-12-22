import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            MoraHub
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}