import { Component, OnInit} from '@angular/core';
import { Photo } from "../models/photo";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
import { PhotoService } from "../services/photo.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.scss']
})
export class PhotodetailComponent implements OnInit {
  public detailedPhotoStream: Observable<Photo>;
  constructor(private route: ActivatedRoute, public photoService: PhotoService, private navRoute: Router) {

    this.route.params.subscribe((routeParams: Params) => {
      const photoKey = routeParams['photoKey'];
      this.detailedPhotoStream = this.photoService.photoStream.map<Photo[], Photo>((photos: Photo[]) => {
          const index = photos.findIndex((photo: Photo) => photo.$key === photoKey);
          return photos[index];
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
  

}
