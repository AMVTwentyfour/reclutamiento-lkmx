import ProductList from '@/features/products/components/ProductList'

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">📦 Productos</h1>
      <a href="/products" className="text-blue-500 underline block mb-2">➕ Crear producto</a>
      <a href="/categories" className="text-blue-500 underline block mb-6">📁 Crear categoría</a>
      <ProductList />
    </main>
  )
}
