import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/questionnaire.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
	providedIn: 'root'
})
export class QuestionnaireService {

	public url = "https://localhost:44326/api";

	constructor(private http: HttpClient) { }

	async postQuestionnaire(questionnaire: Questionnaire) {
		const result = await this.http.post(this.url + '/questionnaires', questionnaire)
			.toPromise();
		return result as Questionnaire;
	}

	async getQuestionnaires() {
		const result = await this.http.get(this.url + '/questionnaires')
			.toPromise();
		return result as Questionnaire[];
	}

	async getQuestionnaire(id: number) {
		const result = await this.http.get(this.url + '/questionnaires/' + id)
			.toPromise();
		return result as Questionnaire;
	}

	async putQuestionnaire(questionnaire: Questionnaire, id: number) {
		const result = await this.http.put(this.url + '/questionnaires/' + id, questionnaire)
			.toPromise();
		return result as Questionnaire;
	}

	async deleteQuestionnaire(id: number) {
		const result = await this.http.delete(this.url + '/questionnaires/' + id)
			.toPromise();
		return result as Questionnaire;
	}
}
