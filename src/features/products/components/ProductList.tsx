'use client';

import { useState, useEffect } from "react";
import { getProduct } from "../services/productService";
import { Product } from "../types";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProduct().then(setProducts)
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Productos</h1>
                    <p className="text-gray-600">Gestiona tu inventario de productos</p>
                </div>
                
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay productos</h3>
                        <p className="text-gray-500">Agrega tu primer producto para comenzar</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h2>
                                    <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                        {product.category?.name}
                                    </span>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <span className="text-sm font-medium text-gray-600">Precio</span>
                                        <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <span className="text-sm font-medium text-gray-600">Stock</span>
                                        <span className={`text-lg font-bold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {product.stock} unidades
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                        product.stock > 10 
                                            ? 'bg-green-100 text-green-800' 
                                            : product.stock > 0 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : 'bg-red-100 text-red-800'
                                    }`}>
                                        <div className={`w-2 h-2 rounded-full mr-2 ${
                                            product.stock > 10 
                                                ? 'bg-green-400' 
                                                : product.stock > 0 
                                                    ? 'bg-yellow-400' 
                                                    : 'bg-red-400'
                                        }`}></div>
                                        {product.stock > 10 ? 'En stock' : product.stock > 0 ? 'Stock bajo' : 'Agotado'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}