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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Nombre"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        className="w-full border p-2 rounded"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: +e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        className="w-full border p-2 rounded"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: +e.target.value })}
        required
      />
      <select
        className="w-full border p-2 rounded"
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: +e.target.value })}
        required
      >
        <option value="">Selecciona una categoría</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  )
}
