export interface CategoryFormData {
  name: string;
}

export interface CategoryValidationErrors {
  name?: string;
}

export const validateCategoryForm = (data: CategoryFormData): CategoryValidationErrors => {
  const errors: CategoryValidationErrors = {};

  // Validación del nombre
  if (!data.name.trim()) {
    errors.name = 'El nombre de la categoría es requerido';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  } else if (data.name.trim().length > 50) {
    errors.name = 'El nombre no puede exceder 50 caracteres';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.name.trim())) {
    errors.name = 'El nombre solo puede contener letras y espacios';
  }

  return errors;
};

export const hasCategoryValidationErrors = (errors: CategoryValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined && error !== '');
};
