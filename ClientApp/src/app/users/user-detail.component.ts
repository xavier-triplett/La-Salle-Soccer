import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

	public dataId: number = 0;
	public data: User = new User;
	private routeSub: Subscription;

	constructor(
		private _data: UserService,
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
			},
			err => {
				this._toastr.error("Failed to get user. Reason: " + err.statusText);
			});
		}
	}

	onSubmit() {
		if (this.dataId == 0) {
			this._data.postUser(this.data).then(res => {
				this.data = res;
				this.dataId = res.userId;
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
				this._toastr.error("Failed to create user. Reason: " + err.statusText);
			});
		}
	}

}
