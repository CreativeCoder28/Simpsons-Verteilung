export class SimpsonsData {
  userData: UserEntredData;
  calculatedData: DistributionData;
}

export class DistributionData {
  time: number;
  probability: number;
  percentile: number;
}

export class UserEntredData {
  bestCaseValue: number;
  estimatedValue: number;
  uncertainityFactor: number;
  worstCaseValue: number;
  probability: number;
  percentileLastValue: number;

  /* get worstCaseValue(): number {
    return this.estimatedValue * this.uncertainityFactor;
  }*/

  get simpson_varianz(): number {
    return Math.pow(
      (Math.pow(this.bestCaseValue, 2) +
        Math.pow(this.estimatedValue, 2) +
        Math.pow(this.worstCaseValue, 2) -
        (this.bestCaseValue * this.estimatedValue +
          this.estimatedValue * this.worstCaseValue +
          this.worstCaseValue * this.bestCaseValue)) /
        18,
      0.5
    );
  }
}
