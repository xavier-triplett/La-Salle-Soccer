import { Component, OnInit, Input } from '@angular/core';
import { Coach } from '../../models/coach.model';
import { CoachService } from '../../services/coach.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-master',
  templateUrl: './coach-master.component.html',
	styleUrls: ['./coach-master.component.scss']
})
export class CoachMasterComponent implements OnInit {
	@Input() title: string = "Coaches";

	public coaches: Coach[] = [];
	public coachesToDelete: Coach[] = [];

	constructor(
		private _data: CoachService,
		private _toastr: ToastrService,
		private _router: Router
	) { }

	ngOnInit() {
		this.reload();
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('coaches/item/' + id);
	}

	reload() {
		this.coaches = [];
		this.coachesToDelete = [];

		this._data.getCoachs().then(res => {
			this.coaches = res;
		},
		err => {
			this._toastr.error("Failed to get coaches. Reason: " + err.statusText);
		});
	}

	get deleteValid() {
		return this.coachesToDelete.length > 0;
	}

	containsCoach(coach: Coach): boolean {
		return this.coachesToDelete.includes(coach);
	}

	removeCoach(coach: Coach) {
		this.coachesToDelete = this.coachesToDelete.filter(x => x.coachId != coach.coachId);
	}

	deleteCoach() {
		this.coachesToDelete.forEach(x => {
			this._data.deleteCoach(x.coachId).then(res => {
				this._toastr.success("Successfully deleted coach.", "Success");
				if (x.coachId == this.coachesToDelete[this.coachesToDelete.length - 1].coachId) this.reload();
			},
				err => {
					this._toastr.error("Failed to delete coach. Reason: " + err.statusText, "Failure");
				});
		});
	}
}
