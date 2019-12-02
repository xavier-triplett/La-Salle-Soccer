import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TeamService {

	public url = "https://localhost:44326/api";

	constructor(private http: HttpClient) { }

	async postTeam(team: Team) {
		const result = await this.http.post(this.url + "/teams", team)
			.toPromise();
		return result as Team;
	}

	async getTeams() {
		const result = await this.http.get(this.url + '/teams')
			.toPromise();
		return result as Team[];
	}

	async getTeam(id: number) {
		const result = await this.http.get(this.url + '/teams/' + id)
			.toPromise();
		return result as Team;
	}

	async putTeam(team: Team, id: number) {
		const result = await this.http.put(this.url + '/teams/' + id, team)
			.toPromise();
		return result as Team;
	}

	async deleteTeam(id: number) {
		const result = await this.http.delete(this.url + '/teams/' + id)
			.toPromise();
		return result as Team;
	}
}
