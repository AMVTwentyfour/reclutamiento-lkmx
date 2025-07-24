# 🏢 LKMX - Sistema de Gestión de Inventarios

Sistema de gestión de inventarios desarrollado con **Next.js 15**, **TypeScript**, **Prisma**, **PostgreSQL** y **Tailwind CSS**. Una aplicación moderna y minimalista para la gestión eficiente de productos y categorías.

## 📋 Características

### ✨ **Funcionalidades Principales**
- 📦 **Gestión de Productos**: Crear, visualizar y gestionar productos con validaciones completas
- 📁 **Gestión de Categorías**: Organizar productos por categorías personalizadas
- 📊 **Analytics Dashboard**: Análisis detallado de inventario con métricas en tiempo real
- 🩺 **Health Monitoring**: Monitoreo del estado del sistema y base de datos
- 🎨 **Diseño Moderno**: Interfaz minimalista y responsiva con Tailwind CSS
- ✅ **Validaciones Robustas**: Validaciones client-side con feedback visual

### 🛠️ **Stack Tecnológico**
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Validaciones**: Zod + validaciones personalizadas
- **Containerización**: Docker & Docker Compose
- **Linting**: ESLint con configuración Next.js

## 🚀 Inicio Rápido

### 📋 **Prerequisitos**
- Node.js 18+ 
- npm o yarn
- PostgreSQL (local) o Docker

### 🔧 **Instalación Local**

#### 1. Clonar el repositorio
```bash
git clone https://github.com/AMVTwentyfour/reclutamiento-lkmx.git
cd reclutamiento-lkmx
```

#### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

#### 3. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tu configuración de base de datos
nano .env
```

Ejemplo de `.env`:
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/reclutamiento_lkmx"
NODE_ENV="development"
```

#### 4. Configurar base de datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# (Opcional) Poblar con datos de ejemplo
npx prisma db seed
```

#### 5. Ejecutar en desarrollo
```bash
npm run dev
# o
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🐳 **Ejecución con Docker**

### **Opción 1: Docker Compose (Recomendado)**
```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# O ejecutar en background
docker-compose up -d --build
```

### **Opción 2: Solo la aplicación**
```bash
# Construir imagen
docker build -t reclutamiento-lkmx .

# Ejecutar contenedor
docker run -p 3000:3000 -e DATABASE_URL="tu_database_url" reclutamiento-lkmx
```

### **Servicios disponibles:**
- **Aplicación**: http://localhost:3000
- **Base de datos**: localhost:5432
- **Credenciales DB**: postgres/password

Para más detalles sobre Docker, consulta: [README-Docker.md](./README-Docker.md)

## 📁 **Estructura del Proyecto**

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── analytics/     # Endpoints de analytics
│   │   ├── categories/    # CRUD de categorías
│   │   ├── health/        # Health check
│   │   └── products/      # CRUD de productos
│   ├── analytics/         # Página de analytics
│   ├── categories/        # Página de categorías
│   ├── health/           # Página de monitoreo
│   └── products/         # Página de productos
├── features/             # Módulos por funcionalidad
│   ├── analytics/        # Lógica de analytics
│   ├── categories/       # Lógica de categorías
│   ├── health/          # Lógica de health check
│   └── products/        # Lógica de productos
├── shared/              # Código compartido
│   ├── database/        # Configuración de Prisma
│   ├── middleware/      # Middlewares
│   ├── types/          # Tipos compartidos
│   ├── utils/          # Utilidades
│   └── validations/    # Validaciones compartidas
└── generated/          # Cliente generado de Prisma

prisma/
├── schema.prisma       # Esquema de base de datos
└── migrations/        # Migraciones de DB
```

## 🎯 **Características Destacadas**

### **🔒 Validaciones Avanzadas**
- Validación en tiempo real con feedback visual
- Prevención de envío con errores
- Mensajes de error descriptivos y localizados

### **📊 Analytics Completos**
- Estadísticas de inventario en tiempo real
- Análisis por categorías
- Métricas de stock y precios
- Top productos por stock

### **🩺 Health Monitoring**
- Estado del sistema en tiempo real
- Monitoreo de base de datos
- Métricas de rendimiento
- Auto-refresh configurable

### **🎨 Diseño Responsivo**
- Interfaz minimalista y moderna
- Componentes reutilizables
- Paleta de colores consistente
- Efectos de hover y transiciones suaves

## 🛠️ **Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint

# Base de datos
npx prisma generate  # Generar cliente
npx prisma migrate   # Ejecutar migraciones
npx prisma studio    # Interfaz visual de DB
npx prisma db seed   # Poblar con datos
```

## 🌐 **Páginas y Funcionalidades**

| Ruta | Descripción | Funcionalidades |
|------|------------|----------------|
| `/` | Dashboard principal | Vista de productos, navegación |
| `/products` | Gestión de productos | Crear productos con validaciones |
| `/categories` | Gestión de categorías | Crear categorías con validaciones |
| `/analytics` | Panel de analytics | Estadísticas e insights del inventario |
| `/health` | Monitoreo del sistema | Estado de servicios y métricas |

## 🔗 **APIs Disponibles**

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/products` | GET, POST | CRUD de productos |
| `/api/categories` | GET, POST | CRUD de categorías |
| `/api/analytics` | GET | Estadísticas del inventario |
| `/api/health` | GET | Estado del sistema |

## 🧪 **Testing y Desarrollo**

### **Linting**
```bash
npm run lint        # Ejecutar ESLint
npm run lint:fix    # Corregir automáticamente
```

### **Base de Datos**
```bash
# Visualizar datos
npx prisma studio

# Reset de base de datos
npx prisma migrate reset

# Verificar estado
npx prisma migrate status
```

## 🚀 **Deployment**

### **Variables de Entorno de Producción**
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
NEXT_TELEMETRY_DISABLED=1
```

### **Plataformas Soportadas**
- ✅ **Google Cloud Platform** - Ver [docs/gcp-deployment.md](./docs/gcp-deployment.md)
- ✅ **Vercel** - Deployment automático
- ✅ **Docker** - Cualquier plataforma con soporte Docker
- ✅ **Railway** - Deployment simplificado
- ✅ **AWS** - EC2, ECS, Lambda

## 📚 **Documentación Adicional**

- 📖 [Configuración de Docker](./docs/Docker.md)
- ☁️ [Deployment en GCP](./docs/gcp-deployment.md)
- 🗄️ [Esquema de Base de Datos](./prisma/schema.prisma)


## 👥 **Autor**

**Abraham Valenzuela** - [GitHub](https://github.com/AMVTwentyfour)

---
