import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Import ng-Bootstrap Module */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*Import the HttpClientModule to work with HttpClient service */
/* Import HTTPClient Module for Restful API*/
import { HttpClientModule } from '@angular/common/http';

/*Import Components */
import { DataCardComponent } from './components/data-card/data-card.component';
import { DataTableControlComponent } from './components/data-table-control/data-table-control.component';
import { CumulativeChartComponent } from './components/cumulative-chart/cumulative-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

/*Impost DataService */
import { DataService } from './services/data.service';

/* Import ng2-charts */
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DataCardComponent,
    DataTableControlComponent,
    CumulativeChartComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
