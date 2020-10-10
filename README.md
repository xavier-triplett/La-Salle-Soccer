# La-Salle-Soccer
## Description
This is a project that keeps track of a soccer season
## Database
Here is the query to replicate my DB Schema

~~~~sql
CREATE TABLE address (
  AddressId bigint NOT NULL,
  AddressLine1 nvarchar(255),
  AddressLine2 nvarchar(255),
  City nvarchar(255),
  State nvarchar(255),
  Zip int,
  PRIMARY KEY (AddressId)
);
CREATE TABLE user (
  UserId bigint NOT NULL,
  AddressId bigint,
  Username nvarchar(255),
  Password nvarchar(255),
  FirstName nvarchar(255),
  LastName nvarchar(255),
  DateOfBirth datetime,
  Gender nvarchar(255),
  PRIMARY KEY (UserId),
  FOREIGN KEY (AddressId) REFERENCES address(AddressId)
);
CREATE TABLE coach (
  CoachId bigint NOT NULL,
  UserId bigint,
  PRIMARY KEY (CoachId),
  FOREIGN KEY (UserId) REFERENCES user(UserId)
);
CREATE TABLE team (
  TeamId bigint NOT NULL,
  CoachId bigint,
  Name nvarchar(255),
  Gender nvarchar(255),
  BirthYear int,
  HomeLocation nvarchar(255),
  PRIMARY KEY (TeamId),
  FOREIGN KEY (CoachId) REFERENCES coach(CoachId)
);
CREATE TABLE player (
  PlayerId bigint NOT NULL,
  UserId bigint,
  TeamId bigint,
  DominateFoot nvarchar(255),
  PRIMARY KEY (PlayerId),
  FOREIGN KEY (UserId) REFERENCES user(UserId),
  FOREIGN KEY (TeamId) REFERENCES team(TeamId)
);
CREATE TABLE parent (
  ParentId bigint NOT NULL,
  PlayerId bigint,
  UserId bigint,
  PRIMARY KEY (ParentId),
  FOREIGN KEY (PlayerId) REFERENCES player(PlayerId),
  FOREIGN KEY (UserId) REFERENCES user(UserId)
);
CREATE TABLE game (
  GameId bigint NOT NULL,
  HomeTeamId bigint,
  AwayTeamId bigint,
  DateAndTime datetime,
  HomeGoals int,
  AwayGoals int,
  HomePenaltyGoals int,
  AwayPenaltyGoals int,
  PRIMARY KEY (GameId),
  FOREIGN KEY (HomeTeamId) REFERENCES team(TeamId),
  FOREIGN KEY (AwayTeamId) REFERENCES team(TeamId)
);
CREATE TABLE questionnaire (
  QuestionnaireId bigint NOT NULL,
  PlayerId bigint,
  PracticeTime datetime,
  Stable nvarchar(255),
  Program nvarchar(255),
  DropOffTime datetime,
  CoachPhone nvarchar(255),
  EmergencyContact nvarchar(255),
  EmergencyPhone nvarchar(255),
  Temperature int,
  Fever bit,
  PastFever bit,
  Cough bit,
  ShortnessOfBreath bit,
  CovidContact bit,
  OutOfState datetime,
  PickUpTime datetime,
  PRIMARY KEY (QuestionnaireId),
  FOREIGN KEY (PlayerId) REFERENCES player(PlayerId)
);
~~~~
