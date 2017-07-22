import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Photo } from "../models/photo";


@Injectable()
export class PhotoService {

  readonly photosPath = "photos";
  public photoStream: FirebaseListObservable<Photo[]>;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    if(authService.isSignedInStream) {
      this.photoStream = this.db.list(this.photosPath);
    }
  }

}
