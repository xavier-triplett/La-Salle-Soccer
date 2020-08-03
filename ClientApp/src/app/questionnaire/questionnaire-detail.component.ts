import { Component, OnInit } from '@angular/core';
import { Parent } from '../../models/parent.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { Questionnaire } from '../../models/questionnaire.model';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';
import { DatePipe } from '@angular/common'

@Component({
	selector: 'app-questionnaire-detail',
	templateUrl: './questionnaire-detail.component.html',
	styleUrls: ['./questionnaire-detail.component.scss'],
	providers: [DatePipe]
})
export class QuestionnaireDetailComponent implements OnInit {

	public dataId: number = 0;
	public data: Questionnaire = new Questionnaire;
	public players: Player[] = [];
	public outOfStateDate: string;
	public dropOffTime: string;
	public pickUpTime: string;
	public anotherQuestionnaire: boolean = false;
	private routeSub: Subscription;
   

	constructor(
		private _data: QuestionnaireService,
		private _playerService: PlayerService,
		private _questionnaireService: QuestionnaireService,
		private _toastr: ToastrService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _datePipe: DatePipe
	) { }

	ngOnInit() {
		this.routeSub = this._route.params.subscribe(params => {
			this.dataId = +params['id'];
			this.reload();
		});

		this._playerService.getPlayers().then(res => {
			this.players = res;
		},
			err => {
				this._toastr.error("Failed to get players. Reason: " + err.statusText);
			});
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}


	onChange(inputName: string) {
		if (inputName == "practiceTime") {
			this.data.dropOffTime = this.data.practiceTime;
			this.data.pickUpTime = this.data.dropOffTime;
		} else if (inputName == "dropOffTime") {
      //Change pickup time to be an hour later
		}
	}

	clearOldQuestionnaire() {
		this.data.playerId = null;
		this.data.emergencyContact = null;
		this.data.emergencyPhone = null;
		this.data.fever = null;
		this.data.pastFever = null;
		this.data.temperature = null;
		this.data.cough = null;
		this.data.shortnessOfBreath = null;
		this.data.covidContact = null;
		this.data.outOfState = null;
		this.outOfStateDate = null;
	}

	goToMaster() {
		this._router.navigateByUrl('questionnaires');
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('questionnaires/item/' + id);
	}

	reload() {
		if (this.dataId != 0) {
			this._data.getQuestionnaire(this.dataId).then(res => {
				this.data = res;
				this.dataId = res.questionnaireId;
				this.outOfStateDate = this._datePipe.transform(this.data.outOfState, "yyyy-MM-dd");
			},
				err => {
					this._toastr.error("Failed to get questionnaire. Reason: " + err.statusText);
				});
		}
	}

	onSubmit() {
		this.data.playerId = +this.data.playerId;
		this.data.outOfState = new Date(this.outOfStateDate);
		if (this.data.playerId == null || this.data.playerId == 0) {
			this._toastr.error("Player is required.");
			return;
		}
		if (this.dataId == 0) {
			this._data.postQuestionnaire(this.data).then(res => {
				this._toastr.success("Successfully created questionnaire.", "Success");
				this.reload();
				if (!this.anotherQuestionnaire) {
					this.goToDetail(res.questionnaireId);
				} else {
					this.clearOldQuestionnaire();
				}
			},
				err => {
					this._toastr.error("Failed to create questionnaire. Reason: " + err.statusText);
				});
		} else {
			this._data.putQuestionnaire(this.data, this.dataId).then(res => {
				this._toastr.success("Successfully updated questionnaire.", "Success");
				this.reload();
			},
				err => {
					this._toastr.error("Failed to update questionnaire. Reason: " + err.statusText);
				});
		}
	}
}
