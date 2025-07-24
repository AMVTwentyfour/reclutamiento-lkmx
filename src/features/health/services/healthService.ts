import { HealthCheck } from '../types';

export async function getHealthStatus(): Promise<HealthCheck> {
  try {
    const response = await fetch('/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always get fresh data
    });

    if (!response.ok) {
      throw new Error(`Health check failed with status: ${response.status}`);
    }

    const healthData = await response.json();
    return healthData;
  } catch (error) {
    console.error('Error fetching health status:', error);
    throw error;
  }
}

export async function refreshHealthStatus(): Promise<HealthCheck> {
  return getHealthStatus();
}
