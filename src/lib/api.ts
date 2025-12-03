import type { APODData } from '@/types/apod';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export async function fetchAPOD(date?: string): Promise<APODData> {
  const url = new URL(BASE_URL);
  url.searchParams.append('api_key', API_KEY);
  
  if (date) {
    url.searchParams.append('date', date);
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('APOD not available for this date. It may not be published yet.');
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.msg || `Failed to fetch APOD: ${response.statusText}`);
  }

  return response.json();
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getTodayDate(): string {
  return formatDate(new Date());
}

export function getYesterdayDate(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return formatDate(yesterday);
}

