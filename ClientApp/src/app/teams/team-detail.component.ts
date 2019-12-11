import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Team } from 'src/models/team.model';
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoachService } from '../../services/coach.service';
import { Coach } from '../../models/coach.model';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit, OnDestroy {
	@Input() userId: number = 0;

	public dataId: number = 0;
	public data: Team = new Team;
	public coaches: Coach[] = [];
	private routeSub: Subscription;

  constructor (
	  private _data: TeamService,
	  private _coachService: CoachService,
    private _toastr: ToastrService,
	  private _router: Router,
	  private _route: ActivatedRoute
  ) { }

	ngOnInit() {
		if (this.userId == 0) {
			this.routeSub = this._route.params.subscribe(params => {
				this.dataId = +params['id'];
				this.reload();
			});
		} else {
      //TODO: pass this.userId as a search option
			this._data.getTeams().then(res => {
				this.dataId = res[0].teamId;
				this.reload();
			},
			err => {
				this._toastr.error("Failed to get users team. Reason: " + err.statusText);
			});
		}

		this._coachService.getCoachs().then(res => {
			this.coaches = res;
		},
		err => {
			this._toastr.error("Failed to get coaches. Reason: " + err.statusText);
		});
  }

	ngOnDestroy() {
		if (this.routeSub) this.routeSub.unsubscribe();
	}

  goToMaster() {
    this._router.navigateByUrl('teams');
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('teams/item/' + id);
	}

	reload() {
		if (this.dataId != 0) {
			this._data.getTeam(this.dataId).then(res => {
				this.data = res;
				this.dataId = res.teamId;
			},
			err => {
				this._toastr.error("Failed to get team. Reason: " + err.statusText);
			});
		}
  }

  onSubmit() {
    if (this.dataId == 0) {
      this._data.postTeam(this.data).then(res => {
		    this._toastr.success("Successfully created team.", "Success");
		    this.reload();
		    this.goToDetail(res.teamId);
      },
      err => {
        this._toastr.error("Failed to create team. Reason: " + err.statusText);
      });
    } else {
      this._data.putTeam(this.data, this.dataId).then(res => {
		    this._toastr.success("Successfully updated team.", "Success");
		    this.reload();
      },
      err => {
        this._toastr.error("Failed to update team. Reason: " + err.statusText);
      });
    }
  }

}
