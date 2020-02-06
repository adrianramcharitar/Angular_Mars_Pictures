import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RoverCuriosityPhotosSolResponse } from '../models/rover-curiosity-photos-sol-response.model';
import { RoverCuriosityPhotosSolRequest } from '../models/rover-curiosity-photos-sol-request.model';

@Injectable()
export class RoverService {
  constructor(private httpClient: HttpClient) {}

  private URL: string =
    'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?';
  private API_KEY: string = '2NZyydCZbhiuhfqeZAC4PYzCLUQ46beTMCqluaX2';

  fetchRoverManifest() {
    this.httpClient.get(``);
  }

  fetchImages(
    request: RoverCuriosityPhotosSolRequest
  ): Observable<RoverCuriosityPhotosSolResponse> {
    return this.httpClient.get<RoverCuriosityPhotosSolResponse>(
      `${this.URL}sol=${request.sol}&api_key=${this.API_KEY}&page=1`
    );
  }
}
