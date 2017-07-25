import { Component, OnInit} from '@angular/core';
import { Photo } from "../models/photo";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PhotoService } from "../services/photo.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest';
import { AuthService } from "../services/auth.service";
import { MdDialogConfig, MdDialog, MdSnackBar } from "@angular/material";
import { PhotoDialogComponent } from "../photo-dialog/photo-dialog.component";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.scss']
})
export class PhotodetailComponent implements OnInit {
  public detailedPhotoStream: Observable<Photo>;
  public isMyPhotoStream: Observable<boolean>;
  public photo: Photo;
  constructor(private route: ActivatedRoute, public photoService: PhotoService, private navRoute: Router, private authService: AuthService, private dialog: MdDialog, private snackBar: MdSnackBar) {

    this.route.params.subscribe((routeParams: Params) => {
      const photoKey = routeParams['photoKey'];
      this.detailedPhotoStream = this.photoService.photoStream.map<Photo[], Photo>((photos: Photo[]) => {
          const index = photos.findIndex((photo: Photo) => photo.$key === photoKey);
          return photos[index];
       });

      this.isMyPhotoStream = Observable.combineLatest<boolean>(this.authService.currentUserUidStream, this.detailedPhotoStream,
      (currentUid: string, photo: Photo) => {
        if (photo.uid === currentUid) {
          return true;
        } else {
          return false;
        }
       })

       this.detailedPhotoStream.subscribe((photoForEditRemove: Photo) => {
         this.photo = photoForEditRemove; 
        });
    });
  }

  ngOnDestroy(): void {

  }

  ngOnInit() {

  }

  backToMain(): void {
    this.navRoute.navigate(['/']);
  }
  
  edit(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      photo: this.photo
    };
    this.dialog.open(PhotoDialogComponent, dialogConfig);
  }

  remove(): void {
    firebase.database().ref('photos').child(this.photo.$key).remove();
    this.navRoute.navigate(['/']);
    this.snackBar.open("Image deleted", "",{duration: 3000,});
  }

}
