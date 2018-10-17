import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MatIconModule, MatInputModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),    
    FlexLayoutModule,
  ],
  declarations: [ DashboardComponent ]
})

export class DashboardModule {}
