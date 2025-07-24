# 🐳 Docker Setup para Reclutamiento LKMX


### 1. Clonar el repositorio (si no lo has hecho)
```bash
git clone [https://github.com/amvtwentyfour/reclutamiento-lkmx](https://github.com/amvtwentyfour/reclutamiento-lkmx)
cd reclutamiento-lkmx
```

### 2. Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env si es necesario (opcional)
nano .env
```

### 3. Construir y ejecutar los servicios
```bash
# Construir y levantar todos los servicios
docker-compose up --build

# O ejecutar en background
docker-compose up -d --build
```

### 4. Acceder a la aplicación
- **Aplicación**: http://localhost:3000
- **Base de datos**: localhost:5432 (usuario: postgres, password: password)

## 🛠️ Comandos Útiles

### Gestión de servicios
```bash
# Ver estado de los servicios
docker-compose ps

# Ver logs
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs app
docker-compose logs db

# Parar servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v
```

### Comandos de base de datos
```bash
# Ejecutar migraciones manualmente
docker-compose run --rm app npx prisma migrate deploy

# Acceder a la consola de PostgreSQL
docker-compose exec db psql -U postgres -d reclutamiento_lkmx

# Hacer backup de la base de datos
docker-compose exec db pg_dump -U postgres reclutamiento_lkmx > backup.sql
```

### Desarrollo y debugging
```bash
# Ejecutar shell en el contenedor de la app
docker-compose exec app sh

# Reconstruir solo la aplicación
docker-compose build app

# Ver logs en tiempo real
docker-compose logs -f app
```

## 📁 Estructura de Servicios

### 🗄️ Base de Datos (db)
- **Imagen**: postgres:15-alpine
- **Puerto**: 5432
- **Base de datos**: reclutamiento_lkmx
- **Usuario**: postgres
- **Contraseña**: password
- **Volumen persistente**: postgres_data

### 🌐 Aplicación (app)
- **Puerto**: 3000
- **Dependencias**: db (con healthcheck)
- **Variables de entorno**: Ver .env.example
- **Volúmenes**: app_logs (opcional)

### 🔄 Migraciones (migrate)
- **Propósito**: Ejecutar migraciones de Prisma
- **Ejecución**: Una sola vez al inicio
- **Depende de**: db
