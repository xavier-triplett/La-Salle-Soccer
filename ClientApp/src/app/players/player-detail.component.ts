import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit, OnDestroy {

	public dataId: number = 0;
	public data: Player = new Player;
	public fullName: string = "";
	public birthYear: number;
	private routeSub: Subscription;

	constructor(
		private _data: PlayerService,
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
		this._router.navigateByUrl('players');
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('players/item/' + id);
	}

	reload() {
		if (this.dataId != 0) {
			this._data.getPlayer(this.dataId).then(res => {
				this.data = res;
				this.dataId = res.teamId;
				this.fullName = res.firstName + " " + res.lastName;
				this.birthYear = moment(res.dateOfBirth).year();
			},
				err => {
					this._toastr.error("Failed to get player. Reason: " + err.statusText);
				});
		}
	}

	onSubmit() {
		if (this.dataId == 0) {
			this._data.postPlayer(this.data).then(res => {
				this.data = res;
				this.dataId = res.teamId;
				this._toastr.success("Successfully created player.", "Success");
				this.reload();
				this.goToDetail(res.playerId);
			},
			err => {
				this._toastr.error("Failed to create player. Reason: " + err.statusText);
			});
		} else {
			this._data.putPlayer(this.data, this.dataId).then(res => {
				this._toastr.success("Successfully updated player.", "Success");
				this.reload();
			},
			err => {
				this._toastr.error("Failed to create player. Reason: " + err.statusText);
			});
		}
	}

}
