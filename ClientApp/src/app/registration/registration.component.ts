import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SoccerUser } from '../../models/socceruser.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAddress } from 'src/models/useraddress.model';
import { AddressService } from 'src/services/address.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

	public user = new SoccerUser;
	public address = new UserAddress;

	constructor(
		private _auth: AuthService,
		private _userService: UserService,
		private _addressService: AddressService,
		private _toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit() {
		this.reload();
	}

	goToLogin() {
		this.router.navigateByUrl('login');
	}

	goToHome() {
		this.router.navigateByUrl('');
	}

	reload() {
		this.user = new SoccerUser;
		this.address = new UserAddress;
	}

	onSubmit() {
		this.address.zip = +this.address.zip;
		this._addressService.addressExists(this.address.addressLine1, this.address.city, this.address.state, this.address.zip).then(res => {
			if (res > 0) {
				this.user.addressId = res;
				this.insertUser();
			} else {
				this._addressService.postAddress(this.address).then(result => {
					this.user.addressId = result.addressId;
					this.insertUser();
				},
				err => {
					this._toastr.error('Failed to create address. Reason: ' + err.statusText, 'Failure');
				});
			}
		},
		err => {
			console.error('Failed to check if address exists. Reason: ' + err.statusText, 'Failure');	
		});

	}

	insertUser() {
		this._userService.postUser(this.user).then(res => {
			this._toastr.success('Successfully registered', 'Success');
			this._auth.setLoggedIn(true);
			this._auth.setUserId(res.userId);
			this.reload();
			this.goToHome();
		},
		err => {
			this._toastr.error('Failed to create user. Reason: ' + err.statusText, 'Failure');
		});
	}
}
