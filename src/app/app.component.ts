import { Component, OnInit } from '@angular/core';
import { RoverService } from './services/rover.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private roverService: RoverService) {}

  ngOnInit() {}
}
