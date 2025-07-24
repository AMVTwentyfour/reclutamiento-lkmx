import { Analytics } from '../types';

export async function getAnalytics(): Promise<Analytics> {
  try {
    const response = await fetch('/api/analytics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always get fresh data
    });

    if (!response.ok) {
      throw new Error(`Analytics fetch failed with status: ${response.status}`);
    }

    const analyticsData = await response.json();
    return analyticsData;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}

export async function refreshAnalytics(): Promise<Analytics> {
  return getAnalytics();
}
