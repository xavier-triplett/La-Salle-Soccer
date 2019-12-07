import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public username: string = "";
	public password: string = "";

	constructor(
		private _data: UserService,
		private _auth: AuthService,
		private _router: Router,
		private _toastr: ToastrService
	) { }

	ngOnInit() {
  }

	goToRegistration() {
		this._router.navigateByUrl('registration');
	}

   //TODO: Move this password and username check to the back end
	onSubmit() {
        /*
		this._data.getUsers().then(res => {
			var success = false;
			var usernameMatched = false;
			this.users = res;
			this.users.forEach(x => {
				if (x.username == this.username && x.password == this.password) {
					this._auth.setLoggedIn(true);
					this._auth.setUserId(x.userId);
					this._router.navigateByUrl('');
					success = true;
				} else if (x.username == this.username) {
					usernameMatched = true;
				}
			});
			if (!success) {
				if (usernameMatched) {
					this._toastr.error("Invalid Password.", "Failed to Login");
				} else {
					this._toastr.error("Invalid Username or Password.", "Failed to Login");
				}
			}
		},
		err => {
			this._toastr.error("Unable to get users. Reason: " + err.statusText, "Failed to Login");
		});
        */
		if (this.username == "") this.username = " ";
	  if (this.password == "") this.password = " ";
		this._data.tryLogin(this.username, this.password).then(res => {
			  var success = false;
			  var usernameMatched = false;
			  if (res.username == this.username && res.password == this.password) {
			    this._auth.setLoggedIn(true);
				  this._auth.setUserId(res.userId);
				  this._router.navigateByUrl('');
				  success = true;
			  } else if (res.username == this.username) {
				  usernameMatched = true;
			  }
			  if (!success) {
				  if (usernameMatched) {
					  this._toastr.error("Invalid Password.", "Failed to Login");
				  } else {
					  this._toastr.error("Invalid Username or Password.", "Failed to Login");
				  }
			  }
		  },
			err => {
				this._toastr.error("Unable to get users. Reason: " + err.statusText, "Failed to Login");
			});
	}

}
