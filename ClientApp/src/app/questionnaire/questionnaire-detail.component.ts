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
				/*this.dropOffTime = moment(this.data.dropOffTime).toDate().toLocaleTimeString().trim();
				this.pickUpTime = moment(this.data.pickUpTime).toDate().toLocaleTimeString().trim();
				if (this.dropOffTime.includes('PM')) {
					this.dropOffTime = this.dropOffTime.replace('PM', '').trim();
					var str: string = this.dropOffTime.substr(0, this.dropOffTime.indexOf(':'));
					var num: number = +str;
					num += 12;
					this.dropOffTime = num.toString() + this.dropOffTime.substr(this.dropOffTime.indexOf(':'), this.dropOffTime.length);
				} else {
					this.dropOffTime = this.dropOffTime.replace('AM', '').trim();
				}
				if (this.pickUpTime.includes('PM')) {
					this.pickUpTime = this.pickUpTime.replace('PM', '').trim();
					var str: string = this.pickUpTime.substr(0, this.pickUpTime.indexOf(':'));
					var num: number = +str;
					num += 12;
					this.pickUpTime = num.toString() + this.pickUpTime.substr(this.pickUpTime.indexOf(':'), this.pickUpTime.length);
				} else {
					this.pickUpTime = this.pickUpTime.replace('AM', '').trim();
				}*/
			},
				err => {
					this._toastr.error("Failed to get questionnaire. Reason: " + err.statusText);
				});
		}
	}

	onSubmit() {
		this.data.playerId = +this.data.playerId;
		this.data.outOfState = new Date(this.outOfStateDate);
		/*this.data.dropOffTime = new Date(this._datePipe.transform(this.data.practiceTime, "yyyy-MM-dd") + " " + this.dropOffTime);
		this.data.pickUpTime = new Date(this._datePipe.transform(this.data.practiceTime, "yyyy-MM-dd") + " " + this.pickUpTime);*/
		if (this.dataId == 0) {
			this._data.postQuestionnaire(this.data).then(res => {
				this._toastr.success("Successfully created questionnaire.", "Success");
				this.reload();
				this.goToDetail(res.questionnaireId);
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
