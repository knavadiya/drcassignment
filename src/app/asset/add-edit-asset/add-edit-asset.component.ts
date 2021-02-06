import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-add-edit-asset',
  templateUrl: './add-edit-asset.component.html',
  styleUrls: ['./add-edit-asset.component.css']
})
export class AddEditAssetComponent implements OnInit {

  assetForm: FormGroup;
  titleAlertRequired: string = 'This field is required';
  id: number;
  editMode = false;

  constructor(
    private _fromBuilder: FormBuilder,
    private _assetsService: AssetsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    if(this.id || this.id === 0) {
      let asset = this._assetsService.getAsset(this.id);
      this.initForm(asset);
    } else {
      this.initForm({});
    }

  }

  initForm = (asset) => {
    this.assetForm = this._fromBuilder.group({
      Model: [asset.Model ? asset.Model : '', Validators.required],
      RAM: [asset.RAM ? asset.RAM : '', Validators.required],
      HDD: [asset.HDD ? asset.HDD : '', Validators.required],
      Location: [asset.Location ? asset.Location : '', Validators.required],
      Price: [asset.Price ? asset.Price : '', Validators.required],
    });
  }

  onSubmit(asset) {
    if (this.editMode) {
      this._assetsService.updateAsset(this.id, asset);
    } else {
      this._assetsService.addAsset(asset);
    }
    this.router.navigate(['assets']);
  }

}
