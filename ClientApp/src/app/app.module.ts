import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDetailComponent } from './users/user-detail.component';
import { UserMasterComponent } from './users/user-master.component';
import { UserService } from '../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { GameMasterComponent } from './games/game-master.component';
import { GameDetailComponent } from './games/game-detail.component';
import { PlayerDetailComponent } from './players/player-detail.component';
import { PlayerMasterComponent } from './players/player-master.component';
import { TeamMasterComponent } from './teams/team-master.component';
import { TeamDetailComponent } from './teams/team-detail.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddressService } from 'src/services/address.service';
import { CoachService } from 'src/services/coach.service';
import { GameService } from 'src/services/game.service';
import { ParentService } from 'src/services/parent.service';
import { PlayerService } from 'src/services/player.service';
import { TeamService } from 'src/services/team.service';
import { MyGamesComponent } from './my-games/my-games.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { CoachMasterComponent } from './coachs/coach-master.component';
import { CoachDetailComponent } from './coachs/coach-detail.component';
import { ParentMasterComponent } from './parents/parent-master.component';
import { ParentDetailComponent } from './parents/parent-detail.component';
import { QuestionnaireDetailComponent } from './questionnaire/questionnaire-detail.component';
import { QuestionnaireMasterComponent } from './questionnaire/questionnaire-master/questionnaire-master.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    UserMasterComponent,
    LoginComponent,
    GameMasterComponent,
    GameDetailComponent,
    PlayerDetailComponent,
    PlayerMasterComponent,
    TeamMasterComponent,
    TeamDetailComponent,
    HomeComponent,
    RegistrationComponent,
    MyGamesComponent,
    MyTeamComponent,
		CoachMasterComponent,
		CoachDetailComponent,
		ParentMasterComponent,
		ParentDetailComponent,
		QuestionnaireDetailComponent,
		QuestionnaireMasterComponent
  ],
  imports: [
    BrowserModule,
	  AppRoutingModule,
	  FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
	],
  providers: [
    AddressService, 
    CoachService, 
    GameService, 
    ParentService, 
    PlayerService, 
    TeamService, 
    UserService, 
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
