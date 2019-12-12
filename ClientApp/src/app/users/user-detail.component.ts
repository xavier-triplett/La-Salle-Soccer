import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.model';
import * as moment from 'moment';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

	public dataId: number = 0;
	public data: User = new User;
	public address = new Address;
	private routeSub: Subscription;

	constructor(
		private _data: UserService,
		private _addressService: AddressService,
		private _toastr: ToastrService,
		private _router: Router,
		private _route: ActivatedRoute
	) { }

	ngOnInit() {
		this.routeSub = this._route.params.subscribe(params => {
			this.dataId = +params['id'];
			this.reload();
		});
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

	goToMaster() {
		this._router.navigateByUrl('users');
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('users/item/' + id);
	}

	reload() {
		if (this.dataId != 0) {
			this._data.getUser(this.dataId).then(res => {
				this.data = res;
				this.dataId = res.userId;
				this._addressService.getAddress(this.data.addressId).then(result => {
					this.address = result;
				},
				err => {
					this._toastr.error("Failed to get address. Reason: " + err.statusText);
				});
			},
			err => {
				this._toastr.error("Failed to get user. Reason: " + err.statusText);
			});
		}
	}

	onSubmit() {
		console.log(this.data);
		this.address.zip = +this.address.zip;
		if (this.dataId == 0) {
			this._addressService.addressExists(this.address.addressLine1, this.address.city, this.address.state, this.address.zip).then(res => {
				if (res > 0) {
					this.data.addressId = res;
					this._data.postUser(this.data).then(res => {
						this._toastr.success("Successfully created user.", "Success");
						this.reload();
						this.goToDetail(res.userId);
					},
						err => {
							this._toastr.error("Failed to create user. Reason: " + err.statusText);
						});
				} else {
					this._addressService.postAddress(this.address).then(res => {
						this.data.addressId = res.addressId;
						this._data.postUser(this.data).then(res => {
							this._toastr.success("Successfully created user.", "Success");
							this.reload();
							this.goToDetail(res.userId);
						},
						err => {
							this._toastr.error("Failed to create user. Reason: " + err.statusText);
						});
					},
					err => {
						this._toastr.error('Failed to create address. Reason: ' + err.statusText, 'Failure');
					});
				}
			},
			err => {
				console.error('Failed to check if address exists. Reason: ' + err.statusText, 'Failure');
			});

		} else {
			this._data.putUser(this.data, this.dataId).then(res => {
				  this._addressService.putAddress(this.address, this.address.addressId).then(res => {
					  this._toastr.success("Successfully updated user.", "Success");
					  this.reload();
				  },
					err => {
						this._toastr.error("Failed to update address. Reason: " + err.statusText);
					});
			},
				err => {
					console.error("Failed to update user. Reason: " + err.statusText);
			});
		}
	}
}
