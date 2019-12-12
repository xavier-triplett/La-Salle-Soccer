import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'Club League';

	constructor(
		public _auth: AuthService
	) {

	}

	get playerStatus(): boolean {
		return this._auth.isPlayer;
	}

}
