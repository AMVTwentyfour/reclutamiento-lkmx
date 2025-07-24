# 🐳 Docker Setup para Reclutamiento LKMX

Esta guía te ayudará a ejecutar la aplicación usando Docker y Docker Compose.

## 📋 Prerequisitos

- Docker Desktop instalado y ejecutándose
- Docker Compose v2.0+

## 🚀 Inicio Rápido

### 1. Clonar el repositorio (si no lo has hecho)
```bash
git clone <repository-url>
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

## 🐛 Troubleshooting

### La aplicación no se conecta a la base de datos
```bash
# Verificar que la base de datos esté corriendo
docker-compose ps

# Verificar logs de la base de datos
docker-compose logs db

# Reiniciar servicios
docker-compose restart
```

### Error de migraciones
```bash
# Ejecutar migraciones manualmente
docker-compose run --rm app npx prisma migrate deploy

# Si hay problemas, resetear la base de datos
docker-compose down -v
docker-compose up --build
```

### Problemas de permisos
```bash
# En sistemas Linux/Mac, verificar permisos de Docker
sudo usermod -aG docker $USER
# Luego reiniciar la sesión
```

### Limpiar Docker (si hay problemas)
```bash
# Limpiar contenedores e imágenes no utilizadas
docker system prune -a

# Limpiar volúmenes no utilizados
docker volume prune
```

## 🔧 Configuración Avanzada

### Variables de Entorno Personalizadas
Edita el archivo `.env` para personalizar:
- `DATABASE_URL`: URL de conexión a la base de datos
- `NODE_ENV`: Entorno de ejecución
- `NEXT_TELEMETRY_DISABLED`: Deshabilitar telemetría de Next.js

### Puertos Personalizados
Para cambiar puertos, edita `docker-compose.yml`:
```yaml
services:
  app:
    ports:
      - "8080:3000"  # Cambiar 8080 por el puerto deseado
  db:
    ports:
      - "5433:5432"  # Cambiar 5433 por el puerto deseado
```

## 📊 Monitoreo

### Ver recursos utilizados
```bash
# Uso de recursos por contenedor
docker stats

# Inspeccionar un contenedor
docker inspect reclutamiento-lkmx-app
```

## 🔒 Seguridad en Producción

**⚠️ IMPORTANTE**: Para producción, cambiar:
1. Contraseñas por defecto en `docker-compose.yml`
2. Usar secrets de Docker para datos sensibles
3. Configurar redes más restrictivas
4. Usar imágenes específicas (no `latest`)

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs: `docker-compose logs`
2. Verifica el estado: `docker-compose ps`
3. Consulta la documentación de Docker
4. Contacta al equipo de desarrollo
