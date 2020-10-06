import { Component, OnInit } from '@angular/core';

/* Import service file*/
import { DataService } from '../../services/data.service';
import { DistributionData, SimpsonsData } from '../../models/distribution-data';

@Component({
  selector: 'app-data-table-control',
  templateUrl: './data-table-control.component.html',
  styleUrls: ['./data-table-control.component.css'],
})
export class DataTableControlComponent implements OnInit {
  // DataList: DistributionData[] = [];
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.dataService.GetEntry().subscribe((data) => {
      this.dataService.DataList = data as DistributionData[];
      //  this.dataService.userData.percentileLastValue = Number(this.dataService.DataList[data.length - 1].percentile);

      console.log(this.dataService.DataList.length);
    });
  }
}
