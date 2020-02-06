import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {
  RoverPicture,
  RoverPictures
} from 'src/app/models/rover-picture.model';
import { RoverService } from 'src/app/services/rover.service';
import { RoverCuriosityPhotosSolRequest } from 'src/app/models/rover-curiosity-photos-sol-request.model';
import { Observable, zip, of } from 'rxjs';
import {
  RoverCuriosityPhotosSolResponse,
  Photo
} from 'src/app/models/rover-curiosity-photos-sol-response.model';
import { groupBy, map, mergeMap, toArray } from 'rxjs/internal/operators';

@Component({
  selector: 'app-rover-picture',
  templateUrl: './rover-picture.component.html',
  styleUrls: ['./rover-picture.component.scss']
})
export class RoverPictureComponent implements OnInit {
  private request = {
    api_key: '',
    camera: '',
    page: 1,
    sol: 1
  } as RoverCuriosityPhotosSolRequest;

  model: RoverPictures = {
    roverPictures: []
  };

  constructor(private roverService: RoverService) {}

  ngOnInit() {
    this.roverService
      .fetchImages(this.request)
      .pipe(
        mergeMap(res => res.photos),
        groupBy(
          p => p.camera.full_name,
          p => p
        ),
        mergeMap(group => group.pipe(toArray())),
        map(g => {
          return {
            cameraName: g[0].camera.full_name,
            numberOfPhotos: g.length,
            samplePhotoUri: g[0].img_src
          } as RoverPicture;
        })
      )
      .subscribe(p => this.model.roverPictures.push(p));
  }

  cameraSelector(photo: Photo): string {
    return photo.camera.full_name;
  }
}
