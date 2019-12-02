import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

	public url = "https://localhost:44326/api";

	constructor(private http: HttpClient) { }

	async postPlayer(player: Player) {
		const result = await this.http.post(this.url + "/players", player)
			.toPromise();
		return result as Player;
	}

	async getPlayers() {
		const result = await this.http.get(this.url + '/players')
			.toPromise();
		return result as Player[];
	}

	async getPlayer(id: number) {
		const result = await this.http.get(this.url + '/players/' + id)
			.toPromise();
		return result as Player;
	}

	async putPlayer(player: Player, id: number) {
		const result = await this.http.put(this.url + '/players/' + id, player)
			.toPromise();
		return result as Player;
	}

	async deletePlayer(id: number) {
		const result = await this.http.delete(this.url + '/players/' + id)
			.toPromise();
		return result as Player;
	}
}
