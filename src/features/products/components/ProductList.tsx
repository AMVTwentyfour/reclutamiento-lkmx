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
        <div className="grid gap-4">
        {products.map((product) => (
            <div key={product.id} className="p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>💰 Price: ${product.price}</p>
            <p>📦 Stock: {product.stock}</p>
            <p>🏷️ Category: {product.category?.name}</p>
            </div>
        ))}
        </div>
    );
}