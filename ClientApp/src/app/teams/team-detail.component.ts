import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from 'src/models/team.model';
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit, OnDestroy {

  public dataId: number = 0;
  public data: Team = new Team;
	private routeSub: Subscription;

  constructor (
    private _data: TeamService,
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
    this._router.navigateByUrl('teams');
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('teams/item/' + id);
	}

	reload() {
		if (this.dataId != 0) {
			this._data.getTeam(this.dataId).then(res => {
				this.data = res;
				this.dataId = res.TeamId;
			},
			err => {
				this._toastr.error("Failed to get team. Reason: " + err.statusText);
			});
		}
  }

  onSubmit() {
    if (this.dataId == 0) {
      this._data.postTeam(this.data).then(res => {
        this.data = res;
        this.dataId = res.TeamId;
		    this._toastr.success("Successfully created team.", "Success");
		    this.reload();
		    this.goToDetail(res.TeamId);
      },
      err => {
        this._toastr.error("Failed to create team. Reason: " + err.statusText);
      });
    } else {
      this._data.putTeam(this.data, this.dataId).then(res => {
        this.data = res;
        this.dataId = res.TeamId;
		    this._toastr.success("Successfully updated team.", "Success");
		    this.reload();
      },
      err => {
        this._toastr.error("Failed to create team. Reason: " + err.statusText);
      });
    }
  }

}
