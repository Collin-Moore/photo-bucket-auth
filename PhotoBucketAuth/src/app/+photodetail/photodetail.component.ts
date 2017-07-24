import { Component, OnInit} from '@angular/core';
import { Photo } from "../models/photo";
import { ActivatedRoute, Params } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
import { PhotoService } from "../services/photo.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.scss']
})
export class PhotodetailComponent implements OnInit {
  public photo: Photo;
  constructor(private route: ActivatedRoute, public photoService: PhotoService) {
    
  }

  ngOnDestroy(): void {
    // this.photosArray.unsubscribe();
  }

  ngOnInit() {
    this.photo = this.photoService.getLatestDetailedPhoto();
    
  }
  

}
