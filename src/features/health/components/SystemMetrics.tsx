'use client'

import { useEffect, useState } from 'react'
import { HealthCheck } from '../types'

interface SystemMetricsProps {
  healthData: HealthCheck | null
}

export default function SystemMetrics({ healthData }: SystemMetricsProps) {
  const [uptime, setUptime] = useState<string>('')

  useEffect(() => {
    if (!healthData) return

    // Update uptime every second
    const interval = setInterval(() => {
      if (healthData.system.uptime) {
        // Parse the uptime and add elapsed time
        const match = healthData.system.uptime.match(/(\d+) minutes/)
        if (match) {
          const baseMinutes = parseInt(match[1])
          const now = new Date()
          const healthTime = new Date(healthData.timestamp)
          const elapsedMinutes = Math.floor((now.getTime() - healthTime.getTime()) / 60000)
          const totalMinutes = baseMinutes + elapsedMinutes
          
          if (totalMinutes >= 60) {
            const hours = Math.floor(totalMinutes / 60)
            const minutes = totalMinutes % 60
            setUptime(`${hours}h ${minutes}m`)
          } else {
            setUptime(`${totalMinutes}m`)
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [healthData])

  if (!healthData) return null

  const getMemoryPercentage = () => {
    const usedMatch = healthData.system.memoryUsage.used.match(/(\d+)MB/)
    const totalMatch = healthData.system.memoryUsage.total.match(/(\d+)MB/)
    
    if (usedMatch && totalMatch) {
      const used = parseInt(usedMatch[1])
      const total = parseInt(totalMatch[1])
      return Math.round((used / total) * 100)
    }
    return 0
  }

  const memoryPercentage = getMemoryPercentage()

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Métricas en Tiempo Real</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Uptime */}
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div className="text-2xl mb-2">⏱️</div>
          <p className="text-sm font-medium text-gray-600 mb-1">Tiempo Activo</p>
          <p className="text-2xl font-bold text-blue-600">{uptime || healthData.system.uptime}</p>
        </div>

        {/* Memory Usage */}
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div className="text-2xl mb-2">💾</div>
          <p className="text-sm font-medium text-gray-600 mb-1">Uso de Memoria</p>
          <p className="text-2xl font-bold text-purple-600">{memoryPercentage}%</p>
          <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${memoryPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Database Records */}
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-sm font-medium text-gray-600 mb-1">Total Registros</p>
          <p className="text-2xl font-bold text-green-600">
            {healthData.database.stats.products + healthData.database.stats.categories}
          </p>
        </div>

        {/* Response Time */}
        <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
          <div className="text-2xl mb-2">⚡</div>
          <p className="text-sm font-medium text-gray-600 mb-1">Tiempo de Respuesta</p>
          <p className="text-2xl font-bold text-yellow-600">{healthData.responseTime || 'N/A'}</p>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Estado Actual</h4>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              healthData.status === 'healthy' ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            <span className="text-sm text-gray-600">Sistema</span>
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              healthData.database.status === 'connected' ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            <span className="text-sm text-gray-600">Base de Datos</span>
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              healthData.services.api === 'operational' ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            <span className="text-sm text-gray-600">API</span>
          </div>
        </div>
      </div>
    </div>
  )
}
