export interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export interface ValidationErrors {
  name?: string;
  price?: string;
  stock?: string;
  categoryId?: string;
}

export const validateProductForm = (data: ProductFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validación del nombre
  if (!data.name.trim()) {
    errors.name = 'El nombre del producto es requerido';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  } else if (data.name.trim().length > 100) {
    errors.name = 'El nombre no puede exceder 100 caracteres';
  }

  // Validación del precio
  if (data.price <= 0) {
    errors.price = 'El precio debe ser mayor a 0';
  } else if (data.price > 999999.99) {
    errors.price = 'El precio no puede exceder $999,999.99';
  } else if (!/^\d+(\.\d{1,2})?$/.test(data.price.toString())) {
    errors.price = 'El precio debe tener máximo 2 decimales';
  }

  // Validación del stock
  if (data.stock < 0) {
    errors.stock = 'El stock no puede ser negativo';
  } else if (data.stock > 999999) {
    errors.stock = 'El stock no puede exceder 999,999 unidades';
  } else if (!Number.isInteger(data.stock)) {
    errors.stock = 'El stock debe ser un número entero';
  }

  // Validación de la categoría
  if (!data.categoryId || data.categoryId === 0) {
    errors.categoryId = 'Debe seleccionar una categoría';
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined && error !== '');
};
