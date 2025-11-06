'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchFormProps {
  initialCity: string
}

export default function SearchForm({ initialCity }: SearchFormProps) {
  const [city, setCity] = useState(initialCity)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      router.push(`/?city=${encodeURIComponent(city.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-6 py-4 rounded-xl text-lg border-2 border-white/30 bg-white/90 backdrop-blur-sm focus:outline-none focus:border-white focus:ring-4 focus:ring-white/20 transition-all"
        />
        <button
          type="submit"
          className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
        >
          Search
        </button>
      </div>
    </form>
  )
}