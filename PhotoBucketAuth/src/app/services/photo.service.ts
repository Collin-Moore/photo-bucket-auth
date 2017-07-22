import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Photo } from "../models/photo";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/switchMap';


@Injectable()
export class PhotoService {

  readonly photosPath = "photos";
  // public photoStream: FirebaseListObservable<Photo[]>;
  public photoStream: Observable<Photo[]>;
  public myPhotoStream: Observable<Photo[]>;
  // public isMyPhotoTabStream: Subject<boolean>;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    // if(authService.isSignedInStream) {
    //   this.photoStream = this.db.list(this.photosPath);
    // }
    // this.isMyPhotoTabStream = new BehaviorSubject<boolean>(true);
    if (authService.isSignedInStream) {
      this.photoStream = this.db.list(this.photosPath);

      this.myPhotoStream =
        this.db.list(this.photosPath, {
          query: {
            orderByChild: 'uid',
            equalTo: this.authService.currentUserUid
          }
        });
    }
  }
}
