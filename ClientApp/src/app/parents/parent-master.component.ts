import { Component, OnInit, Input } from '@angular/core';
import { Parent } from '../../models/parent.model';
import { ParentService } from '../../services/parent.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-master',
  templateUrl: './parent-master.component.html',
  styleUrls: ['./parent-master.component.scss']
})
export class ParentMasterComponent implements OnInit {
	@Input() title: string = "Parents";

	public parents: Parent[] = [];
	public parentsToDelete: Parent[] = [];

	constructor(
		private _data: ParentService,
		private _toastr: ToastrService,
		private _router: Router
	) { }

	ngOnInit() {
		this.reload();
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('parents/item/' + id);
	}

	reload() {
		this.parents = [];
		this.parentsToDelete = [];

		this._data.getParents().then(res => {
			this.parents = res;
		},
			err => {
				this._toastr.error("Failed to get parents. Reason: " + err.statusText);
			});
	}

	get deleteValid() {
		return this.parentsToDelete.length > 0;
	}

	containsParent(parent: Parent): boolean {
		return this.parentsToDelete.includes(parent);
	}

	removeParent(parent: Parent) {
		this.parentsToDelete = this.parentsToDelete.filter(x => x.parentId != parent.parentId);
	}

	deleteParent() {
		this.parentsToDelete.forEach(x => {
			this._data.deleteParent(x.parentId).then(res => {
				this._toastr.success("Successfully deleted parents.", "Success");
				if (x.parentId == this.parentsToDelete[this.parentsToDelete.length - 1].parentId) this.reload();
			},
				err => {
					this._toastr.error("Failed to delete parents. Reason: " + err.statusText, "Failure");
				});
		});
	}

}
