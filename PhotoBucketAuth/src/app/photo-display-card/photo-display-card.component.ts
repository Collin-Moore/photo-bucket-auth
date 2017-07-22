import { Component, OnInit, Input } from '@angular/core';
import { Photo } from "../models/photo";

@Component({
  selector: 'app-photo-display-card',
  templateUrl: './photo-display-card.component.html',
  styleUrls: ['./photo-display-card.component.scss']
})
export class PhotoDisplayCardComponent implements OnInit {
  @Input() photo: Photo;
  constructor() { }

  ngOnInit() {
  }

}
