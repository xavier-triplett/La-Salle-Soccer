import { Component, OnInit, Input } from '@angular/core';
//import { QuestionnaireService } from 'src/services/questionnaire.service';
//import { Questionnaire } from '../../models/questionnaire.model';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-questionnaire-master',
	templateUrl: './questionnaire-master.component.html',
	styleUrls: ['./questionnaire-master.component.scss']
})
export class QuestionnaireMasterComponent implements OnInit {
	@Input() title: string = "Questionnaires";
	@Input() useId: boolean = false;

	//public questionnaires: Questionnaire[] = [];
	//public questionnairesToDelete: Questionnaire[] = [];
	public userId: number = 0;

	constructor(
		//private _data: QuestionnaireService,
		private _auth: AuthService,
		private _toastr: ToastrService,
		private _router: Router
	) { }

	ngOnInit() {
		//this.reload();
	}

	goToDetail(id: number) {
		if (this.useId) this._router.navigateByUrl('questionnaires/item/' + id + '/' + 1);
		else this._router.navigateByUrl('questionnaires/item/' + id + '/' + 0);
	}

    /*
	reload() {
		this.questionnairesToDelete = [];
		this.questionnaires = [];

		if (this.useId) {
			this.userId = this._auth.currentUserId;
			this._data.getUsersQuestionnaire(this.userId).then(res => {
				this.questionnaires = res;
			},
				err => {
					this._toastr.error("Failed to get users questionnaires. Reason: " + err.statusText);
				});
		} else {
			this._data.getQuestionnaires().then(res => {
				this.questionnaires = res;
			},
				err => {
					this._toastr.error("Failed to get questionnaires. Reason: " + err.statusText);
				});
		}
	}

	get deleteValid() {
		return this.questionnairesToDelete.length > 0;
	}

	containsQuestionnaire(questionnaire: Questionnaire): boolean {
		return this.questionnairesToDelete.includes(questionnaire);
	}

	removeQuestionnaire(questionnaire: Questionnaire) {
		this.questionnairesToDelete = this.questionnairesToDelete.filter(x => x.questionnaireId != questionnaire.questionnaireId);
	}

	deleteQuestionnaires() {
		this.questionnairesToDelete.forEach(x => {
			this._data.deleteQuestionnaire(x.questionnaireId).then(res => {
				this._toastr.success("Successfully deleted questionnaire.", "Success");
				if (x.questionnaireId == this.questionnairesToDelete[this.questionnairesToDelete.length - 1].questionnaireId) this.reload();
			},
				err => {
					this._toastr.error("Failed to delete questionnaire. Reason: " + err.statusText, "Failure");
				});
		});
	}
  */
}
