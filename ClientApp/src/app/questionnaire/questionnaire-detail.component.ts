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
	private routeSub: Subscription;
   

	constructor(
		private _data: QuestionnaireService,
		private _playerService: PlayerService,
		private _questionnaireService: QuestionnaireService,
		private _toastr: ToastrService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _dataPipe: DatePipe
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
				this.outOfStateDate = this._dataPipe.transform(this.data.outOfState, "yyyy-MM-dd");
			},
				err => {
					this._toastr.error("Failed to get questionnaire. Reason: " + err.statusText);
				});
		}
	}

	onSubmit() {
		this.data.playerId = +this.data.playerId;
		this.data.outOfState = new Date(this.outOfStateDate);
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
