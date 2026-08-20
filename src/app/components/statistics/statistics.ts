import { Component, inject, OnInit, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ServiceStats, Statisticsrest } from '../../res/statisticsrest';


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics implements OnInit {
  private readonly statisticsrs = inject(Statisticsrest);

  readonly stats = signal<ServiceStats | null>(null);

  // PrimeNG Chart Data & Options
  chartData: any;
  chartOptions: any;

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.statisticsrs.getStats();
      this.stats.set(data);
      this.initChart(data);
    } catch (err) {
      console.error('Failed to load chart data:', err);
    }
  }

  private initChart(data: ServiceStats): void {
    this.chartData = {
      labels: ['Total Requests', 'Unique Visitors'],
      datasets: [
        {
          data: [data.total_requests, data.unique_users_tracked],
          backgroundColor: ['#42A5F5', '#66BB6A'],
          hoverBackgroundColor: ['#64B5F6', '#81C784'],
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Ensures canvas resizes dynamically to fit container height
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }
}
