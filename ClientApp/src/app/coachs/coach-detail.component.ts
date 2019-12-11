import { Component, OnInit } from '@angular/core';
import { Coach } from '../../models/coach.model';
import { Subscription } from 'rxjs';
import { CoachService } from '../../services/coach.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-coach-detail',
	templateUrl: './coach-detail.component.html',
	styleUrls: ['./coach-detail.component.scss']
})
export class CoachDetailComponent implements OnInit {
	public dataId: number = 0;
	public data: Coach = new Coach;
	public users: User[] = [];
	private routeSub: Subscription;

	constructor(
		private _data: CoachService,
		private _userService: UserService,
		private _toastr: ToastrService,
		private _router: Router,
		private _route: ActivatedRoute
	) { }

	ngOnInit() {
		this.routeSub = this._route.params.subscribe(params => {
			this.dataId = +params['id'];
			this.reload();
		});

		this._userService.getUsers().then(res => {
			this.users = res;
		},
		err => {
			this._toastr.error("Failed to get users. Reason: " + err.statusText);
		});
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

	goToMaster() {
		this._router.navigateByUrl('coaches');
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('coaches/item/' + id);
	}

	reload() {
		if (this.dataId != 0) {
			this._data.getCoach(this.dataId).then(res => {
				this.data = res;
				this.dataId = res.coachId;
			},
			err => {
				this._toastr.error("Failed to get coach. Reason: " + err.statusText);
			});
		}
	}

	onSubmit() {
		if (this.dataId == 0) {
			this._data.postCoach(this.data).then(res => {
				this._toastr.success("Successfully created coach.", "Success");
				this.reload();
				this.goToDetail(res.coachId);
			},
				err => {
					this._toastr.error("Failed to create coach. Reason: " + err.statusText);
				});
		} else {
			this._data.putCoach(this.data, this.dataId).then(res => {
				this._toastr.success("Successfully updated coach.", "Success");
				this.reload();
			},
				err => {
					this._toastr.error("Failed to update coach. Reason: " + err.statusText);
				});
		}
	}

}
