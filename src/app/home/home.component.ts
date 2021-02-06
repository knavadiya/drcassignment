import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription: Subscription;
  userEmail = '';

  constructor( 
    private router: Router,
    private authService: AuthService
    )
     { }

  ngOnInit(): void {

    this.subscription = this.authService.user
    .subscribe( (user) => {
        this.userEmail = user && user.email ? user.email : '';
      }
    );
    
  }

  onLoadAsset() {
    console.log("Loding Asset");
    this.router.navigate(['/assets']);
  }

}
