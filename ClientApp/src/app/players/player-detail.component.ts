import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit, OnDestroy {

	public dataId: number = 0;
	public data: Player = new Player;
	public teams: Team[] = [];
	public users: User[] = [];
	private routeSub: Subscription;

	constructor(
		private _data: PlayerService,
		private _teamService: TeamService,
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

		this._teamService.getTeams().then(res => {
			this.teams = res;
		},
		err => {
			this._toastr.error("Failed to get teams. Reason: " + err.statusText);
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
			},
			err => {
				this._toastr.error("Failed to get player. Reason: " + err.statusText);
			});
		}
	}

	onSubmit() {
		if (this.dataId == 0) {
			this._data.postPlayer(this.data).then(res => {
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
