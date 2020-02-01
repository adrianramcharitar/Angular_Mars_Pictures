import { Component } from '@angular/core';
import { RoverService } from './services/rover.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  launchDate: string;
  landedDate: string;
  maxSol: string;

  roverInfo: any;
  roverid: string;

  constructor(private roverService: RoverService) {}

  fetchRoverInfo() {
    this.roverService.fetchImagesBySol(1000).subscribe(val => console.log(val));
    // console.log(this.roverService.fetchImagesBySol(1000));
  }

  fetchRoverPictures() {
    this.roverService.fetchImagesBySol(1000).subscribe(val => {
      console.log(val);
      this.roverInfo = val;
      console.log(this.roverInfo.photos);
      this.roverid = this.roverInfo.photos[0].id;
    });
    console.log(this.roverid);
  }
}
