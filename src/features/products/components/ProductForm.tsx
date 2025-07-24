'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCategories } from '@/features/categories/services/categoryService'
import { createProduct } from '../services/productService'
import { Category } from '@/features/categories/types'

export default function ProductForm() {
  const [form, setForm] = useState({ name: '', price: 0, stock: 0, categoryId: 0 })
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createProduct(form)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear Producto</h2>
          <p className="text-gray-600 text-sm">Agrega un nuevo producto al inventario</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nombre del producto</label>
            <input
              type="text"
              placeholder="Ingresa el nombre del producto"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: +e.target.value })}
                required
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: +e.target.value })}
                required
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Categoría</label>
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: +e.target.value })}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 focus:outline-none shadow-lg hover:shadow-xl"
          >
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  )
}
