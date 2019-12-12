import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

interface loginData {
	success: boolean,
	message: string
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public loggedInStatus: boolean = false;
	public userId: number = 0;
	public isPlayer: boolean = false;

	constructor(
		private http: HttpClient,
		private _userService: UserService
	) { }

	setLoggedIn(value: boolean) {
		this.loggedInStatus = value;
	}

	get isLoggedIn() {
		return this.loggedInStatus;
	}

	setUserId(value: number) {
		this.userId = value;

		this._userService.isPlayer(this.userId).then(res => {
			this.setIsPlayer(res);
		},
			err => {
				console.error("Failed to check if user is a player. Reason: " + err.statusText);
		});
	}

	get currentUserId() {
		return this.userId;
	}

	setIsPlayer(value: boolean) {
		this.isPlayer = value;
	}
}
