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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear Categoría</h2>
          <p className="text-gray-600 text-sm">Agrega una nueva categoría al sistema</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nombre de la categoría</label>
            <input
              type="text"
              placeholder="Ingresa el nombre de la categoría"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-purple-200 focus:outline-none shadow-lg hover:shadow-xl"
          >
            Crear Categoría
          </button>
        </form>
      </div>
    </div>
  )
}
