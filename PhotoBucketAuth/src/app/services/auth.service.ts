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
  public currentUserUid: string;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log("User is signed in as ", user);
        this.currentUserUid = user.uid;
      } else {
        console.log("User is not signed in");
        this.currentUserUid = "";
      }
    });

    this.isSignedInStream = this.afAuth.authState
    .map<firebase.User, boolean>((user: firebase.User) => {
      return user != null; 
    });

    this.displayNameStream = this.afAuth.authState
    .map<firebase.User, string>((user: firebase.User) => {
       if (user) {
         if (user.displayName) {
           return user.displayName;
         } else {
           return user.uid;
         }
       } else {
         return "";
       }
     });
  }


  signInWithRosefire(): void {
    Rosefire.signIn(environment.rosefireRegistryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }
      // console.log("Rosefire is don. User: ", rfUser);
      this.afAuth.auth.signInWithCustomToken(rfUser.token).then((authState) => {
        // console.log("Firebase signin is done now too.");
      });
    });
  }

  signInWithGoogle(): void {
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
     .then( (result: any) => { 
        this.router.navigate(['/']);
        const user: firebase.User = result.user;
        // console.log("Push the user to the database", user);
        // this.authorService.updateAuthor(user.uid, user.displayName, user.photoURL);
      });
   }

   signOut(): void {
     this.afAuth.auth.signOut();
     this.router.navigate(['/signin']);
   }
}
