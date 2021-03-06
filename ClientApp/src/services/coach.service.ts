import { Injectable } from '@angular/core';
import { Coach } from '../models/coach.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CoachService {

	public url = "https://localhost:44326/api";

	constructor(private http: HttpClient) { }

	async postCoach(coach: Coach) {
		const result = await this.http.post(this.url + "/coaches", coach)
			.toPromise();
		return result as Coach;
	}

	async getCoachs() {
		const result = await this.http.get(this.url + '/coaches')
			.toPromise();
		return result as Coach[];
	}

	async getCoach(id: number) {
		const result = await this.http.get(this.url + '/coaches/' + id)
			.toPromise();
		return result as Coach;
	}

	async putCoach(coach: Coach, id: number) {
		const result = await this.http.put(this.url + '/coaches/' + id, coach)
			.toPromise();
		return result as Coach;
	}

	async deleteCoach(id: number) {
		const result = await this.http.delete(this.url + '/coaches/' + id)
			.toPromise();
		return result as Coach;
	}
}
