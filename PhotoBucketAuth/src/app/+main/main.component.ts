import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { PhotoService } from "../services/photo.service";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { PhotoDialogComponent } from "../photo-dialog/photo-dialog.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public firebasePath: string;

  constructor(public photoService: PhotoService, public authService: AuthService, private dialog: MdDialog) { }

  ngOnInit() {
    
  }

  get numColumns(): number {
    if (window.innerWidth < 500) {
      return 1;
    } else if (window.innerWidth < 900) {
      return 2;
    } else if (window.innerWidth < 1300) {
      return 3;
    } else {
      return 4;
    }
  }

  showPasswordDialog(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {firebasePath: this.firebasePath};
    this.dialog.open(PhotoDialogComponent, dialogConfig);
    
  }
}
