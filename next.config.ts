import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilitar output standalone para Docker
  output: 'standalone',
  
  // Configuración para trabajar con Docker
  typescript: {
    // !! WARN !!
    // Peligrosamente permite builds de producción completarse exitosamente
    // incluso si tu proyecto tiene errores de tipo.
    ignoreBuildErrors: false,
  },
  
  // Configuración de imágenes (si usas next/image)
  images: {
    domains: [],
  },
  
  // Variables de entorno públicas
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
