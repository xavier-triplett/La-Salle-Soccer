import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { Game } from '../../models/game.model';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SearchOptions } from '../../models/searchOptions.model';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.scss']
})
export class GameMasterComponent implements OnInit {
  @Input() title: string = "Games";
  
  public games: Game[] = [];
  public gamesToDelete: Game[] = [];
  //TODO: Delete game below
  public game: Game = new Game;

	public searchOptions = new SearchOptions();

  constructor(
	  private _data: GameService,
    private _toastr: ToastrService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.reload();
  }

  goToDetail(id: number) {
    this._router.navigateByUrl('games/item/' + id);
  }

  reload() {
    this.gamesToDelete = [];
    this.games = [];
    //TODO: Delete all below except for service call
    this.game.GameId = 1;
    this.game.HomeGoals = 2;
    this.game.AwayGoals = 3;
    this.game.HomePenaltyGoals = 4;
    this.game.AwayPenaltyGoals = 5;
    this.game.HomeTeamName = "Home Team";
    this.game.AwayTeamName = "Away Team";
    this.game.DateAndTime = moment().toDate();
    this.games.push(this.game);
    var test = new Game;
    test.GameId = 10;
    test.HomeGoals = 2;
    test.AwayGoals = 3;
    test.HomePenaltyGoals = 4;
    test.AwayPenaltyGoals = 5;
    test.HomeTeamName = "Home Team";
    test.AwayTeamName = "Away Team";
    test.DateAndTime = moment().toDate();
    this.games.push(test);

    this._data.getGames().then(res => {
      this.games = res;
	  },
		err => {
			this._toastr.error("Failed to get games. Reason: " + err.statusText);
		});
  }

  get deleteValid() {
    return this.gamesToDelete.length > 0;
  }
  
  containsGame(game: Game): boolean {
    return this.gamesToDelete.includes(game);
  }
  
  removeGame(game: Game) {
    this.gamesToDelete = this.gamesToDelete.filter(x => x.GameId != game.GameId);
  }

  deleteGames() {
    this.gamesToDelete.forEach(x => {
      this._data.deleteGame(x.GameId).then(res => {
        this._toastr.success("Successfully deleted game.", "Success");
      },
      err => {
        this._toastr.error("Failed to delete game. Reason: " + err.statusText, "Failure");
      });
    });
  }
}
