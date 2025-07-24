export interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  responseTime?: string;
  error?: string;
  database: {
    status: 'connected' | 'disconnected';
    stats: {
      products: number;
      categories: number;
    };
  };
  system: {
    nodeVersion: string;
    platform: string;
    uptime: string;
    memoryUsage: {
      used: string;
      total: string;
    };
    environment: string;
  };
  services: {
    api: 'operational' | 'degraded' | 'failed';
    database: 'operational' | 'degraded' | 'failed';
  };
}

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'failed';
  responseTime?: string;
  lastChecked: string;
}
