import { Injectable } from '@angular/core';
import { Parent } from '../models/parent.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ParentService {

	public url = "https://localhost:44354/api";

	constructor(private http: HttpClient) { }

	async postParent(parent: Parent) {
		const result = await this.http.post(this.url + "/parents", parent)
			.toPromise();
		return result as Parent;
	}

	async getParents() {
		const result = await this.http.get(this.url + '/parents')
			.toPromise();
		return result as Parent[];
	}

	async getParent(id: number) {
		const result = await this.http.get(this.url + '/parents/' + id)
			.toPromise();
		return result as Parent;
	}

	async putParent(parent: Parent, id: number) {
		const result = await this.http.put(this.url + '/parents/' + id, parent)
			.toPromise();
		return result as Parent;
	}

	async deleteParent(id: number) {
		const result = await this.http.delete(this.url + '/parents/' + id)
			.toPromise();
		return result as Parent;
	}
}
