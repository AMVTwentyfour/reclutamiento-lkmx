'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCategories } from '@/features/categories/services/categoryService'
import { createProduct } from '../services/productService'
import { Category } from '@/features/categories/types'
import { validateProductForm, hasValidationErrors, ValidationErrors, ProductFormData } from '../validations'

export default function ProductForm() {
  const [form, setForm] = useState<ProductFormData>({ name: '', price: 0, stock: 0, categoryId: 0 })
  const [categories, setCategories] = useState<Category[]>([])
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState({ name: false, price: false, stock: false, categoryId: false })
  const router = useRouter()

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const validateField = (field: keyof ProductFormData, value: any) => {
    const tempForm = { ...form, [field]: value };
    const validationErrors = validateProductForm(tempForm);
    
    setErrors(prev => {
      const newErrors = { ...prev };
      if (validationErrors[field]) {
        newErrors[field] = validationErrors[field];
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof ProductFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Marcar todos los campos como tocados
    setTouched({ name: true, price: true, stock: true, categoryId: true });
    
    // Validar todo el formulario
    const validationErrors = validateProductForm(form);
    setErrors(validationErrors);
    
    // Si hay errores, no enviar
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createProduct(form)
      router.push('/')
    } catch (error) {
      console.error('Error creating product:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsSubmitting(false);
    }
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
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white ${
                errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
              }`}
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              required
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.name}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                placeholder="0.00"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white ${
                  errors.price ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                }`}
                value={form.price || ''}
                onChange={(e) => handleInputChange('price', +e.target.value)}
                onBlur={() => handleBlur('price')}
                required
                min="0"
                step="0.01"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.price}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                placeholder="0"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white ${
                  errors.stock ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                }`}
                value={form.stock || ''}
                onChange={(e) => handleInputChange('stock', +e.target.value)}
                onBlur={() => handleBlur('stock')}
                required
                min="0"
              />
              {errors.stock && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.stock}
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Categoría</label>
            <select
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer ${
                errors.categoryId ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
              }`}
              value={form.categoryId}
              onChange={(e) => handleInputChange('categoryId', +e.target.value)}
              onBlur={() => handleBlur('categoryId')}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.categoryId}
              </p>
            )}
          </div>
          
          <button 
            type="submit"
            disabled={isSubmitting || hasValidationErrors(errors)}
            className={`w-full font-medium py-3 px-6 rounded-xl transition-all duration-200 transform focus:ring-4 focus:outline-none shadow-lg ${
              isSubmitting || hasValidationErrors(errors)
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-[1.02] focus:ring-blue-200 hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creando producto...
              </div>
            ) : (
              'Crear Producto'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
