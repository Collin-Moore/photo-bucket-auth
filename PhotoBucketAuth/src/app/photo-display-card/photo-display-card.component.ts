import { Component, OnInit, Input } from '@angular/core';
import { Photo } from "../models/photo";
import { Router } from "@angular/router";
import { PhotoService } from "../services/photo.service";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { PhotoDialogComponent } from "../photo-dialog/photo-dialog.component";

@Component({
  selector: 'app-photo-display-card',
  templateUrl: './photo-display-card.component.html',
  styleUrls: ['./photo-display-card.component.scss']
})
export class PhotoDisplayCardComponent implements OnInit {
  @Input() photo: Photo;
  @Input() isMyPhoto: boolean;
  constructor(private router: Router, private photoService: PhotoService, private dialog: MdDialog) { }

  ngOnInit() {
  }

  goToDetailedPage() {
    this.router.navigate(['/photo', this.photo.$key]);
  }

  edit(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      photo: this.photo
    };
    this.dialog.open(PhotoDialogComponent, dialogConfig);
  }
}
