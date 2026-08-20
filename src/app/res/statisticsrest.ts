import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface ServiceStats {
  total_requests: number;
  unique_users_tracked: number;
}

@Injectable({
  providedIn: 'root',
})
export class Statisticsrest {
  private readonly http = inject(HttpClient);

  async getStats(): Promise<ServiceStats> {
    try {
      const response = await fetch(`${environment.apiFastApiUrl}/stats`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ServiceStats = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch service stats:', error);
      // Return fallback matching your endpoint's failure behavior
      return { total_requests: 0, unique_users_tracked: 0 };
    }
  }
}
