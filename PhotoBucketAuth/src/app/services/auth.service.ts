import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rosefire';

@Injectable()
export class AuthService {

  public isSignedInStream: Observable<boolean>;
  public displayNameStream: Observable<string>;
  public _currentUserUid: string;

  constructor(private afAuth: AngularFireAuth) { }


  signInWithRosefire(): void {
    Rosefire.signIn(environment.rosefireRegistryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }
      console.log("Rosefire is don. User: ", rfUser);
      this.afAuth.auth.signInWithCustomToken(rfUser.token).then( (authState) => { 
        console.log("Firebase signin is done now too. User: ", authState);

      });
    });

  }
}
