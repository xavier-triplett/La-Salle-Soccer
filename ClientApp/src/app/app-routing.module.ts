import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './users/user-detail.component';
import { HomeComponent } from './home/home.component';
import { TeamMasterComponent } from './teams/team-master.component';
import { PlayerMasterComponent } from './players/player-master.component';
import { GameMasterComponent } from './games/game-master.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TeamDetailComponent } from './teams/team-detail.component';
import { GameDetailComponent } from './games/game-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserMasterComponent } from './users/user-master.component';
import { PlayerDetailComponent } from './players/player-detail.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { CoachMasterComponent } from './coachs/coach-master.component';
import { CoachDetailComponent } from './coachs/coach-detail.component';
import { ParentMasterComponent } from './parents/parent-master.component';
import { ParentDetailComponent } from './parents/parent-detail.component';
import { QuestionnaireMasterComponent } from './questionnaire/questionnaire-master.component';
import { QuestionnaireDetailComponent } from './questionnaire/questionnaire-detail.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'teams',
		component: TeamMasterComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'teams/item/:id',
		component: TeamDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'teams/myteam',
		component: MyTeamComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'players',
		component: PlayerMasterComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'players/item/:id',
		component: PlayerDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'games',
		component: GameMasterComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'games/item/:id/:mygames',
		component: GameDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'games/mygames',
		component: MyGamesComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'coaches',
		component: CoachMasterComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'coaches/item/:id',
		component: CoachDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'parents',
		component: ParentMasterComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'parents/item/:id',
		component: ParentDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'registration',
		component: RegistrationComponent
	},
	{
		path: 'users',
		component: UserMasterComponent,
		canActivate: [AuthGuard]   //TODO: Add admin permission as well
	},
	{
		path: 'users/item/:id',
		component: UserDetailComponent,
		canActivate: [AuthGuard] //TODO: Add admin permission as well
	},
	{
		path: 'questionnaires',
		component: QuestionnaireMasterComponent,
		canActivate: [AuthGuard]   //TODO: Add admin permission as well
	},
	{
		path: 'questionnaires/item/:id',
		component: QuestionnaireDetailComponent,
		canActivate: [AuthGuard] //TODO: Add admin permission as well
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
