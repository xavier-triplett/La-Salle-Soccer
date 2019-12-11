import { Component, OnInit } from '@angular/core';
import { Parent } from '../../models/parent.model';
import { Subscription } from 'rxjs';
import { ParentService } from '../../services/parent.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-parent-detail',
	templateUrl: './parent-detail.component.html',
	styleUrls: ['./parent-detail.component.scss']
})
export class ParentDetailComponent implements OnInit {

	public dataId: number = 0;
	public data: Parent = new Parent;
	public birthYear: number;
	private routeSub: Subscription;

	constructor(
		private _data: ParentService,
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
		this._router.navigateByUrl('parent');
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('parent/item/' + id);
	}

	reload() {
		if (this.dataId != 0) {
			this._data.getParent(this.dataId).then(res => {
				this.data = res;
				this.dataId = res.parentId;
				this.birthYear = moment(res.dateOfBirth).year();
			},
				err => {
					this._toastr.error("Failed to get parent. Reason: " + err.statusText);
				});
		}
	}

	onSubmit() {
		if (this.dataId == 0) {
			this._data.postParent(this.data).then(res => {
				this._toastr.success("Successfully created parent.", "Success");
				this.reload();
				this.goToDetail(res.parentId);
			},
				err => {
					this._toastr.error("Failed to create parent. Reason: " + err.statusText);
				});
		} else {
			this._data.putParent(this.data, this.dataId).then(res => {
				this._toastr.success("Successfully updated parent.", "Success");
				this.reload();
			},
				err => {
					this._toastr.error("Failed to create parent. Reason: " + err.statusText);
				});
		}
	}
}
