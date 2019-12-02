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
		path: 'games/item/:id',
		component: GameDetailComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
