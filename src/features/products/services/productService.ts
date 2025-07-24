export async function getProduct() {
    try {
        const response = await fetch('/api/products');
        return response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function createProduct(data: any) {
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}