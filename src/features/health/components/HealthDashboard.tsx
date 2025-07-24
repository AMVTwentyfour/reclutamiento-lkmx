'use client'

import { useEffect, useState } from 'react'
import { getHealthStatus } from '../services/healthService'
import { HealthCheck } from '../types'
import SystemMetrics from './SystemMetrics'

export default function HealthDashboard() {
  const [healthData, setHealthData] = useState<HealthCheck | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchHealthData = async () => {
    try {
      setLoading(true)
      const data = await getHealthStatus()
      setHealthData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching health data:', error)
      // Set error state
      setHealthData({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Failed to fetch health data',
        database: { status: 'disconnected', stats: { products: 0, categories: 0 } },
        system: {
          nodeVersion: 'Unknown',
          platform: 'Unknown',
          uptime: 'Unknown',
          memoryUsage: { used: '0MB', total: '0MB' },
          environment: 'Unknown'
        },
        services: { api: 'failed', database: 'failed' }
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealthData()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(fetchHealthData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [autoRefresh])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'connected':
        return 'text-green-600 bg-green-100'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100'
      case 'unhealthy':
      case 'failed':
      case 'disconnected':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'connected':
        return '✅'
      case 'degraded':
        return '⚠️'
      case 'unhealthy':
      case 'failed':
      case 'disconnected':
        return '❌'
      default:
        return '❓'
    }
  }

  if (loading && !healthData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando estado del sistema...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">System Health</h1>
              <p className="text-gray-600">Monitoreo del estado del sistema en tiempo real</p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Auto-refresh</label>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoRefresh ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoRefresh ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={fetchHealthData}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <span className="mr-2">🔄</span>
                )}
                Actualizar
              </button>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Última actualización: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>

        {healthData && (
          <>
            {/* Overall Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Estado General</h2>
                  <p className="text-gray-600 text-sm">Estado actual del sistema</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(healthData.status)}`}>
                    <span className="mr-2">{getStatusIcon(healthData.status)}</span>
                    {healthData.status === 'healthy' ? 'Saludable' : 'Con problemas'}
                  </div>
                  {healthData.responseTime && (
                    <p className="text-sm text-gray-500 mt-1">Tiempo de respuesta: {healthData.responseTime}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Services Status */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Servicios</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">API</span>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData.services.api)}`}>
                      <span className="mr-2">{getStatusIcon(healthData.services.api)}</span>
                      {healthData.services.api === 'operational' ? 'Operacional' : 'Con problemas'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Base de Datos</span>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData.services.database)}`}>
                      <span className="mr-2">{getStatusIcon(healthData.services.database)}</span>
                      {healthData.services.database === 'operational' ? 'Operacional' : 'Con problemas'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Base de Datos</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Estado</span>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(healthData.database.status)}`}>
                      <span className="mr-2">{getStatusIcon(healthData.database.status)}</span>
                      {healthData.database.status === 'connected' ? 'Conectada' : 'Desconectada'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Productos</span>
                    <span className="text-lg font-bold text-blue-600">{healthData.database.stats.products}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Categorías</span>
                    <span className="text-lg font-bold text-purple-600">{healthData.database.stats.categories}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Metrics */}
            <div className="mb-6">
              <SystemMetrics healthData={healthData} />
            </div>

            {/* System Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Información del Sistema</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-1">Versión de Node.js</p>
                  <p className="text-lg font-bold text-gray-900">{healthData.system.nodeVersion}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-1">Plataforma</p>
                  <p className="text-lg font-bold text-gray-900">{healthData.system.platform}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-1">Tiempo activo</p>
                  <p className="text-lg font-bold text-gray-900">{healthData.system.uptime}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-1">Memoria usada</p>
                  <p className="text-lg font-bold text-gray-900">{healthData.system.memoryUsage.used}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-1">Memoria total</p>
                  <p className="text-lg font-bold text-gray-900">{healthData.system.memoryUsage.total}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-1">Entorno</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{healthData.system.environment}</p>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {healthData.error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-6">
                <h3 className="text-lg font-bold text-red-900 mb-2">Error</h3>
                <p className="text-red-700">{healthData.error}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
