import { Component, OnInit, Input } from '@angular/core';
import { Photo } from "../models/photo";
import { Router } from "@angular/router";
import { PhotoService } from "../services/photo.service";

@Component({
  selector: 'app-photo-display-card',
  templateUrl: './photo-display-card.component.html',
  styleUrls: ['./photo-display-card.component.scss']
})
export class PhotoDisplayCardComponent implements OnInit {
  @Input() photo: Photo;
  constructor(private router: Router, private photoService: PhotoService) { }

  ngOnInit() {
  }

  goToDetailedPage() {
    this.router.navigate(['/photo', this.photo.$key]);
  }
}
