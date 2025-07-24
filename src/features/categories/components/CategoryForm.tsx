'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCategory } from '../services/categoryService'

export default function CategoryForm() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createCategory({ name })
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Catefory Name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  )
}
