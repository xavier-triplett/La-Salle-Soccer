import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

	constructor(
		private http: HttpClient
	) { }

	setLoggedIn(value: boolean) {
		this.loggedInStatus = value;
	}

	get isLoggedIn() {
		return this.loggedInStatus;
	}

	setUserId(value: number) {
		this.userId = value;
	}

	get currentUserId() {
		return this.userId;
	}
}
