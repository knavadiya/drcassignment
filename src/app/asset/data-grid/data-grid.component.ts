import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssetsService } from '../assets.service';
import { Asset } from '../asset.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription;
  dataSource: MatTableDataSource<Asset>;
  displayedColumns: string[] = ['id', 'Model', 'RAM', 'HDD', 'Location', 'Price', 'Action'];
  selectedHDD;
  selectedLocation;
  allAssets = [];

  // variable for slider
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 7200;
  min = 0;
  showTicks = false;
  step = 250;
  thumbLabel = false;
  value = 250;
  vertical = false;
  tickInterval = 250;

  ramFilterOptions = [
    {
      type: '2GB',
      isSelected: false
    },
    {
      type: '4GB',
      isSelected: false
    },
    {
      type: '8GB',
      isSelected: false
    },
    {
      type: '12GB',
      isSelected: false
    },
    {
      type: '16GB',
      isSelected: false
    },
    {
      type: '24GB',
      isSelected: false
    },
    {
      type: '32GB',
      isSelected: false
    },
    {
      type: '48GB',
      isSelected: false
    },
    {
      type: '64GB',
      isSelected: false
    },
    {
      type: '96GB',
      isSelected: false
    }
  ];

  hddOptions = [
    {value: 'SAS', viewValue: 'SAS'},
    {value: 'SATA', viewValue: 'SATA'},
    {value: 'SSD', viewValue: 'SSD'}
  ];

  // hddOptions = [
  //   {value: '2x120GBSSD', viewValue: '2x120GB SSD'},
  //   {value: '8x2TBSATA2', viewValue: '8x2TB SATA2'},
  //   {value: '2x1TBSATA2', viewValue: '2x1TB SATA2'},
  //   {value: '2x2TBSATA2', viewValue: '2x2TB SATA2'},
  //   {value: '4x1TBSATA2', viewValue: '4x1TB SATA2'}
  // ];

  locationOptions = [];

  constructor( 
    private _assetsService: AssetsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.allAssets = this._assetsService.getAssets();
    this.dataSource = new MatTableDataSource(this.allAssets);
    this.subscription = this._assetsService.assetsChanged
    .subscribe(
      (assets: Asset[]) => {
        this.dataSource = new MatTableDataSource(assets);
        this.dataSource.paginator = this.paginator;
      }
    );

    // get Uniq Locations
    this.locationOptions = this._assetsService.getLocations()

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  onApplyFilter = () => {

    console.log("location", this.selectedLocation);
    console.log("selectedHDD", this.selectedHDD);
    console.log("ramFilterOptions", this.ramFilterOptions);
    console.log("On Apply Filter");

    let filters = {
      'HDD': this.selectedHDD ? this.selectedHDD : null,
      'Location': this.selectedLocation ? this.selectedLocation : null,
      'RAM': this.getSelectedRam(this.ramFilterOptions)
    }
    this.allAssets = this._assetsService.getAssets(filters);
    this.dataSource = new MatTableDataSource(this.allAssets);
    this.dataSource.paginator = this.paginator;
  }

  getSelectedRam = (ramFilterOptions) => {
    let selectedRamType = [];
    for(let ram of this.ramFilterOptions) {
      if(ram.isSelected) {
        selectedRamType.push(ram.type);
      }
    }

    return selectedRamType;
  }

  onAddNewAsset = () => {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onDelete = (id) => {
      this._assetsService.deleteAsset(id);
  }

  onEdit = (id) => {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
