import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-questionnaire-detail',
	templateUrl: './questionnaire-detail.component.html',
	styleUrls: ['./questionnaire-detail.component.scss']
})
export class QuestionnaireDetailComponent implements OnInit {

	constructor(
		private _router: Router,
		private _toastr: ToastrService
	) { }

	ngOnInit() {
	}

	onSubmit() {
    //send it to the back end
	}

}
