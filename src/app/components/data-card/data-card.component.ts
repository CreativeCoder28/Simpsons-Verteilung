import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  NgZone,
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  UserEntredData,
  DistributionData,
} from '../../models/distribution-data';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css'],
})
export class DataCardComponent implements OnInit {
  enteredValue: UserEntredData = new UserEntredData();
  @Output() enteredValueChanged = new EventEmitter<UserEntredData>();
  @ViewChild('myForm') myDatacardForm: NgForm;
  DataList: DistributionData[] = [];
  percentileData: any = [];
  index: number;
  @Output() outputSelectTab = new EventEmitter<number>();

  constructor(
    private readonly dataService: DataService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {}

  get userData(): UserEntredData {
    return this.dataService.userData;
  }

  ngOnInit(): void {
    console.log(this.dataService.newDistributionData);
  }
  buttonClick(): void {
    this.percentileData = this.dataService.userData.percentileLastValue;
    this.CalculateUserData();
    this.CalculateDistributionValues();

    this.dataService.PostuserEntry(this.enteredValue).subscribe((data) => {
      this.dataService.userData = data;
    });

    console.log(this.dataService.newDistributionData);

    this.dataService
      .AddEntry(this.dataService.newDistributionData)
      .subscribe((data) => {
        this.dataService.distributionData = data;
      });

    // this.resetValues();
  }

  CalculateUserData(): void {
    this.enteredValue.worstCaseValue =
      this.enteredValue.bestCaseValue * this.enteredValue.uncertainityFactor;
  }

  CalculateDistributionValues(): void {
    /*Calling Percentile Calculation function */
    this.CalculatePercentile();

    /*Calling Time Calculation function */
    this.Caculatetime(
      this.enteredValue.bestCaseValue,
      this.enteredValue.worstCaseValue
    );
    /*Calling Probability Calculation function */
    this.CalculateProbability(
      this.dataService.newDistributionData.time,
      this.enteredValue.bestCaseValue,
      this.enteredValue.estimatedValue,
      this.enteredValue.worstCaseValue
    );
  }

  /*Function to calculate the Percentile */
  CalculatePercentile(): void {
    this.dataService.newDistributionData.percentile =
      Number(
        this.dataService.DataList[this.dataService.DataList.length - 1]
          .percentile
      ) + 5;
    if (this.dataService.newDistributionData.percentile > 100) {
      this.dataService.newDistributionData.percentile = 100;
    }

    // this.dataService.userData.percentileLastValue = this.dataService.newDistributionData.percentile;
    console.log(this.dataService.newDistributionData.percentile);
  }

  /*Function to calculate the Time */
  Caculatetime(min, max): void {
    this.dataService.newDistributionData.time =
      min +
      ((max - min) * this.dataService.newDistributionData.percentile) / 100;
  }

  /*Function to calculate the Probability */
  CalculateProbability(time, min, peak, max): number {
    if (time > min && time < peak) {
      this.dataService.newDistributionData.probability =
        Math.pow(time - min, 2) / ((peak - min) * (max - min));
      // tslint:disable-next-line: triple-equals
    } else if (time == peak) {
      this.dataService.newDistributionData.probability =
        (peak - min) / (max - min);
    } else if (time > peak && time <= max) {
      this.dataService.newDistributionData.probability =
        1 - Math.pow(max - time, 2) / ((max - min) * (max - peak));
    } else if (time > max) {
      this.dataService.newDistributionData.probability = 1;
    }
    this.enteredValue.probability = this.dataService.newDistributionData.probability;
    return;
  }

  resetValues(): void {
    this.enteredValue.bestCaseValue = null;
    this.enteredValue.estimatedValue = null;
    this.enteredValue.uncertainityFactor = 0;
  }
}
