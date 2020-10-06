import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as Chart from 'chart.js';
import {
  UserEntredData,
  DistributionData,
} from '../../models/distribution-data';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  //  enteredValue: UserEntredData = this.dataService.userData;
  DataList: DistributionData[] = [];
  timeData: any = [];
  probabilityData: any = [];
  percentileData: any = [];
  labelData: any = [];
  constructor(private readonly dataService: DataService) {}

  // Return with commas in between
  /* numberWithCommas(x): void {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }*/

  get userData(): UserEntredData {
    return this.dataService.userData;
  }
  // Array of different segments in chart
  lineChartData: ChartDataSets[] = [
    {
      data: [
        {
          x: this.dataService.userData.bestCaseValue,
          y: 0,
        },
        {
          x: this.dataService.userData.estimatedValue,
          y: this.dataService.userData.probability,
        },
        {
          x: this.dataService.userData.worstCaseValue,
          y: 0,
        },
      ],
    },
  ];

  // Labels shown on the x-axis

  lineChartLabels: Label[] = [
    'Im besten Fall',
    'Geschätzter Zeitbedarf',
    'Im schlimmsten Fall',
  ]; /*this.labelData;*/

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true,

    elements: { line: { tension: 0 } },
    scales: {
      yAxes: [
        {
          ticks: { min: 0, max: 1.0, beginAtZero: true },
          scaleLabel: {
            display: true,
            labelString: 'Wahrscheinlichkeit',
          },
        },
      ],

      xAxes: [
        {
          //   labels: ['0', '50', '100', '150', '200', '250', '300', '350', '400'],
          ticks: { min: 0, max: 400, beginAtZero: true },
          scaleLabel: {
            display: true,
            labelString: 'Zeitbedarf ',
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
          console.log(tooltipItems);
          return '(' + tooltipItems.xLabel + ',' + tooltipItems.yLabel + ')';
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

  ngOnInit(): void {
    this.dataService.GetuserEntry().subscribe((data) => {
      this.dataService.userData = data;
      console.log(this.dataService.userData);
    });
    this.labelData = [
      this.dataService.userData.bestCaseValue,
      this.dataService.userData.estimatedValue,
      this.dataService.userData.worstCaseValue,
    ];
  }

  public reloadData(): void {
    this.dataService.GetuserEntry().subscribe((data) => {
      this.dataService.userData = data;
    });
  }
}
