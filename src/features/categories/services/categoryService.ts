export async function getCategories() {
    try {
        const response = await fetch('/api/categories');
        return response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function createCategory(data: any) {
    try {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
}