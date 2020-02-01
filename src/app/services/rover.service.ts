import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Injectable()
export class RoverService {
  constructor(private httpClient: HttpClient) {}

  private URL: string =
    'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?';
  private API_KEY: string = '2NZyydCZbhiuhfqeZAC4PYzCLUQ46beTMCqluaX2';

  fetchRoverManifest() {
    this.httpClient.get(``);
  }

  fetchImagesBySol(sol: number): Observable<object> {
    return this.httpClient.get(
      `${this.URL}sol=${sol}&api_key=${this.API_KEY}&page=1`
    );
  }
}
