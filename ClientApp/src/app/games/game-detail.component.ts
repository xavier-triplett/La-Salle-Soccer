import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../../models/game.model';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../../services/game.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

	public dataId: number = 0;
	public data: Game = new Game;
	private routeSub: Subscription;

	constructor(
		private _data: GameService,
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
		this._router.navigateByUrl('games');
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('games/item/' + id);
	}

	reload() {
		if (this.dataId != 0) {
			this._data.getGame(this.dataId).then(res => {
				this.data = res;
				this.dataId = res.GameId;
			},
			err => {
				this._toastr.error("Failed to get game. Reason: " + err.statusText);
			});
		}
		//Delete
		this.data.GameId = 10;
		this.data.HomeTeamId = 1;
		this.data.AwayTeamId = 2;
		this.data.HomeGoals = 2;
		this.data.AwayGoals = 3;
		this.data.HomePenaltyGoals = 4;
		this.data.AwayPenaltyGoals = 5;
		this.data.HomeTeamName = "Home Team";
		this.data.AwayTeamName = "Away Team";	}

	onSubmit() {
		if (this.dataId == 0) {
			this._data.postGame(this.data).then(res => {
				this.data = res;
				this.dataId = res.GameId;
				this._toastr.success("Successfully created game.", "Success");
				this.reload();
				this.goToDetail(res.GameId);
			},
			err => {
				this._toastr.error("Failed to create game. Reason: " + err.statusText);
			});
		} else {
			this._data.putGame(this.data, this.dataId).then(res => {
				this.data = res;
				this.dataId = res.GameId;
				this._toastr.success("Successfully updated game.", "Success");
				this.reload();
			},
			err => {
				this._toastr.error("Failed to create game. Reason: " + err.statusText);
			});
		}
	}

}
