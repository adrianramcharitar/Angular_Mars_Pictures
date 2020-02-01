import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoverService } from './services/rover.service';
import { RoverPictureComponent } from './components/rover-picture/rover-picture.component';

@NgModule({
  declarations: [AppComponent, RoverPictureComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [RoverService],
  bootstrap: [AppComponent]
})
export class AppModule {}
