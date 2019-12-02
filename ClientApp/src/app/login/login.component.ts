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

	public userName: string = "";
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
		this._auth.setLoggedIn(true);
		this._auth.setUserId(1);
		this._router.navigateByUrl('');
		/*
		this._data.getUsers().then(res => {
			var userNameMatched = false;
			res.forEach(x => {
				if (x.UserName == this.userName && x.Password == this.password) {
					this._auth.setLoggedIn(true);
					this._auth.setUserId(x.UserId);
					this._router.navigateByUrl('');
				} else if (x.UserName == this.userName) {
					userNameMatched = true;
				}
			});
			if (userNameMatched) {
				this._toastr.error("Invalid Password.", "Failed to Login");
			} else {
				this._toastr.error("Invalid Username or Password.", "Failed to Login");
			}
		},
		err => {
			this._toastr.error("Unable to get users. Reason: " + err.statusText, "Failed to Login");
		});
		*/
	}

}
