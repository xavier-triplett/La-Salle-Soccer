import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {
  @Input() title: string = "Users";

	public users: User[] = [];
	public usersToDelete: User[] = [];

  constructor(
	  private _data: UserService,
	  private _router: Router,
	  private _toastr: ToastrService
    ) { }

  ngOnInit() {
    this.reload();
  }

	goToDetail(id: number) {
		this._router.navigateByUrl('users/item/' + id);
	}

  reload() {
    this._data.getUsers().then(res => {
			this.users = res;
	  },
		err => {
			this._toastr.error("Failed to get user. Reason: " + err.statusText, "Failure");
		});
  }

	get deleteValid() {
		return this.usersToDelete.length > 0;
	}

	containsUser(user: User): boolean {
		return this.usersToDelete.includes(user);
	}

	removeUser(user: User) {
		this.usersToDelete = this.usersToDelete.filter(x => x.UserId != user.UserId);
	}

	deleteUsers() {
		this.usersToDelete.forEach(x => {
			this._data.deleteUser(x.UserId).then(res => {
				this._toastr.success("Successfully deleted user.", "Success");
			},
			err => {
				this._toastr.error("Failed to delete user. Reason: " + err.statusText, "Failure");
			});
		});
	}
}
