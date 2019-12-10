import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

	public userId: number = 0;

  constructor(
	  private _auth: AuthService
  ) { }

	ngOnInit() {
		this.userId = this._auth.currentUserId;
  }

}
