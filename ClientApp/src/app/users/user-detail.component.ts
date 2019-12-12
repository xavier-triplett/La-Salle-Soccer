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
	public addresses: Address[] = [];
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
		this._addressService.getAddresses().then(res => {
			this.addresses = res;
		},
		err => {
			this._toastr.error("Failed to get addresses. Reason: " + err.statusText);
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
			},
			err => {
				this._toastr.error("Failed to get user. Reason: " + err.statusText);
			});
		}
	}

	onSubmit() {
		this.data.addressId = +this.data.addressId;
		if (this.dataId == 0) {
			this._data.postUser(this.data).then(res => {
				this._toastr.success("Successfully created user.", "Success");
				this.reload();
				this.goToDetail(res.userId);
			},
			err => {
				this._toastr.error("Failed to create user. Reason: " + err.statusText);
			});
		} else {
			this._data.putUser(this.data, this.dataId).then(res => {
				this._toastr.success("Successfully updated user.", "Success");
				this.reload();
			},
			err => {
				this._toastr.error("Failed to update user. Reason: " + err.statusText);
			});
		}
	}

}
