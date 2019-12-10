import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

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

	onSubmit() {
		if (this.username.trim() == "" || this.password.trim() == "") {
			if (this.username.trim() == "" && this.password.trim() == "") {
				this._toastr.error("Please enter your username and password", "Failure");
			} else if (this.username.trim() == "") {
				this._toastr.error("Please enter your username", "Failure");
			} else {
				this._toastr.error("Please enter your password", "Failure");
			}
		} else {
			this._data.tryLogin(this.username, this.password).then(res => {
				var success = false;
				var usernameMatched = false;
				if (res == null) {
					this._toastr.error("Invalid Username or Password.", "Failed to Login");
				} else {
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
						}
					}
				}
			},
			err => {
				this._toastr.error("Unable to get user. Reason: " + err.statusText, "Failed to Login");
			});
		}
	}

}
