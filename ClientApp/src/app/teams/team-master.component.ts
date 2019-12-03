import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { Team } from 'src/models/team.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-master',
  templateUrl: './team-master.component.html',
  styleUrls: ['./team-master.component.scss']
})
export class TeamMasterComponent implements OnInit {
  @Input() title: string = "Teams";

  public teams: Team[] = [];
	public teamsToDelete: Team[] = [];

  constructor(
    private _data: TeamService,
	  private _toastr: ToastrService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.reload();
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('teams/item/' + id);
	}

	reload() {
	  this.teams = [];
		this.teamsToDelete = [];

    this._data.getTeams().then(res => {
			this.teams = res;
    },
    err => {
			this._toastr.error("Failed to get teams. Reason: " + err.statusText);
    });
  }

	get deleteValid() {
		return this.teamsToDelete.length > 0;
	}

	containsTeam(team: Team): boolean {
		return this.teamsToDelete.includes(team);
	}

	removeTeam(team: Team) {
		this.teamsToDelete = this.teamsToDelete.filter(x => x.teamId != team.teamId);
	}

	deleteTeams() {
		this.teamsToDelete.forEach(x => {
			this._data.deleteTeam(x.teamId).then(res => {
				this._toastr.success("Successfully deleted team.", "Success");
				if (x.teamId == this.teamsToDelete[this.teamsToDelete.length - 1].teamId) this.reload();
			},
				err => {
					this._toastr.error("Failed to delete team. Reason: " + err.statusText, "Failure");
				});
		});
	}
}
