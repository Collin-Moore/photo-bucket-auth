import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { Photo } from "../models/photo";
import * as firebase from 'firebase/app';

interface PhotoDialogData {
  firebasePath: string;
  photo?: Photo;
}

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {

  public title: string = "Add a new photo";
  formPhoto: Photo;

  constructor(private dialogRef: MdDialogRef<PhotoDialogComponent>,
  @Inject(MD_DIALOG_DATA) private dialogData: PhotoDialogData) {
    this.formPhoto = new Photo();
   }

  ngOnInit() {
    if (this.dialogData.photo) {
      this.title = "Edit this photo";
      Object.assign(this.formPhoto, this.dialogData.photo);
    }
  }

  onSubmit() {
    try {
      const firebaseRef = firebase.database().ref(this.dialogData.firebasePath);
      if (this.dialogData.photo) {
        firebaseRef.child(this.dialogData.photo.$key).set(this.formPhoto);
      } else {
        firebaseRef.push(this.formPhoto);
      }
    } catch (e) {
      console.log("Submit error", e);
    }
    this.dialogRef.close();
  }

}