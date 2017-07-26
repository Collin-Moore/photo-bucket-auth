import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from "@angular/material";
import { Photo } from "../models/photo";
import * as firebase from 'firebase/app';
import { AuthService } from "../services/auth.service";

interface PhotoDialogData {
  // firebasePath: string;
  photo?: Photo;
}

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {

  public snackMessage: string;
  public title: string = "Add a new photo";
  formPhoto: Photo;

  constructor(private dialogRef: MdDialogRef<PhotoDialogComponent>,
    private authService: AuthService,
    private snackBar: MdSnackBar,
  @Inject(MD_DIALOG_DATA) private dialogData: PhotoDialogData) {
    this.formPhoto = new Photo();
    // this.formPhoto.uid = authService.currentUserUid;
    this.authService.currentUserUidStream.subscribe((currentUid: string) => {
      this.formPhoto.uid = currentUid;
     });
   }

  ngOnInit() {
    if (this.dialogData.photo) {
      this.title = "Edit this photo";
      Object.assign(this.formPhoto, this.dialogData.photo);
    }
  }

  onSubmit() {
    try {
      const firebaseRef = firebase.database().ref('photos');
      if (this.dialogData.photo) {
        firebaseRef.child(this.dialogData.photo.$key).set(this.formPhoto);
        this.snackMessage = "Image updated";
      } else {
        firebaseRef.push(this.formPhoto);
        this.snackMessage = "Image added";
      }
    } catch (e) {
      console.log("Submit error", e);
    }
    this.snackBar.open(this.snackMessage, "",{duration: 3000,});
    this.dialogRef.close();
  }

}
