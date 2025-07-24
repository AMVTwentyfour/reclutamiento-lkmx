# ☁️ Deployment en Google Cloud Platform (GCP) - Cloud Run

## ⚠️ Nota Importante sobre Facturación

**No pude realizar el despliegue debido a que mi cuenta de GCP se encuentra suspendida por problemas de facturación.**
## 📋 Tabla de Contenidos

1. [Prerequisitos](#-prerequisitos)
2. [Cloud Run Deployment](#-cloud-run-deployment)
3. [Base de Datos con Cloud SQL](#-base-de-datos-con-cloud-sql)

### **Herramientas Necesarias**
- [Google Cloud SDK (gcloud CLI)](https://cloud.google.com/sdk/docs/install)
- [Docker](https://docs.docker.com/get-docker/)
- Cuenta de Google con facturación habilitada

### **Configuración Inicial** (Solo si tienes facturación)
```bash
# 1. Instalar Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# 2. Inicializar gcloud
gcloud init

# 3. Autenticarse
gcloud auth login
gcloud auth configure-docker

# 4. Crear proyecto
gcloud projects create lkmx-reclutamiento --name="LKMX Reclutamiento"
gcloud config set project lkmx-reclutamiento

# 5. Habilitar APIs necesarias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
```

## 🚀 Cloud Run Deployment

### **Paso 1: Configuración Inicial**
```bash
# 1. Instalar Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# 2. Inicializar gcloud
gcloud init

# 3. Autenticarse
gcloud auth login
gcloud auth configure-docker

# 4. Crear proyecto
gcloud projects create lkmx-reclutamiento --name="LKMX Reclutamiento"
gcloud config set project lkmx-reclutamiento

# 5. Habilitar APIs necesarias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
```

### **Paso 2: Preparar la Aplicación**

#### Crear `cloudbuild.yaml`
```yaml
# cloudbuild.yaml
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/lkmx-app:$COMMIT_SHA', '.']
  
  # Push the container image to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/lkmx-app:$COMMIT_SHA']
  
  # Deploy container image to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
    - 'run'
    - 'deploy'
    - 'lkmx-app'
    - '--image'
    - 'gcr.io/$PROJECT_ID/lkmx-app:$COMMIT_SHA'
    - '--region'
    - 'us-central1'
    - '--platform'
    - 'managed'
    - '--allow-unauthenticated'

images:
- 'gcr.io/$PROJECT_ID/lkmx-app:$COMMIT_SHA'
```

### **Paso 3: Deploy Manual**
```bash
# 1. Build y push de la imagen
docker build -t gcr.io/lkmx-reclutamiento/lkmx-app .
docker push gcr.io/lkmx-reclutamiento/lkmx-app

# 2. Deploy a Cloud Run
gcloud run deploy lkmx-app \
    --image gcr.io/lkmx-reclutamiento/lkmx-app \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars DATABASE_URL="postgresql://app_user:password@/reclutamiento_lkmx?host=/cloudsql/lkmx-reclutamiento:us-central1:lkmx-postgres" \
    --add-cloudsql-instances lkmx-reclutamiento:us-central1:lkmx-postgres \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10
```

## 🗄️ Base de Datos con Cloud SQL

### **Crear instancia PostgreSQL**
```bash
# Crear instancia PostgreSQL
gcloud sql instances create lkmx-postgres \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=us-central1 \
    --root-password=TU_PASSWORD_SEGURA

# Crear base de datos
gcloud sql databases create reclutamiento_lkmx \
    --instance=lkmx-postgres

# Crear usuario de aplicación
gcloud sql users create app_user \
    --instance=lkmx-postgres \
    --password=APP_PASSWORD_SEGURA
```

### **Configurar variables de entorno**
```bash
# Actualizar servicio con variables de entorno
gcloud run services update lkmx-app \
    --region us-central1 \
    --set-env-vars NODE_ENV=production \
    --set-env-vars NEXT_TELEMETRY_DISABLED=1 \
    --set-env-vars DATABASE_URL="postgresql://app_user:password@/reclutamiento_lkmx?host=/cloudsql/lkmx-reclutamiento:us-central1:lkmx-postgres"
```

---
