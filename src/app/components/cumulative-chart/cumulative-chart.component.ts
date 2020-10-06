import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import {
  UserEntredData,
  DistributionData,
  SimpsonsData,
} from '../../models/distribution-data';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cumulative-chart',
  templateUrl: './cumulative-chart.component.html',
  styleUrls: ['./cumulative-chart.component.css'],
})
export class CumulativeChartComponent implements OnInit {
  constructor(private readonly dataService: DataService) {}
  DataList: DistributionData[] = [];
  timeData: any = [];
  probabilityData: any = [];
  percentileData: any = [];
  get userData(): UserEntredData {
    return this.dataService.userData;
  }
  // Array of different segments in chart
  lineChartData: ChartDataSets[] = [
    /* {
      data: this.percentileData,
      showLine: false,
      label: '',
    },*/
    {
      data: this.probabilityData,
    },
  ];

  // Labels shown on the x-axis

  lineChartLabels: Label[] = this.timeData;

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true,
    elements: { line: { tension: 0.4 } },
    scales: {
      yAxes: [
        {
          ticks: { min: 0, max: 100, beginAtZero: true },
          scaleLabel: {
            display: true,
            labelString: 'Wahrscheinlichkeit',
          },
        },
      ],

      xAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            max: 800,
            // setting ticks interval
            autoSkip: true,
            autoSkipPadding: 100,
            maxRotation: 0,
            stepSize: 100,
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Zeitreihe',
          },

          // stacked: true,
          gridLines: {
            drawTicks: false,
            offsetGridLines: false,
          },
        },
      ],
    },
    tooltips: {
      position: 'nearest',
      mode: 'index',
      intersect: false,
      yPadding: 10,
      xPadding: 10,
      caretSize: 5,
      backgroundColor: 'White',
      titleFontColor: 'rgba(54, 162, 235, 1)',
      bodyFontColor: 'black',
      borderColor: 'rgba(54, 162, 235, 1)',
      displayColors: false,
      borderWidth: 1,
      callbacks: {
        title: function (tooltipItem, data) {
          return 'Verteilungswert';
        },
        label: function (tooltipItems, data) {
          return [
            'Zeitreihe : ' + tooltipItems.xLabel,
            'Wahrscheinlichkeit : ' + tooltipItems.yLabel,
            //  'Percentile ;' + this.percentile[tooltipItems.index],
          ];
        },
      },
    },
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [
    {
      // light blue
      backgroundColor: 'rgba(54, 162, 235, 0.15)',
      borderColor: 'rgba(54, 162, 235, 1)',
    },
  ];

  // Set true to show legends
  lineChartLegend = false;

  // Define type of chart
  lineChartType = 'line';

  lineChartPlugins = [];

  // events
  chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    this.reloadData();
  }

  public reloadData(): void {
    /* this.dataService.GetEntry().subscribe((data) => {
      this.DataList = data;*/
    for (let i = 0; i < this.dataService.DataList.length; i++) {
      this.probabilityData.push(this.dataService.DataList[i].probability * 100);
      this.timeData.push(this.dataService.DataList[i].time);
      this.percentileData.push(this.dataService.DataList[i].percentile);
    }
    console.log(this.probabilityData);
    // });
  }
}
