import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit() {
		if (!this.auth.isLoggedIn) this.goToLogin();
  	}

	goToUsers() {
		this.router.navigateByUrl('users');
	}
	
	goToRegistration() {
		this.router.navigateByUrl('registration');
	}

	goToLogin() {
		this.router.navigateByUrl('login');
	}
}
