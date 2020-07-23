export class Questionnaire {
	questionnaireId: number;
	playerId: number;
	practiceTime: Date;
	stable: string;
	program: string;
	dropOffTime: Date;
	coachPhone: string;
	emergencyContact: string;
	emergencyPhone: string;
	temperature: number;
	fever: boolean;
	pastFever: boolean;
	cough: boolean;
	shortnessOfBreath: boolean;
	covidContact: boolean;
	outOfState: Date;
	pickUpTime: Date;

	//Not Mapped
	fullName: string;
}
