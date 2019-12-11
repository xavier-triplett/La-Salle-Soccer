import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class GameService {

	public url = "https://localhost:44326/api";

	constructor(private http: HttpClient) { }

	async postGame(game: Game) {
		const result = await this.http.post(this.url + '/games', game)
			.toPromise();
		return result as Game;
	}

	async getGames() {
		const result = await this.http.get(this.url + '/games')
			.toPromise();
		return result as Game[];
	}

	async getGame(id: number) {
		const result = await this.http.get(this.url + '/games/' + id)
			.toPromise();
		return result as Game;
	}

	async putGame(game: Game, id: number) {
		const result = await this.http.put(this.url + '/games/' + id, game)
			.toPromise();
		return result as Game;
	}

	async deleteGame(id: number) {
		const result = await this.http.delete(this.url + '/games/' + id)
		.toPromise();
		return result as Game;
	}
}
