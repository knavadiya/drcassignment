import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onGotoHome = () => {
    this.router.navigate(['/home']);
  }

}
