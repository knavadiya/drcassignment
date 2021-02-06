import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditAssetComponent } from './add-edit-asset/add-edit-asset.component';
import { AssetComponent } from './asset.component';
import { DataGridComponent } from './data-grid/data-grid.component';


const routes: Routes = [
  {
    path: '',
    component: AssetComponent,
    children: [
      { path: '', component: DataGridComponent },
      { path: 'add', component: AddEditAssetComponent },
      { path: ':id/edit', component: AddEditAssetComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule {}
