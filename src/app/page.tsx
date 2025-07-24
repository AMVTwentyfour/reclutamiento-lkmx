import ProductList from '@/features/products/components/ProductList'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Gestiona tu inventario y categorías</p>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
              <a 
                href="/products" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 focus:outline-none shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">➕</span>
                Crear Producto
              </a>
              <a 
                href="/categories" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-purple-200 focus:outline-none shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">📁</span>
                Crear Categoría
              </a>
              <a 
                href="/analytics" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">📊</span>
                Analytics
              </a>
              <a 
                href="/health" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-green-200 focus:outline-none shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🩺</span>
                Health
              </a>
            </div>
          </div>
        </div>
      </div>
      <ProductList />
    </main>
  )
}
