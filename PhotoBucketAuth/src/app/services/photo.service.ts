import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Photo } from "../models/photo";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from "@angular/router";


@Injectable()
export class PhotoService {

  readonly photosPath = "photos";
  readonly defaultPhoto = new Photo();

  public photoStream: Observable<Photo[]>;
  public myPhotoStream: Observable<Photo[]>;
  public detailedPhotoStream: BehaviorSubject<Photo>;


  constructor(private db: AngularFireDatabase, private authService: AuthService, private route: ActivatedRoute) {
    if (authService.isSignedInStream) {
      this.photoStream = this.db.list(this.photosPath);

      this.myPhotoStream =
        this.db.list(this.photosPath, {
          query: {
            orderByChild: 'uid',
            equalTo: this.authService.currentUserUid
          }
        });
      
      this.detailedPhotoStream = new BehaviorSubject<Photo>(this.defaultPhoto);
    }
  }

  setDetailedPhoto(photo: Photo): void {
    this.detailedPhotoStream.next(photo);
    console.log(this.detailedPhotoStream);
  }

  getLatestDetailedPhoto(): Photo {
    return this.detailedPhotoStream.getValue();
  }
}
