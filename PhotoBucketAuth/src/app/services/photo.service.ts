import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Photo } from "../models/photo";
import 'rxjs/add/observable/combineLatest';


@Injectable()
export class PhotoService {

  readonly photosPath = "photos";
  readonly defaultPhoto = new Photo();

  public photoStream: Observable<Photo[]>;
  public myPhotoStream: Observable<Photo[]>;


  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    if (authService.isSignedInStream) {
      this.photoStream = this.db.list(this.photosPath);

      // this.myPhotoStream = 
      //   this.db.list(this.photosPath, {
      //     query: {
      //       orderByChild: 'uid',
      //       equalTo: this.authService.currentUserUid
      //     }
      //   });
      this.authService.currentUserUidStream.subscribe((currentUid: string) => {
        this.myPhotoStream = this.db.list(this.photosPath, {
          query: {
            orderByChild: 'uid',
            equalTo: currentUid
          }
        });
      });
      
    }
  }

}
