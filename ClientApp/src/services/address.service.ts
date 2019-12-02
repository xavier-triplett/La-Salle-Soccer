import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AddressService {

	public url = "https://localhost:44326/api";

	constructor(private http: HttpClient) { }

	async postAddress(address: Address) {
		const result = await this.http.post(this.url + "/addresses", address)
			.toPromise();
		return result as Address;
	}

	async getAddresses() {
		const result = await this.http.get(this.url + '/addresses')
			.toPromise();
		return result as Address[];
	}

	async getAddress(id: number) {
		const result = await this.http.get(this.url + '/addresses/' + id)
			.toPromise();
		return result as Address;
	}

	async putAddress(address: Address, id: number) {
		const result = await this.http.put(this.url + '/addresses/' + id, address)
			.toPromise();
		return result as Address;
	}

	async deleteAddress(id: number) {
		const result = await this.http.delete(this.url + '/addresses/' + id)
			.toPromise();
		return result as Address;
	}
}
