'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCategory } from '../services/categoryService'
import { validateCategoryForm, hasCategoryValidationErrors, CategoryValidationErrors, CategoryFormData } from '../validations'

export default function CategoryForm() {
  const [form, setForm] = useState<CategoryFormData>({ name: '' })
  const [errors, setErrors] = useState<CategoryValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState({ name: false })
  const router = useRouter()

  const validateField = (field: keyof CategoryFormData, value: any) => {
    const tempForm = { ...form, [field]: value };
    const validationErrors = validateCategoryForm(tempForm);
    
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

  const handleInputChange = (field: keyof CategoryFormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof CategoryFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Marcar todos los campos como tocados
    setTouched({ name: true });
    
    // Validar todo el formulario
    const validationErrors = validateCategoryForm(form);
    setErrors(validationErrors);
    
    // Si hay errores, no enviar
    if (hasCategoryValidationErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createCategory(form)
      router.push('/')
    } catch (error) {
      console.error('Error creating category:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsSubmitting(false);
    }
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
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white ${
                errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
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
          
          <button 
            type="submit"
            disabled={isSubmitting || hasCategoryValidationErrors(errors)}
            className={`w-full font-medium py-3 px-6 rounded-xl transition-all duration-200 transform focus:ring-4 focus:outline-none shadow-lg ${
              isSubmitting || hasCategoryValidationErrors(errors)
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white hover:scale-[1.02] focus:ring-purple-200 hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creando categoría...
              </div>
            ) : (
              'Crear Categoría'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
