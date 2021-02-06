import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetRoutingModule } from './asset-routing.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { AssetsService } from './assets.service';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { AddEditAssetComponent } from './add-edit-asset/add-edit-asset.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [

  DataGridComponent,

  AddEditAssetComponent],
  providers: [
    AssetsService
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AssetRoutingModule,
    MatTableModule,
    MatSliderModule,
    FormsModule,
    MatCheckboxModule,
    CommonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [ MatFormFieldModule, MatInputModule ]
})
export class AssetModule {}
