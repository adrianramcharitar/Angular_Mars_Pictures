import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { RoverImage } from 'src/app/models/rover-image.model';
import { RoverService } from 'src/app/services/rover.service';

@Component({
  selector: 'app-rover-picture',
  templateUrl: './rover-picture.component.html',
  styleUrls: ['./rover-picture.component.scss']
})
export class RoverPictureComponent implements OnInit {
  pictures;
  groupedPictures: [];

  sol: number = 1000;

  constructor(private roverService: RoverService) {
    this.roverService
      .fetchImagesBySol(this.sol)
      .subscribe((res: RoverImage[]) => {
        this.pictures = res;
        console.log(res);
      });
  }

  groupJSONByCamera() {
    // this.groupedPictures = _.groupBy(this.pictures, 'full_name');
    console.log(this.pictures);
  }

  ngOnInit() {}
}
